import { FileText, Wand2, LayoutTemplate } from "lucide-react";
import { HOST_NAME } from "@/lib/utils/constant";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* 左侧视频展示 */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
            <img
              src="/mockup.png"
              alt={t("demoAlt")}
              className="h-full w-full object-cover"
            />
          </div>

          {/* 右侧内容 */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {t("title", { name: HOST_NAME })}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t("description")}
            </p>

            {/* 特性列表 */}
            <div className="space-y-6">
              {[
                {
                  icon: FileText,
                  title: t("features.export.title"),
                  description: t("features.export.description"),
                },
                {
                  icon: Wand2,
                  title: t("features.adjust.title"),
                  description: t("features.adjust.description"),
                },
                {
                  icon: LayoutTemplate,
                  title: t("features.onepage.title"),
                  description: t("features.onepage.description"),
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
