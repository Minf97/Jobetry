"use client";

import { Button } from "@/components/ui/button";
import { Input } from "antd";
import { useState } from "react";
import { GithubIcon } from "lucide-react";
import { message } from "antd";
import { loginOrRegister, githubAuth } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      message.error('请输入邮箱');
      return false;
    }
    if (!password) {
      message.error('请输入密码');
      return false;
    }
    if (password.length < 6) {
      message.error('密码长度至少6位');
      return false;
    }
    return true;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await loginOrRegister(email, password);
      message.success('登录成功！');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('登录失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    const { url } = await githubAuth();
    window.location.href = url;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">登录</h2>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              size="large"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              密码
            </label>
            <Input.Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              size="large"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
            size="lg"
            disabled={loading}
          >
            {loading ? '处理中...' : '登录/注册'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">或者使用以下方式登录</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-2"
          >
            <GithubIcon className="h-5 w-5" />
            GitHub登录
          </Button>
        </form>
      </div>
    </div>
  );
} 