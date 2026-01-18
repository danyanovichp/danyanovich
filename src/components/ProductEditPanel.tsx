import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Save, Package, Link as LinkIcon, DollarSign, Tag, Settings, Plus, Trash2, FileText, Globe, Sparkles, Calendar } from "lucide-react";
import { ProductData } from "@/hooks/useProductEditor";

const ICON_OPTIONS = [
  "Layout", "Calendar", "Target", "Brain", "Briefcase", "Folder", "Database",
  "BookOpen", "User", "FileText", "ShoppingCart", "Sparkles", "Eye", "GraduationCap",
  "Notebook", "TrendingUp", "Building", "Home", "Dumbbell", "Search", "Megaphone",
  "FileCheck", "Share2", "Bitcoin", "BarChart3", "FolderKanban", "ClipboardList", "Wallet"
];

const CATEGORY_OPTIONS = [
  { value: 'productivity', label: 'Продуктивность' },
  { value: 'business', label: 'Бизнес' },
  { value: 'personal', label: 'Личное' },
  { value: 'finance', label: 'Финансы' },
];

interface ProductEditPanelProps {
  product: ProductData;
  isSaving: boolean;
  onUpdate: <K extends keyof ProductData>(field: K, value: ProductData[K]) => void;
  onSave: () => Promise<boolean>;
  hasChanges?: boolean;
}

export function ProductEditPanel({ product, isSaving, onUpdate, onSave }: ProductEditPanelProps) {
  const handleAddFeatureRu = () => {
    onUpdate('features_ru', [...product.features_ru, '']);
  };

  const handleRemoveFeatureRu = (index: number) => {
    onUpdate('features_ru', product.features_ru.filter((_, i) => i !== index));
  };

  const handleUpdateFeatureRu = (index: number, value: string) => {
    const newFeatures = [...product.features_ru];
    newFeatures[index] = value;
    onUpdate('features_ru', newFeatures);
  };

  const handleAddFeatureEn = () => {
    onUpdate('features_en', [...product.features_en, '']);
  };

  const handleRemoveFeatureEn = (index: number) => {
    onUpdate('features_en', product.features_en.filter((_, i) => i !== index));
  };

  const handleUpdateFeatureEn = (index: number, value: string) => {
    const newFeatures = [...product.features_en];
    newFeatures[index] = value;
    onUpdate('features_en', newFeatures);
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5 text-primary" />
          Редактирование продукта
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" defaultValue={["basic", "titles"]} className="space-y-2">
          {/* Basic Settings */}
          <AccordionItem value="basic" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Основные настройки
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Статус
                  </Label>
                  <Select
                    value={product.status}
                    onValueChange={(value: 'available' | 'development') => onUpdate('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">✅ Доступен</SelectItem>
                      <SelectItem value="development">🚧 В разработке</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Категория
                  </Label>
                  <Select
                    value={product.category}
                    onValueChange={(value) => onUpdate('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Иконка</Label>
                <Select
                  value={product.icon}
                  onValueChange={(value) => onUpdate('icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите иконку" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {ICON_OPTIONS.map(icon => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label htmlFor="is_visible" className="cursor-pointer">Виден на сайте</Label>
                  <Switch
                    id="is_visible"
                    checked={product.is_visible}
                    onCheckedChange={(checked) => onUpdate('is_visible', checked)}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label htmlFor="display_on_home" className="cursor-pointer">На главной</Label>
                  <Switch
                    id="display_on_home"
                    checked={product.display_on_home}
                    onCheckedChange={(checked) => onUpdate('display_on_home', checked)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Titles & Descriptions */}
          <AccordionItem value="titles" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Названия и описания
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    🇷🇺 Название (RU)
                  </Label>
                  <Input
                    value={product.title_ru}
                    onChange={(e) => onUpdate('title_ru', e.target.value)}
                    placeholder="Название на русском"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    🇬🇧 Название (EN)
                  </Label>
                  <Input
                    value={product.title_en}
                    onChange={(e) => onUpdate('title_en', e.target.value)}
                    placeholder="Title in English"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>🇷🇺 Краткое описание (RU)</Label>
                  <Textarea
                    value={product.description_ru}
                    onChange={(e) => onUpdate('description_ru', e.target.value)}
                    placeholder="Краткое описание"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>🇬🇧 Краткое описание (EN)</Label>
                  <Textarea
                    value={product.description_en}
                    onChange={(e) => onUpdate('description_en', e.target.value)}
                    placeholder="Short description"
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>🇷🇺 Полное описание (RU)</Label>
                  <Textarea
                    value={product.full_description_ru || ''}
                    onChange={(e) => onUpdate('full_description_ru', e.target.value || null)}
                    placeholder="Полное описание для SEO"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>🇬🇧 Полное описание (EN)</Label>
                  <Textarea
                    value={product.full_description_en || ''}
                    onChange={(e) => onUpdate('full_description_en', e.target.value || null)}
                    placeholder="Full description for SEO"
                    rows={3}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price & Links */}
          <AccordionItem value="price" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Цена и ссылки
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Цена (текст)
                  </Label>
                  <Input
                    value={product.price}
                    onChange={(e) => onUpdate('price', e.target.value)}
                    placeholder="5 000 ₽"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цена (число)</Label>
                  <Input
                    type="number"
                    value={product.price_value}
                    onChange={(e) => onUpdate('price_value', parseInt(e.target.value) || 0)}
                    placeholder="5000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Ссылка на покупку (Notion)
                  </Label>
                  <Input
                    value={product.link || ''}
                    onChange={(e) => onUpdate('link', e.target.value || null)}
                    placeholder="https://web.tribute.tg/p/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Ссылка Buildin.AI
                  </Label>
                  <Input
                    value={product.buildin_link || ''}
                    onChange={(e) => onUpdate('buildin_link', e.target.value || null)}
                    placeholder="https://buildin.ai/..."
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Features RU */}
          <AccordionItem value="features_ru" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                🇷🇺 Функции (RU) ({product.features_ru.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-4">
              {product.features_ru.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleUpdateFeatureRu(index, e.target.value)}
                    placeholder="Функция шаблона"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFeatureRu(index)}
                    className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddFeatureRu}
                className="gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                Добавить функцию
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Features EN */}
          <AccordionItem value="features_en" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                🇬🇧 Функции (EN) ({product.features_en.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-4">
              {product.features_en.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleUpdateFeatureEn(index, e.target.value)}
                    placeholder="Template feature"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFeatureEn(index)}
                    className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddFeatureEn}
                className="gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                Add feature
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Save Button */}
        <Button onClick={onSave} disabled={isSaving} className="w-full gap-2 mt-4">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Сохранить продукт
        </Button>
      </CardContent>
    </Card>
  );
}
