"use client";

import { useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  oneLine: string;
  type: string;
  role: string;
  features: string[];
  proof: string;
  boundary: string;
  demo: string;
  source?: string;
};

const projects: Project[] = [
  { id: "archmind", index: "01", title: "ArchMind", eyebrow: "建筑知识助手", oneLine: "让建筑资料可以被问，也可以被追溯。", type: "RAG / 产品原型", role: "产品设计、RAG 技术验证", features: ["资料上传与索引", "自然语言问答", "来源片段展示", "案例分析流程"], proof: "静态产品体验、RAG 技术链路、PRD、用户流程与原型。", boundary: "真实模型调用、准确率和正式用户评测仍需单独验证。", demo: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/" },
  { id: "weread", index: "02", title: "WeRead AI", eyebrow: "微信读书智能阅读助手", oneLine: "把阅读回顾和笔记沉淀放回阅读现场。", type: "浏览器扩展 / Obsidian", role: "产品设计、本地工具工作流", features: ["情节节点标记", "最近阅读回顾", "划线整理", "导出到 Obsidian"], proof: "静态体验 Demo、扩展结构、PRD、架构与验证记录。", boundary: "真实 DOM 兼容、模型调用和本机写入需要继续验证。", demo: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/", source: "https://github.com/58wpg9fr7d-code/weread-ai-reading-assistant" },
  { id: "jingye", index: "03", title: "静夜园", eyebrow: "互动推理剧本体验", oneLine: "把复杂剧情拆成玩家看得懂、做得到的选择。", type: "叙事系统 / 交互 MVP", role: "世界观、信息架构、交互与网页 MVP", features: ["角色信息分级", "阶段式线索解锁", "线索板与时间线", "手机端剧情入口"], proof: "世界观、角色关系、视觉素材与网页 MVP。", boundary: "多人实时同步、积分回传等目标不写成已完成能力。", demo: "https://murder-mystery-studio.vercel.app/phone" },
  { id: "workbench", index: "04", title: "个人 AI 工作台", eyebrow: "学习与执行闭环", oneLine: "让 AI 建议经过确认，才变成今天要做的事。", type: "Agent / 状态设计", role: "产品架构、交互设计、脱敏 Demo", features: ["今日安排", "AI 收件箱", "学习计时", "完成条件"], proof: "脱敏静态展示版、产品一页纸、PRD、案例材料与验证记录。", boundary: "公开版不连接本机后台，不放个人数据和真实 Key。", demo: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", source: "https://github.com/58wpg9fr7d-code/personal-ai-workbench-demo" }
];

const principles = [
  ["01", "问题先于模型", "先找用户卡住的地方，再决定 AI 要不要出现。"],
  ["02", "结果要能检查", "把回答、来源和下一步动作放进同一条路径。"],
  ["03", "边界写在台面上", "Demo、验证和真实线上能力分开说。"]
];

export default function Home() {
  const [selectedId, setSelectedId] = useState("archmind");
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <main>
      <nav className="topbar shell"><a className="wordmark" href="#top"><span className="wordmark-mark">H</span><span>Humphcey</span></a><div className="nav-links"><a href="#work">Work</a><a href="#thinking">Thinking</a><a href="#about">About</a></div><a className="nav-status" href="#work"><i /> Open to opportunities</a></nav>
      <section className="hero shell" id="top"><div className="hero-meta"><span>AI PRODUCT / 2024—2026</span><span>Based in China</span></div><div className="hero-main"><div><h1>我把 AI<br /><span>放进真实问题里。</span></h1><p>Humphcey，AI 产品设计与原型实践。</p></div><div className="hero-note"><span className="note-index">01</span><p>从资料检索、阅读、叙事到个人效率，我关心的是：一个想法怎样变成用户能理解、能操作的东西。</p><a href="#work">看我的项目 <b>↓</b></a></div></div></section>
      <section className="work-section shell" id="work"><div className="section-top"><span className="section-kicker">Selected work</span><span>4 projects / click to explore</span></div><div className="work-layout"><div className="project-list">{projects.map((project) => <button type="button" key={project.id} className={`project-row ${selected.id === project.id ? "active" : ""}`} onClick={() => setSelectedId(project.id)}><span className="row-index">{project.index}</span><span className="row-copy"><small>{project.eyebrow}</small><strong>{project.title}</strong></span><span className="row-type">{project.type}</span><span className="row-arrow">↗</span></button>)}</div><div className="detail-panel"><div className="detail-head"><span>{selected.index} / {selected.type}</span><span className="detail-live">Interactive detail</span></div><h2>{selected.oneLine}</h2><div className="detail-role"><span>我的角色</span><strong>{selected.role}</strong></div><div className="detail-grid"><div><span className="detail-label">做了什么</span><ul>{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div><span className="detail-label">交付</span><p>{selected.proof}</p><span className="detail-label muted-label">边界</span><p className="muted-text">{selected.boundary}</p></div></div><div className="detail-actions"><a className="primary-link" href={selected.demo} target="_blank" rel="noreferrer">打开 Demo <span>↗</span></a>{selected.source && <a className="secondary-link" href={selected.source} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}</div></div></div></section>
      <section className="thinking-section shell" id="thinking"><div className="section-top"><span className="section-kicker">How I think</span><span>少一点魔法，多一点判断</span></div><div className="principles">{principles.map(([number, title, text]) => <div className="principle" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="about-section shell" id="about"><div><span className="section-kicker">About</span><h2>做能被用起来的<br /><span>AI 产品。</span></h2></div><div className="about-copy"><p>我从建筑背景转向 AI 产品。现在用产品思维、交互原型和技术验证，把复杂能力压缩成清楚的下一步。</p><a href="#work">回到项目 <span>↗</span></a></div></section>
      <footer className="footer shell"><span>Humphcey © 2026</span><span>AI product / interaction / prototypes</span><a href="#top">↑ Top</a></footer>
    </main>
  );
}
