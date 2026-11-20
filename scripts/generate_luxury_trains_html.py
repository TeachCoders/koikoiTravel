#!/usr/bin/env python3
"""
Generate complete static HTML website for Luxury Trains of India
Using local downloaded images from user and removing the stats section.
"""

import os
import shutil

OUTPUT_DIRS = [
    "frontend/public/luxury-trains",
    "frontend/public/luxury-train-demo"
]

BASE_CSS = """
:root{
  --primary:#0f172a;        /* slate-900 matching homepage */
  --primary-dark:#020617;   /* slate-950 */
  --accent:#F8904D;         /* KoiKoi signature orange */
  --accent-dark:#e07b3b;    /* Orange hover */
  --accent-soft:rgba(248,144,77,.1);
  --ink:#0f172a;
  --muted:#64748b;          /* slate-500 */
  --bg:#ffffff;
  --soft:#faf8f5;           /* exact homepage section-tint */
  --line:#eee7de;           /* exact homepage section-border */
  --radius:16px;
  --shadow:0 4px 20px rgba(0,0,0,.06);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Poppins',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;color:#334155;background:var(--bg);line-height:1.65;font-size:15px}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{font-family:'Outfit',sans-serif;line-height:1.2;color:var(--primary);letter-spacing:-.015em}
.wrap{max-width:1600px;margin:0 auto;padding:0 16px}
@media(min-width:640px){.wrap{padding:0 32px}}
@media(min-width:1024px){.wrap{padding:0 40px}}
section{padding:72px 0}
@media(max-width:768px){section{padding:48px 0}}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#0f172a;font-weight:700;margin-bottom:10px}
.eyebrow::before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;background:#F8904D;flex-shrink:0}
.sec-head{max-width:800px;margin-bottom:36px}
.sec-head h2{font-size:clamp(26px,3.2vw,38px);font-weight:700;margin-bottom:12px;color:var(--primary)}
.sec-head p{color:var(--muted);font-size:15px;line-height:1.65}
.center{text-align:center;margin-left:auto;margin-right:auto}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 28px;border-radius:999px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center}
.btn-gold{background:#F8904D;color:#fff;box-shadow:0 4px 14px rgba(248,144,77,.35)}
.btn-gold:hover{background:#e07b3b;transform:scale(1.04)}
.btn-line{border-color:#fff;color:#fff}
.btn-line:hover{background:#fff;color:#0f172a}
.btn-dark{background:#0f172a;color:#fff}
.btn-dark:hover{background:#1e293b;transform:scale(1.03)}

/* header */
header{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e2e8f0}
.nav{display:flex;align-items:center;justify-content:space-between;height:72px}
.nav img{height:38px;width:auto}
.nav ul{display:flex;gap:28px;list-style:none;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600}
.nav ul a{color:#1e293b;transition:.2s}
.nav ul a:hover,.nav ul a.on{color:#F8904D}
.nav .btn{padding:10px 22px;font-size:13.5px}
.dd{position:relative;padding:24px 0}
.dd .menu{display:none;position:absolute;top:100%;left:-14px;min-width:210px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.1);padding:8px}
.dd:hover .menu{display:block}
.dd .menu a{display:block;padding:9px 14px;border-radius:8px;font-size:13.5px;color:#1e293b;font-weight:500;transition:.15s}
.dd .menu a:hover{background:rgba(248,144,77,.08);color:#F8904D}
@media(max-width:1020px){.nav ul{display:none}}

/* KoiKoi Exact Hero Banner Slider & Size */
.hero{position:relative;width:100%;aspect-ratio:3/2;overflow:hidden;display:flex;align-items:center;background:#0f172a}
@media(min-width:640px){.hero{aspect-ratio:auto;height:41vw;min-height:505px;max-height:735px;padding:0}}
.hero-slider-wrap{position:absolute;inset:0;overflow:hidden;z-index:1}
.hero-track{position:absolute;inset:0;display:flex;height:100%;transition:transform .7s cubic-bezier(.25,1,.5,1);will-change:transform}
.hero-slide{height:100%;flex-shrink:0;background-size:cover;background-position:center;position:relative}
/* KoiKoi Exact Light Overlay Gradients */
.hero-overlay-bottom{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.45) 0%,rgba(0,0,0,.15) 50%,transparent 100%);pointer-events:none;z-index:2}
.hero-overlay-left{position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.35) 0%,rgba(0,0,0,.10) 50%,transparent 100%);pointer-events:none;z-index:2}
/* Content */
.hero .wrap{position:relative;z-index:10;max-width:1600px;margin:0 auto;padding:0 24px;width:100%}
.hero-tag-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;background:rgba(2,6,23,.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px}
.hero-tag-pill span.dot{width:6px;height:6px;border-radius:50%;background:#F8904D;box-shadow:0 0 8px #F8904D}
.hero-display-title{font-family:'Playfair Display',serif;color:#fff;font-size:clamp(26px,4.5vw,56px);font-weight:700;line-height:1.15;max-width:880px;margin-bottom:12px;text-shadow:0 4px 24px rgba(0,0,0,.9)}
.hero-display-title span{display:block}
.hero h1{font-family:'Playfair Display',serif;color:#fff;font-size:clamp(28px,4.5vw,56px);font-weight:700;line-height:1.15;max-width:880px;margin-bottom:14px;text-shadow:0 4px 24px rgba(0,0,0,.9)}
.hero p{font-size:clamp(14px,1.5vw,19px);font-weight:500;color:#fff;line-height:1.6;max-width:720px;margin-bottom:24px;text-shadow:0 2px 12px rgba(0,0,0,.85)}
.hero-ctas{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.btn-koikoi-orange{display:inline-flex;align-items:center;gap:8px;padding:11px 24px;border-radius:999px;background:#F8904D;color:#fff;font-weight:600;font-size:14px;box-shadow:0 4px 14px rgba(248,144,77,.35);transition:all .2s;text-decoration:none}
.btn-koikoi-orange:hover{background:#e07b3b;transform:scale(1.04)}
.btn-koikoi-white{display:inline-flex;align-items:center;gap:8px;padding:11px 24px;border-radius:999px;background:#fff;color:#0f172a;font-weight:700;font-size:14px;box-shadow:0 4px 14px rgba(0,0,0,.2);transition:all .2s;text-decoration:none}
.btn-koikoi-white:hover{background:#f1f5f9;transform:scale(1.04)}
/* KoiKoi Exact Desktop Arrows */
.hero-arrow{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.25);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:20;transition:.2s}
.hero-arrow:hover{background:rgba(0,0,0,.55);transform:translateY(-50%) scale(1.08)}
.hero-arrow.prev{left:20px}
.hero-arrow.next{right:20px}
@media(max-width:768px){.hero-arrow{display:none}}
/* KoiKoi Exact Centered Bottom Dots */
.hero-dots-wrap{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:20;display:flex;align-items:center;gap:6px}
.hero-dot-btn{background:none;border:none;padding:6px;cursor:pointer;display:flex;align-items:center}
.hero-dot-btn span{display:block;height:7px;width:10px;border-radius:999px;background:rgba(255,255,255,.6);transition:all .3s ease}
.hero-dot-btn.active span{width:30px;background:#F8904D}

/* Editorial / SEO Overview Section (Below Hero - Full Width KoiKoi Style) */
.editorial-sec{background:#faf8f5;border-top:1px solid #ede8e1;border-bottom:1px solid #ede8e1;padding:64px 0;position:relative}
@media(max-width:768px){.editorial-sec{padding:42px 0}}
.editorial-full{width:100%}

.editorial-tag{display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:999px;background:rgba(248,144,77,.12);border:1px solid rgba(248,144,77,.35);color:#d96b27;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}
.editorial-sec h1{font-family:'Outfit',sans-serif;font-size:clamp(28px,3vw,42px);font-weight:700;color:#0f172a;line-height:1.25;margin-bottom:12px;letter-spacing:-.01em}
.editorial-sec h1 span{color:#F8904D}
.editorial-sub{font-size:clamp(16px,1.5vw,20px);font-weight:600;color:#334155;margin-bottom:18px;line-height:1.45}
.editorial-sub span{color:#F8904D}
.editorial-p{color:#475569;font-size:15px;line-height:1.8;margin-bottom:16px}
.editorial-train-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin:18px 0 24px}
@media(max-width:768px){.editorial-train-cards{grid-template-columns:1fr}}
.editorial-train-card{background:#ffffff;border:1px solid #eee7de;border-radius:14px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,.03);transition:transform .2s ease,box-shadow .2s ease}
.editorial-train-card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.06)}
.editorial-train-card-title{font-family:'Outfit',sans-serif;font-size:16.5px;font-weight:700;color:#0f172a;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px}
.editorial-train-card-title span{font-size:13px;font-weight:600;color:#F8904D}
.editorial-train-card p{font-size:13.5px;color:#475569;line-height:1.65;margin-bottom:6px}
.editorial-train-card p:last-child{margin-bottom:0}
.editorial-train-card p strong{color:#0f172a}

.editorial-highlight{border-left:4px solid #F8904D;background:#fff;padding:16px 22px;border-radius:0 12px 12px 0;margin:22px 0;box-shadow:0 2px 12px rgba(0,0,0,.03);font-size:14.5px;color:#1e293b;line-height:1.7;font-style:italic}
.editorial-notice{background:#faf5eb;border:1px solid #ebd9b8;border-radius:12px;padding:18px 22px;margin:22px 0;font-size:14px;color:#553f0c;line-height:1.75}
.editorial-notice strong{color:#0f172a;display:block;margin-bottom:4px;font-size:14px}
.editorial-ctas{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:24px}

/* sub-nav tabs for train pages */
.train-subnav{background:#0f172a;color:#fff;border-bottom:1px solid rgba(255,255,255,.12);position:sticky;top:72px;z-index:40}
.train-subnav .wrap{display:flex;gap:8px;overflow-x:auto;padding:12px 20px;scrollbar-width:none}
.train-subnav a{padding:8px 18px;border-radius:999px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;white-space:nowrap;color:#cbd5e1;transition:.2s}
.train-subnav a:hover{background:rgba(255,255,255,.15);color:#fff}
.train-subnav a.active{background:#F8904D;color:#fff}

/* cards & grids */
.grid-4{display:grid;grid-template-columns:repeat(2,1fr);gap:32px}
@media(max-width:820px){.grid-4{grid-template-columns:1fr}}
.card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.05);display:flex;flex-direction:column;border:1px solid #eee7de;transition:all .3s ease}
.card:hover{box-shadow:0 16px 36px rgba(0,0,0,.1);transform:translateY(-4px)}
.card .photo{height:420px;display:flex;align-items:flex-end;padding:24px;color:#fff;font-family:'Outfit',sans-serif;font-size:13px;background-size:cover;background-position:center;position:relative}
@media(max-width:600px){.card .photo{height:280px}}
.train-badge{position:absolute;top:20px;right:20px;width:72px;height:72px;background:#fff;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:5px;border:2.5px solid #F8904D;box-shadow:0 6px 18px rgba(0,0,0,.25);z-index:2;transition:transform .2s ease}
.train-badge img{width:100%;height:100%;object-fit:contain}
.card:hover .train-badge{transform:scale(1.08)}
.card .photo span{background:rgba(15,23,42,.75);backdrop-filter:blur(6px);padding:6px 14px;border-radius:999px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.card .body{padding:28px;flex:1;display:flex;flex-direction:column}
.card h3{font-family:'Outfit',sans-serif;font-size:24px;font-weight:700;color:#0f172a;margin-bottom:4px}
.card .sub{color:#F8904D;font-weight:600;font-size:13px;margin-bottom:12px;text-transform:uppercase;letter-spacing:.04em}
.card p{color:#64748b;font-size:14.5px;line-height:1.65;margin-bottom:18px}
.facts{list-style:none;border-top:1px solid #eee7de;margin-bottom:20px}
.facts li{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid #eee7de;font-size:13.5px}
.facts li span:first-child{color:#64748b}
.facts li span:last-child{text-align:right;font-weight:600;color:#0f172a}
.links{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px}
.links a{text-align:center;font-size:13px;font-weight:600;padding:10px 4px;border:1px solid #eee7de;border-radius:8px;color:#0f172a;transition:.2s;background:#faf8f5;font-family:'Outfit',sans-serif}
.links a:hover{background:#F8904D;color:#fff;border-color:#F8904D}
.card .btn{text-align:center;margin-top:auto;background:#F8904D;color:#fff;border-radius:999px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:12px 24px;box-shadow:0 4px 14px rgba(248,144,77,.35)}
.card .btn:hover{background:#e07b3b;transform:scale(1.02)}

/* Train Video Spotlight Box (Split Royal Layout) */
.train-video-sec{padding:60px 0;background:#ffffff}
.train-video-box{display:grid;grid-template-columns:44% 56%;border-radius:18px;overflow:hidden;box-shadow:0 16px 48px rgba(15,23,42,.14);background:#262463;border:1px solid rgba(255,255,255,.08)}
@media(max-width:960px){.train-video-box{grid-template-columns:1fr}}
.train-video-content{padding:48px 40px;display:flex;flex-direction:column;justify-content:center;color:#fff;background:#262463}
@media(max-width:640px){.train-video-content{padding:32px 24px}}
.train-video-logo{display:inline-flex;align-items:center;margin-bottom:20px;max-height:64px}
.train-video-logo img{max-height:60px;max-width:160px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(0,0,0,.3))}
.train-video-title{font-family:'Outfit',sans-serif;font-size:clamp(26px,2.6vw,34px);font-weight:700;color:#fff;margin-bottom:14px;line-height:1.2}
.train-video-desc{color:#e2e8f0;font-size:14px;line-height:1.75;margin-bottom:14px}
.train-video-desc strong{color:#ffffff;font-weight:600}
.train-video-ctas{display:flex;align-items:center;gap:12px;margin-top:20px;flex-wrap:wrap}

.train-video-player{position:relative;width:100%;min-height:420px;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden}
@media(max-width:960px){.train-video-player{min-height:280px;aspect-ratio:16/9}}
.train-video-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.video-facade{position:absolute;inset:0;background-size:cover;background-position:center;cursor:pointer;display:flex;align-items:center;justify-content:center}
.video-facade-overlay{position:absolute;inset:0;background:rgba(0,0,0,.38);transition:.2s}
.video-facade:hover .video-facade-overlay{background:rgba(0,0,0,.22)}
.video-play-btn{position:relative;z-index:2;width:68px;height:68px;border-radius:50%;background:#F8904D;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(248,144,77,.55);transition:transform .2s ease}
.video-facade:hover .video-play-btn{transform:scale(1.1)}
.video-caption-pill{position:absolute;bottom:16px;left:20px;z-index:2;background:rgba(2,6,23,.75);backdrop-filter:blur(6px);color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;padding:5px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.15)}

/* tables */
.table-wrap{overflow-x:auto;border-radius:16px;box-shadow:0 4px 18px rgba(0,0,0,.04);background:#fff;border:1px solid #eee7de}
table{width:100%;border-collapse:collapse;min-width:760px;font-size:14px}
th{background:#0f172a;color:#fff;text-align:left;padding:14px 18px;font-family:'Outfit',sans-serif;font-weight:700}
td{padding:14px 18px;border-bottom:1px solid #eee7de;vertical-align:top}
td:first-child{font-weight:600;color:#0f172a}
tr:last-child td{border-bottom:0}
.table-link-btn{display:inline-flex;align-items:center;gap:4px;color:#F8904D;font-weight:700;font-size:13px;text-decoration:none;transition:.2s}
.table-link-btn:hover{color:#e07b3b;text-decoration:underline}

.departure-cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-top:24px}
@media(max-width:960px){.departure-cards-grid{grid-template-columns:1fr}}
.dep-card{background:#fff;border:1px solid #eee7de;border-radius:16px;padding:22px;box-shadow:0 4px 18px rgba(0,0,0,.04);display:flex;flex-direction:column}
.dep-card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;gap:10px;flex-wrap:wrap}
.dep-card-head h3{font-family:'Outfit',sans-serif;font-size:17.5px;font-weight:700;color:#0f172a;margin:0}
.dep-card-badge{font-size:11.5px;font-weight:600;color:#F8904D;background:rgba(248,144,77,.1);padding:4px 10px;border-radius:999px;border:1px solid rgba(248,144,77,.25)}
.dep-card-list{list-style:none;padding:0;margin:0 0 16px;font-size:13px;color:#475569}
.dep-card-list li{margin-bottom:10px;line-height:1.6;padding-bottom:10px;border-bottom:1px dashed #f1f5f9}
.dep-card-list li:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.dep-card-list li strong{color:#0f172a;display:block;margin-bottom:2px}
.dep-card-footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid #eee7de;gap:8px;flex-wrap:wrap}
.dep-card-footer a{font-size:13px;font-weight:600;font-family:'Outfit',sans-serif}

/* itinerary day cards */
.day-card{background:#fff;border:1px solid #eee7de;border-radius:16px;padding:26px;margin-bottom:20px;box-shadow:0 4px 14px rgba(0,0,0,.03)}
.day-badge{display:inline-block;background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;padding:4px 14px;border-radius:999px;margin-bottom:10px;text-transform:uppercase}
.day-card h3{font-family:'Outfit',sans-serif;font-size:20px;font-weight:700;color:#0f172a;margin-bottom:10px}
.day-card p{color:#64748b;font-size:14.5px;line-height:1.65}
.day-meta{display:flex;gap:16px;margin-top:16px;padding-top:12px;border-top:1px solid #eee7de;font-size:13px;color:#F8904D;font-weight:600}

/* cabins cards */
.cabin-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px}
@media(max-width:768px){.cabin-grid{grid-template-columns:1fr}}
.cabin-card{background:#fff;border:1px solid #eee7de;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.04)}
.cabin-photo{height:250px;background-size:cover;background-position:center;position:relative}
.cabin-body{padding:26px}
.cabin-size{display:inline-block;background:rgba(248,144,77,.1);color:#d96b27;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;padding:4px 12px;border-radius:6px;margin-bottom:10px}
.cabin-card h3{font-family:'Outfit',sans-serif;font-size:22px;font-weight:700;color:#0f172a;margin-bottom:8px}
.cabin-card p{color:#64748b;font-size:14px;line-height:1.6;margin-bottom:14px}
.cabin-features{list-style:none;margin-bottom:18px}
.cabin-features li{font-size:13.5px;color:#334155;padding:5px 0;display:flex;align-items:center;gap:8px}
.cabin-features li::before{content:'✓';color:#F8904D;font-weight:bold}

/* gallery */
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:800px){.gallery-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.gallery-grid{grid-template-columns:1fr}}
.g-item{border-radius:14px;overflow:hidden;height:250px;position:relative;background:#eee}
.g-item img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.g-item:hover img{transform:scale(1.05)}
.g-item span{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.8));color:#fff;font-size:12.5px;padding:24px 14px 12px;font-weight:600;font-family:'Outfit',sans-serif}

/* why choose us */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
@media(max-width:960px){.why-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.why-grid{grid-template-columns:1fr}}
.why{padding:0 0 24px;border:1px solid #eee7de;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.03);transition:all .2s ease}
.why:hover{box-shadow:0 8px 24px rgba(0,0,0,.08);transform:translateY(-3px)}
.why img{width:100%;height:180px;object-fit:cover;margin-bottom:16px}
.why h3,.why p{padding:0 20px}
.why h3{font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;color:#0f172a;margin-bottom:8px}
.why p{font-size:14px;color:#64748b;line-height:1.6}

/* steps */
.steps{background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#fff}
.steps h2{color:#fff}
.steps .eyebrow{color:#cbd5e1}
.steps .eyebrow::before{background:#F8904D}
.steps .sec-head p{color:#94a3b8}
.step-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
@media(max-width:820px){.step-grid{grid-template-columns:1fr}}
.step{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:32px 28px;background:rgba(255,255,255,.04);backdrop-filter:blur(4px)}
.step .n{font-family:'Outfit',sans-serif;font-size:42px;font-weight:800;color:#F8904D;line-height:1;margin-bottom:14px}
.step h3{font-family:'Outfit',sans-serif;color:#fff;font-size:20px;font-weight:700;margin-bottom:8px}
.step p{color:#94a3b8;font-size:14px;line-height:1.6}

/* faq */
.faq{max-width:960px;margin:0 auto}
details{border-bottom:1px solid #eee7de;padding:20px 0}
summary{cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;font-size:17px;color:#0f172a;list-style:none;display:flex;justify-content:space-between;gap:16px;transition:.2s}
summary:hover{color:#F8904D}
summary::-webkit-details-marker{display:none}
summary::after{content:'+';font-size:24px;color:#F8904D;line-height:1;font-weight:600}
details[open] summary::after{content:'−'}
details p{margin-top:12px;color:#64748b;font-size:14.5px;line-height:1.65}

/* cta */
.cta-band{background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#fff;text-align:center;padding:72px 0}
.cta-band h2{font-family:'Outfit',sans-serif;color:#fff;font-size:clamp(26px,3.8vw,40px);margin-bottom:14px}
.cta-band p{max-width:640px;margin:0 auto 28px;color:#cbd5e1;font-size:16px}

/* footer */
footer{background:#020617;color:#94a3b8;padding:64px 0 28px;font-size:14px}
.f-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:40px;margin-bottom:40px}
@media(max-width:860px){.f-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.f-grid{grid-template-columns:1fr}}
footer h4{font-family:'Outfit',sans-serif;color:#fff;font-size:16px;font-weight:700;margin-bottom:16px}
footer ul{list-style:none}
footer li{margin-bottom:10px}
footer a{color:#94a3b8;transition:.2s}
footer a:hover{color:#F8904D}
.copy{border-top:1px solid rgba(255,255,255,.1);padding-top:24px;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;color:#64748b}
.copy a{color:#94a3b8}
.copy a:hover{color:#F8904D}


/* ================= KOIKOI TOUR PACKAGE SYSTEM ================= */
.koikoi-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin: 32px 0 44px;
}
@media (max-width: 1280px) {
  .koikoi-card-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}
@media (max-width: 640px) {
  .koikoi-card-grid { grid-template-columns: 1fr; }
}

.koikoi-tour-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: all 0.35s ease-out;
  height: 100%;
}
.koikoi-tour-card:hover {
  box-shadow: 0 16px 36px rgba(0,0,0,0.09);
  transform: translateY(-5px);
}
.koikoi-card-img-wrap {
  position: relative;
  height: 220px;
  width: 100%;
  overflow: hidden;
  display: block;
  background: #f1f5f9;
}
.koikoi-card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease-out;
}
.koikoi-tour-card:hover .koikoi-card-img-wrap img {
  transform: scale(1.06);
}
.koikoi-card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 18px 20px 20px;
  background: #ffffff;
}
.koikoi-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 17.5px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  margin-bottom: 6px;
  min-height: 48px;
  transition: color 0.2s;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.koikoi-tour-card:hover .koikoi-card-title {
  color: #F8904D;
}
.koikoi-card-route {
  font-size: 13.5px;
  color: #2E8B8B;
  font-weight: 600;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.koikoi-card-highlights {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 16px;
}
.koikoi-card-hl-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #334155;
  line-height: 1.4;
}
.koikoi-card-hl-item svg {
  flex-shrink: 0;
  color: #2E8B8B;
  margin-top: 2px;
}
.koikoi-card-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed #e2e8f0;
}
.koikoi-card-amenities {
  font-size: 12.5px;
  color: #64748b;
  margin-bottom: 14px;
  font-weight: 400;
  letter-spacing: -0.2px;
}
.koikoi-card-btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.koikoi-btn-quote {
  width: 100%;
  padding: 10px 14px;
  border-radius: 9999px;
  background: #F8904D;
  color: #ffffff;
  font-weight: 600;
  font-size: 13.5px;
  font-family: 'Outfit', sans-serif;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.koikoi-btn-quote:hover {
  background: #E96A1E;
  color: #fff;
}
.koikoi-btn-details {
  width: 100%;
  padding: 10px 14px;
  border-radius: 9999px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #1e293b;
  font-weight: 600;
  font-size: 13.5px;
  font-family: 'Outfit', sans-serif;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.koikoi-btn-details:hover {
  border-color: #94a3b8;
  background: #f8fafc;
  color: #0f172a;
}

/* Package Main 2-Column Layout */
.tour-package-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 40px;
  align-items: start;
}
@media (max-width: 1080px) {
  .tour-package-layout {
    grid-template-columns: 1fr;
  }
}

/* Sticky Right Curator Card */
.sticky-curator-card {
  position: sticky;
  top: 90px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 26px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
.sticky-curator-card .badge-offer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(46,139,139,0.1);
  color: #2E8B8B;
  font-size: 12.5px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 9999px;
  margin-bottom: 12px;
}
.sticky-curator-card .price-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
}
.sticky-curator-card .price-tag small {
  font-size: 13.5px;
  font-weight: 500;
  color: #64748b;
  display: block;
  margin-top: 2px;
}
.sticky-curator-card .btn-wa {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px 18px;
  border-radius: 9999px;
  background: #2E8B8B;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  margin-top: 18px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(46,139,139,0.25);
}
.sticky-curator-card .btn-wa:hover {
  background: #257474;
}
.sticky-curator-card .btn-quote-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px 18px;
  border-radius: 9999px;
  background: #F8904D;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  margin-top: 10px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(248,144,77,0.25);
}
.sticky-curator-card .btn-quote-main:hover {
  background: #E96A1E;
}
.sticky-curator-card .trust-list {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid #f1f5f9;
  list-style: none;
}
.sticky-curator-card .trust-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  margin-bottom: 12px;
  line-height: 1.4;
}
.sticky-curator-card .trust-item svg {
  color: #2E8B8B;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Tabs & Circuit Switcher */
.circuit-tabs-nav {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 28px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.circuit-tab-btn {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 10px 10px 0 0;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.circuit-tab-btn.active {
  color: #0f172a;
  background: #f1f5f9;
  border-bottom: 3px solid #F8904D;
}

/* Timeline Vertical */
.timeline-wrap {
  position: relative;
  padding-left: 32px;
}
.timeline-wrap::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 20px;
  left: 11px;
  width: 2px;
  background: #e2e8f0;
}
.timeline-day {
  position: relative;
  margin-bottom: 26px;
}
.timeline-dot {
  position: absolute;
  left: -32px;
  top: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #F8904D;
  box-shadow: 0 0 0 4px rgba(248,144,77,0.15);
}
.timeline-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.timeline-badge {
  display: inline-block;
  background: #0f172a;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}
.timeline-city {
  font-family: 'Outfit', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: #0f172a;
}
.timeline-meals {
  font-size: 12px;
  color: #2E8B8B;
  background: rgba(46,139,139,0.08);
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
}
.timeline-body p {
  font-size: 14.5px;
  color: #475569;
  line-height: 1.65;
  margin-bottom: 10px;
}
.timeline-overnight {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #f1f5f9;
}

/* Inclusions & Exclusions */
.inc-exc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 36px 0;
}
@media (max-width: 768px) {
  .inc-exc-grid { grid-template-columns: 1fr; }
}
.inc-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 16px;
  padding: 24px;
}
.exc-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 16px;
  padding: 24px;
}
.inc-box h3 {
  color: #166534;
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.exc-box h3 {
  color: #991b1b;
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.inc-box ul, .exc-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.inc-box li, .exc-box li {
  font-size: 14px;
  line-height: 1.55;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.inc-box li { color: #15803d; }
.exc-box li { color: #b91c1c; }

/* Breadcrumb Bar */
.koikoi-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.koikoi-breadcrumb a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}
.koikoi-breadcrumb a:hover {
  color: #F8904D;
}
.koikoi-breadcrumb span {
  color: #94a3b8;
}

/* floating whatsapp */
.wa{position:fixed;right:18px;bottom:18px;z-index:60;background:#25d366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:6px}
.wa:hover{background:#20ba5a}
"""

