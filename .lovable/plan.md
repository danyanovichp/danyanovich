

# Plan: Fix All Workflow Diagrams + Add Project 5

## Overview

Update all 4 existing project workflow diagrams, descriptions, features, results, and tags to match the detailed documentation. Add the 5th project (Voice Call Task Manager) with full content and diagram.

## File: `src/data/portfolioProjects.ts`

### Project 1 -- Email AI Assistant

**Current diagram:** Gmail -> Zapier -> OpenAI -> Formatter -> (Notion, Slack, Drive)

**Corrected diagram nodes:**
- Gmail (trigger)
- Zapier (orchestration)
- GPT-4o (analysis: category, priority, draft reply)
- Gmail Labels (auto-categorization)
- Google Drive (attachments saved by category hierarchy)
- Notion (card: text, Drive links, AI draft)
- Quick Reply (button back to Gmail with draft)

**Corrected connections:**
Gmail -> Zapier -> GPT-4o -> Gmail Labels, GPT-4o -> Google Drive, GPT-4o -> Notion, Notion -> Quick Reply

**Remove:** "Formatter", "Slack" nodes
**Update tags:** `['Zapier', 'Gmail API', 'OpenAI GPT-4o', 'Notion API', 'Google Drive API']`
**Update summary** to match: focus on categorization, Drive hierarchy, Notion card with AI draft, quick reply button
**Update features** to reflect the 6-step process
**Update results** to match (30 min saved, structured Drive, single Notion hub, one-click reply, ~$20-30/mo)

### Project 2 -- ClickUp Reports Agent

**Current diagram:** ClickUp -> Agent -> LM Studio -> Scorer -> ClickUp Write (too linear)

**Corrected diagram nodes:**
- ClickUp (source: tasks per employee)
- Python Agent (loader)
- SQLite (personal history per employee)
- LM Studio - Active (forecast + recommendations)
- LM Studio - Closed (speed/quality scoring)
- ClickUp Write (results to custom fields)
- SQLite Update (archive update)

**Corrected connections:**
ClickUp -> Python Agent, Python Agent -> SQLite, Python Agent -> LM Active, Python Agent -> LM Closed, SQLite -> LM Active, SQLite -> LM Closed, LM Active -> ClickUp Write, LM Closed -> ClickUp Write, ClickUp Write -> SQLite Update

**Update tags:** `['Python 3.10+', 'ClickUp REST API', 'LM Studio', 'SQLite', 'asyncio']`
**Update summary/features/results** to reflect personalized per-employee scoring, history-based forecasts, and the feedback loop

### Project 3 -- Construction AI Agent

**Current diagram:** Roughly correct. Add estimate verification branch.

**Corrected diagram nodes:**
- User
- Flask Backend (Web/CLI/API entry)
- OpenAI (primary price search)
- Local LLM (fallback)
- SQLite Cache
- Estimate Check (verification: duplicates, codes, format)
- Google Sheets (export/import)
- Prometheus (monitoring)

**Corrected connections:**
User -> Flask, Flask -> OpenAI, Flask -> Local LLM, Flask -> Estimate Check, OpenAI -> SQLite Cache, Local LLM -> SQLite Cache, SQLite Cache -> Google Sheets, Estimate Check -> Google Sheets, Flask -> Prometheus

**Update summary/features/results** to match the 4-step process with dual paths (price search vs estimate verification)

### Project 4 -- Telegram to ClickUp

**Current diagram:** Telegram -> Bot -> Whisper -> GPT-4 -> (ClickUp, Summary) -- missing duplicate check

**Corrected diagram nodes:**
- Telegram (message input)
- Whisper (audio transcription, only for voice)
- GPT-4 (parameter extraction: title, dates, priority, assignee)
- Duplicate Check (search ClickUp for similar task)
- Create Task (new task with all params)
- Update Task (add new info to existing)
- TG Report (confirmation back to Telegram)

**Corrected connections:**
Telegram -> Whisper (voice path), Telegram -> GPT-4 (text path), Whisper -> GPT-4, GPT-4 -> Duplicate Check, Duplicate Check -> Create Task (not found), Duplicate Check -> Update Task (found), Create Task -> TG Report, Update Task -> TG Report

**Update tags:** `['Python', 'Telegram Bot API', 'OpenAI Whisper', 'OpenAI GPT-4', 'ClickUp REST API', 'SQLite']`
**Update summary/features/results** to include duplicate detection and smart update logic

### Project 5 -- Voice Call Task Manager (NEW)

**New project to add at the end of the array:**

```typescript
{
  id: 'voice-calls',
  title_ru: 'Voice Call Task Manager',
  title_en: 'Voice Call Task Manager',
  category_ru: 'AI Агент',
  category_en: 'AI Agent',
  summary_ru: '...',
  summary_en: '...',
  tags: ['GitHub Actions', 'Twilio API', 'ClickUp API', 'OpenAI', 'Telegram Bot API'],
  // ... full features, results
}
```

**Diagram nodes:**
- GitHub Actions (scheduled trigger)
- ClickUp (load active tasks for 6 employees)
- Twilio (voice call)
- AI Voice (OpenAI + Twilio AI: read tasks, analyze response)
- Telegram Bot (fallback channel with buttons)
- ClickUp Update (status/date/priority changes)
- Report (summary to manager)

**Connections:**
GitHub Actions -> ClickUp -> Twilio -> AI Voice -> ClickUp Update, Twilio (no answer) -> Telegram Bot -> ClickUp Update, ClickUp Update -> Report

## File: `src/pages/Cases.tsx`

- Add `pastelBgClasses` entry for the 5th project (already has 5 colors so it cycles, no change needed)

## File: `src/components/WorkflowDiagram.tsx`

- No structural changes needed. The diagram component renders whatever nodes/connections are passed. May need minor position adjustments if node count increases significantly.

## Technical Notes

### Node positioning strategy
Each diagram needs careful x/y positioning to avoid overlapping. Projects with branching (2, 3, 4, 5) will use multiple y-levels (y: 10, 40, 70) to show parallel paths. SVG viewBox is 1000x340.

### Estimated node layouts

**Project 1 (7 nodes):**
```text
Gmail(5,40) -> Zapier(18,40) -> GPT-4o(34,40)
  -> Labels(52,10)
  -> Drive(52,40)
  -> Notion(52,70) -> Reply(72,70)
```

**Project 2 (7 nodes, with loop):**
```text
ClickUp(5,40) -> Python(20,40) -> SQLite(38,10)
  -> LM Active(55,20) -> ClickUp Write(75,40)
  -> LM Closed(55,60) -> ClickUp Write
  ClickUp Write -> SQLite Upd(75,10)
```

**Project 3 (8 nodes, dual path):**
```text
User(5,40) -> Flask(20,40)
  -> OpenAI(38,15) -> Cache(55,40) -> Sheets(75,15)
  -> LLM(38,65) -> Cache
  -> Estimate(55,65) -> Sheets
  Flask -> Prometheus(75,65)
```

**Project 4 (7 nodes, branching):**
```text
Telegram(5,40) -> Whisper(20,20)
                -> GPT-4(35,40) -> DupCheck(52,40)
  Whisper -> GPT-4
  DupCheck -> Create(68,20) -> Report(85,40)
  DupCheck -> Update(68,60) -> Report
```

**Project 5 (7 nodes):**
```text
GH Actions(5,40) -> ClickUp(20,40) -> Twilio(38,30)
  -> AI Voice(55,15) -> CU Update(75,40) -> Report(75,10)
  Twilio(no answer) -> TG Bot(55,65) -> CU Update
```

