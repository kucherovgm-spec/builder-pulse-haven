import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ChevronDown, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function CellNumber() {
  return <div className="text-center text-sm">111</div>;
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-4">
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2 text-sm">
          <div className="font-medium">Анализ по полу и устройству в Сетях</div>
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
              <TableRow className="bg-red-50">
                <TableCell className="font-medium text-red-700">Итого по цели</TableCell>
                <TableCell colSpan={5}>
                  <div className="grid grid-cols-5">
                    <CellNumber />
                    <CellNumber />
                    <CellNumber />
                    <CellNumber />
                    <CellNumber />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className="bg-red-100/70">
                <TableCell className="font-semibold text-red-800 flex items-center gap-2">Дорогие сегменты <Badge variant="secondary" className="text-[10px]">Значимость корреляции</Badge></TableCell>
                <TableCell className="text-center">—</TableCell>
                <TableCell className="text-center">—</TableCell>
                <TableCell className="text-center">—</TableCell>
                <TableCell className="text-center">—</TableCell>
                <TableCell className="text-center">—</TableCell>
              </TableRow>

              {/* Сегменты */}
              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#1</span>
                    <div>
                      <div className="text-brand font-medium">"Android"</div>
                      <div className="text-xs text-muted-foreground">AD_NETWORK | Мужчины | Смартфон | Android</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#2</span>
                    <div>
                      <div className="text-brand font-medium">"IOS"</div>
                      <div className="text-xs text-muted-foreground">AD_NETWORK | Мужчины | Смартфон | iOS</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#3</span>
                    <div>
                      <div className="text-brand font-medium">"ОС все"</div>
                      <div className="text-xs text-muted-foreground">AD_NETWORK | Мужчины | ОС все</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>

              {/* Кампании */}
              <TableRow className="bg-muted/40">
                <TableCell className="font-semibold">Кампании:</TableCell>
                <TableCell colSpan={5}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#345745</span>
                    <div>
                      <div className="font-medium">Ушедших по ветру и снегу</div>
                      <div className="text-xs text-muted-foreground">CPA, дорогая. Оплата за конверсии. Уменьш. запросы спроса</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <CellNumber />
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
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#367878</span>
                    <div>
                      <div className="font-medium">Самокатъ</div>
                      <div className="text-xs text-muted-foreground">CPA, дорога. Оплата за конверсии. Узкие запросы</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">12%<Info className="h-3 w-3" /></div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>

              {/* Группы */}
              <TableRow className="bg-muted/40">
                <TableCell className="font-semibold">Группы:</TableCell>
                <TableCell colSpan={5}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#333433</span>
                    <div>
                      <div className="font-medium">Группа объявлений</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">#353443</span>
                    <div>
                      <div className="font-medium">Группа объявлений</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>

              {/* Объявления */}
              <TableRow className="bg-muted/40">
                <TableCell className="font-semibold">Объявления:</TableCell>
                <TableCell colSpan={5}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Реклама про снег да ветер</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
                <TableCell><CellNumber /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