def get_header(active_train=None, base_path="/luxury-trains"):
    return f"""
<header>
  <div class="wrap nav">
    <a href="https://koikoitravel.com/"><img src="https://koikoitravel.com/logo-with-name.png" alt="KoiKoi Travel"></a>
    <ul>
      <li class="dd"><a href="{base_path}/palace-on-wheels" class="{'on' if active_train=='palace-on-wheels' else ''}">Palace on Wheels</a>
        <div class="menu">
          <a href="{base_path}/palace-on-wheels">Overview</a>
          <a href="{base_path}/palace-on-wheels/itinerary">Itinerary</a>
          <a href="{base_path}/palace-on-wheels/departures">Departures</a>
          <a href="{base_path}/palace-on-wheels/price">Price</a>
          <a href="{base_path}/palace-on-wheels/cabins">Cabins</a>
          <a href="{base_path}/palace-on-wheels/photo-gallery">Photo Gallery</a>
        </div>
      </li>
      <li class="dd"><a href="{base_path}/maharajas-express" class="{'on' if active_train=='maharajas-express' else ''}">Maharajas' Express</a>
        <div class="menu">
          <a href="{base_path}/maharajas-express">Overview</a>
          <a href="{base_path}/maharajas-express/itinerary">Itinerary</a>
          <a href="{base_path}/maharajas-express/departures">Departures</a>
          <a href="{base_path}/maharajas-express/price">Price</a>
          <a href="{base_path}/maharajas-express/cabins">Cabins</a>
          <a href="{base_path}/maharajas-express/photo-gallery">Photo Gallery</a>
        </div>
      </li>
      <li class="dd"><a href="{base_path}/golden-chariot" class="{'on' if active_train=='golden-chariot' else ''}">Golden Chariot</a>
        <div class="menu">
          <a href="{base_path}/golden-chariot">Overview</a>
          <a href="{base_path}/golden-chariot/itinerary">Itinerary</a>
          <a href="{base_path}/golden-chariot/departures">Departures</a>
          <a href="{base_path}/golden-chariot/price">Price</a>
          <a href="{base_path}/golden-chariot/cabins">Cabins</a>
          <a href="{base_path}/golden-chariot/photo-gallery">Photo Gallery</a>
        </div>
      </li>
      <li class="dd"><a href="{base_path}/deccan-odyssey" class="{'on' if active_train=='deccan-odyssey' else ''}">Deccan Odyssey</a>
        <div class="menu">
          <a href="{base_path}/deccan-odyssey">Overview</a>
          <a href="{base_path}/deccan-odyssey/itinerary">Itinerary</a>
          <a href="{base_path}/deccan-odyssey/departures">Departures</a>
          <a href="{base_path}/deccan-odyssey/price">Price</a>
          <a href="{base_path}/deccan-odyssey/cabins">Cabins</a>
          <a href="{base_path}/deccan-odyssey/photo-gallery">Photo Gallery</a>
        </div>
      </li>
    </ul>
    <a class="btn btn-gold" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20inquire%20about%20a%20luxury%20train%20journey." target="_blank" rel="noopener">Create My Trip</a>
  </div>
</header>
"""

def get_train_subnav(train_slug, active_tab="overview", base_path="/luxury-trains"):
    return ""

def get_footer(base_path="/luxury-trains"):
    return f"""
<footer>
  <div class="wrap">
    <div class="f-grid">
      <div>
        <img src="https://koikoitravel.com/logo-with-name.png" alt="KoiKoi Travel" style="height:44px;margin-bottom:14px;background:#fff;padding:6px 10px;border-radius:8px">
        <p>Private customized and small-group tours across India, planned by a small travel team.</p>
      </div>
      <div>
        <h4>Luxury Trains</h4>
        <ul>
          <li><a href="{base_path}/palace-on-wheels">Palace on Wheels</a></li>
          <li><a href="{base_path}/maharajas-express">Maharajas' Express</a></li>
          <li><a href="{base_path}/golden-chariot">Golden Chariot</a></li>
          <li><a href="{base_path}/deccan-odyssey">Deccan Odyssey</a></li>
        </ul>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/tour-packages/india">India Tours</a></li>
          <li><a href="/travel-experiences">Travel Experiences</a></li>
          <li><a href="/guest-gallery">Guest Gallery</a></li>
          <li><a href="/blog">Travel Blog</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>H12, Patparganj, Delhi 110091</li>
          <li><a href="tel:+919136739178">+91 91367 39178</a></li>
          <li><a href="mailto:info@koikoitravel.com">info@koikoitravel.com</a></li>
        </ul>
      </div>
    </div>
    <div class="copy">
      <span>© 2026 KoiKoi Travel. All rights reserved.</span>
      <span><a href="/privacy-policy">Privacy Policy</a> · <a href="/terms-and-conditions">Terms</a> · <a href="/cancellation-and-refund">Cancellation &amp; Refund</a></span>
    </div>
  </div>
</footer>

<a class="wa" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20inquire%20about%20a%20luxury%20train%20journey." target="_blank" rel="noopener">
  <span>WhatsApp Us</span>
</a>
"""

def write_page(file_path, title, description, content_html, active_train=None, active_tab=None, base_path="/luxury-trains"):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    header = get_header(active_train, base_path)
    subnav = get_train_subnav(active_train, active_tab, base_path) if active_train and active_tab else ""
    footer = get_footer(base_path)

    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
{BASE_CSS}
</style>
</head>
<body>
{header}
{subnav}
{content_html}
{footer}
<script>
let curHeroSlide = 0;
const hTrack = document.getElementById('heroTrack');
const hSlideCount = 8;
const hDots = document.querySelectorAll('.hero-dot-btn');
function setHeroSlide(idx) {{
  if (!hTrack) return;
  hDots[curHeroSlide]?.classList.remove('active');
  curHeroSlide = (idx + hSlideCount) % hSlideCount;
  hTrack.style.transform = `translateX(-${{(curHeroSlide * 100) / hSlideCount}}%)`;
  hDots[curHeroSlide]?.classList.add('active');
}}
function nextHeroSlide() {{ setHeroSlide(curHeroSlide + 1); }}
function prevHeroSlide() {{ setHeroSlide(curHeroSlide - 1); }}

function loadTrainVideo(elId, videoId) {{
  const targetId = elId || 'powHomeVideoBox';
  const box = document.getElementById(targetId);
  const vid = videoId || 'HnY_2_BBbW4';
  if (box) {{
    box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>';
  }}
}}
function loadPowVideo(elId) {{ loadTrainVideo(elId, 'HnY_2_BBbW4'); }}

let heroTimer = setInterval(nextHeroSlide, 6000);
const heroEl = document.getElementById('heroSlider');
if (heroEl) {{
  heroEl.addEventListener('mouseenter', () => clearInterval(heroTimer));
  heroEl.addEventListener('mouseleave', () => {{
    clearInterval(heroTimer);
    heroTimer = setInterval(nextHeroSlide, 6000);
  }});
}}
</script>
</body>
</html>
"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(full_html)


