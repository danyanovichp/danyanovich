import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Edit, ExternalLink, LogOut, Search, FileText, Download } from "lucide-react";
import { premiumTemplates } from "@/data/premiumTemplates";
import { templateLandingContent } from "@/data/templateLandingContent";
import { toast } from "sonner";

interface LandingListItem {
  id: string;
  template_id: string;
  headline: string;
  updated_at: string;
}

const AdminLandings = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [landings, setLandings] = useState<LandingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchLandings();
    }
  }, [user]);

  const fetchLandings = async () => {
    try {
      const { data, error } = await supabase
        .from("template_landings")
        .select("id, template_id, headline, updated_at")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setLandings(data || []);
    } catch (error) {
      console.error("Error fetching landings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleImportAll = async () => {
    setIsImporting(true);
    const existingIds = new Set(landings.map(l => l.template_id));
    const toImport = Object.values(templateLandingContent).filter(
      content => !existingIds.has(content.id)
    );

    if (toImport.length === 0) {
      toast.info("Все лендинги уже импортированы");
      setIsImporting(false);
      return;
    }

    let imported = 0;
    let failed = 0;

    for (const content of toImport) {
      try {
        const { error } = await supabase.from("template_landings").insert({
          template_id: content.id,
          headline: content.headline,
          subheadline: content.subheadline,
          pain_points: content.painPoints,
          solution_intro: content.solution,
          features: content.features,
          target_audience: content.targetAudience,
          views: content.views || [],
        });

        if (error) {
          console.error(`Error importing ${content.id}:`, error);
          failed++;
        } else {
          imported++;
        }
      } catch (err) {
        console.error(`Error importing ${content.id}:`, err);
        failed++;
      }
    }

    await fetchLandings();
    setIsImporting(false);

    if (failed > 0) {
      toast.warning(`Импортировано ${imported} лендингов, ошибок: ${failed}`);
    } else {
      toast.success(`Успешно импортировано ${imported} лендингов`);
    }
  };

  // Get templates without landings
  const landingTemplateIds = new Set(landings.map(l => l.template_id));
  const templatesWithoutLanding = premiumTemplates.filter(
    t => !landingTemplateIds.has(t.id)
  );

  const filteredLandings = landings.filter(
    l => l.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
         l.template_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = templatesWithoutLanding.filter(
    t => t.titleRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
         t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Доступ ограничен</CardTitle>
            <CardDescription>
              У вас нет прав администратора для доступа к редактору лендингов.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignOut} variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Редактор лендингов</h1>
            <p className="text-muted-foreground mt-1">
              Управляйте контентом лендинговых страниц шаблонов
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              onClick={handleImportAll}
              disabled={isImporting}
              className="gap-2"
            >
              {isImporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Импорт из файла
            </Button>
            <Button onClick={() => navigate("/admin/landings/new")} className="gap-2">
              <Plus className="h-4 w-4" />
              Новый лендинг
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Existing Landings */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Созданные лендинги ({filteredLandings.length})
            </h2>
            {filteredLandings.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Лендинги не найдены
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredLandings.map((landing) => {
                  const template = premiumTemplates.find(t => t.id === landing.template_id);
                  return (
                    <Card key={landing.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg line-clamp-1">
                              {template?.titleRu || landing.template_id}
                            </CardTitle>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {landing.template_id}
                            </Badge>
                          </div>
                          {template && <template.icon className="h-8 w-8 text-muted-foreground" />}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {landing.headline}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/admin/landings/${landing.template_id}`)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`/templates/${landing.template_id}`, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Templates without landings */}
          {filteredTemplates.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Шаблоны без лендинга ({filteredTemplates.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="border-dashed hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{template.titleRu}</CardTitle>
                          <Badge variant="outline" className="font-mono text-xs">
                            {template.id}
                          </Badge>
                        </div>
                        <template.icon className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {template.descriptionRu}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/admin/landings/${template.id}`)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Создать лендинг
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLandings;
