// scripts/generate-rss.ts
import fs from "fs";

// src/data/portfolioProjects.ts
var portfolioProjects = [
  // ── Project 1 — Email AI Assistant ──
  {
    id: "email-ai",
    title_ru: "Email AI \u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442",
    title_en: "Email AI Assistant",
    category_ru: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F",
    category_en: "Automation",
    summary_ru: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0446\u0438\u043A\u043B \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0432\u0445\u043E\u0434\u044F\u0449\u0435\u0439 \u043F\u043E\u0447\u0442\u044B: Zapier \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0435\u0442 Gmail, GPT-4o \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u043F\u0438\u0441\u044C\u043C\u043E (\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442, \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043E\u0442\u0432\u0435\u0442\u0430), \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0440\u0430\u0441\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 labels, \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0432 Google Drive \u043F\u043E \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u0438 \u043F\u0430\u043F\u043E\u043A, \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432 Notion \u0441 AI-\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u043E\u043C \u0438 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u043E\u0442\u0432\u0435\u0442\u0430. \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C ~$20-30/\u043C\u0435\u0441.",
    summary_en: "Full email processing cycle: Zapier monitors Gmail, GPT-4o analyzes each email (category, priority, draft reply), auto-assigns labels, saves attachments to Google Drive by folder hierarchy, creates a Notion card with AI draft and one-click reply button. Cost ~$20-30/mo.",
    tags: ["Zapier", "Gmail API", "OpenAI GPT-4o", "Notion API", "Google Drive API"],
    features: [
      {
        title_ru: "\u0410\u043D\u0430\u043B\u0438\u0437 \u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
        title_en: "Analysis & Categorization",
        items_ru: [
          "GPT-4o \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E \u043F\u0438\u0441\u044C\u043C\u0430 (\u0434\u043E\u0433\u043E\u0432\u043E\u0440, \u0437\u0430\u043F\u0440\u043E\u0441, \u0441\u0447\u0451\u0442 \u0438 \u0442.\u0434.)",
          "\u041E\u0446\u0435\u043D\u043A\u0430 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u0430: \u0441\u0440\u043E\u0447\u043D\u043E\u0435 / \u043E\u0431\u044B\u0447\u043D\u043E\u0435 / \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0435",
          "\u0418\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438: \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C, \u0442\u0435\u043C\u0430, \u0434\u0435\u0434\u043B\u0430\u0439\u043D",
          "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430 \u043E\u0442\u0432\u0435\u0442\u0430"
        ],
        items_en: [
          "GPT-4o determines email category (contract, request, invoice, etc.)",
          "Priority assessment: urgent / normal / informational",
          "Key info extraction: sender, subject, deadline",
          "Automatic draft reply generation"
        ]
      },
      {
        title_ru: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0438 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435",
        title_en: "Processing & Storage",
        items_ru: [
          "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u0438\u0441\u0432\u043E\u0435\u043D\u0438\u0435 labels \u0432 Gmail \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C",
          "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0432 Google Drive \u043F\u043E \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u0438 \u043F\u0430\u043F\u043E\u043A",
          "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0432 Notion: \u0442\u0435\u043A\u0441\u0442, \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0444\u0430\u0439\u043B\u044B, AI-\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A",
          "\u041A\u043D\u043E\u043F\u043A\u0430 \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u043E\u0442\u0432\u0435\u0442\u0430 \u2014 \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u0432 Gmail \u0441 \u0433\u043E\u0442\u043E\u0432\u044B\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C"
        ],
        items_en: [
          "Auto-assign Gmail labels by category",
          "Save attachments to Google Drive by folder hierarchy",
          "Notion card: email text, Drive links, AI draft",
          "Quick reply button \u2014 opens Gmail with ready-made draft"
        ]
      }
    ],
    results_ru: [
      "\u0420\u0430\u0437\u0431\u043E\u0440 \u043F\u043E\u0447\u0442\u044B \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u043B\u0441\u044F \u0441 40 \u043C\u0438\u043D\u0443\u0442 \u0434\u043E 5-10 \u043C\u0438\u043D\u0443\u0442 \u0432 \u0434\u0435\u043D\u044C",
      "\u0412\u0441\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 Google Drive \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C",
      "\u0415\u0434\u0438\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u043E\u0440\u0440\u0435\u0441\u043F\u043E\u043D\u0434\u0435\u043D\u0446\u0438\u0435\u0439 \u0432 Notion",
      "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043E\u0442\u0432\u0435\u0442\u0430 \u0433\u043E\u0442\u043E\u0432 \u0441\u0440\u0430\u0437\u0443 \u2014 \u043E\u0434\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u0435 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442 \u0435\u0433\u043E \u0432 Gmail",
      "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F: ~$20-30/\u043C\u0435\u0441"
    ],
    results_en: [
      "Email processing reduced from 40 min to 5-10 min per day",
      "All attachments structured in Google Drive by category",
      "Single correspondence management hub in Notion",
      "Draft reply ready instantly \u2014 one click sends it to Gmail",
      "Maintenance cost: ~$20-30/mo"
    ],
    cost: "$20-30/\u043C\u0435\u0441",
    type: "automation",
    workflow: {
      nodes: [
        { id: "gmail", label: "Gmail", icon: "\u{1F4E7}", color: "0 72% 51%", x: 5, y: 40 },
        { id: "zapier", label: "Zapier", icon: "\u26A1", color: "24 95% 53%", x: 18, y: 40 },
        { id: "gpt", label: "GPT-4o", icon: "\u{1F9E0}", color: "160 60% 45%", x: 34, y: 40 },
        { id: "labels", label: "Gmail Labels", icon: "\u{1F3F7}\uFE0F", color: "0 72% 51%", x: 52, y: 5 },
        { id: "drive", label: "Google Drive", icon: "\u{1F4C1}", color: "45 90% 50%", x: 52, y: 38 },
        { id: "notion", label: "Notion", icon: "\u{1F4DD}", color: "0 0% 20%", x: 52, y: 70 },
        { id: "reply", label: "Quick Reply", icon: "\u2709\uFE0F", color: "220 70% 55%", x: 72, y: 70 }
      ],
      connections: [
        { from: "gmail", to: "zapier" },
        { from: "zapier", to: "gpt" },
        { from: "gpt", to: "labels" },
        { from: "gpt", to: "drive" },
        { from: "gpt", to: "notion" },
        { from: "notion", to: "reply" }
      ]
    }
  },
  // ── Project 2 — ClickUp Reports Agent ──
  {
    id: "clickup-reports",
    title_ru: "ClickUp Reports Agent",
    title_en: "ClickUp Reports Agent",
    category_ru: "AI \u0410\u0433\u0435\u043D\u0442",
    category_en: "AI Agent",
    summary_ru: "Python-\u0430\u0433\u0435\u043D\u0442 \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0438 5 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432. \u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u0437 ClickUp, \u043F\u043E\u0434\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u043B\u0438\u0447\u043D\u0443\u044E \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0438\u0437 SQLite, \u0434\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447 \u2014 \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u0443\u0435\u0442 \u0432\u0440\u0435\u043C\u044F \u0438 \u0434\u0430\u0451\u0442 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438, \u0434\u043B\u044F \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0445 \u2014 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043E\u0446\u0435\u043D\u043A\u0438 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430. \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u043E \u0432 ClickUp \u0438 \u0430\u0440\u0445\u0438\u0432\u0438\u0440\u0443\u044E\u0442\u0441\u044F.",
    summary_en: "Python agent for personalized assessment of 5 employees. Loads tasks from ClickUp, retrieves personal history from SQLite, forecasts time and gives recommendations for active tasks, scores speed and quality for closed tasks. Results written back to ClickUp and archived.",
    tags: ["Python 3.10+", "ClickUp REST API", "LM Studio", "SQLite", "asyncio"],
    features: [
      {
        title_ru: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437",
        title_en: "Personalized Analysis",
        items_ru: [
          "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0437\u0430\u0434\u0430\u0447 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0438\u0437 5 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
          "\u041B\u0438\u0447\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0438\u0437 SQLite: \u043F\u0440\u043E\u0448\u043B\u044B\u0435 \u043E\u0446\u0435\u043D\u043A\u0438, \u0432\u0440\u0435\u043C\u044F, \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B",
          "\u0414\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447: \u043F\u0440\u043E\u0433\u043D\u043E\u0437 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
          "\u0414\u043B\u044F \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0445 \u0437\u0430\u0434\u0430\u0447: \u043E\u0446\u0435\u043D\u043A\u0430 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 (\u0444\u0430\u043A\u0442 vs \u043F\u0440\u043E\u0433\u043D\u043E\u0437) \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430"
        ],
        items_en: [
          "Task loading per each of 5 employees",
          "Personal history from SQLite: past scores, times, patterns",
          "Active tasks: time forecast based on employee history",
          "Closed tasks: speed score (actual vs forecast) and quality score"
        ]
      },
      {
        title_ru: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C \u0438 \u0430\u0440\u0445\u0438\u0432",
        title_en: "Feedback & Archive",
        items_ru: [
          "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
          "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432 \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F ClickUp",
          "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0441 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F\u043C\u0438 \u043F\u043E \u0440\u043E\u0441\u0442\u0443",
          "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u0440\u0445\u0438\u0432\u0430 SQLite \u2014 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u043C\u043D\u0435\u0435\u0442 \u0441 \u043A\u0430\u0436\u0434\u043E\u0439 \u0437\u0430\u0434\u0430\u0447\u0435\u0439"
        ],
        items_en: [
          "Personalized recommendations for each employee",
          "Results written to ClickUp custom fields",
          "Analytical comment with growth recommendations",
          "SQLite archive update \u2014 system gets smarter with each task"
        ]
      }
    ],
    results_ru: [
      "\u041E\u0431\u044A\u0435\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0438\u0437 5 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
      "AI-\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043F\u043E\u0434 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0433\u043E \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0440\u0438\u0438",
      "\u041F\u0440\u043E\u0433\u043D\u043E\u0437 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0443 \u0434\u043E \u0435\u0451 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",
      "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438 \u0432\u0438\u0434\u044F\u0442 \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u2014 \u043C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u044F \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C",
      "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u0447\u0430\u0441\u043E\u0432 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F \u043D\u0430 \u0440\u0443\u0447\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0437",
      "\u041F\u043E\u043B\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043E\u0446\u0435\u043D\u043E\u043A \u0434\u043B\u044F HR-\u0440\u0435\u0448\u0435\u043D\u0438\u0439 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438"
    ],
    results_en: [
      "Objective, personalized assessment of each of 5 employees",
      "AI recommendations tailored to each person based on their history",
      "Task time forecast before execution",
      "Employees see their progress \u2014 motivation and transparency",
      "Saves hours of manual analysis for the manager",
      "Complete scoring history for HR decisions and analytics"
    ],
    type: "automation",
    workflow: {
      nodes: [
        { id: "clickup", label: "ClickUp", icon: "\u2705", color: "270 60% 55%", x: 5, y: 40 },
        { id: "agent", label: "Python Agent", icon: "\u{1F40D}", color: "55 80% 50%", x: 20, y: 40 },
        { id: "sqlite", label: "SQLite History", icon: "\u{1F4BE}", color: "220 60% 50%", x: 38, y: 5 },
        { id: "lm-active", label: "LLM: \u041F\u0440\u043E\u0433\u043D\u043E\u0437", icon: "\u{1F52E}", color: "160 60% 45%", x: 55, y: 15 },
        { id: "lm-closed", label: "LLM: \u041E\u0446\u0435\u043D\u043A\u0430", icon: "\u{1F4CA}", color: "160 60% 45%", x: 55, y: 65 },
        { id: "writeback", label: "ClickUp Write", icon: "\u{1F4DD}", color: "270 60% 55%", x: 75, y: 40 },
        { id: "sqlite-upd", label: "SQLite Upd", icon: "\u{1F504}", color: "220 60% 50%", x: 75, y: 5 }
      ],
      connections: [
        { from: "clickup", to: "agent" },
        { from: "agent", to: "sqlite" },
        { from: "agent", to: "lm-active" },
        { from: "agent", to: "lm-closed" },
        { from: "sqlite", to: "lm-active" },
        { from: "sqlite", to: "lm-closed" },
        { from: "lm-active", to: "writeback" },
        { from: "lm-closed", to: "writeback" },
        { from: "writeback", to: "sqlite-upd" }
      ]
    }
  },
  // ── Project 3 — Construction AI Agent ──
  {
    id: "construction-ai",
    title_ru: "Construction AI Agent",
    title_en: "Construction AI Agent",
    category_ru: "AI \u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442",
    category_en: "AI Tool",
    summary_ru: "\u0412\u0435\u0431-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0441\u043C\u0435\u0442\u0447\u0438\u043A\u043E\u0432: \u043F\u043E\u0438\u0441\u043A \u0446\u0435\u043D \u043D\u0430 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B (OpenAI + fallback \u043D\u0430 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E LLM), \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043C\u0435\u0442 (\u0434\u0443\u0431\u043B\u0438\u043A\u0430\u0442\u044B, \u043A\u043E\u0434\u044B, \u0444\u043E\u0440\u043C\u0430\u0442), \u044D\u043A\u0441\u043F\u043E\u0440\u0442/\u0438\u043C\u043F\u043E\u0440\u0442 \u0447\u0435\u0440\u0435\u0437 Google Sheets. \u041A\u044D\u0448 SQLite \u0434\u043B\u044F \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0438 API, \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 Prometheus. \u0422\u0440\u0438 \u0440\u0435\u0436\u0438\u043C\u0430: \u0432\u0435\u0431, CLI, API.",
    summary_en: "Web tool for estimators: material price search (OpenAI + local LLM fallback), automatic estimate verification (duplicates, codes, format), Google Sheets export/import. SQLite cache for API savings, Prometheus monitoring. Three modes: web, CLI, API.",
    tags: ["Python", "Flask", "Vue.js", "Tailwind CSS", "OpenAI API", "Google Sheets API", "SQLite", "Prometheus"],
    features: [
      {
        title_ru: "\u041F\u043E\u0438\u0441\u043A \u0446\u0435\u043D \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043C\u0435\u0442",
        title_en: "Price Search & Estimate Verification",
        items_ru: [
          "\u041F\u043E\u0438\u0441\u043A \u0446\u0435\u043D: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043A\u044D\u0448 SQLite, \u0437\u0430\u0442\u0435\u043C OpenAI, fallback \u043D\u0430 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E LLM",
          "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043C\u0435\u0442: \u0434\u0443\u0431\u043B\u0438\u043A\u0430\u0442\u044B, \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u043A\u043E\u0434\u043E\u0432, \u043E\u0448\u0438\u0431\u043A\u0438 \u0444\u043E\u0440\u043C\u0430\u0442\u0430",
          "\u041E\u0442\u0447\u0451\u0442 \u0432 Markdown \u0441 \u043F\u0435\u0440\u0435\u0447\u043D\u0435\u043C \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0431\u043B\u0435\u043C",
          "\u0418\u043C\u043F\u043E\u0440\u0442 Excel \u0441 \u0430\u0432\u0442\u043E-\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u043D\u0438\u0435\u043C \u043A\u043E\u043B\u043E\u043D\u043E\u043A"
        ],
        items_en: [
          "Price search: SQLite cache first, then OpenAI, fallback to local LLM",
          "Estimate check: duplicates, code correctness, format errors",
          "Markdown report with found issues",
          "Excel import with auto column recognition"
        ]
      },
      {
        title_ru: "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0438 \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433",
        title_en: "Integrations & Monitoring",
        items_ru: [
          "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0432 Google Sheets \u0434\u043B\u044F \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B",
          "\u0422\u0440\u0438 \u0440\u0435\u0436\u0438\u043C\u0430: \u0432\u0435\u0431-\u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441, CLI, \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u044B\u0439 API",
          "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 fallback \u043D\u0430 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E LLM \u043F\u0440\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0438 OpenAI",
          "Prometheus \u043C\u0435\u0442\u0440\u0438\u043A\u0438: \u0437\u0430\u043F\u0440\u043E\u0441\u044B, \u0432\u0440\u0435\u043C\u044F, \u043A\u044D\u0448 vs API"
        ],
        items_en: [
          "Export results to Google Sheets for team collaboration",
          "Three modes: web interface, CLI, programmatic API",
          "Automatic fallback to local LLM when OpenAI unavailable",
          "Prometheus metrics: requests, timing, cache vs API"
        ]
      }
    ],
    results_ru: [
      "\u0423\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0441\u043C\u0435\u0442\u0447\u0438\u043A\u043E\u0432 \u043D\u0430 30-40%",
      "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0432\u044B\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0448\u0438\u0431\u043E\u043A \u0432 \u0441\u043C\u0451\u0442\u0430\u0445 \u0434\u043E \u0438\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F",
      "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u0441 \u043A\u044D\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u2014 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u043D\u0430 API",
      "\u0422\u0440\u0438 \u0440\u0435\u0436\u0438\u043C\u0430 \u0440\u0430\u0431\u043E\u0442\u044B: \u0432\u0435\u0431, CLI, API",
      "Fallback \u043D\u0430 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E LLM \u043F\u0440\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0438 OpenAI",
      "\u041C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0447\u0435\u0440\u0435\u0437 Prometheus"
    ],
    results_en: [
      "Estimator workflows accelerated by 30-40%",
      "Automatic error detection in estimates before use",
      "Up-to-date prices with caching \u2014 API savings",
      "Three work modes: web, CLI, API",
      "Local LLM fallback when OpenAI unavailable",
      "Load monitoring via Prometheus"
    ],
    type: "vibecoding",
    workflow: {
      nodes: [
        { id: "user", label: "User", icon: "\u{1F464}", color: "0 0% 50%", x: 5, y: 40 },
        { id: "flask", label: "Flask", icon: "\u{1F310}", color: "0 0% 30%", x: 20, y: 40 },
        { id: "openai", label: "OpenAI", icon: "\u{1F9E0}", color: "160 60% 45%", x: 38, y: 10 },
        { id: "lm", label: "Local LLM", icon: "\u{1F916}", color: "55 80% 50%", x: 38, y: 70 },
        { id: "cache", label: "SQLite Cache", icon: "\u{1F4BE}", color: "220 60% 50%", x: 55, y: 40 },
        { id: "estimate", label: "Estimate Check", icon: "\u{1F50D}", color: "30 80% 50%", x: 55, y: 70 },
        { id: "sheets", label: "Google Sheets", icon: "\u{1F4CA}", color: "120 60% 45%", x: 75, y: 10 },
        { id: "prom", label: "Prometheus", icon: "\u{1F4C8}", color: "15 80% 50%", x: 75, y: 70 }
      ],
      connections: [
        { from: "user", to: "flask" },
        { from: "flask", to: "openai" },
        { from: "flask", to: "lm" },
        { from: "flask", to: "estimate" },
        { from: "openai", to: "cache" },
        { from: "lm", to: "cache" },
        { from: "cache", to: "sheets" },
        { from: "estimate", to: "sheets" },
        { from: "flask", to: "prom" }
      ]
    }
  },
  // ── Project 4 — Telegram to ClickUp ──
  {
    id: "telegram-clickup",
    title_ru: "Telegram to ClickUp",
    title_en: "Telegram to ClickUp",
    category_ru: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F",
    category_en: "Automation",
    summary_ru: "\u0411\u043E\u0442 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u0447 \u0438\u0437 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0445 \u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 Telegram. Whisper \u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u0431\u0438\u0440\u0443\u0435\u0442 \u0430\u0443\u0434\u0438\u043E, GPT-4 \u0438\u0437\u0432\u043B\u0435\u043A\u0430\u0435\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B (\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0434\u0430\u0442\u044B, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442, \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439). \u041F\u0435\u0440\u0435\u0434 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043C \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442 \u0434\u0443\u0431\u043B\u0438 \u2014 \u0435\u0441\u043B\u0438 \u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442, \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u0435\u0451. \u041E\u0442\u0447\u0451\u0442 \u0432 Telegram \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044E.",
    summary_en: "Bot for creating tasks from Telegram voice and text messages. Whisper transcribes audio, GPT-4 extracts parameters (title, dates, priority, assignee). Checks for duplicates before creation \u2014 updates existing task if found. Telegram report for every action.",
    tags: ["Python", "Telegram Bot API", "OpenAI Whisper", "OpenAI GPT-4", "ClickUp REST API", "SQLite"],
    features: [
      {
        title_ru: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
        title_en: "Message Processing",
        items_ru: [
          "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u2192 \u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u043F\u0446\u0438\u044F \u0447\u0435\u0440\u0435\u0437 Whisper",
          "\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u2192 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043A GPT-4",
          "GPT-4 \u0438\u0437\u0432\u043B\u0435\u043A\u0430\u0435\u0442: \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0434\u0430\u0442\u044B, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442, \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
          "\u041F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430: \xAB\u0434\u043E \u043F\u044F\u0442\u043D\u0438\u0446\u044B\xBB \u2192 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u0434\u0430\u0442\u0430"
        ],
        items_en: [
          "Voice messages \u2192 transcription via Whisper",
          "Text messages \u2192 directly to GPT-4",
          "GPT-4 extracts: title, dates, priority, assignee, description",
          'Natural language understanding: "by Friday" \u2192 specific date'
        ]
      },
      {
        title_ru: "\u0423\u043C\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u0434\u0443\u0431\u043B\u044F\u043C\u0438",
        title_en: "Smart Duplicate Handling",
        items_ru: [
          "\u041F\u043E\u0438\u0441\u043A \u043F\u043E\u0445\u043E\u0436\u0435\u0439 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432 ClickUp \u043F\u043E \u0441\u043C\u044B\u0441\u043B\u0443",
          "\u0417\u0430\u0434\u0430\u0447\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u2192 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0439 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C\u0438",
          "\u0417\u0430\u0434\u0430\u0447\u0430 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u2192 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E\u043B\u043D\u043E\u0442\u044B, \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439",
          "Telegram-\u043E\u0442\u0447\u0451\u0442: \u0441\u043E\u0437\u0434\u0430\u043D\u0430 / \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430 / \u0431\u0435\u0437 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439"
        ],
        items_en: [
          "Semantic search for similar tasks in ClickUp",
          "Task not found \u2192 create new with all parameters",
          "Task found \u2192 check completeness, update with new info",
          "Telegram report: created / updated / no changes"
        ]
      }
    ],
    results_ru: [
      "\u0417\u0430\u0434\u0430\u0447\u0438 \u0441\u043E\u0437\u0434\u0430\u044E\u0442\u0441\u044F \u0433\u043E\u043B\u043E\u0441\u043E\u043C \u0438\u043B\u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u043C \u2014 \u0431\u0435\u0437 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F ClickUp",
      "\u041F\u043E\u043B\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B: \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435, \u0434\u0430\u0442\u044B, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442, \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
      "\u0414\u0443\u0431\u043B\u0438 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u044E\u0442\u0441\u044F \u2014 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u0437\u0430\u0434\u0430\u0447\u0443",
      "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C: Telegram-\u043E\u0442\u0447\u0451\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044E",
      "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0432\u0441\u0435\u0445 \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432 \u0430\u0443\u0434\u0438\u043E Telegram"
    ],
    results_en: [
      "Tasks created by voice or text \u2014 no need to open ClickUp",
      "Full parameters: title, description, dates, priority, assignee",
      "No duplicates \u2014 system updates existing task",
      "Transparency: Telegram report for every action",
      "All Telegram audio formats supported"
    ],
    type: "automation",
    workflow: {
      nodes: [
        { id: "tg", label: "Telegram", icon: "\u2708\uFE0F", color: "200 80% 50%", x: 5, y: 40 },
        { id: "whisper", label: "Whisper", icon: "\u{1F399}\uFE0F", color: "160 60% 45%", x: 22, y: 10 },
        { id: "gpt", label: "GPT-4", icon: "\u{1F9E0}", color: "160 60% 45%", x: 38, y: 40 },
        { id: "dupcheck", label: "Dup Check", icon: "\u{1F50D}", color: "30 80% 50%", x: 55, y: 40 },
        { id: "create", label: "Create Task", icon: "\u2795", color: "120 60% 45%", x: 70, y: 15 },
        { id: "update", label: "Update Task", icon: "\u270F\uFE0F", color: "45 90% 50%", x: 70, y: 65 },
        { id: "report", label: "TG Report", icon: "\u{1F4CB}", color: "200 80% 50%", x: 88, y: 40 }
      ],
      connections: [
        { from: "tg", to: "whisper" },
        { from: "tg", to: "gpt" },
        { from: "whisper", to: "gpt" },
        { from: "gpt", to: "dupcheck" },
        { from: "dupcheck", to: "create" },
        { from: "dupcheck", to: "update" },
        { from: "create", to: "report" },
        { from: "update", to: "report" }
      ]
    }
  },
  // ── Project 5 — Voice Call Task Manager (NEW) ──
  {
    id: "voice-calls",
    title_ru: "Voice Call Task Manager",
    title_en: "Voice Call Task Manager",
    category_ru: "AI \u0410\u0433\u0435\u043D\u0442",
    category_en: "AI Agent",
    summary_ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0445 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0434\u043B\u044F \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F \u043E \u0437\u0430\u0434\u0430\u0447\u0430\u0445. GitHub Actions \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0441\u043A\u0440\u0438\u043F\u0442 \u043F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E, \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u0437 ClickUp \u0434\u043B\u044F 6 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432, \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u0435\u0442 \u0437\u0432\u043E\u043D\u043E\u043A \u0447\u0435\u0440\u0435\u0437 Twilio. AI-\u0433\u043E\u043B\u043E\u0441 \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438, \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u043E\u0442\u0432\u0435\u0442. \u0415\u0441\u043B\u0438 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u2014 fallback \u0432 Telegram \u0441 \u043A\u043D\u043E\u043F\u043A\u0430\u043C\u0438. \u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E.",
    summary_en: "Voice call system for task reminders. GitHub Actions runs script on schedule, loads active tasks from ClickUp for 6 employees, makes calls via Twilio. AI voice reads tasks, accepts voice responses. If no answer \u2014 Telegram fallback with buttons. Summary report to manager.",
    tags: ["GitHub Actions", "Twilio API", "ClickUp API", "OpenAI", "Telegram Bot API"],
    features: [
      {
        title_ru: "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0435 \u0437\u0432\u043E\u043D\u043A\u0438 \u0438 AI",
        title_en: "Voice Calls & AI",
        items_ru: [
          "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E \u0447\u0435\u0440\u0435\u0437 GitHub Actions",
          "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0438\u0437 6 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
          "Twilio \u0437\u0432\u043E\u043D\u043E\u043A \u2014 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u0432\u044B\u0437\u043E\u0432 \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
          "AI-\u0433\u043E\u043B\u043E\u0441 \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438 \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u043E\u0442\u0432\u0435\u0442 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
          "\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0437\u0430\u0434\u0430\u0447\u0443 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u043F\u0440\u044F\u043C\u043E \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0437\u0432\u043E\u043D\u043A\u0430"
        ],
        items_en: [
          "Automatic scheduled launch via GitHub Actions",
          "Load active tasks for each of 6 employees",
          "Twilio call \u2014 real voice call to phone",
          "AI voice reads tasks and analyzes employee response",
          "Ability to reschedule task or change priority during the call"
        ]
      },
      {
        title_ru: "\u0420\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u0438 \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C",
        title_en: "Fallback Channel & Reporting",
        items_ru: [
          "\u0415\u0441\u043B\u0438 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u2014 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0437\u0432\u043E\u043D\u043E\u043A \u0447\u0435\u0440\u0435\u0437 1 \u0447\u0430\u0441",
          "Fallback: Telegram-\u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u043A\u043D\u043E\u043F\u043A\u0430\u043C\u0438 (\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E / \u041D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E / \u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438)",
          "\u0421\u0442\u0430\u0442\u0443\u0441\u044B \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0432 ClickUp \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
          "\u0421\u0432\u043E\u0434\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E: \u043A\u0442\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u043B, \u043A\u0442\u043E \u043F\u0435\u0440\u0435\u043D\u0451\u0441, \u043A\u0442\u043E \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B"
        ],
        items_en: [
          "No answer \u2014 retry call in 1 hour",
          "Fallback: Telegram message with buttons (Done / Not done / Reschedule)",
          "Statuses updated in ClickUp in real time",
          "Summary report to manager: who confirmed, rescheduled, or didn't respond"
        ]
      }
    ],
    results_ru: [
      "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438 \u043D\u0435 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 \u2014 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435",
      "\u0421\u0442\u0430\u0442\u0443\u0441\u044B \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0431\u0435\u0437 \u0432\u0445\u043E\u0434\u0430 \u0432 ClickUp",
      "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441 6 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430\u043C\u0438 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E",
      "\u0414\u0432\u043E\u0439\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B: \u0433\u043E\u043B\u043E\u0441 + Telegram = 100% \u043E\u0445\u0432\u0430\u0442",
      "\u041F\u0435\u0440\u0435\u043D\u043E\u0441 \u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447 \u043F\u0440\u044F\u043C\u043E \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0437\u0432\u043E\u043D\u043A\u0430"
    ],
    results_en: [
      "Employees don't miss tasks \u2014 active voice reminders",
      "Statuses update automatically without opening ClickUp",
      "Works with 6 employees in parallel",
      "Dual channel: voice + Telegram = 100% coverage",
      "Reschedule and modify tasks during the call"
    ],
    type: "automation",
    workflow: {
      nodes: [
        { id: "gh", label: "GitHub Actions", icon: "\u23F0", color: "0 0% 30%", x: 5, y: 40 },
        { id: "clickup", label: "ClickUp", icon: "\u2705", color: "270 60% 55%", x: 22, y: 40 },
        { id: "twilio", label: "Twilio", icon: "\u{1F4DE}", color: "0 72% 51%", x: 40, y: 30 },
        { id: "ai-voice", label: "AI Voice", icon: "\u{1F5E3}\uFE0F", color: "160 60% 45%", x: 58, y: 10 },
        { id: "tg-bot", label: "TG Bot", icon: "\u{1F4AC}", color: "200 80% 50%", x: 58, y: 65 },
        { id: "cu-update", label: "ClickUp Upd", icon: "\u{1F4DD}", color: "270 60% 55%", x: 76, y: 40 },
        { id: "report", label: "Report", icon: "\u{1F4CB}", color: "120 60% 45%", x: 76, y: 5 }
      ],
      connections: [
        { from: "gh", to: "clickup" },
        { from: "clickup", to: "twilio" },
        { from: "twilio", to: "ai-voice" },
        { from: "twilio", to: "tg-bot" },
        { from: "ai-voice", to: "cu-update" },
        { from: "tg-bot", to: "cu-update" },
        { from: "cu-update", to: "report" }
      ]
    }
  }
];

