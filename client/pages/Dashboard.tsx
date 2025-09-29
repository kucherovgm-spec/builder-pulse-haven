import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ChevronDown, Info, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function MetricCell() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-sm leading-none">111</div>
      <div className="mt-1 flex gap-3 text-[10px] text-muted-foreground">
        <span>10</span>
        <span>20</span>
        <span>40</span>
      </div>
    </div>
  );
}

type Campaign = { id: string; title: string; desc: string; hasWarning?: boolean };
type Group = { id: string; title: string };
type Ad = { id: string; title: string; warning?: boolean };

type Segment = {
  id: number;
  name: string;
  info: string;
  defaultOpen?: boolean;
  campaigns: Campaign[];
  groups: Group[];
  ads: Ad[];
};

function SegmentBlock({ segment, excluded, onToggleExclude }: { segment: Segment; excluded: Set<string>; onToggleExclude: (id: string) => void }) {
  const [open, setOpen] = useState<boolean>(!!segment.defaultOpen);
  return (
    <>
      <TableRow>
        <TableCell className="align-top">
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground">#{segment.id}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <button
                  aria-label="Раскрыть сегмент"
                  onClick={() => setOpen((v) => !v)}
                  className="mr-1 text-muted-foreground hover:text-foreground"
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "-rotate-90")} />
                </button>
                <Link to={`/segment/${segment.id}`} className="text-brand hover:underline truncate">
                  {segment.info}
                </Link>
              </div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
          </div>
        </TableCell>
        <TableCell><MetricCell /></TableCell>
        <TableCell><MetricCell /></TableCell>
        <TableCell><MetricCell /></TableCell>
        <TableCell><MetricCell /></TableCell>
        <TableCell><MetricCell /></TableCell>
      </TableRow>

      {open && (
        <>
          {/* Кампании */}
          <TableRow className="bg-muted/40">
            <TableCell className="font-semibold">Кампании:</TableCell>
            <TableCell colSpan={5}></TableCell>
          </TableRow>
          {segment.campaigns
            .filter((c) => !excluded.has(c.id))
            .map((c) => (
              <TableRow key={c.id}>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#{c.id}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{c.title}</div>
                        {c.hasWarning && (
                          <Popover>
                            <PopoverTrigger className="text-red-600"><AlertTriangle className="h-4 w-4" /></PopoverTrigger>
                            <PopoverContent align="center" className="w-64 text-sm">
                              <div className="font-medium mb-1">Рекомендация</div>
                              <div className="text-xs text-muted-foreground mb-2">на сегодня</div>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>Отключите объявление</li>
                                <li>Отметить как согласовано</li>
                              </ul>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{c.desc}</div>
                      <button
                        onClick={() => onToggleExclude(c.id)}
                        className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" /> Исключить
                      </button>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
                  </div>
                </TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell>
                  <MetricCell />
                </TableCell>
                <TableCell><MetricCell /></TableCell>
              </TableRow>
            ))}

          {/* Плашка с исключенными */}
          {Array.from(excluded).filter((id) => segment.campaigns.some((c) => c.id === id)).length > 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  Исключено: {segment.campaigns
                    .filter((c) => excluded.has(c.id))
                    .map((c) => (
                      <button key={c.id} onClick={() => onToggleExclude(c.id)} className="ml-2 underline hover:text-foreground">
                        #{c.id} вернуть
                      </button>
                    ))}
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* Группы */}
          <TableRow className="bg-muted/40">
            <TableCell className="font-semibold">Группы:</TableCell>
            <TableCell colSpan={5}></TableCell>
          </TableRow>
          {segment.groups.map((g) => (
            <TableRow key={g.id}>
              <TableCell className="align-top">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">#{g.id}</span>
                  <div className="font-medium">{g.title}</div>
                </div>
              </TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
            </TableRow>
          ))}

          {/* Объявления */}
          <TableRow className="bg-muted/40">
            <TableCell className="font-semibold">Объявления:</TableCell>
            <TableCell colSpan={5}></TableCell>
          </TableRow>
          {segment.ads.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="align-top">
                <div className="flex items-start gap-2">
                  {a.warning && <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />}
                  <div className="font-medium">{a.title}</div>
                </div>
              </TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
              <TableCell><MetricCell /></TableCell>
            </TableRow>
          ))}
        </>
      )}
    </>
  );
}

export default function Dashboard() {
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const segments: Segment[] = useMemo(
    () => [
      {
        id: 1,
        name: "Android",
        info: "AD_NETWORK | Мужчины | Смартфон | Android",
        defaultOpen: true,
        campaigns: [
          { id: "345745", title: "Ушедших по ветру и снегу", desc: "CPA, дорогая. Оплата за конверсии. Уменьш. запросы спроса", hasWarning: true },
          { id: "367878", title: "Самокатъ", desc: "CPA, дорога. Оплата за конверсии. Узкие запросы" },
        ],
        groups: [
          { id: "333433", title: "Группа объявлений" },
          { id: "353443", title: "Группа объявлений" },
        ],
        ads: [
          { id: "ad1", title: "Реклама про снег да ветер", warning: true },
        ],
      },
      {
        id: 2,
        name: "IOS",
        info: "AD_NETWORK | Мужчины | Смартфон | iOS",
        campaigns: [],
        groups: [],
        ads: [],
      },
      {
        id: 3,
        name: "ОС все",
        info: "AD_NETWORK | Мужчины | ОС все",
        campaigns: [],
        groups: [],
        ads: [],
      },
    ],
    [],
  );

  const toggleExclude = (id: string) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-4">
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2 text-sm">
          <div className="font-medium">Анализ по полу и устройству в ��етях</div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <button className="inline-flex items-center gap-1 hover:text-foreground">
              <span>Источн.</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[420px]">&nbsp;</TableHead>
                <TableHead className="text-center">Сред. CPA</TableHead>
                <TableHead className="text-center">Расход ₽</TableHead>
                <TableHead className="text-center">Расход %</TableHead>
                <TableHead className="text-center">Онлайн конверсии</TableHead>
                <TableHead className="text-center">CR (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Итого по цели</TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell><MetricCell /></TableCell>
                <TableCell><MetricCell /></TableCell>
              </TableRow>

              <TableRow className="bg-red-100/70">
                <TableCell className="font-semibold text-red-800">Дорогие сегменты</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {segments.map((s) => (
                <SegmentBlock key={s.id} segment={s} excluded={excluded} onToggleExclude={toggleExclude} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
