import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { premiumTemplates } from "@/data/premiumTemplates";
import { toast } from "sonner";

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

export interface ProductInput {
  id: string;
  icon?: string;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  full_description_ru?: string | null;
  full_description_en?: string | null;
  price: string;
  price_value?: number;
  link?: string | null;
  buildin_link?: string | null;
  image?: string | null;
  status?: 'available' | 'development';
  category?: string;
  features_ru?: string[];
  features_en?: string[];
  added_date?: string | null;
  popularity?: number;
  is_visible?: boolean;
  display_on_home?: boolean;
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

  const createProduct = async (product: ProductInput) => {
    try {
      const { error } = await supabase.from("products").insert({
        id: product.id,
        icon: product.icon || 'Layout',
        title_ru: product.title_ru,
        title_en: product.title_en,
        description_ru: product.description_ru,
        description_en: product.description_en,
        full_description_ru: product.full_description_ru,
        full_description_en: product.full_description_en,
        price: product.price,
        price_value: product.price_value || 0,
        link: product.link,
        buildin_link: product.buildin_link,
        image: product.image,
        status: product.status || 'development',
        category: product.category || 'productivity',
        features_ru: product.features_ru || [],
        features_en: product.features_en || [],
        added_date: product.added_date,
        popularity: product.popularity || 50,
        is_visible: product.is_visible ?? true,
        display_on_home: product.display_on_home ?? true,
      });

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error creating product:", err);
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<ProductInput>) => {
    try {
      const { error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  };

  const importFromStatic = async () => {
    const existingIds = new Set(products.map(p => p.id));
    const toImport = premiumTemplates.filter(t => !existingIds.has(t.id));

    if (toImport.length === 0) {
      toast.info("Все продукты уже импортированы");
      return { imported: 0, failed: 0 };
    }

    let imported = 0;
    let failed = 0;

    for (const template of toImport) {
      try {
        const { error } = await supabase.from("products").insert({
          id: template.id,
          icon: template.icon.displayName || 'Layout',
          title_ru: template.titleRu,
          title_en: template.titleEn,
          description_ru: template.descriptionRu,
          description_en: template.descriptionEn,
          full_description_ru: template.fullDescriptionRu,
          full_description_en: template.fullDescriptionEn,
          price: template.price,
          price_value: template.priceValue,
          link: template.link,
          buildin_link: null,
          image: template.image,
          status: template.status,
          category: template.category,
          features_ru: template.featuresRu,
          features_en: template.featuresEn,
          added_date: template.addedDate,
          popularity: template.popularity,
          is_visible: true,
          display_on_home: true,
        });

        if (error) {
          console.error(`Error importing ${template.id}:`, error);
          failed++;
        } else {
          imported++;
        }
      } catch (err) {
        console.error(`Error importing ${template.id}:`, err);
        failed++;
      }
    }

    await fetchProducts();
    return { imported, failed };
  };

  const bulkUpdate = async (ids: string[], updates: Partial<ProductInput>) => {
    try {
      const { error } = await supabase
        .from("products")
        .update(updates)
        .in("id", ids);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error bulk updating products:", err);
      throw err;
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
    createProduct,
    updateProduct,
    deleteProduct,
    importFromStatic,
    bulkUpdate,
  };
};
