import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, Save, Loader2, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface InlineEditPanelProps {
  isEditing: boolean;
  isSaving: boolean;
  templateId: string;
  onToggleEdit: () => void;
  onSave: () => void;
  hasUnsavedChanges?: boolean;
}

export function InlineEditPanel({
  isEditing,
  isSaving,
  templateId,
  onToggleEdit,
  onSave,
  hasUnsavedChanges = false,
}: InlineEditPanelProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg">
      {isEditing && hasUnsavedChanges && (
        <span className="text-xs text-amber-500 px-2">Есть несохранённые изменения</span>
      )}
      
      <Button
        variant={isEditing ? "secondary" : "default"}
        size="sm"
        onClick={onToggleEdit}
        className="gap-2"
      >
        {isEditing ? (
          <>
            <Eye className="h-4 w-4" />
            Просмотр
          </>
        ) : (
          <>
            <Pencil className="h-4 w-4" />
            Редактировать
          </>
        )}
      </Button>

      {isEditing && (
        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Сохранить
            </>
          )}
        </Button>
      )}

      <Link to={`/admin/landings/${templateId}`}>
        <Button variant="ghost" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
