import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical, Save, Loader2, HelpCircle, FileText } from "lucide-react";
import { useTemplateFaq } from "@/hooks/useTemplateFaq";
import { faqTemplates, FaqTemplate } from "@/data/faqTemplates";

interface FaqEditorProps {
  templateId: string;
}

export function FaqEditor({ templateId }: FaqEditorProps) {
  const {
    faqs,
    isLoading,
    isSaving,
    addFaq,
    addFaqWithData,
    removeFaq,
    updateFaq,
    reorderFaqs,
    saveFaqs,
  } = useTemplateFaq(templateId);

  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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

  const getTemplateKey = (categoryId: string, index: number) => `${categoryId}-${index}`;

  const toggleTemplate = (key: string) => {
    setSelectedTemplates(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleCategory = (categoryId: string) => {
    const category = faqTemplates.find(c => c.id === categoryId);
    if (!category) return;

    const categoryKeys = category.items.map((_, i) => getTemplateKey(categoryId, i));
    const allSelected = categoryKeys.every(key => selectedTemplates.has(key));

    setSelectedTemplates(prev => {
      const next = new Set(prev);
      if (allSelected) {
        categoryKeys.forEach(key => next.delete(key));
      } else {
        categoryKeys.forEach(key => next.add(key));
      }
      return next;
    });
  };

  const handleAddFromTemplates = () => {
    const templatesToAdd: FaqTemplate[] = [];
    
    faqTemplates.forEach(category => {
      category.items.forEach((item, index) => {
        if (selectedTemplates.has(getTemplateKey(category.id, index))) {
          templatesToAdd.push(item);
        }
      });
    });

    templatesToAdd.forEach(template => {
      addFaq();
      const newIndex = faqs.length + templatesToAdd.indexOf(template);
      // We need to update after addFaq creates the item
      setTimeout(() => {
        updateFaq(newIndex, "question_ru", template.question_ru);
        updateFaq(newIndex, "question_en", template.question_en);
        updateFaq(newIndex, "answer_ru", template.answer_ru);
        updateFaq(newIndex, "answer_en", template.answer_en);
      }, 0);
    });

    setIsTemplateDialogOpen(false);
    setSelectedTemplates(new Set());
  };

  // Direct add from templates with immediate update
  const addFaqsFromTemplates = () => {
    const templatesToAdd: FaqTemplate[] = [];
    
    faqTemplates.forEach(category => {
      category.items.forEach((item, index) => {
        if (selectedTemplates.has(getTemplateKey(category.id, index))) {
          templatesToAdd.push(item);
        }
      });
    });

    // Add FAQs with data
    templatesToAdd.forEach(template => {
      addFaqWithData({
        question_ru: template.question_ru,
        question_en: template.question_en,
        answer_ru: template.answer_ru,
        answer_en: template.answer_en
      });
    });

    setIsTemplateDialogOpen(false);
    setSelectedTemplates(new Set());
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
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Из шаблона
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Выберите вопросы из шаблонов</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {faqTemplates.map(category => {
                  const categoryKeys = category.items.map((_, i) => getTemplateKey(category.id, i));
                  const allSelected = categoryKeys.every(key => selectedTemplates.has(key));
                  const someSelected = categoryKeys.some(key => selectedTemplates.has(key));

                  return (
                    <div key={category.id} className="border rounded-lg">
                      <div 
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => setExpandedCategories(prev => 
                          prev.includes(category.id) 
                            ? prev.filter(id => id !== category.id)
                            : [...prev, category.id]
                        )}
                      >
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={() => toggleCategory(category.id)}
                          onClick={(e) => e.stopPropagation()}
                          className={someSelected && !allSelected ? "opacity-50" : ""}
                        />
                        <span className="font-medium flex-1">{category.name_ru}</span>
                        <span className="text-xs text-muted-foreground">
                          {category.items.length} вопросов
                        </span>
                      </div>
                      
                      {expandedCategories.includes(category.id) && (
                        <div className="border-t px-3 py-2 space-y-2 bg-muted/30">
                          {category.items.map((item, index) => {
                            const key = getTemplateKey(category.id, index);
                            return (
                              <div 
                                key={index}
                                className="flex items-start gap-3 py-2"
                              >
                                <Checkbox
                                  checked={selectedTemplates.has(key)}
                                  onCheckedChange={() => toggleTemplate(key)}
                                  className="mt-0.5"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{item.question_ru}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                    {item.answer_ru}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Выбрано: {selectedTemplates.size}
                </span>
                <Button 
                  onClick={addFaqsFromTemplates}
                  disabled={selectedTemplates.size === 0}
                >
                  Добавить выбранные
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
            Нет вопросов. Нажмите "Добавить" или "Из шаблона" для создания нового FAQ.
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
