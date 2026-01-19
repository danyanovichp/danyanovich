import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

export interface LandingFeature {
  icon: string;
  title: string;
  description: string;
}

export interface LandingAudience {
  icon?: string;
  title: string;
  description: string;
}

export interface LandingScreenshot {
  url: string;
  caption?: string;
}

export interface LandingData {
  id?: string;
  template_id: string;
  headline: string;
  subheadline: string;
  main_image: string;
  pain_points: string[];
  solution_intro: string;
  solution_description: string;
  features: LandingFeature[];
  views: string[];
  target_audience: LandingAudience[];
  screenshots: LandingScreenshot[];
}

const emptyLanding: LandingData = {
  template_id: "",
  headline: "",
  subheadline: "",
  main_image: "",
  pain_points: [""],
  solution_intro: "",
  solution_description: "",
  features: [{ icon: "✅", title: "", description: "" }],
  views: [""],
  target_audience: [{ title: "", description: "" }],
  screenshots: [],
};

export function useLandingEditor(templateId?: string) {
  const [landing, setLanding] = useState<LandingData>(emptyLanding);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (templateId) {
      fetchLanding(templateId);
    } else {
      setLanding(emptyLanding);
    }
  }, [templateId]);

  const fetchLanding = async (id: string) => {
    setIsLoading(true);
    try {
      // Use RPC function for public access (excludes created_by for security)
      const { data, error } = await supabase
        .rpc("get_public_template_landing", { p_template_id: id });

      if (error) throw error;

      // RPC returns an array, get first item
      const landingData = Array.isArray(data) ? data[0] : null;

      if (landingData) {
        // Handle migration from old string[] format to new object format
        const rawScreenshots = landingData.screenshots as unknown;
        let parsedScreenshots: LandingScreenshot[] = [];
        if (Array.isArray(rawScreenshots)) {
          parsedScreenshots = rawScreenshots.map((item: unknown) => {
            if (typeof item === 'string') {
              return { url: item, caption: '' };
            }
            return item as LandingScreenshot;
          });
        }
        
        setLanding({
          id: landingData.id,
          template_id: landingData.template_id,
          headline: landingData.headline || "",
          subheadline: landingData.subheadline || "",
          main_image: landingData.main_image || "",
          pain_points: (landingData.pain_points as unknown as string[]) || [""],
          solution_intro: landingData.solution_intro || "",
          solution_description: landingData.solution_description || "",
          features: (landingData.features as unknown as LandingFeature[]) || [{ icon: "✅", title: "", description: "" }],
          views: (landingData.views as unknown as string[]) || [""],
          target_audience: (landingData.target_audience as unknown as LandingAudience[]) || [{ title: "", description: "" }],
          screenshots: parsedScreenshots,
        });
      } else {
        setLanding({ ...emptyLanding, template_id: id });
      }
    } catch (error) {
      console.error("Error fetching landing:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные лендинга",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveLanding = async () => {
    if (!landing.template_id || !landing.headline) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля (ID шаблона и заголовок)",
        variant: "destructive",
      });
      return false;
    }

    setIsSaving(true);
    try {
      const dataToSave = {
        template_id: landing.template_id,
        headline: landing.headline,
        subheadline: landing.subheadline,
        main_image: landing.main_image || null,
        pain_points: landing.pain_points.filter(p => p.trim()) as unknown as Json,
        solution_intro: landing.solution_intro,
        solution_description: landing.solution_description,
        features: landing.features.filter(f => f.title.trim()) as unknown as Json,
        views: landing.views.filter(v => v.trim()) as unknown as Json,
        target_audience: landing.target_audience.filter(a => a.title.trim()) as unknown as Json,
        screenshots: landing.screenshots as unknown as Json,
      };

      if (landing.id) {
        const { error } = await supabase
          .from("template_landings")
          .update(dataToSave)
          .eq("id", landing.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("template_landings")
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;
        setLanding(prev => ({ ...prev, id: data.id }));
      }

      toast({
        title: "Сохранено",
        description: "Лендинг успешно сохранён",
      });
      return true;
    } catch (error: any) {
      console.error("Error saving landing:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось сохранить лендинг",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <K extends keyof LandingData>(field: K, value: LandingData[K]) => {
    setLanding(prev => ({ ...prev, [field]: value }));
  };

  const addPainPoint = () => {
    setLanding(prev => ({
      ...prev,
      pain_points: [...prev.pain_points, ""],
    }));
  };

  const removePainPoint = (index: number) => {
    setLanding(prev => ({
      ...prev,
      pain_points: prev.pain_points.filter((_, i) => i !== index),
    }));
  };

  const updatePainPoint = (index: number, value: string) => {
    setLanding(prev => ({
      ...prev,
      pain_points: prev.pain_points.map((p, i) => (i === index ? value : p)),
    }));
  };

  const addFeature = () => {
    setLanding(prev => ({
      ...prev,
      features: [...prev.features, { icon: "✅", title: "", description: "" }],
    }));
  };

  const removeFeature = (index: number) => {
    setLanding(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, field: keyof LandingFeature, value: string) => {
    setLanding(prev => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    }));
  };

  const addView = () => {
    setLanding(prev => ({
      ...prev,
      views: [...prev.views, ""],
    }));
  };

  const removeView = (index: number) => {
    setLanding(prev => ({
      ...prev,
      views: prev.views.filter((_, i) => i !== index),
    }));
  };

  const updateView = (index: number, value: string) => {
    setLanding(prev => ({
      ...prev,
      views: prev.views.map((v, i) => (i === index ? value : v)),
    }));
  };

  const addAudience = () => {
    setLanding(prev => ({
      ...prev,
      target_audience: [...prev.target_audience, { title: "", description: "" }],
    }));
  };

  const removeAudience = (index: number) => {
    setLanding(prev => ({
      ...prev,
      target_audience: prev.target_audience.filter((_, i) => i !== index),
    }));
  };

  const updateAudience = (index: number, field: keyof LandingAudience, value: string) => {
    setLanding(prev => ({
      ...prev,
      target_audience: prev.target_audience.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    }));
  };

  const addScreenshot = (url: string, caption?: string) => {
    setLanding(prev => ({
      ...prev,
      screenshots: [...prev.screenshots, { url, caption: caption || '' }],
    }));
  };

  const removeScreenshot = (index: number) => {
    setLanding(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const updateScreenshotCaption = (index: number, caption: string) => {
    setLanding(prev => ({
      ...prev,
      screenshots: prev.screenshots.map((s, i) => 
        i === index ? { ...s, caption } : s
      ),
    }));
  };

  const reorderScreenshots = (fromIndex: number, toIndex: number) => {
    setLanding(prev => {
      const newScreenshots = [...prev.screenshots];
      const [movedItem] = newScreenshots.splice(fromIndex, 1);
      newScreenshots.splice(toIndex, 0, movedItem);
      return {
        ...prev,
        screenshots: newScreenshots,
      };
    });
  };

  return {
    landing,
    isLoading,
    isSaving,
    setLanding,
    saveLanding,
    updateField,
    addPainPoint,
    removePainPoint,
    updatePainPoint,
    addFeature,
    removeFeature,
    updateFeature,
    addView,
    removeView,
    updateView,
    addAudience,
    removeAudience,
    updateAudience,
    addScreenshot,
    removeScreenshot,
    updateScreenshotCaption,
    reorderScreenshots,
  };
}
