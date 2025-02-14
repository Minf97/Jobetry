import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const templates = [
  {
    id: 1,
    name: "简约专业",
    image: "/templates/simple.png",
    description: "清晰简约的设计，突出重要信息",
  },
  {
    id: 2,
    name: "创意设计",
    image: "/templates/creative.png",
    description: "独特的布局，适合创意行业",
  },
  {
    id: 3,
    name: "商务精英",
    image: "/templates/business.png",
    description: "正式专业的风格，适合管理岗位",
  },
];

export default function Templates() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-gray-900">
          选择模板
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Link
              href={`/editor/${template.id}`}
              key={template.id}
              className="transform transition-all hover:scale-105"
            >
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                  <p className="text-gray-600">{template.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 