import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Tag {
  id: string;
  name_ru: string;
  name_en: string | null;
  color: string;
}

export function useTemplateTags(templateId?: string) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [templateTags, setTemplateTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllTags();
  }, []);

  useEffect(() => {
    if (templateId) {
      fetchTemplateTags(templateId);
    }
  }, [templateId]);

  const fetchAllTags = async () => {
    try {
      const { data, error } = await supabase
        .from("template_tags")
        .select("*")
        .order("name_ru");

      if (error) throw error;
      setAllTags(
        (data || []).map(t => ({
          ...t,
          name_en: t.name_en || "",
          color: t.color || "#6B7280",
        }))
      );
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchTemplateTags = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("template_tag_relations")
        .select("tag_id")
        .eq("template_id", id);

      if (error) throw error;
      setTemplateTags((data || []).map(r => r.tag_id));
    } catch (error) {
      console.error("Error fetching template tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setTemplateTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const createTag = async (nameRu: string, nameEn?: string, color?: string) => {
    try {
      const { data, error } = await supabase
        .from("template_tags")
        .insert({
          name_ru: nameRu,
          name_en: nameEn || null,
          color: color || "#6B7280",
        })
        .select()
        .single();

      if (error) throw error;
      setAllTags(prev => [
        ...prev,
        { ...data, name_en: data.name_en || "", color: data.color || "#6B7280" },
      ]);
      toast({
        title: "Тег создан",
        description: `Тег "${nameRu}" успешно создан`,
      });
      return data;
    } catch (error: any) {
      console.error("Error creating tag:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось создать тег",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteTag = async (tagId: string) => {
    try {
      const { error } = await supabase
        .from("template_tags")
        .delete()
        .eq("id", tagId);

      if (error) throw error;
      setAllTags(prev => prev.filter(t => t.id !== tagId));
      setTemplateTags(prev => prev.filter(id => id !== tagId));
      toast({
        title: "Тег удалён",
      });
    } catch (error: any) {
      console.error("Error deleting tag:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось удалить тег",
        variant: "destructive",
      });
    }
  };

  const saveTemplateTags = async () => {
    if (!templateId) return false;
    setIsSaving(true);

    try {
      // Delete existing relations
      await supabase
        .from("template_tag_relations")
        .delete()
        .eq("template_id", templateId);

      // Insert new relations
      if (templateTags.length > 0) {
        const { error } = await supabase.from("template_tag_relations").insert(
          templateTags.map(tagId => ({
            template_id: templateId,
            tag_id: tagId,
          }))
        );

        if (error) throw error;
      }

      toast({
        title: "Сохранено",
        description: "Теги шаблона успешно сохранены",
      });
      return true;
    } catch (error: any) {
      console.error("Error saving template tags:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось сохранить теги",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    allTags,
    templateTags,
    isLoading,
    isSaving,
    toggleTag,
    createTag,
    deleteTag,
    saveTemplateTags,
    refetch: () => {
      fetchAllTags();
      if (templateId) fetchTemplateTags(templateId);
    },
  };
}
