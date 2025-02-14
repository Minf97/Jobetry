import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Login from '../page'
import { loginOrRegister } from '@/lib/actions/auth'
import { message } from 'antd'

// Mock antd
vi.mock('antd', () => {
  const Input = ({ id, type, value, onChange, placeholder }: any) => (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
  Input.displayName = 'Input'

  const Password = ({ id, value, onChange, placeholder }: any) => (
    <input
      id={id}
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
  Password.displayName = 'Input.Password'
  Input.Password = Password

  return {
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
    Input
  }
})

vi.mock('@/lib/actions/auth', () => ({
  loginOrRegister: vi.fn()
}))

describe('Login Page', () => {
  // 每个测试前重置所有 mock
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
    render(<Login />)
    
    // 检查重要的 UI 元素是否存在
    expect(screen.getByLabelText(/邮箱/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/密码/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /登录\/注册/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /github登录/i })).toBeInTheDocument()
  })

  it('uses mocked message', () => {
    message.error('test')
    expect(message.error).toHaveBeenCalledWith('test')
  })

  it('validates form fields', async () => {
    const user = userEvent.setup()
    render(<Login />)

    // 测试空邮箱
    await user.type(screen.getByLabelText(/密码/i), 'password123')
    await user.click(screen.getByRole('button', { name: /登录\/注册/i }))
    
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('请输入邮箱')
    })

    // 清除 mock 记录
    vi.clearAllMocks()

    // 测试空密码
    await user.clear(screen.getByLabelText(/密码/i))
    await user.type(screen.getByLabelText(/邮箱/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /登录\/注册/i }))
    expect(message.error).toHaveBeenCalledWith('请输入密码')

    // 清除 mock 记录
    vi.clearAllMocks()

    // 测试密码长度
    await user.type(screen.getByLabelText(/密码/i), '12345')
    await user.click(screen.getByRole('button', { name: /登录\/注册/i }))
    expect(message.error).toHaveBeenCalledWith('密码长度至少6位')
  })

  it('handles successful login', async () => {
    const user = userEvent.setup()
    render(<Login />)

    // 模拟成功的登录响应
    const mockLoginResponse = {
      jwt: 'mock-token',
      user: {
        id: 1,
        username: 'test',
        email: 'test@example.com'
      }
    }
    vi.mocked(loginOrRegister).mockResolvedValueOnce(mockLoginResponse)

    // 填写表单
    await user.type(screen.getByLabelText(/邮箱/i), 'test@example.com')
    await user.type(screen.getByLabelText(/密码/i), 'password123')

    // 提交表单
    await user.click(screen.getByRole('button', { name: /登录\/注册/i }))

    // 验证登录函数被正确调用
    await waitFor(() => {
      expect(loginOrRegister).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      )
      expect(message.success).toHaveBeenCalledWith('登录成功！')
    })
  })

  it('handles login error', async () => {
    const user = userEvent.setup()
    render(<Login />)

    // 模拟登录失败
    vi.mocked(loginOrRegister).mockRejectedValueOnce(new Error('登录失败'))

    // 填写表单
    await user.type(screen.getByLabelText(/邮箱/i), 'test@example.com')
    await user.type(screen.getByLabelText(/密码/i), 'password123')

    // 提交表单
    await user.click(screen.getByRole('button', { name: /登录\/注册/i }))

    // 验证错误提示
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('登录失败')
    })
  })
}) 