import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProductData {
  id: string;
  icon: string;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  full_description_ru: string | null;
  full_description_en: string | null;
  price: string;
  price_value: number;
  link: string | null;
  buildin_link: string | null;
  image: string | null;
  status: 'available' | 'development';
  category: string;
  features_ru: string[];
  features_en: string[];
  is_visible: boolean;
  display_on_home: boolean;
  discount_percent: number | null;
  discount_end_date: string | null;
  promo_text: string | null;
}

const defaultProduct: ProductData = {
  id: "",
  icon: "Layout",
  title_ru: "",
  title_en: "",
  description_ru: "",
  description_en: "",
  full_description_ru: null,
  full_description_en: null,
  price: "0 ₽",
  price_value: 0,
  link: null,
  buildin_link: null,
  image: null,
  status: 'development',
  category: 'productivity',
  features_ru: [],
  features_en: [],
  is_visible: true,
  display_on_home: true,
  discount_percent: null,
  discount_end_date: null,
  promo_text: null,
};

export function useProductEditor(productId?: string) {
  const [product, setProduct] = useState<ProductData>(defaultProduct);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    } else {
      setProduct(defaultProduct);
      setExists(false);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProduct({
          id: data.id,
          icon: data.icon,
          title_ru: data.title_ru,
          title_en: data.title_en,
          description_ru: data.description_ru,
          description_en: data.description_en,
          full_description_ru: data.full_description_ru,
          full_description_en: data.full_description_en,
          price: data.price,
          price_value: data.price_value,
          link: data.link,
          buildin_link: data.buildin_link,
          image: data.image,
          status: data.status as 'available' | 'development',
          category: data.category,
          features_ru: Array.isArray(data.features_ru) ? data.features_ru as string[] : [],
          features_en: Array.isArray(data.features_en) ? data.features_en as string[] : [],
          is_visible: data.is_visible ?? true,
          display_on_home: data.display_on_home ?? true,
          discount_percent: data.discount_percent,
          discount_end_date: data.discount_end_date,
          promo_text: data.promo_text,
        });
        setExists(true);
      } else {
        setProduct({ ...defaultProduct, id });
        setExists(false);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct({ ...defaultProduct, id: id || "" });
      setExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProduct = async () => {
    if (!product.id) {
      toast({
        title: "Ошибка",
        description: "ID продукта обязателен",
        variant: "destructive",
      });
      return false;
    }

    setIsSaving(true);
    try {
      const dataToSave = {
        id: product.id,
        icon: product.icon,
        title_ru: product.title_ru,
        title_en: product.title_en,
        description_ru: product.description_ru,
        description_en: product.description_en,
        full_description_ru: product.full_description_ru,
        full_description_en: product.full_description_en,
        price: product.price,
        price_value: product.price_value,
        link: product.link,
        buildin_link: product.buildin_link,
        image: product.image,
        status: product.status,
        category: product.category,
        features_ru: product.features_ru,
        features_en: product.features_en,
        is_visible: product.is_visible,
        display_on_home: product.display_on_home,
        discount_percent: product.discount_percent,
        discount_end_date: product.discount_end_date,
        promo_text: product.promo_text,
      };

      if (exists) {
        const { error } = await supabase
          .from("products")
          .update(dataToSave)
          .eq("id", product.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert(dataToSave);

        if (error) throw error;
        setExists(true);
      }

      toast({
        title: "Сохранено",
        description: "Данные продукта успешно сохранены",
      });
      return true;
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось сохранить продукт",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <K extends keyof ProductData>(field: K, value: ProductData[K]) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  return {
    product,
    isLoading,
    isSaving,
    exists,
    setProduct,
    saveProduct,
    updateField,
    refetch: () => productId && fetchProduct(productId),
  };
}
