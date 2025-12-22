import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export type TemplateCategory = 'all' | 'business' | 'personal' | 'productivity' | 'finance';
export type TemplateStatus = 'all' | 'available' | 'development';

interface TemplateFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: TemplateCategory;
  onCategoryChange: (category: TemplateCategory) => void;
  selectedStatus: TemplateStatus;
  onStatusChange: (status: TemplateStatus) => void;
}

const TemplateFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}: TemplateFiltersProps) => {
  const { i18n } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  const categories: { value: TemplateCategory; labelRu: string; labelEn: string }[] = [
    { value: 'all', labelRu: 'Все', labelEn: 'All' },
    { value: 'business', labelRu: 'Бизнес', labelEn: 'Business' },
    { value: 'personal', labelRu: 'Личное', labelEn: 'Personal' },
    { value: 'productivity', labelRu: 'Продуктивность', labelEn: 'Productivity' },
    { value: 'finance', labelRu: 'Финансы', labelEn: 'Finance' },
  ];

  const statuses: { value: TemplateStatus; labelRu: string; labelEn: string }[] = [
    { value: 'all', labelRu: 'Все статусы', labelEn: 'All Statuses' },
    { value: 'available', labelRu: 'Доступные', labelEn: 'Available' },
    { value: 'development', labelRu: 'В разработке', labelEn: 'In Development' },
  ];

  const hasActiveFilters = selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery;

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onStatusChange('all');
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={i18n.language === 'ru' ? 'Поиск шаблонов...' : 'Search templates...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Tags */}
      {showFilters && (
        <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border/20 animate-fade-in">
          {/* Categories */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {i18n.language === 'ru' ? 'Категория' : 'Category'}
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors hover:bg-primary/80"
                  onClick={() => onCategoryChange(cat.value)}
                >
                  {i18n.language === 'ru' ? cat.labelRu : cat.labelEn}
                </Badge>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {i18n.language === 'ru' ? 'Статус' : 'Status'}
            </p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status.value}
                  variant={selectedStatus === status.value ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors hover:bg-primary/80"
                  onClick={() => onStatusChange(status.value)}
                >
                  {i18n.language === 'ru' ? status.labelRu : status.labelEn}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateFilters;
