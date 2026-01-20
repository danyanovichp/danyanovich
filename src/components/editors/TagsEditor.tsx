import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Save, Loader2, Tag, Check } from "lucide-react";
import { useTemplateTags } from "@/hooks/useTemplateTags";

interface TagsEditorProps {
  templateId: string;
}

const TAG_COLORS = [
  "#EF4444", // red
  "#F97316", // orange
  "#F59E0B", // amber
  "#EAB308", // yellow
  "#84CC16", // lime
  "#22C55E", // green
  "#14B8A6", // teal
  "#06B6D4", // cyan
  "#0EA5E9", // sky
  "#3B82F6", // blue
  "#6366F1", // indigo
  "#8B5CF6", // violet
  "#A855F7", // purple
  "#D946EF", // fuchsia
  "#EC4899", // pink
  "#6B7280", // gray
];

export function TagsEditor({ templateId }: TagsEditorProps) {
  const {
    allTags,
    templateTags,
    isLoading,
    isSaving,
    toggleTag,
    createTag,
    deleteTag,
    saveTemplateTags,
  } = useTemplateTags(templateId);

  const [newTagName, setNewTagName] = useState("");
  const [newTagNameEn, setNewTagNameEn] = useState("");
  const [newTagColor, setNewTagColor] = useState("#6B7280");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    await createTag(newTagName, newTagNameEn || undefined, newTagColor);
    setNewTagName("");
    setNewTagNameEn("");
    setNewTagColor("#6B7280");
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Теги ({templateTags.length} выбрано)
        </CardTitle>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Новый тег
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать новый тег</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Название (RU) *</Label>
                  <Input
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Продуктивность"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Название (EN)</Label>
                  <Input
                    value={newTagNameEn}
                    onChange={(e) => setNewTagNameEn(e.target.value)}
                    placeholder="Productivity"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цвет</Label>
                  <div className="flex flex-wrap gap-2">
                    {TAG_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewTagColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                          newTagColor === color ? "border-foreground scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreateTag} disabled={!newTagName.trim()}>
                    Создать
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" onClick={saveTemplateTags} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Сохранить
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {allTags.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Нет тегов. Создайте новый тег.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = templateTags.includes(tag.id);
              return (
                <div key={tag.id} className="group relative">
                  <Badge
                    variant="outline"
                    className={`cursor-pointer transition-all px-3 py-1.5 text-sm ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-primary"
                        : "hover:ring-1 hover:ring-muted-foreground"
                    }`}
                    style={{
                      backgroundColor: isSelected ? tag.color : "transparent",
                      borderColor: tag.color,
                      color: isSelected ? "white" : tag.color,
                    }}
                    onClick={() => toggleTag(tag.id)}
                  >
                    {isSelected && <Check className="h-3 w-3 mr-1" />}
                    {tag.name_ru}
                  </Badge>
                  <button
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTag(tag.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
