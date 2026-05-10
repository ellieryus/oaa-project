"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type RankItem = {
  id: string;
  title: string;
  description?: string;
};

type Props = {
  items: RankItem[];
  onChange?: (items: RankItem[]) => void;
  className?: string;
};

export function RankList({ items: initial, onChange, className }: Props) {
  const [items, setItems] = useState(initial);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);
    onChange?.(next);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <ul className={cn("flex flex-col gap-2", className)}>
          {items.map((item, index) => (
            <SortableRow key={item.id} item={item} rank={index + 1} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({ item, rank }: { item: RankItem; rank: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-4 rounded-md border bg-white p-4",
        isDragging
          ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg"
          : "border-oaa-hairline",
      )}
    >
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-oaa-clay text-white font-mono text-[11px] tracking-[0.04em]">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] leading-[1.5] font-medium text-oaa-ink truncate">
          {item.title}
        </div>
        {item.description && (
          <div className="text-[13px] leading-[1.45] text-oaa-muted truncate">
            {item.description}
          </div>
        )}
      </div>
      <button
        type="button"
        aria-label="Drag to reorder"
        className="cursor-grab text-oaa-muted hover:text-oaa-ink"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </li>
  );
}
