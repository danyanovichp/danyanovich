import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useProducts, Product, ProductInput } from "@/hooks/useProducts";
import { 
  Loader2, Plus, Edit, LogOut, Search, Download, Trash2, 
  Eye, EyeOff, Home, Package, ExternalLink, Settings, Check
} from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { value: 'all', label: 'Все категории' },
  { value: 'business', label: 'Бизнес' },
  { value: 'personal', label: 'Личное' },
  { value: 'productivity', label: 'Продуктивность' },
  { value: 'finance', label: 'Финансы' },
  { value: 'education', label: 'Образование' },
  { value: 'health', label: 'Здоровье' },
  { value: 'creativity', label: 'Креатив' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'Все статусы' },
  { value: 'available', label: 'Доступен' },
  { value: 'development', label: 'В разработке' },
];

const AdminProducts = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { products, isLoading, importFromStatic, updateProduct, deleteProduct, bulkUpdate, createProduct } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showOnlyVisible, setShowOnlyVisible] = useState(false);
  const [showOnlyHome, setShowOnlyHome] = useState(false);
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isImporting, setIsImporting] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<ProductInput>>({
    id: '',
    title_ru: '',
    title_en: '',
    description_ru: '',
    description_en: '',
    price: '',
    category: 'productivity',
    status: 'development',
    popularity: 50,
    is_visible: true,
    display_on_home: true,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const { imported, failed } = await importFromStatic();
      if (failed > 0) {
        toast.warning(`Импортировано ${imported} продуктов, ошибок: ${failed}`);
      } else if (imported > 0) {
        toast.success(`Успешно импортировано ${imported} продуктов`);
      }
    } catch (error) {
      toast.error("Ошибка импорта");
    } finally {
      setIsImporting(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = 
        p.title_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesVisible = !showOnlyVisible || p.is_visible;
      const matchesHome = !showOnlyHome || p.display_on_home;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesVisible && matchesHome;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, showOnlyVisible, showOnlyHome]);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const handleBulkAction = async (action: 'visible' | 'hidden' | 'home' | 'not_home' | 'delete') => {
    if (selectedIds.size === 0) {
      toast.error("Выберите продукты");
      return;
    }

    const ids = Array.from(selectedIds);

    try {
      if (action === 'delete') {
        for (const id of ids) {
          await deleteProduct(id);
        }
        toast.success(`Удалено ${ids.length} продуктов`);
      } else {
        const updates: Partial<ProductInput> = {};
        if (action === 'visible') updates.is_visible = true;
        if (action === 'hidden') updates.is_visible = false;
        if (action === 'home') updates.display_on_home = true;
        if (action === 'not_home') updates.display_on_home = false;
        
        await bulkUpdate(ids, updates);
        toast.success(`Обновлено ${ids.length} продуктов`);
      }
      setSelectedIds(new Set());
    } catch (error) {
      toast.error("Ошибка при выполнении действия");
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    
    setIsSaving(true);
    try {
      await updateProduct(editingProduct.id, {
        title_ru: editingProduct.title_ru,
        title_en: editingProduct.title_en,
        description_ru: editingProduct.description_ru,
        description_en: editingProduct.description_en,
        full_description_ru: editingProduct.full_description_ru,
        full_description_en: editingProduct.full_description_en,
        price: editingProduct.price,
        price_value: editingProduct.price_value,
        link: editingProduct.link,
        buildin_link: editingProduct.buildin_link,
        image: editingProduct.image,
        status: editingProduct.status,
        category: editingProduct.category,
        popularity: editingProduct.popularity,
        is_visible: editingProduct.is_visible,
        display_on_home: editingProduct.display_on_home,
      });
      toast.success("Продукт обновлён");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Ошибка сохранения");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.id || !newProduct.title_ru || !newProduct.title_en || !newProduct.price) {
      toast.error("Заполните обязательные поля");
      return;
    }
    
    setIsSaving(true);
    try {
      await createProduct(newProduct as ProductInput);
      toast.success("Продукт создан");
      setIsNewDialogOpen(false);
      setNewProduct({
        id: '',
        title_ru: '',
        title_en: '',
        description_ru: '',
        description_en: '',
        price: '',
        category: 'productivity',
        status: 'development',
        popularity: 50,
        is_visible: true,
        display_on_home: true,
      });
    } catch (error) {
      toast.error("Ошибка создания продукта");
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Управление продуктами</h1>
            <p className="text-muted-foreground mt-1">
              Редактирование шаблонов, ссылок и категорий
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/landings")}>
              Лендинги
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleImport}
              disabled={isImporting}
            >
              {isImporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
              Импорт
            </Button>
            <Button onClick={() => setIsNewDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Новый продукт
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Фильтры и настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию или ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="showVisible" 
                  checked={showOnlyVisible}
                  onCheckedChange={(checked) => setShowOnlyVisible(!!checked)}
                />
                <Label htmlFor="showVisible" className="text-sm">Только видимые</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="showHome" 
                  checked={showOnlyHome}
                  onCheckedChange={(checked) => setShowOnlyHome(!!checked)}
                />
                <Label htmlFor="showHome" className="text-sm">Только на главной</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <Card className="mb-6 border-primary">
            <CardContent className="py-3 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium">Выбрано: {selectedIds.size}</span>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('visible')}>
                  <Eye className="h-4 w-4 mr-1" /> Показать
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('hidden')}>
                  <EyeOff className="h-4 w-4 mr-1" /> Скрыть
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('home')}>
                  <Home className="h-4 w-4 mr-1" /> На главную
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('not_home')}>
                  <Package className="h-4 w-4 mr-1" /> Убрать с главной
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="h-4 w-4 mr-1" /> Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedIds.size === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={selectAll}
                    />
                  </TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Популярность</TableHead>
                  <TableHead className="text-center">Видим.</TableHead>
                  <TableHead className="text-center">Главная</TableHead>
                  <TableHead className="w-24">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Продукты не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedIds.has(product.id)}
                          onCheckedChange={() => toggleSelect(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.title_ru}</p>
                          <p className="text-xs text-muted-foreground font-mono">{product.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'available' ? 'default' : 'outline'}>
                          {product.status === 'available' ? 'Доступен' : 'Разработка'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{product.price}</TableCell>
                      <TableCell>{product.popularity}</TableCell>
                      <TableCell className="text-center">
                        {product.is_visible ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.display_on_home ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openEditDialog(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => window.open(`/templates/${product.id}`, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground mt-4">
          Показано {filteredProducts.length} из {products.length} продуктов
        </p>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактирование продукта</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ID</Label>
                  <Input value={editingProduct.id} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Цена</Label>
                  <Input 
                    value={editingProduct.price} 
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Название (RU)</Label>
                  <Input 
                    value={editingProduct.title_ru} 
                    onChange={(e) => setEditingProduct({...editingProduct, title_ru: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Название (EN)</Label>
                  <Input 
                    value={editingProduct.title_en} 
                    onChange={(e) => setEditingProduct({...editingProduct, title_en: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Описание (RU)</Label>
                  <Textarea 
                    value={editingProduct.description_ru} 
                    onChange={(e) => setEditingProduct({...editingProduct, description_ru: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Описание (EN)</Label>
                  <Textarea 
                    value={editingProduct.description_en} 
                    onChange={(e) => setEditingProduct({...editingProduct, description_en: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ссылка на покупку</Label>
                  <Input 
                    value={editingProduct.link || ''} 
                    onChange={(e) => setEditingProduct({...editingProduct, link: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ссылка Buildin</Label>
                  <Input 
                    value={editingProduct.buildin_link || ''} 
                    onChange={(e) => setEditingProduct({...editingProduct, buildin_link: e.target.value})}
                    placeholder="https://buildin.ai/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Изображение</Label>
                  <Input 
                    value={editingProduct.image || ''} 
                    onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                    placeholder="/images/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Популярность</Label>
                  <Input 
                    type="number"
                    min="0"
                    max="100"
                    value={editingProduct.popularity} 
                    onChange={(e) => setEditingProduct({...editingProduct, popularity: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <Select 
                    value={editingProduct.category} 
                    onValueChange={(value) => setEditingProduct({...editingProduct, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.filter(c => c.value !== 'all').map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Статус</Label>
                  <Select 
                    value={editingProduct.status} 
                    onValueChange={(value: 'available' | 'development') => setEditingProduct({...editingProduct, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Доступен</SelectItem>
                      <SelectItem value="development">В разработке</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="edit_visible" 
                    checked={editingProduct.is_visible}
                    onCheckedChange={(checked) => setEditingProduct({...editingProduct, is_visible: !!checked})}
                  />
                  <Label htmlFor="edit_visible">Видимый</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="edit_home" 
                    checked={editingProduct.display_on_home}
                    onCheckedChange={(checked) => setEditingProduct({...editingProduct, display_on_home: !!checked})}
                  />
                  <Label htmlFor="edit_home">На главной</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveProduct} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Product Dialog */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Новый продукт</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ID *</Label>
                <Input 
                  value={newProduct.id || ''} 
                  onChange={(e) => setNewProduct({...newProduct, id: e.target.value})}
                  placeholder="product-id"
                />
              </div>
              <div className="space-y-2">
                <Label>Цена *</Label>
                <Input 
                  value={newProduct.price || ''} 
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="1 000 ₽"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Название (RU) *</Label>
                <Input 
                  value={newProduct.title_ru || ''} 
                  onChange={(e) => setNewProduct({...newProduct, title_ru: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Название (EN) *</Label>
                <Input 
                  value={newProduct.title_en || ''} 
                  onChange={(e) => setNewProduct({...newProduct, title_en: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Описание (RU)</Label>
                <Textarea 
                  value={newProduct.description_ru || ''} 
                  onChange={(e) => setNewProduct({...newProduct, description_ru: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Описание (EN)</Label>
                <Textarea 
                  value={newProduct.description_en || ''} 
                  onChange={(e) => setNewProduct({...newProduct, description_en: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ссылка на покупку</Label>
                <Input 
                  value={newProduct.link || ''} 
                  onChange={(e) => setNewProduct({...newProduct, link: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select 
                  value={newProduct.category} 
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.filter(c => c.value !== 'all').map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="new_visible" 
                  checked={newProduct.is_visible}
                  onCheckedChange={(checked) => setNewProduct({...newProduct, is_visible: !!checked})}
                />
                <Label htmlFor="new_visible">Видимый</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="new_home" 
                  checked={newProduct.display_on_home}
                  onCheckedChange={(checked) => setNewProduct({...newProduct, display_on_home: !!checked})}
                />
                <Label htmlFor="new_home">На главной</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleCreateProduct} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
