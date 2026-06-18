// scripts/prerender.ts
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { chromium } from "playwright";

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
  },
  // ── Project 6 — Viora Build Company Case ──
  {
    id: "viora-build",
    title_ru: "Viora Build",
    title_en: "Viora Build",
    category_ru: "\u041E\u043F\u044B\u0442 \u0440\u0430\u0431\u043E\u0442\u044B",
    category_en: "Work Experience",
    summary_ru: "\u0421\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0432 \u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u0438\u0438, \u0433\u0434\u0435 \u044F \u0441\u043E\u0432\u043C\u0435\u0449\u0430\u043B \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438 \u0440\u043E\u043B\u044C \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430 \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044F: \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u043B \u0441\u0438\u0441\u0442\u0435\u043C\u044B, \u043E\u0431\u0443\u0447\u0430\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0443, \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442, \u043F\u043E\u043C\u043E\u0433\u0430\u043B \u0441\u043E \u0441\u043C\u0435\u0442\u0430\u043C\u0438 \u0438 ERP, \u0432\u0451\u043B \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C \u0438 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u043B \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0435 \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044B.",
    summary_en: "A construction company in Portugal where I combined operations management with an implementation-engineer role: rolling out systems, training the team, automating sales and document workflows, helping with estimates and ERP, running reporting, and developing client-facing digital services.",
    tags: [
      "Jira",
      "ClickUp",
      "Notion",
      "Python",
      "OpenAI API",
      "Visual Orc",
      "amoCRM",
      "Power BI",
      "Grafana"
    ],
    lead_ru: "\u0420\u0430\u0431\u043E\u0442\u0430\u043B \u0432 \u0434\u0432\u0443\u0445 \u0440\u043E\u043B\u044F\u0445 \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E: \u0432\u044B\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043B \u0446\u0438\u0444\u0440\u043E\u0432\u0443\u044E \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u043B \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u043C\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u043C\u0438 \u043D\u0430 3 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u0445 \u0432\u0438\u043B\u043B \u0432 \u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u0438\u0438.",
    lead_en: "Worked in two roles simultaneously: built the company\u2019s digital infrastructure and managed operations across 3 villa construction projects in Portugal.",
    role_ru: "IT-\u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 / \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
    role_en: "IT Specialist / Direction Manager",
    period_ru: "\u0418\u044E\u043B\u044C 2024 \u2014 \u0424\u0435\u0432\u0440\u0430\u043B\u044C 2026 \xB7 1 \u0433\u043E\u0434 8 \u043C\u0435\u0441.",
    period_en: "Jul 2024 \u2014 Feb 2026 \xB7 1 year 8 months",
    location_ru: "\u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u0438\u044F",
    location_en: "Portugal",
    format_ru: "\u0423\u0434\u0430\u043B\u0451\u043D\u043D\u043E",
    format_en: "Remote",
    tools_used: [
      "Jira",
      "ClickUp",
      "Notion",
      "Visual Orc",
      "ERP",
      "Zapier",
      "n8n",
      "Python",
      "OpenAI API",
      "Whisper",
      "LM Studio",
      "Gemini",
      "Perplexity",
      "Flask",
      "Vue.js",
      "Tailwind CSS",
      "Google Sheets API",
      "Google Drive API",
      "Gmail API",
      "Telegram Bot API",
      "OCR",
      "amoCRM",
      "Power BI",
      "Grafana",
      "Sora",
      "Lovable.app",
      "Figma"
    ],
    sections: [
      {
        title_ru: "\u0420\u043E\u043B\u044C \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430 \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044F",
        title_en: "Implementation Engineer Role",
        body_ru: "\u0412 Viora Build \u044F \u0431\u044B\u043B \u0441\u0432\u044F\u0437\u0443\u044E\u0449\u0438\u043C \u0437\u0432\u0435\u043D\u043E\u043C \u043C\u0435\u0436\u0434\u0443 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E\u043C, \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430\u043C\u0438, \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439 \u0438 \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u043C\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438: \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043B \u0441\u0438\u0441\u0442\u0435\u043C\u044B, \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u043B \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u043F\u043E\u0434 \u0440\u0435\u0430\u043B\u044C\u043D\u0443\u044E \u0440\u0430\u0431\u043E\u0442\u0443 \u043D\u0430 \u043E\u0431\u044A\u0435\u043A\u0442\u0430\u0445 \u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0435 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B \u0440\u0430\u0431\u043E\u0442\u044B.",
        body_en: "At Viora Build, I acted as the bridge between management, contractors, the team, and digital tools: configuring systems, adapting processes to real on-site work, and helping the team move into new ways of operating.",
        bullets_ru: [
          "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043B \u0431\u0438\u0437\u043D\u0435\u0441-\u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0438 \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u043E\u0434 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438",
          "\u041F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043B \u0437\u0430\u0434\u0430\u0447\u0438 \u043C\u0435\u0436\u0434\u0443 \u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442\u043E\u043C, \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F\u043C\u0438 \u0438 \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u043C\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438",
          "\u041B\u043E\u043A\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043B \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0432\u043E \u0432\u043D\u0435\u0434\u0440\u044F\u0435\u043C\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0445 \u0438 \u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0430\u043B \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0438",
          "\u041F\u0440\u043E\u0432\u043E\u0434\u0438\u043B \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435, \u0441\u043E\u0431\u0438\u0440\u0430\u043B \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043B \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430"
        ],
        bullets_en: [
          "Configured business systems and custom solutions around real company workflows",
          "Translated needs between management, executors, and digital tools",
          "Localized rollout issues inside the implemented systems and supported fixes",
          "Ran training, collected questions, and adjusted processes after launch"
        ],
        outcomes_ru: [
          "\u0421\u0438\u0441\u0442\u0435\u043C\u044B \u0432\u043D\u0435\u0434\u0440\u044F\u043B\u0438\u0441\u044C \u043A\u0430\u043A \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442, \u0430 \u043D\u0435 \u043A\u0430\u043A \u0444\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
          "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0430\u0441\u044C \u043A \u043D\u043E\u0432\u044B\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u043C \u0438 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430\u043C"
        ],
        outcomes_en: [
          "Systems were introduced as practical working tools, not as formal checkboxes",
          "The team adapted faster to new processes and software"
        ]
      },
      {
        title_ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438",
        title_en: "Project Management",
        body_ru: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043B \u043F\u043E\u043B\u043D\u044B\u0439 \u0446\u0438\u043A\u043B 3 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 \u0432\u0438\u043B\u043B \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C\u044E 6\u201312 \u043C\u0435\u0441\u044F\u0446\u0435\u0432: \u043E\u0442 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u0440\u043E\u043A\u043E\u0432 \u0438 \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u0432 \u0434\u043E \u0441\u0434\u0430\u0447\u0438 \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0443.",
        body_en: "Coordinated the full lifecycle of 3 villa construction projects lasting 6\u201312 months each: from planning timelines and budgets to client handover.",
        bullets_ru: [
          "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u0440\u043E\u043A\u043E\u0432, \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432 \u0438 \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u0432 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438",
          "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441 \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439 \u0438 \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430\u043C\u0438, \u043F\u043B\u0430\u043D\u0451\u0440\u043A\u0438, 1-on-1",
          "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 \u0432 Jira \u0438 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u0443",
          "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438, \u0444\u0438\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C"
        ],
        bullets_en: [
          "Aligned timelines, resources, and budgets with clients",
          "Ran daily syncs with the team and contractors, planning meetings, and 1-on-1s",
          "Tracked statuses in Jira and prepared weekly management reports",
          "Prepared documentation, finalized delivery, and handed over completed properties"
        ],
        outcomes_ru: [
          "3 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0432\u0438\u043B\u043B \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u044B \u0432 \u0441\u0440\u043E\u043A",
          "\u042D\u0442\u0430\u043F\u044B \u0441\u0442\u0430\u043B\u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0435\u0435 \u0434\u043B\u044F \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432"
        ],
        outcomes_en: [
          "3 villa projects were delivered on time",
          "Project stages became more transparent for management and clients"
        ]
      },
      {
        title_ru: "AI-\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438",
        title_en: "AI Automations",
        body_ru: "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043B \u0438 \u0432\u043D\u0435\u0434\u0440\u0438\u043B 4 AI-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u043B\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0437\u0430\u0442\u0440\u0430\u0442\u044B \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u043D\u0430 30\u201340% \u0438 \u0443\u0431\u0440\u0430\u043B\u0438 \u0440\u0443\u0447\u043D\u0443\u044E \u0440\u0443\u0442\u0438\u043D\u0443 \u0432 \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438, \u043E\u0446\u0435\u043D\u043A\u0435 \u0437\u0430\u0434\u0430\u0447 \u0438 \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u043E \u0441\u043C\u0435\u0442\u0430\u043C\u0438.",
        body_en: "Designed and implemented 4 AI tools that reduced team operating costs by 30\u201340% and removed manual routine from communication, task evaluation, and estimate workflows.",
        bullets_ru: [
          "Email AI Assistant \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 50+ \u043F\u0438\u0441\u0435\u043C \u0432 \u0434\u0435\u043D\u044C",
          "ClickUp Reports Agent \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0440\u0430\u0431\u043E\u0442\u044B \u043A\u043E\u043C\u0430\u043D\u0434\u044B",
          "Construction AI Agent \u0434\u043B\u044F \u0446\u0435\u043D, \u0441\u043C\u0435\u0442 \u0438 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B \u0447\u0435\u0440\u0435\u0437 Sheets",
          "Telegram \u2192 ClickUp \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u0447 \u0438\u0437 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0445 \u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439"
        ],
        bullets_en: [
          "Email AI Assistant for automatic processing of 50+ emails per day",
          "ClickUp Reports Agent for team quality and speed evaluation",
          "Construction AI Agent for prices, estimates, and Sheets collaboration",
          "Telegram \u2192 ClickUp for creating tasks from voice and text messages"
        ],
        outcomes_ru: [
          "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0437\u0430\u0442\u0440\u0430\u0442\u044B \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u043B\u0438\u0441\u044C \u043D\u0430 30\u201340%",
          "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0438\u0435\u0441\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0438 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u0442\u044C \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F"
        ],
        outcomes_en: [
          "Team operating costs dropped by 30\u201340%",
          "Repeated workflows stopped requiring constant manual control"
        ],
        links: [
          { label: "Email AI Assistant", url: "/cases/email-ai", external: false },
          { label: "ClickUp Reports Agent", url: "/cases/clickup-reports", external: false },
          { label: "Construction AI Agent", url: "/cases/construction-ai", external: false },
          { label: "Telegram \u2192 ClickUp", url: "/cases/telegram-clickup", external: false }
        ]
      },
      {
        title_ru: "\u0412\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u0435 \u0438 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B",
        title_en: "Implementation & Team Enablement",
        body_ru: "\u041E\u0441\u0432\u0430\u0438\u0432\u0430\u043B \u043D\u043E\u0432\u044B\u0435 \u0440\u0430\u0431\u043E\u0447\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u043D\u0430 \u043D\u0438\u0445 \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u0435: \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F, \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F, \u0441\u0431\u043E\u0440 \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430.",
        body_en: "Learned new operational tools and rolled the team onto them through structured enablement: presentation, practical tasks, question collection, and post-launch process refinement.",
        bullets_ru: [
          "\u0418\u0437\u0443\u0447\u0438\u043B \u0438 \u0432\u043D\u0435\u0434\u0440\u0438\u043B \u043D\u043E\u0432\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443 Visual Orc \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B",
          "\u041F\u0440\u043E\u0432\u043E\u0434\u0438\u043B \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438, \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438 \u0440\u0430\u0437\u0431\u043E\u0440 \u0441\u043B\u043E\u0436\u043D\u044B\u0445 \u043A\u0435\u0439\u0441\u043E\u0432",
          "\u0421\u043E\u0431\u0438\u0440\u0430\u043B \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0438 \u0443\u0441\u0442\u0440\u0430\u043D\u044F\u043B \u0443\u0437\u043A\u0438\u0435 \u043C\u0435\u0441\u0442\u0430 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
          "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u043B \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u0431\u0435\u0437 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043A\u0438"
        ],
        bullets_en: [
          "Learned and rolled out the new Visual Orc software for the team",
          "Ran training via presentations, practical tasks, and issue review sessions",
          "Collected user questions and removed bottlenecks after launch",
          "Supported the team\u2019s move to new digital workflows without pausing operations"
        ],
        outcomes_ru: [
          "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0432\u0445\u043E\u0434\u0438\u043B\u0430 \u0432 \u043D\u043E\u0432\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0438 \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0432 \u043D\u0435\u0439 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E",
          "\u041F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u043B\u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u043C\u0438 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u043C\u044B\u043C\u0438"
        ],
        outcomes_en: [
          "The team got into the new system faster and started using it independently",
          "System rollouts became manageable and repeatable"
        ]
      },
      {
        title_ru: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0442\u0434\u0435\u043B\u0430 \u043F\u0440\u043E\u0434\u0430\u0436",
        title_en: "Sales Operations Automation",
        body_ru: "\u0421 \u043D\u0443\u043B\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B \u043E\u0442\u0434\u0435\u043B \u043F\u0440\u043E\u0434\u0430\u0436 \u0438\u0437 \u0434\u0432\u0443\u0445 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0438 \u0441\u043E\u0431\u0440\u0430\u043B \u0432\u043E\u043A\u0440\u0443\u0433 \u043D\u0435\u0433\u043E \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u0439 \u043A\u043E\u043D\u0442\u0443\u0440: \u0441\u043A\u0440\u0438\u043F\u0442\u044B, \u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u0431\u0430\u0446\u0438\u044F, \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0437\u0432\u043E\u043D\u043A\u043E\u0432, AI-\u0430\u043D\u0430\u043B\u0438\u0437 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043E\u0431\u0440\u0430\u0442\u043D\u0443\u044E \u0441\u0432\u044F\u0437\u044C \u043F\u043E \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0443 \u043F\u0440\u043E\u0434\u0430\u0436.",
        body_en: "Built a two-person sales function from scratch and wrapped it with a digital operations layer: scripts, transcription, translation, AI call analysis, and automated performance feedback.",
        bullets_ru: [
          "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043B \u0441\u043A\u0440\u0438\u043F\u0442\u044B \u043F\u0440\u043E\u0434\u0430\u0436 \u0438 \u0431\u0430\u0437\u043E\u0432\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0438\u0437 2 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u043E\u0432",
          "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u043B \u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u0431\u0430\u0446\u0438\u044E \u0437\u0432\u043E\u043D\u043A\u043E\u0432, \u043F\u0435\u0440\u0435\u043D\u043E\u0441 \u0432 Notion \u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
          "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B \u0430\u043D\u0430\u043B\u0438\u0437 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0437\u0432\u043E\u043D\u043A\u0430 \u043F\u043E \u043F\u0440\u043E\u043C\u043F\u0442\u0443 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u043C\u0435\u0442\u0440\u0438\u043A \u043F\u0440\u043E\u0434\u0430\u0436\u043D\u0438\u043A\u0443",
          "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0432 Google Sheets \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u0434\u0438\u043D\u0430\u043C\u0438\u043A\u0438 \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u0438"
        ],
        bullets_en: [
          "Prepared sales scripts and operating processes for a 2-person team",
          "Set up call transcription, transfer to Notion, and Russian translation",
          "Organized prompt-based analysis for every call and automatic KPI delivery to the salesperson",
          "Stored results in Google Sheets for trend tracking and transparency"
        ],
        outcomes_ru: [
          "\u041E\u0442\u0434\u0435\u043B \u043F\u0440\u043E\u0434\u0430\u0436 \u043F\u043E\u043B\u0443\u0447\u0438\u043B \u0438\u0437\u043C\u0435\u0440\u0438\u043C\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430",
          "\u0420\u0430\u0437\u0431\u043E\u0440 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0437\u0430\u0432\u0438\u0441\u0435\u0442\u044C \u043E\u0442 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F",
          "\u041D\u043E\u0432\u044B\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438 \u043C\u043E\u0433\u043B\u0438 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0432\u0445\u043E\u0434\u0438\u0442\u044C \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043F\u0440\u043E\u0434\u0430\u0436"
        ],
        outcomes_en: [
          "The sales team received a measurable quality-control system",
          "Call reviews stopped depending on manual managerial oversight",
          "New salespeople could ramp up faster"
        ]
      },
      {
        title_ru: "\u0421\u043C\u0435\u0442\u044B, ERP \u0438 \u0431\u0430\u0437\u0430 \u0432\u0438\u0434\u043E\u0432 \u0440\u0430\u0431\u043E\u0442",
        title_en: "Estimates, ERP & Work Database",
        body_ru: "\u041F\u043E\u043C\u043E\u0433\u0430\u043B \u0432\u044B\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u0446\u0438\u0444\u0440\u043E\u0432\u0443\u044E \u043E\u0441\u043D\u043E\u0432\u0443 \u0434\u043B\u044F \u0441\u043C\u0435\u0442 \u0438 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u0447\u0451\u0442\u0430: \u0443\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 ERP, \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043B \u043E\u0431\u0449\u0443\u044E \u0442\u0430\u0431\u043B\u0438\u0446\u0443 \u0440\u0430\u0431\u043E\u0442 \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u043B \u0431\u0430\u0437\u0443 \u0432\u0438\u0434\u043E\u0432 \u0440\u0430\u0431\u043E\u0442 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u043C\u0435\u0442.",
        body_en: "Helped build the digital foundation for estimates and construction accounting: supported ERP setup, structured the shared works-and-materials table, and developed a work-types database for future estimate automation.",
        bullets_ru: [
          "\u041F\u043E\u043C\u043E\u0433\u0430\u043B \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C ERP-\u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0434\u043B\u044F \u0443\u0447\u0451\u0442\u0430 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0442",
          "\u0421\u043E\u0431\u0438\u0440\u0430\u043B \u043E\u0431\u0449\u0443\u044E \u0442\u0430\u0431\u043B\u0438\u0446\u0443 \u0441 \u0440\u0430\u0431\u043E\u0442\u0430\u043C\u0438, \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430\u043C\u0438 \u0438 \u043B\u043E\u0433\u0438\u043A\u043E\u0439 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u043C\u0435\u0442",
          "\u0421\u043E\u0437\u0434\u0430\u0432\u0430\u043B \u0431\u0430\u0437\u0443 \u0442\u0438\u043F\u043E\u0432 \u0440\u0430\u0431\u043E\u0442 \u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0433\u043E \u0440\u0430\u0441\u0447\u0451\u0442\u0430 \u0441\u043C\u0435\u0442",
          "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B OCR \u0447\u0435\u043A\u043E\u0432 \u0438 AI-\u043F\u043E\u0438\u0441\u043A \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0440\u0430\u0431\u043E\u0442 \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430"
        ],
        bullets_en: [
          "Supported ERP setup for construction work accounting",
          "Built the shared table of works, materials, and estimate logic",
          "Created a work-types database for future estimate calculations",
          "Used receipt OCR and AI-assisted price lookup for works and materials as part of the workflow"
        ],
        outcomes_ru: [
          "\u0421\u043C\u0435\u0442\u044B \u0438 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0438 \u0441\u0442\u0430\u043B\u0438 \u0431\u043E\u043B\u0435\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C\u0438 \u0438 \u043F\u0440\u0438\u0433\u043E\u0434\u043D\u044B\u043C\u0438 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438",
          "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430 \u0435\u0434\u0438\u043D\u0443\u044E \u0431\u0430\u0437\u0443 \u0440\u0430\u0431\u043E\u0442 \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0432\u043C\u0435\u0441\u0442\u043E \u0440\u0430\u0437\u0440\u043E\u0437\u043D\u0435\u043D\u043D\u044B\u0445 \u0442\u0430\u0431\u043B\u0438\u0446"
        ],
        outcomes_en: [
          "Estimates and internal references became more structured and automation-ready",
          "The team got a unified work-and-material database instead of scattered tables"
        ],
        links: [
          { label: "Construction AI Agent", url: "/cases/construction-ai", external: false }
        ]
      },
      {
        title_ru: "\u041A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439, \u043E\u0431\u0443\u0447\u0430\u044E\u0449\u0438\u0439 \u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043D\u044B\u0439 \u043F\u043E\u0440\u0442\u0430\u043B\u044B",
        title_en: "Client, Training & Document Portals",
        body_ru: "\u0420\u0430\u0437\u0432\u0438\u0432\u0430\u043B \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0435 \u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043F\u043E\u0440\u0442\u0430\u043B\u044B \u0432 Notion: \u043E\u0442 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u043E\u0433\u043E \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430 \u043F\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0443 \u0434\u043E \u043E\u0431\u0443\u0447\u0430\u044E\u0449\u0435\u0433\u043E \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0430 \u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442\u0430 \u0441 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u043A\u043B\u0430\u0441\u0441\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0438 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0438\u0437\u0430\u0446\u0438\u0438.",
        body_en: "Expanded client-facing and internal portals in Notion: from a transparent client workspace for each build to a training portal and a document workflow with classification and routing rules.",
        bullets_ru: [
          "\u0420\u0430\u0437\u0432\u0438\u043B \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u043F\u043E\u0440\u0442\u0430\u043B \u0441 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u043E\u043C \u0440\u0430\u0431\u043E\u0442, \u0441\u043C\u0435\u0442\u043E\u0439, \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u043C, \u0433\u0440\u0430\u0444\u0438\u043A\u043E\u043C \u0438 \u043C\u0435\u0434\u0438\u0430-\u043E\u0442\u0447\u0451\u0442\u0430\u043C\u0438",
          "\u0421\u043E\u0437\u0434\u0430\u043B \u043F\u043E\u0440\u0442\u0430\u043B \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
          "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u0438 \u043B\u043E\u0433\u0438\u043A\u0443 \u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043F\u043E \u0442\u0438\u043F\u0430\u043C",
          "\u0421\u0432\u044F\u0437\u0430\u043B Google \u041F\u043E\u0447\u0442\u0443, Google Drive \u0438 Notion \u0432 \u0435\u0434\u0438\u043D\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432"
        ],
        bullets_en: [
          "Expanded the client portal with work progress, estimates, budget, schedule, and photo/video reports",
          "Created a training portal for onboarding and employee support",
          "Automated the company\u2019s document workflow and classification logic",
          "Connected Gmail, Google Drive, and Notion into one document-processing flow"
        ],
        outcomes_ru: [
          "\u041A\u043B\u0438\u0435\u043D\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043E\u0431\u044A\u0435\u043A\u0442\u0443 \u0431\u0435\u0437 \u043B\u0438\u0448\u043D\u0438\u0445 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0432 \u0447\u0430\u0442\u0430\u0445",
          "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0441\u0442\u0430\u043B\u0438 \u0445\u0440\u0430\u043D\u0438\u0442\u044C\u0441\u044F \u0438 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u043F\u043E \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u043C \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C",
          "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u0438 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432 \u0441\u0442\u0430\u043B\u0438 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0438 \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0435\u0435"
        ],
        outcomes_en: [
          "Clients gained transparent access to project status without extra messaging",
          "Documents started being stored and processed through clear rules",
          "Onboarding and team training became faster and more stable"
        ]
      },
      {
        title_ru: "\u0424\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0438 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C",
        title_en: "Financial Operations & Weekly Reporting",
        body_ru: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u043B \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0443\u044E \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043A\u0443 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u043D\u0430 \u0443\u0440\u043E\u0432\u043D\u0435 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E\u0439 \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u0438: \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u044B, \u043F\u043E\u0438\u0441\u043A \u043F\u043B\u0430\u0442\u0451\u0436\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432, \u0441\u0432\u0435\u0440\u043A\u0430 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 \u0438 \u0441\u0431\u043E\u0440 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0445 \u043E\u0442\u0447\u0451\u0442\u043E\u0432.",
        body_en: "Supported the company\u2019s financial operations through day-to-day control and recurring reporting: payroll prep, payment-document lookup, transaction checks, and weekly management reporting.",
        bullets_ru: [
          "\u0412\u0451\u043B \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u043B \u0441 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u043E\u0439 \u043F\u043B\u0430\u0442\u0451\u0436\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432",
          "\u0423\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B \u0432 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0435 \u0437\u0430\u0440\u043F\u043B\u0430\u0442 \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0445 \u0441\u0432\u0435\u0440\u043A\u0430\u0445",
          "\u0421\u043E\u0431\u0438\u0440\u0430\u043B \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043E\u0442\u0447\u0451\u0442\u044B \u043F\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u043C \u0440\u0430\u0431\u043E\u0442 \u0432 \u0435\u0434\u0438\u043D\u043E\u043C \u0444\u043E\u0440\u043C\u0430\u0442\u0435",
          "\u0424\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u043B AI-\u043F\u0440\u043E\u043C\u043F\u0442\u044B \u0434\u043B\u044F OCR \u0447\u0435\u043A\u043E\u0432, \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u0438 \u0438 \u0432\u0441\u043F\u043E\u043C\u043E\u0433\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0430\u043D\u0430\u043B\u0438\u0437\u0430"
        ],
        bullets_en: [
          "Handled financial operations and supported payment-document verification",
          "Helped with payroll preparation and finance checks",
          "Prepared weekly reports across workstreams in a unified format",
          "Created AI prompts for receipt OCR, reporting, and supporting analysis"
        ],
        outcomes_ru: [
          "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u043B\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0447\u0435\u0441\u043A\u0443\u044E \u043A\u0430\u0440\u0442\u0438\u043D\u0443 \u043F\u043E \u0444\u0438\u043D\u0430\u043D\u0441\u0430\u043C \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u043C",
          "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0438\u0435\u0441\u044F \u043E\u0442\u0447\u0451\u0442\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0441\u0442\u0430\u043B\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C\u0438"
        ],
        outcomes_en: [
          "Management received a faster operational picture across finance and delivery",
          "Recurring reporting tasks became standardized"
        ]
      },
      {
        title_ru: "\u041F\u0440\u043E\u043C\u043E-\u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0438 \u0441\u0430\u0439\u0442\u044B \u0434\u043B\u044F \u0438\u043D\u0432\u0435\u0441\u0442\u043E\u0440\u043E\u0432",
        title_en: "Promo Materials and Investor Websites",
        body_ru: "\u0418\u043D\u0438\u0446\u0438\u0438\u0440\u043E\u0432\u0430\u043B \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0434\u043B\u044F \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438.",
        body_en: "Initiated a new direction focused on commercial proposals and visual materials for the company\u2019s investment projects.",
        bullets_ru: [
          "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043B 17 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0441 AI-\u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F\u043C\u0438",
          "\u0413\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043B \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434 \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0445 \u043F\u043B\u0430\u043D\u043E\u0432 \u0438 \u0447\u0435\u0440\u0442\u0435\u0436\u0435\u0439",
          "\u0421\u043E\u0431\u0438\u0440\u0430\u043B \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u043E\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B, \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u0434 \u043F\u0443\u0442\u044C \u0438\u043D\u0432\u0435\u0441\u0442\u043E\u0440\u0430"
        ],
        bullets_en: [
          "Produced 17 commercial proposals with AI visualizations",
          "Generated building exteriors from architectural plans and blueprints",
          "Built conversion-oriented websites tailored to investor journeys"
        ],
        outcomes_ru: [
          "17 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0431\u044B\u043B\u0438 \u0431\u044B\u0441\u0442\u0440\u043E \u0443\u043F\u0430\u043A\u043E\u0432\u0430\u043D\u044B \u0432 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 digital-\u0444\u043E\u0440\u043C\u0430\u0442",
          "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0441\u0442\u0430\u043B\u0438 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438 \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u044B"
        ],
        outcomes_en: [
          "17 investment proposals were packaged into a clear digital format",
          "Presentation materials started supporting sales and investor conversations more effectively"
        ]
      },
      {
        title_ru: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \xAB\u0421\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0427\u0435\u043A\u0430\u043F\xBB",
        title_en: "Launching \u201CConstruction Checkup\u201D",
        body_ru: "\u0421\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0430\u043B \u043F\u043E\u043B\u043D\u044B\u0439 \u0446\u0438\u043A\u043B \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0434\u043B\u044F \u0438\u043D\u043E\u0441\u0442\u0440\u0430\u043D\u0446\u0435\u0432, \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u044E\u0449\u0438\u0445 \u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0432 \u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u0438\u0438: \u043E\u0442 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u0440\u044B\u043D\u043A\u0430 \u0434\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0435\u0433\u043E MVP \u0441 \u043B\u0435\u043D\u0434\u0438\u043D\u0433\u043E\u043C \u0438 \u0432\u043E\u0440\u043E\u043D\u043A\u043E\u0439.",
        body_en: "Owned the full product cycle for foreigners planning to build in Portugal: from market research to a working MVP with a landing page and sales funnel.",
        bullets_ru: [
          "\u041F\u0440\u043E\u0432\u0451\u043B \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u044B\u043D\u043A\u0430 \u0447\u0435\u0440\u0435\u0437 Gemini \u0438 Perplexity",
          "\u0421\u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043B \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430: 9 \u0432\u0438\u0434\u0435\u043E-\u043C\u043E\u0434\u0443\u043B\u0435\u0439, 3 \u0447\u0435\u043A-\u043B\u0438\u0441\u0442\u0430 \u0438 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F",
          "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043B\u0435\u043D\u0434\u0438\u043D\u0433, \u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044E \u0434\u043E\u0441\u0442\u0443\u043F\u0430",
          "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043B \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0443\u044E \u043A\u0430\u0440\u0442\u0443 \u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u0438\u0438 \u0438 \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430"
        ],
        bullets_en: [
          "Researched the market using Gemini and Perplexity",
          "Designed the product structure: 9 video modules, 3 checklists, and consulting",
          "Coordinated content, landing page, payments, and access automation",
          "Developed an interactive Portugal map and a construction cost calculator"
        ],
        outcomes_ru: [
          "MVP \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0431\u044B\u043B \u0434\u043E\u0432\u0435\u0434\u0451\u043D \u0434\u043E \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F",
          "\u042D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u043F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u043B\u0430\u0441\u044C \u0432 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442"
        ],
        outcomes_en: [
          "The product MVP reached a working launch state",
          "The company\u2019s expertise was turned into a standalone digital product"
        ]
      }
    ],
    related_cases: [
      {
        caseId: "email-ai",
        title_ru: "Email AI \u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442",
        title_en: "Email AI Assistant",
        blurb_ru: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B \u0432\u0445\u043E\u0434\u044F\u0449\u0443\u044E \u043F\u043E\u0447\u0442\u0443 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F \u0438 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043B 30\u201340 \u043C\u0438\u043D\u0443\u0442 \u0432 \u0434\u0435\u043D\u044C.",
        blurb_en: "Automated the founder\u2019s inbox and saved 30\u201340 minutes per day."
      },
      {
        caseId: "clickup-reports",
        title_ru: "ClickUp Reports Agent",
        title_en: "ClickUp Reports Agent",
        blurb_ru: "\u0421\u0434\u0435\u043B\u0430\u043B \u043E\u0431\u044A\u0435\u043A\u0442\u0438\u0432\u043D\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u043E\u0446\u0435\u043D\u043A\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0431\u0435\u0437 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0430\u043D\u0430\u043B\u0438\u0437\u0430.",
        blurb_en: "Built an objective team evaluation workflow without manual review."
      },
      {
        caseId: "construction-ai",
        title_ru: "Construction AI Agent",
        title_en: "Construction AI Agent",
        blurb_ru: "\u0423\u0441\u043A\u043E\u0440\u0438\u043B \u0440\u0430\u0431\u043E\u0442\u0443 \u0441\u043C\u0435\u0442\u0447\u0438\u043A\u043E\u0432 \u0438 \u0434\u043E\u0431\u0430\u0432\u0438\u043B \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u043E\u0448\u0438\u0431\u043E\u043A \u0434\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u043C\u0435\u0442.",
        blurb_en: "Accelerated estimator workflows and caught estimate errors before use."
      },
      {
        caseId: "telegram-clickup",
        title_ru: "Telegram \u2192 ClickUp",
        title_en: "Telegram \u2192 ClickUp",
        blurb_ru: "\u041F\u043E\u0437\u0432\u043E\u043B\u0438\u043B \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438 \u0433\u043E\u043B\u043E\u0441\u043E\u043C \u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u043C \u0431\u0435\u0437 \u0437\u0430\u0445\u043E\u0434\u0430 \u0432 ClickUp.",
        blurb_en: "Enabled task creation by voice and text without opening ClickUp."
      }
    ],
    external_links: [
      { label: "dev-l29.viorabuild.org", url: "http://dev-l29.viorabuild.org" },
      { label: "dev-l30.viorabuild.org", url: "http://dev-l30.viorabuild.org" },
      { label: "algarve-haven-ventures.lovable.app", url: "http://algarve-haven-ventures.lovable.app" }
    ],
    results_ru: [
      "3 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 \u0432\u0438\u043B\u043B \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u044B \u0432 \u0441\u0440\u043E\u043A",
      "4 AI-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u043B\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0437\u0430\u0442\u0440\u0430\u0442\u044B \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u043D\u0430 30\u201340%",
      "\u0421\u043E\u0431\u0440\u0430\u043D \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0438\u0439 \u043E\u0442\u0434\u0435\u043B \u043F\u0440\u043E\u0434\u0430\u0436 \u0441 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0438 KPI-\u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u044C\u044E",
      "\u0412\u043D\u0435\u0434\u0440\u0435\u043D\u044B \u043D\u043E\u0432\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B, \u0432\u043A\u043B\u044E\u0447\u0430\u044F Visual Orc",
      "\u041D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u043F\u043E\u0440\u0442\u0430\u043B, \u043F\u043E\u0440\u0442\u0430\u043B \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442",
      "\u0424\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0438 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u043D\u044B \u0432 \u0431\u043E\u043B\u0435\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",
      "17 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u044B \u0434\u043B\u044F \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432",
      "MVP \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \xAB\u0421\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0427\u0435\u043A\u0430\u043F\xBB \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0441 \u043B\u0435\u043D\u0434\u0438\u043D\u0433\u043E\u043C \u0438 \u0432\u043E\u0440\u043E\u043D\u043A\u043E\u0439"
    ],
    results_en: [
      "3 villa construction projects were delivered on time",
      "4 AI tools reduced team operating costs by 30\u201340%",
      "A working sales function with call analytics and KPI feedback was established",
      "New tools and team enablement were rolled out, including Visual Orc",
      "Client portal, training portal, and automated document workflow were implemented",
      "Finance operations and weekly reporting became more systematic",
      "17 commercial proposals were produced for investment projects",
      "The \u201CConstruction Checkup\u201D MVP launched with a landing page and funnel"
    ],
    type: "company"
  }
];

