"use client";

import { Button } from "@/components/ui/button";
import { Input } from "antd";
import { useState } from "react";

export default function Editor({ params }: { params: { templateId: string } }) {
  console.log(params);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto grid grid-cols-2 gap-8 p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">编辑简历信息</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">姓名</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">职位</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="期望职位"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">邮箱</label>
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="联系邮箱"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">电话</label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="联系电话"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            预览简历
          </Button>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-4 text-xl font-bold">预览</h3>
          {/* 这里添加简历预览内容 */}
        </div>
      </div>
    </div>
  );
} 