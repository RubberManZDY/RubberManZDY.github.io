/**
 * Single source of truth for personal info used across all pages.
 * Content source: CV (周敦奕CV-V60917.docx). Keep in sync with the CV.
 */

export const profile = {
  name: 'Dunyi Zhou',
  /** Used for the monogram placeholder until a photo is provided. */
  initials: 'DZ',
  email: 'zdy_666@bupt.edu.cn',

  /** Small-caps line above the name on the home page. */
  eyebrow: 'Wireless Communications · Time-Series Forecasting · Efficient Deep Learning',

  /** One-line role under the name. */
  role: 'Undergraduate at Beijing University of Posts and Telecommunications (BUPT)',

  location: 'Beijing, China',

  /** Path to the portrait under /public. Empty string -> monogram placeholder.
   *  To add a photo: put it at public/portrait.jpg and set this to '/portrait.jpg'. */
  photo: '',

  /** Photo caption (rendered under the portrait). */
  photoCaption: 'Beijing University of Posts and Telecommunications\nBeijing, China',

  /** One-sentence lead shown in the home intro (full bio lives below). */
  lead: 'I study efficient deep learning for time-series forecasting and next-generation wireless systems. My first-author paper, LPA-MoE, was published at ICCC 2026, and I gained industry experience analyzing 5G-A ISAC field-test data at ZTE.',

  bio: [
    'I am an undergraduate at BUPT pursuing a B.Eng. in Telecommunications Engineering with Management, alongside a dual degree with Queen Mary University of London (QMUL). My work centers on efficient deep learning for time-series data and next-generation wireless systems.',
    'My first-author paper, LPA-MoE, was published at the International Conference on Computer and Communications (ICCC). I also gained industry experience at ZTE, analyzing field-test data for 5G-A integrated sensing and communication (ISAC) systems. I am looking for graduate research opportunities in machine learning and wireless communications.',
  ],

  education: {
    degree: 'B.Eng. in Telecommunications Engineering with Management',
    school: 'Beijing University of Posts and Telecommunications (BUPT)',
    schoolUrl: 'https://www.bupt.edu.cn/',
    note: 'Dual B.Eng. from Queen Mary University of London (QMUL), UK',
    period: 'Sep 2023 – Jun 2027 (expected)',
    gpa: 'GPA 3.68 / 4.0 (89.27 / 100) · Top 16% (47 / 293)',
    courses: [
      { name: 'Principles of Communications I', score: 98 },
      { name: 'Introduction to Electronic System', score: 98 },
      { name: 'Digital Circuit Design', score: 97 },
      { name: 'Microwave, Millimeter-wave & Optical Transmission', score: 97 },
      { name: 'Machine Learning', score: 93 },
    ],
  },

  researchInterests: [
    'Time-series analysis & forecasting',
    'Mixture-of-Experts & efficient deep learning',
    'Integrated sensing and communication (ISAC)',
    'Wireless communications (5G-A and beyond)',
  ],

  skills: [
    { group: 'Machine Learning & Deep Learning', items: ['PyTorch', 'NumPy', 'Pandas', 'Matplotlib'] },
    { group: 'Wireless Communications', items: ['ISAC', 'Beamforming', 'Massive MIMO'] },
    { group: 'Programming Languages', items: ['Python', 'Java'] },
    { group: 'Tools', items: ['Claude Code', 'Git'] },
  ],

  awards: [
    {
      title: 'First Prize, 16th National College Students Mathematical Competition (Non-Mathematics Category A)',
      issuer: 'Chinese Mathematical Society',
      date: 'Dec 2024',
    },
    {
      title: 'First Prize, 35th Beijing College Students Mathematical Competition (Non-Mathematics Major Group A)',
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
      title: "Runner-up, Men's Team Event, 27th Chinese College Students Badminton Championship (General Group) Finals",
      issuer: 'China Student Sports Federation',
      date: 'Jan 2026',
    },
    {
      title: "Runner-up, Men's Team Event, North Regional Tournament, 27th Chinese College Students Badminton Championship (General Group)",
      issuer: 'China Student Sports Federation',
      date: 'Nov 2025',
    },
    {
      title: 'Fifth Place, Mixed Doubles (Group A), 33rd Capital College Badminton Championship',
      issuer: 'Beijing College Students Sports Association',
      date: 'May 2025',
    },
  ],

  other: [
    { label: 'Standardized Test', value: 'IELTS 7.0 (Listening 8.5 · Reading 7.0 · Writing 6.0 · Speaking 6.0)', date: 'Apr 2026' },
    { label: 'Extracurricular', value: 'Volunteer services: alumni reception for the university anniversary; referee at badminton competitions', date: '' },
  ],

  /** Extra links in the intro / footer. Add GitHub etc. when available. */
  links: [] as { label: string; url: string; icon?: string }[],
};

export const site = {
  title: 'Dunyi Zhou',
  description:
    'Dunyi Zhou is an undergraduate at BUPT working on efficient deep learning for time-series forecasting and next-generation wireless systems.',
  url: 'https://dunyi-zhou.github.io', // TODO(deploy): update with real URL
  copyright: `© ${new Date().getFullYear()} Dunyi Zhou`,
};
