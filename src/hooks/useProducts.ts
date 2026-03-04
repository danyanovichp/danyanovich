import { useState } from "react";

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
  const [products] = useState<Product[]>([]);

  return {
    products,
    isLoading: false,
    error: null,
    fetchProducts: () => { },
  };
};