def generate_all_for_base(base_dir, base_path):
    print(f"Generating site in {base_dir} with base path {base_path}...")

    # ================= 1. HOME PAGE (STATS SECTION REMOVED, USER HERO IMAGES APPLIED) =================
    home_content = f"""
<!-- HERO BANNER (KOIKOI EXACT SLIDER & SIZE) -->
<section class="hero" id="heroSlider">
  <div class="hero-slider-wrap">
    <div class="hero-track" id="heroTrack" style="width:800%">
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/palace-on-wheels/exterior.webp')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/maharajas-express/hero.jpg')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/golden-chariot/hero.jpg')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/deccan-odyssey/hero.jpg')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/palace-on-wheels/hero.jpg')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/maharajas-express/dining-pink.jpg')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/golden-chariot/restaurant-1.jpg')"></div>
      <div class="hero-slide" style="width:12.5%;background-image:url('/images/luxury-trains/deccan-odyssey/dining-lounge.jpg')"></div>
    </div>
  </div>
  <div class="hero-overlay-bottom"></div>
  <div class="hero-overlay-left"></div>

  <!-- KoiKoi Desktop Chevron Arrows -->
  <button class="hero-arrow prev" onclick="prevHeroSlide()" aria-label="Previous Slide">&#10094;</button>
  <button class="hero-arrow next" onclick="nextHeroSlide()" aria-label="Next Slide">&#10095;</button>

  <!-- Overlay Content -->
  <div class="wrap">
    <div class="hero-tag-pill">
      <span class="dot"></span>
      <span>Private Customized &amp; Luxury Rail Journeys</span>
    </div>
    <div class="hero-display-title">
      <span>Travel India, </span>
      <span>like Royalty</span>
    </div>
    <p class="hero-desc">Bespoke luxury rail journeys across India, crafted with personalized pre and post-tour extensions.</p>
    <div class="hero-ctas">
      <a class="btn-koikoi-orange" href="#trains">
        <span>Explore the 4 Trains</span>
        <span>&rarr;</span>
      </a>
      <a class="btn-koikoi-white" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20plan%20a%20luxury%20train%20journey%20in%20India." target="_blank" rel="noopener">
        <span>Plan My Journey</span>
      </a>
    </div>
  </div>

  <!-- KoiKoi Centered Bottom Dots -->
  <div class="hero-dots-wrap">
    <button class="hero-dot-btn active" onclick="setHeroSlide(0)" aria-label="Slide 1"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(1)" aria-label="Slide 2"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(2)" aria-label="Slide 3"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(3)" aria-label="Slide 4"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(4)" aria-label="Slide 5"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(5)" aria-label="Slide 6"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(6)" aria-label="Slide 7"><span></span></button>
    <button class="hero-dot-btn" onclick="setHeroSlide(7)" aria-label="Slide 8"><span></span></button>
  </div>
</section>

<!-- DEDICATED OVERVIEW SECTION (SIMPLE & EASY) -->
<section class="editorial-sec">
  <div class="wrap">
    <div class="editorial-full">
      <div class="editorial-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>Independent Travel Curator</span>
      </div>

      <h1><span>Luxury Train Journeys in India</span>: Royal Rail Holidays</h1>

      <p class="editorial-sub">Explore India aboard 4 iconic luxury trains &mdash; with private airport transfers, 5-star heritage hotels, and personalized trip planning by <span>KoiKoi Travel</span>.</p>

      <p class="editorial-p">A luxury train journey is the most relaxing and royal way to experience India. Instead of repacking bags and rushing for flights every morning, your 5-star private hotel travels with you on rails. Enjoy private ensuite cabins, gourmet dining cars, panoramic lounge bars, and daily guided sightseeing to world-famous palaces, desert dunes, and tiger reserves.</p>

      <!-- Transparent Advisory Notice -->
      <div class="editorial-notice">
        <strong>Important Advisory &middot; Independent Booking &amp; Tour Support</strong>
        India&apos;s luxury trains are government-operated by state rail corporations and tourism boards (IRCTC, RTDC, KSTDC, and MTDC). While train tickets only cover the train journey from station to station, <strong>KoiKoi Travel designs your entire vacation</strong>: booking your ideal cabin, reserving pre- and post-tour 5-star heritage stays in Delhi or Mumbai, providing private chauffeured luxury airport transfers, and giving you dedicated 24/7 personal WhatsApp support throughout your holiday.
      </div>

      <!-- Quick 4 Trains Guide -->
      <h2 style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:700;color:#0f172a;margin:28px 0 16px">Which Luxury Train Is Best for You?</h2>

      <div class="editorial-train-cards">
        <div class="editorial-train-card">
          <div class="editorial-train-card-title">1. Palace on Wheels <span>7 Nights / 8 Days</span></div>
          <p><strong>Route:</strong> Delhi &rarr; Jaipur &rarr; Ranthambore (Tiger Safari) &rarr; Udaipur &rarr; Jaisalmer &rarr; Jodhpur &rarr; Agra (Taj Mahal) &rarr; Delhi</p>
          <p><strong>Best for:</strong> First-time travelers who want the classic royal Rajasthan, desert dunes, and Taj Mahal experience.</p>
        </div>

        <div class="editorial-train-card">
          <div class="editorial-train-card-title">2. Maharajas&apos; Express <span>3 Nights to 6 Nights</span></div>
          <p><strong>Route:</strong> 4 flexible circuits across Rajasthan, Agra, Khajuraho temples, and the sacred river ghats of Varanasi.</p>
          <p><strong>Best for:</strong> Travelers looking for highest-tier modern luxury, spacious suites, and flexible shorter 4-day or 7-day trips.</p>
        </div>

        <div class="editorial-train-card">
          <div class="editorial-train-card-title">3. The Golden Chariot <span>3 Nights to 5 Nights</span></div>
          <p><strong>Route:</strong> Bengaluru &rarr; Bandipur Safari &rarr; Mysore Palaces &rarr; Hampi UNESCO Ruins &rarr; Goa Beaches</p>
          <p><strong>Best for:</strong> Travelers wanting to discover South India&apos;s ancient temples, rich nature, and tropical beaches.</p>
        </div>

        <div class="editorial-train-card">
          <div class="editorial-train-card-title">4. Deccan Odyssey <span>7 Nights / 8 Days</span></div>
          <p><strong>Route:</strong> 6 distinct journeys through Maharashtra, Gujarat, and Rajasthan, including Ajanta &amp; Ellora caves and Nashik wine country.</p>
          <p><strong>Best for:</strong> History and art lovers who want to explore Western India&apos;s world-famous cave architecture.</p>
        </div>
      </div>

      <div class="editorial-highlight">
        &ldquo;A train ticket only takes you from station to station. KoiKoi Travel takes care of your entire vacation &mdash; from the moment you land at the airport until you fly back home safely.&rdquo;
      </div>

      <div class="editorial-ctas">
        <a class="btn-koikoi-orange" href="#trains">
          <span>Explore All 4 Trains Below</span>
          <span>&darr;</span>
        </a>
        <a class="btn-koikoi-white" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20luxury%20train." target="_blank" rel="noopener">
          <span>Talk to a Specialist on WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- TRAINS -->
<section class="trains" id="trains" style="background:var(--soft)">
  <div class="wrap">
    <div class="sec-head center" style="text-align:center">
      <div class="eyebrow">Choose Your Train</div>
      <h2>India's Luxury Trains</h2>
      <p>Each train has its own route, season and style. Open any train to see its itinerary, departure dates, price, cabins and photos.</p>
    </div>

    <div class="grid-4">

      <!-- Palace on Wheels -->
      <article class="card">
        <div class="photo" style="background-image:linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.26)),url('/images/luxury-trains/palace-on-wheels/hero.jpg')">
          <span>Rajasthan &amp; Agra</span>
          <div class="train-badge">
            <img src="/images/luxury-trains/palace-on-wheels/logo.png" alt="Palace on Wheels Logo">
          </div>
        </div>
        <div class="body">
          <h3 style="margin-bottom:2px">Palace on Wheels</h3>
          <div class="sub" style="margin-bottom:12px">India's first luxury train, since 1982</div>
          <p>A week through the land of kings: forts, palaces, lakes and desert, ending at the Taj Mahal.</p>
          <ul class="facts">
            <li><span>Duration</span><span>7 Nights / 8 Days</span></li>
            <li><span>Route</span><span>Delhi · Jaipur · Ranthambore · Chittorgarh · Udaipur · Jaisalmer · Jodhpur · Bharatpur · Agra</span></li>
            <li><span>Best season</span><span>October to March</span></li>
          </ul>
          <div class="links">
            <a href="{base_path}/palace-on-wheels/itinerary">Itinerary</a>
            <a href="{base_path}/palace-on-wheels/departures">Departures</a>
            <a href="{base_path}/palace-on-wheels/price">Price</a>
            <a href="{base_path}/palace-on-wheels/cabins">Cabins</a>
            <a href="{base_path}/palace-on-wheels/photo-gallery">Photo Gallery</a>
            <a href="{base_path}/palace-on-wheels">Overview</a>
          </div>
          <a class="btn btn-dark" href="{base_path}/palace-on-wheels">View Palace on Wheels</a>
        </div>
      </article>

      <!-- Maharajas Express -->
      <article class="card">
        <div class="photo" style="background-image:linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.26)),url('/images/luxury-trains/maharajas-express/hero.jpg')">
          <span>North, West &amp; Central India</span>
          <div class="train-badge">
            <img src="/images/luxury-trains/maharajas-express/logo.png" alt="Maharajas' Express Logo">
          </div>
        </div>
        <div class="body">
          <h3 style="margin-bottom:2px">Maharajas' Express</h3>
          <div class="sub" style="margin-bottom:12px">4 journeys · 23 coaches · 4 cabin types</div>
          <p>The most varied train: pick a short 4-day trip or a full week through Rajasthan, Orchha, Khajuraho and Varanasi.</p>
          <ul class="facts">
            <li><span>Duration</span><span>3N / 4D or 6N / 7D</span></li>
            <li><span>Journeys</span><span>Treasures of India · Indian Panorama · Indian Splendour · Heritage of India</span></li>
            <li><span>Best season</span><span>October to April</span></li>
          </ul>
          <div class="links">
            <a href="{base_path}/maharajas-express/itinerary">Itinerary</a>
            <a href="{base_path}/maharajas-express/departures">Departures</a>
            <a href="{base_path}/maharajas-express/price">Price</a>
            <a href="{base_path}/maharajas-express/cabins">Cabins</a>
            <a href="{base_path}/maharajas-express/photo-gallery">Photo Gallery</a>
            <a href="{base_path}/maharajas-express">Overview</a>
          </div>
          <a class="btn btn-dark" href="{base_path}/maharajas-express">View Maharajas' Express</a>
        </div>
      </article>

      <!-- Golden Chariot -->
      <article class="card">
        <div class="photo" style="background-image:linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.26)),url('/images/luxury-trains/golden-chariot/hero.jpg')">
          <span>South India</span>
          <div class="train-badge">
            <img src="/images/luxury-trains/golden-chariot/logo.png" alt="Golden Chariot Logo">
          </div>
        </div>
        <div class="body">
          <h3 style="margin-bottom:2px">Golden Chariot</h3>
          <div class="sub" style="margin-bottom:12px">South India's luxury train</div>
          <p>Mysore palaces, Hampi ruins, Bandipur wildlife and the beaches of Goa, all starting from Bengaluru.</p>
          <ul class="facts">
            <li><span>Duration</span><span>3N / 4D or 5N / 6D</span></li>
            <li><span>Journeys</span><span>Glimpses of Karnataka · Pride of Karnataka · Jewels of South</span></li>
            <li><span>Best season</span><span>October to March</span></li>
          </ul>
          <div class="links">
            <a href="{base_path}/golden-chariot/itinerary">Itinerary</a>
            <a href="{base_path}/golden-chariot/departures">Departures</a>
            <a href="{base_path}/golden-chariot/price">Price</a>
            <a href="{base_path}/golden-chariot/cabins">Cabins</a>
            <a href="{base_path}/golden-chariot/photo-gallery">Photo Gallery</a>
            <a href="{base_path}/golden-chariot">Overview</a>
          </div>
          <a class="btn btn-dark" href="{base_path}/golden-chariot">View Golden Chariot</a>
        </div>
      </article>

      <!-- Deccan Odyssey -->
      <article class="card">
        <div class="photo" style="background-image:linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.26)),url('/images/luxury-trains/deccan-odyssey/hero.jpg')">
          <span>Maharashtra, Rajasthan &amp; Gujarat</span>
          <div class="train-badge">
            <img src="/images/luxury-trains/deccan-odyssey/logo.png" alt="Deccan Odyssey Logo">
          </div>
        </div>
        <div class="body">
          <h3 style="margin-bottom:2px">Deccan Odyssey</h3>
          <div class="sub" style="margin-bottom:12px">Six 7-night journeys</div>
          <p>Ajanta and Ellora caves, Goa, Udaipur, the Golden Triangle and even Tadoba tiger country, on one train.</p>
          <ul class="facts">
            <li><span>Duration</span><span>7 Nights / 8 Days</span></li>
            <li><span>Journeys</span><span>Maharashtra Splendour · Wild Trail · Indian Odyssey · Indian Sojourn · Cultural Odyssey · Heritage Odyssey</span></li>
            <li><span>Best season</span><span>September to May</span></li>
          </ul>
          <div class="links">
            <a href="{base_path}/deccan-odyssey/itinerary">Itinerary</a>
            <a href="{base_path}/deccan-odyssey/departures">Departures</a>
            <a href="{base_path}/deccan-odyssey/price">Price</a>
            <a href="{base_path}/deccan-odyssey/cabins">Cabins</a>
            <a href="{base_path}/deccan-odyssey/photo-gallery">Photo Gallery</a>
            <a href="{base_path}/deccan-odyssey">Overview</a>
          </div>
          <a class="btn btn-dark" href="{base_path}/deccan-odyssey">View Deccan Odyssey</a>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- COMPARE & OFFICIAL DEPARTURES -->
<section id="compare" style="background:#faf8f5;border-top:1px solid #eee7de;border-bottom:1px solid #eee7de;padding:64px 0">
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Quick Compare &amp; Departure Schedule</div>
      <h2>Which Train Is Right for You?</h2>
      <p>Compare regions, durations, operating seasons, and official upcoming departure schedules for all 4 luxury trains.</p>
    </div>

    <!-- Responsive Comparison Table -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Train</th>
            <th>Region</th>
            <th>Journeys &amp; Duration</th>
            <th>Operating Season</th>
            <th>Official Departure Dates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style="font-weight:700;color:#0f172a">Palace on Wheels</div>
              <div style="font-size:12px;color:#64748b">Starts from Delhi</div>
            </td>
            <td>Rajasthan &amp; Agra</td>
            <td>1 Classic Circuit<br><span style="font-size:12px;color:#F8904D;font-weight:600">7 Nights / 8 Days</span></td>
            <td>Sep – Apr<br><span style="font-size:12px;color:#64748b">(Peak: Oct – Mar)</span></td>
            <td>
              <strong style="color:#0f172a">Every Wednesday</strong>
              <div style="font-size:12px;color:#64748b;margin-top:2px">Oct: 01, 08, 15, 22, 29 &middot; Nov: 05, 12, 19, 26 &middot; Dec: 03, 10, 17, 24, 31</div>
            </td>
            <td><a href="{base_path}/palace-on-wheels/departures" class="table-link-btn">Full Calendar &rarr;</a></td>
          </tr>
          <tr>
            <td>
              <div style="font-weight:700;color:#0f172a">Maharajas' Express</div>
              <div style="font-size:12px;color:#64748b">Delhi or Mumbai</div>
            </td>
            <td>Rajasthan, Central &amp; North India</td>
            <td>4 Distinct Circuits<br><span style="font-size:12px;color:#F8904D;font-weight:600">3N / 4D or 6N / 7D</span></td>
            <td>Oct – Apr</td>
            <td>
              <strong style="color:#0f172a">Selected Weekends</strong>
              <div style="font-size:12px;color:#64748b;margin-top:2px">Heritage: 11 Oct, 08 Nov &middot; Panorama: 25 Oct, 22 Nov &middot; Splendour: 18 Oct, 15 Nov</div>
            </td>
            <td><a href="{base_path}/maharajas-express/departures" class="table-link-btn">Full Calendar &rarr;</a></td>
          </tr>
          <tr>
            <td>
              <div style="font-weight:700;color:#0f172a">The Golden Chariot</div>
              <div style="font-size:12px;color:#64748b">Starts from Bengaluru</div>
            </td>
            <td>Karnataka, Goa, Kerala, TN</td>
            <td>3 Southern Circuits<br><span style="font-size:12px;color:#F8904D;font-weight:600">3N / 4D or 5N / 6D</span></td>
            <td>Oct – Mar</td>
            <td>
              <strong style="color:#0f172a">Alternate Saturdays</strong>
              <div style="font-size:12px;color:#64748b;margin-top:2px">Pride: 18 Oct, 15 Nov, 13 Dec &middot; Jewels: 01 Nov, 29 Nov &middot; Glimpses: 08 Nov, 06 Dec</div>
            </td>
            <td><a href="{base_path}/golden-chariot/departures" class="table-link-btn">Full Calendar &rarr;</a></td>
          </tr>
          <tr>
            <td>
              <div style="font-weight:700;color:#0f172a">Deccan Odyssey</div>
              <div style="font-size:12px;color:#64748b">Mumbai or Delhi</div>
            </td>
            <td>Maharashtra, Gujarat, Rajasthan</td>
            <td>6 Western Circuits<br><span style="font-size:12px;color:#F8904D;font-weight:600">7 Nights / 8 Days</span></td>
            <td>Sep – May</td>
            <td>
              <strong style="color:#0f172a">Selected Saturdays</strong>
              <div style="font-size:12px;color:#64748b;margin-top:2px">Maharashtra Splendour: 04 Oct, 01 Nov &middot; Indian Odyssey: 18 Oct, 15 Nov</div>
            </td>
            <td><a href="{base_path}/deccan-odyssey/departures" class="table-link-btn">Full Calendar &rarr;</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Official Departure Schedule Cards (100% Mobile & Tablet Responsive) -->
    <div style="margin-top:48px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px">
        <div>
          <h3 style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:700;color:#0f172a;margin:0 0 4px">Official 2025–2026 Departure Calendars</h3>
          <p style="font-size:14px;color:#64748b;margin:0">Verified official dates by train. Peak winter departures (October to February) book out early.</p>
        </div>
        <a class="btn-koikoi-white" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20check%20live%20luxury%20train%20departure%20dates%20for%20me." target="_blank" rel="noopener" style="font-size:13px;padding:9px 18px">
          <span>Inquire Live Dates on WhatsApp</span>
        </a>
      </div>

      <div class="departure-cards-grid">
        <!-- Card 1: Palace on Wheels -->
        <div class="dep-card">
          <div class="dep-card-head">
            <h3>Palace on Wheels</h3>
            <span class="dep-card-badge">Departs Every Wednesday</span>
          </div>
          <ul class="dep-card-list">
            <li>
              <strong>Operating Season &amp; Route</strong>
              September to April &middot; 7 Nights / 8 Days circular journey starting &amp; ending in Delhi (Safdarjung Station).
            </li>
            <li>
              <strong>2025–2026 Peak Departure Dates</strong>
              Oct: 01, 08, 15, 22, 29 &middot; Nov: 05, 12, 19, 26 &middot; Dec: 03, 10, 17, 24, 31 (Holiday Gala) &middot; Jan: 07, 14, 21, 28 &middot; Feb: 04, 11, 18, 25 &middot; Mar: 04, 11, 18, 25
            </li>
            <li>
              <strong>Lean Season Dates (Special Lower Tariff)</strong>
              September 2025: 03, 10, 17, 24 Sep &middot; April 2026: 01, 08, 15, 22, 29 Apr
            </li>
          </ul>
          <div class="dep-card-footer">
            <a class="table-link-btn" href="{base_path}/palace-on-wheels/departures">View Official POW Schedule &rarr;</a>
            <a class="table-link-btn" href="{base_path}/palace-on-wheels/price" style="color:#64748b">Check Tariffs &rarr;</a>
          </div>
        </div>

        <!-- Card 2: Maharajas' Express -->
        <div class="dep-card">
          <div class="dep-card-head">
            <h3>Maharajas' Express</h3>
            <span class="dep-card-badge">4 Distinct Circuits</span>
          </div>
          <ul class="dep-card-list">
            <li>
              <strong>The Heritage of India (6N / 7D &middot; Mumbai to Delhi)</strong>
              11 Oct, 08 Nov, 06 Dec 2025 &middot; 03 Jan, 31 Jan, 28 Feb 2026
            </li>
            <li>
              <strong>The Indian Panorama (6N / 7D &middot; Delhi to Delhi)</strong>
              25 Oct, 22 Nov, 20 Dec 2025 &middot; 17 Jan, 14 Feb, 14 Mar 2026
            </li>
            <li>
              <strong>The Indian Splendour (6N / 7D &middot; Delhi to Mumbai)</strong>
              18 Oct, 15 Nov, 13 Dec 2025 &middot; 10 Jan, 07 Feb, 07 Mar 2026
            </li>
            <li>
              <strong>Treasures of India (3N / 4D Golden Triangle)</strong>
              02 Nov, 30 Nov, 28 Dec 2025 &middot; 25 Jan, 22 Feb, 22 Mar 2026
            </li>
          </ul>
          <div class="dep-card-footer">
            <a class="table-link-btn" href="{base_path}/maharajas-express/departures">View Official ME Schedule &rarr;</a>
            <a class="table-link-btn" href="{base_path}/maharajas-express/price" style="color:#64748b">Check Tariffs &rarr;</a>
          </div>
        </div>

        <!-- Card 3: The Golden Chariot -->
        <div class="dep-card">
          <div class="dep-card-head">
            <h3>The Golden Chariot</h3>
            <span class="dep-card-badge">South India Heritage</span>
          </div>
          <ul class="dep-card-list">
            <li>
              <strong>Pride of Karnataka (5N / 6D &middot; Bengaluru to Bengaluru)</strong>
              18 Oct, 15 Nov, 13 Dec 2025 &middot; 03 Jan, 31 Jan, 28 Feb 2026
            </li>
            <li>
              <strong>Jewels of South (5N / 6D &middot; Bengaluru to Bengaluru via Kerala)</strong>
              01 Nov, 29 Nov, 27 Dec 2025 &middot; 17 Jan, 14 Feb, 14 Mar 2026
            </li>
            <li>
              <strong>Glimpses of Karnataka (3N / 4D Short Circuit)</strong>
              08 Nov, 06 Dec, 20 Dec 2025 &middot; 24 Jan, 21 Feb 2026
            </li>
          </ul>
          <div class="dep-card-footer">
            <a class="table-link-btn" href="{base_path}/golden-chariot/departures">View Official GC Schedule &rarr;</a>
            <a class="table-link-btn" href="{base_path}/golden-chariot/price" style="color:#64748b">Check Tariffs &rarr;</a>
          </div>
        </div>

        <!-- Card 4: Deccan Odyssey -->
        <div class="dep-card">
          <div class="dep-card-head">
            <h3>Deccan Odyssey</h3>
            <span class="dep-card-badge">6 Royal Circuits</span>
          </div>
          <ul class="dep-card-list">
            <li>
              <strong>Maharashtra Splendour (7N / 8D &middot; Mumbai to Mumbai)</strong>
              04 Oct, 01 Nov, 06 Dec 2025 &middot; 03 Jan, 31 Jan, 28 Feb 2026
            </li>
            <li>
              <strong>Indian Odyssey (7N / 8D &middot; Delhi to Mumbai)</strong>
              18 Oct, 15 Nov, 13 Dec 2025 &middot; 17 Jan, 14 Feb, 14 Mar 2026
            </li>
            <li>
              <strong>Maharashtra Wild Trail (7N / 8D &middot; Tadoba &amp; Pench)</strong>
              25 Oct, 22 Nov, 20 Dec 2025 &middot; 24 Jan, 21 Feb, 21 Mar 2026
            </li>
          </ul>
          <div class="dep-card-footer">
            <a class="table-link-btn" href="{base_path}/deccan-odyssey/departures">View Official DO Schedule &rarr;</a>
            <a class="table-link-btn" href="{base_path}/deccan-odyssey/price" style="color:#64748b">Check Tariffs &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHY -->
<section style="background:var(--soft)">
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Why KoiKoi Travel</div>
      <h2>We Plan It Like It's Our Own Trip</h2>
      <p>The train is only one part of the journey. We look after everything around it.</p>
    </div>
    <div class="why-grid">
      <div class="why"><img src="https://koikoitravel.com/images/why-choose-us/designer-v5.jpg" alt="KoiKoi personal travel designer" loading="lazy"><h3>Right Train, Right Dates</h3><p>Your personal travel designer matches the train and journey to your dates, group and budget, so you do not have to read four websites.</p></div>
      <div class="why"><img src="https://koikoitravel.com/images/why-choose-us/storyteller-v5.jpg" alt="KoiKoi local storyteller" loading="lazy"><h3>Local Storytellers</h3><p>Add a private guide or a stay in Delhi, Agra or Jaipur before and after your train, with stories you will not find in a guidebook.</p></div>
      <div class="why"><img src="https://koikoitravel.com/images/why-choose-us/driver-v5.jpg" alt="KoiKoi private driver and car" loading="lazy"><h3>Private Car &amp; Transfers</h3><p>Airport pickups and a private car at your own pace, so every link in the trip connects.</p></div>
      <div class="why"><img src="https://koikoitravel.com/images/why-choose-us/support-v5.jpg" alt="KoiKoi 24/7 travel support" loading="lazy"><h3>24/7 WhatsApp Support</h3><p>One trip manager on WhatsApp from your first message until you are back home.</p></div>
    </div>
  </div>
</section>

<!-- STEPS -->
<section class="steps">
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">How It Works</div>
      <h2>3 Simple Steps</h2>
      <p>No forms to fill and no pressure. Just a quick chat.</p>
    </div>
    <div class="step-grid">
      <div class="step"><div class="n">01</div><h3>Tell Us Your Plan</h3><p>Share your dates, number of guests and the type of cabin you like. Rough ideas are fine.</p></div>
      <div class="step"><div class="n">02</div><h3>Get Your Custom Quote</h3><p>We send train options, departure dates and a clear quote on WhatsApp and email within 12–24 hours.</p></div>
      <div class="step"><div class="n">03</div><h3>Board &amp; Enjoy</h3><p>We confirm your cabin and arrange everything else. You just arrive and enjoy the ride.</p></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section>
  <div class="wrap">
    <div class="sec-head center" style="text-align:center">
      <div class="eyebrow">FAQs</div>
      <h2>Luxury Train Questions</h2>
    </div>
    <div class="faq">
      <details open>
        <summary>Which is the best luxury train in India?</summary>
        <p>It depends on what you want to see. Palace on Wheels is best for Rajasthan and the Taj Mahal. Maharajas' Express has the most journey choices. Golden Chariot covers South India. Deccan Odyssey mixes Maharashtra, Rajasthan and Gujarat. Message us and we will suggest one.</p>
      </details>
      <details>
        <summary>When do the luxury trains run?</summary>
        <p>Most run in the cooler months, roughly September or October to March or April. Exact departure dates change every season, so each train page lists the current dates.</p>
      </details>
      <details>
        <summary>How much does a luxury train journey cost?</summary>
        <p>The price depends on the train, journey, cabin type and travel dates. We do not publish a fixed price here. Send us your dates and we will share a clear quote.</p>
      </details>
      <details>
        <summary>What is included on board?</summary>
        <p>In general, your cabin, meals, sightseeing with a guide and on-board service are part of the journey. Inclusions differ by train, so please check the train page or ask us for the exact list.</p>
      </details>
      <details>
        <summary>Can you add hotels, flights or a private tour?</summary>
        <p>Yes. We can add a hotel before or after your train, airport transfers, domestic flights and a private tour to any other part of India.</p>
      </details>
      <details>
        <summary>Can children travel on these trains?</summary>
        <p>Rules are different for each train. Palace on Wheels, for example, treats guests up to 12 years as children. Tell us who is travelling and we will confirm the policy for your train.</p>
      </details>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-band">
  <div class="wrap">
    <h2>Ready to Ride the Rails Like a Maharaja?</h2>
    <p>Share your dates and we will send your custom luxury train plan on WhatsApp and email within 12–24 hours.</p>
    <a class="btn btn-gold" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20plan%20a%20luxury%20train%20journey." target="_blank" rel="noopener">Get My Free Quote</a>
  </div>
</section>
"""
    write_page(f"{base_dir}/index.html", 
               "Luxury Trains of India | Palace on Wheels, Maharajas' Express & More | KoiKoi Travel",
               "Plan a luxury train journey in India with KoiKoi Travel. Palace on Wheels, Maharajas' Express, Golden Chariot and Deccan Odyssey.",
               home_content, base_path=base_path)

    # ================= 2. PALACE ON WHEELS SUBPAGES =================
    pow_data = {
        "slug": "palace-on-wheels",
        "name": "Palace on Wheels",
        "tagline": "India's First Luxury Train, Since 1982",
        "banner": "/images/luxury-trains/palace-on-wheels/hero.jpg",
    }

    # Palace on Wheels: Overview
    pow_overview = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{pow_data["banner"]}');">
  <div class="wrap">
    <span class="tag">PALACE ON WHEELS · OVERVIEW</span>
    <h1>The Pioneer of Luxury Rail Travel in India</h1>
    <p>Step aboard the authentic coaches inspired by erstwhile Rajput rulers and the British Viceroy. An unforgettable 7 Nights / 8 Days circular journey starting and finishing in Delhi.</p>
    <div class="cta">
      <a class="btn btn-gold" href="{base_path}/palace-on-wheels/itinerary">View Itinerary</a>
      <a class="btn btn-line" href="{base_path}/palace-on-wheels/departures">Check Departure Dates</a>
    </div>
  </div>
