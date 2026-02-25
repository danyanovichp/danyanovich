import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
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
  added_date: string | null;
  popularity: number;
  is_visible: boolean;
  display_on_home: boolean;
  created_at: string;
  updated_at: string;
}


export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("popularity", { ascending: false });

      if (error) throw error;
      
      // Parse JSONB fields
      const parsedProducts = (data || []).map(p => ({
        ...p,
        features_ru: Array.isArray(p.features_ru) ? p.features_ru : [],
        features_en: Array.isArray(p.features_en) ? p.features_en : [],
      })) as Product[];
      
      setProducts(parsedProducts);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Ошибка загрузки продуктов");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  };
};
