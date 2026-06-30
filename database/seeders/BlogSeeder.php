<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@misanaly.in')->firstOrFail();

        // Categories
        $tally = BlogCategory::updateOrCreate(
            ['slug' => 'tally-accounting'],
            ['name' => 'Tally & Accounting']
        );
        $dev = BlogCategory::updateOrCreate(
            ['slug' => 'software-development'],
            ['name' => 'Software Development']
        );
        $biz = BlogCategory::updateOrCreate(
            ['slug' => 'business-tips'],
            ['name' => 'Business Tips']
        );

        $posts = [
            [
                'title'       => '5 Ways to Automate Your Tally Data Entry',
                'slug'        => '5-ways-to-automate-tally-data-entry',
                'excerpt'     => 'Manual Tally data entry is costing CA firms thousands of hours. Discover the top five automation strategies that leading firms use to eliminate repetitive work.',
                'category_id' => $tally->id,
                'body'        => '<h2>The Problem with Manual Data Entry</h2><p>Every CA firm knows the pain: stacks of bank statements, GST invoices, and TDS certificates all waiting to be entered manually into Tally. A single client can generate hundreds of entries per month, and with dozens of clients on your books, the arithmetic becomes brutal.</p><p>Manual entry isn\'t just slow — it\'s error-prone. A single transposed digit can cascade into hours of reconciliation work. Industry studies suggest that manual data entry errors cost businesses up to 25% in additional processing time.</p><h2>1. Bank Statement Import Automation</h2><p>The biggest time sink for most CA firms is importing bank statements. Modern Tally automation tools can parse PDF and Excel bank statements and auto-match transactions against your ledger rules. What used to take 3 hours can be done in under 10 minutes.</p><p>Look for tools that support all major Indian banks — HDFC, ICICI, SBI, Axis, and Kotak — and can handle multiple account formats in one import session.</p><h2>2. GST Data Auto-Reconciliation</h2><p>GST reconciliation between GSTR-2A and your purchase register is another major bottleneck. Automation tools that pull data directly from the GST portal and match it against your Tally entries can save 6-8 hours per client per quarter.</p><p>The key feature to look for is intelligent fuzzy matching — because invoice numbers and vendor names don\'t always match exactly between systems.</p><h2>3. TDS Entry Automation</h2><p>TDS entries follow predictable patterns: the same vendors, the same percentages, the same ledger heads. Automation rules can be set once and applied forever, eliminating manual TDS entries for recurring payments entirely.</p><h2>4. Bulk Voucher Creation</h2><p>For high-volume clients — retailers, distributors, e-commerce sellers — the ability to bulk-create vouchers from structured data files is game-changing. A properly configured automation can process 1,000+ vouchers in the time it takes to manually enter 20.</p><h2>5. Scheduled Auto-Import</h2><p>The most powerful automation runs on a schedule. Set your tool to pull the latest bank data every morning, process it against your rules, and flag only the exceptions for human review. Your team focuses on judgement calls, not data entry.</p><h2>Getting Started</h2><p>Our Tally Automation software implements all five of these strategies in a single Windows application. It works offline, requires no internet after setup, and integrates directly with your existing Tally Prime installation. Over 500 CA firms across India have already made the switch.</p>',
                'published_at' => now()->subDays(2),
            ],
            [
                'title'       => 'Why CA Firms Need Custom Software in 2026',
                'slug'        => 'why-ca-firms-need-custom-software-2026',
                'excerpt'     => 'Generic practice management tools weren\'t built for Indian CA firms. Here\'s why custom software gives you a competitive edge in 2026 and beyond.',
                'category_id' => $biz->id,
                'body'        => '<h2>The One-Size-Fits-All Problem</h2><p>Most practice management software on the market was designed for Western accounting firms — firms that operate under entirely different regulatory frameworks, client relationships, and workflow patterns than Indian CA firms.</p><p>The result? Indian CAs spend significant time and money on workarounds. Custom fields hacked into the wrong places. Spreadsheets running parallel to the official system. Manual processes that exist purely because the software doesn\'t understand Indian tax law.</p><h2>What Custom Software Actually Means</h2><p>Custom software doesn\'t necessarily mean building from scratch. It means starting with your specific workflows and building outward — not buying a generic tool and hoping your workflows will eventually fit it.</p><p>A custom solution for a CA firm might include: a client portal integrated with your exact document checklist, automated compliance calendars tied to Indian tax deadlines, or a billing system that understands the nuances of retainer vs. project billing common in Indian practice.</p><h2>The ROI Calculation</h2><p>The typical mid-size CA firm with 20 staff and 200 clients spends approximately 15-20% of billable hours on non-billable administrative work. Custom software that reduces this by half pays for itself within 6-12 months.</p><p>Beyond pure efficiency, custom software enables you to offer services your competitors cannot — faster turnaround, real-time client dashboards, and audit trails that satisfy even the most demanding clients.</p><h2>Where to Start</h2><p>The best custom software projects start with a workflow audit. Document your top 5 most time-consuming processes, identify which are repetitive and rule-based (automation candidates), and which require genuine human judgement. Build first for the repetitive work.</p><p>MSI Analytics specializes in building custom software for professional services firms. Our discovery process helps you identify exactly where technology will deliver the highest return.</p>',
                'published_at' => now()->subDays(5),
            ],
            [
                'title'       => 'Web vs Mobile App: What Does Your Business Need?',
                'slug'        => 'web-vs-mobile-app-what-does-your-business-need',
                'excerpt'     => 'Should you build a web app, a mobile app, or both? The answer depends on your users, your budget, and your growth plans. Here\'s a practical guide.',
                'category_id' => $dev->id,
                'body'        => '<h2>The Question Every Founder Asks</h2><p>It\'s one of the first decisions in any software project: web app, mobile app, or both? Each has genuine advantages, and the right answer depends entirely on your specific situation — not on what\'s trendy.</p><h2>When to Build a Web App First</h2><p>Web apps are the right starting point for most B2B software. Your users are at desks, they\'re comfortable with browsers, and a web app is accessible on any device without an app store submission. Development is typically faster and more cost-effective, and updates deploy instantly.</p><p>If your core use case involves data entry, reporting, dashboards, or document management, a well-built web app will serve you well for years. Tools like Google Docs, Notion, and QuickBooks are primarily web apps — and they\'re used by millions daily.</p><h2>When Mobile is Essential</h2><p>Mobile apps shine when your users are on the move. Field service teams, delivery drivers, sales reps doing on-site visits, or anyone who needs to work offline — these are mobile-first use cases. Mobile apps also unlock device capabilities: camera, GPS, push notifications, and biometric authentication.</p><p>Consumer-facing apps in particular often need a native mobile experience to compete. Users expect apps for food ordering, fitness, payments, and social media to be native mobile experiences.</p><h2>The Progressive Web App Middle Ground</h2><p>Progressive Web Apps (PWAs) offer a compelling compromise. A PWA is a web application that can be installed on a mobile device, works offline, and can send push notifications — but is built with standard web technologies. For many businesses, a PWA eliminates the need for separate iOS and Android development.</p><h2>Budget Considerations</h2><p>Native mobile development (iOS + Android separately) typically costs 2-3x more than a web app of equivalent complexity. React Native and Flutter offer cross-platform development at roughly 1.5x the cost of web. Budget for ongoing maintenance — mobile apps require updates every 6-12 months just to maintain compatibility.</p><h2>Our Recommendation</h2><p>Start with a web app. Validate your product with real users. When mobile-specific features become essential to your core value proposition, add mobile. Most successful software products followed this path.</p>',
                'published_at' => now()->subDays(8),
            ],
            [
                'title'       => 'The Real Cost of Manual Bookkeeping',
                'slug'        => 'real-cost-of-manual-bookkeeping',
                'excerpt'     => 'Manual bookkeeping looks cheap on the surface. But when you add up errors, time, compliance risk, and opportunity cost — the real price tag is shocking.',
                'category_id' => $tally->id,
                'body'        => '<h2>The Hidden Invoice</h2><p>When business owners think about bookkeeping costs, they think about what they pay their accountant or bookkeeper per month. That\'s the visible cost. The invisible costs are typically 3-5x larger.</p><h2>Time is Money — Literally</h2><p>A study by ACCA found that small businesses in South Asia spend an average of 42 hours per month on manual financial administration. At even a conservative professional rate, that\'s substantial money in pure time cost — every single month. For a CA firm processing multiple clients, multiply accordingly.</p><p>The opportunity cost matters too: those 42 hours could be spent on billable work, client acquisition, or service development. Manual bookkeeping doesn\'t just cost money — it costs growth.</p><h2>Error Rates and Reconciliation</h2><p>Manual data entry has a well-documented error rate of approximately 1% per field. For a business processing 500 transactions per month, that\'s 5 errors — every month. Each error requires discovery, investigation, and correction. A single reconciliation error found late can take 2-4 hours to trace and fix.</p><p>Multiply the error rate by the time to fix each error, and you\'ll find that error correction alone can consume 8-12 hours per month in a mid-size operation.</p><h2>Compliance Risk</h2><p>GST filing errors carry penalties starting at ₹200 per day. TDS filing errors attract interest at 1.5% per month. Income tax assessment disputes triggered by bookkeeping errors can result in penalties of 50-200% of the tax shortfall.</p><p>Manual bookkeeping doesn\'t just cost time — it creates regulatory exposure that can dwarf the entire cost of a year\'s bookkeeping in a single notice.</p><h2>The Automation Alternative</h2><p>Modern bookkeeping automation doesn\'t replace your accountant — it replaces the repetitive, rule-based data entry work that consumes their time and invites errors. With the right tools, your accountant spends their expertise on analysis and planning, not typing.</p><p>The typical automation ROI for a CA firm processing 5+ clients: 60-70% reduction in data entry time, near-zero entry errors, and complete audit trails that satisfy GST scrutiny. The software pays for itself within 3-4 months in most implementations.</p>',
                'published_at' => now()->subDays(12),
            ],
            [
                'title'       => 'How AI is Transforming Small Business Operations',
                'slug'        => 'how-ai-is-transforming-small-business-operations',
                'excerpt'     => 'AI is no longer reserved for large enterprises. Small businesses across India are already using AI tools to compete, automate, and grow. Here\'s what\'s actually working.',
                'category_id' => $dev->id,
                'body'        => '<h2>AI Has Crossed the Threshold</h2><p>Two years ago, practical AI for small business meant little more than chatbots and spam filters. Today, it means intelligent document processing, predictive analytics accessible via API, automated customer service, and business intelligence that previously required a dedicated data team.</p><p>The change happened fast, and many small business owners haven\'t caught up yet. Those who have are building real competitive advantages.</p><h2>Document Processing</h2><p>AI-powered document processing is one of the highest-ROI applications for small businesses. Invoice extraction, bank statement parsing, identity document verification, and contract analysis — tasks that previously required manual reading — can now be automated with accuracy exceeding 95%.</p><p>For an accounting firm, this means bank statements go from PDF to structured data automatically. For a legal firm, contract review time drops by 70%. For a logistics company, delivery receipts are processed in seconds instead of hours.</p><h2>Customer Service Automation</h2><p>Modern AI assistants can handle 60-80% of standard customer enquiries without human intervention. They answer questions about pricing, availability, order status, and business hours — correctly, instantly, and at 3am if needed.</p><p>The key is deployment: an AI assistant embedded in your website or WhatsApp can capture leads even when your team is unavailable, qualify them based on their questions, and escalate only the serious ones to your sales team.</p><h2>Predictive Analytics</h2><p>Small businesses now have access to prediction APIs that previously cost enterprise budgets. Sales forecasting, inventory optimization, churn prediction, and demand planning are within reach for businesses processing as few as 500 transactions per month.</p><p>One of our clients — a consumer goods distributor — reduced their stock-out incidents by 40% using a simple demand prediction model built on 18 months of their own sales data. The model runs on commodity cloud infrastructure for less than ₹2,000 per month.</p><h2>Where to Start</h2><p>The best AI implementations start with one specific problem that currently consumes significant time or money. Don\'t try to "do AI" — try to solve one painful problem with AI assistance. Once that works and your team trusts it, expand.</p><p>MSI Analytics helps small and medium businesses identify AI opportunities and implement practical solutions that deliver measurable results within 60-90 days. If you\'re curious where AI could help your business, start with a conversation.</p>',
                'published_at' => now()->subDays(18),
            ],
        ];

        foreach ($posts as $postData) {
            BlogPost::updateOrCreate(
                ['slug' => $postData['slug']],
                array_merge($postData, [
                    'author_id' => $admin->id,
                    'status'    => 'published',
                ])
            );
        }
    }
}
