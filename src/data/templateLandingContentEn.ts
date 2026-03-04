// English landing page content for each template
import type { TemplateLandingContent } from "./templateLandingContent";

export const templateLandingContentEn: Record<string, TemplateLandingContent> = {
    "para-os": {
        id: "para-os",
        headline: "PARA OS — four folders that will change your life",
        subheadline: "An organization system where every thought instantly finds its place. Projects, areas, resources and archives — all under control.",
        painPoints: [
            "You create tasks in different places — and lose half of them",
            "You start projects with enthusiasm, but a week later forget where you left off",
            "You hoard useful articles and notes that you never re-read",
            "You don't understand where time goes — you seem busy, but there's no result"
        ],
        solution: "Monday morning. You open the dashboard and immediately see: three tasks for today, two active projects at 40% and 75% progress, inbox cleared. No confusion. New idea? Two clicks — it's in 'Inbox'. In the evening you'll process it: turn it into a task, link it to a project, or save it to resources. Project done — move it to archive. Workspace stays clean, history preserved.",
        features: [
            { icon: "✅", title: "Tasks", description: "A unified registry of all todos. See today's plan, process inbox, track project progress." },
            { icon: "🎯", title: "Projects", description: "Everything with a deadline and a concrete result. Timeline, statuses, automatic progress calculation from tasks." },
            { icon: "🏠", title: "Areas", description: "Life areas without deadlines: health, finances, career, family. Maintain standards, not chase deadlines." },
            { icon: "📚", title: "Resources", description: "Knowledge library: articles, notes, ideas. All linked to projects and areas — find anything in seconds." }
        ],
        targetAudience: [
            { title: "Freelancers and entrepreneurs", description: "juggling client projects and personal tasks, need one unified system" },
            { title: "Specialists with many tasks", description: "marketers, designers, developers who need to never lose context between projects" },
            { title: "Anyone tired of chaos", description: "tried different methods, but nothing stuck because it was too complex" }
        ],
        views: [
            "Active Projects — gallery of current focuses with progress bars",
            "Inbox / Today — tasks that need attention right now",
            "Areas overview — all life areas on one screen"
        ]
    },
    "travel-os": {
        id: "travel-os",
        headline: "Travel OS — all your itineraries on one map",
        subheadline: "Turn the chaos of notes, screenshots and bookmarks into a structured itinerary. Four linked databases gather all trip details into one system.",
        painPoints: [
            "You save hotel links in 10 different chats and then can't find the right one",
            "Your trip budget lives in your head — and always gets 'slightly' exceeded",
            "Your itinerary is scattered across Google Maps, notes and Instagram screenshots",
            "After returning home you can't remember where exactly that great restaurant was"
        ],
        solution: "Imagine: you add Paris to locations, link it to the 'EuroTour 2025' trip, lay out the itinerary from departure to dinner — and watch scattered ideas become a complete plan. The map highlights unvisited spots. The timeline shows all trips of the year. The budget tracker counts expenses by category.",
        features: [
            { icon: "✈️", title: "Trips", description: "The system's core. A container for the entire journey — from idea to archive of memories. Track status, set budget, link countries and itinerary." },
            { icon: "📅", title: "Itinerary", description: "Detailed day-by-day plan. Flights, accommodation, restaurants, tours — all with exact time and cost." },
            { icon: "🗺️", title: "Locations", description: "Your knowledge base about the world. Countries, cities, landmarks, restaurants — with hierarchy and statuses." },
            { icon: "💰", title: "Finances", description: "Full budget control. Track expenses by category: transport, food, accommodation, shopping." }
        ],
        targetAudience: [
            { icon: "🎒", title: "Active travelers", description: "planning 3+ trips a year and tired of chaos in notes" },
            { icon: "📋", title: "Detail planners", description: "want to plan every hour of every day of the trip" },
            { icon: "💸", title: "Budget trackers", description: "want to understand where travel money goes" }
        ]
    },
    "crm-os": {
        id: "crm-os",
        headline: "CRM OS — your sales command center",
        subheadline: "From first contact to signed contract. Pipeline, activities, documents and the full picture for every client — in one place.",
        painPoints: [
            "You keep client contacts in notes, then spend 30 minutes searching for a phone number",
            "You forget to call back because the follow-up got lost somewhere between tabs",
            "You can't quickly answer 'how many deals are in progress and for what amount'",
            "Contracts and invoices are scattered across folders, and you search for the right file every time"
        ],
        solution: "Imagine every client is a story. First call, meetings, negotiations, documents — all linked by invisible threads. In the morning you open the dashboard and see: three calls today, two deals waiting for a proposal, one client with no active deals — time to reach out.",
        features: [
            { icon: "👥", title: "Clients", description: "All contacts in one place: statuses, sources, interaction history" },
            { icon: "💼", title: "Deals", description: "Kanban board with pipeline stages, amounts and closing probabilities" },
            { icon: "📦", title: "Products", description: "Catalog of goods and services with prices and categories" },
            { icon: "📅", title: "Activities", description: "Calls, meetings and tasks — today's plan always in sight" },
            { icon: "📄", title: "Contracts & Documents", description: "Registry of all files linked to deals" },
            { icon: "🧭", title: "Sales Pipeline", description: "Configurable stages for your sales process" }
        ],
        targetAudience: [
            { title: "Freelancers and consultants", description: "managing several clients in parallel and don't want to miss a single touchpoint" },
            { title: "Sales managers", description: "need a personal CRM to control their pipeline independently of corporate systems" },
            { title: "Small business owners", description: "want a simple client and deal tracking system without complex CRMs" }
        ],
        views: [
            "Activities — Today: list of tasks sorted by time",
            "Deals — In progress: kanban board of active deals by stage",
            "Clients — No deals: list of clients to re-engage",
            "Products — Active: quick access to current price list"
        ]
    },
    "notes-os": {
        id: "notes-os",
        headline: "Notes OS — your personal thought archive",
        subheadline: "Capture quotes from books, develop insights into notes, link knowledge to projects — and watch chaos turn into a system.",
        painPoints: [
            "You read a book, write down a quote — and a week later can't remember where it is",
            "Ideas are scattered between phone notes, browser bookmarks and sticky notes on the desk",
            "You know you already wrote down a thought on this topic, but finding it is slower than writing it again",
            "You consume tons of content, but not a single idea turns into action"
        ],
        solution: "You open a book — the quote is immediately linked to the source. You write a thought — it grows context through topics. When it's time to act — all materials are already gathered in the project. Inbox for quick capture. Source gallery 'Reading'. Knowledge map by topic.",
        features: [
            { icon: "📝", title: "Notes", description: "One place for all thoughts: quick ideas, quotes, insights and evergreen notes." },
            { icon: "📚", title: "Sources", description: "Your library: books, articles, videos, podcasts. Track reading progress, give ratings." },
            { icon: "🎯", title: "Projects", description: "Turn knowledge into results. Link notes to projects." },
            { icon: "🏷️", title: "Topics", description: "Map of your interests. Connect notes by topic, find unexpected links between ideas." }
        ],
        targetAudience: [
            { title: "Readers and students", description: "who want to turn what they read into their own ideas, not just collect quotes" },
            { title: "Content creators", description: "collecting materials for articles, videos or courses and tired of searching for 'that thought'" },
            { title: "Topic researchers", description: "diving into new areas and wanting to see their knowledge base grow" }
        ]
    },
    "events-os-lite": {
        id: "events-os-lite",
        headline: "Events OS — from first inquiry to final P&L",
        subheadline: "Manage events like projects: deals, budgets, contractors and risks in one unified system.",
        painPoints: [
            "You track deals in one spreadsheet, tasks in another, and budget in a third — and manually merge everything each time",
            "You forget about a contractor who already let you down at the last event",
            "You can't quickly tell a client how much you earned on a conference last quarter",
            "Risks are discussed in chats and get lost — until they materialize"
        ],
        solution: "Imagine: a client writes 'Interested' — you create a deal. Deal moves to 'Contract' — an event appears. Tasks for the team, payments for accounting, posts for marketing immediately attach to the event. Move the deal card to 'Closed' — the revenue automatically appears in the event card.",
        features: [
            { icon: "📅", title: "Events", description: "Control center: dates, team, budget plan/actual, P&L — all in one card" },
            { icon: "💰", title: "Deals", description: "CRM pipeline: from lead to close, with revenue forecast and event link" },
            { icon: "✅", title: "Tasks", description: "Kanban board: priorities, deadlines, assignees — per event" },
            { icon: "📊", title: "Budget & Payments", description: "Plan vs actual: revenue, expenses, cost items, payment statuses" },
            { icon: "📝", title: "Contracts", description: "All agreements in one place: client, vendor, with files and amounts" },
            { icon: "🤝", title: "Vendors", description: "Contractor registry: who's verified, who's blacklisted, contacts at hand" },
            { icon: "📱", title: "Content Plan", description: "Event media plan: posts, stories, articles — with dates and statuses" },
            { icon: "⚠️", title: "Risks", description: "Threat control: probability, impact, response plan, owner" },
            { icon: "📚", title: "Knowledge Base", description: "SOPs, checklists, document templates — so you don't reinvent the wheel" }
        ],
        targetAudience: [
            { title: "Event managers and producers", description: "running conferences, webinars, exhibitions and tired of spreadsheet chaos" },
            { title: "Agencies and teams", description: "working on multiple events in parallel and needing the full picture" },
            { title: "Freelancers and organizers", description: "managing the full cycle from sale to report on their own" }
        ],
        highlight: "9 linked databases. Ready-made views for daily work. All configured — just duplicate and start."
    },
    "business-os": {
        id: "business-os",
        headline: "Business OS — all your sales analytics in one place",
        subheadline: "Turn the flow of orders into a clear picture: who buys, what's profitable, and where money goes.",
        painPoints: [
            "You record sales in a spreadsheet but don't understand which products actually feed the business",
            "Clients buy, but you don't know who comes back and who left forever",
            "You spend on ads but can't say which channel pays off",
            "Every month the same questions: 'How much did we earn? On what? Where did the money go?'"
        ],
        solution: "Every sale leaves a trace. Here those traces form paths. You open the dashboard — and immediately see: what was bought this week, which products drive the business up, which clients bring the most money.",
        features: [
            { icon: "🛒", title: "Sales", description: "Central registry of all orders. See revenue, margin, status of each deal." },
            { icon: "👥", title: "Clients", description: "Customer base with automatic LTV calculation. Know who your VIP clients are." },
            { icon: "📦", title: "Products", description: "Assortment directory with prices and cost. See margin immediately." },
            { icon: "📢", title: "Channels", description: "Traffic source analysis. Compare ad spend to real revenue. ROI in plain sight." }
        ],
        targetAudience: [
            { title: "Small shop owners", description: "selling via Instagram, marketplaces or their own website" },
            { title: "Freelancers and craft sellers", description: "tracking clients and wanting to see who's most valuable" },
            { title: "New entrepreneurs", description: "launching a first business and wanting to keep finances under control from day one" }
        ],
        views: [
            "Recent Sales — all orders for the week in one list",
            "Sales by Month — seasonality and revenue dynamics",
            "Order Funnel — from new to shipped",
            "Top Products — leaders by revenue and margin",
            "Active Clients — who bought this month",
            "Channel Effectiveness — ROI of each traffic source"
        ]
    },
    "ads-os": {
        id: "ads-os",
        headline: "Ads OS — command center for managing ad traffic",
        subheadline: "See which budgets return profit and which just burn.",
        painPoints: [
            "In the morning you open five ad accounts — and your head is already spinning from numbers",
            "You launch a campaign, spend the budget, and can only tell if you earned or lost a week later",
            "A/B tests live in your head, creatives are scattered across folders",
            "At the end of the month you look at expenses and think: 'Where did it all go?'"
        ],
        solution: "Imagine: Monday morning, you open one dashboard — and immediately see everything. Which campaigns are running right now, how much of the monthly budget is spent, which hypotheses are in progress. ROI is calculated on the fly.",
        features: [
            { icon: "📊", title: "Campaigns", description: "All ad activities in one place — from planning to results analysis with ROI and ROAS calculation" },
            { icon: "💰", title: "Budgets", description: "Expense control by period: planned, actual, remaining — no more budget gaps" },
            { icon: "🧪", title: "Hypotheses & Tests", description: "A/B testing system: from idea to conclusions. Knowledge base of successful experiments" },
            { icon: "🎨", title: "Creatives", description: "Library of all ad materials with performance ratings" }
        ],
        targetAudience: [
            { title: "Marketer in a small team", description: "when you're running ads on multiple platforms alone" },
            { title: "Business owner", description: "when you want to see where advertising money goes" },
            { title: "Freelancer or agency", description: "when running campaigns for clients and needing an accountability system" }
        ]
    },
    "startup-os": {
        id: "startup-os",
        headline: "Startup OS — from idea chaos to structured growth",
        subheadline: "Hypotheses, sprints and investors — in one window.",
        painPoints: [
            "Ideas pile up in notes and messengers but never get tested",
            "Tasks get lost between Trello, spreadsheets and monitor sticky notes",
            "Investor contacts are scattered across email and you forget when you last wrote to someone",
            "The roadmap only exists in your head — the team doesn't see the full picture"
        ],
        solution: "Imagine: Monday morning. You open one dashboard and see everything. On the left — sprint tasks, sorted by priority. On the right — experiments currently being tested. Below — the quarterly release timeline.",
        features: [
            { icon: "💡", title: "Hypotheses", description: "Lab for testing ideas. Prioritization by ICE score, experiment tracking." },
            { icon: "📋", title: "Tasks", description: "Daily work engine. Sprints, priorities, owners — the whole team is synchronized." },
            { icon: "🗺️", title: "Products", description: "Strategic roadmap. Features and epics on a timeline, linked to tasks and hypotheses." },
            { icon: "🤝", title: "CRM", description: "All external relationships in one place. Investors, clients, negotiation statuses." }
        ],
        targetAudience: [
            { title: "Solo founders", description: "launching a first product and wanting to systematically test hypotheses" },
            { title: "Small teams (2-5 people)", description: "needing a shared picture: who's working on what, when's the release" },
            { title: "Fundraising startups", description: "negotiating with multiple investors" }
        ],
        highlight: "One dashboard. Four databases. Full control over the launch."
    },
    "content-os-new": {
        id: "content-os-new",
        headline: "Content OS — from idea to publication without chaos",
        subheadline: "Idea bank, production board and publishing calendar in one place. Content goes out on time — you breathe easy.",
        painPoints: [
            "Ideas come in the shower, while driving, at night — and disappear by morning",
            "You publish when you 'remember', not when you planned",
            "Some categories are packed, others go empty for weeks",
            "The constant 'should have posted yesterday' feeling and guilt"
        ],
        solution: "Imagine: an idea came — you wrote it down in one click. It didn't get lost in notes. When you sit down to plan content — you open the board. You see what's in progress, what's ready, where a visual is needed. Drag a card — the status updates.",
        features: [
            { icon: "📝", title: "Content", description: "All your publications in one place: from draft to published post. Calendar, production board, filters." },
            { icon: "📊", title: "6 ready-made views", description: "Content calendar, production board, archive, filter by category, by platform, weekly plan." },
            { icon: "💡", title: "Idea Bank", description: "Storage for future post topics. Priorities, categories, 'used' tag." },
            { icon: "🔥", title: "Focus on what matters", description: "Hot ideas always visible. Filter shows only what needs to be done first." }
        ],
        targetAudience: [
            { title: "Bloggers and authors", description: "running social media and tired of post planning chaos" },
            { title: "SMM specialists", description: "managing content for yourself or clients on multiple platforms" },
            { title: "Experts and entrepreneurs", description: "wanting to systematically run a personal brand but with no time for complex tools" }
        ]
    },
    "freelance-os": {
        id: "freelance-os",
        headline: "Freelance OS — everything for freelancing in one place",
        subheadline: "Manage projects, clients and portfolio without chaos. Turn completed orders into selling case studies.",
        painPoints: [
            "You manage clients in notes, messengers and memory — and lose contacts",
            "Completed projects collect dust in folders instead of bringing new clients",
            "Reviews are scattered across chats — collecting them in one place is always 'later'",
            "Every new order starts from scratch: you search for templates, try to remember processes"
        ],
        solution: "New inquiry — you add the client in 30 seconds. The project moves through statuses: from idea through work to final Review. Done — tick 'Show in portfolio', and the case study is already in your showcase.",
        features: [
            { icon: "📂", title: "Projects", description: "Manage orders from idea to case study. Statuses, deadlines, client links — all visible." },
            { icon: "👥", title: "Clients", description: "Your CRM: contacts, order history, relationship statuses. No one gets lost." },
            { icon: "💬", title: "Reviews", description: "Collect social proof. Best reviews — straight to the showcase." },
            { icon: "📚", title: "Knowledge Base", description: "Templates, guides, assets — always at hand. Don't reinvent the wheel every time." }
        ],
        targetAudience: [
            { title: "Designers and illustrators", description: "build a portfolio that sells, not just shows" },
            { title: "Copywriters and editors", description: "manage clients and projects without spreadsheets and chaos" },
            { title: "Freelance developers", description: "from inquiry to case study publication in one system" }
        ]
    },
    "executive-weekly": {
        id: "executive-weekly",
        headline: "Executive Weekly — every week as a mini-sprint",
        subheadline: "Turns the chaos of the working week into a manageable rhythm. Strategic priorities, daily plan and an honest debrief.",
        painPoints: [
            "You plan the week, but by Friday you realize — everything got done except what mattered",
            "Tasks grow like a snowball while the sense of progress disappears",
            "You delegate — and lose sight of where things stand with assignments",
            "Every week ends without conclusions, mistakes repeat"
        ],
        solution: "Imagine: Monday morning. You open the dashboard and see 1-3 weekly goals — not a list of 50 items, but a clear direction. Every task is linked to a goal, and you immediately see: does this move you forward or is it just routine?",
        features: [
            { icon: "🎯", title: "Weekly Goals", description: "Focus on 1-3 key results with a visual progress bar. Every task linked to a goal." },
            { icon: "📅", title: "Day-by-day planner", description: "Kanban board with Mon-Sun columns. Drag tasks, balance the load." },
            { icon: "👥", title: "Delegation tracking", description: "All team assignments in one place. Clear who does what and when." },
            { icon: "🔥", title: "A/B/C Priorities", description: "Strategy, important, routine — instantly clear where to spend energy." },
            { icon: "✅", title: "Done list", description: "End-of-week motivation: see how much you actually accomplished." },
            { icon: "📝", title: "Retrospectives", description: "Weekly log. What worked, what didn't, takeaways for the future." }
        ],
        targetAudience: [
            { title: "Managers and team leads", description: "juggling their own tasks and team tasks" },
            { title: "Entrepreneurs", description: "needing to see strategic progress rather than drowning in operations" },
            { title: "Project managers", description: "working in weekly sprints and wanting a systematic approach" }
        ]
    },
    "ideas-tracker": {
        id: "ideas-tracker",
        headline: "Ideas Tracker — turn thought chaos into a system of discoveries",
        subheadline: "From fleeting spark to realized project through a prioritization funnel and ideas connection map.",
        painPoints: [
            "You write ideas in notes, messengers and napkins — then can't find them",
            "You don't know which idea to tackle first — they all seem equally important",
            "Great thoughts get lost because there's no system for evaluating and developing them",
            "Ideas live in isolation — you don't see connections between them"
        ],
        solution: "Imagine: you catch a thought on the fly and drop it into Inbox in a second. Each idea goes through a funnel of statuses: from initial screening through incubation to execution. ICE Score turns the subjective 'well, this is important' into concrete numbers.",
        features: [
            { icon: "💡", title: "Ideas", description: "System core — store, evaluate and develop ideas through a status funnel with ICE Score rating" },
            { icon: "📂", title: "Categories", description: "Cluster ideas by direction and track where the most potential is" },
            { icon: "✨", title: "Inspiration Hub", description: "Library of books, articles and exercises for overcoming creative blocks" },
            { icon: "🔗", title: "Idea Connections", description: "Connect thoughts to each other — unexpected intersections create breakthroughs" }
        ],
        targetAudience: [
            { title: "Creators and authors", description: "collecting ideas for content, articles, videos and not wanting to lose inspiration" },
            { title: "Entrepreneurs", description: "generating business ideas and needing a prioritization system" },
            { title: "Product managers", description: "managing a flow of features and improvements, needing a transparent selection process" }
        ],
        views: [
            "📥 Fast Capture — instant Inbox dump",
            "🧠 Workflow — visual management board",
            "💎 Top Ideas — gallery of best ideas by ICE Score",
            "🗓 Roadmap — timeline for planning execution",
            "🕸 Connections — ideas connection map"
        ]
    },
    "second-brain-os": {
        id: "second-brain-os",
        headline: "Second Brain OS — turns thought chaos into an action system",
        subheadline: "A unified command center for ideas, projects and goals. A place where nothing gets lost, and every thought finds its way to results.",
        painPoints: [
            "Ideas come at the wrong moment — and disappear, because there's nowhere to write them",
            "Article links pile up in bookmarks, but you never return to them",
            "Projects start with enthusiasm but stall without a clear plan",
            "You remember writing this down somewhere… but where?"
        ],
        solution: "Morning. You open one page and see everything: today's tasks, active projects, note drafts. Idea on the subway? Drop it in Inbox — process it later. Found a great article? Save it to resources. Launching a new project? It immediately connects to a life area, goals and tasks.",
        features: [
            { icon: "📁", title: "Areas", description: "Big life spheres — business, personal, learning. Roots that hold everything else." },
            { icon: "📂", title: "Projects", description: "Initiatives with deadlines and statuses: from 'Planned' to 'Completed'. With completion progress." },
            { icon: "☑️", title: "Actions", description: "Atomic tasks with a five-level urgency scale. On the weekly calendar or in 'Today' list." },
            { icon: "🎯", title: "Goals", description: "Milestones that projects and actions lead to. Connect daily work to the big picture." },
            { icon: "📝", title: "Notes", description: "From draft to final version. Grouped by notebooks and topics." },
            { icon: "📦", title: "Resources", description: "Articles, videos, podcasts, courses — all in one place with status." },
            { icon: "📚", title: "Knowledge Base", description: "Permanent knowledge you return to. Linked to notes and topics." },
            { icon: "🏷️", title: "Topics & Notebooks", description: "Thematic tags and containers for grouping. Find related content in seconds." }
        ],
        targetAudience: [
            { title: "For those drowning in information", description: "hundreds of notes, links and ideas with nowhere to put them. Now every thought has a home." },
            { title: "For those running multiple projects", description: "work, studies, personal initiatives. Kanban board shows each status." },
            { title: "For those who want a system", description: "connections between areas, projects, actions and goals. Everything works together." }
        ]
    },
    "kitchen-os": {
        id: "kitchen-os",
        headline: "Kitchen OS — your culinary headquarters",
        subheadline: "From 'what to cook?' to 'everything's bought' — in one system.",
        painPoints: [
            "Every day the same question: 'What to cook?' — and 30 minutes glazing at the phone",
            "Shopping list on a napkin that got lost on the way to the store",
            "The cottage cheese in the fridge that 'was still fine yesterday'",
            "Recipes scattered across screenshots, bookmarks and mates' group chats"
        ],
        solution: "Sunday evening. You open the planner, drag recipes to days of the week — breakfasts, lunches, dinners. Five minutes — and the whole week is planned. Shopping list? Already ready.",
        features: [
            { icon: "🍲", title: "Recipes", description: "Your personal cookbook with filters by time, difficulty and meal type." },
            { icon: "🛒", title: "Products", description: "Inventory control and smart shopping list. See what's running low — add to list." },
            { icon: "📅", title: "Planner", description: "Weekly menu in one place. Assign recipes to days." },
            { icon: "⚠️", title: "Freshness control", description: "Products nearing expiry always visible." }
        ],
        targetAudience: [
            { title: "For those tired of 'what to cook'", description: "and wanting to plan the menu in 5 minutes once a week" },
            { title: "For those who forget items at the store", description: "and come home without half the list" },
            { title: "For those who throw out spoiled food", description: "because they forgot what's in the fridge" }
        ]
    },
    "ecommerce-os": {
        id: "ecommerce-os",
        headline: "E-commerce OS — your online trading command center",
        subheadline: "From first click to last penny — products, orders, marketing and finances on one screen.",
        painPoints: [
            "You track products in one spreadsheet, orders in another, and remember stock only when a client is already waiting",
            "Marketing promotions live in your head or in phone notes",
            "Money comes and goes, but where exactly — you only understand at end of month",
            "Each marketplace is a separate world with separate spreadsheets"
        ],
        solution: "Morning. You open one screen — and immediately see: three products running low, two orders waiting for shipment, a promotion starts tomorrow. No more tab switching.",
        features: [
            { icon: "📦", title: "Products", description: "Full catalog with prices, stock and channel links. Critical stock levels visible at a glance." },
            { icon: "🛒", title: "Orders", description: "Unified registry from all channels. Statuses, amounts, dates — at hand. Kanban board for processing." },
            { icon: "📢", title: "Marketing", description: "Promotions and campaigns calendar. Budgets, channels, statuses — plan marketing like a strategist." },
            { icon: "🌐", title: "Channels", description: "Directory of all sales channels: marketplaces, website, social. Commissions and account links." },
            { icon: "💰", title: "Finances", description: "Income and expenses by category. Linked to orders." },
            { icon: "🎯", title: "Dashboard", description: "Summary of critical stock, active orders and marketing calendar." }
        ],
        targetAudience: [
            { title: "Marketplace sellers", description: "selling on Amazon, eBay or other platforms and wanting everything in one place" },
            { title: "Small online store owners", description: "tired of spreadsheet chaos and wanting a system" },
            { title: "E-commerce starters", description: "wanting to start with order from day one" }
        ]
    },
    "real-estate-os": {
        id: "real-estate-os",
        headline: "Real Estate OS — your digital realtor office",
        subheadline: "Properties in plain sight, clients in focus, deals moving to close — all in one place.",
        painPoints: [
            "Client contacts scattered across notebooks, messengers and spreadsheets",
            "Forgot to call back — and the lead went to a competitor",
            "Don't understand at what stage the deal is and when to realistically expect commission",
            "Showings get confused with each other, and important meetings slip from memory"
        ],
        solution: "The morning starts not with frantic searching, but with a clear list: three calls, one showing, an offer ready to sign. You open the system — and see the full picture: which properties are available, which clients are waiting for a response, which deal is about to close.",
        features: [
            { icon: "🏢", title: "Properties", description: "Full real estate catalog with photos, prices and features. Filter by status." },
            { icon: "💼", title: "Deals", description: "Sales pipeline from first contact to close. See commission amount and expected date." },
            { icon: "👥", title: "Contacts", description: "Full client base: buyers, sellers, partners. Statuses, preferences, history." },
            { icon: "📅", title: "Activities", description: "Unified calendar of calls, meetings and showings. Today's tasks in plain sight." }
        ],
        targetAudience: [
            { title: "Independent realtor", description: "tired of chaos and wanting to work like a pro with their own CRM" },
            { title: "Small agency", description: "needing a unified system for the team without expensive solutions" },
            { title: "New broker", description: "wanting to set up the right processes from day one" }
        ]
    },
    "marketing-os": {
        id: "marketing-os",
        headline: "Marketing OS — command center for all your launches",
        subheadline: "Emails, ads and content merge into a single flow — with a live campaign calendar, audience portraits and ROI in hand.",
        painPoints: [
            "Campaigns scattered across different spreadsheets, chats and notes — finding launch history is impossible",
            "Budget is spent, but understanding which channel brings money is only possible at end of quarter",
            "Content is created last minute because there's no unified pipeline",
            "Audience portraits live in heads, not in a system"
        ],
        solution: "You open the system — and immediately see the active launches board: what's burning right now, how much budget is spent, what's the ROI. Switch to calendar — and see how campaigns spread out months ahead.",
        features: [
            { icon: "🎯", title: "Campaigns", description: "Unified base of all launches: ads, newsletters, promos. Plan budget, track ROI." },
            { icon: "✍️", title: "Content & Creatives", description: "Production pipeline for emails, posts and banners. From idea to publication." },
            { icon: "📊", title: "Analytics Data", description: "Historical data by period: costs, conversions, revenue. Compare channels." },
            { icon: "👥", title: "Audience & Personas", description: "Gallery of client portraits with their pains and motivations. Segment the audience." }
        ],
        targetAudience: [
            { title: "Marketer in a startup", description: "managing all channels alone and needing a unified center" },
            { title: "Marketing manager", description: "wanting to see the full picture: budgets, timelines, effectiveness" },
            { title: "Freelancer or agency", description: "managing several clients and needing an adaptable system" }
        ],
        views: [
            "Active Launches — board of active campaigns by status",
            "Marketing Calendar — timeline of all launches",
            "Budget vs Actual — table with budget, spend and ROI by channel"
        ]
    },
    "corporate-kb-os": {
        id: "corporate-kb-os",
        headline: "Corporate Knowledge Base — single source of truth",
        subheadline: "Turn the chaos of scattered files into a structured library where every answer is found in seconds.",
        painPoints: [
            "Newcomers ask the same questions over and over — experts spend hours explaining",
            "Regulations live in different folders, chats and heads — no one knows where the current version is",
            "'Where do I find this?' — the most frequent question in work chats",
            "Documents become outdated but no one tracks their relevance"
        ],
        solution: "A new employee opens the knowledge base and sees the 'Start Here' section — everything for onboarding in one place. A question comes up? The FAQ block gives an instant answer. Need the sales department regulation? One click — and the document is right there.",
        features: [
            { icon: "📚", title: "Document Library", description: "All regulations, instructions and materials in one place. Statuses and relevance review dates." },
            { icon: "🗂️", title: "Smart Categories", description: "Hierarchical knowledge structure with topic navigation. Find information by meaning." },
            { icon: "❓", title: "FAQ Base", description: "Quick answers to frequent questions. Reduces the load on experts." },
            { icon: "👥", title: "Department Structure", description: "Knowledge grouped by teams. Each department sees its own documents." }
        ],
        targetAudience: [
            { title: "Team leads", description: "wanting newcomers to train independently" },
            { title: "HR and operations managers", description: "collecting company regulations and tired of 'where does this live?'" },
            { title: "Growing startups", description: "scaling and realizing that knowledge in heads is a risk" }
        ]
    },
    "finance-os": {
        id: "finance-os",
        headline: "Finance OS — your personal financial headquarters",
        subheadline: "Keep your finger on the pulse of every dollar — from morning coffee to the dream of your own home.",
        painPoints: [
            "You open the banking app and don't understand where the paycheck went in a week",
            "You have six cards, a crypto wallet and a stash — but no complete picture",
            "Subscriptions charge unexpectedly, and every time it's a surprise",
            "The dream of a new camera or vacation stays 'someday later'"
        ],
        solution: "All your money finally gathered in one place. In the morning you open the dashboard and see: Checking — $4,500, Savings — $1,200, Crypto — $800. Total balance: $6,500.",
        features: [
            { icon: "💳", title: "Accounts", description: "All cards, wallets and stashes in one place with current balances" },
            { icon: "💰", title: "Income", description: "Registry of all inflows — salary, freelance, transfers from friends" },
            { icon: "🎯", title: "Goals", description: "Turn dreams into progress bars — from new headphones to a down payment" },
            { icon: "📊", title: "Budget", description: "Category limits — see when it's time to slow down on food delivery" },
            { icon: "🧾", title: "Expenses", description: "Every expense in place — with category, account and date" },
            { icon: "🔄", title: "Subscriptions", description: "List of recurring payments — no more unexpected charges" }
        ],
        targetAudience: [
            { icon: "👤", title: "For those who want to start", description: "You've never tracked finances, but understand it's time." },
            { icon: "📱", title: "For those tired of apps", description: "Banking apps only show one bank. Here — the full picture." },
            { icon: "🎯", title: "For those saving for a dream", description: "You want to see progress toward a goal every day." }
        ]
    },
    "family-os": {
        id: "family-os",
        headline: "FAMILY OS — turn household chaos into a coordinated team game",
        subheadline: "A place where family becomes a team. A shared calendar reminds about grandma's birthday, tasks show whose turn it is to take out trash, and the contacts base suggests the perfect gift.",
        painPoints: [
            "You constantly keep relatives' birthdays and anniversaries in your head, but still remember them at the last minute",
            "You and your partner argue about who was supposed to clean and when, because agreements get lost in chats",
            "Recipes, gift ideas and vacation plans are scattered across notes and screenshots — impossible to find anything"
        ],
        solution: "A unified digital system that connects 6 key databases into one mechanism. The template unlocks 100% when you use it together.",
        features: [
            { icon: "📅", title: "Calendar", description: "System core. Combines holidays, dates, trips and household deadlines." },
            { icon: "✅", title: "Tasks", description: "Transparent responsibility distribution. Clearly visible who does what." },
            { icon: "👥", title: "People", description: "Cards for loved ones with birthdays, clothing sizes and preferences." },
            { icon: "🎁", title: "Resources", description: "Unified idea library. Gift ideas, recipes and date ideas stored here." },
            { icon: "💰", title: "Finances", description: "Family budget control. Tracking income and expenses by category." },
            { icon: "📸", title: "Memories", description: "Your family archive. History of important events with photo reports." }
        ],
        targetAudience: [
            { title: "Couples building a home together", description: "to make household routine transparent and planning simple" },
            { title: "Large families", description: "to keep all relatives' birthdays in focus" },
            { title: "Organization lovers", description: "who want to keep everything in one structured system" }
        ]
    },
    "gtd-os": {
        id: "gtd-os",
        headline: "GTD OS — turn task chaos into a clear system",
        subheadline: "From fleeting idea to completed project. Inbox → contexts → result.",
        painPoints: [
            "You write tasks in different places — and half get lost",
            "You open your task list and don't know what to grab",
            "Important tasks sink in routine while deadlines creep up",
            "In the evening you realize you were busy all day but nothing important got done"
        ],
        solution: "Every thought finds its place. Inbox catches ideas on the fly — write it down and forget it until it's time to process. Contexts suggest what to do right now: at home — some tasks, at the office — others.",
        features: [
            { icon: "📥", title: "Actions", description: "All tasks in one place — with statuses, contexts, priorities and project links" },
            { icon: "📁", title: "Projects", description: "Group tasks into projects with a progress bar, deadlines and goal links" },
            { icon: "🏆", title: "Goals", description: "Quarterly and annual planning — see where your projects lead" },
            { icon: "📦", title: "Areas of Responsibility", description: "Work, family, health — balance life spheres" },
            { icon: "📚", title: "Resources", description: "Notes, documents, regulations — your second brain with tags and search" },
            { icon: "🎯", title: "Ready-made views", description: "Today's tasks, inbox review, context board, project roadmap" }
        ],
        targetAudience: [
            { title: "For those drowning in tasks", description: "dozens of things in your head, in notes, in messengers. Need one entry point." },
            { title: "For those wanting to implement GTD", description: "David Allen's classic methodology adapted for modern tools." },
            { title: "For those planning big goals", description: "the task → project → goal connection helps see how daily actions get you to results." }
        ]
    },
    "goals-os": {
        id: "goals-os",
        headline: "Goals OS — turn ambitions into measurable progress",
        subheadline: "Set goals. Track metrics. Achieve results.",
        painPoints: [
            "You set year goals but by March you don't remember what you planned",
            "You have dreams but no clear plan for how to get there",
            "You do many tasks but don't understand which ones actually move you forward",
            "The quarter ends and you can't say what you achieved"
        ],
        solution: "Monday morning. You open the dashboard and immediately see: three active goals, progress for each — 47%, 82%, 23%. Goal 'Launch product' is behind — you look at key results. The metric is stuck at 23 of 100.",
        features: [
            { icon: "🎯", title: "Goals", description: "Strategic milestones with progress tracking and planning cycle links" },
            { icon: "📈", title: "Key Results", description: "Measurable metrics with current and target values — see progress in percentages" },
            { icon: "⚡", title: "Initiatives", description: "Concrete projects and tasks with deadlines that move your metrics" },
            { icon: "🔄", title: "Cycles", description: "Planning periods — quarters or years — for structuring goals over time" }
        ],
        targetAudience: [
            { title: "Entrepreneur", description: "wanting to translate annual vision into quarterly sprints with measurable results" },
            { title: "Team manager", description: "needing to see each member's goal progress" },
            { title: "Big planner", description: "tired of wish lists and wanting a system that shows real movement" }
        ]
    },
    "workout-os": {
        id: "workout-os",
        headline: "Workout OS — your personal trainer in digital form",
        subheadline: "Plan workouts. Track progress. Understand your body.",
        painPoints: [
            "You write workouts in notes, but a month later don't remember what working weight was",
            "You want to track progress, but data is scattered across apps",
            "You feel you're not recovering well, but don't understand why",
            "Exercise technique videos get lost in browser bookmarks"
        ],
        solution: "Morning. Open the dashboard — see today's workout. Go inside: exercise list, your personal records, technique videos. After the gym mark 'Done', enter morning weight. The graph draws a curve — you see where you're heading.",
        features: [
            { icon: "🗓️", title: "Workouts", description: "Calendar and log of all sessions. Plan strength, cardio, stretching — and rate how you felt." },
            { icon: "💪", title: "Exercise Database", description: "Gallery by muscle group with technique videos. Store personal records — always at hand." },
            { icon: "📏", title: "Body Metrics", description: "Weight graph, measurement log, form photos. Visualize progress." },
            { icon: "🥗", title: "Lifestyle", description: "Sleep and nutrition diary linked to workouts. Find correlations." }
        ],
        targetAudience: [
            { icon: "🏋️", title: "You train and want to grow", description: "Track working weights, record PRs, plan load progression." },
            { icon: "🏃", title: "You do multiple activities", description: "Strength, cardio, stretching, crossfit — keep a unified calendar." },
            { icon: "📊", title: "You want to understand lifestyle impact", description: "Connect sleep, nutrition and recovery to workout quality." }
        ]
    },
    "smm-os": {
        id: "smm-os",
        headline: "SMM OS — your command center for conquering social media",
        subheadline: "From first idea to winning report. Strategy, calendar, channels and numbers in one place.",
        painPoints: [
            "Post ideas scattered across notes, messengers and your head — when needed, nothing can be found",
            "You publish 'whenever', not by strategy — and the audience feels it",
            "Stats from different platforms in different places — impossible to get the full picture",
            "You spend time on organizing instead of creating content"
        ],
        solution: "Monday morning. You open one page and see everything: which posts are in progress, what goes out this week, which channel grows and which sagged. Chaos becomes a media machine. You're creating again.",
        features: [
            { icon: "📝", title: "Content", description: "All ideas, posts and materials in one place. Each publication goes from idea to analytics." },
            { icon: "📡", title: "Platforms", description: "Map of all your channels with audience and stats. See where your followers are." },
            { icon: "📊", title: "Analytics", description: "Honest numbers by period: reach, engagement, best content." },
            { icon: "🎯", title: "Strategy", description: "Goals, audience portraits, categories and competitors. Foundation of all content." }
        ],
        targetAudience: [
            { title: "Solo content maker", description: "running multiple platforms and tired of chaos in notes" },
            { title: "SMM manager", description: "needing a unified control panel for client or personal projects" },
            { title: "Small editorial team", description: "2-5 people needing a shared production pipeline" }
        ]
    },
    "crypto-tracker": {
        id: "crypto-tracker",
        headline: "Crypto Tracker — full control over your crypto portfolio",
        subheadline: "From first trade to exact profit calculation for each asset. All in one place.",
        painPoints: [
            "You buy crypto on different exchanges but don't remember at what price you entered",
            "You try to calculate profit in your head or in notes — and keep getting confused",
            "Your assets are spread across wallets and you don't know the real portfolio balance",
            "Every time you open 5 tabs just to understand how much money you have"
        ],
        solution: "You open one page — and immediately see everything: how much your portfolio is worth, which coins are up and which are down. Add a new purchase in 30 seconds. The system shows the average entry price and current PnL.",
        features: [
            { icon: "💰", title: "Coins", description: "Registry of all your cryptocurrencies with current price, average entry price and profit calculation" },
            { icon: "📊", title: "Wallets", description: "Track all storage locations — exchanges, hardware and software wallets with balances" },
            { icon: "📝", title: "Transactions", description: "Log of all operations: purchases, sales, swaps, transfers, staking" },
            { icon: "📈", title: "Dashboard", description: "Main panel with portfolio, activity feed and allocation diagram" }
        ],
        targetAudience: [
            { title: "Beginning investor", description: "just getting into crypto and wanting to track correctly from day one" },
            { title: "Active trader", description: "making many trades and needing a unified log with history" },
            { title: "Holder with multiple wallets", description: "storing crypto in different places and wanting the full picture" }
        ]
    },
    "investments-os": {
        id: "investments-os",
        headline: "Investments OS — your capital under control",
        subheadline: "One page. All assets. Every trade. Progress toward dreams in percentages.",
        painPoints: [
            "Stocks at one broker, crypto at an exchange, bonds somewhere in notes — and not a single complete picture",
            "Dividends come in, but how much for the year — a mystery",
            "Goal 'save for a home' lives only in your head, without numbers or deadlines",
            "You buy on emotion and a year later don't remember why you entered that position"
        ],
        solution: "You open one page — and see your entire investment world. Every asset's share always in sight. Every buy and sell linked to the instrument. Dividends don't get lost — they accumulate.",
        features: [
            { icon: "🏦", title: "Asset Registry", description: "Stocks, bonds, crypto, ETF — all in one place with share calculation" },
            { icon: "📝", title: "Trade Log", description: "Purchases, sales, dividends — complete history for yield calculation" },
            { icon: "🎯", title: "Financial Goals", description: "Progress bars tied to real money in the portfolio" },
            { icon: "📓", title: "Investor Journal", description: "Ideas, theses, decision quality evaluation" },
            { icon: "💼", title: "Account Tracking", description: "Balance reconciliation by broker" }
        ],
        targetAudience: [
            { title: "Beginning investor", description: "bring order from the first trades and don't lose history" },
            { title: "Portfolio investor", description: "see the full picture of assets across brokers" },
            { title: "Goal-oriented saver", description: "save for specific goals and track progress" }
        ]
    },
    "construction-os": {
        id: "construction-os",
        headline: "Construction OS — supply chain command post",
        subheadline: "Warehouse, suppliers, orders — all in one place. See critical stock levels, track every delivery.",
        painPoints: [
            "Construction stopped because no one ordered cement on time",
            "Looking for a supplier's contact in three chats and two notebooks",
            "Can't remember whether you already ordered rebar or were just planning to",
            "New supply manager takes a month to get up to speed, not a day"
        ],
        solution: "You open the system in the morning — you see: cement is running low, highlighted in red. One click creates a purchase request. Approved — status changed. Truck on the way — visible on the calendar.",
        features: [
            { icon: "📦", title: "Material Warehouse", description: "All materials in one catalog. See stock levels, critical items highlighted." },
            { icon: "🚚", title: "Orders & Deliveries", description: "From request to receipt — the full path in plain sight. Calendar shows when the truck arrives." },
            { icon: "🤝", title: "Suppliers", description: "Counterparty base with ratings, contacts and history. Reliable ones on top." },
            { icon: "📚", title: "Knowledge Base", description: "Regulations, checklists, document templates. New employee gets up to speed in a day." }
        ],
        targetAudience: [
            { title: "Construction supply manager", description: "stop drowning in chaos and forgetting orders" },
            { title: "Site foreman or project manager", description: "see the real materials picture without constant calls" },
            { title: "Construction company owner", description: "get a transparent system that works without your involvement" }
        ]
    },
    "sales-os": {
        id: "sales-os",
        headline: "Sales OS — your sales pipeline that works",
        subheadline: "Turns the chaos of inquiries and chats into a clear system where no deal gets lost.",
        painPoints: [
            "You spend 20 minutes finding 'that exact conversation' with a client",
            "You forget to call back — and the deal goes to a competitor",
            "You don't understand how much money is actually in progress right now",
            "Clients 'hang' at the negotiation stage and you don't notice"
        ],
        solution: "Imagine: you open one screen — and immediately see everything. Who's in negotiations. Who needs a follow-up. How much money is in the pipeline. Every deal moves through the funnel like a conveyor belt.",
        features: [
            { icon: "🗂", title: "Deals", description: "The entire pipeline in plain sight: from first contact to close. See amounts, statuses, deadlines." },
            { icon: "👥", title: "Clients", description: "Contact base with deal history. One click — and you know everything: what they bought, when you talked." },
            { icon: "📦", title: "Products", description: "Catalog of your services and products with prices. Choose a product when creating a deal — the amount is already there." },
            { icon: "✅", title: "Tasks", description: "Actions linked to deals. See what to do today to not miss a single client." }
        ],
        targetAudience: [
            { title: "Freelancers and consultants", description: "managing 5-20 clients simultaneously and wanting to stop losing deals in chats" },
            { title: "Small agencies", description: "needing a full picture of all clients without complex CRMs" },
            { title: "Entrepreneurs at the start", description: "needing to see money in progress without spending time configuring systems" }
        ]
    },
    "life-os": {
        id: "life-os",
        headline: "Life OS — your command center where chaos turns to order",
        subheadline: "Three priority color zones put everything in its place: from burning deadlines to ideas for later.",
        painPoints: [
            "You open your task list in the morning and don't know what to grab — everything feels urgent",
            "Clients and contacts scattered across chats, notes and memory",
            "Money comes and goes, but where exactly — a mystery until end of month",
            "Useful articles and books pile up in bookmarks you'll never open"
        ],
        solution: "Morning starts with a look at three columns. Red zone — what's burning right now. Yellow — important but can wait. Green — ideas waiting their turn. You click on a project — and see all linked tasks, the client and finances.",
        features: [
            { icon: "🎯", title: "Projects", description: "System core with priority zones — immediately see what needs attention now" },
            { icon: "✅", title: "Tasks", description: "Daily actions with deadlines — 'today' list and calendar for planning" },
            { icon: "💰", title: "Finances", description: "Income and expenses in one place — by category and month, linked to projects" },
            { icon: "👥", title: "Clients & Audiences", description: "Mini-CRM from first contact to closed deal — leads, active clients" },
            { icon: "📚", title: "Resources", description: "Useful library — tools, articles, books and templates with a study queue" }
        ],
        targetAudience: [
            { title: "Freelancers", description: "juggling multiple clients and projects simultaneously" },
            { title: "Content creators", description: "needing to track both creative projects and the business side" },
            { title: "Solo entrepreneurs", description: "tired of scattered tools" }
        ]
    }
};
