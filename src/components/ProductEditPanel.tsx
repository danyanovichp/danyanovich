import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Package, Link as LinkIcon, DollarSign, Tag, Settings } from "lucide-react";
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
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5 text-primary" />
          Редактирование продукта
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status & Category Row */}
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

        {/* Icon */}
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

        {/* Price */}
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

        {/* Links */}
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

        {/* Visibility toggles */}
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

        {/* Save Button */}
        <Button onClick={onSave} disabled={isSaving} className="w-full gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Сохранить продукт
        </Button>
      </CardContent>
    </Card>
  );
}
