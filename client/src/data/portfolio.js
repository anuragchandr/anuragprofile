// Single source of truth for the page. No phone number on purpose.
const portfolio = {
  name: 'Anurag Chandra',
  roles: ['build backend systems.', 'ship AI products.', 'design for scale.', 'solve hard problems.'],
  summary: 'ECE student at NIT Patna turning ideas into working systems: RAG pipelines, FastAPI services, and full-stack apps, from hackathon prototypes to SaaS.',
  links: { github: 'https://github.com/anuragchandr', linkedin: 'https://linkedin.com/in/anurag-chandra-a4553a317', email: 'mailto:nrgchandra@gmail.com', codechef: 'https://www.codechef.com/users/nrgchandra' },
  about: [
    "I'm a second-year Electronics & Communication student at NIT Patna who spends most of his time on the software side: backends, APIs and applied AI.",
    "I like projects with real constraints: a hackathon clock, a robot that has to report telemetry, or a support bot that must answer from a company's own knowledge base instead of guessing.",
    "I'm looking for AI/ML and backend roles where I can keep building systems that work in production.",
  ],
  stats: [
    { value: 700, suffix: '+', label: 'DSA problems solved' },
    { value: 400, suffix: '+', label: 'on LeetCode' },
    { value: 50, prefix: 'Top ', label: '5G Innovation Hackathon 2026' },
    { value: 3, label: 'major projects shipped' },
  ],
  skills: {
    Languages: ['C++', 'Python', 'JavaScript'],
    'AI / ML': ['PyTorch', 'Machine Learning', 'LLM APIs', 'RAG (pgvector)'],
    Backend: ['Node.js', 'Express', 'FastAPI', 'REST APIs'],
    Data: ['PostgreSQL', 'MongoDB'],
    Tools: ['Git', 'Docker', 'Postman', 'Next.js'],
    'Core CS': ['DSA', 'OOP', 'DBMS'],
  },
  projects: [
    { title: 'SupportAI', tag: 'B2B AI SaaS', stack: ['PostgreSQL', 'pgvector', 'RAG', 'WhatsApp'],
      github: 'https://github.com/anuragchandr/supportAI',
      demo: null,
      points: ['Solo-designed a support and lead-capture platform for SMBs: auth, knowledge base and an embeddable website chat widget.', 'Architected a pgvector RAG pipeline for the chat engine, plus a WhatsApp integration.', 'Wrote the full developer build plan and PostgreSQL schema.'] },
    { title: 'Sevasarathi', tag: '5G Innovation Hackathon 2026 · Top 50 national finalist', stack: ['Next.js', 'FastAPI', 'OpenCV', 'ROS 2'],
      github: null,
      demo: 'https://drive.google.com/file/d/1ErFxxV5CohinFhe8jFfW99ts1naSuNtr/view?usp=drive_link',
      points: ['Web portal for real-time monitoring and management of an indoor AGV fleet.', 'ROS 2-to-HTTP bridge streaming live AGV telemetry.', 'Prototyped indoor object detection for AGV navigation with OpenCV and deep learning.'] },
    { title: 'NextCall', tag: 'Full-stack', stack: ['Tracker', 'JD matching'],
      github: 'https://github.com/anuragchandr/nextCall',
      demo: null,
      points: ['Tracks job applications end to end, from submission to offer.', 'Matching engine analyses a job description and suggests tailored resume improvements.', 'Data model keeps statuses and per-job suggestion history.'] },
  ],
  journey: [
    { when: 'Dec 2025 – now', title: 'Web Team Member', place: 'Robotics Club, NIT Patna' },
    { when: 'Jul 2024 – Jun 2028', title: 'B.Tech, Electronics & Communication', place: 'NIT Patna · CGPA 7.91 (till 4th sem)' },
    { when: 'Mar 2024', title: 'Higher Secondary (Science) · 80.6%', place: 'Government Inter College, Dalmianagar' },
  ],
  achievements: [
    'Top 50 National Finalist, 5G Innovation Hackathon 2026',
    'Winner, Code the Uncoded 2024 (IEEE Student Branch, NIT Patna)',
    'Qualified the internal round of Smart India Hackathon 2025',
    '700+ DSA problems solved, 400+ on LeetCode · Qualified JEE Mains',
  ],
  certifications: ['Postman API Fundamentals Student Expert', 'AWS AI Practitioner Learning Plan', 'NPTEL: Joy of Computing using Python (Elite Gold / Topper)', 'Finishing School: 3D Printing & Additive Manufacturing'],
  chat: {
    title: 'Ask about Anurag',
    greeting: "Hi! I'm Anurag's AI assistant. Ask me about his projects, skills or experience.",
    presets: ['What is SupportAI?', 'What did he build at the 5G hackathon?', 'What is his tech stack?', 'Is he open to internships?'],
  },
};
export default portfolio;
