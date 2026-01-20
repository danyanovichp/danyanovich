import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface FaqItem {
  id?: string;
  template_id: string;
  question_ru: string;
  question_en: string;
  answer_ru: string;
  answer_en: string;
  sort_order: number;
}

export function useTemplateFaq(templateId?: string) {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (templateId) {
      fetchFaqs(templateId);
    }
  }, [templateId]);

  const fetchFaqs = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("template_faq")
        .select("*")
        .eq("template_id", id)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFaq = () => {
    if (!templateId) return;
    setFaqs(prev => [
      ...prev,
      {
        template_id: templateId,
        question_ru: "",
        question_en: "",
        answer_ru: "",
        answer_en: "",
        sort_order: prev.length,
      },
    ]);
  };

  const removeFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string | number) => {
    setFaqs(prev =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const reorderFaqs = (fromIndex: number, toIndex: number) => {
    setFaqs(prev => {
      const newFaqs = [...prev];
      const [movedItem] = newFaqs.splice(fromIndex, 1);
      newFaqs.splice(toIndex, 0, movedItem);
      return newFaqs.map((faq, i) => ({ ...faq, sort_order: i }));
    });
  };

  const saveFaqs = async () => {
    if (!templateId) return false;
    setIsSaving(true);

    try {
      // Delete existing FAQs for this template
      await supabase
        .from("template_faq")
        .delete()
        .eq("template_id", templateId);

      // Insert new FAQs
      const validFaqs = faqs.filter(f => f.question_ru.trim() && f.answer_ru.trim());
      if (validFaqs.length > 0) {
        const { error } = await supabase
          .from("template_faq")
          .insert(
            validFaqs.map((faq, index) => ({
              template_id: templateId,
              question_ru: faq.question_ru,
              question_en: faq.question_en || null,
              answer_ru: faq.answer_ru,
              answer_en: faq.answer_en || null,
              sort_order: index,
            }))
          );

        if (error) throw error;
      }

      toast({
        title: "Сохранено",
        description: "FAQ успешно сохранены",
      });
      return true;
    } catch (error: any) {
      console.error("Error saving FAQs:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось сохранить FAQ",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    faqs,
    isLoading,
    isSaving,
    addFaq,
    removeFaq,
    updateFaq,
    reorderFaqs,
    saveFaqs,
    refetch: () => templateId && fetchFaqs(templateId),
  };
}
