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
  visual: string;
};

const projects: Project[] = [
  { id: "archmind", no: "01", name: "ArchMind", category: "RAG / AI research tool", year: "2026", summary: "让建筑规范检索有出处，研究过程才接得住。", role: "产品设计、RAG 技术验证", shipped: "资料上传、向量检索、来源回溯、案例分析流程", skills: ["问题拆解", "RAG 评测", "信息架构"], demo: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/", image: "/projects/archmind-home.png", visual: "archmind" },
  { id: "weread", no: "02", name: "WeRead AI", category: "Browser extension / local tool", year: "2026", summary: "把阅读回顾和笔记沉淀放回阅读现场。", role: "产品设计、本地工具工作流", shipped: "情节节点、阅读回顾、划线整理、Obsidian 导出", skills: ["场景建模", "扩展架构", "状态设计"], demo: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/", source: "https://github.com/58wpg9fr7d-code/weread-ai-reading-assistant", visual: "weread" },
  { id: "jingye", no: "03", name: "静夜园", category: "Narrative system / MVP", year: "2026", summary: "把复杂剧情拆成玩家看得懂、做得到的选择。", role: "世界观、信息架构、交互与网页 MVP", shipped: "角色分级、线索解锁、线索板、手机端剧情入口", skills: ["叙事结构", "信息分层", "视觉系统"], demo: "https://murder-mystery-studio.vercel.app/phone", image: "/projects/jingye-cover-real.png", visual: "jingye" },
  { id: "workbench", no: "04", name: "个人 AI 工作台", category: "Agent workflow / system", year: "2026", summary: "让 AI 建议经过确认，才变成今天真正要做的事。", role: "产品架构、交互设计、脱敏 Demo", shipped: "AI 收件箱、今日安排、学习计时、完成条件", skills: ["Agent 边界", "工作流设计", "产品状态"], demo: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", source: "https://github.com/58wpg9fr7d-code/personal-ai-workbench-demo", visual: "workbench" }
];

const profile = ["浙江大学 / 建筑与城市设计硕士在读", "建筑学背景，转向 AI 产品", "AI 产品经理实习生，杭州"];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), delay); return () => window.clearTimeout(timer); }, [delay]);
  return <div className={`fade-in ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDuration: "1000ms" }}>{children}</div>;
}

function AnimatedHeading() {
  const lines = ["从建筑出发，", "把复杂做成产品。"];
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), 200); return () => window.clearTimeout(timer); }, []);
  return <h1 className="animated-heading">{lines.map((line, lineIndex) => <span className="heading-line" key={line}>{[...line].map((char, charIndex) => <span key={`${line}-${charIndex}`} className="heading-char" style={{ transitionDelay: `${200 + (lineIndex * line.length + charIndex) * 30}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-18px)" }}>{char === " " ? "\u00a0" : char}</span>)}</span>)}</h1>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("archmind");
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <main id="top">
      <section className="hero-reference">
        <img className="hero-video" src="/projects/hero-architecture.png" alt="建筑结构与数据网格构成的作品集封面背景" />
        <div className="hero-reference-inner shell">
          <nav className="topbar liquid-glass"><a className="wordmark" href="#top">何蓬熙 <span>/ Humphcey</span></a><div className="nav-links"><a href="#work">项目</a><a href="#profile">关于</a><a href="#contact">联系</a></div><a className="nav-cta" href="#contact">开始交流</a></nav>
          <div className="hero-content"><div className="hero-main"><div className="hero-kicker"><span>AI 产品经理</span><span>杭州 · 2026</span></div><AnimatedHeading /><FadeIn delay={800}><p className="hero-intro">我从建筑出发，把复杂的问题理成清楚的产品，从第一张结构图做到可以被使用的 Demo。</p></FadeIn><FadeIn delay={1200} className="hero-actions"><a className="button button-light" href="#work">查看项目 <span>↗</span></a><a className="button liquid-glass" href="#contact">聊聊合作 <span>↗</span></a></FadeIn></div><FadeIn delay={1400} className="hero-tag"><span>产品 · 交互 · AI</span></FadeIn></div>
        </div>
      </section>

      <section className="work shell" id="work"><div className="section-line"><span>01 / SELECTED WORK</span><span>Four ways of making complexity usable</span></div><div className="project-stack">{projects.map((project) => <button type="button" key={project.id} className={`project-card ${selected.id === project.id ? "selected" : ""}`} onClick={() => setSelectedId(project.id)}><span className="project-number">{project.no}</span><span className="project-title"><small>{project.category}</small><strong>{project.name}</strong></span><span className="project-summary">{project.summary}</span><span className="project-year">{project.year}</span><span className="project-arrow">↗</span></button>)}</div></section>

      <section className="case shell"><div className="case-visual"><div className={`visual-frame ${selected.visual}`}>{selected.image ? <img src={selected.image} alt={`${selected.name} project`} /> : selected.visual === "weread" ? <><div className="mock-browser"><span className="mock-dots" /><b>微信读书</b><span className="mock-search">⌕</span></div><div className="mock-book">百年孤独<small>阅读回顾</small></div><div className="mock-side"><small>AI READING MEMORY</small><strong>上次读到<br />第 7 章</strong><span>查看关键情节　↗</span></div></> : <><div className="mock-board"><span>AI 收件箱</span><b>今天要做的事</b><i>确认后生成任务</i><i>学习 02:30:00</i></div><div className="mock-orbit" /></>}</div><span className="visual-caption">{selected.name} / product view</span>{selected.id === "jingye" && <div className="character-strip"><figure><img src="/projects/jingye/niu-shouzhuo-real.png" alt="牛守拙角色设定" /><figcaption>牛守拙 / 观察者</figcaption></figure><figure><img src="/projects/jingye/hu-mou-real.png" alt="胡某角色设定" /><figcaption>胡某 / 叙事线索</figcaption></figure><figure><img src="/projects/jingye/zhu-ke-yan-real.png" alt="朱可言角色设定" /><figcaption>朱可言 / 关键角色</figcaption></figure></div>}</div><div className="case-copy"><div className="case-meta"><span>{selected.no} / {selected.category}</span><span>CASE STUDY</span></div><h2>{selected.summary}</h2><div className="case-section"><span>Role</span><p>{selected.role}</p></div><div className="case-section"><span>Shipped</span><p>{selected.shipped}</p></div>{selected.id === "jingye" && <div className="case-section"><span>Method</span><p>以角色、幕次和剧情阶段组织信息，通过分层解锁控制节奏。AI 用于辅助视觉生成、氛围建立和素材迭代，产品结构与交互判断由本人完成。</p></div>}<div className="case-tags">{selected.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="case-actions"><a href={selected.demo} target="_blank" rel="noreferrer">Open demo <span>↗</span></a>{selected.source && <a href={selected.source} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}</div></div></section>

      <section className="architecture shell"><div className="section-line"><span>02 / BEFORE AI</span><span>建筑训练与视觉表达</span></div><div className="architecture-intro"><h2>From space,<br />I learned to hold complexity.</h2><p>场地、功能、动线、尺度与氛围，是我进入 AI 产品之前反复处理的约束。它们后来变成了我对信息结构、用户路径和交互节奏的敏感。</p></div><div className="architecture-grid"><figure className="architecture-feature"><img src="/projects/architecture/biodirectional-render.png" alt="流浪动物公园建筑效果图" /><figcaption><strong>流浪动物公园</strong><span>公共空间与动物救助被组织在同一条体验路径里。</span></figcaption></figure><figure><img src="/projects/architecture/mine-restoration-render.png" alt="矿山修复工程建筑效果图" /><figcaption><strong>矿山修复工程</strong><span>从环境问题出发组织功能、景观和时间变化。</span></figcaption></figure><figure><img src="/projects/architecture/painting-works.png" alt="绘画与手绘作品" /><figcaption><strong>绘画与手绘</strong><span>观察、构图和氛围表达的训练。</span></figcaption></figure></div></section>

      <section className="profile shell" id="profile"><div className="section-line"><span>03 / ABOUT</span><span>A product person with an architecture background</span></div><div className="profile-grid"><h2>I make<br /><em>complex things clear.</em></h2><div className="profile-content"><p className="profile-lead">建筑训练让我习惯处理复杂约束。做 AI 产品后，我把这种能力用在需求拆解、信息架构、模型边界和原型验证上。</p><div className="profile-facts">{profile.map((item) => <div key={item}><i />{item}</div>)}</div><div className="skills"><span>PRODUCT</span><p>用户问题 · 需求拆解 · MVP · PRD · 信息架构 · 用户流程 · 原型设计</p><span>AI APPLICATION</span><p>Prompt · RAG · Agent 基础 · 输出评测 · 人工校正</p><span>BUILD</span><p>Python · TypeScript · React · Next.js · FastAPI · GitHub</p></div></div></div></section>
      <section className="contact shell" id="contact"><div><span className="section-line-label">04 / CONTACT</span><h2>Have a question?<br /><span>Let&apos;s make it real.</span></h2></div><div className="contact-note"><p>正在寻找 AI 产品经理实习机会。杭州，立即到岗，每周 5 天。</p><a href="#top">Back to top ↑</a></div></section>
      <footer className="footer shell"><span>何蓬熙 / Humphcey</span><span>AI product · interaction · prototypes</span><span>© 2026</span></footer>
    </main>
  );
}
