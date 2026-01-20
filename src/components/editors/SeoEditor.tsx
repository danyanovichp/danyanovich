import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface SeoData {
  seo_title_ru: string;
  seo_title_en: string;
  seo_description_ru: string;
  seo_description_en: string;
  seo_keywords: string;
}

interface SeoEditorProps {
  data: SeoData;
  onChange: <K extends keyof SeoData>(field: K, value: string) => void;
}

export function SeoEditor({ data, onChange }: SeoEditorProps) {
  const titleRuLength = data.seo_title_ru?.length || 0;
  const titleEnLength = data.seo_title_en?.length || 0;
  const descRuLength = data.seo_description_ru?.length || 0;
  const descEnLength = data.seo_description_en?.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          SEO Метаданные
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Title (RU)
              <span
                className={`ml-2 text-xs ${
                  titleRuLength > 60 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {titleRuLength}/60
              </span>
            </Label>
            <Input
              value={data.seo_title_ru || ""}
              onChange={(e) => onChange("seo_title_ru", e.target.value)}
              placeholder="Название шаблона | Notion | Дэн Янович"
              maxLength={70}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Title (EN)
              <span
                className={`ml-2 text-xs ${
                  titleEnLength > 60 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {titleEnLength}/60
              </span>
            </Label>
            <Input
              value={data.seo_title_en || ""}
              onChange={(e) => onChange("seo_title_en", e.target.value)}
              placeholder="Template Name | Notion | Dan Yanovich"
              maxLength={70}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Description (RU)
              <span
                className={`ml-2 text-xs ${
                  descRuLength > 160 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {descRuLength}/160
              </span>
            </Label>
            <Textarea
              value={data.seo_description_ru || ""}
              onChange={(e) => onChange("seo_description_ru", e.target.value)}
              placeholder="Описание шаблона для поисковых систем..."
              rows={3}
              maxLength={200}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Description (EN)
              <span
                className={`ml-2 text-xs ${
                  descEnLength > 160 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {descEnLength}/160
              </span>
            </Label>
            <Textarea
              value={data.seo_description_en || ""}
              onChange={(e) => onChange("seo_description_en", e.target.value)}
              placeholder="Template description for search engines..."
              rows={3}
              maxLength={200}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Keywords</Label>
          <Textarea
            value={data.seo_keywords || ""}
            onChange={(e) => onChange("seo_keywords", e.target.value)}
            placeholder="notion, шаблон, template, productivity, gtd, second brain"
            rows={2}
          />
          <p className="text-xs text-muted-foreground">
            Ключевые слова через запятую. Используются для обоих языков.
          </p>
        </div>

        {/* Preview */}
        <div className="space-y-2 pt-4 border-t">
          <Label className="text-muted-foreground">Превью в Google (RU)</Label>
          <div className="p-4 bg-muted/30 rounded-lg space-y-1">
            <p className="text-blue-600 text-lg font-medium truncate">
              {data.seo_title_ru || "Название страницы"}
            </p>
            <p className="text-green-700 text-sm">
              danyanovich.com › templates
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {data.seo_description_ru || "Описание страницы будет отображаться здесь..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
