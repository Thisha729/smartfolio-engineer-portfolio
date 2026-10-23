export const personalInfo = {
  name: 'Engineer Techno Professional',
  title: 'Full Stack Engineer',
  tagline: 'Engineering Smart Solutions with Cutting-Edge Technology',
  email: 'contact@engtech.pro',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  resumeUrl: '#',
  bio: `A dedicated Engineering & Technology Professional with 5+ years of experience 
  delivering high-performance digital solutions. Specialized in modern web architectures, 
  scalable systems, and transforming complex challenges into elegant technical products.`,
  about: [
    'A results-driven engineer with a Computer Science background, experienced across both startups and enterprise-level organizations.',
    'Passionate about crafting clean, maintainable code and building systems that scale — from prototype to production.',
    'Committed to continuous learning, open-source contribution, and empowering the next generation of engineers.',
  ],
}

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 95 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'Next.js', level: 82 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 80 },
      { name: 'REST APIs', level: 92 },
      { name: 'GraphQL', level: 75 },
      { name: 'PostgreSQL', level: 82 },
    ],
  },
  {
    category: 'Tools & Cloud',
    items: [
      { name: 'AWS', level: 78 },
      { name: 'Docker', level: 82 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Linux / Bash', level: 85 },
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Engineer Techno Portfolio',
    description:
      'This very portfolio website — built with React, Vite, Framer Motion. Features live map contact, blog, newsletter, animated skills, and a dark navy design system.',
    tech: ['React', 'Vite', 'Framer Motion', 'CSS Modules', 'OpenStreetMap'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: true,
    image: 'project1',
    category: 'Portfolio',
    highlights: [
      'Built entirely with React 18 + Vite for blazing fast performance',
      'Framer Motion animations on every section with scroll-triggered effects',
      'Live OpenStreetMap geocoding in the contact form',
      'Fully responsive — works on mobile, tablet, and desktop',
    ],
  },
  {
    id: 2,
    title: 'CloudSync Dashboard',
    description:
      'A real-time cloud infrastructure monitoring dashboard with live metrics, WebSocket alerts, and automated PDF reporting for DevOps teams.',
    tech: ['React', 'Node.js', 'WebSockets', 'AWS', 'PostgreSQL', 'Chart.js'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: true,
    image: 'project2',
    category: 'Full Stack',
    highlights: [
      'Real-time WebSocket data streaming for 50+ cloud metrics',
      'Automated alerts when CPU, memory or latency exceed thresholds',
      'Role-based access control with JWT authentication',
      'PDF report generation with scheduled email delivery',
    ],
  },
  {
    id: 3,
    title: 'DevCollab Platform',
    description:
      'A collaborative dev platform for teams to share code snippets, review pull requests inline, and track sprint progress — all in one place.',
    tech: ['Next.js', 'TypeScript', 'GraphQL', 'MongoDB', 'Docker', 'Redis'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: true,
    image: 'project3',
    category: 'SaaS',
    highlights: [
      'GraphQL API with real-time subscriptions for live collaboration',
      'Syntax-highlighted code review with inline comments',
      'Kanban sprint board with drag-and-drop task management',
      'Docker-based deployment with Redis caching layer',
    ],
  },
  {
    id: 4,
    title: 'SmartAPI Gateway',
    description:
      'Production-grade API gateway with rate limiting, response caching, JWT auth middleware, and a real-time request analytics dashboard.',
    tech: ['Node.js', 'Redis', 'Express', 'JWT', 'Nginx', 'Prometheus'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: true,
    image: 'project4',
    category: 'Backend',
    highlights: [
      'Handles 10,000+ requests per second with sub-10ms latency',
      'Intelligent rate limiting per API key with Redis TTL',
      'Prometheus metrics endpoint for Grafana dashboards',
      'Zero-downtime deployments with Nginx upstream switching',
    ],
  },
  {
    id: 5,
    title: 'TaskFlow — AI Kanban',
    description:
      'A Kanban productivity app with drag-and-drop boards, AI task prioritization using OpenAI, and real-time team collaboration features.',
    tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI', 'Socket.io'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: false,
    image: 'project5',
    category: 'Full Stack',
    highlights: [
      'AI-powered task prioritization using GPT-4 API',
      'Real-time drag-and-drop with conflict resolution via Socket.io',
      'Sprint velocity tracking with burndown chart analytics',
      'Google OAuth + email/password authentication',
    ],
  },
  {
    id: 6,
    title: 'E-Commerce Engine',
    description:
      'Headless e-commerce backend with full product catalog, Stripe payments, inventory management, and an order tracking system.',
    tech: ['Node.js', 'Stripe', 'MongoDB', 'Redis', 'Docker', 'SendGrid'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: false,
    image: 'project6',
    category: 'Backend',
    highlights: [
      'Stripe payment processing with webhook event handling',
      'Redis-powered cart sessions and product recommendation cache',
      'Automated order confirmation emails via SendGrid',
      'Admin dashboard for inventory and order management',
    ],
  },
  {
    id: 7,
    title: 'ML Pipeline Toolkit',
    description:
      'Modular ML pipeline toolkit for automating data preprocessing, model training, hyperparameter tuning, and AWS SageMaker deployment.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'AWS SageMaker', 'Airflow', 'MLflow'],
    github: 'https://github.com',
    live: null,
    demo: null,
    featured: false,
    image: 'project1',
    category: 'AI / ML',
    highlights: [
      'Plug-and-play pipeline components for 10+ ML frameworks',
      'Automated hyperparameter tuning with Optuna integration',
      'MLflow experiment tracking with model versioning',
      'One-click deploy to AWS SageMaker endpoints',
    ],
  },
]

export const experience = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'TechCorp Inc.',
    period: '2022 – Present',
    description: 'Leading a team of 5 engineers building cloud-native applications serving 2M+ users.',
  },
  {
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2020 – 2022',
    description: 'Built scalable microservices and React frontends from the ground up.',
  },
  {
    role: 'Junior Developer',
    company: 'Digital Agency',
    period: '2018 – 2020',
    description: 'Developed client websites and REST APIs for various industries.',
  },
]
