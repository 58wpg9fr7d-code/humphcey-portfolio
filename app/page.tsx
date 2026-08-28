"use client";

import { useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
  tag: string;
  accent: string;
  icon: string;
  role: string;
  problem: string;
  solution: string;
  features: string[];
  proof: string;
  boundary: string;
  demo: string;
  source?: string;
};

const projects: Project[] = [
  { id: "archmind", index: "01", title: "ArchMind", eyebrow: "建筑知识助手", summary: "把规范、文献与案例资料变成可追溯的建筑研究工作流。", tag: "RAG · 来源追溯", accent: "blue", icon: "⌁", role: "产品设计 / RAG 技术验证", problem: "建筑资料分散、术语复杂，普通问答很难让用户确认答案来自哪里。", solution: "从多格式资料上传开始，通过切分、向量检索和来源片段展示，逐步扩展到结构化案例分析。", features: ["资料上传与索引", "自然语言问答", "来源片段展示", "案例分析流程原型"], proof: "已完成静态产品体验、RAG 技术链路、PRD、用户流程与六页原型。", boundary: "公开入口用于体验产品流程；真实模型调用、准确率和正式用户评测仍需单独验证。", demo: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/" },
  { id: "weread", index: "02", title: "WeRead AI", eyebrow: "微信读书智能阅读助手", summary: "在阅读发生的地方，帮用户找回进度、定位情节并沉淀笔记。", tag: "浏览器扩展 · Obsidian", accent: "coral", icon: "↗", role: "产品设计 / 本地工具工作流", problem: "长篇阅读容易忘记上次读到哪里，划线和总结也很难回到自己的知识库。", solution: "用浏览器侧边栏连接阅读页面、章节节点和本地 API，把阅读回顾与 Markdown 导出放进同一条路径。", features: ["情节节点标记", "最近阅读回顾", "划线整理", "导出到 Obsidian"], proof: "已完成无需 API Key 的静态体验 Demo、扩展结构、PRD、架构与验证记录。", boundary: "真实微信读书 DOM 兼容性、模型调用和本机 Obsidian 写入需要在登录环境中继续验证。", demo: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/", source: "https://github.com/58wpg9fr7d-code/weread-ai-reading-assistant" },
  { id: "jingye", index: "03", title: "静夜园", eyebrow: "互动推理剧本体验", summary: "把复杂世界观、线索释放和多结局决策，组织成可操作的移动端剧情。", tag: "叙事系统 · 交互 MVP", accent: "ink", icon: "✦", role: "世界观 / 信息架构 / 交互与网页 MVP", problem: "剧本杀的信息量大、剧透风险高，主持流程与玩家探索需要被同一套结构支撑。", solution: "用分幕、角色卡、线索板和解锁机制控制认知负荷，让玩家按节奏获得信息并做出终局选择。", features: ["角色信息分级", "阶段式线索解锁", "线索板与时间线", "手机端剧情入口"], proof: "从世界观、角色关系到视觉素材与网页 MVP 均独立完成，并保留静态展示版本。", boundary: "当前主入口可体验剧情与交互；多人实时同步、积分回传等目标不写成已完成能力。", demo: "https://murder-mystery-studio.vercel.app/phone" },
  { id: "workbench", index: "04", title: "个人 AI 工作台", eyebrow: "学习与执行闭环", summary: "把碎片输入、今日安排、学习计时和完成条件，收束成一套可执行的个人系统。", tag: "Agent 工作流 · 状态设计", accent: "green", icon: "◌", role: "产品架构 / 交互设计 / 脱敏 Demo", problem: "信息收集、任务安排和学习记录彼此割裂，AI 给出的建议也不一定适合直接执行。", solution: "让 AI 先提供结构化建议，用户确认后才生成任务，并用父子习惯和完成条件记录执行状态。", features: ["今日安排", "AI 收件箱", "学习计时", "父子习惯与完成条件"], proof: "已完成脱敏静态展示版、产品一页纸、PRD、案例材料和验证记录。", boundary: "公开版不连接本机后台、不放个人数据和真实 Key；完整工作台能力仍属于本地环境。", demo: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", source: "https://github.com/58wpg9fr7d-code/personal-ai-workbench-demo" }
];

const principles = [
  ["01", "先找真实问题", "从用户卡住的瞬间出发，而不是从模型能力出发。"],
  ["02", "让 AI 负责合适的一步", "把概率性能力放进可解释、可恢复的流程。"],
  ["03", "把边界写清楚", "Demo、技术验证、本地能力与真实线上结果分别说明。"]
];

export default function Home() {
  const [selectedId, setSelectedId] = useState("archmind");
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];
  return (
    <main>
      <nav className="topbar shell"><a className="wordmark" href="#top" aria-label="回到首页"><span className="wordmark-mark">H</span><span>Humphcey<span className="dot">.</span></span></a><div className="nav-links"><a href="#projects">Projects</a><a href="#approach">Approach</a><a href="#about">About</a></div><a className="nav-cta" href="#projects">浏览作品 <span>↘</span></a></nav>
      <section className="hero shell" id="top"><div className="hero-copy"><div className="kicker"><span className="kicker-line" /> AI 产品 / Agent / 交互</div><h1>把复杂的 AI<br /><em>做成能用的东西。</em></h1><p className="hero-lede">我是 Humphcey，关注 AI 产品如何从一个真实问题出发，变成可理解、可交互、可验证的体验。</p><div className="hero-actions"><a className="button button-primary" href="#projects">看项目 <span>↓</span></a><a className="text-link" href="#about">了解我 <span>↗</span></a></div></div><div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-card art-card-main"><span className="art-label">PRODUCT<br />THINKING</span><span className="art-symbol">✳</span></div><div className="art-card art-card-side">AI<br />×<br />HUMAN</div><div className="art-caption">从输入到反馈<br /><strong>每一步都要有理由</strong></div></div></section>
      <section className="signal-strip shell"><span>Selected work / 2024—2026</span><span className="signal-rule" /><span>4 个可浏览 Demo</span><span className="signal-arrow">↓</span></section>
      <section className="projects-section shell" id="projects"><div className="section-heading"><div><span className="section-number">01 /</span><h2>Projects</h2></div><p>四个项目，四种把 AI 放进真实场景的方式。<br />点开卡片，看看我做了什么判断。</p></div><div className="project-grid">{projects.map((project) => <button key={project.id} className={`project-card ${project.accent} ${selectedId === project.id ? "is-selected" : ""}`} onClick={() => setSelectedId(project.id)}><span className="project-card-top"><span>{project.index}</span><span>{project.tag}</span></span><span className="project-visual"><span className="visual-icon">{project.icon}</span><span className="visual-grid" /></span><span className="project-card-body"><span className="project-eyebrow">{project.eyebrow}</span><strong>{project.title}</strong><span className="project-summary">{project.summary}</span><span className="card-more">查看项目 <span>↗</span></span></span></button>)}</div></section>
      <section className={`project-detail shell accent-${selected.accent}`}><div className="detail-intro"><span className="detail-index">{selected.index} — {selected.eyebrow}</span><h2>{selected.title}</h2><p>{selected.summary}</p><div className="detail-links"><a className="button button-primary" href={selected.demo} target="_blank" rel="noreferrer">打开 Demo <span>↗</span></a>{selected.source && <a className="text-link" href={selected.source} target="_blank" rel="noreferrer">查看源码 <span>↗</span></a>}</div></div><div className="detail-content"><div className="detail-block"><span className="detail-label">我的角色</span><p>{selected.role}</p></div><div className="detail-block"><span className="detail-label">问题 → 判断</span><p><strong>问题：</strong>{selected.problem}</p><p><strong>判断：</strong>{selected.solution}</p></div><div className="detail-block"><span className="detail-label">核心功能</span><div className="feature-list">{selected.features.map((feature) => <span key={feature}>{feature}<b>↗</b></span>)}</div></div><div className="detail-block detail-proof"><span className="detail-label">交付与边界</span><p>{selected.proof}</p><p className="boundary"><span>边界</span>{selected.boundary}</p></div></div></section>
      <section className="approach-section shell" id="approach"><div className="section-heading"><div><span className="section-number">02 /</span><h2>Approach</h2></div><p>我习惯先把问题拆清楚，再决定 AI 应该出现在哪里。</p></div><div className="principles">{principles.map(([number, title, text]) => <div className="principle" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="about-section shell" id="about"><div className="about-mark">H<span>.</span></div><div><span className="section-number">03 / About</span><h2>让 AI 的复杂性，<br /><em>对用户隐身。</em></h2></div><div className="about-copy"><p>我在建筑、阅读、叙事和个人效率这些不同场景里做 AI 产品实验。比起“接上一个模型”，我更在意用户能不能理解它、信任它，并在结果不理想时继续完成任务。</p><a className="text-link" href="#projects">继续看项目 <span>↗</span></a></div></section>
      <footer className="footer shell"><span>© 2026 Humphcey</span><span>Built with curiosity & care</span><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
