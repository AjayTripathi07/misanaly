<?php
namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceFeature;
use App\Models\ServiceProcessStep;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug'           => 'website-development',
                'name'           => 'Website Development',
                'tagline'        => 'Stunning websites that drive results',
                'description'    => 'We design and develop high-performance websites tailored to your business goals. From corporate portals to e-commerce platforms, our solutions combine modern aesthetics with powerful functionality to convert visitors into customers.',
                'icon'           => 'Globe',
                'starting_price' => '₹15,000',
                'sort_order'     => 1,
                'features'       => [
                    ['title' => 'Responsive Design', 'description' => 'Mobile-first websites that look perfect on every device, from smartphones to desktops.', 'icon' => 'Smartphone'],
                    ['title' => 'SEO Optimised', 'description' => 'Built with search engine best practices to help you rank higher and attract organic traffic.', 'icon' => 'TrendingUp'],
                    ['title' => 'Fast & Secure', 'description' => 'Optimised performance with SSL, CDN integration, and best-in-class security hardening.', 'icon' => 'Shield'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Discovery & Planning', 'description' => 'We analyse your business goals, target audience, and competitors to craft a strategic plan.'],
                    ['step_number' => 2, 'title' => 'Design & Prototyping', 'description' => 'Our designers create wireframes and visual mockups for your approval before development begins.'],
                    ['step_number' => 3, 'title' => 'Development & Testing', 'description' => 'We build your website using modern frameworks and rigorously test across all devices and browsers.'],
                    ['step_number' => 4, 'title' => 'Launch & Support', 'description' => 'We deploy your site, provide training, and offer ongoing maintenance to keep it running smoothly.'],
                ],
            ],
            [
                'slug'           => 'mobile-app-development',
                'name'           => 'Mobile App Development',
                'tagline'        => 'Native & cross-platform apps users love',
                'description'    => 'From idea to App Store, we build intuitive iOS and Android applications that deliver exceptional user experiences. Our agile development process ensures your app is delivered on time, within budget, and built to scale.',
                'icon'           => 'Smartphone',
                'starting_price' => '₹50,000',
                'sort_order'     => 2,
                'features'       => [
                    ['title' => 'iOS & Android', 'description' => 'Native and cross-platform apps built with React Native and Flutter for maximum reach.', 'icon' => 'Layers'],
                    ['title' => 'Offline Support', 'description' => 'Apps that work seamlessly without internet connectivity using smart local caching.', 'icon' => 'WifiOff'],
                    ['title' => 'Push Notifications', 'description' => 'Engage users with targeted push notifications to drive retention and conversions.', 'icon' => 'Bell'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Requirements Analysis', 'description' => 'We document every feature and user flow to eliminate ambiguity before writing a single line of code.'],
                    ['step_number' => 2, 'title' => 'UI/UX Design', 'description' => 'Pixel-perfect designs following platform-specific human interface guidelines for a native feel.'],
                    ['step_number' => 3, 'title' => 'Development & QA', 'description' => 'Iterative sprints with continuous testing on real devices to catch bugs early.'],
                    ['step_number' => 4, 'title' => 'App Store Submission', 'description' => 'We handle the submission process for both Google Play and Apple App Store on your behalf.'],
                ],
            ],
            [
                'slug'           => 'custom-software-development',
                'name'           => 'Custom Software Development',
                'tagline'        => 'Software engineered precisely for your business',
                'description'    => 'Off-the-shelf software rarely fits perfectly. We build custom solutions—ERP systems, CRMs, workflow automation tools—that align precisely with your processes, eliminating workarounds and boosting team productivity.',
                'icon'           => 'Code2',
                'starting_price' => '₹75,000',
                'sort_order'     => 3,
                'features'       => [
                    ['title' => 'Scalable Architecture', 'description' => 'Solutions designed to grow with your business, from 10 to 10,000 users without a rewrite.', 'icon' => 'ArrowUpRight'],
                    ['title' => 'Third-party Integrations', 'description' => 'Seamless connections with your existing tools—payment gateways, ERPs, CRMs, and APIs.', 'icon' => 'Plug'],
                    ['title' => 'Role-based Access', 'description' => 'Granular permission systems ensuring the right people access the right data.', 'icon' => 'Lock'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Business Analysis', 'description' => 'Deep dive into your workflows to identify pain points and automation opportunities.'],
                    ['step_number' => 2, 'title' => 'System Design', 'description' => 'Architecture planning including database design, API contracts, and technology stack selection.'],
                    ['step_number' => 3, 'title' => 'Agile Development', 'description' => 'Two-week sprints with regular demos so you always know exactly where the project stands.'],
                    ['step_number' => 4, 'title' => 'Deployment & Training', 'description' => 'Production deployment with comprehensive documentation and staff training sessions.'],
                ],
            ],
            [
                'slug'           => 'ai-ml-solutions',
                'name'           => 'AI/ML Solutions',
                'tagline'        => 'Intelligent systems that learn and adapt',
                'description'    => 'Harness the power of artificial intelligence and machine learning to automate decisions, uncover hidden insights, and create personalised experiences. We build production-ready AI models that deliver measurable business value.',
                'icon'           => 'Brain',
                'starting_price' => '₹1,00,000',
                'sort_order'     => 4,
                'features'       => [
                    ['title' => 'Predictive Analytics', 'description' => 'Forecast sales, demand, and churn with models trained on your historical data.', 'icon' => 'BarChart2'],
                    ['title' => 'NLP & Chatbots', 'description' => 'Intelligent conversational agents and document processing powered by large language models.', 'icon' => 'MessageSquare'],
                    ['title' => 'Computer Vision', 'description' => 'Image recognition, object detection, and visual inspection systems for industrial applications.', 'icon' => 'Eye'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Data Assessment', 'description' => 'Evaluate data quality, volume, and structure to determine model feasibility.'],
                    ['step_number' => 2, 'title' => 'Model Development', 'description' => 'Train, validate, and fine-tune models using your domain-specific datasets.'],
                    ['step_number' => 3, 'title' => 'Integration & Testing', 'description' => 'Embed the model into your existing systems via REST APIs with A/B testing frameworks.'],
                    ['step_number' => 4, 'title' => 'Monitoring & Retraining', 'description' => 'Continuous model performance monitoring with automated retraining pipelines.'],
                ],
            ],
            [
                'slug'           => 'api-development-integration',
                'name'           => 'API Development & Integration',
                'tagline'        => 'Connect your systems, amplify your data',
                'description'    => 'Modern businesses run on connected systems. We design RESTful and GraphQL APIs that are secure, well-documented, and built for performance. We also integrate third-party services like payment gateways, SMS providers, and cloud platforms.',
                'icon'           => 'Network',
                'starting_price' => '₹20,000',
                'sort_order'     => 5,
                'features'       => [
                    ['title' => 'RESTful & GraphQL', 'description' => 'Standards-compliant APIs with comprehensive Swagger/OpenAPI documentation.', 'icon' => 'FileCode'],
                    ['title' => 'Secure by Default', 'description' => 'OAuth 2.0, JWT authentication, rate limiting, and input validation out of the box.', 'icon' => 'ShieldCheck'],
                    ['title' => 'Webhook Support', 'description' => 'Real-time event notifications to keep all your systems in perfect sync.', 'icon' => 'Zap'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'API Design', 'description' => 'Define endpoints, data models, and authentication strategy before writing code.'],
                    ['step_number' => 2, 'title' => 'Development', 'description' => 'Build with versioning, pagination, and error handling following RFC standards.'],
                    ['step_number' => 3, 'title' => 'Testing & Documentation', 'description' => 'Automated test suites and interactive API documentation for your developers.'],
                    ['step_number' => 4, 'title' => 'Deployment & Monitoring', 'description' => 'Production rollout with uptime monitoring, alerting, and performance dashboards.'],
                ],
            ],
            [
                'slug'           => 'ui-ux-design',
                'name'           => 'UI/UX Design',
                'tagline'        => 'Experiences that delight and convert',
                'description'    => 'Good design is good business. Our UI/UX team creates data-driven interfaces that reduce friction, increase engagement, and drive conversions. From user research to high-fidelity prototypes, we make digital products people love to use.',
                'icon'           => 'Palette',
                'starting_price' => '₹25,000',
                'sort_order'     => 6,
                'features'       => [
                    ['title' => 'User Research', 'description' => 'Interviews, surveys, and usability testing to ground every design decision in real user behaviour.', 'icon' => 'Users'],
                    ['title' => 'Design Systems', 'description' => 'Scalable component libraries and style guides that keep your product consistent at any size.', 'icon' => 'Layout'],
                    ['title' => 'Interactive Prototypes', 'description' => 'Clickable Figma prototypes that let stakeholders experience the product before it is built.', 'icon' => 'MousePointer'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Research & Discovery', 'description' => 'User interviews, competitive analysis, and heuristic evaluation of existing interfaces.'],
                    ['step_number' => 2, 'title' => 'Information Architecture', 'description' => 'Sitemap and user flow mapping to ensure intuitive navigation and task completion.'],
                    ['step_number' => 3, 'title' => 'Wireframing & Prototyping', 'description' => 'Low-fidelity wireframes evolving into high-fidelity interactive prototypes for validation.'],
                    ['step_number' => 4, 'title' => 'Handoff & Support', 'description' => 'Developer-ready design specs with assets, animations, and responsive breakpoints.'],
                ],
            ],
            [
                'slug'           => 'cloud-solutions-devops',
                'name'           => 'Cloud Solutions / DevOps',
                'tagline'        => 'Scalable infrastructure, zero downtime',
                'description'    => 'Modernise your infrastructure with cloud-native architectures on AWS, GCP, or Azure. Our DevOps engineers automate deployments, reduce release cycles, and build self-healing systems so your team can focus on shipping features.',
                'icon'           => 'Cloud',
                'starting_price' => '₹40,000',
                'sort_order'     => 7,
                'features'       => [
                    ['title' => 'CI/CD Pipelines', 'description' => 'Automated build, test, and deployment pipelines that ship code multiple times a day safely.', 'icon' => 'GitBranch'],
                    ['title' => 'Container Orchestration', 'description' => 'Docker and Kubernetes-based deployments for consistent, scalable application delivery.', 'icon' => 'Box'],
                    ['title' => 'Cost Optimisation', 'description' => 'Right-sizing, reserved instances, and FinOps practices to cut cloud bills by up to 40%.', 'icon' => 'DollarSign'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Infrastructure Audit', 'description' => 'Assess current setup for security vulnerabilities, cost inefficiencies, and scalability gaps.'],
                    ['step_number' => 2, 'title' => 'Architecture Design', 'description' => 'Design cloud-native architecture with high availability, disaster recovery, and auto-scaling.'],
                    ['step_number' => 3, 'title' => 'Migration & Automation', 'description' => 'Lift-and-shift or re-platforming with infrastructure-as-code using Terraform and Ansible.'],
                    ['step_number' => 4, 'title' => 'Monitoring & Optimisation', 'description' => 'Set up observability stack with alerts, runbooks, and monthly cost optimisation reviews.'],
                ],
            ],
            [
                'slug'           => 'maintenance-support',
                'name'           => 'Maintenance & Support',
                'tagline'        => 'Keep your digital assets running at peak performance',
                'description'    => 'Technology needs ongoing care. Our maintenance plans cover security updates, performance monitoring, bug fixes, and feature enhancements—giving you peace of mind while we handle the technical heavy lifting.',
                'icon'           => 'Wrench',
                'starting_price' => '₹5,000/mo',
                'sort_order'     => 8,
                'features'       => [
                    ['title' => '24/7 Monitoring', 'description' => 'Uptime monitoring with instant alerts and automated recovery for critical services.', 'icon' => 'Activity'],
                    ['title' => 'Security Patches', 'description' => 'Proactive vulnerability scanning and patch management to keep threats at bay.', 'icon' => 'ShieldAlert'],
                    ['title' => 'SLA-backed Response', 'description' => 'Guaranteed response times from 1 hour for critical issues to 24 hours for minor requests.', 'icon' => 'Clock'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Onboarding', 'description' => 'Access handover, documentation review, and baseline performance benchmarking.'],
                    ['step_number' => 2, 'title' => 'Monitoring Setup', 'description' => 'Configure alerts, dashboards, and automated health checks across all your systems.'],
                    ['step_number' => 3, 'title' => 'Proactive Maintenance', 'description' => 'Scheduled updates, backups, and performance tuning to prevent issues before they occur.'],
                    ['step_number' => 4, 'title' => 'Monthly Reporting', 'description' => 'Detailed reports on uptime, incidents, changes made, and recommendations for improvement.'],
                ],
            ],
            [
                'slug'           => 'custom-support',
                'name'           => 'Custom Support',
                'tagline'        => 'Tailored assistance exactly when you need it',
                'description'    => 'Every business has unique support needs. Whether you need dedicated on-site engineers, extended hours coverage, or specialised technical expertise for a specific platform, we craft a bespoke support arrangement that fits your operations.',
                'icon'           => 'HeadphonesIcon',
                'starting_price' => 'Contact us',
                'sort_order'     => 9,
                'features'       => [
                    ['title' => 'Dedicated Engineer', 'description' => 'A named technical contact who understands your systems deeply and prioritises your tickets.', 'icon' => 'UserCheck'],
                    ['title' => 'Flexible Hours', 'description' => 'Support windows customised to your business hours, including nights and weekends.', 'icon' => 'Calendar'],
                    ['title' => 'Multi-platform', 'description' => 'Coverage for web, mobile, cloud, and on-premise systems under a single support agreement.', 'icon' => 'Monitor'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Needs Assessment', 'description' => 'Understand your team structure, systems landscape, and critical support requirements.'],
                    ['step_number' => 2, 'title' => 'Plan Design', 'description' => 'Craft a bespoke SLA with agreed response times, escalation paths, and service scope.'],
                    ['step_number' => 3, 'title' => 'Team Assignment', 'description' => 'Assign dedicated engineers with domain expertise in your specific technology stack.'],
                    ['step_number' => 4, 'title' => 'Continuous Improvement', 'description' => 'Regular reviews to refine the support model as your business needs evolve.'],
                ],
            ],
            [
                'slug'           => 'enterprise-applications',
                'name'           => 'Enterprise Applications',
                'tagline'        => 'Mission-critical systems built for the long run',
                'description'    => 'Large organisations need software that handles complexity at scale. We develop enterprise-grade applications—ERP modules, supply chain systems, HRMS platforms, and business intelligence tools—with the robustness, security, and compliance your organisation demands.',
                'icon'           => 'Building2',
                'starting_price' => '₹2,00,000',
                'sort_order'     => 10,
                'features'       => [
                    ['title' => 'Multi-tenant Architecture', 'description' => 'Serve multiple business units or clients from a single, isolated, and configurable platform.', 'icon' => 'Server'],
                    ['title' => 'Compliance Ready', 'description' => 'Built with GDPR, ISO 27001, and industry-specific regulatory requirements in mind.', 'icon' => 'FileCheck'],
                    ['title' => 'Advanced Reporting', 'description' => 'Embedded BI dashboards with drill-down analytics and scheduled report distribution.', 'icon' => 'PieChart'],
                ],
                'steps' => [
                    ['step_number' => 1, 'title' => 'Enterprise Discovery', 'description' => 'Stakeholder interviews, process mapping, and gap analysis against current systems.'],
                    ['step_number' => 2, 'title' => 'Solution Architecture', 'description' => 'Design scalable, secure architecture with integration blueprints for existing enterprise systems.'],
                    ['step_number' => 3, 'title' => 'Phased Development', 'description' => 'Structured release plan with pilot deployment, UAT, and phased rollout across departments.'],
                    ['step_number' => 4, 'title' => 'Enterprise Support', 'description' => 'Dedicated account manager, on-site training, and premium SLA for business-critical uptime.'],
                ],
            ],
        ];

        foreach ($services as $data) {
            $features = $data['features'];
            $steps = $data['steps'];
            unset($data['features'], $data['steps']);

            $service = Service::updateOrCreate(['slug' => $data['slug']], $data);

            foreach ($features as $i => $feature) {
                ServiceFeature::updateOrCreate(
                    ['service_id' => $service->id, 'title' => $feature['title']],
                    array_merge($feature, ['sort_order' => $i + 1]),
                );
            }

            foreach ($steps as $step) {
                ServiceProcessStep::updateOrCreate(
                    ['service_id' => $service->id, 'step_number' => $step['step_number']],
                    $step,
                );
            }
        }
    }
}
