import { Twitter, Github, MessageCircle, Mail } from "lucide-react";
import { HOST_NAME } from "@/lib/utils/constant";
import { LocaleLink } from "./LocaleLink";
import { useTranslations } from "next-intl";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Github, href: "https://github.com" },
  { icon: MessageCircle, href: "https://discord.com" },
  { icon: Mail, href: "mailto:contact@example.com" },
];

export function Footer() {
  const t = useTranslations("footer");
  
  const footerSections: FooterSection[] = [
    {
      title: t("about.title"),
      links: [
        { label: t("about.features"), href: "#features" },
        { label: t("about.showcase"), href: "/showcase" },
        { label: t("about.pricing"), href: "/pricing" },
      ],
    },
    {
      title: t("resources.title"),
      links: [
        { label: t("resources.docs"), href: "/docs" },
        { label: t("resources.components"), href: "/components" },
        { label: t("resources.templates"), href: "/templates" },
      ],
    },
    {
      title: t("links.title"),
      links: [
        { label: "ThinkAny", href: "https://thinkany.com" },
        { label: "HeyBeauty", href: "https://heybeauty.com" },
        { label: "Pagen", href: "https://pagen.com" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col gap-8 justify-between lg:flex-row lg:gap-16">
          {/* Left Column - Logo and Description */}
          <div className="flex-shrink-0 lg:w-1/3">
            <LocaleLink href="/" className="inline-flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="h-8 w-8" />
              <span className="text-xl font-semibold">{HOST_NAME}</span>
            </LocaleLink>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("description", { name: HOST_NAME })}
            </p>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column - Footer Sections */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {footerSections.map((section) => (
              <div key={section.title} className="flex-1 min-w-[80px]">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <LocaleLink
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>{t("copyright", { year: "2025", name: HOST_NAME })}</p>
          <div className="mt-4 space-x-4 md:mt-0">
            <LocaleLink href="/privacy" className="hover:text-foreground">
              {t("privacy")}
            </LocaleLink>
            <LocaleLink href="/terms" className="hover:text-foreground">
              {t("terms")}
            </LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
} 