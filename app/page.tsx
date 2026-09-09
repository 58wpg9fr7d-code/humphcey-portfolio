"use client";
import {forwardRef,useEffect,useRef,useState} from "react";
import HTMLFlipBook from "react-pageflip";

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
  desktopPreview?: boolean;
};

const projects: Project[] = [
  { id: "archmind", no: "01", name: "建筑规范RAG", category: "建筑知识工具", year: "2026", summary: "向ArchMind提问，规范有据可查。", role: "产品设计、RAG 技术验证", shipped: "资料上传、向量检索、来源回溯、案例分析流程", skills: ["问题拆解", "检索评测", "信息架构"], demo: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/", embed: "https://58wpg9fr7d-code.github.io/architecture-knowledge-assistant/", image: "/projects/archmind-path-current.png", visual: "archmind" },
  { id: "weread", no: "02", name: "阅读AI插件", category: "浏览器插件 / 本地工具", year: "2026", summary: "把阅读回顾和笔记沉淀放回阅读现场。", role: "产品设计、本地工具工作流", shipped: "情节节点、阅读回顾、划线整理、Obsidian 导出", skills: ["场景建模", "插件架构", "状态设计"], demo: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/", embed: "https://58wpg9fr7d-code.github.io/weread-ai-reading-assistant/02-%E4%BA%A7%E5%93%81%E8%AE%BE%E8%AE%A1/WeReadAI_%E4%BA%A4%E4%BA%92%E5%8E%9F%E5%9E%8B.html", source: "https://github.com/58wpg9fr7d-code/weread-ai-reading-assistant", image: "/projects/weread-product-page.jpg", visual: "weread" },
  { id: "jingye", no: "03", name: "推理互动游戏", category: "叙事系统 / 最小可用版本", year: "2026", summary: "一场推理游戏，如何利用 AI 变成一套好玩的互动体验？", role: "从世界观与角色设定出发，搭建玩家端体验、线索释放和主持人流程。", shipped: "角色选择、房间进入、手机端剧情、线索解锁、线索板与主持人入口", skills: ["叙事结构", "信息分层", "视觉系统"], demo: "https://murder-mystery-studio.vercel.app/phone", embed: "https://murder-mystery-studio.vercel.app/phone", visual: "jingye" },
  { id: "workbench", no: "04", name: "AI工作台", category: "个人系统", year: "2026", summary: "让 AI 建议经过确认，才变成今天真正要做的事。", role: "产品架构、交互设计、脱敏 Demo", shipped: "AI 收件箱、今日安排、学习计时、完成条件", skills: ["Agent 边界", "工作流设计", "产品状态"], demo: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", embed: "https://58wpg9fr7d-code.github.io/personal-ai-workbench-demo/", source: "https://github.com/58wpg9fr7d-code/personal-ai-workbench-demo", image: "/projects/workbench-product-page.jpg", gallery: ["/projects/workbench-today.png", "/projects/workbench-inbox.png", "/projects/workbench-focus.png", "/projects/workbench-habits.png"], visual: "workbench" },
];


const reasoning:Record<string,{problem:string;decision:string;check:string}>={
 archmind:{problem:"设计师查一条规范平均8.6分钟，约占出图周期15%；通用搜索出处模糊、强制等级不明、废止标准混杂。",decision:"面向个人的私有资料+溯源问答轻量工具。v1.0搭建上传→检索→溯源回答全链路，配套浏览器插件；v2.0扩展为案例分析工作流，覆盖课程汇报、论文分析等4个高频场景。",check:"自建20题评测集，Top-1准确找回93.3%（Top-4 100%），记录badcase持续迭代。"},
 weread:{problem:"读到一半忘了前文，回顾和整理笔记容易打断阅读。",decision:"把情节回顾、划线整理放在阅读侧栏，笔记可导出到 Obsidian。",check:"回顾是否对应已读内容，导出的笔记是否完整。"},
 jingye:{problem:"推理游戏信息多，玩家需要知道此刻能看什么、接下来做什么。",decision:"按角色和幕次组织剧本、搜证与线索，把主持流程和玩家入口分开。",check:"入口能否顺利进入，信息释放顺序是否符合剧本。"},
 workbench:{problem:"AI 给出的建议很多，但建议不等于今天要执行的任务。",decision:"先人工确认，再进入今日安排；计时与完成条件对应具体任务。",check:"建议、待办和完成状态是否清楚，操作后状态是否一致。"},
 social:{problem:"非技术背景学 AI 无从下手：黑话多、教程散，收藏夹吃灰，学完不会用。",decision:"不做泛 AI 资讯号，聚焦“浙大建筑研究生 0 基础学 AI”人设，用大白话输出入门科普、工具实测与真实踩坑思考；日更保持在场感。",check:"内容体系覆盖 4 类栏目、保持日更节奏；“日更 9 天只涨 1 粉”等失败选题公开复盘，剧本杀小游戏笔记与产品项目互相引流。"}
};
const characters=["niu-shouzhuo","hu-mou","zhu-ke-yan","zhang-mo","xiang-chen"];
type Art={src:string;label:string};
function ArtRail({kind,onOpen,modalOpen}:{kind:"aigc"|"painting";onOpen:(art:Art)=>void;modalOpen:boolean}){
 const rail=useRef<HTMLDivElement>(null);const hover=useRef(false);const touching=useRef(false);
 const items=Array.from({length:kind==="aigc"?7:7},(_,i)=>({src:kind==="aigc"?`/projects/aigc/aigc-0${i+1}.jpeg`:`/projects/architecture/painting-0${i+1}.jpeg`,label:`${kind==="aigc"?"AIGC 作品":"手绘作品"} ${i+1}`}));
 useEffect(()=>{},[modalOpen]);
 return <div className="art-block"><div className="rail-heading"><h3>{kind==="aigc"?"AIGC 创意探索":"手绘作品"}</h3></div><p>{kind==="aigc"?"用 AI 辅助构思角色、场景与氛围。":"用绘画练习构图、光影与色彩。"}</p><div className="art-rail" ref={rail} onPointerEnter={()=>hover.current=true} onPointerLeave={()=>hover.current=false} onTouchStart={()=>touching.current=true} onTouchEnd={()=>touching.current=false} onTouchCancel={()=>touching.current=false}><div className="art-track">{[0,1,2].map(copy=><div className="art-group" key={copy} aria-hidden={copy>0?true:undefined}>{items.map(a=><button key={a.src} tabIndex={copy>0?-1:0} onClick={()=>onOpen(a)} aria-label={`放大${a.label}`}><img src={a.src} alt={copy?"":a.label} loading="lazy"/><span>查看原图 ↗</span></button>)}</div>)}</div></div></div>;
}
function SocialSection({onOpen}:{onOpen:(art:Art)=>void}){
 const items=Array.from({length:12},(_,i)=>({src:`/projects/social/social-${String(i+1).padStart(2,"0")}.png`,label:`社媒内容 ${i+1}`}));
 return <section className="social-section shell" id="social">
  <h2 className="section-title"><em>04 /</em> 社媒运营</h2>
  <div className="social-intro">
   <h3>学 ai－每天学点</h3>
   <p>利用 AI 生成固定 IP，参与选题策划与图文内容生产，积累社媒账号从 0 到 1 的孵化与搭建经验。</p>
   <div className="social-tags" aria-label="社媒运营能力"><span>固定 IP 塑造</span><span>选题策划</span><span>图文生成</span><span>内容复盘</span></div>
  </div>
  <div className="art-rail social-rail"><div className="art-track social-track">{[0,1,2].map(copy=><div className="art-group" key={copy} aria-hidden={copy>0?true:undefined}>{items.map(item=><button key={item.src} tabIndex={copy>0?-1:0} onClick={()=>onOpen(item)} aria-label={`放大${item.label}`}><img src={item.src} alt={copy?"":item.label} loading="lazy"/><span>查看原图 ↗</span></button>)}</div>)}</div></div>
 </section>;
}
function Preview({project}:{project:Project}){
 const [status,setStatus]=useState<"loading"|"loaded"|"slow"|"error">("loading");
 const screen=useRef<HTMLDivElement>(null);const [size,setSize]=useState({width:390,height:760});const phone=project.id==="jingye";const desktop=project.desktopPreview===true;const embedW=desktop?480:390;
 useEffect(()=>{const el=screen.current;if(!el)return;const update=()=>{const r=el.getBoundingClientRect();if(r.width>0)setSize({width:r.width,height:r.height})};update();const ro=new ResizeObserver(([e])=>setSize({width:e.contentRect.width,height:e.contentRect.height}));ro.observe(el);return()=>ro.disconnect()},[]);
 useEffect(()=>{const timer=setTimeout(()=>setStatus(s=>s==="loading"?"slow":s),12000);return()=>clearTimeout(timer)},[]);
 const content=<iframe title={`${project.name}交互演示`} src={project.embed??project.demo} style={(phone||desktop)?{width:embedW,height:size.height/(size.width/embedW),transform:`scale(${size.width/embedW})`,transformOrigin:"top left"}:undefined} onLoad={()=>setStatus("loaded")} onError={()=>setStatus("error")}/>;
 return <div className={`preview ${phone?"phone-preview":""} ${desktop?"desktop-preview":""}`}>{!phone&&!desktop&&<div className="preview-top"><span className="traffic" aria-hidden="true"><i/><i/><i/></span></div>}<div className={`preview-stage ${phone?"phone-demo":""} ${desktop?"desktop-demo":""}`}>{phone?<div className="phone-device"><img className="phone-frame" src="/phone-frame.png" alt="" draggable={false}/><div className="phone-screen" ref={screen}>{content}</div></div>:desktop?<div className="desktop-device"><div className="desktop-screen" ref={screen}>{content}</div></div>:content}</div><div className="preview-caption"><a href={project.demo} target="_blank" rel="noreferrer">"新窗口体验 ↗"</a></div></div>;
}
type BookPage={src:string;half:"full"|"left"|"right"};
const bookPages:BookPage[]=[{src:"/architecture-book/page-22.jpg",half:"full"},{src:"/architecture-book/page-01.jpg",half:"full"},...Array.from({length:20},(_,i)=>{const src=`/architecture-book/page-${String(i+2).padStart(2,"0")}.jpg`;return [{src,half:"left" as const},{src,half:"right" as const}]}).flat()];
const loopPages=[...bookPages.slice(-2),...bookPages,...bookPages.slice(0,2)];
const BookLeaf=forwardRef<HTMLDivElement,BookPage>(({src,half},ref)=><div ref={ref} className="book-leaf" data-density="soft"><div className={`leaf-image ${half}`}><img src={src} alt="建筑作品集书页" draggable={false}/></div></div>);BookLeaf.displayName="BookLeaf";
const chapters=[
 {title:"流浪动物公园",page:4,position:"-327px -82px",desc:"针对烂尾楼、流浪汉和流浪猫狗等社会问题，建立各环节互助系统，形成可持续商业闭环；利用流浪猫狗建立宠物产业链，盘活场地同时提供社会就业机会。"},
 {title:"砚山西苑",page:12,position:"-423px -133px",desc:"充分调研该地文化产业后，建立辽砚文化主题度假系统。"},
 {title:"矿山修复工程",page:20,position:"-320px -194px",desc:"针对一次性资源开发问题，建立矿山自修复循环系统，增强环境韧性的同时为数据存储提供自然低温仓储空间。"},
 {title:"食海集",page:26,position:"-425px -238px",desc:"针对海鲜集市季节性限制问题，设计适应多场景的可变业态。"},
 {title:"三台‘元’想",page:32,position:"-323px -297px",desc:"为老旧社区更新提出未来智能社区新可能。"},
 {title:"其他作品",page:38,position:"-423px -348px",desc:"从用户需求出发，结合场地等现状，协调平衡功能、技术、空间等多方条件，设计复杂建筑空间产品。"}
];
const defaultBookDesc="从用户需求出发，结合场地等现状，协调平衡功能、技术、空间等多方条件，设计复杂建筑空间产品。";
function Book(){
 const book=useRef<any>(null);const gesture=useRef<{x:number;y:number;started:boolean;id:number}|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const [spread,setSpread]=useState(0);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 const onFlip=(e:{data:number})=>{const raw=Number(e.data);setSpread(raw<2?20:raw>=44?0:Math.floor((raw-2)/2));if(raw<2||raw>=44){if(timer.current)clearTimeout(timer.current);const normalize=()=>{const api=book.current?.pageFlip();if(!api)return;if(api.getState()!=="read"){timer.current=setTimeout(normalize,30);return;}api.turnToPage(raw<2?42:2);};timer.current=setTimeout(normalize,30);}};
 const active=chapters.reduce((v,c,i)=>spread>=c.page/2?i:v,-1);
 const point=(e:React.PointerEvent<HTMLDivElement>)=>{const r=e.currentTarget.querySelector(".stf__block")!.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}};
 const down=(e:React.PointerEvent<HTMLDivElement>)=>{if(e.button!==0||book.current?.pageFlip().getState()!=="read")return;const p=point(e);gesture.current={...p,started:false,id:e.pointerId};if(e.pointerType==="mouse")e.currentTarget.setPointerCapture(e.pointerId)};
 const move=(e:React.PointerEvent<HTMLDivElement>)=>{const g=gesture.current;if(!g)return;const p=point(e),dx=p.x-g.x,dy=p.y-g.y;if(!g.started){if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){gesture.current=null;return}if(Math.abs(dx)<6)return;g.started=true;e.currentTarget.setPointerCapture(e.pointerId);book.current.pageFlip().startUserTouch({x:g.x,y:g.y})}book.current.pageFlip().userMove(p,true)};
 const up=(e:React.PointerEvent<HTMLDivElement>)=>{const g=gesture.current;if(!g)return;const api=book.current.pageFlip();if(g.started)api.userStop(point(e));else{api.startUserTouch({x:g.x,y:g.y});api.userStop(point(e))}gesture.current=null};
 const cancel=()=>{if(gesture.current?.started){const api=book.current.pageFlip();api.userStop({x:gesture.current.x,y:gesture.current.y})}gesture.current=null};
 return <section className="book-section shell" id="architecture-book"><div className="book-layout"><div><div className="book-view" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={cancel}><HTMLFlipBook ref={book} width={420} height={594} size="stretch" minWidth={140} maxWidth={600} minHeight={198} maxHeight={849} startPage={2} drawShadow={false} flippingTime={480} usePortrait={false} startZIndex={1} autoSize maxShadowOpacity={.15} showCover={false} mobileScrollSupport clickEventForward useMouseEvents={false} swipeDistance={24} showPageCorners={false} disableFlipByClick={false} className="flipbook" style={{}} onFlip={onFlip}>{loopPages.map((p,i)=><BookLeaf key={i} {...p}/>)}</HTMLFlipBook></div><div className="book-caption"><span>{String(spread+1).padStart(2,"0")} / 21</span></div></div><div className="book-copy"><h2><em>02 /</em> 建筑作品集</h2><p className="chapter-title">{active>=0?chapters[active].title:""}</p><p>{active>=0?chapters[active].desc:defaultBookDesc}</p><nav className="chapter-nav" aria-label="建筑项目目录">{chapters.map((c,i)=><button key={c.title} aria-label={`跳转到${c.title}`} aria-pressed={active===i} onClick={()=>book.current?.pageFlip().flip(c.page+2)}><span className="chapter-thumb" style={{backgroundPosition:c.position}}/><span>{c.title}</span></button>)}</nav></div></div></section>;
}
export default function Home(){
 const [id,setId]=useState("archmind");const [art,setArt]=useState<Art|null>(null);const dialog=useRef<HTMLDialogElement>(null);const selected=projects.find(p=>p.id===id)!;const logic=reasoning[id];
 useEffect(()=>{if(!art)return;dialog.current?.showModal();const before=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=before}},[art]);
 return <main id="top"><header className="shell topbar"><a href="#top">何蓬熙 / Humphcey</a><nav aria-label="主要导航"><a href="#work">项目</a><a href="#visual">视觉表达</a><a href="#social">社媒</a><a href="#profile">关于我</a><a href="#contact">联系</a></nav></header>
 <section className="hero shell"><div className="hero-copy"><p className="eyebrow">AI 产品经理 · 求职作品集</p><h1>你好，我是<img src="/name-handwriting.png" alt="何蓬熙" className="hero-name-img"/></h1><p className="degree">浙江大学硕士</p><p>发现使用场景中的问题，<br/>把需求变成可以体验的产品。</p></div><div className="hero-art" role="img" aria-label="何蓬熙与浙江大学校门的拼贴设计"><img src="/approved-layout-reference.png" alt="" draggable={false}/></div></section>
 <section className="work shell" id="work"><h2 className="section-title"><em>01 /</em> 产品项目</h2><div className="project-tabs" aria-label="项目选择">{projects.map(p=><button key={p.id} aria-pressed={id===p.id} onClick={()=>setId(p.id)}>{p.name}</button>)}</div><div className="project-detail" key={id} id="case"><Preview project={selected}/><div className="project-reasoning"><h3>{selected.name}</h3><dl><div><dt>用户问题</dt><dd>{logic.problem}</dd></div><div><dt>设计取舍</dt><dd>{logic.decision}</dd></div><div><dt>验证关注</dt><dd>{logic.check}</dd></div></dl></div></div>{id==="jingye"&&<div className="characters">{characters.map((c,i)=><button key={c} aria-label={`查看角色设定${i+1}`} onClick={()=>setArt({src:`/projects/jingye/${c}-folder.png`,label:"角色设定"})}><img src={`/projects/jingye/${c}-folder.png`} alt={`角色设定${i+1}`} loading="lazy"/></button>)}</div>}</section>
 <Book/>
 <section className="visual shell" id="visual"><h2 className="section-title"><em>03 /</em> 视觉表达</h2><ArtRail kind="aigc" onOpen={setArt} modalOpen={!!art}/><ArtRail kind="painting" onOpen={setArt} modalOpen={!!art}/></section>
 <SocialSection onOpen={setArt}/>
 <section className="about shell" id="profile"><h2 className="section-title"><em>05 /</em> 关于我</h2><div className="about-grid"><p>浙江大学硕士，正在寻找 AI 产品经理实习机会。<br/><br/>从建筑学走向 AI 产品，持续练习把需求、信息与交互组织清楚。</p><dl><div><dt>产品设计</dt><dd>竞品分析、需求拆解、用户流程、信息架构与原型设计。</dd></div><div><dt>AI 应用</dt><dd>提示词、RAG、Agent 工作流、输出评测与人工确认。</dd></div><div><dt>视觉表达</dt><dd>建筑设计、手绘、AI 辅助角色与场景构思。</dd></div></dl></div></section>
 <section className="contact shell" id="contact"><h2 className="section-title"><em>06 /</em> 联系方式</h2><div className="contact-grid"><p>欢迎聊聊产品，也聊聊机会。</p><div><a href="mailto:humphcey@163.com">humphcey@163.com ↗</a><a href="tel:13478014055">134 7801 4055 ↗</a><p>微信：humphrey_0w0</p></div></div></section><footer className="shell"><span>何蓬熙 / Humphcey</span><a href="#top">回到顶部 ↑</a></footer>
 <dialog ref={dialog} className="art-dialog" aria-label="作品原图" onClose={()=>setArt(null)} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><div><span>{art?.label}</span><button onClick={()=>dialog.current?.close()}>关闭 ×</button></div>{art&&<img src={art.src} alt={art.label}/>}</dialog>
 </main>;
}
