import {
  Bot,
  FileAudio,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Lock,
  Zap,
} from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Badge } from "@repo/ui";

export const Ia = () => {
  const t = useLang();

  return (
    <section className="from-primary/5 via-background to-primary/5 bg-gradient-to-br py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="default" className="mb-4">
                {t.page.lp("ai_chat.badge")}
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t.page.lp("ai_chat.title")}
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {t.page.lp("ai_chat.description")}
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Bot className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      {t.page.lp("ai_chat.features.access.title")}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t.page.lp("ai_chat.features.access.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Zap className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      {t.page.lp("ai_chat.features.vectorization.title")}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t.page.lp("ai_chat.features.vectorization.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Lock className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      {t.page.lp("ai_chat.features.privacy.title")}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t.page.lp("ai_chat.features.privacy.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground mb-3 text-sm font-medium">
                  {t.page.lp("ai_chat.supported_formats.title")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="gap-1.5">
                    <FileVideo className="h-3.5 w-3.5" />
                    {t.page.lp("ai_chat.supported_formats.video")}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <FileAudio className="h-3.5 w-3.5" />
                    {t.page.lp("ai_chat.supported_formats.audio")}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5" />
                    {t.page.lp("ai_chat.supported_formats.image")}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {t.page.lp("ai_chat.supported_formats.document")}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    {t.page.lp("ai_chat.supported_formats.spreadsheet")}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-muted/50 relative overflow-hidden rounded-2xl border shadow-xl">
                <div className="aspect-square w-full p-8">
                  <div className="bg-background flex h-full w-full flex-col rounded-lg border p-6 shadow-lg">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <Bot className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{t.page.lp("ai_chat.demo.title")}</p>
                        <p className="text-muted-foreground text-xs">
                          {t.page.lp("ai_chat.demo.subtitle")}
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted/50 mb-4 rounded-lg p-4">
                      <p className="text-sm">{t.page.lp("ai_chat.demo.message")}</p>
                    </div>
                    <div className="bg-primary/10 flex items-center gap-2 rounded-lg p-3">
                      <div className="bg-primary/20 flex h-2 w-2 animate-pulse rounded-full" />
                      <p className="text-muted-foreground text-xs">
                        {t.page.lp("ai_chat.demo.typing")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
