

# Plan: Replace Blog with Portfolio Page

## Overview

Remove the Blog page and replace it with a rich Portfolio page showcasing 4 automation/AI projects. Each project will be displayed as an expandable card with nested detail cards and visual workflow diagrams styled in an Opal/n8n aesthetic (rounded nodes connected by lines with gradient accents).

## Changes

### 1. Delete Blog page, update routing

**Files affected:** `src/App.tsx`, `src/pages/Blog.tsx`

- Delete `src/pages/Blog.tsx`
- Remove Blog lazy import and `/blog` route from `App.tsx`
- Keep existing `/portfolio` route (it already exists)

### 2. Update Header navigation

**File:** `src/components/Header.tsx`

- Change `secondaryLinks` entry from `{ href: "/blog", label: "БЛОГ" / "BLOG" }` to `{ href: "/portfolio", label: "ПОРТФОЛИО" / "PORTFOLIO" }`

### 3. Rewrite Portfolio page

**File:** `src/pages/Portfolio.tsx`

Complete rewrite with 4 projects. Each project is a large card containing:

- **Header**: project name, category badge, tech stack tags
- **Summary card**: brief overview paragraph
- **Architecture/workflow diagram**: custom SVG component styled like Opal/n8n -- rounded pill-shaped nodes with icons, connected by curved gradient lines, glowing effects, dark glass background
- **Detail cards** (nested inside the project card via Collapsible/Accordion):
  - Core features
  - Tech stack and integrations
  - Results and benefits
  - Monitoring/metrics (where applicable)

### 4. Create workflow diagram component

**New file:** `src/components/WorkflowDiagram.tsx`

A reusable React/SVG component that renders node-based flow diagrams:

- Pill-shaped nodes with icons and labels
- Curved SVG path connections with gradient strokes
- Glow/shadow effects matching the glass-card theme
- Each project gets its own flow configuration passed as props
- Responsive -- scales on mobile

**Visual style:**
- Dark glass background (`bg-card/50 backdrop-blur`)
- Nodes: rounded rectangles with subtle gradient fill, icon + label
- Connections: curved `<path>` elements with gradient stroke and subtle glow
- Color-coded by service (Gmail = red, OpenAI = green, Notion = dark, Telegram = blue, ClickUp = purple, Python = yellow)

### 5. Create project data file

**New file:** `src/data/portfolioProjects.ts`

All 4 projects with full Russian/English content structured as typed data:

- Email AI Assistant (Zapier + Gmail + OpenAI + Notion)
- ClickUp Reports Agent (Python + ClickUp API + LM Studio)
- Construction AI Agent (Python + OpenAI + Google Sheets + Flask)
- Telegram to ClickUp (Python + Telegram Bot API + OpenAI Whisper + ClickUp)

Each project includes: title, summary, category, tech stack tags, features list, architecture description, workflow nodes/connections config, and results.

---

## Technical Details

### Portfolio page structure (JSX)

```text
Portfolio Page
+-- Hero section (title + subtitle)
+-- Project Cards (vertical stack, full-width)
    +-- [Project Card] (glass-card, large)
        +-- Card Header: icon, title, category badge, tags
        +-- Summary paragraph
        +-- Workflow Diagram (SVG component)
        +-- Accordion with detail sections:
            +-- "Core Features" -> nested cards with bullet points
            +-- "Tech Stack" -> tag badges + descriptions
            +-- "Results" -> checkmark list
```

### WorkflowDiagram component props

```typescript
interface WorkflowNode {
  id: string;
  label: string;
  icon: string; // lucide icon name or emoji
  color: string; // tailwind color
  x: number; // position percentage
  y: number; // position percentage
}

interface WorkflowConnection {
  from: string;
  to: string;
}

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  title?: string;
}
```

### Workflow diagrams per project

**Email AI Assistant:**
Gmail -> Zapier Trigger -> OpenAI Analysis -> Formatter -> Notion DB (+ branches to Slack/Telegram notifications and Google Drive)

**ClickUp Reports Agent:**
ClickUp API -> Python Agent -> LM Studio AI -> Score Calculator -> ClickUp Write Back

**Construction AI Agent:**
User Query -> Flask API -> OpenAI/LM Studio (with fallback) -> SQLite Cache -> Google Sheets + Prometheus Metrics

**Telegram to ClickUp:**
Telegram Group -> Bot Listener -> Whisper Transcription -> GPT-4 Analysis -> ClickUp Task Creation (+ Telegram Summary)

### Files summary

| File | Action |
|------|--------|
| `src/pages/Blog.tsx` | Delete |
| `src/App.tsx` | Remove Blog import and route |
| `src/components/Header.tsx` | Change "Blog" link to "Portfolio" |
| `src/data/portfolioProjects.ts` | Create -- all project data |
| `src/components/WorkflowDiagram.tsx` | Create -- SVG flow diagram component |
| `src/pages/Portfolio.tsx` | Rewrite -- full project showcase |

