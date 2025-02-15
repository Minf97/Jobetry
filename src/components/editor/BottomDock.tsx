import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  FileText,
  History,
  Save,
  Download,
  Briefcase,
  Settings,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function BottomDock() {
  const t = useTranslations("editor.dock");

  const RenderDockIcon = (icon: React.ReactNode, tip: string) => {
    return (
      <DockIcon className="group relative rounded-lg transition-colors">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    );
  };

  // TODO: 支持 icon 大小选择，默认使用 h-5 w-5,大号使用 h-6 w-6

  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className="border border-border/40 bg-background/50 px-4"
      >
        {RenderDockIcon(
          <FileText className="!h-5 !w-5 text-primary/80" />,
          t("fileList")
        )}
        <div className="mx-2 h-8 w-px bg-border/50" />

        {RenderDockIcon(
          <History className="!h-5 !w-5 text-primary/80" />,
          t("history")
        )}
        {RenderDockIcon(
          <Save className="!h-5 !w-5 text-primary/80" />,
          t("save")
        )}

        <div className="mx-2 h-8 w-px bg-border/50" />
        {RenderDockIcon(
          <Download className="!h-5 !w-5 text-primary/80" />,
          t("export")
        )}
        {RenderDockIcon(
          <Briefcase className="!h-5 !w-5 text-primary/80" />,
          t("jobDescription")
        )}

        <div className="mx-2 h-8 w-px bg-border/50" />
        {RenderDockIcon(
          <Settings className="!h-5 !w-5 text-primary/80" />,
          t("settings")
        )}
      </Dock>
    </TooltipProvider>
  );
}
