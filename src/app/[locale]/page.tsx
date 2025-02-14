import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/LocaleLink";
import { Meteors } from "@/components/magicui/meteors";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <div className="container relative mx-auto px-4 py-20">
        <div className="text-center">
          {/* 顶部标签 */}
          <AnimatedGradientText className="mb-8">
            <span className="mr-2 bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              2025
            </span>
            <span className="mr-2">🎉</span>
            <span className="font-medium bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              {t("congratulation")}
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>

          {/* 主标题 */}
          <h1 className="mx-auto mb-6 max-w-4xl text-center text-4xl text-foreground font-bold md:text-6xl">
            {t("title")}
            <br />
            <span className="inline-flex gap-2 text-primary/80 whitespace-nowrap">
              {[t("titleSparkles1"), t("titleSparkles2")].map((text) => (
                <SparklesText key={text} text={text} sparklesCount={5} />
              ))}
            </span>
            <span className="text-foreground">{t("titleSuffix")}</span>
          </h1>

          {/* 副标题 */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {t("subtitle")}
          </p>

          {/* 按钮 */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LocaleLink href="/templates">
              <Button className="group relative h-12 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-indigo-500 to-blue-500 px-8 py-2 text-lg font-semibold text-primary-foreground transition-all hover:opacity-90">
                {t("startButton")}
                <div className="absolute inset-0 h-full w-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              </Button>
            </LocaleLink>
          </div>

          {/* 用户头像展示 */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-muted bg-muted-foreground/10"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {t("userCount")}
            </span>
          </div>
        </div>

        <Meteors number={20} className="" />
      </div>

      <Hero />
      <Features />
    </>
  );
}