</section>

<!-- PALACE ON WHEELS VIDEO SPOTLIGHT (SPLIT ROYAL LAYOUT) -->
<section class="train-video-sec">
  <div class="wrap">
    <div class="train-video-box">
      <!-- Left: Train Details & Logo -->
      <div class="train-video-content">
        <div class="train-video-logo">
          <img src="/images/luxury-trains/palace-on-wheels/logo.png" alt="Palace on Wheels Logo">
        </div>
        <h2 class="train-video-title">Palace on Wheels</h2>
        <p class="train-video-desc">
          World&apos;s leading heritage luxury train &mdash; Modelled along the personal royal saloons of the erstwhile Rajput Maharajas, the Palace on Wheels is a royal 5-star palace on tracks taking guests across Rajasthan, the golden dunes of Jaisalmer, the lake palaces of Udaipur, and the timeless Taj Mahal in Agra.
        </p>
        <p class="train-video-desc">
          7 Nights &amp; 8 Days of imperial grandeur: In operation since 1982, this iconic train departs weekly from Delhi, traversing Jaipur, Ranthambore tiger safari, Chittorgarh, Udaipur, Jaisalmer, Jodhpur, and Bharatpur. Each deluxe saloon is serviced by dedicated personal Khidmatgars.
        </p>
        <div class="train-video-ctas">
          <a class="btn-koikoi-orange" href="{base_path}/palace-on-wheels/itinerary">
            <span>View 7-Night Itinerary</span>
            <span>&rarr;</span>
          </a>
          <a class="btn-koikoi-white" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20am%20interested%20in%20the%20Palace%20on%20Wheels%20journey." target="_blank" rel="noopener">
            <span>Get a Quote</span>
          </a>
        </div>
      </div>

      <!-- Right: YouTube Video Player -->
      <div class="train-video-player" id="powOverviewVideoBox">
        <div class="video-facade" onclick="loadPowVideo('powOverviewVideoBox')" style="background-image:url('https://img.youtube.com/vi/HnY_2_BBbW4/maxresdefault.jpg')">
          <div class="video-facade-overlay"></div>
          <div class="video-play-btn" aria-label="Play Palace on Wheels Video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style="margin-left:3px"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <span class="video-caption-pill">Palace on Wheels &middot; Experience Video</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">The Royal Experience</div>
      <h2>A Week Across the Land of Kings</h2>
      <p>Palace on Wheels was rated the 4th best luxury train in the world by Condé Nast. Each saloon is named after princely states of Rajasthan, furnished in royal heritage decor with private modern bathrooms.</p>
    </div>
    <div class="grid-4" style="margin-bottom:48px">
      <div class="card" style="padding:24px">
        <h3>14 Deluxe Saloons</h3>
        <p>Named after Mewar, Marwar, Bikaner, Amber, and other princely states, with two private Khidmatgars per coach.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>2 Fine Dining Cars</h3>
        <p>Sheesh Mahal and Swarn Mahal serve authentic Rajasthani, Mughlai, Continental and Chinese delicacies.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>The Bar & Lounge</h3>
        <p>Relax with fine scotches, Indian wines and signature cocktails in a vintage regal setting with scenic viewing windows.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Royal Rejuvenation Spa</h3>
        <p>Dedicated Ayurvedic wellness coach offering reflexology, herbal therapies and massages by certified therapists.</p>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Detail</th><th>Specification</th></tr></thead>
        <tbody>
          <tr><td>Route</td><td>Delhi – Jaipur – Sawai Madhopur – Chittorgarh – Udaipur – Jaisalmer – Jodhpur – Bharatpur – Agra – Delhi</td></tr>
          <tr><td>Duration</td><td>7 Nights / 8 Days (Departs Every Wednesday)</td></tr>
          <tr><td>Total Capacity</td><td>82 Guests Maximum</td></tr>
          <tr><td>Operating Season</td><td>September to April Every Year</td></tr>
          <tr><td>Inclusions</td><td>Accommodation, all meals, scheduled excursions, monument fees, wildlife safari, guide, butler</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/palace-on-wheels/index.html", 
               "Palace on Wheels Luxury Train | Route, Schedule & Highlights | KoiKoi Travel",
               "Complete overview of Palace on Wheels luxury train: route, coaches, dining and royal history with KoiKoi Travel.",
               pow_overview, active_train="palace-on-wheels", active_tab="overview", base_path=base_path)

    # Palace on Wheels: Itinerary
    pow_itinerary = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{pow_data["banner"]}');">
  <div class="wrap">
    <span class="tag">PALACE ON WHEELS · ITINERARY</span>
    <h1>7 Nights / 8 Days Classic Rajasthan Journey</h1>
    <p>Departs every Wednesday from Delhi Safdarjung Station between September and April.</p>
    <div class="cta">
      <a class="btn btn-gold" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20book%20the%20Palace%20on%20Wheels%20itinerary." target="_blank" rel="noopener">Inquire This Route</a>
      <a class="btn btn-line" href="{base_path}/palace-on-wheels/price">View Prices</a>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Day-by-Day Detailed Plan</div>
      <h2>Royal Circuit Day Schedule</h2>
      <p>Wake up each morning in a new royal destination without unpacking your luggage twice.</p>
    </div>
    
    <div class="day-card">
      <span class="day-badge">Day 1 · Wednesday</span>
      <h3>Delhi: Royal Boarding at Safdarjung Station</h3>
      <p>Report at Safdarjung Railway Station at 16:00 hrs for a traditional red-carpet welcome with garlands, tikka, and shehnai music. Introduction to your Khidmatgar and departure for Jaipur at 18:30 hrs. Dinner on board.</p>
      <div class="day-meta"><span>Meals: Dinner</span><span>Night: On board Palace on Wheels</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 2 · Thursday</span>
      <h3>Jaipur: The Pink City, Amber Fort & City Palace</h3>
      <p>Arrive in Jaipur. Morning excursion to the hill-top Amber Fort with royal elephant ride. Visit Hawa Mahal, Jantar Mantar and the royal City Palace. Enjoy lunch at an authentic palace hotel followed by shopping for gems and textiles.</p>
      <div class="day-meta"><span>Meals: Breakfast, Lunch, Dinner</span><span>Night: On board</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 3 · Friday</span>
      <h3>Sawai Madhopur (Ranthambore) & Chittorgarh</h3>
      <p>Early morning jungle safari into Ranthambore Tiger Reserve in open safari vehicles. Return to train for breakfast as train glides toward Chittorgarh. Evening visit to the magnificent Chittorgarh Fort with sound and light show.</p>
      <div class="day-meta"><span>Meals: Breakfast, Lunch, Dinner</span><span>Night: On board</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 4 · Saturday</span>
      <h3>Udaipur: City of Lakes & Royal Palaces</h3>
      <p>Arrive in romantic Udaipur. Tour the grand City Palace complex, Jag Mandir, and Saheliyon Ki Bari gardens. Enjoy an exclusive boat ride on Lake Pichola with lunch at a boutique lake palace hotel.</p>
      <div class="day-meta"><span>Meals: Breakfast, Lunch, Dinner</span><span>Night: On board</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 5 · Sunday</span>
      <h3>Jaisalmer: Golden Fort & Sam Sand Dunes Sunset</h3>
      <p>Wake up amidst the Thar Desert. Tour the living Golden Fort (Sonar Kila), Jain temples and Patwon ki Haveli. Late afternoon excursion to Sam Sand Dunes for camel rides, sunset views, and cultural barbecue dinner under the desert stars.</p>
      <div class="day-meta"><span>Meals: Breakfast, Lunch, Dinner</span><span>Night: On board</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 6 · Monday</span>
      <h3>Jodhpur: Mehrangarh Fort & Jaswant Thada</h3>
      <p>Arrive in the Sun City of Jodhpur. Ascend to the impregnable Mehrangarh Fort towering above the blue city. Visit Jaswant Thada marble cenotaphs and Umaid Bhawan Palace museum. Lunch at a heritage venue.</p>
      <div class="day-meta"><span>Meals: Breakfast, Lunch, Dinner</span><span>Night: On board</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 7 · Tuesday</span>
      <h3>Bharatpur Bird Sanctuary & The Taj Mahal, Agra</h3>
      <p>Dawn cycle-rickshaw safari in Keoladeo National Park (UNESCO Bird Sanctuary). Return for breakfast and proceed to Agra. Marvel at the Taj Mahal, followed by a guided tour of Agra Fort and souvenir shopping.</p>
      <div class="day-meta"><span>Meals: Breakfast, Lunch, Dinner</span><span>Night: On board</span></div>
    </div>

    <div class="day-card">
      <span class="day-badge">Day 8 · Wednesday</span>
      <h3>Delhi: Disembarkation & Farewell</h3>
      <p>Train arrives at Delhi Safdarjung Station at 06:00 hrs. Enjoy leisurely breakfast on board. Farewell ceremony and disembarkation with lifelong royal memories by 07:30 hrs.</p>
      <div class="day-meta"><span>Meals: Breakfast</span><span>Trip End</span></div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/palace-on-wheels/itinerary/index.html", 
               "Palace on Wheels Itinerary 7N/8D Day by Day | KoiKoi Travel",
               "Detailed 7 Nights / 8 Days itinerary for Palace on Wheels: Jaipur, Ranthambore, Udaipur, Jaisalmer, Jodhpur, Bharatpur and Taj Mahal.",
               pow_itinerary, active_train="palace-on-wheels", active_tab="itinerary", base_path=base_path)

    # Palace on Wheels: Departures
    pow_departures = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{pow_data["banner"]}');">
  <div class="wrap">
    <span class="tag">PALACE ON WHEELS · DEPARTURES</span>
    <h1>2024–2025 & 2025–2026 Departure Schedule</h1>
    <p>Departs every Wednesday from New Delhi Safdarjung Station. Check upcoming available dates below.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Operating Calendar</div>
      <h2>Every Wednesday: September to April</h2>
      <p>Due to high demand from international travelers, cabins on October to February departures book out 6–9 months in advance.</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Month</th><th>Departure Dates (2024–2025)</th><th>Departure Dates (2025–2026)</th><th>Season Type</th></tr></thead>
        <tbody>
          <tr><td>September</td><td>04, 11, 18, 25 Sep 2024</td><td>03, 10, 17, 24 Sep 2025</td><td>Lean Season (Special Tariff)</td></tr>
          <tr><td>October</td><td>02, 09, 16, 23, 30 Oct 2024</td><td>01, 08, 15, 22, 29 Oct 2025</td><td>Peak Season</td></tr>
          <tr><td>November</td><td>06, 13, 20, 27 Nov 2024</td><td>05, 12, 19, 26 Nov 2025</td><td>Peak Season</td></tr>
          <tr><td>December</td><td>04, 11, 18, 25 Dec 2024</td><td>03, 10, 17, 24, 31 Dec 2025</td><td>Peak Season (Holiday Gala)</td></tr>
          <tr><td>January</td><td>01, 08, 15, 22, 29 Jan 2025</td><td>07, 14, 21, 28 Jan 2026</td><td>Peak Season</td></tr>
          <tr><td>February</td><td>05, 12, 19, 26 Feb 2025</td><td>04, 11, 18, 25 Feb 2026</td><td>Peak Season</td></tr>
          <tr><td>March</td><td>05, 12, 19, 26 Mar 2025</td><td>04, 11, 18, 25 Mar 2026</td><td>Peak Season</td></tr>
          <tr><td>April</td><td>02, 09, 16, 23, 30 Apr 2025</td><td>01, 08, 15, 22, 29 Apr 2026</td><td>Lean Season (Special Tariff)</td></tr>
        </tbody>
      </table>
    </div>
    <div style="margin-top:36px;text-align:center">
      <a class="btn btn-gold" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20check%20Palace%20on%20Wheels%20dates%20for%20me." target="_blank" rel="noopener">Check Live Date Availability</a>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/palace-on-wheels/departures/index.html", 
               "Palace on Wheels Departure Dates 2024-2025 & 2026 | KoiKoi Travel",
               "Official departure calendar for Palace on Wheels luxury train. Weekly departures every Wednesday from September to April.",
               pow_departures, active_train="palace-on-wheels", active_tab="departures", base_path=base_path)

    # Palace on Wheels: Price
    pow_price = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{pow_data["banner"]}');">
  <div class="wrap">
    <span class="tag">PALACE ON WHEELS · TARIFF & PRICE</span>
    <h1>All-Inclusive Official Royal Tariff</h1>
    <p>Transparent government tariffs with zero agency markup. Includes meals, sightseeing, entrance fees, and personal butler.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Price Per Person (7 Nights / 8 Days)</div>
      <h2>Cabin Tariff Breakdown</h2>
      <p>Rates are subject to government service tax (5% GST). Contact us for live currency conversions and INR rates.</p>
    </div>
    <div class="table-wrap" style="margin-bottom:36px">
      <table>
        <thead><tr><th>Cabin Category</th><th>Occupancy Type</th><th>Peak Season (Oct – Mar)</th><th>Lean Season (Sep & Apr)</th></tr></thead>
        <tbody>
          <tr><td>Deluxe Cabin</td><td>Single Occupancy</td><td>$7,000 USD</td><td>$5,250 USD</td></tr>
          <tr><td>Deluxe Cabin</td><td>Double Sharing (per person)</td><td>$5,250 USD</td><td>$3,950 USD</td></tr>
          <tr><td>Deluxe Cabin</td><td>Triple Sharing (per person)</td><td>$4,550 USD</td><td>$3,400 USD</td></tr>
          <tr><td>Super Deluxe Suite</td><td>Single Occupancy</td><td>$14,000 USD</td><td>$10,500 USD</td></tr>
          <tr><td>Super Deluxe Suite</td><td>Double Sharing (per cabin)</td><td>$18,200 USD</td><td>$13,650 USD</td></tr>
        </tbody>
      </table>
    </div>

    <div class="grid-4">
      <div class="card" style="padding:24px">
        <h3>What is Included</h3>
        <ul class="facts">
          <li><span>Accommodation</span><span>Private en-suite royal cabin</span></li>
          <li><span>All Meals</span><span>Breakfast, Lunch, High Tea, Dinner</span></li>
          <li><span>Sightseeing</span><span>AC coach tours with English guides</span></li>
          <li><span>Monuments</span><span>Entry tickets, boat ride & camel safari</span></li>
          <li><span>Butler Service</span><span>Dedicated Khidmatgar in royal uniform</span></li>
        </ul>
      </div>
      <div class="card" style="padding:24px">
        <h3>What is Excluded</h3>
        <ul class="facts">
          <li><span>Government Taxes</span><span>5% GST applicable on total</span></li>
          <li><span>Drinks</span><span>Alcoholic beverages & bar orders</span></li>
          <li><span>Spa</span><span>Massages & wellness therapies</span></li>
          <li><span>Tips</span><span>Gratuities for crew & tour guides</span></li>
          <li><span>Flights</span><span>Pre/post international or domestic flights</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/palace-on-wheels/price/index.html", 
               "Palace on Wheels Ticket Price & Tariff 2024-2025 | KoiKoi Travel",
               "Official ticket prices for Palace on Wheels: Deluxe cabins and Super Deluxe suites tariffs in USD and INR.",
               pow_price, active_train="palace-on-wheels", active_tab="price", base_path=base_path)

    # Palace on Wheels: Cabins
    pow_cabins = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{pow_data["banner"]}');">
  <div class="wrap">
    <span class="tag">PALACE ON WHEELS · CABINS & SUITES</span>
    <h1>Imperial Accommodations on Wheels</h1>
    <p>14 Saloons featuring antique Rajasthani miniature paintings, richly carved teakwood, and modern attached bathrooms.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="cabin-grid">
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/palace-on-wheels/swarn-mahal.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">105 sq. ft. · Deluxe Category</span>
          <h3>Deluxe Cabin</h3>
          <p>Elegantly crafted with silk upholstery, wooden marquetry, and twin or double bed configuration. Each saloon holds 4 cabins with a dedicated mini-pantry and personal Khidmatgar.</p>
          <ul class="cabin-features">
            <li>Private en-suite bathroom with shower and running hot/cold water</li>
            <li>Individual climate control AC</li>
            <li>Electronic safety locker & intercom</li>
            <li>Panoramic large picture windows with sun shades</li>
            <li>Complimentary vanity amenities & bathrobes</li>
          </ul>
          <a class="btn btn-dark" style="width:100%" href="https://wa.me/919136739178?text=Hi%20KoiKoi%2C%20I%20am%20interested%20in%20Palace%20on%20Wheels%20Deluxe%20Cabin." target="_blank" rel="noopener">Book Deluxe Cabin</a>
        </div>
      </div>

      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/palace-on-wheels/hero.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">140 sq. ft. · Presidential Class</span>
          <h3>Super Deluxe Suite</h3>
          <p>Named after precious gems (Emerald, Ruby, Diamond). Offers extra spacious floor plans with rich velvet furnishings, queen bed, private writing desk, and private chauffeured car for sightseeing.</p>
          <ul class="cabin-features">
            <li>Dedicated private air-conditioned car for all off-train excursions</li>
            <li>Personal English-speaking guide for monument tours</li>
            <li>Luxury sofa lounge and double queen bed</li>
            <li>Complimentary bottle of fine wine upon arrival</li>
            <li>Upgraded bathroom with organic botanical toiletries</li>
          </ul>
          <a class="btn btn-gold" style="width:100%" href="https://wa.me/919136739178?text=Hi%20KoiKoi%2C%20I%20am%20interested%20in%20Palace%20on%20Wheels%20Super%20Deluxe%20Suite." target="_blank" rel="noopener">Book Super Deluxe Suite</a>
        </div>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/palace-on-wheels/cabins/index.html", 
               "Palace on Wheels Cabins & Suites Photos & Dimensions | KoiKoi Travel",
               "Explore Deluxe cabins and Super Deluxe suites on Palace on Wheels. Amenities, en-suite bathrooms and royal saloon layout.",
               pow_cabins, active_train="palace-on-wheels", active_tab="cabins", base_path=base_path)

    # Palace on Wheels: Photo Gallery
    pow_gallery = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{pow_data["banner"]}');">
  <div class="wrap">
    <span class="tag">PALACE ON WHEELS · PHOTO GALLERY</span>
    <h1>Visual Tour of Royal Rajasthan on Rails</h1>
    <p>Glimpse inside the train exterior, royal dining saloons, bar lounge, palatial cabins, and off-train excursions.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="gallery-grid">
      <div class="g-item"><img src="/images/luxury-trains/palace-on-wheels/hero.jpg" alt="Palace on Wheels Train Exterior"><span>Royal Train Exterior</span></div>
      <div class="g-item"><img src="/images/luxury-trains/palace-on-wheels/sheesh-mahal-1.jpg" alt="Sheesh Mahal Restaurant"><span>Sheesh Mahal Restaurant</span></div>
      <div class="g-item"><img src="/images/luxury-trains/palace-on-wheels/sheesh-mahal-2.jpg" alt="Sheesh Mahal Dining Hall"><span>Sheesh Mahal Dining Car</span></div>
      <div class="g-item"><img src="/images/luxury-trains/palace-on-wheels/swarn-mahal.jpg" alt="Swarn Mahal Restaurant"><span>Swarn Mahal Royal Car</span></div>
      <div class="g-item"><img src="/images/luxury-trains/palace-on-wheels/bar.jpg" alt="Sheesh Mahal Bar & Lounge"><span>Sheesh Mahal Bar Lounge</span></div>
      <div class="g-item"><img src="/images/luxury-trains/palace-on-wheels/exterior.webp" alt="Palace on Wheels Historic Carriage"><span>Imperial Heritage Coach</span></div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/palace-on-wheels/photo-gallery/index.html", 
               "Palace on Wheels Photo Gallery | Interior, Exterior & Excursions | KoiKoi Travel",
               "High resolution photo gallery of Palace on Wheels luxury train. View cabins, dining cars, lounges and scenic stops.",
               pow_gallery, active_train="palace-on-wheels", active_tab="photo-gallery", base_path=base_path)

    # ================= 3. MAHARAJAS' EXPRESS SUBPAGES =================
    me_data = {
        "slug": "maharajas-express",
        "name": "Maharajas' Express",
        "tagline": "World's Leading Luxury Train (7x Winner)",
        "banner": "/images/luxury-trains/maharajas-express/hero.jpg",
    }

    # Common Sticky Curator / Booking Card Component
    def get_me_sticky_card():
        return f"""
<div class="sticky-curator-card">
  <div class="badge-offer">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    <span>Special Offer · 2025–2026 Inquiries Open</span>
  </div>
  <div class="price-tag">
    $4,890 <span style="font-size:18px;font-weight:600;color:#64748b">/ person</span>
    <small>Starting tariff (Treasures of India, Deluxe Cabin sharing) · Approx ₹4,10,000</small>
  </div>
  <p style="font-size:13px;color:#64748b;margin:12px 0 0;line-height:1.5">
    Choose from <strong>4 distinct circuits</strong> (3 Nights / 4 Days or 6 Nights / 7 Days). Book with official guarantees and bespoke pre/post 5-star extensions.
  </p>
  <a class="btn-wa" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20am%20interested%20in%20the%20Maharajas%27%20Express%20luxury%20train.%20Please%20share%20circuit%20options%2C%20cabins%2C%20and%20availabilities." target="_blank" rel="noopener">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    Chat on WhatsApp
  </a>
  <a class="btn-quote-main" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20send%20me%20a%20custom%20quote%20for%20Maharajas%27%20Express." target="_blank" rel="noopener">
    Request a Custom Quote
  </a>
  <div style="margin-top:14px;background:#f8fafc;padding:10px 14px;border-radius:10px;text-align:center;font-size:12px;font-weight:600;color:#475569">
    ✦ 100% Tailored Extensions · Handpicked 5-Star Palaces
  </div>
  <ul class="trust-list">
    <li class="trust-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      <div><strong>Dedicated Rail Concierge:</strong> One trip manager on WhatsApp before, during, and after your rail journey.</div>
    </li>
    <li class="trust-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <div><strong>Handpicked 5-Star Stays:</strong> Curated pre/post nights at The Oberoi, Taj Mahal Palace & The Leela.</div>
    </li>
    <li class="trust-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="8" rx="2"></rect><circle cx="7" cy="19" r="2"></circle><circle cx="17" cy="19" r="2"></circle><path d="M5 11l2-5h10l2 5"></path></svg>
      <div><strong>Private Chauffeur Transfers:</strong> Seamless airport VIP meet & greet in private Mercedes/Innova Crysta.</div>
    </li>
    <li class="trust-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      <div><strong>Impartial Route Advice:</strong> Neutral guidance on all 4 circuits and cabins to match your travel season.</div>
    </li>
  </ul>
</div>
"""

    # Common 4 Signature Tour Package Cards Component (KoiKoi Signature Style)
    def get_me_4_journeys_cards():
        return f"""
<div class="koikoi-card-grid">
  <!-- Card 1: The Heritage of India -->
  <div class="koikoi-tour-card" id="card-heritage">
    <a href="{base_path}/maharajas-express/itinerary#heritage-of-india" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/hero.jpg" alt="The Heritage of India - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/itinerary#heritage-of-india" class="koikoi-card-title">
        7 Days - The Heritage of India Luxury Rail Tour
      </a>
      <div class="koikoi-card-route">
        Mumbai · Udaipur · Jodhpur · Bikaner · Jaipur · Ranthambore · Agra · Delhi
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Lake Pichola Boat Cruise & City Palace Udaipur</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Bikaner Thar Sand Dunes Banquet & Folk Music</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Ranthambore Tiger Safari & Sunrise at Taj Mahal</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Hotels · Meals · Sightseeing · Transfers
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20a%20quote%20for%20Maharajas%27%20Express%20-%20The%20Heritage%20of%20India%20(Mumbai%20to%20Delhi%2C%207%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/itinerary#heritage-of-india">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 2: The Indian Panorama -->
  <div class="koikoi-tour-card" id="card-panorama">
    <a href="{base_path}/maharajas-express/itinerary#indian-panorama" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/dining-pink.jpg" alt="The Indian Panorama - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/itinerary#indian-panorama" class="koikoi-card-title">
        7 Days - The Indian Panorama Luxury Rail Tour
      </a>
      <div class="koikoi-card-route">
        Delhi · Jaipur · Ranthambore · Fatehpur Sikri · Agra · Orchha · Khajuraho · Varanasi · Delhi
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Varanasi Ganges Sunset Cruise & Maha Ganga Aarti</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>UNESCO World Heritage Temples of Khajuraho & Orchha</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Amber Fort Jeep Ride, Tigers & Sunrise Taj Mahal</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Hotels · Meals · Sightseeing · Transfers
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20a%20quote%20for%20Maharajas%27%20Express%20-%20The%20Indian%20Panorama%20(Delhi%20to%20Delhi%2C%207%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/itinerary#indian-panorama">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 3: The Indian Splendour -->
  <div class="koikoi-tour-card" id="card-splendour">
    <a href="{base_path}/maharajas-express/itinerary#indian-splendour" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/suite.jpg" alt="The Indian Splendour - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/itinerary#indian-splendour" class="koikoi-card-title">
        7 Days - The Indian Splendour Luxury Rail Tour
      </a>
      <div class="koikoi-card-route">
        Delhi · Agra · Ranthambore · Jaipur · Bikaner · Jodhpur · Udaipur · Mumbai
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Sunrise Taj Mahal & Champagne Breakfast at Taj Khema</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Bikaner Sand Dunes Sundowner & Mehrangarh Fort Cocktail</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Ranthambore Tigers & Lake Pichola Royal Cruise</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Hotels · Meals · Sightseeing · Transfers
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20a%20quote%20for%20Maharajas%27%20Express%20-%20The%20Indian%20Splendour%20(Delhi%20to%20Mumbai%2C%207%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/itinerary#indian-splendour">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 4: Treasures of India -->
  <div class="koikoi-tour-card" id="card-treasures">
    <a href="{base_path}/maharajas-express/itinerary#treasures-of-india" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/deluxe-cabin.jpg" alt="Treasures of India - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/itinerary#treasures-of-india" class="koikoi-card-title">
        4 Days - Treasures of India Golden Triangle Tour
      </a>
      <div class="koikoi-card-route">
        Delhi · Agra · Ranthambore · Jaipur · Delhi
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Iconic Golden Triangle Packed in Royal 4-Day Luxury</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Sunrise at Taj Mahal & Majestic Agra Red Fort</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Ranthambore Jungle Safari & Amber Fort Elephant Welcome</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Hotels · Meals · Sightseeing · Transfers
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20a%20quote%20for%20Maharajas%27%20Express%20-%20Treasures%20of%20India%20(4%20Days%20Golden%20Triangle)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/itinerary#treasures-of-india">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
"""

    # Inclusions & Exclusions Box Component
    def get_me_inclusions_exclusions():
        return f"""
<div class="inc-exc-grid">
  <div class="inc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="16 9 10 15 7 12"></polyline></svg>
      What's Included Aboard Maharajas' Express
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Accommodation in chosen luxury cabin or suite with en-suite bathroom and personal butler</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All gourmet meals on board at Rang Mahal and Mayur Mahal fine-dining restaurants</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>House brands of wine, beer, and spirits served complimentary in lounge bars and at dinner</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Guided off-train excursions in deluxe AC coaches (Private luxury car for Suite & Presidential Suite)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All monument entrance fees, national park safaris, Lake Pichola boat rides & camera permits</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Exclusive royal dining experiences: Sand dunes dinner at Bikaner, gala dinner at Hanwant Mahal Jodhpur</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg><span>24/7 dedicated butler service, electronic safe, climate control & complimentary Wi-Fi</span></li>
    </ul>
  </div>
  <div class="exc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      What's Excluded (Curated Separately by KoiKoi)
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Pre-train and post-train 5-star hotel stays (Tailored by KoiKoi at preferential contracted rates)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>International & domestic airfare to/from starting and concluding cities</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Premium imported vintage liquors and rare wines (House selection is fully complimentary)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Personal expenses: Onboard spa therapies, laundry, and international phone calls</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Gratuities and tipping for train attendants, chauffeurs, and local city guides</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" style="shrink:0;margin-top:2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Indian visa fees & personal travel insurance</span></li>
    </ul>
  </div>
</div>
"""

    # 1. MAHARAJAS' EXPRESS OVERVIEW PAGE (Main Tour Package Master View)
    me_overview = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Maharajas' Express</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:4px 12px;border-radius:999px">
        4 Royal Circuits · 3N/4D & 6N/7D
      </span>
      <span style="color:#64748b;font-size:13.5px">★ 4.9 (184 Verified Travelers) · World's Leading Luxury Train (7x Winner)</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Luxury Train Tour Packages
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.6;margin:0">
      Experience the benchmark of royal train travel across India. Featuring state-of-the-art pneumatic suspension, two fine-dining restaurants, and 4 legendary journeys linking Mumbai, Delhi, Rajasthan, Agra, Khajuraho, and Varanasi.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="tour-package-layout">
      <!-- Left Main Content Column -->
      <div class="package-main">
        <!-- Media Preview Grid -->
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:36px;border-radius:18px;overflow:hidden">
          <div style="height:380px;background:url('/images/luxury-trains/maharajas-express/hero.jpg') center/cover no-repeat;border-radius:14px"></div>
          <div style="display:grid;grid-template-rows:1fr 1fr;gap:14px">
            <div style="background:url('/images/luxury-trains/maharajas-express/dining-pink.jpg') center/cover no-repeat;border-radius:14px"></div>
            <div style="background:url('/images/luxury-trains/maharajas-express/suite.jpg') center/cover no-repeat;border-radius:14px"></div>
          </div>
        </div>

        <!-- Section 1: The 4 Signature Journeys -->
        <div style="margin-bottom:52px">
          <div class="eyebrow">Choose Your Royal Circuit</div>
          <h2 style="font-size:28px;margin-bottom:12px">The 4 Signature Journeys of Maharajas' Express</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:24px">
            Whether you want a high-paced 4-day Golden Triangle weekend or an epic 7-day royal odyssey between Delhi and Mumbai or Varanasi, Maharajas' Express offers four meticulously planned itineraries. Click <strong>Details</strong> to view full day-by-day itineraries.
          </p>
          {get_me_4_journeys_cards()}
        </div>

        <!-- Section 2: Inclusions & Exclusions -->
        <div style="margin-bottom:52px">
          <div class="eyebrow">Transparent Value</div>
          <h2 style="font-size:28px;margin-bottom:8px">Inclusions & Exclusions</h2>
          <p style="color:#64748b;font-size:15px">Everything you need to know about what is included on board and what KoiKoi Travel coordinates for you.</p>
          {get_me_inclusions_exclusions()}
        </div>

        <!-- Section 3: Cabins & Suites -->
        <div style="margin-bottom:52px">
          <div class="eyebrow">Palatial Living Quarters</div>
          <h2 style="font-size:28px;margin-bottom:8px">4 Categories of Luxury Cabins & Suites</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:24px">
            All 23 carriages feature pneumatic air suspension for smooth overnight rail gliding, individual climate control, electronic RFID keys, and 24/7 dedicated butler service.
          </p>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px">
            <div class="cabin-card">
              <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/deluxe-cabin.jpg')"></div>
              <div class="cabin-body">
                <span class="cabin-size">112 sq. ft. · 20 Cabins</span>
                <h3>Deluxe Cabin</h3>
                <p>Available in Twin or Double bed arrangements. Features an en-suite bathroom with shower stall, electronic safe, panoramic picture window, and dedicated butler.</p>
                <ul class="cabin-features">
                  <li>Choice of Twin Beds or Large Double Bed</li>
                  <li>En-suite bathroom with hot/cold shower & bath amenities</li>
                  <li>Complimentary Wi-Fi & 24/7 personal butler</li>
                </ul>
              </div>
            </div>
            <div class="cabin-card">
              <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/suite.jpg')"></div>
              <div class="cabin-body">
                <span class="cabin-size">150 sq. ft. · 18 Cabins</span>
                <h3>Junior Suite</h3>
                <p>Spacious accommodation featuring a seating lounge area, writing desk, large picture windows, and round-the-clock personal valet assistance.</p>
                <ul class="cabin-features">
                  <li>Separate seating lounge by the panoramic window</li>
                  <li>Writing desk with stationery and electronic safe</li>
                  <li>Complimentary minibar and 24/7 butler service</li>
                </ul>
              </div>
            </div>
            <div class="cabin-card">
              <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/suite.jpg')"></div>
              <div class="cabin-body">
                <span class="cabin-size">220 sq. ft. · 4 Suites</span>
                <h3>Executive Suite</h3>
                <p>Features a spacious private living room salon, separate master bedroom, complimentary stocked minibar, and a private luxury car for all off-train tours.</p>
                <ul class="cabin-features">
                  <li>Separate living room salon + master double bedroom</li>
                  <li>Private chauffeured car for all off-train excursions</li>
                  <li>Exclusive personal guide & round-the-clock butler</li>
                </ul>
              </div>
            </div>
            <div class="cabin-card">
              <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/hero.jpg')"></div>
              <div class="cabin-body">
                <span class="cabin-size">448 sq. ft. · Entire Carriage</span>
                <h3>Navratna Presidential Suite</h3>
                <p>The only train suite in the world occupying an entire carriage! 2 master bedrooms, 2 full en-suite bathrooms with a private full-size bathtub, living room, and private car.</p>
                <ul class="cabin-features">
                  <li>Occupies an entire 23-meter train coach (448 sq.ft)</li>
                  <li>2 Master Bedrooms & private full-size soaking bathtub</li>
                  <li>Private luxury chauffeur car & dedicated 24/7 royal butler team</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Tariffs & Price Summary -->
        <div style="margin-bottom:52px">
          <div class="eyebrow">Official 2025–2026 Tariffs</div>
          <h2 style="font-size:28px;margin-bottom:8px">Tariff & Cabin Price Comparison</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:20px">
            Rates are per person on twin-sharing basis (or full suite for Presidential Suite) and include all meals, house spirits, guided sightseeing, and monument entrances.
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cabin Category</th>
                  <th>Treasures of India (3N/4D)</th>
                  <th>7-Day Journeys (6N/7D)</th>
                  <th>Approx INR (7D)</th>
                  <th>Key Privilege</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Deluxe Cabin</strong></td>
                  <td>$4,890 USD</td>
                  <td>$8,000 USD</td>
                  <td>₹6,70,000</td>
                  <td>Twin/Double, en-suite bathroom, 24/7 butler</td>
                </tr>
                <tr>
                  <td><strong>Junior Suite</strong></td>
                  <td>$5,950 USD</td>
                  <td>$10,650 USD</td>
                  <td>₹8,90,000</td>
                  <td>Larger area, picture windows, writing desk</td>
                </tr>
                <tr>
                  <td><strong>Executive Suite</strong></td>
                  <td>$8,990 USD</td>
                  <td>$16,000 USD</td>
                  <td>₹13,40,000</td>
                  <td>Living room + master bedroom + private car</td>
                </tr>
                <tr>
                  <td><strong>Presidential Suite</strong></td>
                  <td>$14,800 USD</td>
                  <td>$25,800 USD</td>
                  <td>₹21,60,000</td>
                  <td>Entire carriage (448 sq.ft), 2 bedrooms, bathtub</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 5: Why Plan With KoiKoi Travel -->
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.04)">
          <div class="eyebrow">The KoiKoi Curator Difference</div>
          <h2 style="font-size:26px;margin-bottom:12px">Why Book Maharajas' Express Through KoiKoi Travel?</h2>
          <p style="color:#475569;font-size:15px;line-height:1.65;margin-bottom:24px">
            A luxury train ticket only takes you from station to station. KoiKoi Travel designs your entire seamless vacation—from the minute you touch down at the airport until you fly home safely.
          </p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div style="display:flex;gap:12px;align-items:flex-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong style="color:#0f172a;display:block;margin-bottom:4px">Bespoke 5-Star Hotel Extensions</strong>
                <span style="color:#64748b;font-size:13.5px;line-height:1.5">Curated pre and post-train suites at legendary hotels like The Oberoi Amarvilas (Agra), The Taj Mahal Palace (Mumbai), and The Leela Palace (Delhi).</span>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong style="color:#0f172a;display:block;margin-bottom:4px">VIP Airport Transfers & Chauffeur</strong>
                <span style="color:#64748b;font-size:13.5px;line-height:1.5">Private air-conditioned Mercedes or Innova Crysta transfers with meet & greet at Delhi and Mumbai international airports.</span>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong style="color:#0f172a;display:block;margin-bottom:4px">Impartial Route & Cabin Advice</strong>
                <span style="color:#64748b;font-size:13.5px;line-height:1.5">We don't push one circuit over another. We match your calendar and preferences to the best suited route and cabin layout.</span>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5" style="shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong style="color:#0f172a;display:block;margin-bottom:4px">One 24/7 WhatsApp Concierge</strong>
                <span style="color:#64748b;font-size:13.5px;line-height:1.5">You have one dedicated luxury travel specialist assisting you with booking, special dietary requests, and emergency support anytime.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sticky Curator / Booking Column -->
      <div class="package-sidebar">
        {get_me_sticky_card()}
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/index.html", 
               "Maharajas' Express Luxury Train Tour Package | 4 Royal Journeys | KoiKoi Travel",
               "Discover the 4 iconic journeys of Maharajas' Express luxury train: Heritage of India, Indian Panorama, Indian Splendour, and Treasures of India with day-by-day itineraries and 2025-26 tariffs.",
               me_overview, active_train="maharajas-express", active_tab="overview", base_path=base_path)

    # 2. MAHARAJAS' EXPRESS ITINERARY PAGE (All 4 Journeys Day-by-Day Comprehensive Plan)
    me_itinerary = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Itineraries</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:4px 12px;border-radius:999px">
        All 4 Royal Journeys Detailed
      </span>
      <span style="color:#64748b;font-size:13.5px">3 Nights / 4 Days & 6 Nights / 7 Days Circuits</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Day-by-Day Itineraries
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.6;margin:0">
      Explore complete, verified day-by-day schedules for all four signature Maharajas' Express journeys. Choose your circuit below to view detailed morning, afternoon, and evening experiences.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="tour-package-layout">
      <!-- Left Main Content Column -->
      <div class="package-main">
        <!-- 4 Journey Summary Cards -->
        <div style="margin-bottom:36px">
          <div class="eyebrow">Signature Circuits</div>
          <h2 style="font-size:26px;margin-bottom:8px">Select a Circuit to Explore</h2>
          <p style="color:#64748b;font-size:15px;margin-bottom:20px">
            Click on any circuit card below or use the tabs to switch between day-by-day plans.
          </p>
          {get_me_4_journeys_cards()}
        </div>

        <!-- Circuit Tabs Navigation -->
        <div class="circuit-tabs-nav" id="circuitTabs">
          <button class="circuit-tab-btn active" onclick="switchCircuit('heritage', this)">
            1. The Heritage of India (7D / 6N)
          </button>
          <button class="circuit-tab-btn" onclick="switchCircuit('panorama', this)">
            2. The Indian Panorama (7D / 6N)
          </button>
          <button class="circuit-tab-btn" onclick="switchCircuit('splendour', this)">
            3. The Indian Splendour (7D / 6N)
          </button>
          <button class="circuit-tab-btn" onclick="switchCircuit('treasures', this)">
            4. Treasures of India (4D / 3N)
          </button>
        </div>

        <!-- CIRCUIT 1: The Heritage of India -->
        <div id="circuit-heritage" class="circuit-panel" style="display:block">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin-bottom:28px">
            <span style="display:inline-block;background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;margin-bottom:8px">CIRCUIT 1 · 7 DAYS / 6 NIGHTS</span>
            <h2 style="font-size:24px;color:#0f172a;margin-bottom:6px" id="heritage-of-india">The Heritage of India: Mumbai to Delhi</h2>
            <div style="color:#2E8B8B;font-size:14.5px;font-weight:600;margin-bottom:10px">
              Route: Mumbai → Udaipur → Jodhpur → Bikaner → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Delhi
            </div>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;margin:0">
              The grand trans-India expedition departing Mumbai and crossing the princely kingdoms of Rajasthan, tiger territory of Ranthambore, and the Mughal marvels of Agra before culminating in Delhi.
            </p>
          </div>

          <div class="timeline-wrap">
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 1 · Sunday</span>
                  <div class="timeline-city">Mumbai – Welcome & Royal Boarding</div>
                  <span class="timeline-meals">Dinner Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Afternoon:</strong> Check-in registration at the iconic Chhatrapati Shivaji Maharaj Terminus (CSMT), Mumbai. Experience a traditional royal garland and tikka welcome ceremony with Indian folk drummers.</p>
                  <p><strong>Evening:</strong> Board the Maharajas' Express and settle into your palatial private cabin. Introduction to your dedicated 24/7 personal butler. The train departs Mumbai as you enjoy a gourmet welcome dinner at Rang Mahal or Mayur Mahal restaurant.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express en route to Udaipur</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 2 · Monday</span>
                  <div class="timeline-city">Udaipur – City of Lakes & Lake Pichola Cruise</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Arrive in picturesque Udaipur, the Venice of the East. After a breakfast on board, embark on a private motorboat cruise across the tranquil waters of Lake Pichola.</p>
                  <p><strong>Afternoon:</strong> Guided tour of the magnificent City Palace complex and the world-famous Crystal Gallery. Enjoy a lavish royal lunch at Satkar Hall of Fateh Prakash Palace or on board.</p>
                  <p><strong>Evening:</strong> Optional walking tour through Udaipur's old artisan bazaars or indulge in an Ayurvedic wellness spa session at a luxury hotel before returning to the train for dinner.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express rolling toward Jodhpur</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 3 · Tuesday</span>
                  <div class="timeline-city">Jodhpur – Mehrangarh Fort & Royal Gala Evening</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Arrive in the "Blue City" of Jodhpur. Enjoy breakfast on board, followed by a private guided tour of the impregnable Mehrangarh Fort towering 400 feet above the city skyline.</p>
                  <p><strong>Afternoon:</strong> Visit Jaswant Thada, a graceful white marble cenotaph built in memory of Maharaja Jaswant Singh II. Stroll through the bustling clock tower spice market.</p>
                  <p><strong>Evening:</strong> Exclusive royal cocktail reception and private gala dinner with traditional Marwari cuisine at the enchanting Hanwant Mahal / royal venue overlooking Umaid Bhawan Palace.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express departing for Bikaner</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 4 · Wednesday</span>
                  <div class="timeline-city">Bikaner – Desert Citadel & Thar Sand Dunes Banquet</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Arrive in Bikaner. Visit the formidable Junagarh Fort, an unvanquished fortress boasting exquisite courtyards, gold leaf murals, and ancient weaponry.</p>
                  <p><strong>Afternoon:</strong> Relax on board with gourmet lunch or explore the unique Lalgarh Palace museum.</p>
                  <p><strong>Evening:</strong> Camel cart procession into the undulating sand dunes of the Thar Desert. Relish a magical sundowner cocktail followed by a royal barbecue banquet under desert stars with Kalbeliya dancers and folk musicians.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express to Jaipur</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 5 · Thursday</span>
                  <div class="timeline-city">Jaipur – The Pink City, Amber Fort & Royal Lunch</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Arrive in Jaipur. Excursion to the hilltop Amber Fort with a royal jeep ride, exploring Sheesh Mahal (Mirror Palace) and royal courtyards.</p>
                  <p><strong>Afternoon:</strong> Savor a bespoke 5-star lunch at an exclusive palace hotel (Rambagh Palace / Jai Mahal Palace). Photo stop at the iconic facade of Hawa Mahal (Palace of Winds).</p>
                  <p><strong>Evening:</strong> Visit the UNESCO-listed Jantar Mantar astronomical observatory and City Palace museum. Time for shopping Jaipur's renowned blue pottery and gemstones. Dinner on board.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express toward Sawai Madhopur</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 6 · Friday</span>
                  <div class="timeline-city">Ranthambore Tiger Safari & UNESCO Fatehpur Sikri</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Early Morning:</strong> Early morning wildlife game drive in an open safari vehicle through Ranthambore National Park in search of the elusive Royal Bengal Tiger, leopards, and sambar deer.</p>
                  <p><strong>Afternoon:</strong> Return to the train for a hearty breakfast as the train journeys to Fatehpur Sikri. Enjoy lunch on board, followed by a guided walking tour of Emperor Akbar's deserted red sandstone Mughal capital.</p>
                  <p><strong>Evening:</strong> Return to the train for a celebratory gala dinner featuring chef's signature Indian and Continental creations in the Rang Mahal dining car.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express parked at Agra</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 7 · Saturday</span>
                  <div class="timeline-city">Agra & Delhi – Sunrise at Taj Mahal & Royal Farewell</div>
                  <span class="timeline-meals">Breakfast & Lunch</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Early Morning:</strong> Unforgettable sunrise tour of the Taj Mahal, the world's most breathtaking monument to eternal love. Savor a lavish champagne breakfast overlooking the Taj Mahal at Taj Khema.</p>
                  <p><strong>Afternoon:</strong> Visit the formidable Agra Fort before boarding the train for lunch as the Maharajas' Express glides on its final leg toward the national capital.</p>
                  <p><strong>Evening:</strong> Arrive at Safdarjung Railway Station, Delhi (approx 15:30 hrs). Disembark with royal farewell ceremonies. KoiKoi Travel private chauffeur transfers you safely to your luxury hotel or airport.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5"><path d="M5 13l4 4L19 7"></path></svg>
                  <span>Tour Concludes in Delhi · KoiKoi VIP Hotel/Airport Transfer Arranged</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CIRCUIT 2: The Indian Panorama -->
        <div id="circuit-panorama" class="circuit-panel" style="display:none">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin-bottom:28px">
            <span style="display:inline-block;background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;margin-bottom:8px">CIRCUIT 2 · 7 DAYS / 6 NIGHTS</span>
            <h2 style="font-size:24px;color:#0f172a;margin-bottom:6px" id="indian-panorama">The Indian Panorama: Delhi to Delhi</h2>
            <div style="color:#2E8B8B;font-size:14.5px;font-weight:600;margin-bottom:10px">
              Route: Delhi → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Orchha → Khajuraho → Varanasi → Delhi
            </div>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;margin:0">
              An incomparable cultural deep-dive connecting Rajasthan's royal heritage, the tiger wilderness of Ranthambore, the eternal Taj Mahal, the UNESCO erotic temples of Khajuraho, and the sacred river ghats of Varanasi.
            </p>
          </div>

          <div class="timeline-wrap">
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 1 · Sunday</span>
                  <div class="timeline-city">Delhi – Welcome Ceremony & Train Departure</div>
                  <span class="timeline-meals">Dinner Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Afternoon:</strong> Check-in registration at Safdarjung Railway Station, New Delhi. Enjoy warm traditional welcome with marigold garlands, folded hands, and shehnai melodies.</p>
                  <p><strong>Evening:</strong> Board Maharajas' Express and meet your personal butler. The train sets off toward Jaipur. Enjoy fine wine and gourmet dining at Rang Mahal.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express en route to Jaipur</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 2 · Monday</span>
                  <div class="timeline-city">Jaipur – Amber Fort & Palace Heritage Feast</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Breakfast on board. Excursion to Amber Fort with private jeep climb, touring the Hall of Mirrors (Sheesh Mahal) and royal apartments.</p>
                  <p><strong>Afternoon:</strong> Lunch at an exclusive luxury palace hotel. Visit the City Palace and royal astronomical observatory of Jantar Mantar.</p>
                  <p><strong>Evening:</strong> Enjoy leisure time in Jaipur's colourful markets or relax in the Safari Bar lounge before dinner on board.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train heading to Ranthambore</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 3 · Tuesday</span>
                  <div class="timeline-city">Ranthambore Tiger Safari & Fatehpur Sikri</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Early morning game drive in Ranthambore Tiger Reserve. Spot wildlife in their natural habitat followed by breakfast on board.</p>
                  <p><strong>Afternoon:</strong> Arrive at Fatehpur Sikri and explore Emperor Akbar's 16th-century red sandstone architectural marvel.</p>
                  <p><strong>Evening:</strong> Savor a themed dinner as the train journeys into Agra.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express at Agra</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 4 · Wednesday</span>
                  <div class="timeline-city">Agra – Sunrise at Taj Mahal & Agra Fort</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Sunrise visit to the Taj Mahal followed by champagne breakfast atop Taj Khema. Return to the train for freshening up.</p>
                  <p><strong>Afternoon:</strong> Visit the UNESCO Agra Fort. Lunch served in the Mayur Mahal dining car.</p>
                  <p><strong>Evening:</strong> The train rolls south-eastward into Madhya Pradesh toward Orchha and Khajuraho.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express en route to Orchha</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 5 · Thursday</span>
                  <div class="timeline-city">Orchha Fort & UNESCO Khajuraho Temples</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Explore the medieval riverside fortress of Orchha, visiting Jahangir Mahal and Raj Mahal with its vibrant murals.</p>
                  <p><strong>Afternoon:</strong> Journey to Khajuraho. After lunch, visit the world-renowned Western Group of Temples, celebrated for their exquisite erotic sculptures and soaring nagara architecture.</p>
                  <p><strong>Evening:</strong> Optional evening sound & light show or classical dance performance before returning to the train for dinner.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express to Varanasi</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 6 · Friday</span>
                  <div class="timeline-city">Varanasi – Sarnath & Ganges Sunset Maha Aarti</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Arrive in Varanasi, the eternal spiritual city. Excursion to sacred Sarnath, where Lord Buddha gave his first sermon. Visit the Dhamek Stupa and museum.</p>
                  <p><strong>Afternoon:</strong> Return to the train for lunch and relaxation. Visit a silk weaving cooperative known for world-famous Banarasi silk sarees.</p>
                  <p><strong>Evening:</strong> Sunset boat cruise on the River Ganges. Witness the unforgettable spectacle of the grand Maha Ganga Aarti with chanting, brass lamps, and river diyas.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express returning to Delhi</span>
                </div>
              </div>
            </div>

            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 7 · Saturday</span>
                  <div class="timeline-city">Delhi – Farewell Breakfast & Deboarding</div>
                  <span class="timeline-meals">Breakfast Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Savor a leisurely farewell breakfast on board as the train glides into Delhi.</p>
                  <p><strong>Midday:</strong> Disembark at Safdarjung Railway Station, New Delhi (approx 12:30 hrs). KoiKoi Travel private transfer meets you for your onward journey or luxury hotel extension.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5"><path d="M5 13l4 4L19 7"></path></svg>
                  <span>Tour Concludes in Delhi · Seamless Airport Transfers Arranged</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CIRCUIT 3: The Indian Splendour -->
        <div id="circuit-splendour" class="circuit-panel" style="display:none">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin-bottom:28px">
            <span style="display:inline-block;background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;margin-bottom:8px">CIRCUIT 3 · 7 DAYS / 6 NIGHTS</span>
            <h2 style="font-size:24px;color:#0f172a;margin-bottom:6px" id="indian-splendour">The Indian Splendour: Delhi to Mumbai</h2>
            <div style="color:#2E8B8B;font-size:14.5px;font-weight:600;margin-bottom:10px">
              Route: Delhi → Agra → Ranthambore → Jaipur → Bikaner → Jodhpur → Udaipur → Mumbai
            </div>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;margin:0">
              The reverse classic royal expedition starting from the capital city of Delhi and winding through Agra, the desert forts and sand dunes of Rajasthan, and concluding in glamorous Mumbai.
            </p>
          </div>

          <div class="timeline-wrap">
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 1 · Sunday</span>
                  <div class="timeline-city">Delhi – Departure to Agra</div>
                  <span class="timeline-meals">Dinner Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Afternoon:</strong> Check-in at Delhi Safdarjung Station, welcome drink and registration. The train departs for the Mughal city of Agra. Welcome dinner on board.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express at Agra</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 2 · Monday</span>
                  <div class="timeline-city">Agra – Taj Mahal & Agra Fort</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Sunrise visit to the Taj Mahal followed by champagne breakfast at Taj Khema. Explore the palatial red sandstone Agra Fort.</p>
                  <p><strong>Afternoon:</strong> Lunch on board as the train departs toward Ranthambore.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train parked at Sawai Madhopur</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 3 · Tuesday</span>
                  <div class="timeline-city">Ranthambore & Jaipur</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Early morning wildlife safari in Ranthambore National Park. Breakfast on board, proceed to Jaipur.</p>
                  <p><strong>Afternoon:</strong> Amber Fort excursion with jeep ride, City Palace, and royal banquet dinner at an exclusive heritage hotel.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train to Bikaner</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 4 · Wednesday</span>
                  <div class="timeline-city">Bikaner – Junagarh & Desert Dunes Barbecue</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Tour Junagarh Fort in Bikaner. Afternoon relaxation on the train.</p>
                  <p><strong>Evening:</strong> Camel cart ride to Thar sand dunes with folk dances, music, and royal barbecue dinner.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train to Jodhpur</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 5 · Thursday</span>
                  <div class="timeline-city">Jodhpur – Mehrangarh Fort & Royal Dinner</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Mehrangarh Fort exploration and Jaswant Thada visit. Walking tour of blue city markets.</p>
                  <p><strong>Evening:</strong> Royal cocktail and gala dinner at Hanwant Mahal overlooking the lighted fort.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train to Udaipur</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 6 · Friday</span>
                  <div class="timeline-city">Udaipur – Lake Pichola Boat Cruise & City Palace</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Boat ride on Lake Pichola, visit City Palace and Crystal Gallery. Royal lunch at Fateh Prakash Palace.</p>
                  <p><strong>Evening:</strong> Farewell dinner on board as the train journeys toward Maharashtra.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train to Mumbai</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 7 · Saturday</span>
                  <div class="timeline-city">Mumbai – Deboarding at CSMT</div>
                  <span class="timeline-meals">Breakfast Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Breakfast on board. Disembark at Mumbai CSMT Station (approx 08:30 hrs). KoiKoi private transfer to your hotel or airport.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5"><path d="M5 13l4 4L19 7"></path></svg>
                  <span>Tour Concludes in Mumbai · Hotel & Airport Extensions Arranged</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CIRCUIT 4: Treasures of India -->
        <div id="circuit-treasures" class="circuit-panel" style="display:none">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin-bottom:28px">
            <span style="display:inline-block;background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;margin-bottom:8px">CIRCUIT 4 · 4 DAYS / 3 NIGHTS</span>
            <h2 style="font-size:24px;color:#0f172a;margin-bottom:6px" id="treasures-of-india">Treasures of India: Golden Triangle Tour</h2>
            <div style="color:#2E8B8B;font-size:14.5px;font-weight:600;margin-bottom:10px">
              Route: Delhi → Agra → Ranthambore → Jaipur → Delhi
            </div>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;margin:0">
              The ultimate 4-day royal whirlwind covering the Golden Triangle and tiger wilderness of Ranthambore. Ideal for international travelers seeking high luxury in a condensed timeframe.
            </p>
          </div>

          <div class="timeline-wrap">
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 1 · Sunday</span>
                  <div class="timeline-city">Delhi to Agra – Boarding & Agra Fort</div>
                  <span class="timeline-meals">Lunch & Dinner Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Check-in at Safdarjung Railway Station, Delhi (approx 08:30 hrs). Traditional royal welcome and train departs for Agra.</p>
                  <p><strong>Afternoon:</strong> Enjoy lunch on board. Guided afternoon exploration of the formidable red sandstone Agra Fort.</p>
                  <p><strong>Evening:</strong> Return to the train for dinner and restful overnight stay in Agra.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard Maharajas' Express parked at Agra</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 2 · Monday</span>
                  <div class="timeline-city">Agra to Ranthambore – Sunrise Taj Mahal & Fatehpur Sikri</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Magical sunrise visit to the Taj Mahal followed by champagne breakfast at Taj Khema.</p>
                  <p><strong>Afternoon:</strong> Visit the UNESCO deserted Mughal citadel of Fatehpur Sikri. Lunch on board as the train departs for Sawai Madhopur.</p>
                  <p><strong>Evening:</strong> Settle in for dinner as you arrive at the gateway of Ranthambore Tiger Reserve.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train at Sawai Madhopur</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 3 · Tuesday</span>
                  <div class="timeline-city">Ranthambore to Jaipur – Tiger Safari & Amber Fort</div>
                  <span class="timeline-meals">Breakfast, Lunch & Dinner</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Early Morning:</strong> Thrilling open-top jeep/canter safari in Ranthambore National Park in search of wild tigers.</p>
                  <p><strong>Afternoon:</strong> Breakfast on board, train arrives in Jaipur. Visit Amber Fort with royal jeep ascent.</p>
                  <p><strong>Evening:</strong> Gala royal dinner at an exclusive palace heritage hotel with cultural Rajasthani performances.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8904D" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  <span>Overnight aboard train at Jaipur / returning to Delhi</span>
                </div>
              </div>
            </div>
            <div class="timeline-day">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-badge">Day 4 · Wednesday</span>
                  <div class="timeline-city">Jaipur to Delhi – Farewell Breakfast & Deboarding</div>
                  <span class="timeline-meals">Breakfast Included</span>
                </div>
                <div class="timeline-body">
                  <p><strong>Morning:</strong> Leisurely breakfast on board as Maharajas' Express glides back into Delhi.</p>
                  <p><strong>Midday:</strong> Deboard at Safdarjung Railway Station (approx 12:30 hrs). KoiKoi private transfers take care of your onward travel.</p>
                </div>
                <div class="timeline-overnight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" stroke-width="2.5"><path d="M5 13l4 4L19 7"></path></svg>
                  <span>Tour Concludes in Delhi · Seamless Airport Transfers Arranged</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Inclusions & Exclusions Section -->
        <div style="margin-top:48px">
          <div class="eyebrow">Clear Package Value</div>
          <h2 style="font-size:26px;margin-bottom:8px">Inclusions & Exclusions Across All Circuits</h2>
          {get_me_inclusions_exclusions()}
        </div>
      </div>

      <!-- Right Sticky Curator / Booking Column -->
      <div class="package-sidebar">
        {get_me_sticky_card()}
      </div>
    </div>
  </div>
