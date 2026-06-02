// Site configuration
export const site = {
  title: '课程网站',
  description: '基于 Astro 的课程内容管理系统',
  lang: 'zh-CN',
  separator: ' - ',
} as const;

// Course information
export const courseInfo = {
  name: '课程',
  subtitle: '专业必修/选修课',
  description: '在这里填写课程的简要描述，介绍课程目标、适用人群和学习成果。',
  textbook: '《示例教材》(出版社)',
  prerequisites: '计算机基础、程序设计入门',
  assessment: '出勤(10%) + 平时(30%) + 期末(60%)',
} as const;

// Home page actions
export const homeActions = {
  primary: { label: '开始学习', href: '/lectures' },
  secondary: { label: '查看大纲', href: '/syllabus' },
} as const;

// Navigation
export const mainNavItems = [
  { label: '首页', href: '/' },
  { label: '课程大纲', href: '/syllabus' },
  { label: '课程', href: '/lectures' },
  { label: '作业', href: '/assignments' },
  { label: '知识图谱', href: '/concept-map' },
  { label: '自我检测', href: '/self-check' },
] as const;

export const footerConfig = {
  text: '课程 - 专业必修/选修课',
  copyright: '课程',
} as const;

export const pageTitles = {
  home: '首页',
  lectures: '课程列表',
  assignments: '作业',
  syllabus: '课程大纲',
  conceptMap: '知识图谱',
  selfCheck: '自我检测',
} as const;

// Course modules
export const courseModules = [
  { name: '基础入门', description: '课程介绍、环境搭建、开发工具' },
  { name: '核心概念', description: '响应式设计、组件化思想、现代前端开发流程' },
] as const;

export const moduleNames = courseModules.map(m => m.name);

// Content defaults
export const contentDefaults = {
  duration: '90分钟',
  submissionFormat: '学号-HWxx.zip',
} as const;

// Labels
export const labels = {
  viewAll: '查看全部 →',
  viewDetails: '查看详情 →',
  viewLecture: '查看 →',
  back: '← 返回',
  previous: '上一讲',
  next: '下一讲',
  none: '没有了',
  markComplete: '标记为已完成',
  completed: '已完成',
  slides: '课件',
  assignment: '作业',
} as const;

export const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
} as const;

// Section labels
export const lectureLabels = {
  sectionTitle: '课程列表',
  contentSectionTitle: '课程内容',
  countSuffix: '讲课程',
  moduleCountTemplate: '包含 {count} 讲课程',
  hasSlidesBadge: '有课件',
  hasAssignmentBadge: '有作业',
  slidevBanner: '本讲提供 Slidev 在线课件',
  relatedAssignment: '课后作业',
} as const;

export const assignmentLabels = {
  pageTitle: '课程作业',
  submissionFormat: '作业提交格式：学号-HWxx.zip',
  requirementsTitle: '作业要求',
  requirements: [
    '作业文件命名格式：学号-HWxx.zip',
    '提交截止日期前完成，逾期提交将酌情扣分',
    '代码需包含必要的注释和说明文档',
  ],
  downloadButton: '下载作业文件',
} as const;

export const syllabusLabels = {
  objectivesTitle: '课程目标',
  modulesTitle: '模块划分',
  scheduleTitle: '详细安排',
  courseRangeLabel: '课程范围:',
  lectureRangeTemplate: '第{start}-{end}讲',
} as const;

export const infoSectionLabels = {
  courseInfoTitle: '课程信息',
  textbookLabel: '教材',
  prerequisitesLabel: '先修课程',
  assessmentLabel: '考核方式',
} as const;

export const tocConfig = {
  title: '本页目录',
} as const;

// Course objectives (for syllabus)
export const courseObjectives = [
  '掌握现代前端开发的核心概念和技术栈',
  '熟练使用主流前端框架进行项目开发',
  '理解响应式设计和组件化开发思想',
  '具备独立分析和解决前端问题的能力',
] as const;

export const categoryLabels: Record<string, string> = {
  lectures: '讲义',
  assignments: '作业',
  pages: '页面',
};

export const searchLabels = {
  untitled: '无标题',
} as const;

// Progress
export const progressLabels = {
  label: '学习进度',
} as const;

// Search
export const searchConfig = {
  placeholder: '搜索课程内容...',
  emptyState: '输入关键词开始搜索...',
  noResults: '未找到相关结果',
} as const;
