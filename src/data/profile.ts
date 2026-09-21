/**
 * Single source of truth for personal info used across all pages.
 * Content source: CV (周敦奕CV-V60917.docx). Keep in sync with the CV.
 */

export const profile = {
  name: 'Dunyi Zhou',
  /** Used for the monogram placeholder until a photo is provided. */
  initials: 'DZ',
  email: '18620050413@163.com',

  /** Small-caps line above the name on the home page. */
  eyebrow: 'Wireless Communications · Time-Series Forecasting',

  /** One-line role under the name. */
  role: 'Undergraduate at Beijing University of Posts and Telecommunications (BUPT)',

  location: 'Beijing, China',

  /** Back face of the flip-card portrait (see components/Portrait.astro).
   *  Extracted from the white-background ID photo PDF; monogram stays on the front. */
  photo: '/portrait.png',

  /** Photo caption (rendered under the portrait). */
  photoCaption: 'Beijing University of Posts and Telecommunications\nBeijing, China',

  /** Full paper title — rendered in the serif display font inside the lead. */
  paperTitle: 'LPA-MoE: A Lightweight Period-Aware MoE Model for Time Series Forecasting in Data Centers',

  /** Link target for the paper title in the lead. */
  paperUrl: 'https://ieeexplore.ieee.org/document/11680246',

  /** One-sentence lead shown in the home intro (full bio lives below). */
  lead: 'I study machine learning for time-series forecasting and next-generation wireless communications. My first-author paper, LPA-MoE: A Lightweight Period-Aware MoE Model for Time Series Forecasting in Data Centers, was published at ICCC 2026, and I gained industry experience in ISAC at Zhongxing Telecommunication Equipment Corporation (ZTE).',

  bio: [
    'I am an undergraduate at BUPT pursuing a B.Eng. in Telecommunications Engineering with Management, alongside a dual degree with Queen Mary University of London (QMUL).',
    'My work centers on machine learning for time-series forecasting and next-generation wireless communications.', 
    'I am looking for postgraduate opportunities in machine learning, communications and telecommunications.'
  ],

  education: {
    degree: 'Bachelor of Engineering in Telecommunications Engineering with Management',
    school: 'Beijing University of Posts and Telecommunications (BUPT; Project 211)',
    schoolUrl: 'https://www.bupt.edu.cn/',
    note: 'Dual Degree of Engineering from Queen Mary University of London (QMUL), the United Kingdom',
    period: '09/2023-07/2027',
    gpa: 'GPA: 3.68/4.0 (89.27/100) · Ranking: Top 16% (47/293)',
    courses: [
      { name: 'Principles of Communications I', score: 98, featured: true },
      { name: 'Introduction to Electronic System', score: 98, featured: true },
      { name: 'Digital Circuit Design', score: 97, featured: true },
      { name: 'Microwave, Millimeterwave and Optical Transmission', score: 97, featured: true },
      { name: 'Machine Learning', score: 93, featured: true },
      { name: 'Digital Signal Processing', score: 93, featured: true },
      { name: 'Advanced Mathematics 1', score: 99, featured: false },
      { name: 'Linear Algebra', score: 96, featured: false },
      { name: 'Advanced Mathematics 2', score: 95, featured: false },
      { name: 'Engineering Mathematics', score: 98, featured: false },
      { name: 'Signals and Systems Theory', score: 91, featured: false },
      { name: 'Probability Theory and Stochastic Processes', score: 97, featured: false },
    ],
  },

  /** Research experience (rendered on the CV page, wording matches the CV PDF). */
  researchExperience: [
    {
      title: 'First Author, LPA-MoE: A Lightweight Period-Aware MoE Model for Time Series Forecasting in Data Centers',
      subtitle: 'Published in the 2026 IEEE/CIC International Conference on Communications in China (ICCC)',
      period: '02/2026-08/2026',
      link: { label: 'Paper', url: 'https://ieeexplore.ieee.org/document/11680246' },
      bullets: [
        'Period-Aware Modeling Paradigm: Designed a period-aware modeling paradigm tailored for data-center refrigeration scenarios, targeting multi-scale periodic patterns and heterogeneous dynamics in time-series data; integrated FFT-based periodic embedding with sparse MoE routing to explicitly decouple periodic variations and mitigate pattern interference.',
        'Feature Extraction Design: Proposed the LPA-MoE framework equipped with gated lightweight TimesBlock; adopted depthwise separable convolutions to extract fine-grained temporal and multi-scale periodic features from raw time-series data, achieving high inference efficiency and low computational overhead.',
        'Experiment Design & Performance Evaluation: Conducted model validation and comparative experiments using real-world IoT datasets from data center refrigeration units. Results showed that LPA-MoE improves prediction accuracy and stability for multi-pattern time-series data, exhibiting superior generalization performance and validating the industrial application value of MoE in energy-saving scenarios.',
      ],
    },
  ],

  researchInterests: [
    'Integrated sensing and communication (ISAC)',
    'Massive MIMO and Beamforming',
    'Machine learning for IIoT',
    'Time-series forecasting',
  ],

  skills: [
    { group: 'Machine Learning & Deep Learning', items: ['PyTorch', 'NumPy', 'Pandas', 'Matplotlib'] },
    { group: 'Wireless Communications', items: ['ISAC', 'Beamforming', 'Massive MIMO'] },
    { group: 'Programming Languages', items: ['Python', 'Java'] },
    { group: 'Tools', items: ['Claude Code', 'Git'] },
  ],

  awards: [
    {
      title: 'First Prize in the 16th National College Students Mathematical Competition (Non-Mathematics Category A)',
      issuer: 'Chinese Mathematical Society',
      date: 'Dec 2024',
    },
    {
      title: 'First Prize in the 35th Beijing College Students Mathematical Competition (Non-Mathematics Major Group A)',
      issuer: 'Beijing Mathematical Society',
      date: 'Dec 2024',
    },
    {
      title: 'Third-class Scholarship',
      issuer: 'BUPT',
      date: 'Oct 2024',
    },
  ],

  honors: [
    {
      title: "Runner-up in Men's Team Event of the 27th Chinese College Students Badminton Championship (General Group) Finals",
      issuer: 'China Student Sports Federation',
      date: 'Jan 2026',
    },
    {
      title: "Runner-up in Men's Team Event in the North Regional Tournament of the 27th Chinese College Students Badminton Championship (General Group)",
      issuer: 'China Student Sports Federation',
      date: 'Nov 2025',
    },
    {
      title: 'Fifth Place in Mixed Doubles (Group A) in the 33rd Capital College Badminton Championship (Individual Events)',
      issuer: 'Beijing College Students Sports Association',
      date: 'May 2025',
    },
    {
      title: 'Activist in Literature, Sports, and Extracurricular Activities',
      issuer: 'BUPT',
      date: 'Oct 2024',
    },
  ],

  other: [
    { label: 'Standardized Test', value: 'IELTS 7.0 (Listening 8.5 Reading 7.0 Writing 6.0 Speaking 6.0)', date: 'Apr 2026' },
    { label: 'Extracurricular Activity', value: 'Participated in various volunteer services, such as receiving alumni for the celebration of the university anniversary, and serving as a referee in the badminton competition', date: '' },
  ],

  /** Extra links in the intro / footer. Add GitHub etc. when available. */
  links: [] as { label: string; url: string; icon?: string }[],
};

export const site = {
  title: 'Dunyi Zhou',
  description:
    'Dunyi Zhou is an undergraduate at BUPT working on efficient deep learning for time-series forecasting and next-generation wireless systems.',
  url: 'https://rubbermanzdy.github.io',
  copyright: `© ${new Date().getFullYear()} Dunyi Zhou`,
};
