import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LandingPreview {
  template_id: string;
  main_image: string | null;
}

export function useLandingPreviews() {
  const [previews, setPreviews] = useState<Record<string, LandingPreview>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPreviews();
  }, []);

  const fetchPreviews = async () => {
    try {
      const { data, error } = await supabase
        .from("template_landings")
        .select("template_id, main_image");

      if (error) throw error;

      const previewMap: Record<string, LandingPreview> = {};
      (data || []).forEach(item => {
        previewMap[item.template_id] = {
          template_id: item.template_id,
          main_image: item.main_image,
        };
      });
      setPreviews(previewMap);
    } catch (error) {
      console.error("Error fetching landing previews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMainImage = (templateId: string): string | null => {
    return previews[templateId]?.main_image || null;
  };

  return {
    previews,
    isLoading,
    getMainImage,
  };
}
