import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Percent, Calendar } from "lucide-react";
import { format } from "date-fns";

interface DiscountData {
  discount_percent: number | null;
  discount_end_date: string | null;
  promo_text: string | null;
}

interface DiscountEditorProps {
  data: DiscountData;
  originalPrice: string;
  onChange: <K extends keyof DiscountData>(field: K, value: DiscountData[K]) => void;
}

export function DiscountEditor({ data, originalPrice, onChange }: DiscountEditorProps) {
  const hasDiscount = data.discount_percent && data.discount_percent > 0;
  
  // Calculate discounted price
  const priceMatch = originalPrice.match(/[\d\s]+/);
  const priceValue = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, "")) : 0;
  const discountedPrice = hasDiscount
    ? Math.round(priceValue * (1 - (data.discount_percent || 0) / 100))
    : priceValue;

  const isDiscountActive = hasDiscount && 
    (!data.discount_end_date || new Date(data.discount_end_date) > new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5" />
          Скидки и промо
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Размер скидки (%)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={data.discount_percent || ""}
                onChange={(e) =>
                  onChange("discount_percent", e.target.value ? parseInt(e.target.value) : null)
                }
                placeholder="0"
              />
              {hasDiscount && (
                <Badge variant="destructive" className="shrink-0">
                  -{data.discount_percent}%
                </Badge>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Дата окончания
            </Label>
            <Input
              type="date"
              value={data.discount_end_date || ""}
              onChange={(e) => onChange("discount_end_date", e.target.value || null)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Промо-текст</Label>
          <Input
            value={data.promo_text || ""}
            onChange={(e) => onChange("promo_text", e.target.value || null)}
            placeholder="🔥 Скидка 20% до конца недели!"
          />
          <p className="text-xs text-muted-foreground">
            Отображается рядом с ценой как бейдж
          </p>
        </div>

        {hasDiscount && (
          <div className="pt-4 border-t space-y-2">
            <Label className="text-muted-foreground">Превью цены</Label>
            <div className="flex items-center gap-3">
              <span className="text-lg line-through text-muted-foreground">
                {originalPrice}
              </span>
              <span className="text-2xl font-bold text-green-600">
                {discountedPrice.toLocaleString("ru-RU")} ₽
              </span>
              {data.promo_text && (
                <Badge variant="destructive">{data.promo_text}</Badge>
              )}
            </div>
            {data.discount_end_date && (
              <p className={`text-sm ${isDiscountActive ? "text-green-600" : "text-destructive"}`}>
                {isDiscountActive
                  ? `Активна до ${format(new Date(data.discount_end_date), "dd.MM.yyyy")}`
                  : "Скидка истекла"}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