// src/data/blogPosts.ts
var blogPosts = [
  {
    id: 1,
    slug: "ai-agents-small-business",
    titleRu: "5 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C AI \u0430\u0433\u0435\u043D\u0442\u043E\u0432 \u0432 \u043C\u0430\u043B\u043E\u043C \u0431\u0438\u0437\u043D\u0435\u0441\u0435",
    titleEn: "5 Ways to Use AI Agents in Small Business",
    excerptRu: "\u0420\u0430\u0437\u0431\u0438\u0440\u0430\u0435\u043C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u0435\u0439\u0441\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0440\u0443\u0442\u0438\u043D\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447: \u043E\u0442 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 Email \u0434\u043E \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u043E\u0442\u0447\u0435\u0442\u043E\u0432.",
    excerptEn: "Analyzing real use cases of language models for automating routine tasks: from Email processing to report generation.",
    date: "24 \u041E\u043A\u0442 2025",
    publishedAt: "2025-10-24",
    categoryRu: "AI \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F",
    categoryEn: "AI Automation",
    colorClass: "bg-pastel-pink",
    readingTimeRu: "6 \u043C\u0438\u043D",
    readingTimeEn: "6 min",
    contentRu: [
      "AI-\u0430\u0433\u0435\u043D\u0442\u044B \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E \u043F\u043E\u043B\u0435\u0437\u043D\u044B \u0442\u0430\u043C, \u0433\u0434\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u0442 \u043E\u0434\u0438\u043D \u0438 \u0442\u043E\u0442 \u0436\u0435 \u0446\u0438\u043A\u043B: \u043F\u043E\u043B\u0443\u0447\u0438\u043B \u0437\u0430\u043F\u0440\u043E\u0441, \u0441\u043E\u0431\u0440\u0430\u043B \u0434\u0430\u043D\u043D\u044B\u0435, \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043B \u043E\u0442\u0432\u0435\u0442, \u043E\u0431\u043D\u043E\u0432\u0438\u043B \u0442\u0430\u0431\u043B\u0438\u0446\u0443 \u0438\u043B\u0438 CRM. \u041C\u0430\u043B\u044B\u0439 \u0431\u0438\u0437\u043D\u0435\u0441 \u0441\u0442\u0440\u0430\u0434\u0430\u0435\u0442 \u043E\u0442 \u044D\u0442\u043E\u0433\u043E \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u0432\u0441\u0435\u0433\u043E, \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0430\u044F, \u0430 \u0437\u0430\u0434\u0430\u0447 \u043C\u043D\u043E\u0433\u043E.",
      "\u041F\u0435\u0440\u0432\u044B\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u2014 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439. \u0410\u0433\u0435\u043D\u0442 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C email \u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C, \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442, \u0432\u044B\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0442\u044C \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u044B \u0438 \u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043E\u0442\u0432\u0435\u0442\u0430. \u042D\u0442\u043E \u043D\u0435 \u0437\u0430\u043C\u0435\u043D\u044F\u0435\u0442 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430, \u043D\u043E \u0441\u043D\u0438\u043C\u0430\u0435\u0442 \u0441\u0430\u043C\u044B\u0439 \u0442\u044F\u0436\u0451\u043B\u044B\u0439 \u0441\u043B\u043E\u0439 \u0440\u0443\u0442\u0438\u043D\u044B.",
      "\u0412\u0442\u043E\u0440\u043E\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u2014 \u043E\u0442\u0447\u0451\u0442\u044B \u0438 \u0441\u0432\u043E\u0434\u043A\u0438. \u0412\u043C\u0435\u0441\u0442\u043E \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0441\u0431\u043E\u0440\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0438\u0437 ClickUp, Notion, CRM \u0438 \u0447\u0430\u0442\u043E\u0432 \u0430\u0433\u0435\u043D\u0442 \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u0431\u0438\u0440\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 weekly report \u0434\u043B\u044F \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F. \u042D\u0442\u043E \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442 \u0432\u0440\u0435\u043C\u044F \u0438 \u0434\u0435\u043B\u0430\u0435\u0442 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u043C.",
      "\u0422\u0440\u0435\u0442\u0438\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u2014 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043B\u0438\u0434\u043E\u0432. \u0410\u0433\u0435\u043D\u0442 \u043C\u043E\u0436\u0435\u0442 \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0437\u0430\u043F\u0440\u043E\u0441, \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0448\u0430\u0433 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 \u0434\u043B\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430. \u042D\u0442\u043E \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u043D\u0435 \u0442\u0435\u0440\u044F\u0442\u044C \u0442\u0451\u043F\u043B\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438.",
      "\u0427\u0435\u0442\u0432\u0451\u0440\u0442\u044B\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u2014 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u0431\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439. AI-\u0430\u0433\u0435\u043D\u0442 \u043C\u043E\u0436\u0435\u0442 \u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C \u043D\u0430 \u0442\u0438\u043F\u043E\u0432\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u043F\u043E \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u0430\u043C, \u0448\u0430\u0431\u043B\u043E\u043D\u0430\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u043C. \u042D\u0442\u043E \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E \u043F\u043E\u043B\u0435\u0437\u043D\u043E, \u043A\u043E\u0433\u0434\u0430 \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446 \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0445\u043E\u0447\u0435\u0442 \u0431\u044B\u0442\u044C \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0442\u043E\u0447\u043A\u043E\u0439 \u0432\u0445\u043E\u0434\u0430 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432.",
      "\u041F\u044F\u0442\u044B\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u2014 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u043E\u0432 \u0438 follow-up. \u0410\u0433\u0435\u043D\u0442 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 \u0431\u0435\u0437 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439, \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C, \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0441\u0442\u0430\u0442\u0443\u0441 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0438\u044F. \u042D\u0442\u043E \u0434\u0430\u0451\u0442 \u043F\u0440\u043E\u0441\u0442\u0443\u044E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0447\u0435\u0441\u043A\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0431\u0435\u0437 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E\u0433\u043E \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F.",
      "\u0427\u0442\u043E\u0431\u044B \u0442\u0430\u043A\u0438\u0435 \u0430\u0433\u0435\u043D\u0442\u044B \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438, \u0432\u0430\u0436\u043D\u043E \u043D\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C \u0441 \u0430\u0431\u0441\u0442\u0440\u0430\u043A\u0442\u043D\u043E\u0433\u043E \xAB\u0441\u0434\u0435\u043B\u0430\u0435\u043C AI\xBB. \u041B\u0443\u0447\u0448\u0435 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0434\u0438\u043D \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0438\u0439\u0441\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441, \u0433\u0434\u0435 \u0443\u0436\u0435 \u043F\u043E\u043D\u044F\u0442\u043D\u044B \u0432\u0445\u043E\u0434, \u0432\u044B\u0445\u043E\u0434 \u0438 \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0439 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430. \u0422\u043E\u0433\u0434\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u0431\u044B\u0441\u0442\u0440\u043E \u043E\u043A\u0443\u043F\u0430\u0435\u0442\u0441\u044F \u0438 \u043D\u0435 \u043B\u043E\u043C\u0430\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u0443."
    ],
    contentEn: [
      "AI agents are most useful where someone repeats the same daily loop: receive a request, gather data, draft a reply, update a CRM or spreadsheet. Small businesses feel this pain more strongly because teams are small and context-switching is expensive.",
      "The first use case is inbound communication. An agent can sort emails and messages by category, assign priority, extract deadlines, and prepare a response draft. It does not replace a person, but it removes the heaviest layer of routine work.",
      "The second use case is reporting. Instead of manually collecting information from ClickUp, Notion, CRM systems, and chats, an agent can pull data on a schedule and assemble a readable weekly report for the manager. That saves time and makes visibility consistent.",
      "The third use case is lead qualification. An agent can analyze an incoming request, estimate intent, suggest the next step, and create a task for the sales manager. This helps prevent warm leads from getting lost between channels.",
      "The fourth use case is internal knowledge support. An AI agent can answer common team questions about SOPs, document templates, and workflows. This becomes especially useful when the founder no longer wants to be the single source of answers for everything.",
      "The fifth use case is deadline control and follow-up. The agent tracks stalled tasks, pings owners, collects updates, and escalates risks to a manager. That creates a lightweight management system without constant manual monitoring.",
      `To make agents actually work, do not start with an abstract goal like "let's add AI." Start with one repeatable process where inputs, outputs, and quality criteria are already clear. That is where automation pays off fastest.`
    ]
  },
  {
    id: 2,
    slug: "how-i-started-vibecoding",
    titleRu: "\u041A\u0430\u043A \u044F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u0434 \u0438 \u043D\u0430\u0447\u0430\u043B \u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C\u0441\u044F Vibecoding",
    titleEn: "How I Stopped Writing Code and Started Vibecoding",
    excerptRu: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0437\u0430 AI-\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442\u0430\u043C\u0438 \u0432\u0440\u043E\u0434\u0435 Cursor \u0438 Lovable, \u0438 \u043A\u0430\u043A \u044D\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u0442 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430.",
    excerptEn: "Why the future of development lies with AI assistants like Cursor and Lovable, and how it changes the developer profession forever.",
    date: "12 \u0421\u0435\u043D 2025",
    publishedAt: "2025-09-12",
    categoryRu: "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
    categoryEn: "Development",
    colorClass: "bg-pastel-blue",
    readingTimeRu: "5 \u043C\u0438\u043D",
    readingTimeEn: "5 min",
    contentRu: [
      "\u042F \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u043E\u0439. \u042F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0441\u0447\u0438\u0442\u0430\u0442\u044C, \u0447\u0442\u043E \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u0438\u0437\u043C\u0435\u0440\u044F\u0435\u0442\u0441\u044F \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0442\u0440\u043E\u043A \u043A\u043E\u0434\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u043D \u043D\u0430\u0431\u0440\u0430\u043B \u0440\u0443\u043A\u0430\u043C\u0438. Vibecoding \u0434\u043B\u044F \u043C\u0435\u043D\u044F \u2014 \u044D\u0442\u043E \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u043E\u0442 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u043A \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 AI.",
      "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0440\u043E\u0434\u0435 Cursor, Lovable \u0438 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 LLM \u043C\u0435\u043D\u044F\u044E\u0442 \u0441\u0430\u043C\u0443 \u0440\u043E\u043B\u044C \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430. \u041C\u044B \u0432\u0441\u0451 \u043C\u0435\u043D\u044C\u0448\u0435 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u043C\u0441\u044F \u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0438 \u0432\u0441\u0451 \u0431\u043E\u043B\u044C\u0448\u0435 \u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u0443\u0435\u043C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F, \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0438 \u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F.",
      "\u042D\u0442\u043E \u043D\u0435 \u043C\u0430\u0433\u0438\u044F \u0438 \u043D\u0435 \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442\xBB. \u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0430\u043C, \u0433\u0434\u0435 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0443\u043C\u0435\u0435\u0442 \u0437\u0430\u0434\u0430\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0431\u044B\u0441\u0442\u0440\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u044B, \u0437\u0430\u043C\u0435\u0447\u0430\u0442\u044C \u0440\u0435\u0433\u0440\u0435\u0441\u0441\u0438\u0438 \u0438 \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u0430. AI \u0443\u0441\u043A\u043E\u0440\u044F\u0435\u0442 \u0441\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F, \u0430 \u043D\u0435 \u0437\u0430\u043C\u0435\u043D\u044F\u0435\u0442 \u043C\u044B\u0448\u043B\u0435\u043D\u0438\u0435.",
      "\u0421\u0430\u043C\u044B\u0439 \u0437\u0430\u043C\u0435\u0442\u043D\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442 \u2014 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0438\u0442\u0435\u0440\u0430\u0446\u0438\u0439. \u0422\u043E, \u043D\u0430 \u0447\u0442\u043E \u0440\u0430\u043D\u044C\u0448\u0435 \u0443\u0445\u043E\u0434\u0438\u043B\u0438 \u0434\u043D\u0438: \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F, \u043F\u0435\u0440\u0432\u044B\u0439 \u0434\u0438\u0437\u0430\u0439\u043D, \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0444\u043E\u0440\u043C\u044B, \u0447\u0435\u0440\u043D\u043E\u0432\u043E\u0439 dashboard, \u0442\u0435\u043F\u0435\u0440\u044C \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0437\u0430 \u0447\u0430\u0441\u044B. \u042D\u0442\u043E \u0440\u0430\u0434\u0438\u043A\u0430\u043B\u044C\u043D\u043E \u043C\u0435\u043D\u044F\u0435\u0442 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u0437\u0430\u0434\u0430\u0447.",
      "\u041D\u043E \u0443 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0430 \u0435\u0441\u0442\u044C \u0438 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F. \u041D\u0443\u0436\u043D\u043E \u043B\u0443\u0447\u0448\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0446\u0435\u043B\u0438\u043A\u043E\u043C: \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B, \u0434\u0430\u043D\u043D\u044B\u0435, SEO, \u0441\u0431\u043E\u0440\u043A\u0443, UX, \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C. \u041A\u043E\u0433\u0434\u0430 \u043A\u043E\u0434 \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0431\u044B\u0441\u0442\u0440\u0435\u0435, \u0440\u0430\u0441\u0442\u0451\u0442 \u0446\u0435\u043D\u0430 \u0441\u043B\u0430\u0431\u044B\u0445 \u0440\u0435\u0448\u0435\u043D\u0438\u0439. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 vibecoding \u2014 \u044D\u0442\u043E \u043D\u0435 \u0443\u043F\u0440\u043E\u0449\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u0438, \u0430 \u0435\u0451 \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0432\u0432\u0435\u0440\u0445 \u043F\u043E \u0443\u0440\u043E\u0432\u043D\u044E \u0430\u0431\u0441\u0442\u0440\u0430\u043A\u0446\u0438\u0438.",
      "\u0414\u043B\u044F \u043C\u0435\u043D\u044F \u043B\u0443\u0447\u0448\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C AI \u043A\u0430\u043A \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430: \u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B, \u0443\u0441\u043A\u043E\u0440\u044F\u0442\u044C \u0440\u0443\u0442\u0438\u043D\u0443, \u0431\u044B\u0441\u0442\u0440\u043E \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u044B, \u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0437\u0430 \u0441\u043E\u0431\u043E\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0438 \u0444\u0438\u043D\u0430\u043B\u044C\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E."
    ],
    contentEn: [
      "I did not stop caring about software development. I stopped believing that a developer's value is measured by how many lines of code they type by hand. Vibecoding, to me, is the shift from manual production to steering product delivery together with AI.",
      "Tools like Cursor, Lovable, and modern LLMs are changing the role of the human builder. We spend less time writing repetitive components and more time defining constraints, scenarios, and architecture.",
      "This is not magic and it is not a one-click website button. Good outcomes appear only when a person can provide context, test ideas quickly, catch regressions, and preserve project structure. AI amplifies a strong operator; it does not replace thinking.",
      "The most visible benefit is iteration speed. Prototypes, first-pass UI, form integrations, and draft dashboards that used to take days can now be assembled in hours. That changes the economics of small products and client work.",
      "But the approach raises the bar in other areas. You need better system-level understanding: routing, data flow, SEO, build pipeline, UX, and security. When code is generated faster, weak decisions become more expensive. Vibecoding is not a simplification of the craft; it is a move to a higher layer of abstraction.",
      "The best mode for me is to use AI as a second engineer: ask for options, speed up routine, test hypotheses quickly, and still keep architecture decisions and final quality ownership on the human side."
    ]
  },
  {
    id: 3,
    slug: "notion-knowledge-base-architecture",
    titleRu: "\u0418\u0434\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439 \u0432 Notion",
    titleEn: "The Perfect Knowledge Base Architecture in Notion",
    excerptRu: "\u0414\u0435\u043B\u044E\u0441\u044C \u0441\u0432\u043E\u0438\u043C 4-\u043B\u0435\u0442\u043D\u0438\u043C \u043E\u043F\u044B\u0442\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0431\u0430\u0437 \u0437\u043D\u0430\u043D\u0438\u0439: \u0447\u0430\u0441\u0442\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438, \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0431\u0430\u0437 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0442\u0435\u0433\u043E\u0432.",
    excerptEn: "Sharing my 4 years of experience creating corporate knowledge bases: common mistakes, proper database structure, and tag system.",
    date: "05 \u0410\u0432\u0433 2025",
    publishedAt: "2025-08-05",
    categoryRu: "Notion",
    categoryEn: "Notion",
    colorClass: "bg-pastel-yellow",
    readingTimeRu: "7 \u043C\u0438\u043D",
    readingTimeEn: "7 min",
    contentRu: [
      "\u0411\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0431\u0430\u0437 \u0437\u043D\u0430\u043D\u0438\u0439 \u0432 Notion \u043B\u043E\u043C\u0430\u044E\u0442\u0441\u044F \u043D\u0435 \u043F\u043E\u0442\u043E\u043C\u0443, \u0447\u0442\u043E \u0432 Notion \u043F\u043B\u043E\u0445\u043E\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440, \u0430 \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0441\u043D\u0438\u0437\u0443 \u0432\u0432\u0435\u0440\u0445: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u043E\u0437\u0434\u0430\u044E\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B, \u043F\u043E\u0442\u043E\u043C \u043F\u0430\u043F\u043A\u0438, \u043F\u043E\u0442\u043E\u043C \u043F\u044B\u0442\u0430\u044E\u0442\u0441\u044F \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A \u0438 \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044E. \u0412 \u0438\u0442\u043E\u0433\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 \u0445\u0430\u043E\u0441.",
      "\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 \u0442\u0438\u043F\u043E\u0432 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430. \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u044B, \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438, \u0440\u0435\u0448\u0435\u043D\u0438\u044F, \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0438 \u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438. \u0423 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0442\u0438\u043F\u0430 \u0441\u0432\u043E\u0438 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430, \u0436\u0438\u0437\u043D\u0435\u043D\u043D\u044B\u0439 \u0446\u0438\u043A\u043B \u0438 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0441\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0442\u044C \u0432\u0441\u0451 \u0432 \u043E\u0434\u043D\u0443 \u0442\u0430\u0431\u043B\u0438\u0446\u0443 \u0440\u0435\u0434\u043A\u043E \u043F\u043E\u043B\u0435\u0437\u043D\u043E.",
      "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0441\u043B\u043E\u0439 \u2014 \u0435\u0434\u0438\u043D\u044B\u0435 \u0442\u0430\u043A\u0441\u043E\u043D\u043E\u043C\u0438\u0438. \u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u043E \u043F\u043E\u043D\u0438\u043C\u0430\u0442\u044C \u0442\u0435\u0433\u0438 \u043E\u0442\u0434\u0435\u043B\u043E\u0432, \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432, \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0438 \u0443\u0440\u043E\u0432\u043D\u0435\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0430. \u0415\u0441\u043B\u0438 \u0442\u0435\u0433\u0438 \u0432\u043E\u0437\u043D\u0438\u043A\u0430\u044E\u0442 \u0441\u0442\u0438\u0445\u0438\u0439\u043D\u043E, \u043F\u043E\u0438\u0441\u043A \u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u044F \u0431\u044B\u0441\u0442\u0440\u043E \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u044E\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C.",
      "\u041E\u0447\u0435\u043D\u044C \u0432\u0430\u0436\u0435\u043D \u0441\u0442\u0430\u0442\u0443\u0441 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438. \u0423 \u043A\u0430\u0436\u0434\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446, \u0434\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u0441\u0442\u0430\u0442\u0443\u0441: draft, active, archived. \u0411\u0435\u0437 \u044D\u0442\u043E\u0433\u043E \u0434\u0430\u0436\u0435 \u0441\u0430\u043C\u0430\u044F \u043A\u0440\u0430\u0441\u0438\u0432\u0430\u044F \u0431\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \u043F\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u043A\u043B\u0430\u0434\u0431\u0438\u0449\u0435 \u0443\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432.",
      "\u042F \u0442\u0430\u043A\u0436\u0435 \u0441\u043E\u0432\u0435\u0442\u0443\u044E \u043E\u0442\u0434\u0435\u043B\u044F\u0442\u044C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u0437\u043D\u0430\u043D\u0438\u0439 \u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0431\u0430\u0437. Knowledge base \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0443\u0434\u043E\u0431\u043D\u0430 \u0434\u043B\u044F \u0447\u0442\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438, \u0430 \u043D\u0435 \u0434\u043B\u044F \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0441\u0443\u0435\u0442\u044B. \u041A\u043E\u0433\u0434\u0430 \u0442\u0443\u0434\u0430 \u0436\u0435 \u0441\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u044E\u0442 \u0437\u0430\u0434\u0430\u0447\u0438, CRM \u0438 meeting notes, \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0442\u044F\u0436\u0435\u043B\u043E\u0439.",
      "\u0418\u0434\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0431\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \u2014 \u044D\u0442\u043E \u043D\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446, \u0430 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0434\u043E \u043E\u0442\u0432\u0435\u0442\u0430. \u0415\u0441\u043B\u0438 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043D\u0430\u0439\u0442\u0438 \u043D\u0443\u0436\u043D\u044B\u0439 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442, \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u0435\u0440\u0435\u0441\u0431\u043E\u0440\u043A\u0438, \u043A\u0430\u043A \u0431\u044B \u0445\u043E\u0440\u043E\u0448\u043E \u043E\u043D\u0430 \u043D\u0438 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u043B\u0430 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E."
    ],
    contentEn: [
      "Most corporate knowledge bases in Notion fail not because the editor is weak, but because the structure is built from the bottom up: people create pages first, folders second, and only later try to add search and navigation. The result is organized-looking chaos.",
      "A durable architecture starts with content types. In practice, that usually means SOPs, playbooks, decisions, reference material, and project notes. Each type has different properties, a different lifecycle, and a different freshness requirement, so putting everything into one database rarely helps.",
      "The next layer is shared taxonomy. Teams need a consistent understanding of tags for departments, processes, products, and access levels. If tags appear organically without rules, search and filtering stop being useful very quickly.",
      "Freshness status matters a lot. Every note should have an owner, a last-reviewed date, and a simple status such as draft, active, or archived. Without that, even a visually clean knowledge base turns into a graveyard of outdated documents.",
      "I also recommend separating the knowledge base from operational databases. A knowledge base should be optimized for reading and maintenance, not daily workflow noise. Once you mix tasks, CRM records, and meeting notes into the same navigation layer, clarity drops fast.",
      "The ideal knowledge base is not the one with the most pages. It is the one that gets a teammate to the right answer in under 30 seconds. If that is not happening, the structure needs to be redesigned."
    ]
  },
  {
    id: 4,
    slug: "agency-automation-advantage",
    titleRu: "The Agency Automation Advantage: \u043A\u0430\u043A \u043C\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043D\u0430 69 \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443",
    titleEn: "The Agency Automation Advantage: 69 Workflows That Actually Work",
    excerptRu: "\u041A\u0430\u043A \u043E\u0434\u043D\u043E \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u043E $28K \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0445\u043E\u0434\u0430, \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0432 80% \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E n8n, Notion \u0438 AI.",
    excerptEn: "How one agency recovered $28K in monthly revenue by automating 80% of operations with n8n, Notion, and AI.",
    date: "15 \u041C\u0430\u0440 2026",
    publishedAt: "2026-03-15",
    categoryRu: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F",
    categoryEn: "Automation",
    colorClass: "bg-pastel-green",
    readingTimeRu: "8 \u043C\u0438\u043D",
    readingTimeEn: "8 min",
    contentRu: [
      "\u0411\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432 \u0442\u0435\u0440\u044F\u044E\u0442 \u0434\u0435\u043D\u044C\u0433\u0438 \u043D\u0435 \u0438\u0437-\u0437\u0430 \u043D\u0438\u0437\u043A\u043E\u0433\u043E \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0440\u0430\u0431\u043E\u0442\u044B, \u0430 \u0438\u0437-\u0437\u0430 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u043D\u0435\u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438. \u041B\u0438\u0434\u044B \u0442\u0435\u0440\u044F\u044E\u0442\u0441\u044F \u043C\u0435\u0436\u0434\u0443 CRM \u0438 \u043F\u043E\u0447\u0442\u043E\u0439, \u043E\u0442\u0447\u0451\u0442\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0432\u0440\u0443\u0447\u043D\u0443\u044E, \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u0442\u0441\u044F \u0431\u0435\u0437 \u0441\u0438\u0441\u0442\u0435\u043C\u044B. \u041C\u044B \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u043B\u0438 \u044D\u0442\u0443 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u043D\u0430 \u043F\u0440\u0438\u043C\u0435\u0440\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u0438 \u0441\u043E\u0431\u0440\u0430\u043B\u0438 69 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0442 \u0432\u0441\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0431\u0440\u0435\u0448\u0438.",
      "\u041F\u0435\u0440\u0432\u0430\u044F \u0438 \u0441\u0430\u043C\u0430\u044F \u043E\u0447\u0435\u0432\u0438\u0434\u043D\u0430\u044F \u043F\u043E\u0442\u0435\u0440\u044F \u2014 \u043B\u0438\u0434\u043E\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0438 follow-up. \u0410\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u0442\u0440\u0430\u0442\u0438\u0442 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C 12 \u0447\u0430\u0441\u043E\u0432 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430 \u0440\u0443\u0447\u043D\u043E\u0435 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043B\u0438\u0434\u043E\u0432, \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0441\u0431\u043E\u0440 \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432. \u041E\u0434\u0438\u043D \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 n8n-\u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443 \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u0431\u0438\u0440\u0430\u0442\u044C \u043B\u0438\u0434\u0430 \u0438\u0437 \u0444\u043E\u0440\u043C\u044B, \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432 CRM, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C welcome-\u0446\u0435\u043F\u043E\u0447\u043A\u0443 \u0438 \u043D\u0430\u0437\u043D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443 \u2014 \u0431\u0435\u0437 \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430.",
      "\u0412\u0442\u043E\u0440\u0430\u044F \u0437\u043E\u043D\u0430 \u2014 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438. 17 \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443 \u0438\u0437 \u043D\u0430\u0448\u0435\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0442 \u043F\u043E\u043B\u043D\u044B\u0439 \u0446\u0438\u043A\u043B: \u043E\u0442 \u0441\u0431\u043E\u0440\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u0438\u0434\u0435\u0439 \u0434\u043E \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0438\u043D\u0433\u0430 \u0432 \u0441\u043E\u0446\u0441\u0435\u0442\u0438 \u0441 A/B-\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432. \u042D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E \xAB\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0447\u0430\u0449\u0435\xBB, \u044D\u0442\u043E \u043F\u0440\u043E \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u043E\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u043E \u0438 \u0431\u0435\u0437 \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0443\u0442\u0438\u043D\u044B.",
      "\u0422\u0440\u0435\u0442\u044C\u044F \u0437\u043E\u043D\u0430 \u2014 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430. \u0412\u043C\u0435\u0441\u0442\u043E \u0442\u043E\u0433\u043E \u0447\u0442\u043E\u0431\u044B \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 5-6 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432, \u043E\u0434\u0438\u043D \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442, \u0430\u0433\u0440\u0435\u0433\u0438\u0440\u0443\u0435\u0442 \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0434\u0430\u0448\u0431\u043E\u0440\u0434 \u0432 Telegram \u0438\u043B\u0438 Notion. \u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u043E\u0434\u0438\u043D \u0434\u0435\u043D\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0438 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442 5-7 \u0447\u0430\u0441\u043E\u0432 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E.",
      "\u0412\u0430\u0436\u043D\u044B\u0439 \u0443\u0440\u043E\u043A: \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u043A bolt-on \u0440\u0435\u0448\u0435\u043D\u0438\u0435. \u041D\u0435\u043B\u044C\u0437\u044F \u043D\u0430\u043A\u0438\u043D\u0443\u0442\u044C AI-\u0441\u043B\u043E\u0439 \u043F\u043E\u0432\u0435\u0440\u0445 \u0445\u0430\u043E\u0442\u0438\u0447\u043D\u044B\u0445 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0438 \u043E\u0436\u0438\u0434\u0430\u0442\u044C \u043F\u043E\u0440\u044F\u0434\u043A\u0430. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0443\u0436\u043D\u043E \u043D\u0430\u0432\u0435\u0441\u0442\u0438 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u0445, \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0445\u043E\u0434\u044B \u0438 \u0432\u044B\u0445\u043E\u0434\u044B \u2014 \u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0442\u043E\u043C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C. \u0418\u043C\u0435\u043D\u043D\u043E \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043C\u044B \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u043C \u0441 \u0430\u0443\u0434\u0438\u0442\u0430, \u0430 \u043D\u0435 \u0441 \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044F.",
      "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043F\u0440\u043E\u0448\u043B\u043E \u044D\u0442\u043E\u0442 \u043F\u0443\u0442\u044C: +$28K \u043C\u0435\u0441\u044F\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0445\u043E\u0434\u0430, \u0441\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043D\u0430 \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C \u043D\u0430 80%, \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0430, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0430 \u0432\u044B\u0433\u043E\u0440\u0430\u0442\u044C \u043D\u0430 \u0440\u0443\u0442\u0438\u043D\u0435. \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u043A\u0430\u0437\u0430\u043B\u0430\u0441\u044C \u043D\u0435 \u043F\u0440\u043E \u0443\u0432\u043E\u043B\u044C\u043D\u0435\u043D\u0438\u0435 \u043B\u044E\u0434\u0435\u0439, \u0430 \u043F\u0440\u043E \u0442\u043E, \u0447\u0442\u043E\u0431\u044B \u043E\u043D\u0438 \u0434\u0435\u043B\u0430\u043B\u0438 \u0440\u0430\u0431\u043E\u0442\u0443, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043B\u044E\u0431\u044F\u0442."
    ],
    contentEn: [
      "Most agencies lose money not because of poor work quality but because of operational inefficiency. Leads get lost between CRM and email, reports are compiled manually, content is published without a system. We broke down this problem at a real agency and built 69 workflows that cover every key gap.",
      "The first and most obvious loss is lead generation and follow-up. The average agency spends 12 hours per week manually tracking leads, sending proposals, and collecting status updates. One configured n8n workflow can capture a lead from a form, create a CRM record, send a welcome sequence, and assign a task to the manager\u2014with zero human involvement.",
      "The second zone is content and social media. 17 workflows in our system cover the full cycle: from content idea collection to automatic posting with A/B headline testing. This is not about posting more often\u2014it is about posting meaningfully without manual overhead.",
      "The third zone is marketing intelligence. Instead of manually gathering data from 5-6 sources every week, one workflow collects, aggregates, and pushes a dashboard to Telegram or Notion. The setup takes one day and saves 5-7 hours weekly.",
      "Key lesson: automation does not work as a bolt-on solution. You cannot add an AI layer on top of chaotic processes and expect order. First, you clean up the processes, standardize inputs and outputs\u2014then automate. That is why we always start with an audit, not implementation.",
      "The result for the agency that went through this journey: +$28K monthly revenue, 80% less time spent on reporting, and a team that stopped burning out on routine. Automation was never about replacing people\u2014it was about letting them do the work they love."
    ]
  },
  {
    id: 5,
    slug: "scale-agency-without-chaos",
    titleRu: "\u041A\u0430\u043A \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u0431\u0435\u0437 \u0445\u0430\u043E\u0441\u0430: OS \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438",
    titleEn: "How to Scale Your Agency Without Chaos: The Automation OS",
    excerptRu: "69 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0439 \u0434\u043B\u044F \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432 \u2014 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u043E\u0433\u043E \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433\u0430 \u0434\u043E compliance. \u0421\u0438\u0441\u0442\u0435\u043C\u0430, \u0430 \u043D\u0435 \u043D\u0430\u0431\u043E\u0440 \u0445\u0430\u043E\u0442\u0438\u0447\u043D\u044B\u0445 \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432.",
    excerptEn: "69 battle-tested agency automations \u2014 from client onboarding to compliance. A system, not a collection of random scripts.",
    date: "01 \u0410\u043F\u0440 2026",
    publishedAt: "2026-04-01",
    categoryRu: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F",
    categoryEn: "Automation",
    colorClass: "bg-pastel-orange",
    readingTimeRu: "7 \u043C\u0438\u043D",
    readingTimeEn: "7 min",
    contentRu: [
      "\u041A\u043E\u0433\u0434\u0430 \u043C\u044B \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C Automation OS, \u0443 \u043D\u0430\u0441 \u0431\u044B\u043B\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0434\u0435\u0441\u044F\u0442\u043A\u043E\u0432 \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432 \u0438 \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443, \u0440\u0430\u0437\u0431\u0440\u043E\u0441\u0430\u043D\u043D\u044B\u0445 \u043F\u043E n8n, Make, Notion API \u0438 Telegram-\u0431\u043E\u0442\u0430\u043C. \u041E\u043D\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u043F\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u043D\u043E \u0432\u043C\u0435\u0441\u0442\u0435 \u043D\u0435 \u0441\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u043B\u0438\u0441\u044C \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443. \u041F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0431\u044B\u043B\u0430 \u043D\u0435 \u0432 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u0445, \u0430 \u0432 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u044B.",
      "\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u0441\u043E\u0441\u0442\u043E\u0438\u0442 \u0438\u0437 9 \u0441\u043B\u043E\u0451\u0432: \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438, \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u0441\u043E\u0446\u0441\u0435\u0442\u0438, \u0432\u043E\u0440\u043E\u043D\u043A\u0438 \u0438 CRO, \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430, \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438, PR \u0438 \u043A\u043E\u043C\u044C\u044E\u043D\u0438\u0442\u0438, \u0430\u0443\u0442\u0440\u0438\u0447 \u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435, \u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, compliance \u0438 \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C.",
      "\u041A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u2014 \u0442\u0438\u043F\u0438\u0447\u043D\u044B\u0439 \u043F\u0440\u0438\u043C\u0435\u0440 \u0445\u0430\u043E\u0441\u0430. \u041E\u0434\u0438\u043D \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443 \u0440\u0435\u0448\u0430\u0435\u0442 \u044D\u0442\u043E \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E: \u0434\u043E\u0433\u043E\u0432\u043E\u0440 \u2192 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0432 CRM \u2192 \u0437\u0430\u0434\u0430\u0447\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0435 \u2192 \u0434\u043E\u0441\u0442\u0443\u043F\u044B \u2192 welcome-\u043F\u0438\u0441\u044C\u043C\u043E. 15 \u043C\u0438\u043D\u0443\u0442 \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u044E\u0442\u0441\u044F \u0432 30 \u0441\u0435\u043A\u0443\u043D\u0434 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439.",
      "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u2014 \u0441\u0430\u043C\u0430\u044F \u043D\u0435\u0434\u043E\u043E\u0446\u0435\u043D\u0451\u043D\u043D\u0430\u044F \u0437\u043E\u043D\u0430. 7 \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443 \u0434\u043B\u044F HR, finance \u0438 compliance: \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F, \u0441\u0431\u043E\u0440 weekly status, \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0438\u043D\u0432\u043E\u0439\u0441\u043E\u0432, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u043E\u0432.",
      "\u0418\u0442\u043E\u0433: Automation OS \u2014 \u044D\u0442\u043E \u043D\u0435 \u043D\u0430\u0431\u043E\u0440 \u0432\u043E\u0440\u043A\u0444\u043B\u043E\u0443, \u0430 \u0433\u043E\u0442\u043E\u0432\u0430\u044F \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u043E\u0436\u043D\u043E \u0432\u043D\u0435\u0434\u0440\u0438\u0442\u044C \u0437\u0430 30 \u0434\u043D\u0435\u0439. \u041F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u0431\u043E\u043B\u044C\u0448\u0430\u044F \u0447\u0430\u0441\u0442\u044C \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0431\u0435\u0437 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F."
    ],
    contentEn: [
      "When we started building the Automation OS, we had dozens of scripts and workflows scattered across n8n, Make, Notion API, and Telegram bots. The problem was not the tools\u2014it was the lack of architecture.",
      "A proper agency automation system consists of 9 layers: client operations, content and social, funnels and CRO, marketing intelligence, internal operations, PR and community, outreach and acquisition, paid ads, compliance and reporting.",
      "Client onboarding is a typical example of chaos. One workflow fixes this entirely: contract \u2192 CRM record \u2192 team tasks \u2192 access \u2192 welcome email. 15 minutes become 30 seconds.",
      "Internal operations are the most underestimated zone. 7 workflows for HR, finance, and compliance: auto reminders, weekly status, invoice generation, deadline tracking.",
      "The bottom line: The Automation OS is a ready-made architecture deployable in 30 days. After that, most operations run without manual steering."
    ]
  },
  {
    id: 6,
    slug: "solo-leveling-notion-game",
    titleRu: "\u041A\u0430\u043A \u044F \u0441\u0434\u0435\u043B\u0430\u043B RPG-\u0438\u0433\u0440\u0443 \u0432 Notion: Solo Leveling",
    titleEn: "How I Built an RPG Game in Notion: Solo Leveling",
    excerptRu: "\u041F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u0430\u044F RPG \u0441 \u043A\u043B\u0430\u0441\u0441\u0430\u043C\u0438, \u0443\u0440\u043E\u0432\u043D\u044F\u043C\u0438, \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0451\u043C \u0438 \u0441\u0440\u0430\u0436\u0435\u043D\u0438\u044F\u043C\u0438 \u2014 \u0446\u0435\u043B\u0438\u043A\u043E\u043C \u0432\u043D\u0443\u0442\u0440\u0438 Notion.",
    excerptEn: "A full RPG with classes, levels, inventory, and combat \u2014 entirely inside Notion.",
    date: "20 \u0410\u043F\u0440 2026",
    publishedAt: "2026-04-20",
    categoryRu: "Notion",
    categoryEn: "Notion",
    colorClass: "bg-pastel-purple",
    readingTimeRu: "6 \u043C\u0438\u043D",
    readingTimeEn: "6 min",
    contentRu: [
      "Solo Leveling \u2014 \u044D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u0448\u0430\u0431\u043B\u043E\u043D Notion. \u042D\u0442\u043E \u044D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442: \u043C\u043E\u0436\u043D\u043E \u043B\u0438 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u0443\u044E RPG \u0432\u043D\u0443\u0442\u0440\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430 \u0434\u043B\u044F \u0437\u0430\u043C\u0435\u0442\u043E\u043A? \u041E\u043A\u0430\u0437\u0430\u043B\u043E\u0441\u044C, \u043C\u043E\u0436\u043D\u043E. \u0421 \u043A\u043B\u0430\u0441\u0441\u0430\u043C\u0438, \u0434\u0435\u0440\u0435\u0432\u043E\u043C \u043D\u0430\u0432\u044B\u043A\u043E\u0432, \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0451\u043C, \u0441\u0440\u0430\u0436\u0435\u043D\u0438\u044F\u043C\u0438 \u0438 \u043F\u0440\u043E\u043A\u0430\u0447\u043A\u043E\u0439. \u0412\u0441\u0451 \u043D\u0430 \u0444\u043E\u0440\u043C\u0443\u043B\u0430\u0445, relations \u0438 rollups.",
      "\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u043F\u0440\u043E\u0441\u0442\u0430\u044F: \u0442\u0440\u0438 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445. \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436 (\u0441 \u0444\u043E\u0440\u043C\u0443\u043B\u0430\u043C\u0438 \u0434\u043B\u044F stats), \u0418\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C (\u043E\u0440\u0443\u0436\u0438\u0435, \u0431\u0440\u043E\u043D\u044F, \u0437\u0435\u043B\u044C\u044F), \u0421\u0440\u0430\u0436\u0435\u043D\u0438\u044F (\u043B\u043E\u0433 \u0431\u043E\u0451\u0432 \u0441 \u043C\u043E\u043D\u0441\u0442\u0440\u0430\u043C\u0438). Relations \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u044E\u0442 \u0432\u0441\u0451: \u044D\u043A\u0438\u043F\u0438\u0440\u043E\u0432\u0430\u043B \u043C\u0435\u0447 \u2192 \u0443\u0440\u043E\u043D \u0432\u044B\u0440\u043E\u0441 \u2192 \u043F\u043E\u0431\u0435\u0434\u0438\u043B \u043C\u043E\u043D\u0441\u0442\u0440\u0430 \u2192 \u043F\u043E\u043B\u0443\u0447\u0438\u043B \u043B\u0443\u0442 \u2192 \u0443\u043B\u0443\u0447\u0448\u0438\u043B \u044D\u043A\u0438\u043F\u0438\u0440\u043E\u0432\u043A\u0443.",
      "\u0421\u0430\u043C\u043E\u0435 \u0441\u043B\u043E\u0436\u043D\u043E\u0435 \u0431\u044B\u043B\u043E \u0443\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0433\u0435\u0439\u043C-\u0434\u0438\u0437\u0430\u0439\u043D \u043F\u0440\u043E\u0441\u0442\u044B\u043C. Notion \u043D\u0435 \u043F\u0440\u043E\u0449\u0430\u0435\u0442 \u0441\u043B\u043E\u0436\u043D\u043E\u0439 \u043B\u043E\u0433\u0438\u043A\u0438: \u0440\u043E\u043B\u043B\u0430\u043F\u044B \u043D\u0435 \u0440\u0435\u043A\u0443\u0440\u0441\u0438\u0432\u043D\u044B, \u0444\u043E\u0440\u043C\u0443\u043B\u044B \u043D\u0435 \u0438\u043C\u0435\u044E\u0442 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F. \u041A\u0430\u0436\u0434\u0430\u044F \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0443\u043C\u0435\u0441\u0442\u0438\u0442\u044C\u0441\u044F \u0432 \u043E\u0434\u043D\u043E-\u0434\u0432\u0430 \u043F\u043E\u043B\u044F.",
      "Solo Leveling \u2014 \u043B\u0443\u0447\u0448\u0430\u044F \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0434\u0430\u043B\u0435\u043A\u043E \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0439\u0442\u0438 \u0441 Notion, \u0435\u0441\u043B\u0438 \u043D\u0435 \u0431\u043E\u044F\u0442\u044C\u0441\u044F \u0444\u043E\u0440\u043C\u0443\u043B \u0438 relations."
    ],
    contentEn: [
      "Solo Leveling is not just another Notion template. It is an experiment: can you build a full RPG inside a note-taking tool? Turns out, you can. With classes, skill trees, inventory, combat, and leveling up. All powered by formulas, relations, and rollups.",
      "The architecture is simple: three databases. Character (formula-driven stats), Inventory (weapons, armor, potions), Battles (combat log). Relations connect everything: equip a sword \u2192 damage goes up \u2192 beat a monster \u2192 get loot \u2192 upgrade gear.",
      "The hardest part was keeping the game design simple. Notion does not forgive complex logic: rollups are not recursive, formulas have no state. Every mechanic had to fit into one or two fields.",
      "Solo Leveling is the best demo of how far you can push Notion when you are not afraid of formulas and relations."
    ]
  }
];