// src/data/blogPosts.ts
var blogPosts = [
  {
    id: 1,
    titleRu: "5 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C AI \u0430\u0433\u0435\u043D\u0442\u043E\u0432 \u0432 \u043C\u0430\u043B\u043E\u043C \u0431\u0438\u0437\u043D\u0435\u0441\u0435",
    titleEn: "5 Ways to Use AI Agents in Small Business",
    excerptRu: "\u0420\u0430\u0437\u0431\u0438\u0440\u0430\u0435\u043C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u0435\u0439\u0441\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0440\u0443\u0442\u0438\u043D\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447: \u043E\u0442 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 Email \u0434\u043E \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u043E\u0442\u0447\u0435\u0442\u043E\u0432.",
    excerptEn: "Analyzing real use cases of language models for automating routine tasks: from Email processing to report generation.",
    date: "24 \u041E\u043A\u0442 2025",
    categoryRu: "AI \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F",
    categoryEn: "AI Automation",
    colorClass: "bg-pastel-pink"
  },
  {
    id: 2,
    titleRu: "\u041A\u0430\u043A \u044F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u0434 \u0438 \u043D\u0430\u0447\u0430\u043B \u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C\u0441\u044F Vibecoding",
    titleEn: "How I Stopped Writing Code and Started Vibecoding",
    excerptRu: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0437\u0430 AI-\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442\u0430\u043C\u0438 \u0432\u0440\u043E\u0434\u0435 Cursor \u0438 Lovable, \u0438 \u043A\u0430\u043A \u044D\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u0442 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430.",
    excerptEn: "Why the future of development lies with AI assistants like Cursor and Lovable, and how it changes the developer profession forever.",
    date: "12 \u0421\u0435\u043D 2025",
    categoryRu: "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
    categoryEn: "Development",
    colorClass: "bg-pastel-blue"
  },
  {
    id: 3,
    titleRu: "\u0418\u0434\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439 \u0432 Notion",
    titleEn: "The Perfect Knowledge Base Architecture in Notion",
    excerptRu: "\u0414\u0435\u043B\u044E\u0441\u044C \u0441\u0432\u043E\u0438\u043C 4-\u043B\u0435\u0442\u043D\u0438\u043C \u043E\u043F\u044B\u0442\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0431\u0430\u0437 \u0437\u043D\u0430\u043D\u0438\u0439: \u0447\u0430\u0441\u0442\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438, \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0431\u0430\u0437 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0442\u0435\u0433\u043E\u0432.",
    excerptEn: "Sharing my 4 years of experience creating corporate knowledge bases: common mistakes, proper database structure, and tag system.",
    date: "05 \u0410\u0432\u0433 2025",
    categoryRu: "Notion",
    categoryEn: "Notion",
    colorClass: "bg-pastel-yellow"
  }
];

