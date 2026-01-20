import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, GripVertical, Save, Loader2, HelpCircle } from "lucide-react";
import { useTemplateFaq, FaqItem } from "@/hooks/useTemplateFaq";

interface FaqEditorProps {
  templateId: string;
}

export function FaqEditor({ templateId }: FaqEditorProps) {
  const {
    faqs,
    isLoading,
    isSaving,
    addFaq,
    removeFaq,
    updateFaq,
    reorderFaqs,
    saveFaqs,
  } = useTemplateFaq(templateId);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      reorderFaqs(dragIndex, dropIndex);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          FAQ ({faqs.length})
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addFaq}>
            <Plus className="h-4 w-4 mr-1" />
            Добавить
          </Button>
          <Button size="sm" onClick={saveFaqs} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Сохранить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Нет вопросов. Нажмите "Добавить" для создания нового FAQ.
          </p>
        ) : (
          <Accordion type="multiple" className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border rounded-lg px-4"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 w-full">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <span className="text-sm font-medium truncate flex-1 text-left">
                      {faq.question_ru || `Вопрос ${index + 1}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFaq(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Вопрос (RU) *</Label>
                      <Input
                        value={faq.question_ru}
                        onChange={(e) => updateFaq(index, "question_ru", e.target.value)}
                        placeholder="Как получить доступ к шаблону?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Вопрос (EN)</Label>
                      <Input
                        value={faq.question_en}
                        onChange={(e) => updateFaq(index, "question_en", e.target.value)}
                        placeholder="How do I get access to the template?"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ответ (RU) *</Label>
                      <Textarea
                        value={faq.answer_ru}
                        onChange={(e) => updateFaq(index, "answer_ru", e.target.value)}
                        placeholder="После оплаты вы получите ссылку..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ответ (EN)</Label>
                      <Textarea
                        value={faq.answer_en}
                        onChange={(e) => updateFaq(index, "answer_en", e.target.value)}
                        placeholder="After payment, you will receive a link..."
                        rows={3}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
