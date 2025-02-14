'use server'

import { cookies } from 'next/headers';
import { AuthResponse } from '@/lib/types/auth';
import { api } from '@/lib/fetch';

export async function loginOrRegister(email: string, password: string) {
  try {
    // 检查用户是否存在
    const users = await api.get(`/api/users?filters[email][$eq]=${email}`);

    let result: AuthResponse;

    if (users.length > 0) {
      // 登录
      result = await api.post('/api/auth/local', {
        identifier: email,
        password,
      });
    } else {
      // 注册
      result = await api.post('/api/auth/local/register', {
        username: email,
        email,
        password,
      });
    }

    // 设置 cookie
    const cookieStore = await cookies();
    cookieStore.set('token', result.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('登录失败');
  }
}

export async function githubAuth() {
  return { url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/github` };
} 