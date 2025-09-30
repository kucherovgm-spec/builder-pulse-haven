import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ChevronDown, Info, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const METRIC_COLUMNS = [
  "Средний CPA",
  "Расход",
  "Расх (%)",
  "Онлайн конв",
  "CR (%)",
  "Квал лиды",
  "CPL",
  "Показы",
  "Клики",
  "CPC",
  "CTR%",
  "ср. Отказы",
];

function MetricCell({ variant = "none" }: { variant?: "none" | "bad" | "good" }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "text-sm leading-none rounded px-2 py-0.5",
          variant === "bad" && "bg-red-50 text-red-700 ring-1 ring-red-200 font-semibold",
          variant === "good" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        )}
      >
        111
      </div>
      <div className="mt-1 flex gap-3 text-[10px] text-muted-foreground">
        <span>10</span>
        <span>20</span>
        <span>40</span>
      </div>
    </div>
  );
}

function MetricCellsRow({ firstVariant = "none" }: { firstVariant?: "none" | "bad" | "good" }) {
  return (
    <>
      {METRIC_COLUMNS.map((_, i) => (
        <TableCell key={i}>
          <MetricCell variant={i === 0 ? firstVariant : "none"} />
        </TableCell>
      ))}
    </>
  );
}

type Campaign = { id: string; title: string; desc: string; hasWarning?: boolean };
type Group = { id: string; title: string };
type Ad = { id: string; title: string; warning?: boolean };

type Segment = {
  id: number;
  info: string; // полное им�� сегмента (сразу выводится)
  defaultOpen?: boolean;
  campaigns: Campaign[];
  groups: Group[];
  ads: Ad[];
};

function SegmentBlock({ segment, excluded, onToggleExclude, highlightCPA = false }: { segment: Segment; excluded: Set<string>; onToggleExclude: (id: string) => void; highlightCPA?: boolean }) {
  const [open, setOpen] = useState<boolean>(!!segment.defaultOpen);
  const [campRecs, setCampRecs] = useState<Record<string, string>>({});
  const [adRecs, setAdRecs] = useState<Record<string, string>>({});
  return (
    <>
      <TableRow>
        <TableCell className={cn("align-top", highlightCPA ? "bg-red-50" : "bg-emerald-50/60")}>
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
        <MetricCellsRow firstVariant={highlightCPA ? "bad" : "good"} />
      </TableRow>

      {open && (
        <>
          {/* Кампании */}
          <TableRow className="bg-muted/40">
            <TableCell className="font-semibold">Кампании:</TableCell>
            <TableCell colSpan={METRIC_COLUMNS.length}></TableCell>
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
                            <PopoverContent align="center" className="w-72 text-sm">
                              <div className="font-medium mb-1">Рекомендация</div>
                              <textarea
                                className="mt-2 w-full rounded border bg-background p-2 text-sm"
                                rows={4}
                                value={campRecs[c.id] ?? "Отключите объявление"}
                                onChange={(e) => setCampRecs((m) => ({ ...m, [c.id]: e.target.value }))}
                              />
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
                {METRIC_COLUMNS.map((_, i) => (
                  <TableCell key={i}>
                    <div className="flex items-center justify-center gap-1">
                      <MetricCell />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {/* Плашка с исключенными */}
          {Array.from(excluded).filter((id) => segment.campaigns.some((c) => c.id === id)).length > 0 && (
            <TableRow>
              <TableCell colSpan={METRIC_COLUMNS.length + 1}>
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
            <TableCell colSpan={METRIC_COLUMNS.length}></TableCell>
          </TableRow>
          {segment.groups.map((g) => (
            <TableRow key={g.id}>
              <TableCell className="align-top">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">#{g.id}</span>
                  <div className="font-medium">{g.title}</div>
                </div>
              </TableCell>
              <MetricCellsRow firstVariant="none" />
            </TableRow>
          ))}

          {/* Объявления */}
          <TableRow className="bg-muted/40">
            <TableCell className="font-semibold">Объявления:</TableCell>
            <TableCell colSpan={METRIC_COLUMNS.length}></TableCell>
          </TableRow>
          {segment.ads.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="align-top">
                <div className="flex items-start gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{a.title}</div>
                    {a.warning && (
                      <Popover>
                        <PopoverTrigger className="text-red-600"><AlertTriangle className="h-4 w-4" /></PopoverTrigger>
                        <PopoverContent align="center" className="w-72 text-sm">
                          <div className="font-medium mb-1">Рекомендация</div>
                          <textarea
                            className="mt-2 w-full rounded border bg-background p-2 text-sm"
                            rows={4}
                            value={adRecs[a.id] ?? "Отключите объявление"}
                            onChange={(e) => setAdRecs((m) => ({ ...m, [a.id]: e.target.value }))}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
              </TableCell>
              {METRIC_COLUMNS.map((_, i) => (
                <TableCell key={i}>
                  <div className="flex items-center justify-center gap-1">
                    <MetricCell />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </>
      )}
    </>
  );
}

function AnalysisTable({ title, segments, excluded, onToggleExclude }: { title: string; segments: Segment[]; excluded: Set<string>; onToggleExclude: (id: string) => void }) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2 text-sm">
        <div className="font-medium">{title}</div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[520px]">&nbsp;</TableHead>
              {METRIC_COLUMNS.map((col) => (
                <TableHead key={col} className="text-center">{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Итого по цели</TableCell>
              <MetricCellsRow firstVariant="none" />
            </TableRow>

            {segments.map((s, i) => (
              <SegmentBlock key={s.id} segment={s} excluded={excluded} onToggleExclude={onToggleExclude} highlightCPA={i < 2} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const segmentsA: Segment[] = useMemo(
    () => [
      {
        id: 1,
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
        info: "AD_NETWORK | Мужчины | Смартфон | iOS",
        campaigns: [],
        groups: [],
        ads: [],
      },
      {
        id: 3,
        info: "AD_NETWORK | Мужчины | ОС все",
        campaigns: [],
        groups: [],
        ads: [],
      },
    ],
    [],
  );

  const segmentsB: Segment[] = useMemo(
    () => [
      { id: 4, info: "Поиск | Регион Москва | Десктоп", campaigns: [], groups: [], ads: [] },
      { id: 5, info: "Поиск | Мужчины | Смартфон", campaigns: [], groups: [], ads: [] },
      { id: 6, info: "Поиск | Все | Смартфон", campaigns: [], groups: [], ads: [] },
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
      <div className="max-h-[calc(100vh-180px)] overflow-y-auto space-y-6 pr-2">
        <AnalysisTable title="Анализ по полу и устройству в Сетях" segments={segmentsA} excluded={excluded} onToggleExclude={toggleExclude} />
        <AnalysisTable title="Анализ по условию показа на поиске" segments={segmentsB} excluded={excluded} onToggleExclude={toggleExclude} />
      </div>
    </div>
  );
}