// src/data/notionTemplates.ts
var paidTemplatesData = [
  {
    id: "ea16f21a-615e-49e0-b177-e2affd3cf2ca",
    name: "Second Brain OS",
    slug: "second-brain-os-903",
    price: 39,
    description: {
      en: "A unified command center for thoughts, projects, and goals \u2014 where chaos turns into system, and random ideas become finished results.",
      ru: "\u0415\u0434\u0438\u043D\u044B\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u043D\u044B\u0439 \u0446\u0435\u043D\u0442\u0440 \u0434\u043B\u044F \u043C\u044B\u0441\u043B\u0435\u0439, \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0438 \u0446\u0435\u043B\u0435\u0439 \u2014 \u0433\u0434\u0435 \u0445\u0430\u043E\u0441 \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443, \u0430 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0435 \u0438\u0434\u0435\u0438 \u0441\u0442\u0430\u043D\u043E\u0432\u044F\u0442\u0441\u044F \u0433\u043E\u0442\u043E\u0432\u044B\u043C\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C\u0438."
    },
    category: { en: "Second Brain", ru: "Second Brain" },
    categoryGroup: "personal-productivity",
    features: {
      en: [
        "Inbox capture system \u2014 all inputs flow through a structured pipeline",
        "Three-tier hierarchy: Areas \u2192 Projects \u2192 Actions with relational linking",
        "Project tracking with status pipeline and energy expenditure indicator",
        "5-level urgency scale with weekly and monthly calendar views",
        "Knowledge base: Notes flow from draft to final, grouped by notebook and topic",
        "Resource management: Videos, articles, podcasts with status tracking",
        "Processing pipeline: Inbox \u2192 Processing \u2192 Action \u2192 Result"
      ],
      ru: [
        "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 Inbox \u2014 \u0432\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440",
        "\u0422\u0440\u0451\u0445\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u0430\u044F \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u044F: \u041E\u0431\u043B\u0430\u0441\u0442\u0438 \u2192 \u041F\u0440\u043E\u0435\u043A\u0442\u044B \u2192 \u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441\u043E \u0441\u0432\u044F\u0437\u044F\u043C\u0438",
        "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432: \u0441\u0442\u0430\u0442\u0443\u0441\u044B, \u0441\u0440\u043E\u043A\u0438, \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0442\u0440\u0430\u0442 \u044D\u043D\u0435\u0440\u0433\u0438\u0438",
        "5-\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u0430\u044F \u0448\u043A\u0430\u043B\u0430 \u0441\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u0438 \u0441 \u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u0438 \u043C\u0435\u0441\u044F\u0447\u043D\u044B\u043C \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u0451\u043C",
        "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439: \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043E\u0442 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430 \u0434\u043E \u0444\u0438\u043D\u0430\u043B\u0430, \u0441\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043F\u043E \u0442\u0435\u0442\u0440\u0430\u0434\u0438 \u0438 \u0442\u0435\u043C\u0435",
        "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u0430\u043C\u0438: \u0432\u0438\u0434\u0435\u043E, \u0441\u0442\u0430\u0442\u044C\u0438, \u043F\u043E\u0434\u043A\u0430\u0441\u0442\u044B \u0441 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u0430",
        "\u041A\u043E\u043D\u0432\u0435\u0439\u0435\u0440 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438: Inbox \u2192 \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u2192 \u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u2192 \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442"
      ]
    },
    icon: "Brain",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20"
  },
  {
    id: "2e7d872b-594c-816b-b466-00643d066f97",
    name: "Real Estate OS",
    slug: "real-estate-os-805",
    price: 50,
    description: {
      en: "Manage your real estate business in one place. Track properties, contacts, deals through a pipeline, and schedule showings, calls, and meetings \u2014 all linked together.",
      ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0431\u0438\u0437\u043D\u0435\u0441\u043E\u043C \u043F\u043E \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438 \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B, \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B, \u0441\u0434\u0435\u043B\u043A\u0438 \u0447\u0435\u0440\u0435\u0437 \u043F\u0430\u0439\u043F\u043B\u0430\u0439\u043D \u0438 \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u043F\u043E\u043A\u0430\u0437\u044B, \u0437\u0432\u043E\u043D\u043A\u0438 \u0438 \u0432\u0441\u0442\u0440\u0435\u0447\u0438 \u2014 \u0432\u0441\u0451 \u0441\u0432\u044F\u0437\u0430\u043D\u043E."
    },
    category: { en: "Real Estate", ru: "\u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C" },
    categoryGroup: "real-estate",
    features: {
      en: [
        "Properties database with price, area, type, status, photos, and map view",
        "Contacts database for buyers, sellers, agents with kanban by status",
        "Deals pipeline: Qualification \u2192 Showing \u2192 Offer \u2192 Contract \u2192 Closed/Lost",
        "Activities tracker for calls, meetings, showings with calendar and daily focus",
        "Dashboard showing hot deals, today's tasks, and new properties",
        "All databases linked by relations \u2014 every deal connects to property and client"
      ],
      ru: [
        "\u0411\u0430\u0437\u0430 \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432: \u0446\u0435\u043D\u0430, \u043F\u043B\u043E\u0449\u0430\u0434\u044C, \u0442\u0438\u043F, \u0441\u0442\u0430\u0442\u0443\u0441, \u0444\u043E\u0442\u043E \u0438 \u043A\u0430\u0440\u0442\u0430",
        "\u0411\u0430\u0437\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432: \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0438, \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u044B, \u0430\u0433\u0435\u043D\u0442\u044B \u0441 \u043A\u0430\u043D\u0431\u0430\u043D \u043F\u043E \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043C",
        "\u041F\u0430\u0439\u043F\u043B\u0430\u0439\u043D \u0441\u0434\u0435\u043B\u043E\u043A: \u041A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u2192 \u041F\u043E\u043A\u0430\u0437 \u2192 \u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u2192 \u0414\u043E\u0433\u043E\u0432\u043E\u0440 \u2192 \u0417\u0430\u043A\u0440\u044B\u0442\u043E",
        "\u0422\u0440\u0435\u043A\u0435\u0440 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0435\u0439: \u0437\u0432\u043E\u043D\u043A\u0438, \u0432\u0441\u0442\u0440\u0435\u0447\u0438, \u043F\u043E\u043A\u0430\u0437\u044B \u0441 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u0451\u043C",
        "\u0414\u0430\u0448\u0431\u043E\u0440\u0434: \u0433\u043E\u0440\u044F\u0447\u0438\u0435 \u0441\u0434\u0435\u043B\u043A\u0438, \u0437\u0430\u0434\u0430\u0447\u0438 \u043D\u0430 \u0441\u0435\u0433\u043E\u0434\u043D\u044F, \u043D\u043E\u0432\u044B\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B",
        "\u0412\u0441\u0435 \u0431\u0430\u0437\u044B \u0441\u0432\u044F\u0437\u0430\u043D\u044B \u2014 \u043A\u0430\u0436\u0434\u0430\u044F \u0441\u0434\u0435\u043B\u043A\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u0430 \u043A \u043E\u0431\u044A\u0435\u043A\u0442\u0443 \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0443"
      ]
    },
    icon: "Building2",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "2e7d872b-594c-81aa-84d1-006453b60d60",
    name: "Freelance OS",
    slug: "freelance-os-456",
    price: 40,
    description: {
      en: "Manage freelance projects, clients, portfolio, and reviews in one workspace. Track active projects on a kanban and collect client reviews.",
      ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0444\u0440\u0438\u043B\u0430\u043D\u0441-\u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438, \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438, \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0438 \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0432 \u043E\u0434\u043D\u043E\u043C \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B \u043D\u0430 \u043A\u0430\u043D\u0431\u0430\u043D\u0435 \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u043E\u0442\u0437\u044B\u0432\u044B."
    },
    category: { en: "Freelance", ru: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    categoryGroup: "freelance",
    features: {
      en: [
        "Projects database with status tracking and Active Projects kanban board",
        "Portfolio Showcase gallery for completed work",
        "Clients database with Active Clients view",
        "Knowledge Base for reference materials and guides",
        "Reviews collection with New Reviews (5-star) for marketing",
        "Main dashboard: Portfolio, Active Projects, Active Clients, New Reviews",
        "Simple workflow: add client \u2192 create project \u2192 link \u2192 complete \u2192 review"
      ],
      ru: [
        "\u0411\u0430\u0437\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0441 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 \u0438 \u043A\u0430\u043D\u0431\u0430\u043D\u043E\u043C \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432",
        "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0442",
        "\u0411\u0430\u0437\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0441 \u0432\u0438\u0434\u043E\u043C \xAB\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B\xBB",
        "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u044B\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432",
        "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F \u043E\u0442\u0437\u044B\u0432\u043E\u0432: \u043D\u043E\u0432\u044B\u0435 \u043E\u0442\u0437\u044B\u0432\u044B (5 \u0437\u0432\u0451\u0437\u0434) \u0434\u043B\u044F \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0430",
        "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0434\u0430\u0448\u0431\u043E\u0440\u0434: \u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E, \u041F\u0440\u043E\u0435\u043A\u0442\u044B, \u041A\u043B\u0438\u0435\u043D\u0442\u044B, \u041E\u0442\u0437\u044B\u0432\u044B",
        "\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0444\u043B\u043E\u0443: \u043A\u043B\u0438\u0435\u043D\u0442 \u2192 \u043F\u0440\u043E\u0435\u043A\u0442 \u2192 \u0441\u0432\u044F\u0437\u044C \u2192 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435 \u2192 \u043E\u0442\u0437\u044B\u0432"
      ]
    },
    icon: "Briefcase",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20"
  },
  {
    id: "2e7d872b-594c-8194-a7aa-0064e890e7fa",
    name: "E-commerce OS",
    slug: "e-commerce-os-261",
    price: 25,
    description: {
      en: "Manage your online store in one place \u2014 track products and stock levels, process orders on a kanban board, plan marketing campaigns, and monitor income and expenses across multiple sales platforms.",
      ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u043C \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435 \u2014 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u0438 \u043E\u0441\u0442\u0430\u0442\u043A\u0438, \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043D\u0430 \u043A\u0430\u043D\u0431\u0430\u043D\u0435, \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0439\u0442\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u044B."
    },
    category: { en: "E-commerce", ru: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043A\u043E\u043C\u043C\u0435\u0440\u0446\u0438\u044F" },
    categoryGroup: "operations",
    features: {
      en: [
        "Product Catalog with stock tracking and Low Stock alerts",
        "Order Management kanban \u2014 drag cards to update status",
        "Marketing Planner with promo calendar and campaign registry",
        "Finance Tracker \u2014 log income and expenses by category",
        "Platform Directory \u2014 manage sales channels with commission rates",
        "All databases connected \u2014 no switching between tools"
      ],
      ru: [
        "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0441 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435\u043C \u043E\u0441\u0442\u0430\u0442\u043A\u043E\u0432 \u0438 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F\u043C\u0438",
        "\u041A\u0430\u043D\u0431\u0430\u043D \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u2014 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430",
        "\u041F\u043B\u0430\u043D\u0435\u0440 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0430: \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C \u043F\u0440\u043E\u043C\u043E \u0438 \u0440\u0435\u0435\u0441\u0442\u0440 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439",
        "\u0424\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0439 \u0442\u0440\u0435\u043A\u0435\u0440: \u0434\u043E\u0445\u043E\u0434\u044B \u0438 \u0440\u0430\u0441\u0445\u043E\u0434\u044B \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C",
        "\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C: \u043A\u0430\u043D\u0430\u043B\u044B \u043F\u0440\u043E\u0434\u0430\u0436 \u0438 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438",
        "\u0412\u0441\u0435 \u0431\u0430\u0437\u044B \u0441\u0432\u044F\u0437\u0430\u043D\u044B \u2014 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u044C\u0441\u044F \u043C\u0435\u0436\u0434\u0443 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438"
      ]
    },
    icon: "ShoppingCart",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20"
  },
  {
    id: "2e7d872b-594c-810f-b50b-0064b3194503",
    name: "Documents OS",
    slug: "documents-os-1",
    price: 20,
    description: {
      en: "Store, track, and manage all your important documents in one place. Set expiration dates, get renewal alerts, attach scans, log storage locations, and keep a version history \u2014 so nothing expires or gets lost.",
      ru: "\u0425\u0440\u0430\u043D\u0438\u0442\u0435, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0432\u0441\u0435\u043C\u0438 \u0432\u0430\u0436\u043D\u044B\u043C\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438 \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435. \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E\u0431 \u0438\u0441\u0442\u0435\u0447\u0435\u043D\u0438\u0438, \u0441\u043A\u0430\u043D\u044B, \u043C\u0435\u0441\u0442\u0430 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0432\u0435\u0440\u0441\u0438\u0439."
    },
    category: { en: "Documentation", ru: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442" },
    categoryGroup: "operations",
    features: {
      en: [
        "Documents database with type, status, owner, expiration date, and file scans",
        "Expiration alerts \u2014 flags documents expiring within 30 days",
        "Storage Locations database \u2014 track where originals are kept",
        "Versions & Logs \u2014 log every change with version number and date",
        "Dashboard: Attention gallery, Recently Updated list, Statistics view",
        "Quick Start guide built right into the template"
      ],
      ru: [
        "\u0411\u0430\u0437\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432: \u0442\u0438\u043F, \u0441\u0442\u0430\u0442\u0443\u0441, \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446, \u0441\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u0441\u043A\u0430\u043D\u044B",
        "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E\u0431 \u0438\u0441\u0442\u0435\u0447\u0435\u043D\u0438\u0438 \u2014 \u043F\u043E\u043C\u0435\u0447\u0430\u0435\u0442 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0437\u0430 30 \u0434\u043D\u0435\u0439",
        "\u041C\u0435\u0441\u0442\u0430 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F: \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435, \u0433\u0434\u0435 \u043B\u0435\u0436\u0430\u0442 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044B",
        "\u0412\u0435\u0440\u0441\u0438\u0438 \u0438 \u043B\u043E\u0433\u0438: \u043A\u0430\u0436\u0434\u043E\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0441 \u043D\u043E\u043C\u0435\u0440\u043E\u043C \u0432\u0435\u0440\u0441\u0438\u0438 \u0438 \u0434\u0430\u0442\u043E\u0439",
        "\u0414\u0430\u0448\u0431\u043E\u0440\u0434: \u0433\u0430\u043B\u0435\u0440\u0435\u044F \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u044F, \u043D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F, \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
        "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E Quick Start \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043E \u043F\u0440\u044F\u043C\u043E \u0432 \u0448\u0430\u0431\u043B\u043E\u043D"
      ]
    },
    icon: "FileStack",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20"
  },
  {
    id: "2e7d872b-594c-8101-ba20-0064c3973e7a",
    name: "Ideas OS",
    slug: "ideas-os-484",
    price: 10,
    description: {
      en: "Capture, score, and develop ideas with ICE scoring (Impact, Confidence, Effort). Includes an inbox, best ideas gallery, process kanban, roadmap timeline, and idea connections table.",
      ru: "\u0417\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435, \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u0438 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0439\u0442\u0435 \u0438\u0434\u0435\u0438 \u0441 ICE-\u0441\u043A\u043E\u0440\u0438\u043D\u0433\u043E\u043C. Inbox, \u0433\u0430\u043B\u0435\u0440\u0435\u044F \u043B\u0443\u0447\u0448\u0438\u0445 \u0438\u0434\u0435\u0439, \u043A\u0430\u043D\u0431\u0430\u043D \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430, roadmap \u0438 \u0441\u0432\u044F\u0437\u0438 \u043C\u0435\u0436\u0434\u0443 \u0438\u0434\u0435\u044F\u043C\u0438."
    },
    category: { en: "Idea Management", ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438\u0434\u0435\u044F\u043C\u0438" },
    categoryGroup: "personal-productivity",
    features: {
      en: [
        "ICE Scoring \u2014 auto-calculated from Impact, Confidence, Effort (1-10)",
        "Idea funnel: Inbox \u2192 Review \u2192 Incubator \u2192 In Progress \u2192 Done",
        "Best Ideas gallery showing ideas with ICE Score > 20",
        "Process kanban board for status management",
        "Roadmap timeline view",
        "Connections table \u2014 link ideas to each other for cross-pollination",
        "Categories for theme grouping and Resources for supporting materials"
      ],
      ru: [
        "ICE-\u0441\u043A\u043E\u0440\u0438\u043D\u0433: \u0430\u0432\u0442\u043E\u043F\u043E\u0434\u0441\u0447\u0451\u0442 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0412\u043B\u0438\u044F\u043D\u0438\u044F, \u0423\u0432\u0435\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0438 \u0423\u0441\u0438\u043B\u0438\u0439",
        "\u0412\u043E\u0440\u043E\u043D\u043A\u0430 \u0438\u0434\u0435\u0439: Inbox \u2192 \u041E\u0431\u0437\u043E\u0440 \u2192 \u0418\u043D\u043A\u0443\u0431\u0430\u0442\u043E\u0440 \u2192 \u0412 \u0440\u0430\u0431\u043E\u0442\u0435 \u2192 \u0413\u043E\u0442\u043E\u0432\u043E",
        "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u043B\u0443\u0447\u0448\u0438\u0445 \u0438\u0434\u0435\u0439 (ICE > 20)",
        "\u041A\u0430\u043D\u0431\u0430\u043D-\u0434\u043E\u0441\u043A\u0430 \u0434\u043B\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043C\u0438",
        "Roadmap \u2014 \u0442\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u0438\u0434\u0435\u0439",
        "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u0441\u0432\u044F\u0437\u0435\u0439 \u2014 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0438\u0434\u0435\u0438 \u0434\u0440\u0443\u0433 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C",
        "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0438 \u043F\u043E \u0442\u0435\u043C\u0430\u043C \u0438 \u0411\u0430\u0437\u0430 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432"
      ]
    },
    icon: "Lightbulb",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20"
  },
  {
    id: "2e7d872b-594c-81e4-be60-0064593cd736",
    name: "90 Day Planning",
    slug: "90-day-planning",
    price: 5,
    description: {
      en: "Plan your quarter with linked goals, projects, and tasks. Track progress automatically, prioritize daily work, and reflect in a built-in journal with mood tracking. Four connected databases on one dashboard.",
      ru: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435 \u043A\u0432\u0430\u0440\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043B\u0438 \u0441 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438 \u0438 \u0437\u0430\u0434\u0430\u0447\u0430\u043C\u0438 \u2014 \u0432\u0441\u0451 \u0432 \u043E\u0434\u043D\u043E\u043C \u0434\u0430\u0448\u0431\u043E\u0440\u0434\u0435. \u0424\u043E\u043A\u0443\u0441 \u0434\u043D\u044F, \u0438\u043D\u0431\u043E\u043A\u0441 \u0437\u0430\u0434\u0430\u0447, \u0442\u0430\u0439\u043C\u043B\u0430\u0439\u043D, \u043A\u0430\u043D\u0431\u0430\u043D \u0438 \u0434\u043D\u0435\u0432\u043D\u0438\u043A \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u044F."
    },
    category: { en: "Planning & Goals", ru: "\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0446\u0435\u043B\u0438" },
    categoryGroup: "personal-productivity",
    features: {
      en: [
        "4 connected databases: Goals, Projects, Tasks, Journal",
        "Three-level hierarchy: Goals \u2192 Projects \u2192 Tasks",
        "Automatic progress tracking \u2014 rolls up from tasks to goals",
        "Daily Focus view \u2014 today's tasks grouped by priority",
        "Task Inbox for undated tasks",
        "Project timeline and kanban boards",
        "Daily journal with mood tracking and calendar views",
        "Dashboard homepage with Quick Start guide"
      ],
      ru: [
        "4 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0431\u0430\u0437\u044B: \u0426\u0435\u043B\u0438, \u041F\u0440\u043E\u0435\u043A\u0442\u044B, \u0417\u0430\u0434\u0430\u0447\u0438, \u0414\u043D\u0435\u0432\u043D\u0438\u043A",
        "\u0422\u0440\u0451\u0445\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u0430\u044F \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u044F: \u0426\u0435\u043B\u0438 \u2192 \u041F\u0440\u043E\u0435\u043A\u0442\u044B \u2192 \u0417\u0430\u0434\u0430\u0447\u0438",
        "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u043E\u0442 \u0437\u0430\u0434\u0430\u0447 \u043A \u0446\u0435\u043B\u044F\u043C",
        "\u0424\u043E\u043A\u0443\u0441 \u0434\u043D\u044F \u2014 \u0437\u0430\u0434\u0430\u0447\u0438 \u043D\u0430 \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u043F\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u0443",
        "Inbox \u0434\u043B\u044F \u0437\u0430\u0434\u0430\u0447 \u0431\u0435\u0437 \u0434\u0430\u0442\u044B",
        "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0438 \u043A\u0430\u043D\u0431\u0430\u043D-\u0434\u043E\u0441\u043A\u0438",
        "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u044F \u0441 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u0451\u043C",
        "\u0414\u0430\u0448\u0431\u043E\u0440\u0434 \u0441 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E\u043C Quick Start"
      ]
    },
    icon: "Target",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  }
];
var freeTemplatesData = [
  {
    id: "6e55eeb1-0db5-42f4-ac5c-d6c178075607",
    name: "Customer Success",
    slug: "customer-success",
    price: 0,
    description: {
      en: "Standardize client onboarding, track health, prioritize accounts, and surface upsell opportunities. Operate from one hub with guided pages and a unified Client Onboarding database.",
      ru: "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u0432, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0434\u043E\u043F\u0440\u043E\u0434\u0430\u0436. \u0412\u0441\u0451 \u0432 \u043E\u0434\u043D\u043E\u043C \u0445\u0430\u0431\u0435."
    },
    category: { en: "Customer Journey", ru: "\u041F\u0443\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u0430" },
    categoryGroup: "operations",
    icon: "Heart",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20"
  },
  {
    id: "2b3d872b-594c-814b-b32b-0064da74cf22",
    name: "Consulting: Consultation Hours",
    slug: "consulting-consultation-hours",
    price: 0,
    description: {
      en: "Log every consulting session with clients, track hours, rates, payments, and outcomes. See who owes what, when the next session is, and how many package hours remain.",
      ru: "\u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u0443\u044E \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0447\u0430\u0441\u044B, \u0441\u0442\u0430\u0432\u043A\u0438, \u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B. \u0412\u0438\u0434\u0438\u0442\u0435, \u043A\u0442\u043E \u0434\u043E\u043B\u0436\u0435\u043D, \u043A\u043E\u0433\u0434\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0447\u0430\u0441\u043E\u0432 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "Clock",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "free-ai-tools-tracker",
    name: "AI Tools Tracker",
    slug: "ai-tools-tracker",
    price: 0,
    description: {
      en: "System for organizing AI resources. Capture discoveries, compare features, track expenses. From scattered bookmarks to a curated intelligence hub that protects your budget.",
      ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0434\u043B\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0418\u0418-\u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432. \u0417\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435 \u043D\u0430\u0445\u043E\u0434\u043A\u0438, \u0441\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0440\u0430\u0441\u0445\u043E\u0434\u044B. \u041E\u0442 \u0440\u0430\u0437\u0431\u0440\u043E\u0441\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u043B\u0430\u0434\u043E\u043A \u043A \u043A\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u043C\u0443 \u0445\u0430\u0431\u0443."
    },
    category: { en: "Product", ru: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442" },
    categoryGroup: "product",
    icon: "Bot",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20"
  },
  {
    id: "free-hypothesis-testing",
    name: "Hypothesis Testing",
    slug: "hypothesis-testing",
    price: 0,
    description: {
      en: "System for experiment management. Formulate hypotheses, prioritize ideas, track results. From chaotic spreadsheets and chats to data-driven product growth based on verified insights.",
      ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u044D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u0430\u043C\u0438. \u0424\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u0443\u0439\u0442\u0435 \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u044B, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0438\u0434\u0435\u0438, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B. \u041E\u0442 \u0445\u0430\u043E\u0441\u0430 \u043A data-driven \u0440\u043E\u0441\u0442\u0443."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "FlaskConical",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20"
  },
  {
    id: "free-product-market-fit",
    name: "Product-Market Fit",
    slug: "product-market-fit",
    price: 0,
    description: {
      en: "Track key metrics, map their dependencies, and test growth hypotheses. From scattered spreadsheets and data chaos to complete clarity on your product's health.",
      ru: "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438, \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0439\u0442\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u0442\u0435\u0441\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u044B \u0440\u043E\u0441\u0442\u0430. \u041E\u0442 \u0440\u0430\u0437\u0431\u0440\u043E\u0441\u0430\u043D\u043D\u044B\u0445 \u0442\u0430\u0431\u043B\u0438\u0446 \u043A \u043F\u043E\u043B\u043D\u043E\u0439 \u044F\u0441\u043D\u043E\u0441\u0442\u0438 \u043E \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430."
    },
    category: { en: "Planning & Goals", ru: "\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0446\u0435\u043B\u0438" },
    categoryGroup: "product",
    icon: "TrendingUp",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20"
  },
  {
    id: "free-suppliers-database",
    name: "Suppliers Database",
    slug: "suppliers-database-01",
    price: 0,
    description: {
      en: "Keep every supplier in one place \u2014 contacts, contracts, ratings, and order history. Compare alternatives, track payment terms, and never lose a vendor's details again.",
      ru: "\u0414\u0435\u0440\u0436\u0438\u0442\u0435 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430 \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435 \u2014 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B, \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B, \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0438 \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432. \u0421\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u044B \u0438 \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0442\u0435\u0440\u044F\u0439\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u043E\u0432."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "free-time-off-tracking",
    name: "Time Off and Sick Leave Tracking",
    slug: "time-off-and-sick-leave-tracking",
    price: 0,
    description: {
      en: "Plan schedules, assign deputies, avoid conflicts. From staffing surprises to seamless continuity with a built-in team absence management system.",
      ru: "\u041F\u043B\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0438, \u043D\u0430\u0437\u043D\u0430\u0447\u0430\u0439\u0442\u0435 \u0437\u0430\u043C\u0435\u0441\u0442\u0438\u0442\u0435\u043B\u0435\u0439, \u0438\u0437\u0431\u0435\u0433\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432. \u041E\u0442 \u043A\u0430\u0434\u0440\u043E\u0432\u044B\u0445 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432 \u043A \u0431\u0435\u0441\u043F\u0435\u0440\u0435\u0431\u043E\u0439\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "CalendarOff",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20"
  },
  {
    id: "free-accounts-receivable",
    name: "Accounts Receivable Tracking",
    slug: "accounts-receivable-tracking",
    price: 0,
    description: {
      en: "Track every outstanding debt from first invoice to final payment. See who owes what, how long it's overdue, and where to focus your collection efforts \u2014 all in one structured hub.",
      ru: "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u0443\u044E \u0437\u0430\u0434\u043E\u043B\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043E\u0442 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0438\u043D\u0432\u043E\u0439\u0441\u0430 \u0434\u043E \u0444\u0438\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u043F\u043B\u0430\u0442\u044B. \u0412\u0438\u0434\u0438\u0442\u0435, \u043A\u0442\u043E \u0434\u043E\u043B\u0436\u0435\u043D, \u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E \u0438 \u043D\u0430 \u0447\u0451\u043C \u0441\u0444\u043E\u043A\u0443\u0441\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "finance",
    icon: "Receipt",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20"
  },
  {
    id: "free-sales-scripts",
    name: "Sales Scripts",
    slug: "sales-scripts",
    price: 0,
    description: {
      en: "Your team's playbook for every sales conversation \u2014 from cold calls to closing deals. Store scripts, track what works, and give every rep the words that win.",
      ru: "\u041F\u043B\u044D\u0439\u0431\u0443\u043A \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0430 \u2014 \u043E\u0442 \u0445\u043E\u043B\u043E\u0434\u043D\u044B\u0445 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0434\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \u0441\u0434\u0435\u043B\u043E\u043A. \u0425\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u044B \u0438 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435, \u0447\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "marketing",
    icon: "MessageSquareText",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20"
  },
  {
    id: "free-product-backlog",
    name: "Product Backlog",
    slug: "product-backlog-571",
    price: 0,
    description: {
      en: "Turn scattered feature requests into a prioritized roadmap. Score ideas with RICE, track sprints, assign teams, and ship what matters \u2014 all in one structured backlog.",
      ru: "\u041F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u0442\u0435 \u0440\u0430\u0437\u0431\u0440\u043E\u0441\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0432 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0440\u043E\u0430\u0434\u043C\u0430\u043F. \u041E\u0446\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u0438\u0434\u0435\u0438 \u0447\u0435\u0440\u0435\u0437 RICE, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u043F\u0440\u0438\u043D\u0442\u044B \u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0442\u043E, \u0447\u0442\u043E \u0432\u0430\u0436\u043D\u043E."
    },
    category: { en: "Product", ru: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442" },
    categoryGroup: "product",
    icon: "ListTodo",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "free-meal-planner",
    name: "Meal Planner",
    slug: "meal-planner-149",
    price: 0,
    description: {
      en: `Save recipes, plan weekly menus, and track meal variety. From the eternal "what's for dinner" question to stress-free cooking and fewer takeout orders.`,
      ru: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0439\u0442\u0435 \u0440\u0435\u0446\u0435\u043F\u0442\u044B, \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0438 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0440\u0430\u0437\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u0438\u0435. \u041E\u0442 \u0432\u0435\u0447\u043D\u043E\u0433\u043E \xAB\u0447\u0442\u043E \u043D\u0430 \u0443\u0436\u0438\u043D\xBB \u043A \u0433\u043E\u0442\u043E\u0432\u043A\u0435 \u0431\u0435\u0437 \u0441\u0442\u0440\u0435\u0441\u0441\u0430."
    },
    category: { en: "Health & Fitness", ru: "\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435" },
    categoryGroup: "health",
    icon: "UtensilsCrossed",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20"
  },
  {
    id: "free-editorial-calendar",
    name: "Editorial Calendar",
    slug: "editorial-calendar-794",
    price: 0,
    description: {
      en: "Capture ideas, schedule posts, manage editorial balance. From deadline panic to strategic posting with a built-in content planning system.",
      ru: "\u0417\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435 \u0438\u0434\u0435\u0438, \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u043F\u043E\u0441\u0442\u044B, \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0440\u0435\u0434\u0430\u043A\u0446\u0438\u043E\u043D\u043D\u044B\u043C \u0431\u0430\u043B\u0430\u043D\u0441\u043E\u043C. \u041E\u0442 \u043F\u0430\u043D\u0438\u043A\u0438 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u043E\u0432 \u043A \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E."
    },
    category: { en: "Social Media Planner", ru: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D" },
    categoryGroup: "marketing",
    icon: "CalendarDays",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20"
  },
  {
    id: "free-team-time-tracking",
    name: "Team Time Tracking",
    slug: "team-time-tracking",
    price: 0,
    description: {
      en: "Log hours, track workload, calculate project budgets. From spreadsheet chaos and guesswork to transparent, data-driven leadership with team resource management.",
      ru: "\u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0442\u0435 \u0447\u0430\u0441\u044B, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0443, \u0441\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u0431\u044E\u0434\u0436\u0435\u0442\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432. \u041E\u0442 \u0442\u0430\u0431\u043B\u0438\u0446 \u0438 \u0434\u043E\u0433\u0430\u0434\u043E\u043A \u043A \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u043C\u0443 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044E \u0440\u0435\u0441\u0443\u0440\u0441\u0430\u043C\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u044B."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20"
  },
  {
    id: "free-courses-modules",
    name: "Courses: Modules and Lessons",
    slug: "courses-modules-and-lessons",
    price: 0,
    description: {
      en: "Structure your online course from modules to individual lessons. Track content readiness, assign instructors, link lessons in sequence, and monitor student completion rates.",
      ru: "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u0443\u0440\u0441 \u043E\u0442 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \u0434\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0443\u0440\u043E\u043A\u043E\u0432. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430, \u043D\u0430\u0437\u043D\u0430\u0447\u0430\u0439\u0442\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u043E\u0432 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0439\u0442\u0435 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432."
    },
    category: { en: "Teaching", ru: "\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435" },
    categoryGroup: "teaching",
    icon: "GraduationCap",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20"
  },
  {
    id: "free-objection-database",
    name: "Objection Database",
    slug: "objection-database",
    price: 0,
    description: {
      en: "Equip your sales team with proven scripts for every customer objection. Categorize by type and funnel stage, track conversion rates, and train new reps faster with real dialogue examples.",
      ru: "\u041E\u0441\u043D\u0430\u0441\u0442\u0438\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u043F\u0440\u043E\u0434\u0430\u0436 \u0441\u043A\u0440\u0438\u043F\u0442\u0430\u043C\u0438 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0432\u043E\u0437\u0440\u0430\u0436\u0435\u043D\u0438\u044F. \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438 \u0438 \u043E\u0431\u0443\u0447\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u044B\u0445 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u043D\u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0438\u043C\u0435\u0440\u0430\u0445."
    },
    category: { en: "Marketing", ru: "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433" },
    categoryGroup: "marketing",
    icon: "Shield",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "free-beauty-salon",
    name: "Beauty Salon: Client Booking",
    slug: "beauty-salon-client-booking",
    price: 0,
    description: {
      en: "Manage every salon appointment from booking to payment. Track specialists, services, materials, client history, prepayments, bonus points, cancellations, and before/after photos.",
      ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u044C\u044E \u043E\u0442 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043E \u043E\u043F\u043B\u0430\u0442\u044B. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432, \u0443\u0441\u043B\u0443\u0433\u0438, \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u043F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0442\u044B \u0438 \u0444\u043E\u0442\u043E\u0434\u043E/\u043F\u043E\u0441\u043B\u0435."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20"
  },
  {
    id: "free-referral-program",
    name: "Referral Program",
    slug: "suppliers-database",
    price: 0,
    description: {
      en: "Track every referral from registration to purchase. Monitor referrer performance, reward payouts, conversion rates, and referral quality \u2014 to grow your customer base through word of mouth.",
      ru: "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u0443\u044E \u0440\u0435\u0444\u0435\u0440\u0430\u043B\u044C\u043D\u0443\u044E \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u0434\u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0438. \u041C\u043E\u043D\u0438\u0442\u043E\u0440\u044C\u0442\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C, \u0432\u044B\u043F\u043B\u0430\u0442\u044B, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438 \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u0444\u0435\u0440\u0430\u043B\u043E\u0432."
    },
    category: { en: "Marketing", ru: "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433" },
    categoryGroup: "marketing",
    icon: "Users",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20"
  },
  {
    id: "free-returns-refunds",
    name: "Returns & Refunds",
    slug: "returns-refunds",
    price: 0,
    description: {
      en: "Turn returns from a headache into actionable data. Track every refund request, analyze reasons, spot problematic items and customers \u2014 and reduce return rates with clear insights.",
      ru: "\u041F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u044B \u0438\u0437 \u0433\u043E\u043B\u043E\u0432\u043D\u043E\u0439 \u0431\u043E\u043B\u0438 \u0432 \u0434\u0430\u043D\u043D\u044B\u0435. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441, \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u043F\u0440\u0438\u0447\u0438\u043D\u044B \u0438 \u0441\u043D\u0438\u0436\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0446\u0435\u043D\u0442 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043E\u0432."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "RotateCcw",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20"
  },
  {
    id: "free-quality-control",
    name: "Quality Control",
    slug: "quality-control",
    price: 0,
    description: {
      en: "Log every quality inspection from incoming materials to customer complaints. Track defect rates, root causes, corrective actions, and financial losses \u2014 so quality issues never repeat.",
      ru: "\u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u0443\u044E \u0438\u043D\u0441\u043F\u0435\u043A\u0446\u0438\u044E \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432, \u043A\u043E\u0440\u043D\u0435\u0432\u044B\u0435 \u043F\u0440\u0438\u0447\u0438\u043D\u044B, \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u0443\u044E\u0449\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u043F\u043E\u0442\u0435\u0440\u0438."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "CheckCircle",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "free-idea-bank",
    name: "Idea Bank",
    slug: "idea-bank-959",
    price: 0,
    description: {
      en: "Capture, evaluate, and develop ideas from spark to implementation. Score each idea by potential, urgency, and resources needed \u2014 then track status, next steps, and outcomes.",
      ru: "\u0417\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435, \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u0438 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0439\u0442\u0435 \u0438\u0434\u0435\u0438 \u043E\u0442 \u0438\u0441\u043A\u0440\u044B \u0434\u043E \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438. \u041E\u0446\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u043F\u043E \u043F\u043E\u0442\u0435\u043D\u0446\u0438\u0430\u043B\u0443, \u0441\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u0438 \u0438 \u0440\u0435\u0441\u0443\u0440\u0441\u0430\u043C \u2014 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B."
    },
    category: { en: "Personal Productivity", ru: "\u041B\u0438\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C" },
    categoryGroup: "personal-productivity",
    icon: "Lightbulb",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20"
  },
  {
    id: "free-customer-segmentation",
    name: "Customer Segmentation",
    slug: "customer-segmentation",
    price: 0,
    description: {
      en: "Segment your customers by value, behavior, and engagement using RFM analysis, tier classification, and churn risk tracking. See exactly who drives your revenue \u2014 and who needs attention.",
      ru: "\u0421\u0435\u0433\u043C\u0435\u043D\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u043F\u043E \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438, \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044E \u0438 \u0432\u043E\u0432\u043B\u0435\u0447\u0451\u043D\u043D\u043E\u0441\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 RFM-\u0430\u043D\u0430\u043B\u0438\u0437, \u043A\u043B\u0430\u0441\u0441\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E \u043F\u043E \u0442\u0438\u0440\u0430\u043C \u0438 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0440\u0438\u0441\u043A\u0430 \u043E\u0442\u0442\u043E\u043A\u0430."
    },
    category: { en: "Marketing", ru: "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433" },
    categoryGroup: "marketing",
    icon: "PieChart",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20"
  },
  {
    id: "free-invoice-tracker",
    name: "Invoice Tracker",
    slug: "invoice-tracker-615",
    price: 0,
    description: {
      en: "Track every invoice from draft to payment. See what's outstanding, what's overdue, and what's been paid \u2014 with dedicated views for clients, projects, reminders, and quarterly reports.",
      ru: "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u043D\u0432\u043E\u0439\u0441 \u043E\u0442 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430 \u0434\u043E \u043E\u043F\u043B\u0430\u0442\u044B. \u0412\u0438\u0434\u0438\u0442\u0435 \u0434\u0435\u0431\u0438\u0442\u043E\u0440\u043A\u0443, \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u043A\u0443 \u0438 \u043E\u043F\u043B\u0430\u0442\u044B \u2014 \u0441 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u0432\u0438\u0434\u0430\u043C\u0438 \u043F\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C, \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C \u0438 \u043E\u0442\u0447\u0451\u0442\u0430\u043C."
    },
    category: { en: "Personal Finance", ru: "\u041B\u0438\u0447\u043D\u044B\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u044B" },
    categoryGroup: "finance",
    icon: "FileText",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20"
  },
  {
    id: "free-support-service",
    name: "Support Service (Tickets)",
    slug: "support-service-tickets",
    price: 0,
    description: {
      en: "Turn every customer request into a trackable ticket with built-in SLA monitoring, multi-channel intake, escalation workflows, and satisfaction scoring \u2014 so nothing slips through the cracks.",
      ru: "\u041F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u0442\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u0432 \u0442\u0438\u043A\u0435\u0442 \u0441 SLA-\u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433\u043E\u043C, \u043C\u043D\u043E\u0433\u043E\u043A\u0430\u043D\u0430\u043B\u044C\u043D\u044B\u043C \u043F\u0440\u0438\u0451\u043C\u043E\u043C, \u044D\u0441\u043A\u0430\u043B\u0430\u0446\u0438\u044F\u043C\u0438 \u0438 \u043E\u0446\u0435\u043D\u043A\u043E\u0439 \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0451\u043D\u043D\u043E\u0441\u0442\u0438."
    },
    category: { en: "Operations", ru: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" },
    categoryGroup: "operations",
    icon: "Headphones",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20"
  },
  {
    id: "free-simple-tasks",
    name: "Simple Tasks",
    slug: "simple-tasks-n",
    price: 0,
    description: {
      en: "Ideal for freelancers and managers struggling with routine. Use for daily planning of work tasks or personal projects.",
      ru: "\u0418\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0444\u0440\u0438\u043B\u0430\u043D\u0441\u0435\u0440\u043E\u0432 \u0438 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u043E\u0432. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0434\u043B\u044F \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0437\u0430\u0434\u0430\u0447 \u0438\u043B\u0438 \u043B\u0438\u0447\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432."
    },
    category: { en: "Personal Productivity", ru: "\u041B\u0438\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C" },
    categoryGroup: "personal-productivity",
    icon: "CheckSquare",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20"
  },
  {
    id: "free-knowledge-base",
    name: "Knowledge Base (Second Brain)",
    slug: "knowledge-base-second-brain",
    price: 0,
    description: {
      en: "Capture every insight, article, quote, and instruction \u2014 tag it, link it, and find it when it matters. Your thinking, finally organized.",
      ru: "\u0417\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435 \u043A\u0430\u0436\u0434\u0443\u044E \u0438\u0434\u0435\u044E, \u0441\u0442\u0430\u0442\u044C\u044E, \u0446\u0438\u0442\u0430\u0442\u0443 \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u2014 \u0442\u0435\u0433\u0438\u0440\u0443\u0439\u0442\u0435, \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0438 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0435, \u043A\u043E\u0433\u0434\u0430 \u043D\u0443\u0436\u043D\u043E. \u0412\u0430\u0448\u0435 \u043C\u044B\u0448\u043B\u0435\u043D\u0438\u0435, \u043D\u0430\u043A\u043E\u043D\u0435\u0446 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043D\u043E."
    },
    category: { en: "Personal Productivity", ru: "\u041B\u0438\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C" },
    categoryGroup: "personal-productivity",
    icon: "BookOpen",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20"
  },
  {
    id: "41550e87-8de8-4a9f-baf7-5c03a2f2988f",
    name: "Manager's Weekly Planner",
    slug: "manager-s-weekly-planner",
    price: 35,
    description: {
      en: "Set clear weekly goals, break them into daily tasks with priorities, delegate work to your team, and run structured retrospectives \u2014 so you can spot what works, fix what doesn't, and repeat your best weeks.",
      ru: "Set clear weekly goals, break them into daily tasks with priorities, delegate work to your team, and run structured retrospectives \u2014 so you can spot what works, fix what doesn't, and repeat your best weeks."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Target",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/manager-s-weekly-planner"
  },
  {
    id: "58228156-8f5f-483b-9b1a-7a60917ccac1",
    name: "Site Inspection Tracker",
    slug: "site-inspection-tracker",
    price: 39,
    description: {
      en: "Track site supervision from planning to closeout in one connected workspace. Manage sites, stages, work items, inspections, issues, and corrective actions so every finding has context, ownership, and follow-up",
      ru: "Track site supervision from planning to closeout in one connected workspace. Manage sites, stages, work items, inspections, issues, and corrective actions so every finding has context, ownership, and follow-up"
    },
    category: { en: "Standard Operating Procedure (SOP)", ru: "Standard Operating Procedure (SOP)" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/site-inspection-tracker"
  },
  {
    id: "5267356f-67c0-4a83-a5f1-ad12a84b5ec7",
    name: "Investments OS",
    slug: "investments-os",
    price: 49,
    description: {
      en: "Track every asset, transaction, and dividend in one place. Set financial goals, monitor savings progress, and reflect on your investment decisions with a built-in journal \u2014 so your portfolio finally feels organized and intentional.",
      ru: "Track every asset, transaction, and dividend in one place. Set financial goals, monitor savings progress, and reflect on your investment decisions with a built-in journal \u2014 so your portfolio finally feels organized and intentional."
    },
    category: { en: "Investing", ru: "Investing" },
    categoryGroup: "finance",
    icon: "TrendingUp",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/investments-os"
  },
  {
    id: "0bf09185-b1f4-4a44-b52e-5706d11e8f6a",
    name: "Corporate Knowledge Base",
    slug: "corporate-knowledge-base",
    price: 65,
    description: {
      en: "Turn scattered company knowledge into a structured, searchable library. Organize documents by topics and departments, track their lifecycle from draft to published, pin what matters most, and give your team instant answers through a built-in FAQ with priorities.",
      ru: "Turn scattered company knowledge into a structured, searchable library. Organize documents by topics and departments, track their lifecycle from draft to published, pin what matters most, and give your team instant answers through a built-in FAQ with priorities."
    },
    category: { en: "Knowledge Base", ru: "Knowledge Base" },
    categoryGroup: "operations",
    icon: "Brain",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/corporate-knowledge-base"
  },
  {
    id: "e22c5c42-5831-40b9-a8e1-e8ddb64f9e74",
    name: "Goals Tracker",
    slug: "goals-os-466",
    price: 10,
    description: {
      en: "Set ambitious goals, break them into measurable key results, and launch initiatives on a visual roadmap \u2014 all linked by the OKR framework. Track progress from draft to done across quarters.",
      ru: "Set ambitious goals, break them into measurable key results, and launch initiatives on a visual roadmap \u2014 all linked by the OKR framework. Track progress from draft to done across quarters."
    },
    category: { en: "Planning & Goals", ru: "Planning & Goals" },
    categoryGroup: "personal-productivity",
    icon: "Target",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/goals-os-466"
  },
  {
    id: "78560f29-aba3-44ec-8b64-2ec48ad1caf1",
    name: "SEO OS",
    slug: "seo-os",
    price: 50,
    description: {
      en: "Track keywords by position, manage content from idea to publish, fix technical issues by severity, and build links with a donor pipeline \u2014 all connected in one system. One source of truth instead of scattered spreadsheets",
      ru: "Track keywords by position, manage content from idea to publish, fix technical issues by severity, and build links with a donor pipeline \u2014 all connected in one system. One source of truth instead of scattered spreadsheets"
    },
    category: { en: "SEO", ru: "SEO" },
    categoryGroup: "marketing",
    icon: "Search",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/seo-os"
  },
  {
    id: "900ae4a4-ec45-439d-8df6-755ec09d2ec7",
    name: "Company OS",
    slug: "company-os-468",
    price: 149,
    description: {
      en: "Run your entire company from one connected workspace. Manage tasks and projects, track quarterly goals, organize meetings, maintain a knowledge base, and keep your team aligned \u2014 everything linked and ready to use.",
      ru: "Run your entire company from one connected workspace. Manage tasks and projects, track quarterly goals, organize meetings, maintain a knowledge base, and keep your team aligned \u2014 everything linked and ready to use."
    },
    category: { en: "Company Home Page", ru: "Company Home Page" },
    categoryGroup: "operations",
    icon: "Building2",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/company-os-468"
  },
  {
    id: "ed9c3243-48d5-4ad7-be45-5e38c455e97f",
    name: "Book Writing Planner",
    slug: "book-writing-planner",
    price: 29,
    description: {
      en: "Plan your book from first idea to final chapter. Organize manuscripts into chapters and scenes, build a cast of characters with roles and archetypes, create a world encyclopedia of locations, elements, history and magic \u2014 and track every writing session with word count goals and ",
      ru: "Plan your book from first idea to final chapter. Organize manuscripts into chapters and scenes, build a cast of characters with roles and archetypes, create a world encyclopedia of locations, elements, history and magic \u2014 and track every writing session with word count goals and "
    },
    category: { en: "Hobbies", ru: "Hobbies" },
    categoryGroup: "personal-productivity",
    icon: "Target",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/book-writing-planner"
  },
  {
    id: "c6301b54-be7a-4b54-a557-c4d2eb752e08",
    name: "Book List",
    slug: "book-list-300",
    price: 0,
    description: {
      en: "Build your personal reading system: track what you read, capture key ideas and quotes, rate books, and see which insights you've actually applied in practice.",
      ru: "Build your personal reading system: track what you read, capture key ideas and quotes, rate books, and see which insights you've actually applied in practice."
    },
    category: { en: "Personal Productivity", ru: "Personal Productivity" },
    categoryGroup: "personal-productivity",
    icon: "BookOpen",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/book-list-300"
  },
  {
    id: "cdd57b95-2309-425a-becd-dde4c0196771",
    name: "Investors Relations",
    slug: "investors-relations",
    price: 0,
    description: {
      en: "Lost track of an investor for 3 months? Investor database with mood tracking, update calendar, and cap table. See who's concerned, who's ready for follow-on, and whose commitments are overdue \u2014 in 30 seconds instead of an hour in Excel.",
      ru: "Lost track of an investor for 3 months? Investor database with mood tracking, update calendar, and cap table. See who's concerned, who's ready for follow-on, and whose commitments are overdue \u2014 in 30 seconds instead of an hour in Excel."
    },
    category: { en: "Investing", ru: "Investing" },
    categoryGroup: "finance",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/investors-relations"
  },
  {
    id: "b62bd21f-8ff3-433a-8f29-505554d2a2f3",
    name: "Post\u2011Mortem (Project Review)",
    slug: "post-mortem-project-review",
    price: 0,
    description: {
      en: "System for Project Retrospectives. Identify root causes, link recurring issues, assign action items. From repeating the same mistakes to continuous team improvement.",
      ru: "System for Project Retrospectives. Identify root causes, link recurring issues, assign action items. From repeating the same mistakes to continuous team improvement."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/post-mortem-project-review"
  },
  {
    id: "794681ad-a8f8-4af6-977a-67e397a1d26b",
    name: "Lead Magnet Funnel",
    slug: "lead-magnet-funnel",
    price: 0,
    description: {
      en: "Plan, launch, and measure every lead magnet in your funnel. Track subscriptions, email sequences, conversion rates, and revenue \u2014 so you double down on what actually brings customers.",
      ru: "Plan, launch, and measure every lead magnet in your funnel. Track subscriptions, email sequences, conversion rates, and revenue \u2014 so you double down on what actually brings customers."
    },
    category: { en: "Marketing", ru: "Marketing" },
    categoryGroup: "marketing",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/lead-magnet-funnel"
  },
  {
    id: "f05b5180-7016-460a-b326-d3f0d74b8d25",
    name: "Daily To-Do List",
    slug: "daily-to-do-list-204",
    price: 0,
    description: {
      en: "Capture and organize daily tasks with priority, energy level, context tags, and time estimates. Mark what's for today, track status from start to done, and keep your day focused and realistic.",
      ru: "Capture and organize daily tasks with priority, energy level, context tags, and time estimates. Mark what's for today, track status from start to done, and keep your day focused and realistic."
    },
    category: { en: "Personal Productivity", ru: "Personal Productivity" },
    categoryGroup: "personal-productivity",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/daily-to-do-list-204"
  },
  {
    id: "e1d2fd62-1348-4a00-9b6a-8822c8f8efca",
    name: "Learning Tracker",
    slug: "learning-tracker-327",
    price: 0,
    description: {
      en: "Organize all your courses and learning programs in one place. Track progress, lessons completed, platforms, costs, ratings, and certificates \u2014 so you always know what to learn next and how far you've come.",
      ru: "Organize all your courses and learning programs in one place. Track progress, lessons completed, platforms, costs, ratings, and certificates \u2014 so you always know what to learn next and how far you've come."
    },
    category: { en: "Study Planner", ru: "Study Planner" },
    categoryGroup: "teaching",
    icon: "Timer",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/learning-tracker-327"
  },
  {
    id: "d3b5aed8-f869-4be7-8deb-1104c523d8dc",
    name: "SWOT Analysis",
    slug: "swot-analysis-386",
    price: 0,
    description: {
      en: "System for strategic planning. Collect factors, analyze connections, build an action plan. From chaotic notes on a whiteboard to a clear business development map",
      ru: "System for strategic planning. Collect factors, analyze connections, build an action plan. From chaotic notes on a whiteboard to a clear business development map"
    },
    category: { en: "SWOT Analysis", ru: "SWOT Analysis" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/swot-analysis-386"
  },
  {
    id: "563b5038-d84a-45f2-a49e-c4f7a5d65ff0",
    name: "AI Prompt Base",
    slug: "prompts-database-134",
    price: 0,
    description: {
      en: "System for AI knowledge management. Capture successful prompts, organize by model, retrieve via smart tags. From losing context in endless chat history to building a personal library of proven AI assets",
      ru: "System for AI knowledge management. Capture successful prompts, organize by model, retrieve via smart tags. From losing context in endless chat history to building a personal library of proven AI assets"
    },
    category: { en: "Product", ru: "Product" },
    categoryGroup: "product",
    icon: "Bot",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/prompts-database-134"
  },
  {
    id: "4fa5dc1d-146f-4ad3-b2de-4da9a210c6d4",
    name: "Content Strategy",
    slug: "content-strategy-416",
    price: 0,
    description: {
      en: "System for tracking content performance. Manage assets from idea to revenue, link related posts, and identify top performers. From random posting to a data-driven media machine",
      ru: "System for tracking content performance. Manage assets from idea to revenue, link related posts, and identify top performers. From random posting to a data-driven media machine"
    },
    category: { en: "Marketing", ru: "Marketing" },
    categoryGroup: "marketing",
    icon: "CalendarDays",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/content-strategy-416"
  },
  {
    id: "ed2080f0-9f3c-4b04-8085-1e33646c7c1c",
    name: "Equipment Inventory",
    slug: "equipment-inventory-475",
    price: 0,
    description: {
      en: "Track every piece of equipment from purchase to decommission. Monitor condition, schedule maintenance, log repairs, and know exactly where each asset is and who owns it.",
      ru: "Track every piece of equipment from purchase to decommission. Monitor condition, schedule maintenance, log repairs, and know exactly where each asset is and who owns it."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/equipment-inventory-475"
  },
  {
    id: "97c36db2-34a5-4161-b423-3efb059ee3f2",
    name: "Team Knowledge Base",
    slug: "team-knowledge-base",
    price: 0,
    description: {
      en: "System for information management. Structure experience, link instructions, find answers. From knowledge loss during turnover and endless chat questions to an autonomous team workflow",
      ru: "System for information management. Structure experience, link instructions, find answers. From knowledge loss during turnover and endless chat questions to an autonomous team workflow"
    },
    category: { en: "Team Planning", ru: "Team Planning" },
    categoryGroup: "operations",
    icon: "Brain",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/team-knowledge-base"
  },
  {
    id: "a5ec2ffc-8a93-4199-a1e7-88cf8055a9df",
    name: "Lecture Notes",
    slug: "lecture-notes-146",
    price: 0,
    description: {
      en: "A system for knowledge management. Capture lectures, link related topics, and track study progress. From scattered notebooks and files to structured, stress-free preparation",
      ru: "A system for knowledge management. Capture lectures, link related topics, and track study progress. From scattered notebooks and files to structured, stress-free preparation"
    },
    category: { en: "Student Life", ru: "Student Life" },
    categoryGroup: "teaching",
    icon: "GraduationCap",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/lecture-notes-146"
  },
  {
    id: "1c5bc7af-0ee8-4796-bdae-ae1d0b903203",
    name: "Loan and Borrowing Tracker",
    slug: "loan-and-borrowing-tracker",
    price: 0,
    description: {
      en: "Keep every loan, installment, and credit card in one place. Track balances, payment schedules, interest rates, and repayment progress \u2014 so you always know what you owe and when.",
      ru: "Keep every loan, installment, and credit card in one place. Track balances, payment schedules, interest rates, and repayment progress \u2014 so you always know what you owe and when."
    },
    category: { en: "Personal Finance", ru: "Personal Finance" },
    categoryGroup: "finance",
    icon: "Receipt",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/loan-and-borrowing-tracker"
  },
  {
    id: "0b1f642a-817b-4a1f-8865-b0607d1db419",
    name: "Subscriber Database (Segmentation)",
    slug: "subscriber-database-segmentation",
    price: 0,
    description: {
      en: "Segment your subscriber base by engagement, funnel stage, interests, and loyalty score. Track customer status, acquisition sources, and activity \u2014 so you send the right message to the right person.",
      ru: "Segment your subscriber base by engagement, funnel stage, interests, and loyalty score. Track customer status, acquisition sources, and activity \u2014 so you send the right message to the right person."
    },
    category: { en: "Marketing", ru: "Marketing" },
    categoryGroup: "marketing",
    icon: "Users",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/subscriber-database-segmentation"
  },
  {
    id: "2088452b-28ee-4ffb-8935-cc3b882a63a3",
    name: "Contractors Database",
    slug: "contractors-database",
    price: 0,
    description: {
      en: "Build a structured database of freelancers and contractors with ratings, work quality, turnaround speed, and collaboration history. Find the right person for any project in seconds \u2014 based on real past results.",
      ru: "Build a structured database of freelancers and contractors with ratings, work quality, turnaround speed, and collaboration history. Find the right person for any project in seconds \u2014 based on real past results."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Briefcase",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/contractors-database"
  },
  {
    id: "e5a837e5-0b9e-4e7b-9636-01e6dd30e194",
    name: "Customer Development",
    slug: "customer-development",
    price: 0,
    description: {
      en: "Structure every customer interview with fields for hypotheses, problems, insights, quotes, and product reactions. Validate assumptions, track willingness to pay, and turn conversations into actionable product decisions.",
      ru: "Structure every customer interview with fields for hypotheses, problems, insights, quotes, and product reactions. Validate assumptions, track willingness to pay, and turn conversations into actionable product decisions."
    },
    category: { en: "Product", ru: "Product" },
    categoryGroup: "product",
    icon: "Heart",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/customer-development"
  },
  {
    id: "e382e57e-b2d4-4e8d-aeba-af77d93a6b25",
    name: "Change Log",
    slug: "change-log",
    price: 0,
    description: {
      en: "Forgot why you rolled back a feature three months ago? Changelog with change types, versions, before/after metrics, and critical changes. Find the bug history in 10 seconds instead of digging around in Slack",
      ru: "Forgot why you rolled back a feature three months ago? Changelog with change types, versions, before/after metrics, and critical changes. Find the bug history in 10 seconds instead of digging around in Slack"
    },
    category: { en: "Documentation", ru: "Documentation" },
    categoryGroup: "operations",
    icon: "RotateCcw",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/change-log"
  },
  {
    id: "557fefa2-1e36-474a-87cc-38ddeaf9021b",
    name: "Sprints (Agile/Scrum)",
    slug: "sprints-agile-scrum",
    price: 0,
    description: {
      en: "System for Agile development. Plan cycles, track velocity, conduct retrospectives. From missed deadlines and confusion to a predictable release rhythm",
      ru: "System for Agile development. Plan cycles, track velocity, conduct retrospectives. From missed deadlines and confusion to a predictable release rhythm"
    },
    category: { en: "Sprint Planning Meeting", ru: "Sprint Planning Meeting" },
    categoryGroup: "product",
    icon: "ListTodo",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/sprints-agile-scrum"
  },
  {
    id: "fdcbe4d8-9cd8-4466-ab30-c37631ff89f0",
    name: "Time Tracking",
    slug: "time-tracking-649",
    price: 0,
    description: {
      en: "System for time management. Track tasks, analyze productivity, calculate hourly costs. From lost days to full schedule control.",
      ru: "System for time management. Track tasks, analyze productivity, calculate hourly costs. From lost days to full schedule control."
    },
    category: { en: "Personal Productivity", ru: "Personal Productivity" },
    categoryGroup: "personal-productivity",
    icon: "Clock",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/time-tracking-649"
  },
  {
    id: "free-wellness-tracker-899",
    name: "Wellness Tracker",
    slug: "wellness-tracker-899",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/wellness-tracker-899"
  },
  {
    id: "free-lead-generation-858",
    name: "Lead Generation",
    slug: "lead-generation-858",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Users",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/lead-generation-858"
  },
  {
    id: "free-ad-campaign-tracker-962",
    name: "Ad Campaign Tracker",
    slug: "ad-campaign-tracker-962",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/ad-campaign-tracker-962"
  },
  {
    id: "free-sop-standard-operating-procedures",
    name: "SOP (Standard Operating Procedures)",
    slug: "sop-standard-operating-procedures",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "FileStack",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/sop-standard-operating-procedures"
  },
  {
    id: "free-client-database-temp",
    name: "Client Database",
    slug: "client-database-temp",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/client-database-temp"
  },
  {
    id: "free-p-l-profit-and-loss-statement",
    name: "P&L (Profit and Loss Statement)",
    slug: "p-l-profit-and-loss-statement",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/p-l-profit-and-loss-statement"
  },
  {
    id: "free-project-budget",
    name: "Project Budget",
    slug: "project-budget",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "PieChart",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/project-budget"
  },
  {
    id: "free-inventory-management-175",
    name: "Inventory Management",
    slug: "inventory-management-175",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/inventory-management-175"
  },
  {
    id: "free-sales-pipeline-800",
    name: "Sales Pipeline",
    slug: "sales-pipeline-800",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "MessageSquareText",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/sales-pipeline-800"
  },
  {
    id: "free-media-library-682",
    name: "Media Library",
    slug: "media-library-682",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarDays",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/media-library-682"
  },
  {
    id: "free-projects-dashboard-124",
    name: "Projects Dashboard",
    slug: "projects-dashboard-124",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "PieChart",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/projects-dashboard-124"
  },
  {
    id: "free-hiring-funnel",
    name: "Hiring Funnel",
    slug: "hiring-funnel",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/hiring-funnel"
  },
  {
    id: "free-weekly-reports",
    name: "Weekly Reports",
    slug: "weekly-reports",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarDays",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/weekly-reports"
  },
  {
    id: "free-partnerships-890",
    name: "Partnerships",
    slug: "partnerships-890",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/partnerships-890"
  },
  {
    id: "free-mvp-tracker",
    name: "MVP Tracker",
    slug: "mvp-tracker",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/mvp-tracker"
  },
  {
    id: "free-investment-tracker-585",
    name: "Investment Tracker",
    slug: "investment-tracker-585",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/investment-tracker-585"
  },
  {
    id: "free-employee-database",
    name: "Employee Database",
    slug: "employee-database",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/employee-database"
  },
  {
    id: "free-restaurant-menu-engineering",
    name: "Restaurant: Menu Engineering",
    slug: "restaurant-menu-engineering",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/restaurant-menu-engineering"
  },
  {
    id: "free-competitor-analysis-384",
    name: "Competitor Analysis",
    slug: "competitor-analysis-384",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/competitor-analysis-384"
  },
  {
    id: "free-shopping-tracker-527",
    name: "Shopping Tracker",
    slug: "shopping-tracker-527",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "ShoppingCart",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/shopping-tracker-527"
  },
  {
    id: "free-inventory-tracking-454",
    name: "Inventory Tracking",
    slug: "inventory-tracking-454",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/inventory-tracking-454"
  },
  {
    id: "free-project-risks",
    name: "Project Risks",
    slug: "project-risks",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "ListTodo",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/project-risks"
  },
  {
    id: "free-content-calendar-561",
    name: "Content Calendar",
    slug: "content-calendar-561",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarOff",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/content-calendar-561"
  },
  {
    id: "free-workout-tracker-854",
    name: "Workout Tracker",
    slug: "workout-tracker-854",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/workout-tracker-854"
  },
  {
    id: "free-workouts-os",
    name: "Workouts OS",
    slug: "workouts-os",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/workouts-os"
  },
  {
    id: "free-webinars-live-streams",
    name: "Webinars & Live Streams",
    slug: "webinars-live-streams",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/webinars-live-streams"
  },
  {
    id: "free-bug-tracker-342",
    name: "Bug Tracker",
    slug: "bug-tracker-342",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/bug-tracker-342"
  },
  {
    id: "free-1-on-1-meetings",
    name: "1-on-1 Meetings",
    slug: "1-on-1-meetings",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarDays",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/1-on-1-meetings"
  },
  {
    id: "free-fitness-memberships",
    name: "Fitness: Memberships",
    slug: "fitness-memberships",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Heart",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/fitness-memberships"
  },
  {
    id: "free-construction-estimates-acts",
    name: "Construction: Estimates & Acts",
    slug: "construction-estimates-acts",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/construction-estimates-acts"
  },
  {
    id: "free-carbon-footprint-tracker",
    name: "Carbon Footprint Tracker",
    slug: "carbon-footprint-tracker",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/carbon-footprint-tracker"
  },
  {
    id: "free-media-plan",
    name: "Media Plan",
    slug: "media-plan",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Target",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/media-plan"
  },
  {
    id: "free-cash-book",
    name: "Cash Book",
    slug: "cash-book",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/cash-book"
  },
  {
    id: "free-supply-tracker",
    name: "Supply Tracker",
    slug: "supply-tracker",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/supply-tracker"
  },
  {
    id: "free-testimonials-and-case-studies",
    name: "Testimonials and Case Studies",
    slug: "testimonials-and-case-studies",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "FlaskConical",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/testimonials-and-case-studies"
  },
  {
    id: "free-meeting-planner-514",
    name: "Meeting Planner",
    slug: "meeting-planner-514",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Target",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/meeting-planner-514"
  },
  {
    id: "free-travel-planner-234",
    name: "Travel Planner",
    slug: "travel-planner-234",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Target",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/travel-planner-234"
  },
  {
    id: "free-new-hire-onboarding-548",
    name: "New Hire Onboarding",
    slug: "new-hire-onboarding-548",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Users",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/new-hire-onboarding-548"
  },
  {
    id: "free-documents-tem-01",
    name: "Document Repository",
    slug: "documents-tem-01",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "FileStack",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/documents-tem-01"
  },
  {
    id: "free-income-and-expenses-tracker",
    name: "Income and Expenses Tracker",
    slug: "income-and-expenses-tracker",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/income-and-expenses-tracker"
  },
  {
    id: "free-cleaning-schedule-197",
    name: "Cleaning Schedule",
    slug: "cleaning-schedule-197",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarOff",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/cleaning-schedule-197"
  },
  {
    id: "free-strategic-objectives-okr",
    name: "Strategic Objectives (OKR)",
    slug: "strategic-objectives-okr",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/strategic-objectives-okr"
  },
  {
    id: "free-home-budget-family",
    name: "Home Budget (Family)",
    slug: "home-budget-family",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "PieChart",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/home-budget-family"
  },
  {
    id: "free-personal-crm-contacts",
    name: "Personal CRM (Contacts)",
    slug: "personal-crm-contacts",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Users",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/personal-crm-contacts"
  },
  {
    id: "free-incident-management",
    name: "Incident Management",
    slug: "incident-management",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/incident-management"
  },
  {
    id: "free-e-commerce-orders-shipments",
    name: "E-commerce: Orders & Shipments",
    slug: "e-commerce-orders-shipments",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "ShoppingCart",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/e-commerce-orders-shipments"
  },
  {
    id: "free-habit-tracker-631",
    name: "Habit Tracker",
    slug: "habit-tracker-631",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/habit-tracker-631"
  },
  {
    id: "free-unit-economics",
    name: "Unit Economics",
    slug: "unit-economics",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/unit-economics"
  },
  {
    id: "free-logistics-and-delivery",
    name: "Logistics and Delivery",
    slug: "logistics-and-delivery",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/logistics-and-delivery"
  },
  {
    id: "free-supplier-orders",
    name: "Supplier Orders",
    slug: "supplier-orders",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/supplier-orders"
  },
  {
    id: "free-cash-flow",
    name: "Cash Flow",
    slug: "cash-flow",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/cash-flow"
  },
  {
    id: "free-advertising-os",
    name: "Advertising OS",
    slug: "advertising-os",
    price: 79,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/advertising-os"
  },
  {
    id: "free-career-os-738",
    name: "Career OS",
    slug: "career-os-738",
    price: 57,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/career-os-738"
  },
  {
    id: "free-business-os-690",
    name: "Business OS",
    slug: "business-os-690",
    price: 68,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/business-os-690"
  },
  {
    id: "free-travel-os-591",
    name: "Travel OS",
    slug: "travel-os-591",
    price: 15,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/travel-os-591"
  },
  {
    id: "free-finance-os-668",
    name: "Finance OS",
    slug: "finance-os-668",
    price: 23,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "PieChart",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/finance-os-668"
  },
  {
    id: "free-content-os-824",
    name: "Content OS",
    slug: "content-os-824",
    price: 59,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarDays",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/content-os-824"
  },
  {
    id: "free-development-os",
    name: "Development OS",
    slug: "development-os",
    price: 69,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Users",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/development-os"
  },
  {
    id: "free-team-os-534",
    name: "Team OS",
    slug: "team-os-534",
    price: 25,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Users",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/team-os-534"
  },
  {
    id: "free-crypto-tracker-os",
    name: "Crypto Tracker OS",
    slug: "crypto-tracker-os",
    price: 49,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/crypto-tracker-os"
  },
  {
    id: "free-students-progress",
    name: "Students: Progress",
    slug: "students-progress",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/students-progress"
  },
  {
    id: "free-startup-os-995",
    name: "Startup OS",
    slug: "startup-os-995",
    price: 49,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/startup-os-995"
  },
  {
    id: "free-events-os",
    name: "Events OS",
    slug: "events-os",
    price: 59,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarDays",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/events-os"
  },
  {
    id: "free-equipment-tracker-01",
    name: "Equipment Tracker",
    slug: "equipment-tracker-01",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/equipment-tracker-01"
  },
  {
    id: "free-mastery-os",
    name: "Mastery OS",
    slug: "mastery-os",
    price: 19,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/mastery-os"
  },
  {
    id: "free-sales-os-324",
    name: "Sales OS",
    slug: "sales-os-324",
    price: 39,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "MessageSquareText",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/sales-os-324"
  },
  {
    id: "free-process-checklists",
    name: "Process Checklists",
    slug: "process-checklists",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/process-checklists"
  },
  {
    id: "free-weekly-planner-486",
    name: "Weekly Planner",
    slug: "weekly-planner-486",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Target",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/weekly-planner-486"
  },
  {
    id: "free-smm-os",
    name: "SMM OS",
    slug: "smm-os",
    price: 69,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/smm-os"
  },
  {
    id: "free-projects-os-221",
    name: "Projects OS",
    slug: "projects-os-221",
    price: 55,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "ListTodo",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/projects-os-221"
  },
  {
    id: "free-family-calendar",
    name: "Family Calendar",
    slug: "family-calendar",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CalendarOff",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/family-calendar"
  },
  {
    id: "free-construction-os",
    name: "Construction OS",
    slug: "construction-os",
    price: 79,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/construction-os"
  },
  {
    id: "free-kitchen-os",
    name: "Kitchen OS",
    slug: "kitchen-os",
    price: 8,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/kitchen-os"
  },
  {
    id: "free-life-os-235",
    name: "Life OS",
    slug: "life-os-235",
    price: 25,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/life-os-235"
  },
  {
    id: "free-agency-client-brief",
    name: "Agency: Client Brief",
    slug: "agency-client-brief",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/agency-client-brief"
  },
  {
    id: "free-churn-analysis",
    name: "Churn Analysis",
    slug: "churn-analysis",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/churn-analysis"
  },
  {
    id: "free-student-os-458",
    name: "Student OS",
    slug: "student-os-458",
    price: 5,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/student-os-458"
  },
  {
    id: "free-marketing-os-659",
    name: "Marketing OS",
    slug: "marketing-os-659",
    price: 49,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/marketing-os-659"
  },
  {
    id: "free-para-os-813",
    name: "PARA OS",
    slug: "para-os-813",
    price: 20,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/para-os-813"
  },
  {
    id: "free-gtd-os",
    name: "GTD OS",
    slug: "gtd-os",
    price: 30,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/gtd-os"
  },
  {
    id: "free-knowledge-base-os",
    name: "Knowledge Base OS",
    slug: "knowledge-base-os",
    price: 19,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Brain",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/knowledge-base-os"
  },
  {
    id: "free-journal-os-766",
    name: "Journal OS",
    slug: "journal-os-766",
    price: 9,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/journal-os-766"
  },
  {
    id: "free-apartment-renovation",
    name: "Apartment Renovation",
    slug: "apartment-renovation",
    price: 39,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/apartment-renovation"
  },
  {
    id: "free-family-os-915",
    name: "Family OS",
    slug: "family-os-915",
    price: 29,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/family-os-915"
  },
  {
    id: "free-notes-os-374",
    name: "Notes OS",
    slug: "notes-os-374",
    price: 14,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/notes-os-374"
  },
  {
    id: "free-languages-os",
    name: "Languages OS",
    slug: "languages-os",
    price: 7,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/languages-os"
  },
  {
    id: "free-references-os",
    name: "References OS",
    slug: "references-os",
    price: 19,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/references-os"
  },
  {
    id: "free-influencer-collaborations",
    name: "Influencer Collaborations",
    slug: "influencer-collaborations",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/influencer-collaborations"
  },
  {
    id: "free-kanban-board-330",
    name: "Kanban Board",
    slug: "kanban-board-330",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/kanban-board-330"
  },
  {
    id: "free-webinar-room",
    name: "Webinar Room",
    slug: "webinar-room",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/webinar-room"
  },
  {
    id: "free-faq-base",
    name: "FAQ Base",
    slug: "faq-base",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/faq-base"
  },
  {
    id: "free-subscription-tracker-363",
    name: "Subscription Tracker",
    slug: "subscription-tracker-363",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "MessageSquareText",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/subscription-tracker-363"
  },
  {
    id: "free-warranty-tracker-923",
    name: "Warranty Tracker",
    slug: "warranty-tracker-923",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/warranty-tracker-923"
  },
  {
    id: "free-upsell-and-cross-sell",
    name: "Upsell and Cross-sell",
    slug: "upsell-and-cross-sell",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/upsell-and-cross-sell"
  },
  {
    id: "free-portfolio-347",
    name: "Portfolio",
    slug: "portfolio-347",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/portfolio-347"
  },
  {
    id: "free-loyalty-program",
    name: "Loyalty Program",
    slug: "loyalty-program",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/loyalty-program"
  },
  {
    id: "free-email-campaigns",
    name: "Email Campaigns",
    slug: "email-campaigns",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "MessageSquareText",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/email-campaigns"
  },
  {
    id: "free-tax-management",
    name: "Tax Management",
    slug: "tax-management",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/tax-management"
  },
  {
    id: "free-seo-control",
    name: "SEO Control",
    slug: "seo-control",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "CheckCircle",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/seo-control"
  },
  {
    id: "free-gratitude-journal-117",
    name: "Gratitude Journal",
    slug: "gratitude-journal-117",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "BookOpen",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/gratitude-journal-117"
  },
  {
    id: "free-wishlist-873",
    name: "Wishlist",
    slug: "wishlist-873",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/wishlist-873"
  },
  {
    id: "free-crypto-portfolio",
    name: "Crypto Portfolio",
    slug: "crypto-portfolio",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
    downloadUrl: "https://www.notion.com/templates/crypto-portfolio"
  },
  {
    id: "free-m-a",
    name: "M&A",
    slug: "m-a",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/m-a"
  },
  {
    id: "free-mood-tracker-123",
    name: "Mood Tracker",
    slug: "mood-tracker-123",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/mood-tracker-123"
  },
  {
    id: "free-product-roadmap-145",
    name: "Product Roadmap",
    slug: "product-roadmap-145",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
    downloadUrl: "https://www.notion.com/templates/product-roadmap-145"
  },
  {
    id: "free-motivation-and-bonuses",
    name: "Motivation and Bonuses",
    slug: "motivation-and-bonuses",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/motivation-and-bonuses"
  },
  {
    id: "free-kpis-okrs",
    name: "KPIs & OKRs",
    slug: "kpis-okrs",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/kpis-okrs"
  },
  {
    id: "free-partner-marketing",
    name: "Partner Marketing",
    slug: "partner-marketing",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
    downloadUrl: "https://www.notion.com/templates/partner-marketing"
  },
  {
    id: "free-nps-surveys",
    name: "NPS Surveys",
    slug: "nps-surveys",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
    downloadUrl: "https://www.notion.com/templates/nps-surveys"
  },
  {
    id: "free-complaints-and-claims",
    name: "Complaints and Claims",
    slug: "complaints-and-claims",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
    downloadUrl: "https://www.notion.com/templates/complaints-and-claims"
  },
  {
    id: "free-exit-strategy",
    name: "Exit Strategy",
    slug: "exit-strategy",
    price: 0,
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "\u0428\u0430\u0431\u043B\u043E\u043D Notion \u043E\u0442 danyanovich. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0432\u043E\u0439 \u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441."
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
    downloadUrl: "https://www.notion.com/templates/exit-strategy"
  }
];
var allTemplates = [...paidTemplatesData, ...freeTemplatesData];

// src/seo/site.ts
var DEFAULT_LANGUAGE = "ru";
var SUPPORTED_LANGUAGES = ["ru", "en"];
var staticSeoRoutes = [
  { path: "", changefreq: "weekly", priority: 1 },
  { path: "/notion", changefreq: "weekly", priority: 0.9 },
  { path: "/consulting", changefreq: "monthly", priority: 0.9 },
  { path: "/cases", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
  { path: "/ai-training", changefreq: "weekly", priority: 0.8 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  { path: "/courses", changefreq: "monthly", priority: 0.7 },
  { path: "/ai-prompts", changefreq: "monthly", priority: 0.7 },
  { path: "/packages", changefreq: "monthly", priority: 0.7 },
  { path: "/reviews", changefreq: "monthly", priority: 0.6 },
  { path: "/faq", changefreq: "monthly", priority: 0.6 },
  { path: "/support", changefreq: "monthly", priority: 0.5 },
  { path: "/games/pixel-cafe-tycoon", changefreq: "monthly", priority: 0.4 },
  { path: "/businesses", changefreq: "weekly", priority: 0.7 },
  { path: "/workspaces", changefreq: "weekly", priority: 0.8 },
  { path: "/privacy", changefreq: "yearly", priority: 0.2 },
  { path: "/terms", changefreq: "yearly", priority: 0.2 },
  { path: "/cookies", changefreq: "yearly", priority: 0.2 }
];
function getLocalizedPath(language, path2 = "") {
  return path2 ? `/${language}${path2}` : `/${language}`;
}
var localizedSeoRoutes = staticSeoRoutes.flatMap(
  (route) => SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, route.path),
    changefreq: route.changefreq,
    priority: route.priority
  }))
);
var caseSeoRoutes = portfolioProjects.flatMap(
  (project) => SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, `/cases/${project.id}`),
    changefreq: "monthly",
    priority: 0.65
  }))
);
var blogSeoRoutes = blogPosts.flatMap(
  (post) => SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, `/blog/${post.slug}`),
    changefreq: "monthly",
    priority: 0.75
  }))
);
var notionTemplateSeoRoutes = allTemplates.flatMap(
  (template) => SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, `/notion/${template.slug}`),
    changefreq: "monthly",
    priority: 0.8
  }))
);
var sitemapRoutes = [
  ...localizedSeoRoutes,
  ...blogSeoRoutes,
  ...caseSeoRoutes,
  ...notionTemplateSeoRoutes
];
var prerenderRoutes = Array.from(
  new Set(sitemapRoutes.map((route) => route.path))
);
var legacyRedirects = [
  { from: "/", to: "/ru" },
  { from: "/notiontemplates", to: "/ru/notion" },
  { from: "/portfolio", to: "/ru/cases" },
  ...staticSeoRoutes.filter((route) => route.path).map((route) => ({
    from: route.path,
    to: getLocalizedPath(DEFAULT_LANGUAGE, route.path)
  })),
  ...portfolioProjects.map((project) => ({
    from: `/cases/${project.id}`,
    to: getLocalizedPath(DEFAULT_LANGUAGE, `/cases/${project.id}`)
  }))
];

// scripts/prerender.ts
var HOST = "127.0.0.1";
var PORT = 4173 + Math.floor(Math.random() * 1e3);
var BASE_URL = `http://${HOST}:${PORT}`;
var DIST_DIR = path.resolve("./dist");
function getOutputPath(routePath) {
  const route = routePath.replace(/^\//, "");
  return route ? path.join(DIST_DIR, route, "index.html") : path.join(DIST_DIR, "index.html");
}
async function waitForPreviewServer() {
  const timeoutAt = Date.now() + 3e4;
  while (Date.now() < timeoutAt) {
    try {
      const response = await fetch(`${BASE_URL}/ru`);
      if (response.ok) {
        return;
      }
    } catch {
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Timed out waiting for preview server.");
}
async function prerenderRoute(browser, routePath) {
  const page = await browser.newPage();
  const response = await page.goto(`${BASE_URL}${routePath}`, {
    waitUntil: "networkidle"
  });
  if (!response || !response.ok()) {
    throw new Error(`Failed to prerender ${routePath}: ${response?.status() ?? "no response"}`);
  }
  await page.waitForTimeout(250);
  await page.evaluate(() => {
    const duplicateSelectors = [
      'head link[rel="canonical"]:not([data-rh])',
      'head link[rel="alternate"][hreflang]:not([data-rh])',
      'head meta[name="description"]:not([data-rh])',
      'head meta[name="keywords"]:not([data-rh])',
      'head meta[name="author"]:not([data-rh])',
      'head meta[name="robots"]:not([data-rh])',
      'head meta[name="twitter:title"]:not([data-rh])',
      'head meta[name="twitter:description"]:not([data-rh])',
      'head meta[name="twitter:image"]:not([data-rh])',
      'head meta[property="og:title"]:not([data-rh])',
      'head meta[property="og:description"]:not([data-rh])',
      'head meta[property="og:image"]:not([data-rh])',
      'head meta[property="og:url"]:not([data-rh])',
      'head meta[property="og:type"]:not([data-rh])',
      'head meta[property="og:site_name"]:not([data-rh])',
      'head meta[property="og:locale"]:not([data-rh])',
      'head meta[property="og:locale:alternate"]:not([data-rh])'
    ];
    duplicateSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => element.remove());
    });
  });
  const html = await page.content();
  const outputPath = getOutputPath(routePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `<!doctype html>
${html}`);
  await page.close();
}
async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error("dist directory not found. Run vite build before prerender.");
  }
  const preview = spawn(
    "npx",
    ["vite", "preview", "--host", HOST, "--port", `${PORT}`, "--strictPort"],
    {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit"
    }
  );
  try {
    await waitForPreviewServer();
    const browser = await chromium.launch({ headless: true });
    try {
      for (const route of prerenderRoutes) {
        await prerenderRoute(browser, route);
        console.log(`Prerendered ${route}`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill("SIGTERM");
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
