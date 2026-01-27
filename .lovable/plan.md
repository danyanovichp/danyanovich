

# План: Шаблоны FAQ, Публичные отзывы и Юридические документы

## Обзор ситуации

### Текущее состояние:
1. **FAQ**: Таблица `template_faq` существует, но пуста. Есть редактор FAQ, но нет функции быстрого заполнения из готовых шаблонов
2. **Отзывы**: Таблица `template_reviews` существует (только для админов), нет возможности для обычных пользователей оставлять отзывы
3. **Юридические документы**: В футере есть ссылка на "Политика конфиденциальности" (неактивна, показывает "Скоро"), нет страниц:
   - Политика конфиденциальности (Privacy Policy)
   - Пользовательское соглашение (Terms of Service)
   - Политика cookies (Cookie Policy)

---

## Часть 1: Шаблоны FAQ для быстрого заполнения

### Что будет сделано:
- Создать библиотеку готовых FAQ-вопросов в новом файле
- Добавить кнопку "Заполнить из шаблона" в редактор FAQ
- Показывать модальное окно с выбором готовых вопросов

### Готовые шаблоны FAQ:
```text
Категории:
├── Общие вопросы о шаблоне (5 вопросов)
├── Оплата и доставка (4 вопроса)
├── Техническая поддержка (3 вопроса)
└── Настройка и использование (4 вопроса)
```

### Файлы для создания/изменения:
- `src/data/faqTemplates.ts` — библиотека готовых FAQ
- `src/components/editors/FaqEditor.tsx` — кнопка "Из шаблона" и диалог выбора

---

## Часть 2: Публичные отзывы от пользователей

### Текущая архитектура:
- `template_reviews` — только для админов (для отзывов к шаблонам)
- Страница `/reviews` — заглушка "Скоро"

### Что будет сделано:

1. **Создать новую таблицу `public_reviews`** для отзывов от любых посетителей:
```text
public_reviews:
├── id (uuid)
├── author_name (text) — как пользователь хочет подписаться
├── review_text (text) — текст отзыва
├── rating (integer, 1-5)
├── is_approved (boolean) — модерация
├── is_visible (boolean)
├── created_at
└── email (text, optional) — для обратной связи
```

2. **RLS политики**:
   - INSERT: открыто для всех (анонимные пользователи)
   - SELECT: только одобренные и видимые отзывы
   - UPDATE/DELETE: только админы

3. **Обновить страницу Reviews.tsx**:
   - Форма для отправки отзыва (имя + текст + рейтинг)
   - Список одобренных отзывов
   - Валидация на клиенте (zod)

4. **Панель модерации** в админке для одобрения отзывов

---

## Часть 3: Юридические документы

### Страницы для создания:
1. **Политика конфиденциальности** (`/privacy`)
2. **Пользовательское соглашение** (`/terms`) 
3. **Политика cookies** (`/cookies`)

### Содержание (адаптировано для РФ и СНГ):
- Сбор и обработка персональных данных
- Использование cookies
- Права пользователей
- Контактная информация

### Файлы для создания:
- `src/pages/Privacy.tsx`
- `src/pages/Terms.tsx`  
- `src/pages/Cookies.tsx`

### Изменения:
- `src/App.tsx` — добавить маршруты
- `src/components/Footer.tsx` — активировать ссылки

### Дополнительно:
- Cookie-баннер при первом посещении

---

## Техническая часть

### Миграция базы данных:
```sql
-- Таблица для публичных отзывов
CREATE TABLE public_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  review_text text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  email text,
  is_approved boolean DEFAULT false,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public_reviews ENABLE ROW LEVEL SECURITY;

-- Любой может отправить отзыв
CREATE POLICY "Anyone can submit reviews" 
ON public_reviews FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Только одобренные отзывы видны публично
CREATE POLICY "Public can view approved reviews"
ON public_reviews FOR SELECT
TO anon, authenticated
USING (is_approved = true AND is_visible = true);

-- Админы управляют всеми отзывами
CREATE POLICY "Admins can manage all reviews"
ON public_reviews FOR ALL
USING (has_role(auth.uid(), 'admin'));
```

### Валидация отзывов (клиент):
```typescript
const reviewSchema = z.object({
  author_name: z.string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),
  review_text: z.string()
    .trim()
    .min(10, "Минимум 10 символов")
    .max(1000, "Максимум 1000 символов"),
  rating: z.number().min(1).max(5),
  email: z.string().email().optional().or(z.literal(''))
});
```

---

## Итоговый список файлов

### Создать:
1. `src/data/faqTemplates.ts` — библиотека FAQ
2. `src/pages/Privacy.tsx` — политика конфиденциальности
3. `src/pages/Terms.tsx` — пользовательское соглашение
4. `src/pages/Cookies.tsx` — политика cookies
5. `src/components/CookieBanner.tsx` — баннер cookies
6. `src/hooks/usePublicReviews.ts` — хук для публичных отзывов

### Изменить:
1. `src/components/editors/FaqEditor.tsx` — добавить шаблоны
2. `src/pages/Reviews.tsx` — форма отзыва + список
3. `src/App.tsx` — новые маршруты + cookie banner
4. `src/components/Footer.tsx` — активировать ссылки
5. База данных — новая таблица `public_reviews`

