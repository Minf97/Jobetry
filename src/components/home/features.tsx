import { FileText, Wand2, LayoutTemplate, Bot, Download, Sparkles } from "lucide-react";
import { HOST_NAME } from "@/lib/utils/constant";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function Features() {
  const t = useTranslations("features");

  const features: Feature[] = [
    {
      icon: FileText,
      title: t("items.export.title"),
      description: t("items.export.description"),
    },
    {
      icon: Wand2,
      title: t("items.adjust.title"),
      description: t("items.adjust.description"),
    },
    {
      icon: LayoutTemplate,
      title: t("items.onepage.title"),
      description: t("items.onepage.description"),
    },
    {
      icon: Bot,
      title: t("items.ai.title"),
      description: t("items.ai.description"),
    },
    {
      icon: Download,
      title: t("items.download.title"),
      description: t("items.download.description"),
    },
    {
      icon: Sparkles,
      title: t("items.layout.title"),
      description: t("items.layout.description"),
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
            {t("title", { name: HOST_NAME })}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* 功能网格 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