// scripts/generate-rss.ts
var SITE_URL = "https://danyanovich.site";
async function generateRSS() {
  const items = [];
  blogPosts.forEach((post) => {
    const url = `${SITE_URL}/ru/blog`;
    items.push(`
    <item>
      <title><![CDATA[${post.titleRu}]]></title>
      <link>${url}</link>
      <guid isPermaLink="false">blog-${post.id}</guid>
      <description><![CDATA[${post.excerptRu}]]></description>
      <pubDate>${(/* @__PURE__ */ new Date()).toUTCString()}</pubDate>
    </item>`);
  });
  portfolioProjects.forEach((project) => {
    const url = `${SITE_URL}/ru/cases/${project.id}`;
    let description = project.summary_ru;
    if (project.results_ru && project.results_ru.length > 0) {
      description += `

\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B:
- ` + project.results_ru.join("\n- ");
    }
    items.push(`
    <item>
      <title><![CDATA[${project.title_ru}]]></title>
      <link>${url}</link>
      <guid isPermaLink="false">case-${project.id}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${(/* @__PURE__ */ new Date()).toUTCString()}</pubDate>
    </item>`);
  });
  const rss = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>Dan Yanovich Blog &amp; Cases</title>
    <link>${SITE_URL}</link>
    <description>Notes about Notion, AI, automation, and Vibecoding. Showcase of cases and products.</description>
    <language>ru</language>
    <lastBuildDate>${(/* @__PURE__ */ new Date()).toUTCString()}</lastBuildDate>
${items.join("")}
  </channel>
</rss>`;
  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }
  fs.writeFileSync("./public/rss.xml", rss);
  console.log("RSS feed generated at public/rss.xml");
}
generateRSS();