</section>

<script>
function switchCircuit(circuitId, btn) {{
  document.querySelectorAll('.circuit-panel').forEach(function(el) {{
    el.style.display = 'none';
  }});
  document.querySelectorAll('.circuit-tab-btn').forEach(function(b) {{
    b.classList.remove('active');
  }});
  const target = document.getElementById('circuit-' + circuitId);
  if (target) {{
    target.style.display = 'block';
  }}
  if (btn) {{
    btn.classList.add('active');
  }}
}}

// Auto-switch tab if URL hash is present
window.addEventListener('DOMContentLoaded', function() {{
  const hash = window.location.hash;
  if (hash === '#heritage-of-india') {{
    switchCircuit('heritage', document.querySelectorAll('.circuit-tab-btn')[0]);
  }} else if (hash === '#indian-panorama') {{
    switchCircuit('panorama', document.querySelectorAll('.circuit-tab-btn')[1]);
  }} else if (hash === '#indian-splendour') {{
    switchCircuit('splendour', document.querySelectorAll('.circuit-tab-btn')[2]);
  }} else if (hash === '#treasures-of-india') {{
    switchCircuit('treasures', document.querySelectorAll('.circuit-tab-btn')[3]);
  }}
}});
</script>
"""
    write_page(f"{base_dir}/maharajas-express/itinerary/index.html", 
               "Maharajas' Express Itinerary | All 4 Journeys Day-by-Day | KoiKoi Travel",
               "Complete day-by-day itineraries for all 4 Maharajas' Express circuits: Heritage of India, Indian Panorama, Indian Splendour, and Treasures of India.",
               me_itinerary, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # 3. MAHARAJAS' EXPRESS DEPARTURES PAGE (2025–2026 Calendar)
    me_departures = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Departures Calendar</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:4px 12px;border-radius:999px">
        Official 2025–2026 Schedules
      </span>
      <span style="color:#64748b;font-size:13.5px">Early Inquiries & Cabin Allocation</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Official Departure Dates (2025–2026)
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.6;margin:0">
      Maharajas' Express operates strictly between October and April when weather across North and Central India is pleasantly cool. Browse confirmed departures across all 4 circuits.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="tour-package-layout">
      <!-- Left Main Column -->
      <div class="package-main">
        <div style="margin-bottom:40px">
          <h2 style="font-size:24px;color:#0f172a;margin-bottom:14px">The Heritage of India (Mumbai to Delhi · 6N/7D)</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Departure Date</th><th>Season</th><th>Availability Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td><strong>October 12, 2025</strong></td><td>Autumn Regular</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Oct%2012%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>November 09, 2025</strong></td><td>Peak Season</td><td><span style="color:#F8904D;font-weight:700">Fast Filling</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Nov%2009%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>December 07, 2025</strong></td><td>Peak Season</td><td><span style="color:#F8904D;font-weight:700">Fast Filling</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Dec%2007%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>January 04, 2026</strong></td><td>New Year Peak</td><td><span style="color:#ef4444;font-weight:700">Limited Cabins</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Jan%2004%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>February 01, 2026</strong></td><td>Winter Prime</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Feb%2001%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>March 01, 2026</strong></td><td>Spring Season</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Mar%2001%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>March 29, 2026</strong></td><td>Spring Finale</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Heritage%20of%20India%20Mar%2029%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style="margin-bottom:40px">
          <h2 style="font-size:24px;color:#0f172a;margin-bottom:14px">The Indian Panorama (Delhi to Delhi · 6N/7D)</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Departure Date</th><th>Season</th><th>Availability Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td><strong>October 05, 2025</strong></td><td>Season Opener</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Oct%2005%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>November 02, 2025</strong></td><td>Peak Season</td><td><span style="color:#F8904D;font-weight:700">Fast Filling</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Nov%2002%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>November 30, 2025</strong></td><td>Winter Prime</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Nov%2030%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>December 28, 2025</strong></td><td>Christmas / NYE</td><td><span style="color:#ef4444;font-weight:700">High Demand</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Dec%2028%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>January 25, 2026</strong></td><td>Winter Prime</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Jan%2025%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>February 22, 2026</strong></td><td>Winter Prime</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Feb%2022%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>March 22, 2026</strong></td><td>Spring Season</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Mar%2022%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>April 12, 2026</strong></td><td>Season Finale</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Indian%20Panorama%20Apr%2012%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style="margin-bottom:40px">
          <h2 style="font-size:24px;color:#0f172a;margin-bottom:14px">Treasures of India (Delhi to Delhi · 3N/4D)</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Departure Date</th><th>Season</th><th>Availability Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td><strong>October 26, 2025</strong></td><td>Autumn Regular</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Treasures%20of%20India%20Oct%2026%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>November 23, 2025</strong></td><td>Peak Season</td><td><span style="color:#F8904D;font-weight:700">Fast Filling</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Treasures%20of%20India%20Nov%2023%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>December 21, 2025</strong></td><td>Christmas Holiday</td><td><span style="color:#ef4444;font-weight:700">Limited Cabins</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Treasures%20of%20India%20Dec%2021%202025" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>January 18, 2026</strong></td><td>Winter Prime</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Treasures%20of%20India%20Jan%2018%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>February 15, 2026</strong></td><td>Winter Prime</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Treasures%20of%20India%20Feb%2015%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
                <tr><td><strong>March 15, 2026</strong></td><td>Spring Season</td><td><span style="color:#2E8B8B;font-weight:700">Open for Booking</span></td><td><a href="https://wa.me/919136739178?text=Inquire%20Treasures%20of%20India%20Mar%2015%202026" target="_blank" class="table-link-btn">Inquire Date &rarr;</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Sticky Column -->
      <div class="package-sidebar">
        {get_me_sticky_card()}
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/departures/index.html", 
               "Maharajas' Express Departures 2025–2026 | Official Calendar | KoiKoi Travel",
               "Official 2025-2026 departure dates for Maharajas' Express across all 4 journeys. Check live cabin availability and early booking privileges.",
               me_departures, active_train="maharajas-express", active_tab="departures", base_path=base_path)

    # 4. MAHARAJAS' EXPRESS PRICE & TARIFFS PAGE
    me_price = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Tariff & Prices</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:4px 12px;border-radius:999px">
        Transparent Pricing · Zero Hidden Fees
      </span>
      <span style="color:#64748b;font-size:13.5px">Official IRCTC / Government Tariffs</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Ticket Prices & Cabin Tariffs (2025–2026)
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.6;margin:0">
      Official cabin tariffs for all four journeys of Maharajas' Express in USD and Indian Rupees (INR). All prices include luxury cabin accommodation, gourmet dining, house spirits, guided sightseeing, and monument entrances.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="tour-package-layout">
      <!-- Left Column -->
      <div class="package-main">
        <div style="margin-bottom:44px">
          <h2 style="font-size:26px;color:#0f172a;margin-bottom:8px">1. 7-Day Journeys Tariff (6 Nights / 7 Days)</h2>
          <p style="color:#64748b;font-size:14.5px;margin-bottom:18px">
            Applies to <em>The Heritage of India</em>, <em>The Indian Panorama</em>, and <em>The Indian Splendour</em>.
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cabin Category</th>
                  <th>Per Person Twin Sharing (USD)</th>
                  <th>Single Occupancy (USD)</th>
                  <th>Approximate INR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Deluxe Cabin</strong></td>
                  <td>$8,000 USD</td>
                  <td>$12,400 USD</td>
                  <td>₹6,70,000 per person</td>
                </tr>
                <tr>
                  <td><strong>Junior Suite</strong></td>
                  <td>$10,650 USD</td>
                  <td>$19,170 USD</td>
                  <td>₹8,90,000 per person</td>
                </tr>
                <tr>
                  <td><strong>Executive Suite</strong></td>
                  <td>$16,000 USD</td>
                  <td>$16,000 USD</td>
                  <td>₹13,40,000 (Private Car Included)</td>
                </tr>
                <tr>
                  <td><strong>Presidential Suite</strong></td>
                  <td>$25,800 USD (Full Suite)</td>
                  <td>$25,800 USD</td>
                  <td>₹21,60,000 (Entire 448 sq.ft Carriage)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style="margin-bottom:44px">
          <h2 style="font-size:26px;color:#0f172a;margin-bottom:8px">2. Treasures of India Tariff (3 Nights / 4 Days)</h2>
          <p style="color:#64748b;font-size:14.5px;margin-bottom:18px">
            The Golden Triangle royal rail circuit (Delhi – Agra – Ranthambore – Jaipur – Delhi).
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cabin Category</th>
                  <th>Per Person Twin Sharing (USD)</th>
                  <th>Single Occupancy (USD)</th>
                  <th>Approximate INR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Deluxe Cabin</strong></td>
                  <td>$4,890 USD</td>
                  <td>$7,580 USD</td>
                  <td>₹4,10,000 per person</td>
                </tr>
                <tr>
                  <td><strong>Junior Suite</strong></td>
                  <td>$5,950 USD</td>
                  <td>$10,710 USD</td>
                  <td>₹4,98,000 per person</td>
                </tr>
                <tr>
                  <td><strong>Executive Suite</strong></td>
                  <td>$8,990 USD</td>
                  <td>$8,990 USD</td>
                  <td>₹7,52,000 (Private Car Included)</td>
                </tr>
                <tr>
                  <td><strong>Presidential Suite</strong></td>
                  <td>$14,800 USD (Full Suite)</td>
                  <td>$14,800 USD</td>
                  <td>₹12,40,000 (Entire 448 sq.ft Carriage)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style="margin-bottom:44px">
          {get_me_inclusions_exclusions()}
        </div>
      </div>

      <!-- Right Column -->
      <div class="package-sidebar">
        {get_me_sticky_card()}
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/price/index.html", 
               "Maharajas' Express Ticket Prices & Cabin Tariffs | KoiKoi Travel",
               "Official 2025-2026 tariff and prices for Maharajas' Express Deluxe Cabins, Junior Suites, Executive Suites, and Presidential Suite in USD and INR.",
               me_price, active_train="maharajas-express", active_tab="price", base_path=base_path)

    # 5. MAHARAJAS' EXPRESS CABINS & SUITES PAGE
    me_cabins = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Cabins & Suites</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:4px 12px;border-radius:999px">
        4 Regal Accommodation Tiers
      </span>
      <span style="color:#64748b;font-size:13.5px">Air Suspension · 24/7 Butler · Private Bathrooms</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Cabins & Presidential Suite
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.6;margin:0">
      Every cabin aboard Maharajas' Express is an oasis of comfort, blending nostalgic royal design with state-of-the-art amenities including electronic safes, RFID door locks, en-suite bathrooms, and personal valets.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="tour-package-layout">
      <!-- Left Column -->
      <div class="package-main">
        <div style="display:grid;grid-template-columns:1fr;gap:36px;margin-bottom:48px">
          <!-- Deluxe Cabin -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.04)">
            <div style="height:320px;background:url('/images/luxury-trains/maharajas-express/deluxe-cabin.jpg') center/cover no-repeat"></div>
            <div style="padding:28px">
              <span class="cabin-size">112 sq. ft. · 20 Cabins Available</span>
              <h2 style="font-size:26px;color:#0f172a;margin-bottom:8px">Deluxe Cabin</h2>
              <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:16px">
                The classic luxury entry to the train. Features a choice of Twin beds or a Double bed with premium linens, large panoramic picture window, electronic RFID locks, individual climate control, and a modern en-suite bathroom with shower stall and branded toiletries.
              </p>
              <ul class="cabin-features">
                <li>Twin or Double bed setup with ergonomic orthopedic mattresses</li>
                <li>Private en-suite bathroom with shower cubicle, hot/cold water, and hairdryer</li>
                <li>Electronic safe, RFID locks, LCD television, and high-speed Wi-Fi</li>
                <li>24/7 dedicated butler catering to all personal requests</li>
              </ul>
            </div>
          </div>

          <!-- Junior Suite -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.04)">
            <div style="height:320px;background:url('/images/luxury-trains/maharajas-express/suite.jpg') center/cover no-repeat"></div>
            <div style="padding:28px">
              <span class="cabin-size">150 sq. ft. · 18 Cabins Available</span>
              <h2 style="font-size:26px;color:#0f172a;margin-bottom:8px">Junior Suite</h2>
              <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:16px">
                Generously proportioned with extra space for a relaxing seating area. Enjoy morning tea by your large picture window while watching the Indian countryside glide by.
              </p>
              <ul class="cabin-features">
                <li>Spacious seating area with comfortable upholstered armchairs</li>
                <li>Writing desk with stationery and electronic safe</li>
                <li>Complimentary in-cabin minibar and fine teas</li>
                <li>Round-the-clock dedicated butler service</li>
              </ul>
            </div>
          </div>

          <!-- Executive Suite -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.04)">
            <div style="height:320px;background:url('/images/luxury-trains/maharajas-express/suite.jpg') center/cover no-repeat"></div>
            <div style="padding:28px">
              <span class="cabin-size">220 sq. ft. · 4 Suites Available</span>
              <h2 style="font-size:26px;color:#0f172a;margin-bottom:8px">Executive Suite</h2>
              <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:16px">
                True palatial living on rails. Includes a separate master bedroom and a stylish private living room salon. Suite guests enjoy a private luxury chauffeur-driven car (Mercedes/Innova Crysta) for all off-train excursions.
              </p>
              <ul class="cabin-features">
                <li>Separate living salon and master double bedroom</li>
                <li>Private luxury car and chauffeur for all off-train excursions</li>
                <li>Exclusive private English-speaking tour guide at monuments</li>
                <li>Complimentary stocked minibar with premium beverages</li>
              </ul>
            </div>
          </div>

          <!-- Navratna Presidential Suite -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.04)">
            <div style="height:320px;background:url('/images/luxury-trains/maharajas-express/hero.jpg') center/cover no-repeat"></div>
            <div style="padding:28px">
              <span class="cabin-size">448 sq. ft. · Entire Train Carriage</span>
              <h2 style="font-size:26px;color:#0f172a;margin-bottom:8px">Navratna Presidential Suite</h2>
              <p style="color:#64748b;font-size:15px;line-height:1.65;margin-bottom:16px">
                Named "Navratna" (Nine Gems), this is the undisputed pinnacle of luxury train travel worldwide. Spanning an entire 23-meter train coach, it offers two bedrooms, two full en-suite bathrooms with a private full-size bathtub, spacious salon, dining area, and round-the-clock private butler team.
              </p>
              <ul class="cabin-features">
                <li>Occupies an entire 448 sq.ft train carriage with private entrance</li>
                <li>Two full master bedrooms (One Double Bed, One Twin Beds)</li>
                <li>Two lavish bathrooms featuring a private full-size soaking bathtub</li>
                <li>Dedicated team of private royal butlers and private luxury car throughout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="package-sidebar">
        {get_me_sticky_card()}
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/cabins/index.html", 
               "Maharajas' Express Cabins & Presidential Suite Layout | KoiKoi Travel",
               "Explore Deluxe Cabins, Junior Suites, Executive Suites, and the world-famous 448 sq.ft Navratna Presidential Suite aboard Maharajas' Express.",
               me_cabins, active_train="maharajas-express", active_tab="cabins", base_path=base_path)

    # 6. MAHARAJAS' EXPRESS PHOTO GALLERY PAGE
    me_gallery = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Photo Gallery</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Photo Gallery
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.6;margin:0">
      Visual highlights of life aboard the World's Leading Luxury Train: fine-dining restaurant cars, palatial suites, and off-train excursions.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="tour-package-layout">
      <!-- Left Column -->
      <div class="package-main">
        <div class="gallery-grid">
          <div class="g-item"><img src="/images/luxury-trains/maharajas-express/hero.jpg" alt="Maharajas' Express Luxury Train Exterior"><span>Maharajas' Express Royal Exterior</span></div>
          <div class="g-item"><img src="/images/luxury-trains/maharajas-express/dining-pink.jpg" alt="Rang Mahal Fine Dining Restaurant"><span>Rang Mahal Dining Restaurant</span></div>
          <div class="g-item"><img src="/images/luxury-trains/maharajas-express/suite.jpg" alt="Executive Suite Bedroom"><span>Royal Suite Bedroom</span></div>
          <div class="g-item"><img src="/images/luxury-trains/maharajas-express/deluxe-cabin.jpg" alt="Deluxe Double Cabin"><span>Deluxe Cabin Layout</span></div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="package-sidebar">
        {get_me_sticky_card()}
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/photo-gallery/index.html", 
               "Maharajas' Express Photo Gallery | Interiors & Cabins | KoiKoi Travel",
               "High resolution photos of Maharajas' Express luxury train: restaurants Rang Mahal & Mayur Mahal, lounge bars, suites and royal excursions.",
               me_gallery, active_train="maharajas-express", active_tab="photo-gallery", base_path=base_path)

# ================= 4. GOLDEN CHARIOT SUBPAGES =================
    gc_data = {
        "slug": "golden-chariot",
        "name": "Golden Chariot",
        "tagline": "Many Worlds. One Journey.",
        "banner": "/images/luxury-trains/golden-chariot/hero.jpg",
    }
    
    # Golden Chariot Overview
    gc_overview = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{gc_data["banner"]}');">
  <div class="wrap">
    <span class="tag">THE GOLDEN CHARIOT · OVERVIEW</span>
    <h1>The Soul of South India on Wheels</h1>
    <p>Journey through UNESCO ruins of Hampi, royal palaces of Mysore, Bandipur tiger country, and Arabian sea beaches of Goa.</p>
    <div class="cta">
      <a class="btn btn-gold" href="{base_path}/golden-chariot/itinerary">View Itineraries</a>
      <a class="btn btn-line" href="{base_path}/golden-chariot/price">Tariff & Fares</a>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">South India Luxury Rail</div>
      <h2>Many Worlds. One Journey.</h2>
      <p>Named after the famous Stone Chariot in Hampi, this purple and gold train takes you through 1,500 years of southern dynasty heritage.</p>
    </div>
    <div class="grid-4">
      <div class="card" style="padding:24px">
        <h3>3 Curated Circuits</h3>
        <p>Pride of Karnataka (5N/6D), Jewels of South (5N/6D), and Glimpses of Karnataka (3N/4D) from Bengaluru.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Ruchi & Nalapaka</h3>
        <p>Two fine-dining carriages serving vegetarian South Indian delicacies and gourmet continental grills.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Madira Lounge Bar</h3>
        <p>Regal bar carriage inspired by the Mysore Palace Hall of Mirrors, serving curated whiskeys and wines.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Arogya Ayurvedic Spa</h3>
        <p>Traditional Kerala Ayurvedic massages and fitness gym on board to rejuvenate between royal destinations.</p>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/index.html", 
               "The Golden Chariot Luxury Train South India | Routes & Fares | KoiKoi Travel",
               "Discover The Golden Chariot luxury train: Hampi ruins, Bandipur safari, Mysore palace and Goa beaches.",
               gc_overview, active_train="golden-chariot", active_tab="overview", base_path=base_path)

    # Golden Chariot Itinerary
    gc_itinerary = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{gc_data["banner"]}');">
  <div class="wrap">
    <span class="tag">GOLDEN CHARIOT · ITINERARIES</span>
    <h1>3 South India Luxury Circuits</h1>
    <p>Departing from Bengaluru between October and March.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="day-card">
      <span class="day-badge">Circuit 1 · 6 Days / 5 Nights</span>
      <h3>Pride of Karnataka</h3>
      <p><strong>Route:</strong> Bengaluru → Bandipur Tiger Reserve → Mysore Palace → Halebidu Temples → Hampi Ruins → Badami Caves → Goa Beaches → Bengaluru.<br>
      Highlights include dawn jeep safari in Bandipur, illuminated Mysore Palace, Stone Chariot in Hampi and Old Goa churches.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 2 · 6 Days / 5 Nights</span>
      <h3>Jewels of South</h3>
      <p><strong>Route:</strong> Bengaluru → Mysore → Hampi → Mahabalipuram → Thanjavur → Chettinad → Cochin → Kumarakom.<br>
      Highlights include Brihadeeswara Temple, Chettinad mansions culinary demo, and Kerala backwaters houseboat cruise.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 3 · 4 Days / 3 Nights</span>
      <h3>Glimpses of Karnataka</h3>
      <p><strong>Route:</strong> Bengaluru → Bandipur → Mysore → Hampi → Bengaluru.<br>
      A quick 4-day royal weekend getaway combining wildlife and UNESCO heritage.</p>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/itinerary/index.html", 
               "Golden Chariot Itineraries: Pride of Karnataka & Jewels of South | KoiKoi Travel",
               "Detailed itineraries for The Golden Chariot: Bandipur, Mysore, Hampi, Badami, Goa, Kerala backwaters.",
               gc_itinerary, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # Golden Chariot Departures
    gc_departures = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{gc_data["banner"]}');">
  <div class="wrap">
    <span class="tag">GOLDEN CHARIOT · DEPARTURES</span>
    <h1>2024–2025 & 2025–2026 Departure Schedule</h1>
    <p>Seasonal departures from Bengaluru Yashwantpur Station.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Circuit Name</th><th>Duration</th><th>2024–2025 Departures</th><th>2025–2026 Departures</th></tr></thead>
        <tbody>
          <tr><td>Pride of Karnataka</td><td>5N / 6D</td><td>19 Oct, 16 Nov, 14 Dec 2024; 04 Jan, 01 Feb, 01 Mar 2025</td><td>18 Oct, 15 Nov, 13 Dec 2025; 03 Jan, 31 Jan, 28 Feb 2026</td></tr>
          <tr><td>Jewels of South</td><td>5N / 6D</td><td>02 Nov, 30 Nov, 28 Dec 2024; 18 Jan, 15 Feb, 15 Mar 2025</td><td>01 Nov, 29 Nov, 27 Dec 2025; 17 Jan, 14 Feb, 14 Mar 2026</td></tr>
          <tr><td>Glimpses of Karnataka</td><td>3N / 4D</td><td>09 Nov, 07 Dec, 21 Dec 2024; 25 Jan, 22 Feb 2025</td><td>08 Nov, 06 Dec, 20 Dec 2025; 24 Jan, 21 Feb 2026</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/departures/index.html", 
               "Golden Chariot Departure Dates 2024-2025 & 2026 | KoiKoi Travel",
               "Official departure dates for The Golden Chariot luxury train from Bengaluru.",
               gc_departures, active_train="golden-chariot", active_tab="departures", base_path=base_path)

    # Golden Chariot Price
    gc_price = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{gc_data["banner"]}');">
  <div class="wrap">
    <span class="tag">GOLDEN CHARIOT · TARIFF</span>
    <h1>Official Ticket Prices</h1>
    <p>All-inclusive fares for South India's premier luxury rail odyssey.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Journey</th><th>Deluxe Twin/Double (Single)</th><th>Deluxe Twin/Double (Per Person Sharing)</th></tr></thead>
        <tbody>
          <tr><td>Pride of Karnataka (5N/6D)</td><td>$6,500 USD</td><td>$4,900 USD</td></tr>
          <tr><td>Jewels of South (5N/6D)</td><td>$6,500 USD</td><td>$4,900 USD</td></tr>
          <tr><td>Glimpses of Karnataka (3N/4D)</td><td>$4,200 USD</td><td>$3,150 USD</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/price/index.html", 
               "The Golden Chariot Ticket Price & Tariff | KoiKoi Travel",
               "Official pricing for The Golden Chariot luxury train journeys in USD and INR.",
               gc_price, active_train="golden-chariot", active_tab="price", base_path=base_path)

    # Golden Chariot Cabins
    gc_cabins = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{gc_data["banner"]}');">
  <div class="wrap">
    <span class="tag">GOLDEN CHARIOT · CABINS</span>
    <h1>Royal Suites Inspired by Hoysala Temples</h1>
    <p>44 elegant cabins named after ancient southern dynasties.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="cabin-grid">
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/golden-chariot/double-bed.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">105 sq. ft.</span>
          <h3>Deluxe Double Bed Suite</h3>
          <p>Double queen bed with plush silk linens, carved headboards, panoramic bay window and dedicated coach attendant.</p>
        </div>
      </div>
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/golden-chariot/sitting-room.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">Lounge & Sitting Room</span>
          <h3>Saloon Sitting Lounge</h3>
          <p>Spacious seating salon inside each passenger coach to relax, read books, or enjoy morning coffee with Deccan vistas.</p>
        </div>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/cabins/index.html", 
               "Golden Chariot Cabins & Suites Specifications | KoiKoi Travel",
               "View cabin layout, twin & double configurations and amenities on The Golden Chariot.",
               gc_cabins, active_train="golden-chariot", active_tab="cabins", base_path=base_path)

    # Golden Chariot Gallery
    gc_gallery = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{gc_data["banner"]}');">
  <div class="wrap">
    <span class="tag">GOLDEN CHARIOT · GALLERY</span>
    <h1>Photo Gallery</h1>
    <p>Explore South India's luxury train in pictures.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="gallery-grid">
      <div class="g-item"><img src="/images/luxury-trains/golden-chariot/hero.jpg"><span>The Golden Chariot</span></div>
      <div class="g-item"><img src="/images/luxury-trains/golden-chariot/double-bed.jpg"><span>Double Bed Cabin</span></div>
      <div class="g-item"><img src="/images/luxury-trains/golden-chariot/restaurant-1.jpg"><span>Ruchi Restaurant</span></div>
      <div class="g-item"><img src="/images/luxury-trains/golden-chariot/bar.jpg"><span>Madira Lounge Bar</span></div>
      <div class="g-item"><img src="/images/luxury-trains/golden-chariot/sitting-room.jpg"><span>Saloon Sitting Lounge</span></div>
      <div class="g-item"><img src="/images/luxury-trains/golden-chariot/restaurant-2.jpg"><span>Nalapaka Dining Car</span></div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/photo-gallery/index.html", 
               "Golden Chariot Photo Gallery | Train Interior & South Destinations | KoiKoi Travel",
               "High quality photos of The Golden Chariot luxury train: suites, restaurants, Hampi and Kerala backwaters.",
               gc_gallery, active_train="golden-chariot", active_tab="photo-gallery", base_path=base_path)

    # ================= 5. DECCAN ODYSSEY SUBPAGES =================
    do_data = {
        "slug": "deccan-odyssey",
        "name": "Deccan Odyssey",
        "tagline": "The Blue Limousine on Tracks",
        "banner": "/images/luxury-trains/deccan-odyssey/hero.jpg",
    }

    # Deccan Odyssey Overview
    do_overview = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{do_data["banner"]}');">
  <div class="wrap">
    <span class="tag">DECCAN ODYSSEY · OVERVIEW</span>
    <h1>The Blue Limousine on Rails</h1>
    <p>Journey across ancient caves of Ajanta & Ellora, wine country Nashik, Goa, and tiger reserves in central India.</p>
    <div class="cta">
      <a class="btn btn-gold" href="{base_path}/deccan-odyssey/itinerary">View 6 Circuits</a>
      <a class="btn btn-line" href="{base_path}/deccan-odyssey/price">Check Tariffs</a>
    </div>
  </div>
</section>

<!-- DECCAN ODYSSEY VIDEO SPOTLIGHT (SPLIT ROYAL LAYOUT) -->
<section class="train-video-sec">
  <div class="wrap">
    <div class="train-video-box" style="background:#262463">
      <!-- Left: Train Details & Logo -->
      <div class="train-video-content" style="background:#262463">
        <div class="train-video-logo">
          <img src="/images/luxury-trains/deccan-odyssey/logo.png" alt="Deccan Odyssey Logo">
        </div>
        <h2 class="train-video-title">Deccan Odyssey</h2>
        <p class="train-video-desc">
          <strong>Worlds leading luxury trains</strong> Modelled along the lines of the Palace on Wheels, the Deccan Odyssey is a royal 5 star resort on wheels taking guests across a splendorous journey over the Western Ghats, the Konkan coast and the Deccan Plateau.
        </p>
        <p class="train-video-desc">
          <strong>Deccan Odyssey Luxury Train in India -</strong> In operation since 2004, the luxury train of India offers 6 itineraries each of 7 nights and 8 days. The journeys are labelled Maharashtra Splendor, Indian Odyssey, Indian Sojourn, Jewels of the Deccan, Hidden Treasures of Gujarat and Maharashtra-a Wild Trail.
        </p>
        <div class="train-video-ctas">
          <a class="btn-koikoi-orange" href="{base_path}/deccan-odyssey/itinerary">
            <span>View 6 Circuits</span>
            <span>&rarr;</span>
          </a>
          <a class="btn-koikoi-white" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20am%20interested%20in%20the%20Deccan%20Odyssey%20journey." target="_blank" rel="noopener">
            <span>Get a Quote</span>
          </a>
        </div>
      </div>

      <!-- Right: YouTube Video Player -->
      <div class="train-video-player" id="doOverviewVideoBox">
        <div class="video-facade" onclick="loadTrainVideo('doOverviewVideoBox', '3aulJ0DKzDw')" style="background-image:url('https://img.youtube.com/vi/3aulJ0DKzDw/maxresdefault.jpg')">
          <div class="video-facade-overlay"></div>
          <div class="video-play-btn" aria-label="Play Deccan Odyssey Video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style="margin-left:3px"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <span class="video-caption-pill">Deccan Odyssey &middot; Experience Video</span>
        </div>
      </div>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Asia's Leading Luxury Train</div>
      <h2>21 Imperial Royal Carriages</h2>
      <p>Decorated in royal blue and gold, inspired by the personal carriages of Maratha rulers and the Nizam of Hyderabad.</p>
    </div>
    <div class="grid-4">
      <div class="card" style="padding:24px">
        <h3>6 Different 7-Night Journeys</h3>
        <p>From Maharashtra Splendour and Wild Trail to the Indian Odyssey across Rajasthan and Gujarat.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Waah! Maula & Waah! Rasoi</h3>
        <p>Two gourmet restaurant cars serving Maharashtrian specialties and international fusion cuisine.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Gateway Lounge Bar</h3>
        <p>Relaxed cocktail bar with sommelier selections and views of the Western Ghats.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Ayush Wellness & Spa</h3>
        <p>Full-size spa car offering Ayurvedic treatments, sauna, and fitness gym.</p>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/deccan-odyssey/index.html", 
               "Deccan Odyssey Luxury Train | 6 Journeys & Fares | KoiKoi Travel",
               "Explore the Deccan Odyssey: Ajanta & Ellora caves, Goa, Nashik vineyards and Pench-Tadoba tigers.",
               do_overview, active_train="deccan-odyssey", active_tab="overview", base_path=base_path)

    # Deccan Odyssey Itinerary
    do_itinerary = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{do_data["banner"]}');">
  <div class="wrap">
    <span class="tag">DECCAN ODYSSEY · ITINERARIES</span>
    <h1>6 Distinct 7 Nights / 8 Days Circuits</h1>
    <p>Covering Western, Central, and Northern India from Mumbai and Delhi.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="day-card">
      <span class="day-badge">Circuit 1 · 7 Nights / 8 Days</span>
      <h3>Maharashtra Splendour (Mumbai to Mumbai)</h3>
      <p><strong>Route:</strong> Mumbai → Nashik → Aurangabad (Ellora Caves) → Ajanta Caves → Kolhapur → Goa → Sindhudurg → Mumbai.<br>
      Highlights include UNESCO Ellora rock-cut temples, Nashik wine tasting, Kolhapur martial arts, and Goa beach gala.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 2 · 7 Nights / 8 Days</span>
      <h3>Indian Odyssey (Delhi to Mumbai)</h3>
      <p><strong>Route:</strong> Delhi → Sawai Madhopur → Agra → Jaipur → Udaipur → Vadodara → Ellora Caves → Mumbai.<br>
      Highlights include Taj Mahal, Ranthambore tiger safari, Amber Fort, Laxmi Vilas Palace and Kailasa temple.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 3 · 7 Nights / 8 Days</span>
      <h3>Maharashtra Wild Trail (Mumbai to Mumbai)</h3>
      <p><strong>Route:</strong> Mumbai → Aurangabad → Pench National Park → Tadoba Tiger Reserve → Ajanta → Nashik → Mumbai.<br>
      Twin tiger reserve safaris in Mowgli's jungle (Pench) and Tadoba along with ancient Buddhist fresco caves.</p>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/deccan-odyssey/itinerary/index.html", 
               "Deccan Odyssey Itineraries: Maharashtra Splendour & Wild Trail | KoiKoi Travel",
               "All 6 itineraries for Deccan Odyssey luxury train: Ajanta, Ellora, Goa, Nashik, Pench and Tadoba.",
               do_itinerary, active_train="deccan-odyssey", active_tab="itinerary", base_path=base_path)

    # Deccan Odyssey Departures
    do_departures = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{do_data["banner"]}');">
  <div class="wrap">
    <span class="tag">DECCAN ODYSSEY · DEPARTURES</span>
    <h1>2024–2025 & 2025–2026 Departure Schedule</h1>
    <p>Seasonal departures from Mumbai CSMT and New Delhi.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Circuit Name</th><th>Duration</th><th>2024–2025 Departures</th><th>2025–2026 Departures</th></tr></thead>
        <tbody>
          <tr><td>Maharashtra Splendour</td><td>7N / 8D</td><td>05 Oct, 02 Nov, 07 Dec 2024; 04 Jan, 01 Feb, 01 Mar 2025</td><td>04 Oct, 01 Nov, 06 Dec 2025; 03 Jan, 31 Jan, 28 Feb 2026</td></tr>
          <tr><td>Indian Odyssey</td><td>7N / 8D</td><td>19 Oct, 16 Nov, 14 Dec 2024; 18 Jan, 15 Feb, 15 Mar 2025</td><td>18 Oct, 15 Nov, 13 Dec 2025; 17 Jan, 14 Feb, 14 Mar 2026</td></tr>
          <tr><td>Maharashtra Wild Trail</td><td>7N / 8D</td><td>26 Oct, 23 Nov, 21 Dec 2024; 25 Jan, 22 Feb, 22 Mar 2025</td><td>25 Oct, 22 Nov, 20 Dec 2025; 24 Jan, 21 Feb, 21 Mar 2026</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/deccan-odyssey/departures/index.html", 
               "Deccan Odyssey Departure Dates 2024-2025 & 2026 | KoiKoi Travel",
               "Official departure calendar for Deccan Odyssey luxury train journeys from Mumbai and Delhi.",
               do_departures, active_train="deccan-odyssey", active_tab="departures", base_path=base_path)

    # Deccan Odyssey Price
    do_price = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{do_data["banner"]}');">
  <div class="wrap">
    <span class="tag">DECCAN ODYSSEY · TARIFF</span>
    <h1>Official Ticket Prices (7 Nights / 8 Days)</h1>
    <p>All-inclusive fares covering luxury suite, dining, wine tastings, and safaris.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Cabin Category</th><th>Single Occupancy</th><th>Twin/Double Sharing (Per Person)</th></tr></thead>
        <tbody>
          <tr><td>Deluxe Cabin</td><td>$9,750 USD</td><td>$7,320 USD</td></tr>
          <tr><td>Presidential Suite</td><td>$19,500 USD</td><td>$14,640 USD</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/deccan-odyssey/price/index.html", 
               "Deccan Odyssey Ticket Price & Tariff | KoiKoi Travel",
               "Official prices for Deccan Odyssey luxury train: Deluxe cabin and Presidential suite tariffs in USD and INR.",
               do_price, active_train="deccan-odyssey", active_tab="price", base_path=base_path)

    # Deccan Odyssey Cabins
    do_cabins = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{do_data["banner"]}');">
  <div class="wrap">
    <span class="tag">DECCAN ODYSSEY · CABINS</span>
    <h1>Maratha Inspired Suites on Rails</h1>
    <p>Elegantly decorated with royal motifs, electronic safe, en-suite bathroom with hot shower.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="cabin-grid">
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/deccan-odyssey/cabin.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">105 sq. ft.</span>
          <h3>Deluxe Cabin</h3>
          <p>Features handcrafted wood carvings, personal safe, wardrobe, en-suite bathroom with pressurized shower and Wi-Fi.</p>
        </div>
      </div>
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/deccan-odyssey/dining-lounge.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">205 sq. ft.</span>
          <h3>Presidential Suite</h3>
          <p>Dedicated living room lounge, master bedroom, two lavish bathrooms, private minibar, and 24/7 personal valet.</p>
        </div>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/deccan-odyssey/cabins/index.html", 
               "Deccan Odyssey Cabins & Presidential Suite | KoiKoi Travel",
               "View cabin dimensions, floor plans, and amenities on Deccan Odyssey luxury train.",
               do_cabins, active_train="deccan-odyssey", active_tab="cabins", base_path=base_path)

    # Deccan Odyssey Gallery
    do_gallery = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{do_data["banner"]}');">
  <div class="wrap">
    <span class="tag">DECCAN ODYSSEY · GALLERY</span>
    <h1>Photo Gallery</h1>
    <p>Inside the royal blue dream train.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="gallery-grid">
      <div class="g-item"><img src="/images/luxury-trains/deccan-odyssey/hero.jpg"><span>Deccan Odyssey Train</span></div>
      <div class="g-item"><img src="/images/luxury-trains/deccan-odyssey/exterior.jpg"><span>Royal Carriage Exterior</span></div>
      <div class="g-item"><img src="/images/luxury-trains/deccan-odyssey/dining-lounge.jpg"><span>Restaurant & Lounge Car</span></div>
      <div class="g-item"><img src="/images/luxury-trains/deccan-odyssey/cabin.jpg"><span>Deluxe Cabin</span></div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/deccan-odyssey/photo-gallery/index.html", 
               "Deccan Odyssey Photo Gallery | Blue Train & Western India | KoiKoi Travel",
               "High resolution photos of Deccan Odyssey luxury train: Ajanta & Ellora caves, cabins and lounges.",
               do_gallery, active_train="deccan-odyssey", active_tab="photo-gallery", base_path=base_path)

    # Also create flat .html files alongside directory/index.html
    for train in ["palace-on-wheels", "maharajas-express", "golden-chariot", "deccan-odyssey"]:
        for tab in ["itinerary", "departures", "price", "cabins", "photo-gallery"]:
            src = f"{base_dir}/{train}/{tab}/index.html"
            dst = f"{base_dir}/{train}/{tab}.html"
            if os.path.exists(src):
                shutil.copyfile(src, dst)

    print(f"Successfully generated all pages for {base_dir}!")

if __name__ == "__main__":
    generate_all_for_base("frontend/public/luxury-trains", "/luxury-trains")
    generate_all_for_base("frontend/public/luxury-train-demo", "/luxury-train-demo")
    print("ALL STATIC PAGES GENERATED WITH LOCAL IMAGES & UPDATES!")
