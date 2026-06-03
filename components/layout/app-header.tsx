import { Badge } from "@/components/ui/badge";
import { STR } from "@/lib/i18n/strings";

export function AppHeader() {
  return (
    <header className="border-b bg-card/50 px-4 py-4 lg:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">
              {STR.app.title}
            </h1>
            <Badge variant="outline" className="font-normal">
              MVP
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{STR.app.tagline}</p>
        </div>
        <p className="text-xs text-muted-foreground max-w-md">{STR.app.subtitle}</p>
      </div>
    </header>
  );
}
