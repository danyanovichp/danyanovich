import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineEditableListProps {
  items: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  isEditing: boolean;
  placeholder?: string;
  renderItem: (item: string, index: number) => React.ReactNode;
  className?: string;
  multiline?: boolean;
}

export function InlineEditableList({
  items,
  onUpdate,
  onAdd,
  onRemove,
  isEditing,
  placeholder = "Введите текст...",
  renderItem,
  className,
  multiline = false,
}: InlineEditableListProps) {
  if (!isEditing) {
    return <div className={className}>{items.filter(Boolean).map(renderItem)}</div>;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="shrink-0 text-muted-foreground cursor-move pt-2">
            <GripVertical className="h-4 w-4" />
          </div>
          {multiline ? (
            <Textarea
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 min-h-[60px]"
              rows={2}
            />
          ) : (
            <Input
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="gap-2 w-full"
      >
        <Plus className="h-4 w-4" />
        Добавить
      </Button>
    </div>
  );
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface InlineEditableFeaturesProps {
  features: Feature[];
  onUpdate: (index: number, field: keyof Feature, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  isEditing: boolean;
  renderItem: (feature: Feature, index: number) => React.ReactNode;
  className?: string;
}

export function InlineEditableFeatures({
  features,
  onUpdate,
  onAdd,
  onRemove,
  isEditing,
  renderItem,
  className,
}: InlineEditableFeaturesProps) {
  if (!isEditing) {
    return <div className={className}>{features.filter(f => f.title).map(renderItem)}</div>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {features.map((feature, index) => (
        <div key={index} className="p-4 border border-border rounded-xl space-y-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <Input
              value={feature.icon}
              onChange={(e) => onUpdate(index, "icon", e.target.value)}
              placeholder="Иконка (emoji)"
              className="w-20"
            />
            <Input
              value={feature.title}
              onChange={(e) => onUpdate(index, "title", e.target.value)}
              placeholder="Заголовок"
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(index)}
              className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={feature.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            placeholder="Описание"
            rows={2}
          />
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="gap-2 w-full"
      >
        <Plus className="h-4 w-4" />
        Добавить возможность
      </Button>
    </div>
  );
}

interface Audience {
  icon?: string;
  title: string;
  description: string;
}

interface InlineEditableAudienceProps {
  audience: Audience[];
  onUpdate: (index: number, field: keyof Audience, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  isEditing: boolean;
  renderItem: (item: Audience, index: number) => React.ReactNode;
  className?: string;
}

export function InlineEditableAudience({
  audience,
  onUpdate,
  onAdd,
  onRemove,
  isEditing,
  renderItem,
  className,
}: InlineEditableAudienceProps) {
  if (!isEditing) {
    return <div className={className}>{audience.filter(a => a.title).map(renderItem)}</div>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {audience.map((item, index) => (
        <div key={index} className="p-4 border border-border rounded-xl space-y-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <Input
              value={item.icon || ""}
              onChange={(e) => onUpdate(index, "icon", e.target.value)}
              placeholder="Иконка"
              className="w-20"
            />
            <Input
              value={item.title}
              onChange={(e) => onUpdate(index, "title", e.target.value)}
              placeholder="Название"
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(index)}
              className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={item.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            placeholder="Описание"
            rows={2}
          />
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="gap-2 w-full"
      >
        <Plus className="h-4 w-4" />
        Добавить аудиторию
      </Button>
    </div>
  );
}
