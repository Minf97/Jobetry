type RequestInitWithBaseURL = RequestInit & {
  baseURL?: string;
};

// 定义通用的请求数据类型
type JsonRequestData = Record<string, unknown>;

async function customFetch(input: string, init?: RequestInitWithBaseURL) {
  const { baseURL, ...config } = init || {};
  const url = baseURL ? new URL(input, baseURL).toString() : input;

  // 请求拦截
  const modifiedConfig = await requestInterceptor(config);

  try {
    const response = await fetch(url, modifiedConfig);
    // 响应拦截
    return await responseInterceptor(response);
  } catch (error) {
    // 错误拦截
    return await errorInterceptor(error);
  }
}

async function requestInterceptor(config: RequestInit = {}): Promise<RequestInit> {
  // 获取 token（从 cookie 中获取更安全）
  const token = await getToken();

  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    },
  };
}

async function responseInterceptor(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || '请求失败');
  }

  return response.json();
}

async function errorInterceptor(error: unknown) {
  if (error instanceof Error) {
    // 可以在这里处理特定类型的错误
    // 比如网络错误、超时等
    throw new Error(error.message);
  }
  throw new Error('未知错误');
}

// 从 cookie 获取 token 的辅助函数
async function getToken(): Promise<string | null> {
  // 在服务端
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
  }
  // 在客户端
  return null; // 客户端不需要token，因为我们使用 httpOnly cookie
}

// 创建API实例
export const api = {
  async get(url: string, config?: RequestInitWithBaseURL) {
    return customFetch(url, {
      ...config,
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    });
  },

  async post<T = JsonRequestData>(url: string, data?: T, config?: RequestInitWithBaseURL) {
    return customFetch(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
      baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    });
  },

  async put<T = JsonRequestData>(url: string, data?: T, config?: RequestInitWithBaseURL) {
    return customFetch(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
      baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    });
  },

  async delete(url: string, config?: RequestInitWithBaseURL) {
    return customFetch(url, {
      ...config,
      method: 'DELETE',
      baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    });
  },
}; 