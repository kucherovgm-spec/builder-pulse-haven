import { useParams } from "react-router-dom";

export default function Segment() {
  const { id } = useParams();
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-6">
      <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
        Страница сегмента #{id}. Содержимое можно добавить по запросу.
      </div>
    </div>
  );
}
