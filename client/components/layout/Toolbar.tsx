import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Toolbar() {
  return (
    <div className="w-full border-b bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-2">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Button variant="secondary" size="sm">Кампании</Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Цель:</span>
            <Button variant="ghost" size="sm" className="gap-1">
              Положил в корзину
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Атрибуция:</span>
            <Select defaultValue="auto">
              <SelectTrigger className="h-8 w-[190px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">автоматическая</SelectItem>
                <SelectItem value="last">последний переход</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:block text-muted-foreground">Период: 28 авг — 28 сент (30 дн.)</div>
            <Button variant="ghost" size="icon" aria-label="Обновить">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-end text-xs text-muted-foreground">
          История: 1–31 июл (30 дн.) | 1–31 авг (30 дн.) | 1–14 сен (14 дн.)
        </div>
      </div>
    </div>
  );
}
