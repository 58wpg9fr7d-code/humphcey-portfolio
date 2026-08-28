"use client";

import { useState } from "react";

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
  { id: "archmind", no: "01", name: "ArchMind", category: "RAG / AI research tool", year: "2026", summary: "建筑规范与文献检索助手。回答有出处，研究过程才接得住。", role: "产品设计、RAG 技术验证", shipped: "资料上传、向量检索、来源回溯、案例分析流程", skills: ["问题拆解", "RAG 评测", "信息架构"], demo: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/", image: "/projects/archmind-home.png", visual: "archmind" },
  { id: "weread", no: "02", name: "WeRead AI", category: "Browser extension / local tool", year: "2026", summary: "把阅读回顾和笔记沉淀放回阅读现场，不再从头翻书找线索。", role: "产品设计、本地工具工作流", shipped: "情节节点、阅读回顾、划线整理、Obsidian 导出", skills: ["场景建模", "扩展架构", "状态设计"], demo: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/", source: "https://github.com/58wpg9fr7d-code/weread-ai-reading-assistant", visual: "weread" },
  { id: "jingye", no: "03", name: "静夜园", category: "Narrative system / MVP", year: "2026", summary: "把复杂剧情拆成玩家看得懂、做得到的选择。", role: "世界观、信息架构、交互与网页 MVP", shipped: "角色分级、线索解锁、线索板、手机端剧情入口", skills: ["叙事结构", "信息分层", "视觉系统"], demo: "https://murder-mystery-studio.vercel.app/phone", image: "/projects/jingye-cover.png", visual: "jingye" },
  { id: "workbench", no: "04", name: "个人 AI 工作台", category: "Agent workflow / system", year: "2026", summary: "让 AI 建议经过确认，才变成今天真正要做的事。", role: "产品架构、交互设计、脱敏 Demo", shipped: "AI 收件箱、今日安排、学习计时、完成条件", skills: ["Agent 边界", "工作流设计", "产品状态"], demo: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", source: "https://github.com/58wpg9fr7d-code/personal-ai-workbench-demo", visual: "workbench" }
];

const profile = ["浙江大学 / 建筑与城市设计硕士在读", "建筑学背景，转向 AI 产品", "AI 产品经理实习生，杭州"];

export default function Home() {
  const [selectedId, setSelectedId] = useState("archmind");
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <main>
      <nav className="topbar shell"><a className="wordmark" href="#top"><span className="wordmark-mark">H</span><span>何蓬熙 / Humphcey</span></a><div className="nav-links"><a href="#work">项目</a><a href="#profile">关于我</a><a href="#contact">联系</a></div><span className="nav-year">PORTFOLIO 2026</span></nav>

      <section className="hero shell" id="top"><div className="hero-kicker"><span>AI PRODUCT MANAGER</span><span>SELECTED WORK</span></div><div className="hero-grid"><div><h1>把复杂的事，<span>做成清楚的产品。</span></h1><p className="hero-intro">我从建筑转向 AI 产品，用问题拆解、交互设计和技术验证，把想法推进到可以被看见、被使用的程度。</p></div><div className="profile-teaser"><span className="teaser-label">现在关注</span><p>AI 应用<br />Agent 工作流<br />人与工具的关系</p><a href="#profile">了解我的背景 <span>↗</span></a></div></div></section>

      <section className="work shell" id="work"><div className="section-line"><span>01 / WORK</span><span>四个项目，四种问题</span></div><div className="project-stack">{projects.map((project) => <button type="button" key={project.id} className={`project-card ${selected.id === project.id ? "selected" : ""}`} onClick={() => setSelectedId(project.id)}><span className="project-number">{project.no}</span><span className="project-title"><small>{project.category}</small><strong>{project.name}</strong></span><span className="project-summary">{project.summary}</span><span className="project-year">{project.year}</span><span className="project-arrow">↗</span></button>)}</div></section>

      <section className="case shell"><div className="case-visual"><div className={`visual-frame ${selected.visual}`}>{selected.image ? <img src={selected.image} alt={`${selected.name} 项目界面`} /> : selected.visual === "weread" ? <><div className="mock-browser"><span className="mock-dots" /><b>微信读书</b><span className="mock-search">⌕</span></div><div className="mock-book">百年孤独<small>阅读回顾</small></div><div className="mock-side"><small>AI READING MEMORY</small><strong>上次读到<br />第 7 章</strong><span>查看关键情节　↗</span></div></> : <><div className="mock-board"><span>AI 收件箱</span><b>今天要做的事</b><i>确认后生成任务</i><i>学习 02:30:00</i></div><div className="mock-orbit" /></>}</div><span className="visual-caption">{selected.name} / product view</span></div><div className="case-copy"><div className="case-meta"><span>{selected.no} / {selected.category}</span><span>DETAIL</span></div><h2>{selected.summary}</h2><div className="case-section"><span>我的角色</span><p>{selected.role}</p></div><div className="case-section"><span>已完成</span><p>{selected.shipped}</p></div><div className="case-tags">{selected.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="case-actions"><a href={selected.demo} target="_blank" rel="noreferrer">打开 Demo <span>↗</span></a>{selected.source && <a href={selected.source} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}</div></div></section>

      <section className="profile shell" id="profile"><div className="section-line"><span>02 / ABOUT</span><span>一个建筑背景的 AI 产品人</span></div><div className="profile-grid"><div><h2>我擅长把<em>复杂信息理顺。</em></h2></div><div className="profile-content"><p className="profile-lead">建筑训练让我习惯处理复杂约束。做 AI 产品后，我把这种能力用在需求拆解、信息架构、模型边界和原型验证上。</p><div className="profile-facts">{profile.map((item) => <div key={item}><i />{item}</div>)}</div><div className="skills"><span>PRODUCT</span><p>用户问题 · 需求拆解 · MVP · PRD · 信息架构 · 用户流程 · 原型设计</p><span>AI APPLICATION</span><p>Prompt · RAG · Agent 基础 · 输出评测 · 人工校正</p><span>BUILD</span><p>Python · TypeScript · React · Next.js · FastAPI · GitHub</p></div></div></div></section>

      <section className="contact shell" id="contact"><div><span className="section-line-label">03 / CONTACT</span><h2>有问题，<span>一起把它做出来。</span></h2></div><div className="contact-note"><p>正在寻找 AI 产品经理实习机会，杭州，立即到岗，每周 5 天。</p><a href="#top">回到顶部 ↑</a></div></section>
      <footer className="footer shell"><span>何蓬熙 / Humphcey</span><span>AI product · interaction · prototypes</span><span>© 2026</span></footer>
    </main>
  );
}
