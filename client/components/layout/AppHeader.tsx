import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  return (
    <header className={cn("w-full border-b bg-brand-soft/70 backdrop-blur supports-[backdrop-filter]:bg-brand-soft/60")}> 
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white font-bold">G</div>
            <div className="text-sm leading-tight">
              <div className="font-semibold tracking-wide">АНАЛИТИЧЕСКОЕ ТАБЛО</div>
              <div className="text-xs text-muted-foreground">GoodKey</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-muted-foreground">НДС</span>
            <Switch aria-label="НДС" />
          </div>
        </div>
      </div>
    </header>
  );
}
