"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  no: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  shipped: string;
  skills: string[];
  demo: string;
  source?: string;
  image?: string;
  gallery?: string[];
  embed?: string;
  visual: string;
};

const projects: Project[] = [
  { id: "archmind", no: "01", name: "ArchMind", category: "检索增强 / 建筑知识工具", year: "2026", summary: "让建筑规范检索有出处，研究过程才接得住。", role: "产品设计、RAG 技术验证", shipped: "资料上传、向量检索、来源回溯、案例分析流程", skills: ["问题拆解", "检索评测", "信息架构"], demo: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/", image: "/projects/archmind-product-ui.png", visual: "archmind" },
  { id: "weread", no: "02", name: "WeRead AI", category: "浏览器插件 / 本地工具", year: "2026", summary: "把阅读回顾和笔记沉淀放回阅读现场。", role: "产品设计、本地工具工作流", shipped: "情节节点、阅读回顾、划线整理、Obsidian 导出", skills: ["场景建模", "插件架构", "状态设计"], demo: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/", source: "https://github.com/58wpg9fr7d-code/weread-ai-reading-assistant", image: "/projects/weread-product-page.jpg", visual: "weread" },
  { id: "jingye", no: "03", name: "静夜园", category: "叙事系统 / 最小可用版本", year: "2026", summary: "一场推理游戏，如何利用 AI 变成一套好玩的互动体验？", role: "从世界观与角色设定出发，搭建玩家端体验、线索释放和主持人流程。", shipped: "角色选择、房间进入、手机端剧情、线索解锁、线索板与主持人入口", skills: ["叙事结构", "信息分层", "视觉系统"], demo: "https://murder-mystery-studio.vercel.app/phone", image: "/projects/jingye-cover-site.jpeg", visual: "jingye" },
  { id: "workbench", no: "04", name: "个人 AI 工作台", category: "Agent 工作流 / 个人系统", year: "2026", summary: "让 AI 建议经过确认，才变成今天真正要做的事。", role: "产品架构、交互设计、脱敏 Demo", shipped: "AI 收件箱、今日安排、学习计时、完成条件", skills: ["Agent 边界", "工作流设计", "产品状态"], demo: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", source: "https://github.com/58wpg9fr7d-code/personal-ai-workbench-demo", image: "/projects/workbench-product-page.jpg", gallery: ["/projects/workbench-today.png", "/projects/workbench-inbox.png", "/projects/workbench-focus.png", "/projects/workbench-habits.png"], visual: "workbench" }
];

const profile = ["浙江大学建筑设计硕士", "建筑学背景，转向 AI 产品", "人工智能产品经理实习生，杭州"];
const softwareTools = [
  { name: "Photoshop", mark: "Ps", tone: "blue" },
  { name: "Illustrator", mark: "Ai", tone: "orange" },
  { name: "Lightroom", mark: "Lr", tone: "cyan" },
  { name: "After Effects", mark: "Ae", tone: "violet" },
  { name: "InDesign", mark: "Id", tone: "pink" },
  { name: "Figma", mark: "F", tone: "black" },
  { name: "Canva", mark: "C", tone: "canva" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), delay); return () => window.clearTimeout(timer); }, [delay]);
  return <div className={`fade-in ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDuration: "1000ms" }}>{children}</div>;
}

function AnimatedHeading() {
  const lines = ["把复杂问题，", "理成清楚的产品。"];
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), 200); return () => window.clearTimeout(timer); }, []);
  return <h1 className="animated-heading">{lines.map((line, lineIndex) => <span className="heading-line" key={line}>{[...line].map((char, charIndex) => <span key={`${line}-${charIndex}`} className="heading-char" style={{ transitionDelay: `${200 + (lineIndex * line.length + charIndex) * 30}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-18px)" }}>{char === " " ? "\u00a0" : char}</span>)}</span>)}</h1>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("archmind");
  const [menuOpen, setMenuOpen] = useState(false);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  const selectProject = (id: string) => {
    setSelectedId(id);
    setMenuOpen(false);
  };

  const moveProject = (currentId: string, direction: 1 | -1) => {
    const currentIndex = projects.findIndex((project) => project.id === currentId);
    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    selectProject(projects[nextIndex].id);
  };

  return (
    <main id="top">
      <section className="hero-reference hero-about hero-landing">
        <div className="hero-reference-inner shell">
          <nav className="topbar hero-about-nav"><a className="wordmark" href="#top">何蓬熙 <span>/ Humphcey</span></a><div className={`nav-links ${menuOpen ? "is-open" : ""}`}><a className="active" href="#profile" onClick={() => setMenuOpen(false)}>关于我</a><a href="#work" onClick={() => setMenuOpen(false)}>项目</a><a href="#contact" onClick={() => setMenuOpen(false)}>联系方式</a></div><div className="nav-actions"><a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>聊聊合作</a><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? "关闭" : "菜单"}</span><i /></button></div></nav>
          <div className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}><a href="#profile" onClick={() => setMenuOpen(false)}>关于我</a><a href="#work" onClick={() => setMenuOpen(false)}>项目</a><a href="#contact" onClick={() => setMenuOpen(false)}>联系方式</a></div>
          <div className="hero-landing-content"><div className="hero-landing-copy"><FadeIn delay={180}><div className="hero-kicker"><span>个人介绍 / 求职作品集 ↗</span><span>杭州 · 2026</span></div><h1 className="hero-landing-title">你好，我是<span>何蓬熙</span></h1><div className="hero-landing-intro"><p>浙江大学建筑设计硕士</p><p>面试方向：AI 产品经理</p><p>善于发现使用场景中的问题，整理竞品与需求，保持对市场变化的敏感，并把判断落到可验证的产品方案。</p></div><div className="hero-landing-actions"><a className="button button-light" href="#work">查看项目 <span>↗</span></a><a className="button button-outline" href="#profile">关于我 <span>↗</span></a></div></FadeIn></div><FadeIn delay={480} className="hero-landing-visual"><div className="hero-landing-photo"><img src="/profile-photo.png" alt="何蓬熙在浙江大学校园的照片" /><span>何蓬熙 / AI 产品经理</span></div><div className="hero-landing-mark">产品<br />交互<br />AI</div></FadeIn></div>
          <a className="scroll-hint" href="#work"><span>↓</span>向下浏览项目</a>
        </div>
      </section>

      <section className="work shell" id="work"><div className="section-line"><span>01 / 项目精选</span><span>四个项目，四种复杂问题</span></div><div className="project-stack">{projects.map((project) => <button type="button" key={project.id} className={`project-card ${selected.id === project.id ? "selected" : ""}`} aria-pressed={selected.id === project.id} aria-label={`查看 ${project.name} 项目拆解`} onClick={() => selectProject(project.id)} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); moveProject(project.id, 1); } if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); moveProject(project.id, -1); } }}><span className="project-number">{project.no}</span><span className="project-title"><small>{project.category}</small><strong>{project.name}</strong></span><span className="project-summary">{project.summary}</span><span className="project-year">{project.year}</span><span className="project-demo">Demo ↗</span></button>)}</div></section>

      <section className="case shell" id="case" aria-live="polite"><div className="case-visual"><div className={`visual-frame ${selected.visual}`} key={selected.id}>{selected.gallery ? <div className="workbench-gallery">{selected.gallery.map((image) => <img key={image} src={image} alt={`${selected.name}页面截图`} />)}</div> : selected.image ? <img src={selected.image} alt={`${selected.name} project`} /> : selected.embed ? <iframe src={selected.embed} title={`${selected.name}真实 Demo`} loading="lazy" /> : selected.visual === "weread" ? <><div className="mock-browser"><span className="mock-dots" /><b>微信读书</b><span className="mock-search">⌕</span></div><div className="mock-book">百年孤独<small>阅读回顾</small></div><div className="mock-side"><small>阅读记忆</small><strong>上次读到<br />第 7 章</strong><span>查看关键情节　↗</span></div></> : <><div className="mock-board"><span>AI 收件箱</span><b>今天要做的事</b><i>确认后生成任务</i><i>学习 02:30:00</i></div><div className="mock-orbit" /></>}</div><span className="visual-caption">{selected.name} / {selected.gallery ? "四个页面截图" : selected.id === "jingye" ? "游戏封面与角色设定" : selected.image ? "真实产品页面" : "真实 Demo 预览"}</span>{selected.id === "jingye" && <div className="character-strip"><figure><img src="/projects/jingye/niu-shouzhuo-folder.png" alt="角色设定图" /></figure><figure><img src="/projects/jingye/hu-mou-folder.png" alt="角色设定图" /></figure><figure><img src="/projects/jingye/zhu-ke-yan-folder.png" alt="角色设定图" /></figure><figure><img src="/projects/jingye/zhang-mo-folder.png" alt="角色设定图" /></figure><figure><img src="/projects/jingye/xiang-chen-folder.png" alt="角色设定图" /></figure></div>}</div><div className="case-copy"><div className="case-meta"><span>{selected.no} / {selected.category}</span><span>项目拆解</span></div><h2>{selected.summary}</h2><div className="case-section"><span>独立完成</span><p>{selected.role}</p></div><div className="case-section"><span>体验结构</span><p>{selected.shipped}</p></div>{selected.id === "jingye" && <div className="case-section"><span>设计判断</span><p>先让玩家进入角色，再按幕次释放信息；把复杂叙事拆成可操作的界面状态。AI 用于辅助视觉生成和素材迭代，产品结构与交互判断由本人完成。</p></div>}<div className="case-tags">{selected.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="case-actions"><a href={selected.demo} target="_blank" rel="noreferrer">打开 Demo <span>↗</span></a>{selected.source && <a href={selected.source} target="_blank" rel="noreferrer">查看源码 <span>↗</span></a>}</div></div></section>

      <section className="architecture shell"><div className="section-line"><span>02 / 建筑训练</span><span>建筑训练与视觉表达</span></div><div className="architecture-intro"><h2>从空间开始，<br />练习处理复杂约束。</h2><p>场地、功能、动线、尺度与氛围，是我进入 AI 产品之前反复处理的约束。它们后来变成了我对信息结构、用户路径和交互节奏的敏感。</p></div><div className="architecture-grid"><figure className="architecture-feature"><img src="/projects/architecture/biodirectional-render.png" alt="流浪动物公园建筑效果图" /><figcaption><strong>流浪动物公园</strong><span>公共空间与动物救助被组织在同一条体验路径里。</span></figcaption></figure><figure><img src="/projects/architecture/mine-restoration-render.png" alt="矿山修复工程建筑效果图" /><figcaption><strong>矿山修复工程</strong><span>从环境问题出发组织功能、景观和时间变化。</span></figcaption></figure><figure><img src="/projects/architecture/fresh-market-render.png" alt="生鲜市场建筑效果图" /><figcaption><strong>生鲜市场</strong><span>从日常使用出发组织空间与动线。</span></figcaption></figure></div></section>

      <section className="visual-expression shell"><div className="section-line"><span>03 / 视觉表达</span><span>AIGC 角色氛围图与手绘作品</span></div><div className="visual-expression-intro"><h2>先建立氛围，<br />再让体验发生。</h2><p>用 AIGC 生成角色与场景气质，再结合手绘训练形成自己的视觉观察。图像服务于世界观、情绪和体验入口，而不是孤立的装饰。</p></div><div className="expression-block"><div className="expression-heading"><strong>AIGC 角色氛围图</strong><span>角色、场景与叙事气质</span></div><div className="aigc-gallery"><img src="/projects/aigc/aigc-01.jpeg" alt="AIGC 角色氛围图一" /><img src="/projects/aigc/aigc-02.jpeg" alt="AIGC 角色氛围图二" /><img src="/projects/aigc/aigc-03.jpeg" alt="AIGC 角色氛围图三" /><img src="/projects/aigc/aigc-04.jpeg" alt="AIGC 角色氛围图四" /></div></div><div className="expression-block"><div className="expression-heading"><strong>手绘作品</strong><span>观察、构图与氛围表达</span></div><div className="painting-gallery-grid"><img src="/projects/architecture/painting-01.jpeg" alt="手绘作品一" /><img src="/projects/architecture/painting-02.jpeg" alt="手绘作品二" /><img src="/projects/architecture/painting-03.jpeg" alt="手绘作品三" /><img src="/projects/architecture/painting-04.jpeg" alt="手绘作品四" /></div></div></section>

      <section className="profile shell" id="profile"><div className="section-line"><span>04 / 关于我</span><span>一个从建筑转向人工智能产品的人</span></div><div className="profile-grid"><h2>把复杂信息<br /><em>整理成清楚的产品。</em></h2><div className="profile-content"><p className="profile-lead">建筑训练让我习惯处理复杂约束。做 AI 产品后，我把这种能力用在需求拆解、信息架构、模型边界和原型验证上。</p><div className="profile-facts">{profile.map((item) => <div key={item}><i />{item}</div>)}</div><div className="skills"><span>产品能力</span><p>用户问题 · 需求拆解 · MVP · PRD · 信息架构 · 用户流程 · 原型设计</p><span>人工智能应用</span><p>Prompt · RAG · Agent 基础 · 输出评测 · 人工校正</p></div><div className="software-section"><span>熟悉软件</span><div className="software-tools">{softwareTools.map((tool) => <div className="software-tool" key={tool.name}><b className={`tool-icon ${tool.tone}`}>{tool.mark}</b><small>{tool.name}</small></div>)}</div></div></div></div></section>
      <section className="contact shell" id="contact"><div><span className="section-line-label">05 / 联系方式</span><h2>有想法，<br /><span>欢迎一起聊聊。</span></h2></div><div className="contact-note"><p>正在寻找人工智能产品经理实习机会<br />杭州 · 立即到岗 · 每周 5 天</p><div className="contact-details"><span>电话　134 7801 4055</span><span>邮箱　humphcey@163.com</span><span>微信　humphrey_0w0</span></div><a href="#top">回到顶部 ↑</a></div></section>
      <footer className="footer shell"><span>何蓬熙 / Humphcey</span><span>AI product · interaction · prototypes</span><span>© 2026</span></footer>
    </main>
  );
}
