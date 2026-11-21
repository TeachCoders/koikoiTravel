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
.nav{display:flex;align-items:center;justify-content:space-between;min-height:76px;padding:8px 0}
.nav img{height:57px;width:auto}
@media(max-width:640px){.nav img{height:40px}}
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
.editorial-sec{background:#ffffff;border-top:1px solid #ede8e1;border-bottom:1px solid #ede8e1;padding:64px 0;position:relative}
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
.links a{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-size:12.5px;font-weight:600;padding:9px 6px;border:1px solid #e2e8f0;border-radius:8px;color:#0f172a;transition:all .2s ease;background:#faf8f5;font-family:'Outfit',sans-serif;text-decoration:none}
.links a:hover{background:#F8904D;color:#fff;border-color:#F8904D;transform:translateY(-1px);box-shadow:0 3px 8px rgba(248,144,77,0.25)}
.links a svg{flex-shrink:0;opacity:0.75;transition:opacity .2s}
.links a:hover svg{opacity:1;stroke:#fff}
.links a .link-arr{font-size:11px;opacity:0.6;transition:transform .2s,opacity .2s}
.links a:hover .link-arr{opacity:1;transform:translateX(2px)}
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
.table-wrap{overflow-x:auto;border-radius:16px;box-shadow:0 4px 20px rgba(184,134,11,.1);background:#fffdfa;border:1.5px solid #e8d7b0}
table{width:100%;border-collapse:collapse;min-width:760px;font-size:14px}
th{background:#0f172a;color:#ffffff;text-align:left;padding:15px 18px;font-family:'Outfit',sans-serif;font-weight:700;border-bottom:2px solid #e8d7b0;letter-spacing:0.3px}
td{padding:16px 18px;border-bottom:1px solid #f1e4c8;vertical-align:top;background:#ffffff}
tbody tr:nth-child(even) td{background:#faf6ed}
tbody tr:hover td{background:#f6eedb}
td:first-child{font-weight:600;color:#0f172a}
tr:last-child td{border-bottom:0}
.table-link-btn{display:inline-flex;align-items:center;gap:4px;color:#b86e00;font-weight:700;font-size:13px;text-decoration:none;transition:.2s}
.table-link-btn:hover{color:#8a5200;text-decoration:underline}

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
  height: 42px;
  padding: 0 10px;
  border-radius: 9999px;
  background: #F8904D;
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  font-family: 'Outfit', sans-serif;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(248,144,77,0.25);
}
.koikoi-btn-quote:hover {
  background: #E96A1E;
  color: #fff;
  transform: translateY(-1px);
}
.koikoi-btn-details {
  width: 100%;
  height: 42px;
  padding: 0 10px;
  border-radius: 9999px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #1e293b;
  font-weight: 600;
  font-size: 13px;
  font-family: 'Outfit', sans-serif;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.koikoi-btn-details:hover {
  border-color: #94a3b8;
  background: #f8fafc;
  color: #0f172a;
  transform: translateY(-1px);
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

/* ================= KOIKOI TOUR PACKAGE ACCORDION ================= */
.day-accordion-item {
  border-bottom: 1px solid #f1f5f9;
  padding: 8px 0;
}
.day-accordion-item:last-child {
  border-bottom: none;
}
.day-accordion-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  cursor: pointer;
  list-style: none;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}
.day-accordion-item summary::-webkit-details-marker {
  display: none;
}
.day-accordion-item summary::after,
.day-accordion-item[open] summary::after {
  content: none !important;
  display: none !important;
}
.day-accordion-item summary h3 {
  font-size: 16.5px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.day-accordion-item summary .day-num {
  color: #F8904D;
  font-weight: 800;
}
.day-accordion-item summary .chevron {
  width: 20px;
  height: 20px;
  color: #94a3b8;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}
.day-accordion-item[open] summary .chevron {
  transform: rotate(180deg);
  color: #F8904D;
}
.day-accordion-content {
  padding: 4px 0 16px;
  color: #475569;
  font-size: 15px;
  line-height: 1.75;
}
.day-accordion-content p {
  margin: 0 0 10px;
}
.day-accordion-content p:last-child {
  margin-bottom: 0;
}
.day-meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-top: 8px;
}
@media (max-width: 900px) {
  .hero-inner-split {
    grid-template-columns: 1fr !important;
  }
  .gallery-hero-grid {
    height: 340px !important;
  }
}

.hero-photo-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hero-photo-card:hover img {
  transform: scale(1.05);
}
.hero-photo-card:hover .more-overlay {
  background: rgba(15, 23, 42, 0.50) !important;
}
.hero-photo-card:hover .more-overlay span {
  transform: scale(1.06);
}

/* Circuit Photo Lightbox Modal (Matching KoiKoi JourneyLightbox) */
.circuit-lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgba(6, 9, 15, 0.97);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}
.circuit-lb-overlay.active {
  opacity: 1;
  visibility: visible;
}
.circuit-lb-btn {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.circuit-lb-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: scale(1.06);
}
.circuit-lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  z-index: 20;
}
.circuit-lb-arrow.prev { left: 24px; }
.circuit-lb-arrow.next { right: 24px; }
@media (max-width: 768px) {
  .circuit-lb-arrow { width: 38px; height: 38px; }
  .circuit-lb-arrow.prev { left: 10px; }
  .circuit-lb-arrow.next { right: 10px; }
}

.circuit-highlights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 28px;
  list-style: none;
  padding: 0;
  margin: 0;
}
@media (max-width: 768px) {
  .circuit-highlights-grid {
    grid-template-columns: 1fr !important;
  }
}

.circuit-price-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  background: #ffffff;
}
.circuit-price-table th {
  background: #0f172a !important;
  color: #ffffff !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  padding: 15px 16px !important;
  border-bottom: 2px solid #e2e8f0 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.15) !important;
  text-align: center !important;
  width: 18% !important;
}
.circuit-price-table th:first-child {
  text-align: left !important;
  padding-left: 20px !important;
  width: 28% !important;
}
.circuit-price-table th:last-child {
  border-right: none !important;
}
.circuit-price-table td {
  padding: 15px 16px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  border-right: 1px solid #f1f5f9 !important;
  text-align: center !important;
  vertical-align: middle !important;
  background: #ffffff !important;
  color: #0f172a !important;
  font-size: 14.5px !important;
}
.circuit-price-table td:first-child {
  text-align: left !important;
  padding-left: 20px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  background: #f8fafc !important;
  border-right: 1px solid #e2e8f0 !important;
}
.circuit-price-table td:last-child {
  border-right: none !important;
}
.circuit-price-table tbody tr:nth-child(even) td {
  background: #fcfcfd !important;
}
.circuit-price-table tbody tr:nth-child(even) td:first-child {
  background: #f1f5f9 !important;
}
.circuit-price-table tbody tr:hover td {
  background: #f8fafc !important;
}
.circuit-price-table tbody tr:hover td:first-child {
  background: #e2e8f0 !important;
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
          <a href="{base_path}/golden-chariot/pride-of-karnataka">Pride of Karnataka (6D)</a>
          <a href="{base_path}/golden-chariot/jewels-of-south">Jewels of South (6D)</a>
          <a href="{base_path}/golden-chariot/glimpses-of-karnataka">Glimpses of Karnataka (4D)</a>
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

function toggleAllDays() {{
  const items = document.querySelectorAll('.day-accordion-item');
  if (!items.length) return;
  const anyOpen = Array.from(items).some(item => item.open);
  items.forEach(item => item.open = !anyOpen);
}}

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
    if os.path.exists(base_dir):
        print(f"Deleting old directory {base_dir}...")
        shutil.rmtree(base_dir)
    os.makedirs(base_dir, exist_ok=True)

    def get_card_links(train_slug):
        itin_link = f"{base_path}/golden-chariot/pride-of-karnataka" if train_slug == "golden-chariot" else f"{base_path}/{train_slug}/itinerary"
        return f'''
          <div class="links">
            <a href="{itin_link}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path></svg>
              <span>Itinerary</span>
              <span class="link-arr">&rarr;</span>
            </a>
            <a href="{base_path}/{train_slug}/departures">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Departures</span>
              <span class="link-arr">&rarr;</span>
            </a>
            <a href="{base_path}/{train_slug}/price">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <span>Price</span>
              <span class="link-arr">&rarr;</span>
            </a>
            <a href="{base_path}/{train_slug}/cabins">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 7v11m0-4h18m0-7v11M3 10h18M6 7a2 2 0 1 1 4 0v3H6V7z"></path></svg>
              <span>Cabins</span>
              <span class="link-arr">&rarr;</span>
            </a>
            <a href="{base_path}/{train_slug}/photo-gallery">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <span>Photos</span>
              <span class="link-arr">&rarr;</span>
            </a>
            <a href="{base_path}/{train_slug}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              <span>Overview</span>
              <span class="link-arr">&rarr;</span>
            </a>
          </div>'''

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
      <span>Luxury Train India</span>
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
          <div style="font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#d96b27;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Starts from Delhi</div>
          <h3 style="margin-bottom:2px">Palace on Wheels</h3>
          <div class="sub" style="margin-bottom:12px">India's first luxury train, since 1982</div>
          <p>A week through the land of kings: forts, palaces, lakes and desert, ending at the Taj Mahal.</p>

          <!-- Focused Lowest Starting Price Highlight -->
          <div style="display:flex;align-items:center;justify-content:space-between;background:#fffdfa;border:1.5px solid #e8d7b0;border-radius:12px;padding:10px 16px;margin-bottom:16px;box-shadow:0 2px 10px rgba(184,134,11,0.06)">
            <div>
              <div style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Lowest Starting Tariff</div>
              <div style="font-size:11.5px;color:#94a3b8">Per Person (Twin Sharing)</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:'Outfit',sans-serif;font-size:21px;font-weight:800;color:#d96b27;line-height:1.1">$3,950 <span style="font-size:12.5px;font-weight:600;color:#64748b">USD</span></div>
              <div style="font-size:11px;color:#64748b;font-weight:600">approx. ₹3.28 Lakh</div>
            </div>
          </div>

          <!-- Journeys List (Chardham Table Style) -->
          <div class="card-journeys-list" style="margin-bottom:18px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff">
            <div style="background:#f8fafc;padding:8px 14px;border-bottom:1px solid #e2e8f0;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">
              Curated Royal Circuit
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;gap:12px">
              <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">Classic Rajasthan &amp; Taj Mahal Circuit</div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">7N / 8D</span>
                <a href="{base_path}/palace-on-wheels/itinerary" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>
          </div>

          <ul class="facts">
            <li><span>Duration</span><span>7 Nights / 8 Days</span></li>
            <li><span>Route</span><span>Delhi · Jaipur · Ranthambore · Udaipur · Jaisalmer · Jodhpur · Agra</span></li>
          </ul>
          {get_card_links('palace-on-wheels')}
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
          <div style="font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#d96b27;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Starts from Delhi &amp; Mumbai</div>
          <h3 style="margin-bottom:2px">Maharajas' Express</h3>
          <div class="sub" style="margin-bottom:12px">4 journeys · 23 coaches · 4 cabin types</div>
          <p>The most varied train: pick a short 4-day trip or a full week through Rajasthan, Orchha, Khajuraho and Varanasi.</p>

          <!-- Focused Lowest Starting Price Highlight -->
          <div style="display:flex;align-items:center;justify-content:space-between;background:#fffdfa;border:1.5px solid #e8d7b0;border-radius:12px;padding:10px 16px;margin-bottom:16px;box-shadow:0 2px 10px rgba(184,134,11,0.06)">
            <div>
              <div style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Lowest Starting Tariff</div>
              <div style="font-size:11.5px;color:#94a3b8">Per Person (Twin Sharing)</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:'Outfit',sans-serif;font-size:21px;font-weight:800;color:#d96b27;line-height:1.1">$5,160 <span style="font-size:12.5px;font-weight:600;color:#64748b">USD</span></div>
              <div style="font-size:11px;color:#64748b;font-weight:600">approx. ₹5.16 Lakh</div>
            </div>
          </div>

          <!-- Journeys List (Chardham Table Style) -->
          <div class="card-journeys-list" style="margin-bottom:18px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff">
            <div style="background:#f8fafc;padding:8px 14px;border-bottom:1px solid #e2e8f0;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">
              4 Curated Royal Journeys
            </div>
            
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #f1f5f9;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">The Heritage of India</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Mumbai &rarr; Udaipur &rarr; Jodhpur &rarr; Bikaner &rarr; Jaipur &rarr; Ranthambore &rarr; Agra &rarr; Delhi</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">6N / 7D</span>
                <a href="{base_path}/maharajas-express/the-heritage-of-india" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #f1f5f9;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">The Indian Panorama</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Delhi &rarr; Jaipur &rarr; Ranthambore &rarr; Agra &rarr; Orchha &rarr; Khajuraho &rarr; Varanasi &rarr; Delhi</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">6N / 7D</span>
                <a href="{base_path}/maharajas-express/the-indian-panorama" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #f1f5f9;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">The Indian Splendour</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Delhi &rarr; Agra &rarr; Ranthambore &rarr; Jaipur &rarr; Bikaner &rarr; Jodhpur &rarr; Udaipur &rarr; Mumbai</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">6N / 7D</span>
                <a href="{base_path}/maharajas-express/the-indian-splendour" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">Treasures of India</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Delhi &rarr; Agra &rarr; Ranthambore &rarr; Jaipur &rarr; Delhi</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">3N / 4D</span>
                <a href="{base_path}/maharajas-express/treasures-of-india" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>
          </div>

          {get_card_links('maharajas-express')}
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
          <div style="font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#d96b27;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Starts from Bengaluru</div>
          <h3 style="margin-bottom:2px">Golden Chariot</h3>
          <div class="sub" style="margin-bottom:12px">South India's luxury train</div>
          <p>Mysore palaces, Hampi ruins, Bandipur wildlife and the beaches of Goa, all starting from Bengaluru.</p>

          <!-- Focused Lowest Starting Price Highlight -->
          <div style="display:flex;align-items:center;justify-content:space-between;background:#fffdfa;border:1.5px solid #e8d7b0;border-radius:12px;padding:10px 16px;margin-bottom:16px;box-shadow:0 2px 10px rgba(184,134,11,0.06)">
            <div>
              <div style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Lowest Starting Tariff</div>
              <div style="font-size:11.5px;color:#94a3b8">Per Person (Twin Sharing)</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:'Outfit',sans-serif;font-size:21px;font-weight:800;color:#d96b27;line-height:1.1">$3,400 <span style="font-size:12.5px;font-weight:600;color:#64748b">USD</span></div>
              <div style="font-size:11px;color:#64748b;font-weight:600">approx. ₹3.31 Lakh</div>
            </div>
          </div>

          <!-- Journeys List (Chardham Table Style) -->
          <div class="card-journeys-list" style="margin-bottom:18px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff">
            <div style="background:#f8fafc;padding:8px 14px;border-bottom:1px solid #e2e8f0;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">
              3 Curated Southern Circuits
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #f1f5f9;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">Pride of Karnataka</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Bengaluru &rarr; Bandipur &rarr; Mysore &rarr; Halebidu &rarr; Hampi &rarr; Goa &rarr; Bengaluru</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">5N / 6D</span>
                <a href="{base_path}/golden-chariot/pride-of-karnataka" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #f1f5f9;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">Jewels of South</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Bengaluru &rarr; Mysore &rarr; Kanchipuram &rarr; Mahabalipuram &rarr; Thanjavur &rarr; Chettinad &rarr; Cochin &rarr; Kumarakom &rarr; Bengaluru</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">5N / 6D</span>
                <a href="{base_path}/golden-chariot/jewels-of-south" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;gap:12px">
              <div>
                <div style="font-weight:600;font-size:13.5px;color:#0f172a;line-height:1.3">Glimpses of Karnataka</div>
                <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.35">Bengaluru &rarr; Bandipur &rarr; Mysore &rarr; Hampi &rarr; Bengaluru</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;color:#d96b27;background:rgba(248,144,77,0.12);padding:3px 8px;border-radius:6px;white-space:nowrap">3N / 4D</span>
                <a href="{base_path}/golden-chariot/glimpses-of-karnataka" style="background:#0f172a;color:#fff;font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none">More</a>
              </div>
            </div>
          </div>

          {get_card_links('golden-chariot')}
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
          <div style="font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:#d96b27;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Starts from Mumbai &amp; Delhi</div>
          <h3 style="margin-bottom:2px">Deccan Odyssey</h3>
          <div class="sub" style="margin-bottom:12px">Six 7-night journeys</div>
          <p>Ajanta and Ellora caves, Goa, Udaipur, the Golden Triangle and even Tadoba tiger country, on one train.</p>

          <!-- Focused Lowest Starting Price Highlight -->
          <div style="display:flex;align-items:center;justify-content:space-between;background:#fffdfa;border:1.5px solid #e8d7b0;border-radius:12px;padding:10px 16px;margin-bottom:16px;box-shadow:0 2px 10px rgba(184,134,11,0.06)">
            <div>
              <div style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Lowest Starting Tariff</div>
              <div style="font-size:11.5px;color:#94a3b8">Per Person (Twin Sharing)</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:'Outfit',sans-serif;font-size:21px;font-weight:800;color:#d96b27;line-height:1.1">$7,320 <span style="font-size:12.5px;font-weight:600;color:#64748b">USD</span></div>
              <div style="font-size:11px;color:#64748b;font-weight:600">approx. ₹6.08 Lakh</div>
            </div>
          </div>

          <ul class="facts">
            <li><span>Duration</span><span>7 Nights / 8 Days</span></li>
            <li><span>Routes</span><span>Maharashtra, Gujarat &amp; Rajasthan Circuits</span></li>
          </ul>
          {get_card_links('deccan-odyssey')}
          <a class="btn btn-dark" href="{base_path}/deccan-odyssey">View Deccan Odyssey</a>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- COMPARE & OFFICIAL DEPARTURES -->
<section id="compare" style="background:#ffffff;border-top:1px solid #eee7de;border-bottom:1px solid #eee7de;padding:64px 0">
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

    # 4 Signature Journey Cards Component (KoiKoi Signature Style)
    def get_me_cards_component():
        return f"""
<div class="koikoi-card-grid" style="margin-top:24px">
  <!-- Card 1: The Heritage of India -->
  <div class="koikoi-tour-card" id="card-heritage">
    <a href="{base_path}/maharajas-express/the-heritage-of-india" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/hero.jpg" alt="The Heritage of India - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/the-heritage-of-india" class="koikoi-card-title">
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
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20Maharajas%27%20Express%20-%20The%20Heritage%20of%20India%20(Mumbai%20to%20Delhi%2C%207%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/the-heritage-of-india">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 2: The Indian Panorama -->
  <div class="koikoi-tour-card" id="card-panorama">
    <a href="{base_path}/maharajas-express/the-indian-panorama" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/dining-pink.jpg" alt="The Indian Panorama - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/the-indian-panorama" class="koikoi-card-title">
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
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20Maharajas%27%20Express%20-%20The%20Indian%20Panorama%20(Delhi%20to%20Delhi%2C%207%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/the-indian-panorama">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 3: The Indian Splendour -->
  <div class="koikoi-tour-card" id="card-splendour">
    <a href="{base_path}/maharajas-express/the-indian-splendour" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/suite.jpg" alt="The Indian Splendour - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/the-indian-splendour" class="koikoi-card-title">
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
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20Maharajas%27%20Express%20-%20The%20Indian%20Splendour%20(Delhi%20to%20Mumbai%2C%207%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/the-indian-splendour">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 4: Treasures of India -->
  <div class="koikoi-tour-card" id="card-treasures">
    <a href="{base_path}/maharajas-express/treasures-of-india" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/maharajas-express/deluxe-cabin.jpg" alt="Treasures of India - Maharajas' Express Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/maharajas-express/treasures-of-india" class="koikoi-card-title">
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
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20Maharajas%27%20Express%20-%20Treasures%20of%20India%20(4%20Days%20Golden%20Triangle)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/maharajas-express/treasures-of-india">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
"""

    # Image 2 Departure Dates Table Component (2026-27 Schedules)
    def get_me_departures_table_component():
        return f"""
<div style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04);margin-top:20px">
  <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;text-align:center;font-size:14px">
      <thead>
        <tr style="background:#1e255e;color:#fff;font-family:'Outfit',sans-serif">
          <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15);font-size:15px">Season 2026-27</th>
          <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:15px;font-weight:700">Treasures of India</div>
            <div style="font-size:12.5px;color:#cbd5e1;font-weight:400;margin-top:2px">(3 Nights/4 Days)</div>
          </th>
          <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:15px;font-weight:700">The Indian Panorama</div>
            <div style="font-size:12.5px;color:#cbd5e1;font-weight:400;margin-top:2px">(6 Nights/7 Days)</div>
          </th>
          <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:15px;font-weight:700">The Indian Splendour</div>
            <div style="font-size:12.5px;color:#cbd5e1;font-weight:400;margin-top:2px">(6 Nights/7 Days)</div>
          </th>
          <th style="padding:16px 14px">
            <div style="font-size:15px;font-weight:700">The Heritage of India</div>
            <div style="font-size:12.5px;color:#cbd5e1;font-weight:400;margin-top:2px">(6 Nights/7 Days)</div>
          </th>
        </tr>
        <tr style="background:#f8fafc;color:#0f172a;font-family:'Outfit',sans-serif;font-weight:700;border-bottom:2px solid #e2e8f0;font-size:13px">
          <td style="padding:10px 14px;border-right:1px solid #e2e8f0;color:#64748b">Month / Day</td>
          <td style="padding:10px 14px;border-right:1px solid #e2e8f0;color:#2E8B8B">Wednesday / Sunday</td>
          <td style="padding:10px 14px;border-right:1px solid #e2e8f0;color:#2E8B8B">Sunday</td>
          <td style="padding:10px 14px;border-right:1px solid #e2e8f0;color:#2E8B8B">Sunday</td>
          <td style="padding:10px 14px;color:#2E8B8B">Sunday</td>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Sept. 2026</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">30</td>
          <td style="padding:13px 14px;color:#94a3b8;border-right:1px solid #f1f5f9">-</td>
          <td style="padding:13px 14px;color:#94a3b8;border-right:1px solid #f1f5f9">-</td>
          <td style="padding:13px 14px;color:#94a3b8">-</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;background:#fcfcfd">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Oct. 2026</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">25</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">4</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">11</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a">18</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Nov. 2026</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">22</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">1, 29</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">8</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a">15</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;background:#fcfcfd">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Dec. 2026</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">20</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">27</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">6</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a">13</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Jan. 2027</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">17</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">24</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">3, 31</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a">10</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;background:#fcfcfd">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Feb. 2027</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">14</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">21</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">28</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a">7</td>
        </tr>
        <tr style="border-bottom:2px solid #e2e8f0">
          <td style="padding:13px 14px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9;background:#fafafa">Mar. 2027</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">14</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">21</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">28</td>
          <td style="padding:13px 14px;font-weight:600;color:#0f172a">7</td>
        </tr>
        <tr style="background:#f8fafc;font-family:'Outfit',sans-serif;font-weight:700">
          <td style="padding:14px;color:#0f172a;border-right:1px solid #e2e8f0">Trips Total</td>
          <td style="padding:14px;color:#F8904D;border-right:1px solid #e2e8f0;font-size:15px">7 Trips</td>
          <td style="padding:14px;color:#F8904D;border-right:1px solid #e2e8f0;font-size:15px">7 Trips</td>
          <td style="padding:14px;color:#F8904D;border-right:1px solid #e2e8f0;font-size:15px">7 Trips</td>
          <td style="padding:14px;color:#F8904D;font-size:15px">6 Trips</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="padding:16px 24px;background:#fdfcfb;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
    <div style="font-size:13.5px;color:#64748b">
      ✦ Also available: <a href="{base_path}/maharajas-express/departures" style="color:#2E8B8B;font-weight:600">Full 2025–2026 & 2026–2027 Departure Calendars &rarr;</a>
    </div>
    <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20check%20cabin%20availability%20for%20Maharajas%27%20Express%20scheduled%20dates." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:13.5px;padding:8px 18px;border-radius:999px;text-decoration:none">
      Inquire Dates on WhatsApp &rarr;
    </a>
  </div>
</div>
"""

    # Image 3 Fare / Price Tables Component (Season 2026-27 USD & INR)
    def get_me_price_tables_component():
        return f"""
<div style="margin-top:20px">
  <!-- Currency Switcher Tabs -->
  <div style="display:flex;gap:10px;margin-bottom:18px">
    <button id="priceTabUsdBtn" onclick="switchPriceCurrency('usd')" style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;padding:9px 20px;border-radius:999px;background:#0f172a;color:#fff;border:none;cursor:pointer">
      USD Tariffs ($)
    </button>
    <button id="priceTabInrBtn" onclick="switchPriceCurrency('inr')" style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;padding:9px 20px;border-radius:999px;background:#fff;border:1px solid #cbd5e1;color:#64748b;cursor:pointer">
      INR Tariffs (₹)
    </button>
  </div>

  <!-- USD Price Table -->
  <div id="priceTableUsd" style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04)">
    <div style="padding:16px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <h3 style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;color:#0f172a;margin:0">
        Maharajas' Express Packages for Season 2026-27 (USD)
      </h3>
      <span style="font-size:12.5px;color:#64748b;font-weight:600">Official IRCTC Fares</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;text-align:center;font-size:13.5px">
        <thead>
          <tr style="background:#991b1b;color:#fff;font-family:'Outfit',sans-serif;font-size:14px">
            <th style="padding:14px;text-align:left;border-right:1px solid rgba(255,255,255,0.15)">Itinerary</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Rooming</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Deluxe Cabin</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Junior Suite</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Suite</th>
            <th style="padding:14px">Presidential Suite</th>
          </tr>
        </thead>
        <tbody>
          <!-- The Indian Splendour -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Indian Splendour<br><small style="color:#64748b;font-weight:400">(6 Nights/ 7 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$8,400</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$10,700</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$15,600</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">$26,800</td>
          </tr>
          <tr style="border-bottom:2px solid #e2e8f0;background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$6,300</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$9,700</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$15,600</td>
            <td style="padding:12px;color:#64748b">$26,800</td>
          </tr>

          <!-- The Heritage of India -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Heritage of India<br><small style="color:#64748b;font-weight:400">(6 Nights/ 7 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$8,800</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$11,200</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$15,600</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">$26,800</td>
          </tr>
          <tr style="border-bottom:2px solid #e2e8f0;background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$6,600</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$10,100</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$15,600</td>
            <td style="padding:12px;color:#64748b">$26,800</td>
          </tr>

          <!-- The Indian Panorama -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Indian Panorama<br><small style="color:#64748b;font-weight:400">(6 Nights/ 7 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$8,400</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$10,700</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$15,600</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">$26,800</td>
          </tr>
          <tr style="border-bottom:2px solid #e2e8f0;background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$6,300</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$9,700</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$15,600</td>
            <td style="padding:12px;color:#64748b">$26,800</td>
          </tr>

          <!-- Treasures of India -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              Treasures of India<br><small style="color:#64748b;font-weight:400">(3 Nights/ 4 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$5,300</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$5,700</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">$8,600</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">$14,600</td>
          </tr>
          <tr style="background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$4,000</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$5,200</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">$8,600</td>
            <td style="padding:12px;color:#64748b">$14,600</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- INR Price Table -->
  <div id="priceTableInr" style="display:none;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04)">
    <div style="padding:16px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <h3 style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;color:#0f172a;margin:0">
        Maharajas' Express Packages for Season 2026-27 (INR)
      </h3>
      <span style="font-size:12.5px;color:#64748b;font-weight:600">Official IRCTC Fares in Indian Rupees</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;text-align:center;font-size:13.5px">
        <thead>
          <tr style="background:#991b1b;color:#fff;font-family:'Outfit',sans-serif;font-size:14px">
            <th style="padding:14px;text-align:left;border-right:1px solid rgba(255,255,255,0.15)">Itinerary</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Rooming</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Deluxe Cabin</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Junior Suite</th>
            <th style="padding:14px;border-right:1px solid rgba(255,255,255,0.15)">Suite</th>
            <th style="padding:14px">Presidential Suite</th>
          </tr>
        </thead>
        <tbody>
          <!-- The Indian Splendour -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Indian Splendour<br><small style="color:#64748b;font-weight:400">(6 Nights/ 7 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹8,19,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹10,43,250</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹15,21,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">₹26,13,000</td>
          </tr>
          <tr style="border-bottom:2px solid #e2e8f0;background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹6,14,250</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹9,45,750</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹15,21,000</td>
            <td style="padding:12px;color:#64748b">₹26,13,000</td>
          </tr>

          <!-- The Heritage of India -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Heritage of India<br><small style="color:#64748b;font-weight:400">(6 Nights/ 7 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹8,58,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹10,92,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹15,21,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">₹26,13,000</td>
          </tr>
          <tr style="border-bottom:2px solid #e2e8f0;background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹6,43,500</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹9,84,750</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹15,21,000</td>
            <td style="padding:12px;color:#64748b">₹26,13,000</td>
          </tr>

          <!-- The Indian Panorama -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Indian Panorama<br><small style="color:#64748b;font-weight:400">(6 Nights/ 7 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹8,19,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹10,43,250</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹15,21,000</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">₹26,13,000</td>
          </tr>
          <tr style="border-bottom:2px solid #e2e8f0;background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹6,14,250</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹9,45,750</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹15,21,000</td>
            <td style="padding:12px;color:#64748b">₹26,13,000</td>
          </tr>

          <!-- Treasures of India -->
          <tr style="border-bottom:1px solid #f1f5f9">
            <td rowspan="2" style="padding:14px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #e2e8f0;background:#fafafa">
              The Treasures of India<br><small style="color:#64748b;font-weight:400">(3 Nights/ 4 Days)</small>
            </td>
            <td style="padding:12px;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">Adult (Twin Sharing)</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹5,16,750</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹5,55,750</td>
            <td style="padding:12px;font-weight:700;color:#0f172a;border-right:1px solid #f1f5f9">₹8,38,500</td>
            <td style="padding:12px;font-weight:700;color:#0f172a">₹14,23,500</td>
          </tr>
          <tr style="background:#fcfcfd">
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">Single Supplement</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹3,90,000</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹5,07,000</td>
            <td style="padding:12px;color:#64748b;border-right:1px solid #f1f5f9">₹8,38,500</td>
            <td style="padding:12px;color:#64748b">₹14,23,500</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div style="margin-top:14px;padding:12px 18px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
    <div style="font-size:12.5px;color:#64748b">
      • 5% Govt. Service Tax (GST) extra · INR tariffs subject to periodic revision · Single supplement applies to solo travelers in a cabin
    </div>
    <a href="{base_path}/maharajas-express/price" style="color:#2E8B8B;font-weight:700;font-size:13px;text-decoration:none">
      View Detailed Fare Inclusions & Terms &rarr;
    </a>
  </div>
</div>
"""

    # Image 1 Video Spotlight Split Box Component
    def get_me_video_spotlight_component():
        return f"""
<div style="border-radius:24px;overflow:hidden;background:#262463;border:1px solid rgba(255,255,255,0.08);box-shadow:0 16px 48px rgba(15,23,42,0.18);margin-top:20px">
  <div style="display:grid;grid-template-columns:1fr 1.25fr;min-height:460px" class="video-split-grid">
    <div style="padding:48px 44px;display:flex;flex-direction:column;justify-content:center;background:#262463;color:#ffffff">
      <div style="margin-bottom:20px">
        <img src="/images/luxury-trains/maharajas-express/logo.png" alt="Maharajas' Express Official Logo" style="max-height:85px;width:auto;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.3))">
      </div>
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,2.8vw,36px);font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 16px">
        Maharajas' Express
      </h2>
      <p style="color:#cbd5e1;font-size:14.5px;line-height:1.75;margin:0 0 14px">
        Voted the World's Leading Luxury Train, the Maharajas' Express represents the gold standard of royal Indian rail travel. Half a mile of sheer opulence, authentic Rajput hospitality, and five-star dining on wheels.
      </p>
      <p style="color:#cbd5e1;font-size:14.5px;line-height:1.75;margin:0 0 24px">
        Covering destinations from Mumbai to Delhi, Rajasthan, Orchha, Khajuraho, and the sacred river ghats of Varanasi across 4 distinct signature circuits.
      </p>
      <div>
        <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20am%20interested%20in%20Maharajas%27%20Express.%20Please%20share%20availability%20and%20journey%20details." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:12px 26px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(248,144,77,0.4)">
          Inquire on WhatsApp &rarr;
        </a>
      </div>
    </div>
    <div style="position:relative;background:#000;min-height:360px" id="meVideoBox">
      <div class="video-facade" onclick="loadTrainVideo('meVideoBox', 'p0MNgGI17Pw')" style="position:absolute;inset:0;background:url('https://img.youtube.com/vi/p0MNgGI17Pw/maxresdefault.jpg') center/cover no-repeat;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <div style="width:72px;height:72px;border-radius:50%;background:#F8904D;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 10px rgba(248,144,77,0.3);transition:transform .3s">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style="margin-left:4px"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>
    </div>
  </div>
</div>
"""

    # Image 7 Photo Gallery Section Component (Placed at the very bottom)
    def get_me_gallery_component():
        return f"""
<div style="margin-top:20px">
  <div class="gallery-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
    <div class="g-item" style="height:240px"><img src="/images/luxury-trains/maharajas-express/hero.jpg" alt="Maharajas' Express Train Exterior"><span>Royal Train Exterior</span></div>
    <div class="g-item" style="height:240px"><img src="/images/luxury-trains/maharajas-express/dining-pink.jpg" alt="Rang Mahal Dining Car"><span>Rang Mahal Dining Restaurant</span></div>
    <div class="g-item" style="height:240px"><img src="/images/luxury-trains/maharajas-express/suite.jpg" alt="Royal Suite Living Room"><span>Royal Suite Living Salon</span></div>
    <div class="g-item" style="height:240px"><img src="/images/luxury-trains/maharajas-express/deluxe-cabin.jpg" alt="Deluxe Double Cabin"><span>Deluxe Twin/Double Cabin</span></div>
  </div>
  <div style="text-align:center;margin-top:24px">
    <a href="{base_path}/maharajas-express/photo-gallery" style="display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #cbd5e1;color:#0f172a;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:10px 24px;border-radius:999px;text-decoration:none">
      View Full Photo Gallery (40+ Photos) &rarr;
    </a>
  </div>
</div>
"""

    # ================= 1. MAHARAJAS' EXPRESS INDEX PAGE =================
    me_index_html = f"""
<!-- Top Full-View Clean Hero Banner (NO TEXT ON BANNER) -->
<div style="position:relative;height:480px;background:url('/images/luxury-trains/maharajas-express/hero.jpg') center/cover no-repeat;overflow:hidden">
</div>

<!-- Clean Editorial Title & Journeys Intro Section (SINGLE MERGED HEADING & TEXT) -->
<div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:40px 0 36px">
  <div class="wrap">
    <div class="koikoi-breadcrumb" style="margin-bottom:14px">
      <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <span style="color:#0f172a;font-weight:600">Maharajas' Express</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;border:1px solid rgba(248,144,77,0.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:5px 14px;border-radius:999px">
        WORLD'S LEADING LUXURY TRAIN (7x WINNER)
      </span>
      <span style="color:#64748b;font-size:13.5px;font-weight:600">4 Signature Circuits · 23 Carriages</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(30px,4.2vw,48px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 14px;max-width:1100px">
      Maharaja Express Train
    </h1>
    <p style="color:#475569;font-size:clamp(15px,1.25vw,17.5px);max-width:1050px;line-height:1.75;margin:0">
      Experience half a mile of royal opulence across India aboard 23 carriages with two five-star fine-dining restaurants, dedicated butler service, and pneumatic suspension. Connecting iconic heritage destinations across Mumbai, Delhi, Rajasthan, Agra, and Varanasi.
    </p>
  </div>
</div>

<!-- Main Body Section (FULL WIDTH - NO SIDEBAR - NO INCLUSIONS/EXCLUSIONS ON INDEX) -->
<section style="padding:48px 0 80px;background:#fcfbf9">
  <div class="wrap">
    
    <!-- 1. The 4 Signature Journeys -->
    <div id="journeys" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Royal Circuits</div>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          4 Signature Journeys
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Select a royal circuit below to explore complete day-by-day itineraries and departure dates.
        </p>
      </div>
      {get_me_cards_component()}
    </div>

    <!-- 2. Departure Dates (Image 2 Style) -->
    <div id="departures" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:8px">
        <div class="eyebrow">Schedules</div>
        <h2 style="font-size:clamp(26px,3vw,36px)">Departure Dates</h2>
        <p style="max-width:860px;margin:0 auto">
          Following are the Scheduled Departures of Train Maharaja Express for 2026 – 2027.
        </p>
      </div>
      {get_me_departures_table_component()}
    </div>

    <!-- 3. Price & Fares (Image 3 Style) -->
    <div id="fare" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:8px">
        <div class="eyebrow">Official Tariffs</div>
        <h2 style="font-size:clamp(26px,3vw,36px)">Maharajas' Express Fare & Cabin Tariffs</h2>
        <p style="max-width:860px;margin:0 auto">
          Official tariff per person across all 4 cabin categories in USD and INR for Season 2026-27.
        </p>
      </div>
      {get_me_price_tables_component()}
    </div>

    <!-- 4. Video Spotlight Section (Image 1 Style Full Section Split Box) -->
    <div id="video" style="margin-bottom:64px">
      {get_me_video_spotlight_component()}
    </div>

    <!-- 5. Onboard Carriages & Amenities (Life On Board) -->
    <div id="facilities" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Life On Board</div>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          Royal Carriages &amp; Amenities
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          23 carriages stretching half a mile, accommodating 88 guests across 14 gemstone-named guest carriages with pneumatic suspension.
        </p>
      </div>

      <div class="grid-4">
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🛏️</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">14 Gemstone Guest Carriages</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Deluxe Cabins, Junior Suites, Suites, and the Presidential Suite (Navratna) named after precious gems (Moti, Panna, Manik, Neelam...) with private en-suite bathroom, Wi-Fi, and 24/7 personal butler.</p>
        </div>
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🍽️</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">Rang Mahal &amp; Mayur Mahal Dining</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Two fine-dining restaurant cars seating 42 guests each, featuring peacock fresco ceilings and gold-edged Limoges fine porcelain, serving authentic Indian regional specialties and international cuisine.</p>
        </div>
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🍸</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">The Rajah Club &amp; Safari Bar</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Two thematic lounge bars serving curated single malts, house wines, and classic cocktails in plush leather armchairs, with observation lounge seating and board games.</p>
        </div>
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">✨</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">Onboard Facilities &amp; Boutique</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Dedicated onboard library, souvenir boutique with handcrafted Indian heritage items, climate control with pneumatic suspension, and an emergency paramedic onboard.</p>
        </div>
      </div>
    </div>

    <!-- 6. Photo Gallery Section -->
    <div id="gallery" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:8px">
        <div class="eyebrow">Photo Gallery</div>
        <h2 style="font-size:clamp(26px,3vw,36px)">Glimpse Inside Maharajas' Express</h2>
        <p style="max-width:860px;margin:0 auto">
          High-resolution photos of dining carriages, lounge bars, presidential suites, and royal excursions.
        </p>
      </div>
      {get_me_gallery_component()}
    </div>

    <!-- 7. How Booking Works -->
    <div id="booking-steps" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">How It Works</div>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Simple Steps to Book
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          No complicated forms or pressure. Just direct travel advice from our dedicated team.
        </p>
      </div>

      <div class="step-grid">
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">01</div>
          <h3 style="color:#0f172a">Share Your Preferred Dates</h3>
          <p style="color:#64748b">Tell us your circuit, travel dates, passenger count, and preferred cabin (Deluxe, Junior Suite, Suite, or Presidential Suite).</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">02</div>
          <h3 style="color:#0f172a">Live Cabin Availability &amp; Itemized Quote</h3>
          <p style="color:#64748b">We confirm live cabin inventory directly with IRCTC and provide you with an itemized, transparent quote with all official inclusions.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">03</div>
          <h3 style="color:#0f172a">Confirm with 25% Deposit</h3>
          <p style="color:#64748b">Secure your berth with an initial 25% deposit. The remaining balance is payable 60 days before your train departs.</p>
        </div>
      </div>
    </div>

    <!-- 8. Frequently Asked Questions (FAQ) -->
    <div id="faq">
      <div class="sec-head center" style="margin-bottom:28px;text-align:center;max-width:850px;margin-left:auto;margin-right:auto">
        <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">HELPFUL FAQS</span>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:center">
          Frequently Asked Questions · <span style="color:#F8904D">Maharajas' Express</span>
        </h2>
        <p style="max-width:860px;margin:8px auto 0;color:#64748b;font-size:15px;line-height:1.6;text-align:center">
          Everything you need to know about cabins, dining, schedules, and reservations.
        </p>
      </div>

      <div class="faq" style="background:#fff;border-radius:16px;border:1px solid #e2e8f0;padding:8px 24px;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
        <details open style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Where do Maharajas' Express journeys begin and conclude?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            Departures depend on your chosen circuit:
            <ul style="margin:8px 0 0;padding-left:20px">
              <li><strong>The Heritage of India (7 Days):</strong> Begins at Chhatrapati Shivaji Maharaj Terminus (CSMT), Mumbai and concludes at Safdarjung Railway Station, Delhi.</li>
              <li><strong>The Indian Panorama (7 Days):</strong> Round-trip starting and ending at Safdarjung Railway Station, Delhi.</li>
              <li><strong>The Indian Splendour (7 Days):</strong> Starts at Safdarjung Railway Station, Delhi and concludes at CSMT, Mumbai.</li>
              <li><strong>Treasures of India (4 Days):</strong> Round-trip starting and ending at Safdarjung Railway Station, Delhi.</li>
            </ul>
            All guests are welcomed at the station lounge with a traditional red-carpet ceremonial welcome and briefing before boarding.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is included in the Maharajas' Express ticket price?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Your ticket is fully inclusive: air-conditioned accommodation with private en-suite bathroom, all gourmet meals at Rang Mahal and Mayur Mahal, complimentary house wines, beers, and spirits, round-the-clock tea, coffee, and bottled water, 24/7 dedicated personal butler (Khidmatgar) service, guided off-train sightseeing in deluxe coaches, all monument admission tickets, standard still-camera fees, Ranthambore wildlife safari permits, and traditional cultural performances. Suite and Presidential Suite guests also enjoy private luxury cars and dedicated guides for all excursions.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What costs are not included in the fare?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Items outside the ticket fare include: 5% Government GST, optional off-train excursions (such as hotel spa treatments), professional video/filming permits at monuments, premium spirits or champagnes beyond the house pour selection, telephone calls, laundry services, and personal gratuities for tour guides and train staff.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What are the differences between Deluxe Cabins, Junior Suites, Suites, and the Presidential Suite?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            Maharajas' Express offers 4 cabin categories:
            <ul style="margin:8px 0 0;padding-left:20px">
              <li><strong>Deluxe Cabin (112 sq. ft.):</strong> Available with twin or double beds, equipped with private bathroom, shower stall, electronic safe, wardrobe, and live television.</li>
              <li><strong>Junior Suite (150 sq. ft.):</strong> Features expansive picture windows, a separate writing desk, and twin or double bed layouts.</li>
              <li><strong>Suite (220 sq. ft.):</strong> Includes a separate living salon, private bedroom, full en-suite bathtub, mini-bar, and a complimentary private luxury car with exclusive guide during all excursions.</li>
              <li><strong>Presidential Suite 'Navratna' (448 sq. ft.):</strong> Spans an entire railway carriage featuring two full bedrooms, two bathrooms (one with bathtub), living area, private dining salon, personal valet, and dedicated private car throughout the journey.</li>
            </ul>
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Can vegetarian, Jain, vegan, or special diets be accommodated?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Yes, with ease. The onboard chefs prepare fresh meals for all dietary preferences. Pure vegetarian, Jain (prepared without onion or garlic), vegan, gluten-free, lactose-free, and Halal meals are carefully arranged. Please share any dietary restrictions with us when booking so the onboard culinary team can prepare in advance.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is the recommended dress code?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">During daytime excursions, monument visits, and the Ranthambore wildlife safari, smart-casual and comfortable lightweight clothing is ideal, paired with sturdy walking shoes and sun protection. In the evenings, dinners at Rang Mahal and Mayur Mahal welcome smart-casual or semi-formal dress. For special theme evenings and palace dinners, guests often enjoy wearing festive traditional Indian or formal attire.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">How is luggage managed inside the cabins?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Each cabin has designated storage space under the beds and overhead racks, best suited for medium soft-sided suitcases or standard trolley bags. If you have extra or oversized baggage, it can be safely stored in the train's secure luggage van throughout the trip at no extra charge.</p>
        </details>
        <details style="padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Can KoiKoi Travel arrange pre-tour and post-tour hotels and airport transfers?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Yes, absolutely. We arrange complete luxury extensions, including five-star hotel stays in Delhi or Mumbai before and after your rail journey, private airport transfers, domestic flight connections, and customized private city tours across India.</p>
        </details>
      </div>
    </div>

  </div>
</section>

<script>
function switchPriceCurrency(curr) {{
  const usdTable = document.getElementById('priceTableUsd');
  const inrTable = document.getElementById('priceTableInr');
  const usdBtn = document.getElementById('priceTabUsdBtn');
  const inrBtn = document.getElementById('priceTabInrBtn');

  if (curr === 'usd') {{
    if (usdTable) usdTable.style.display = 'block';
    if (inrTable) inrTable.style.display = 'none';
    if (usdBtn) {{
      usdBtn.style.background = '#0f172a';
      usdBtn.style.color = '#fff';
      usdBtn.style.border = 'none';
    }}
    if (inrBtn) {{
      inrBtn.style.background = '#fff';
      inrBtn.style.color = '#64748b';
      inrBtn.style.border = '1px solid #cbd5e1';
    }}
  }} else {{
    if (usdTable) usdTable.style.display = 'none';
    if (inrTable) inrTable.style.display = 'block';
    if (inrBtn) {{
      inrBtn.style.background = '#0f172a';
      inrBtn.style.color = '#fff';
      inrBtn.style.border = 'none';
    }}
    if (usdBtn) {{
      usdBtn.style.background = '#fff';
      usdBtn.style.color = '#64748b';
      usdBtn.style.border = '1px solid #cbd5e1';
    }}
  }}
}}
</script>
"""
    write_page(f"{base_dir}/maharajas-express/index.html", 
               "Maharajas' Express Luxury Train Tour Package | 4 Royal Journeys | KoiKoi Travel",
               "Discover the 4 iconic journeys of Maharajas' Express luxury train: Heritage of India, Indian Panorama, Indian Splendour, and Treasures of India with day-by-day itineraries and 2026-27 tariffs.",
               me_index_html, active_train="maharajas-express", active_tab="overview", base_path=base_path)

    # ================= 2. SEPARATE ITINERARY DETAIL PAGES =================
    # Common Inclusions/Exclusions for separate itinerary pages
    inc_exc_snippet = f"""
<div class="inc-exc-grid" style="margin-top:32px">
  <div class="inc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="16 9 10 15 7 12"></polyline></svg>
      What's Included in This Journey
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Luxury cabin accommodation with en-suite private bathroom & 24/7 personal butler</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All gourmet meals on board at Rang Mahal and Mayur Mahal fine-dining restaurants</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Complimentary house brands of wines, beers, and spirits throughout the rail journey</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All guided off-train excursions in deluxe coaches (Private luxury car for Suite guests)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All monument entrance fees, national park jungle safaris, and boat rides</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Exclusive royal dining events (Desert dunes gala dinner, palace receptions)</span></li>
    </ul>
  </div>
  <div class="exc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      What's Excluded
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Pre and post-train 5-star hotel stays (Curated separately by KoiKoi Travel)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>International & domestic airfare</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Premium vintage imported liquors & wines</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Onboard spa treatments, laundry, and telephone calls</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Gratuities for train attendants and off-train local guides</span></li>
    </ul>
  </div>
</div>
"""

    def build_koikoi_circuit_page(circuit_tag, name, duration, title, route, starting_price,
                                  origin, destination, destinations_count,
                                  hero_imgs, highlights, overview, days_data,
                                  departures_data, price_data, faqs_data,
                                  train_slug="maharajas-express", train_name="Maharajas' Express",
                                  inc_exc_html=None):
        hl_html = "".join([f"""<li style="display:flex;align-items:flex-start;gap:10px;font-size:14.5px;color:#334155;line-height:1.5">
  <svg style="color:#2E8B8B;margin-top:2px;flex-shrink:0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
  <span>{h}</span>
</li>""" for h in highlights])

        days_html = ""
        for i, d in enumerate(days_data):
            open_attr = "open" if i == 0 else ""
            desc_html = "".join([f"<p>{p}</p>" for p in d["paragraphs"]])
            overnight_html = f'<div class="day-meta-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> {d["overnight"]}</div>' if d.get("overnight") else ""
            meals_html = f'<div class="day-meta-pill" style="margin-left:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg> {d["meals"]}</div>' if d.get("meals") else ""

            days_html += f"""
<details class="day-accordion-item" {open_attr}>
  <summary>
    <h3>
      <span class="day-num">Day {d['day']}:</span>
      <span>{d['title']}</span>
    </h3>
    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </summary>
  <div class="day-accordion-content">
    {desc_html}
    <div style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:10px">
      {overnight_html}
      {meals_html}
    </div>
  </div>
</details>
"""

        # Build departure rows
        dep_rows_html = ""
        for month_name, date_str in departures_data:
            dep_rows_html += f"""
<tr style="border-bottom:1px solid #f1f5f9">
  <td style="padding:14px 20px;font-weight:700;color:#0f172a;background:#fafafa;border-right:1px solid #e2e8f0">{month_name}</td>
  <td style="padding:14px 20px;color:#0f172a;font-weight:600;border-right:1px solid #f1f5f9">{date_str}</td>
  <td style="padding:14px 20px">
    <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20check%20cabin%20availability%20for%20{train_name}%20{name}%20departing%20on%20{date_str}." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:6px 14px;border-radius:6px;text-decoration:none">
      Check Availability &rarr;
    </a>
  </td>
</tr>
"""

        # Build Dynamic Photo Grid HTML (4+ photos support with +N Photos badge)
        extra_count = len(hero_imgs) - 4
        more_badge_html = f"""
        <div style="position:absolute;inset:0;background:rgba(15,23,42,0.38);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;transition:background .25s" class="more-overlay">
          <span style="padding:10px 18px;border-radius:12px;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);color:#0f172a;font-family:\'Outfit\',sans-serif;font-size:13px;font-weight:800;box-shadow:0 10px 25px rgba(0,0,0,0.25);display:inline-flex;align-items:center;gap:6px;transition:transform .2s">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            +{extra_count} Photos
          </span>
        </div>
""" if extra_count > 0 else ""

        if len(hero_imgs) >= 4:
            gallery_grid_html = f"""
    <!-- Left: 4-Photo Showcase Grid with Lightbox Trigger -->
    <div style="display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);gap:12px;height:100%;min-height:380px" class="gallery-hero-grid">
      <!-- Photo 1 (Top Left) -->
      <div style="border-radius:16px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(0)" class="hero-photo-card" title="Click to open photo lightbox">
        <img src="{hero_imgs[0]['src']}" alt="{hero_imgs[0].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:8px 12px;font-size:12px;font-weight:600">{hero_imgs[0]['title']}</span>
      </div>

      <!-- Photo 2 (Top Right) -->
      <div style="border-radius:16px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(1)" class="hero-photo-card" title="Click to open photo lightbox">
        <img src="{hero_imgs[1]['src']}" alt="{hero_imgs[1].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:8px 12px;font-size:12px;font-weight:600">{hero_imgs[1]['title']}</span>
      </div>

      <!-- Photo 3 (Bottom Left) -->
      <div style="border-radius:16px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(2)" class="hero-photo-card" title="Click to open photo lightbox">
        <img src="{hero_imgs[2]['src']}" alt="{hero_imgs[2].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:8px 12px;font-size:12px;font-weight:600">{hero_imgs[2]['title']}</span>
      </div>

      <!-- Photo 4 (Bottom Right + Optional Overlay) -->
      <div style="border-radius:16px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(3)" class="hero-photo-card" title="Click to view all photos">
        <img src="{hero_imgs[3]['src']}" alt="{hero_imgs[3].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:8px 12px;font-size:12px;font-weight:600">{hero_imgs[3]['title']}</span>
        {more_badge_html}
      </div>
    </div>
"""
        else:
            gallery_grid_html = f"""
    <!-- Left: 3-Photo Showcase Grid with Lightbox Trigger -->
    <div style="display:grid;grid-template-columns:1.2fr 1fr;grid-template-rows:repeat(2,1fr);gap:12px;height:100%" class="gallery-hero-grid">
      <div style="grid-row:1 / -1;border-radius:20px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(0)" class="hero-photo-card" title="Click to open photo lightbox">
        <img src="{hero_imgs[0]['src']}" alt="{hero_imgs[0].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:12px 16px;font-size:13px;font-weight:600">{hero_imgs[0]['title']}</span>
      </div>
      <div style="border-radius:16px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(1)" class="hero-photo-card" title="Click to open photo lightbox">
        <img src="{hero_imgs[1]['src']}" alt="{hero_imgs[1].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:8px 12px;font-size:12px;font-weight:600">{hero_imgs[1]['title']}</span>
      </div>
      <div style="border-radius:16px;overflow:hidden;position:relative;background:#1e293b;cursor:pointer" onclick="openCircuitLightbox(2)" class="hero-photo-card" title="Click to open photo lightbox">
        <img src="{hero_imgs[2]['src']}" alt="{hero_imgs[2].get('title', name)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease">
        <span style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));color:#fff;padding:8px 12px;font-size:12px;font-weight:600">{hero_imgs[2]['title']}</span>
      </div>
    </div>
"""

        # Serialize slides json for frontend JS
        import json as _py_json
        slides_json = _py_json.dumps(hero_imgs)

        lightbox_modal_html = f"""
<!-- Circuit Photo Lightbox Modal -->
<div id="circuitLightbox" class="circuit-lb-overlay" onclick="onLightboxBackdropClick(event)">
  <!-- Header: Counter & Close -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px;z-index:30">
    <span id="lbCounter" style="display:inline-block;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.10);padding:6px 14px;border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:0.18em;color:rgba(255,255,255,0.9);backdrop-filter:blur(10px);text-transform:uppercase">1 / {len(hero_imgs)}</span>
    <button class="circuit-lb-btn" onclick="closeCircuitLightbox()" aria-label="Close photo gallery">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>

  <!-- Main View Area with Prev / Next Arrows -->
  <div style="position:relative;flex:1;display:flex;align-items:center;justify-content:center;padding:10px 80px;min-height:0">
    <button class="circuit-lb-btn circuit-lb-arrow prev" onclick="prevCircuitLightbox()" aria-label="Previous photo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <img id="lbMainImage" src="" alt="" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:12px;box-shadow:0 25px 60px rgba(0,0,0,0.8);transition:opacity 0.2s ease, transform 0.2s ease">
    <button class="circuit-lb-btn circuit-lb-arrow next" onclick="nextCircuitLightbox()" aria-label="Next photo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
  </div>

  <!-- Footer: Caption -->
  <div style="padding:16px 24px 22px;text-align:center;z-index:30">
    <div id="lbCaption" style="color:#ffffff;font-size:15px;font-weight:600;font-family:\'Outfit\',sans-serif;letter-spacing:0.3px;text-shadow:0 2px 8px rgba(0,0,0,0.8)"></div>
  </div>
</div>

<script>
const circuitSlides = {slides_json};
let curLbIndex = 0;

function openCircuitLightbox(index) {{
  curLbIndex = index;
  updateLightboxContent();
  const lb = document.getElementById('circuitLightbox');
  if (!lb) return;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}}

function closeCircuitLightbox() {{
  const lb = document.getElementById('circuitLightbox');
  if (!lb) return;
  lb.classList.remove('active');
  document.body.style.overflow = '';
}}

function updateLightboxContent() {{
  if (!circuitSlides || !circuitSlides.length) return;
  const slide = circuitSlides[curLbIndex];
  const imgEl = document.getElementById('lbMainImage');
  const counterEl = document.getElementById('lbCounter');
  const captionEl = document.getElementById('lbCaption');
  if (imgEl) {{
    imgEl.style.opacity = '0.3';
    imgEl.style.transform = 'scale(0.98)';
    imgEl.src = slide.src;
    imgEl.alt = slide.title || '';
    setTimeout(() => {{
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }}, 80);
  }}
  if (counterEl) {{
    counterEl.textContent = `${{curLbIndex + 1}} / ${{circuitSlides.length}}`;
  }}
  if (captionEl) {{
    captionEl.textContent = slide.title || '';
  }}
}}

function nextCircuitLightbox() {{
  if (!circuitSlides.length) return;
  curLbIndex = (curLbIndex + 1) % circuitSlides.length;
  updateLightboxContent();
}}

function prevCircuitLightbox() {{
  if (!circuitSlides.length) return;
  curLbIndex = (curLbIndex - 1 + circuitSlides.length) % circuitSlides.length;
  updateLightboxContent();
}}

function onLightboxBackdropClick(e) {{
  if (e.target.id === 'circuitLightbox' || e.target.tagName === 'DIV') {{
    if (e.target.closest('button') || e.target.tagName === 'IMG') return;
    closeCircuitLightbox();
  }}
}}

document.addEventListener('keydown', (e) => {{
  const lb = document.getElementById('circuitLightbox');
  if (!lb || !lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeCircuitLightbox();
  if (e.key === 'ArrowRight') nextCircuitLightbox();
  if (e.key === 'ArrowLeft') prevCircuitLightbox();
}});

// Swipe support for mobile touch
let lbTouchStartX = 0;
let lbTouchEndX = 0;
const lbContainer = document.getElementById('circuitLightbox');
if (lbContainer) {{
  lbContainer.addEventListener('touchstart', (e) => {{
    lbTouchStartX = e.changedTouches[0].screenX;
  }}, {{ passive: true }});
  lbContainer.addEventListener('touchend', (e) => {{
    lbTouchEndX = e.changedTouches[0].screenX;
    if (lbTouchStartX - lbTouchEndX > 50) nextCircuitLightbox();
    if (lbTouchEndX - lbTouchStartX > 50) prevCircuitLightbox();
  }}, {{ passive: true }});
}}
</script>
"""

        # Build Pricing Table HTML
        if train_slug == "golden-chariot":
            price_table_html = f"""
      <!-- USD Table -->
      <div id="circuitPriceUsd" style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table class="circuit-price-table">
            <thead>
              <tr>
                <th style="width:40%">Occupancy Category</th>
                <th style="width:30%">Deluxe Cabin (Twin / Double Sharing)</th>
                <th style="width:30%">Single Supplement (Solo Traveler)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adult Tariff (USD)</td>
                <td style="font-weight:700">{price_data['usd']['deluxe_twin']}</td>
                <td style="color:#64748b">{price_data['usd']['deluxe_single']}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- INR Table -->
      <div id="circuitPriceInr" style="display:none;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table class="circuit-price-table">
            <thead>
              <tr>
                <th style="width:40%">Occupancy Category</th>
                <th style="width:30%">Deluxe Cabin (Twin / Double Sharing)</th>
                <th style="width:30%">Single Supplement (Solo Traveler)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Indian Nationals Tariff (INR)</td>
                <td style="font-weight:700">{price_data['inr']['deluxe_twin']}</td>
                <td style="color:#64748b">{price_data['inr']['deluxe_single']}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
"""
        else:
            price_table_html = f"""
      <!-- USD Table -->
      <div id="circuitPriceUsd" style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table class="circuit-price-table">
            <thead>
              <tr>
                <th>Rooming Category</th>
                <th>Deluxe Cabin</th>
                <th>Junior Suite</th>
                <th>Suite</th>
                <th>Presidential Suite</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adult (Twin Sharing)</td>
                <td style="font-weight:700">{price_data['usd']['deluxe_twin']}</td>
                <td style="font-weight:700">{price_data['usd']['junior_twin']}</td>
                <td style="font-weight:700">{price_data['usd']['suite_twin']}</td>
                <td style="font-weight:700">{price_data['usd']['presidential']}</td>
              </tr>
              <tr>
                <td>Single Supplement</td>
                <td style="color:#64748b">{price_data['usd']['deluxe_single']}</td>
                <td style="color:#64748b">{price_data['usd']['junior_single']}</td>
                <td style="color:#64748b">{price_data['usd']['suite_single']}</td>
                <td style="color:#64748b">{price_data['usd']['presidential']}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- INR Table -->
      <div id="circuitPriceInr" style="display:none;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table class="circuit-price-table">
            <thead>
              <tr>
                <th>Rooming Category</th>
                <th>Deluxe Cabin</th>
                <th>Junior Suite</th>
                <th>Suite</th>
                <th>Presidential Suite</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adult (Twin Sharing)</td>
                <td style="font-weight:700">{price_data['inr']['deluxe_twin']}</td>
                <td style="font-weight:700">{price_data['inr']['junior_twin']}</td>
                <td style="font-weight:700">{price_data['inr']['suite_twin']}</td>
                <td style="font-weight:700">{price_data['inr']['presidential']}</td>
              </tr>
              <tr>
                <td>Single Supplement</td>
                <td style="color:#64748b">{price_data['inr']['deluxe_single']}</td>
                <td style="color:#64748b">{price_data['inr']['junior_single']}</td>
                <td style="color:#64748b">{price_data['inr']['suite_single']}</td>
                <td style="color:#64748b">{price_data['inr']['presidential']}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
"""

        # Format route with distinctive styling & colored arrows
        route_styled_html = route.replace(" → ", ' <span style="color:#ea580c;font-weight:800;margin:0 4px">&rarr;</span> ')

        # Build FAQs HTML
        faqs_html = ""
        for idx, faq in enumerate(faqs_data):
            open_attr = "open" if idx == 0 else ""
            border_style = "border-bottom:1px solid #f1f5f9;" if idx < len(faqs_data) - 1 else ""
            faqs_html += f"""
<details {open_attr} style="{border_style}padding:16px 0">
  <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">{faq['q']}</summary>
  <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
    {faq['a']}
  </div>
</details>
"""

        return f"""
<div class="wrap" style="padding-top:28px;padding-bottom:12px">
  <div class="koikoi-breadcrumb" style="margin-bottom:12px">
    <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
    <span style="color:#94a3b8;margin:0 6px">›</span>
    <a href="{base_path}/{train_slug}" style="color:#64748b;text-decoration:none">{train_name}</a>
    <span style="color:#94a3b8;margin:0 6px">›</span>
    <span style="color:#0f172a;font-weight:600">{name}</span>
  </div>
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">
    <span style="background:rgba(248,144,77,0.12);color:#d96b27;border:1px solid rgba(248,144,77,0.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;padding:4px 12px;border-radius:999px">
      {circuit_tag}
    </span>
  </div>
  <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,3.5vw,42px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
    {title}
  </h1>
  <div style="display:inline-flex;align-items:center;gap:10px;background:#fff8f4;border:1px solid #fed7aa;padding:8px 16px;border-radius:12px;margin-bottom:14px;flex-wrap:wrap">
    <div style="display:inline-flex;align-items:center;gap:6px;color:#ea580c;font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="3" width="16" height="16" rx="2"></rect>
        <path d="M4 11h16"></path>
        <path d="M12 3v8"></path>
        <path d="m8 19-2 3"></path>
        <path d="m16 19 2 3"></path>
        <circle cx="8" cy="15" r="1.5" fill="currentColor"></circle>
        <circle cx="16" cy="15" r="1.5" fill="currentColor"></circle>
      </svg>
      <span>Circuit Route</span>
    </div>
    <span style="color:#fdba74">|</span>
    <span style="color:#0f172a;font-weight:600;font-size:14.5px;line-height:1.5">
      {route_styled_html}
    </span>
  </div>
</div>

<div class="wrap" style="margin-bottom:44px">
  <div style="display:grid;grid-template-columns:1.8fr 1.2fr;gap:24px" class="hero-inner-split">
    
    {gallery_grid_html}
    <!-- Right: Tour Snapshot Card (Exact Clean & Authentic Style) -->
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="display:flex;align-items:center;gap:8px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;margin-bottom:16px">
          <span style="width:5px;height:18px;border-radius:999px;background:#F8904D"></span>
          <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#0f172a;margin:0">Tour Snapshot</h3>
        </div>

        <div style="background:#f8fafc;border-radius:12px;padding:12px;margin-bottom:14px;border:1px solid #e2e8f0">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <span style="font-size:12px;color:#64748b">Boarding Station:</span>
            <span style="font-size:12.5px;font-weight:700;color:#0f172a">{origin}</span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="font-size:12px;color:#64748b">Deboarding Station:</span>
            <span style="font-size:12.5px;font-weight:700;color:#0f172a">{destination}</span>
          </div>
        </div>

        <!-- Starting Tariff Box (Partitioned for Visa Holders vs Indian Nationals) -->
        <div style="background:#fffdfa;border:1px solid #fed7aa;border-radius:14px;padding:12px 14px;margin-bottom:14px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:11px;font-weight:700;color:#9a3412;text-transform:uppercase;letter-spacing:0.5px">Official Starting Tariff</span>
            <span style="font-size:11px;font-weight:600;color:#2E8B8B;background:rgba(46,139,139,0.1);padding:2px 8px;border-radius:999px">Deluxe Twin</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#ffffff;border:1px solid #fed7aa;border-radius:10px;padding:9px 10px">
            <!-- Foreign / Visa Holders -->
            <div style="border-right:1px solid #fed7aa;padding-right:6px">
              <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.3px;display:flex;align-items:center;gap:3px">
                <span>🌐 Visa / Foreign</span>
              </div>
              <div style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:#ea580c;line-height:1.2;margin-top:2px">
                {price_data['usd']['deluxe_twin']} <span style="font-size:10.5px;font-weight:700;color:#9a3412">USD</span>
              </div>
            </div>
            <!-- Indian Nationals -->
            <div style="padding-left:4px">
              <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.3px;display:flex;align-items:center;gap:3px">
                <span>🇮🇳 For Indian</span>
              </div>
              <div style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:#ea580c;line-height:1.2;margin-top:2px">
                {price_data['inr']['deluxe_twin']} <span style="font-size:10.5px;font-weight:700;color:#9a3412">INR</span>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;flex-wrap:wrap;gap:4px">
            <span style="font-size:10.5px;color:#64748b">Per Person · 5% Govt. GST extra</span>
            <a href="#pricing" style="font-size:11.5px;font-weight:700;color:#2E8B8B;text-decoration:none">View Full Table &darr;</a>
          </div>
        </div>

        <!-- Clean Authentic Booking Policy Box -->
        <div style="background:#fffdfa;border:1px solid #fed7aa;border-radius:12px;padding:12px 14px;margin-bottom:16px">
          <div style="font-size:11px;font-weight:700;color:#c2410c;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">Booking Policy</div>
          <div style="font-size:12px;color:#475569;line-height:1.5">Reserve your cabin with 25% advance deposit. Remaining 75% balance payable 60 days before departure.</div>
        </div>
      </div>

      <div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
          <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20send%20quote%20for%20{train_name}%20{name}." target="_blank" rel="noopener" style="background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:13.5px;padding:12px 6px;border-radius:10px;text-align:center;text-decoration:none;display:flex;align-items:center;justify-content:center;white-space:nowrap">
            Request Quote &rarr;
          </a>
          <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20plan%20{name}." target="_blank" rel="noopener" style="background:#25D366;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:13.5px;padding:12px 6px;border-radius:10px;text-align:center;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap">
            <svg style="width:16px;height:16px;fill:currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.35.49 1.198.533 1.285.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.181-.076.354.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.087.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/></svg>
            <span>WhatsApp</span>
          </a>
        </div>

        <!-- Real Authentic Inclusions (NO FAKE BADGES) -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;border-top:1px solid #f1f5f9;padding-top:12px">
          <div style="font-size:11px;font-weight:600;color:#334155;background:#f8fafc;padding:5px 8px;border-radius:8px;border:1px solid #e2e8f0;display:flex;align-items:center;gap:4px">
            <span style="color:#10b981;font-weight:800">✓</span> All Gourmet Meals
          </div>
          <div style="font-size:11px;font-weight:600;color:#334155;background:#f8fafc;padding:5px 8px;border-radius:8px;border:1px solid #e2e8f0;display:flex;align-items:center;gap:4px">
            <span style="color:#10b981;font-weight:800">✓</span> House Wines/Spirits
          </div>
          <div style="font-size:11px;font-weight:600;color:#334155;background:#f8fafc;padding:5px 8px;border-radius:8px;border:1px solid #e2e8f0;display:flex;align-items:center;gap:4px">
            <span style="color:#10b981;font-weight:800">✓</span> Dedicated Butler
          </div>
          <div style="font-size:11px;font-weight:600;color:#334155;background:#f8fafc;padding:5px 8px;border-radius:8px;border:1px solid #e2e8f0;display:flex;align-items:center;gap:4px">
            <span style="color:#10b981;font-weight:800">✓</span> Guided Excursions
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="wrap" style="padding-bottom:80px">
  <div style="display:grid;grid-template-columns:1fr;gap:40px">

    <!-- 1. Highlights Section -->
    <div>
      <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">KEY SIGHTS</span>
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#0f172a;margin:0 0 16px">
        {name} <span style="color:#F8904D">Highlights</span>
      </h2>
      <div style="background:rgba(204,251,241,0.25);border:1px solid #ccfbf1;border-radius:24px;padding:24px">
        <ul class="circuit-highlights-grid">
          {hl_html}
        </ul>
      </div>
    </div>

    <!-- 2. Overview Section -->
    <div>
      <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">OVERVIEW</span>
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#0f172a;margin:0 0 16px">
        About <span style="color:#F8904D">{name}</span>
      </h2>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;padding:28px;color:#475569;font-size:15.5px;line-height:1.8">
        {overview}
      </div>
    </div>

    <!-- 3. Day-by-Day Accordion -->
    <div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">DETAILED PLAN</span>
          <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#0f172a;margin:0">
            {name} <span style="color:#F8904D">Itinerary</span>
          </h2>
        </div>
        <button type="button" onclick="toggleAllDays()" style="background:#f1f5f9;border:1px solid #cbd5e1;color:#0f172a;font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:6px 16px;border-radius:999px;cursor:pointer">
          Expand / Collapse All
        </button>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;padding:16px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.02)">
        <div class="day-accordion">
          {days_html}
        </div>
      </div>
    </div>

    <!-- 4. Inclusions & Exclusions -->
    {inc_exc_html if inc_exc_html else inc_exc_snippet}

    <!-- 5. Scheduled Departures -->
    <div id="departures" style="margin-top:16px">
      <div class="sec-head" style="margin-bottom:20px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Schedules</div>
        <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#0f172a;margin:0 0 8px">
          {name} <span style="color:#F8904D">Departure Dates (2026 – 2027)</span>
        </h2>
        <p style="color:#64748b;font-size:14.5px;margin:0;line-height:1.6">
          Official scheduled Sunday departures for Season 2026-27. Reserve your cabin in advance.
        </p>
      </div>

      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:14px;text-align:left">
            <thead>
              <tr style="background:#1e255e;color:#fff;font-family:'Outfit',sans-serif">
                <th style="padding:14px 20px;border-right:1px solid rgba(255,255,255,0.15)">Month</th>
                <th style="padding:14px 20px;border-right:1px solid rgba(255,255,255,0.15)">Scheduled Departure Date</th>
                <th style="padding:14px 20px">Cabin Availability &amp; Inquiries</th>
              </tr>
            </thead>
            <tbody>
              {dep_rows_html}
            </tbody>
          </table>
        </div>
        <div style="padding:14px 20px;background:#fdfcfb;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <span style="font-size:13px;color:#64748b">✦ Departures commence with an afternoon check-in and traditional garland welcome ceremony.</span>
          <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20check%20cabin%20availability%20for%20Maharajas%27%20Express%20{name}." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;padding:8px 18px;border-radius:999px;text-decoration:none">
            Inquire Specific Date on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </div>

    <!-- 6. Official Tariffs & Prices -->
    <div id="pricing" style="margin-top:16px">
      <div class="sec-head" style="margin-bottom:20px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Official Fares</div>
        <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#0f172a;margin:0 0 8px">
          {name} <span style="color:#F8904D">Tariffs &amp; Cabin Prices (2026 – 2027)</span>
        </h2>
        <p style="color:#64748b;font-size:14.5px;margin:0;line-height:1.6">
          Official published IRCTC tariffs per person. 5% Govt. GST extra.
        </p>
      </div>

      <!-- Currency Switcher Buttons (Partitioned for Visa / Foreign vs For Indian) -->
      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
        <button id="circuitBtnUsd" onclick="switchCircuitPrice('usd')" style="font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;padding:8px 18px;border-radius:999px;background:#0f172a;color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
          <span>🌐 Visa / Foreign (USD $)</span>
        </button>
        <button id="circuitBtnInr" onclick="switchCircuitPrice('inr')" style="font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;padding:8px 18px;border-radius:999px;background:#fff;border:1px solid #cbd5e1;color:#64748b;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
          <span>🇮🇳 For Indian (INR ₹)</span>
        </button>
      </div>

      {price_table_html}
    </div>

    <!-- 7. FAQs for this Itinerary -->
    <div id="faqs" style="margin-top:16px">
      <div class="sec-head center" style="margin-bottom:24px;text-align:center;max-width:850px;margin-left:auto;margin-right:auto">
        <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">HELPFUL FAQS</span>
        <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#0f172a;margin:0 0 8px;text-align:center">
          Frequently Asked Questions · <span style="color:#F8904D">{name}</span>
        </h2>
        <p style="color:#64748b;font-size:14.5px;margin:0;line-height:1.6;text-align:center">
          Everything you need to know about departures, excursions, dining, and reservations for this circuit.
        </p>
      </div>

      <div class="faq" style="background:#fff;border-radius:18px;border:1px solid #e2e8f0;padding:8px 24px;box-shadow:0 4px 16px rgba(0,0,0,0.02)">
        {faqs_html}
      </div>
    </div>

  </div>
</div>

{lightbox_modal_html}

<script>
function switchCircuitPrice(curr) {{
  const usd = document.getElementById('circuitPriceUsd');
  const inr = document.getElementById('circuitPriceInr');
  const btnUsd = document.getElementById('circuitBtnUsd');
  const btnInr = document.getElementById('circuitBtnInr');
  if (curr === 'usd') {{
    if (usd) usd.style.display = 'block';
    if (inr) inr.style.display = 'none';
    if (btnUsd) {{ btnUsd.style.background = '#0f172a'; btnUsd.style.color = '#fff'; btnUsd.style.border = 'none'; }}
    if (btnInr) {{ btnInr.style.background = '#fff'; btnInr.style.color = '#64748b'; btnInr.style.border = '1px solid #cbd5e1'; }}
  }} else {{
    if (usd) usd.style.display = 'none';
    if (inr) inr.style.display = 'block';
    if (btnInr) {{ btnInr.style.background = '#0f172a'; btnInr.style.color = '#fff'; btnInr.style.border = 'none'; }}
    if (btnUsd) {{ btnUsd.style.background = '#fff'; btnUsd.style.color = '#64748b'; btnUsd.style.border = '1px solid #cbd5e1'; }}
  }}
}}
</script>
"""

    # 1. The Heritage of India (Mumbai to Delhi · 6N/7D)
    me_heritage_days = [
        {"day": 1, "title": "Mumbai – Welcome Ceremony & Boarding at CSMT", "meals": "Dinner Included",
         "paragraphs": [
             "<strong>Afternoon:</strong> Registration and check-in at the magnificent Chhatrapati Shivaji Maharaj Terminus (CSMT), Mumbai. Experience a traditional Indian welcome with fragrant marigold garlands, royal shehnai musicians, and welcome refreshments.",
             "<strong>Evening:</strong> Board Maharajas' Express and meet your personal dedicated butler. Settle into your handcrafted cabin as the train departs Mumbai and journeys northeast into royal Rajasthan. Savor your inaugural royal dinner at Rang Mahal restaurant."
         ],
         "overnight": "Overnight aboard Maharajas' Express en route to Udaipur"},
        {"day": 2, "title": "Udaipur – Lake Pichola Boat Cruise & City Palace", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Wake up in the romantic City of Lakes. Following breakfast on board, embark on a private motorboat cruise across the tranquil waters of Lake Pichola with majestic views of Lake Palace and Jag Mandir.",
             "<strong>Afternoon:</strong> Guided VIP tour of Udaipur City Palace and the rare Crystal Gallery. Enjoy a lavish lunch at the Satkar Hall of Fateh Prakash Palace or on board. Spend the late afternoon at leisure exploring local craft bazaars."
         ],
         "overnight": "Overnight aboard Maharajas' Express departing for Jodhpur"},
        {"day": 3, "title": "Jodhpur – Mehrangarh Fort & Royal Gala at Hanwant Mahal", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Arrive in the Blue City of Jodhpur. Explore the impregnable Mehrangarh Fort towering 400 feet above the skyline, followed by the gleaming white marble cenotaphs of Jaswant Thada.",
             "<strong>Evening:</strong> Private royal cocktail reception and Marwari banquet dinner at Hanwant Mahal overlooking illuminated Umaid Bhawan Palace, accompanied by Kalbeliya and Ghoomar folk performances."
         ],
         "overnight": "Overnight aboard Maharajas' Express departing for Bikaner"},
        {"day": 4, "title": "Bikaner – Junagarh Fort & Thar Sand Dunes Banquet", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Arrive in Bikaner, city of desert warriors. Tour the unvanquished Junagarh Fort with its opulent Anup Mahal and Badal Mahal painted in gold leaf.",
             "<strong>Evening:</strong> Journey via camel carts into the undulating Thar Desert sand dunes. Sip champagne as the sun sinks beneath the horizon, followed by a lavish open-air barbecue banquet under starry skies with fiery Langa folk songs."
         ],
         "overnight": "Overnight aboard Maharajas' Express to Jaipur"},
        {"day": 5, "title": "Jaipur – The Pink City, Amber Fort & Royal Lunch", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Arrive in Jaipur, Rajasthan's Pink City. Ascent to the hilltop Amber Fort via private royal jeeps. Marvel at the intricate mirror mosaics of Sheesh Mahal.",
             "<strong>Afternoon:</strong> Exclusive royal lunch at a heritage palace hotel. Visit the UNESCO Jantar Mantar observatory and drive past the iconic honeycombed facade of Hawa Mahal."
         ],
         "overnight": "Overnight aboard train to Sawai Madhopur"},
        {"day": 6, "title": "Ranthambore Tiger Safari & UNESCO Fatehpur Sikri", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Embark on an early morning open-top jungle game drive in Ranthambore National Park in search of Bengal tigers, leopards, marsh crocodiles, and sambar deer.",
             "<strong>Afternoon:</strong> Tour Emperor Akbar's abandoned 16th-century red sandstone imperial capital at Fatehpur Sikri, including Buland Darwaza and Panch Mahal."
         ],
         "overnight": "Overnight aboard Maharajas' Express parked at Agra"},
        {"day": 7, "title": "Agra & Delhi – Sunrise Taj Mahal & Farewell at Delhi", "meals": "Breakfast & Lunch",
         "paragraphs": [
             "<strong>Early Morning:</strong> Unforgettable sunrise visit to the Taj Mahal as the first rays of sunlight illuminate the white marble dome. Followed by champagne breakfast at Taj Khema.",
             "<strong>Afternoon:</strong> Visit the red sandstone fortress of Agra Fort. Savor a farewell lunch on board as the train returns to Delhi Safdarjung Station (approx 15:30 hrs). Disembark with royal farewell mementos."
         ],
         "overnight": "Tour Concludes in Delhi · Airport Transfers"}
    ]

    # 1. The Heritage of India (Mumbai to Delhi · 6N/7D)
    me_heritage_departures = [
        ("October 2026", "18 Oct 2026 (Sunday)"),
        ("November 2026", "15 Nov 2026 (Sunday)"),
        ("December 2026", "13 Dec 2026 (Sunday)"),
        ("January 2027", "10 Jan 2027 (Sunday)"),
        ("February 2027", "07 Feb 2027 (Sunday)"),
        ("March 2027", "07 Mar 2027 (Sunday)"),
        ("April 2027", "04 Apr 2027 (Sunday)"),
    ]
    me_heritage_prices = {
        "usd": {"deluxe_twin": "$8,800", "deluxe_single": "$6,600", "junior_twin": "$11,200", "junior_single": "$10,100", "suite_twin": "$15,600", "suite_single": "$15,600", "presidential": "$26,800"},
        "inr": {"deluxe_twin": "₹8,58,000", "deluxe_single": "₹6,43,500", "junior_twin": "₹10,92,000", "junior_single": "₹9,84,750", "suite_twin": "₹15,21,000", "suite_single": "₹15,21,000", "presidential": "₹26,13,000"}
    }
    me_heritage_faqs = [
        {"q": "Where does The Heritage of India journey depart from and terminate?",
         "a": "This journey departs from Mumbai at Chhatrapati Shivaji Maharaj Terminus (CSMT) on scheduled Sunday afternoons and concludes 7 days later at Delhi Safdarjung Railway Station."},
        {"q": "Is the Ranthambore tiger safari included on this route?",
         "a": "Yes, an early morning open-top jungle game drive in Ranthambore National Park with experienced naturalists and park permits is fully included in your ticket."},
        {"q": "What exclusive royal banquets are included in this journey?",
         "a": "Guests enjoy a private royal cocktail reception and Marwari banquet dinner at Hanwant Mahal overlooking illuminated Umaid Bhawan Palace in Jodhpur, and a gala barbecue feast with folk music on the Thar Desert sand dunes in Bikaner."},
        {"q": "What is the difference between Deluxe Cabin and Suite categories on this train?",
         "a": "Deluxe Cabins (112 sq. ft.) offer twin or double beds with attached en-suite shower bathrooms and shared group excursions in AC coaches. Suites (220 sq. ft.) provide a separate living room, bedroom, full bathtub, and a complimentary private luxury car with exclusive guide during all excursions."},
        {"q": "How do I book The Heritage of India and what deposit is required?",
         "a": "An advance deposit of 25% of the fare secures your reservation. The remaining 75% balance is payable 60 days before your departure. KoiKoi Travel assists with IRCTC seat allocation, pre/post luxury hotels in Mumbai or Delhi, and airport transfers."}
    ]

    me_heritage_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 1 · 6 Nights / 7 Days",
        name="The Heritage of India",
        duration="6 Nights / 7 Days",
        title="The Heritage of India (Mumbai to Delhi · 7D/6N)",
        route="Mumbai → Udaipur → Jodhpur → Bikaner → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Delhi",
        origin="Mumbai (CSMT Station)",
        destination="Delhi (Safdarjung Station)",
        destinations_count="8 Royal Cities",
        starting_price="$8,800 USD / ₹8,58,000 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/maharajas-express/hero.jpg", "title": "Maharajas' Express Livery"},
            {"src": "/images/luxury-trains/maharajas-express/dining-pink.jpg", "title": "Rang Mahal Fine Dining"},
            {"src": "/images/luxury-trains/maharajas-express/deluxe-cabin.jpg", "title": "Deluxe Cabin"},
            {"src": "/images/luxury-trains/maharajas-express/suite.jpg", "title": "Royal Presidential Suite Salon"}
        ],
        highlights=[
            "Gala welcome with shehnai & marigold garlands at Mumbai CSMT",
            "Private boat cruise on Lake Pichola & City Palace Udaipur",
            "Royal banquet and cocktails at Hanwant Mahal overlooking Mehrangarh, Jodhpur",
            "Camel cart procession & open-air barbecue banquet on Thar Desert dunes, Bikaner",
            "Jeep ascent & Sheesh Mahal exploration at Amber Fort, Jaipur",
            "Early morning tiger safari in Ranthambore National Park",
            "Sunrise champagne visit to the Taj Mahal in Agra"
        ],
        overview="Departing from India's commercial capital Mumbai, this flagship journey winds through royal Rajasthan's lake palaces, desert citadels, and tiger reserves, before reaching the Taj Mahal and capital city Delhi. Experience 7 days of unparalleled IRCTC luxury aboard the World's Leading Luxury Train.",
        days_data=me_heritage_days,
        departures_data=me_heritage_departures,
        price_data=me_heritage_prices,
        faqs_data=me_heritage_faqs
    )

    write_page(f"{base_dir}/maharajas-express/the-heritage-of-india/index.html", 
               "The Heritage of India Itinerary (Mumbai to Delhi · 7D/6N) | Maharajas' Express | KoiKoi Travel",
               "Day-by-day itinerary for The Heritage of India journey aboard Maharajas' Express: Mumbai, Udaipur, Jodhpur, Bikaner, Jaipur, Ranthambore, Agra, Delhi.",
               me_heritage_html, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # 2. The Indian Panorama (Delhi to Delhi · 6N/7D)
    me_panorama_departures = [
        ("October 2026", "04 Oct 2026 (Sunday)"),
        ("November 2026", "01 Nov 2026 (Sunday), 29 Nov 2026 (Sunday)"),
        ("December 2026", "27 Dec 2026 (Sunday)"),
        ("January 2027", "24 Jan 2027 (Sunday)"),
        ("February 2027", "21 Feb 2027 (Sunday)"),
        ("March 2027", "21 Mar 2027 (Sunday)"),
    ]
    me_panorama_prices = {
        "usd": {"deluxe_twin": "$8,400", "deluxe_single": "$6,300", "junior_twin": "$10,700", "junior_single": "$9,700", "suite_twin": "$15,600", "suite_single": "$15,600", "presidential": "$26,800"},
        "inr": {"deluxe_twin": "₹8,19,000", "deluxe_single": "₹6,14,250", "junior_twin": "₹10,43,250", "junior_single": "₹9,45,750", "suite_twin": "₹15,21,000", "suite_single": "₹15,21,000", "presidential": "₹26,13,000"}
    }
    me_panorama_faqs = [
        {"q": "What makes The Indian Panorama distinct from other luxury train circuits?",
         "a": "It is the only luxury rail circuit that combines Rajasthan's palaces (Jaipur), the tiger wilderness of Ranthambore, the Taj Mahal in Agra, the UNESCO erotic stone temples of Khajuraho, and the sacred ghats of Varanasi on the River Ganges."},
        {"q": "What experiences are included in Varanasi on this circuit?",
         "a": "Guests take a private sunset boat cruise on the River Ganges to witness the Maha Ganga Aarti from the water, visit the historic Sarnath deer park where Buddha delivered his first sermon, and tour a traditional Varanasi silk weaving center."},
        {"q": "Where does this journey start and conclude?",
         "a": "It is a round-trip tour starting and ending at Safdarjung Railway Station, New Delhi, making flight connections very convenient."},
        {"q": "Are monument admission fees and Khajuraho temple tickets included?",
         "a": "Yes, all entrance tickets to monuments, including the Western Group of Temples in Khajuraho and Agra's Taj Mahal, along with expert English-speaking guides, are included in the fare."},
        {"q": "How are meals arranged during excursions?",
         "a": "All meals are included. Gourmet breakfast, lunch, and dinner are served in Rang Mahal and Mayur Mahal dining cars, while select lunches are hosted at heritage palace hotels during off-train tours."}
    ]

    me_panorama_days = [
        {"day": 1, "title": "Delhi to Jaipur – Registration & Welcome Dinner", "meals": "Dinner Included",
         "paragraphs": [
             "<strong>Afternoon:</strong> Registration and traditional ceremonial welcome at Delhi Safdarjung Station with tikka, garlands, and shehnai music.",
             "<strong>Evening:</strong> Board Maharajas' Express and meet your personal butler. Enjoy a royal welcome dinner at Mayur Mahal as the train journeys toward Jaipur."
         ],
         "overnight": "Overnight aboard Maharajas' Express en route to Jaipur"},
        {"day": 2, "title": "Jaipur – Amber Fort & Palace Heritage Feast", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Hilltop Amber Fort excursion with private jeep climb, exploring the Diwan-e-Khas and mirror-encrusted Sheesh Mahal.",
             "<strong>Afternoon:</strong> Exclusive royal lunch at a heritage palace hotel. Afternoon visit to City Palace and Jantar Mantar."
         ],
         "overnight": "Overnight aboard train heading to Ranthambore"},
        {"day": 3, "title": "Ranthambore Tiger Safari & Fatehpur Sikri", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Thrilling jungle game drive in Ranthambore Tiger Reserve in search of Royal Bengal tigers.",
             "<strong>Afternoon:</strong> Walking tour of Emperor Akbar's abandoned red sandstone imperial city at Fatehpur Sikri."
         ],
         "overnight": "Overnight aboard train parked at Agra"},
        {"day": 4, "title": "Agra – Sunrise at Taj Mahal & Agra Fort", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Sunrise visit to the Taj Mahal followed by champagne breakfast at Taj Khema overlooking the monument.",
             "<strong>Afternoon:</strong> Tour of Agra Fort. Savor dinner on board as the train journeys south into Central India toward Orchha."
         ],
         "overnight": "Overnight aboard train to Orchha"},
        {"day": 5, "title": "Orchha Fort & UNESCO Khajuraho Temples", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Excursion to the medieval fort complex of Orchha, Jahangir Mahal, and Chattris along the Betwa River.",
             "<strong>Afternoon:</strong> Explore the UNESCO World Heritage Western Group of Temples at Khajuraho, famed for their thousand-year-old intricate stone carvings."
         ],
         "overnight": "Overnight aboard train to Varanasi"},
        {"day": 6, "title": "Varanasi – Sarnath & Holy Ganges Sunset Maha Aarti", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Arrive in Varanasi, the world's oldest living city. Excursion to Sarnath where Lord Buddha delivered his first sermon.",
             "<strong>Evening:</strong> Sunset boat cruise on the River Ganges to witness the unforgettable evening Maha Ganga Aarti ceremony at Dashashwamedh Ghat."
         ],
         "overnight": "Overnight aboard train returning to Delhi"},
        {"day": 7, "title": "Delhi – Farewell Breakfast & Deboarding", "meals": "Breakfast Included",
         "paragraphs": [
             "<strong>Morning:</strong> Farewell breakfast served as the train glides back into Delhi Safdarjung Station (approx 12:30 hrs).",
             "<strong>Afternoon:</strong> Disembark with royal memories. KoiKoi private transfer to your hotel or airport."
         ],
         "overnight": "Tour Concludes in Delhi · Airport Transfers"}
    ]

    me_panorama_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 2 · 6 Nights / 7 Days",
        name="The Indian Panorama",
        duration="6 Nights / 7 Days",
        title="The Indian Panorama (Delhi to Delhi · 7D/6N)",
        route="Delhi → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Orchha → Khajuraho → Varanasi → Delhi",
        origin="Delhi (Safdarjung Station)",
        destination="Delhi (Safdarjung Station)",
        destinations_count="7 Iconic Cities",
        starting_price="$8,400 USD / ₹8,19,000 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/maharajas-express/hero.jpg", "title": "Maharajas' Express"},
            {"src": "/images/luxury-trains/maharajas-express/dining-pink.jpg", "title": "Rang Mahal Restaurant"},
            {"src": "/images/luxury-trains/maharajas-express/deluxe-cabin.jpg", "title": "Deluxe Cabin"}
        ],
        highlights=[
            "UNESCO Amber Fort & City Palace in Jaipur",
            "Morning tiger tracking safari in Ranthambore National Park",
            "Sunrise tour of the Taj Mahal & Mughal monument Fatehpur Sikri",
            "Ancient Orchha fort complex & Jahangir Mahal cenotaphs",
            "World-famous erotic stone temples of Khajuraho (UNESCO)",
            "Sunset boat cruise on River Ganges & sacred evening Maha Ganga Aarti in Varanasi",
            "Sarnath deer park where Lord Buddha preached his first sermon"
        ],
        overview="A cultural deep-dive connecting Rajasthan's royal heritage, the tiger wilderness of Ranthambore, the Taj Mahal, the UNESCO erotic temples of Khajuraho, and the sacred river ghats of Varanasi. The only luxury train circuit covering both Rajasthan and the spiritual heart of Varanasi.",
        days_data=me_panorama_days,
        departures_data=me_panorama_departures,
        price_data=me_panorama_prices,
        faqs_data=me_panorama_faqs
    )

    write_page(f"{base_dir}/maharajas-express/the-indian-panorama/index.html", 
               "The Indian Panorama Itinerary (Delhi to Delhi · 7D/6N) | Maharajas' Express | KoiKoi Travel",
               "Day-by-day itinerary for The Indian Panorama journey aboard Maharajas' Express: Delhi, Jaipur, Ranthambore, Agra, Orchha, Khajuraho, Varanasi, Delhi.",
               me_panorama_html, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # 3. The Indian Splendour (Delhi to Mumbai · 6N/7D)
    me_splendour_departures = [
        ("October 2026", "11 Oct 2026 (Sunday)"),
        ("November 2026", "08 Nov 2026 (Sunday)"),
        ("December 2026", "06 Dec 2026 (Sunday)"),
        ("January 2027", "03 Jan 2027 (Sunday), 31 Jan 2027 (Sunday)"),
        ("February 2027", "28 Feb 2027 (Sunday)"),
        ("March 2027", "28 Mar 2027 (Sunday)"),
    ]
    me_splendour_prices = {
        "usd": {"deluxe_twin": "$8,400", "deluxe_single": "$6,300", "junior_twin": "$10,700", "junior_single": "$9,700", "suite_twin": "$15,600", "suite_single": "$15,600", "presidential": "$26,800"},
        "inr": {"deluxe_twin": "₹8,19,000", "deluxe_single": "₹6,14,250", "junior_twin": "₹10,43,250", "junior_single": "₹9,45,750", "suite_twin": "₹15,21,000", "suite_single": "₹15,21,000", "presidential": "₹26,13,000"}
    }
    me_splendour_faqs = [
        {"q": "Where does The Indian Splendour begin and conclude?",
         "a": "The tour departs from Safdarjung Railway Station in Delhi on scheduled Sunday afternoons, travels through Rajasthan, and concludes at Chhatrapati Shivaji Maharaj Terminus (CSMT) in Mumbai."},
        {"q": "What are the highlights of the Agra visit on this route?",
         "a": "An early morning sunrise viewing of the Taj Mahal to enjoy its beauty before public crowds arrive, followed by a champagne breakfast at Taj Khema and a guided tour of Agra Fort."},
        {"q": "How is Udaipur explored on Day 6?",
         "a": "Guests enjoy a private boat cruise across Lake Pichola, visit the grand City Palace and Crystal Gallery, and savor a royal lunch at Fateh Prakash Palace."},
        {"q": "Can solo travelers book this circuit?",
         "a": "Yes, single supplement rates are available for all 4 cabin categories, providing private occupancy with all meals, excursions, and butler services included."},
        {"q": "What is the booking deposit for The Indian Splendour?",
         "a": "A 25% deposit is required at booking, with the remaining 75% balance due 60 days before departure."}
    ]

    me_splendour_days = [
        {"day": 1, "title": "Delhi to Agra – Boarding & Royal Welcome", "meals": "Dinner Included",
         "paragraphs": [
             "<strong>Afternoon:</strong> Registration at Delhi Safdarjung Station, welcome drink, garland greeting.",
             "<strong>Evening:</strong> Board Maharajas' Express and meet your butler. Dinner on board as the train journeys to Agra."
         ],
         "overnight": "Overnight aboard train at Agra"},
        {"day": 2, "title": "Agra – Sunrise Taj Mahal & Agra Fort", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Sunrise at the Taj Mahal, champagne breakfast at Taj Khema.",
             "<strong>Afternoon:</strong> Tour of Agra Fort. Train departs for Sawai Madhopur."
         ],
         "overnight": "Overnight aboard train at Sawai Madhopur"},
        {"day": 3, "title": "Ranthambore & Jaipur – Tiger Safari & Palace Dinner", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Wildlife game drive in Ranthambore Tiger Reserve.",
             "<strong>Afternoon:</strong> Amber Fort excursion in Jaipur followed by a gala royal dinner at a heritage palace hotel."
         ],
         "overnight": "Overnight aboard train to Bikaner"},
        {"day": 4, "title": "Bikaner – Junagarh & Desert Dunes Barbecue", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Explore Junagarh Fort in Bikaner.",
             "<strong>Evening:</strong> Camel cart procession into Thar Desert dunes with folk dance performance and barbecue dinner under the stars."
         ],
         "overnight": "Overnight aboard train to Jodhpur"},
        {"day": 5, "title": "Jodhpur – Mehrangarh Fort & Royal Dinner", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Mehrangarh Fort exploration and Jaswant Thada.",
             "<strong>Evening:</strong> Royal cocktail and dinner at Hanwant Mahal overlooking illuminated Umaid Bhawan Palace."
         ],
         "overnight": "Overnight aboard train to Udaipur"},
        {"day": 6, "title": "Udaipur – Lake Pichola Boat Cruise & City Palace", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Morning:</strong> Private boat cruise across Lake Pichola and City Palace tour.",
             "<strong>Afternoon:</strong> Royal lunch at Fateh Prakash Palace. Farewell dinner on board."
         ],
         "overnight": "Overnight aboard train to Mumbai"},
        {"day": 7, "title": "Mumbai – Deboarding at CSMT", "meals": "Breakfast Included",
         "paragraphs": [
             "<strong>Morning:</strong> Farewell breakfast as the train arrives at Mumbai CSMT (approx 08:30 hrs).",
             "<strong>Afternoon:</strong> Disembark with unforgettable memories. KoiKoi private transfers to hotel or airport."
         ],
         "overnight": "Tour Concludes in Mumbai · Hotel & Airport Extensions"}
    ]

    me_splendour_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 3 · 6 Nights / 7 Days",
        name="The Indian Splendour",
        duration="6 Nights / 7 Days",
        title="The Indian Splendour (Delhi to Mumbai · 7D/6N)",
        route="Delhi → Agra → Ranthambore → Jaipur → Bikaner → Jodhpur → Udaipur → Mumbai",
        origin="Delhi (Safdarjung Station)",
        destination="Mumbai (CSMT Station)",
        destinations_count="8 Royal Destinations",
        starting_price="$8,400 USD / ₹8,19,000 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/maharajas-express/hero.jpg", "title": "Maharajas' Express Train"},
            {"src": "/images/luxury-trains/maharajas-express/dining-pink.jpg", "title": "Rang Mahal Restaurant"},
            {"src": "/images/luxury-trains/maharajas-express/suite.jpg", "title": "Royal Suite"}
        ],
        highlights=[
            "Sunrise viewing of the eternal Taj Mahal in Agra",
            "Wild tiger tracking safari in Ranthambore National Park",
            "Amber Fort jeep ascent & City Palace in Jaipur",
            "Junagarh Fort & Thar desert dunes sundowner barbecue in Bikaner",
            "Mehrangarh Fort exploration and royal gala dinner in Jodhpur",
            "Lake Pichola boat ride & City Palace in Udaipur",
            "Grand arrival celebration at Mumbai CSMT terminus"
        ],
        overview="The classic reverse royal tour from Delhi across Agra, Ranthambore, Jaipur, Bikaner sand dunes, Mehrangarh Fort, Lake Pichola, culminating in Mumbai. Seven unforgettable days capturing the grandeur of north and western India in absolute 5-star comfort.",
        days_data=me_splendour_days,
        departures_data=me_splendour_departures,
        price_data=me_splendour_prices,
        faqs_data=me_splendour_faqs
    )

    write_page(f"{base_dir}/maharajas-express/the-indian-splendour/index.html", 
               "The Indian Splendour Itinerary (Delhi to Mumbai · 7D/6N) | Maharajas' Express | KoiKoi Travel",
               "Day-by-day itinerary for The Indian Splendour journey aboard Maharajas' Express: Delhi, Agra, Ranthambore, Jaipur, Bikaner, Jodhpur, Udaipur, Mumbai.",
               me_splendour_html, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # 4. Treasures of India (Delhi to Delhi · 3N/4D)
    me_treasures_departures = [
        ("October 2026", "25 Oct 2026 (Sunday)"),
        ("November 2026", "22 Nov 2026 (Sunday)"),
        ("December 2026", "20 Dec 2026 (Sunday)"),
        ("January 2027", "17 Jan 2027 (Sunday)"),
        ("February 2027", "14 Feb 2027 (Sunday)"),
        ("March 2027", "14 Mar 2027 (Sunday)"),
    ]
    me_treasures_prices = {
        "usd": {"deluxe_twin": "$5,300", "deluxe_single": "$4,000", "junior_twin": "$5,700", "junior_single": "$5,200", "suite_twin": "$8,600", "suite_single": "$8,600", "presidential": "$14,600"},
        "inr": {"deluxe_twin": "₹5,16,750", "deluxe_single": "₹3,90,000", "junior_twin": "₹5,55,750", "junior_single": "₹5,07,000", "suite_twin": "₹8,38,500", "suite_single": "₹8,38,500", "presidential": "₹14,23,500"}
    }
    me_treasures_faqs = [
        {"q": "Who is the Treasures of India 4-day tour designed for?",
         "a": "It is crafted for travelers who want to experience India's famous Golden Triangle (Delhi, Agra Taj Mahal, Jaipur) plus a wild tiger safari in Ranthambore over a compact 4-day royal weekend."},
        {"q": "Is the tiger safari included in this short 4-day tour?",
         "a": "Yes, an early morning open-top jeep safari in Ranthambore Tiger Reserve on Day 3 is fully included with forest permits and naturalists."},
        {"q": "Where does this tour start and conclude?",
         "a": "Round-trip from Safdarjung Railway Station, New Delhi. The train returns to Delhi on Day 4 at approximately 12:30 PM."},
        {"q": "What is included in the ticket fare?",
         "a": "3 nights of luxury accommodation on board, all meals, house wines/beers, guided tours of Taj Mahal, Agra Fort, Fatehpur Sikri, and Amber Fort, Ranthambore game drive, monument entry tickets, and 24/7 dedicated butler service."},
        {"q": "How far in advance should I book?",
         "a": "Because of high demand for this compact weekend circuit, cabins often book out several months ahead. We recommend booking 3 to 6 months in advance with a 25% deposit."}
    ]

    me_treasures_days = [
        {"day": 1, "title": "Delhi to Agra – Agra Fort", "meals": "Lunch & Dinner Included",
         "paragraphs": [
             "<strong>Morning:</strong> Boarding and royal welcome at Safdarjung Railway Station, Delhi.",
             "<strong>Afternoon:</strong> Arrive in Agra and visit the massive red sandstone Agra Fort. Welcome dinner on board."
         ],
         "overnight": "Overnight aboard train at Agra"},
        {"day": 2, "title": "Agra to Ranthambore – Sunrise Taj Mahal & Fatehpur Sikri", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Sunrise visit to the Taj Mahal followed by champagne breakfast at Taj Khema.",
             "<strong>Afternoon:</strong> Guided tour of Emperor Akbar's Fatehpur Sikri. Train departs for Ranthambore."
         ],
         "overnight": "Overnight aboard train at Sawai Madhopur"},
        {"day": 3, "title": "Ranthambore to Jaipur – Tiger Safari & Amber Fort", "meals": "Breakfast, Lunch & Dinner",
         "paragraphs": [
             "<strong>Early Morning:</strong> Open-top jeep safari in Ranthambore National Park in search of Bengal tigers.",
             "<strong>Afternoon:</strong> Amber Fort excursion in Jaipur, followed by a royal dinner at a heritage palace venue."
         ],
         "overnight": "Overnight aboard train returning to Delhi"},
        {"day": 4, "title": "Jaipur to Delhi – Farewell Breakfast & Deboarding", "meals": "Breakfast Included",
         "paragraphs": [
             "<strong>Morning:</strong> Breakfast on board as the train returns to Delhi Safdarjung Station (approx 12:30 hrs).",
             "<strong>Afternoon:</strong> Disembark with royal memories. Seamless airport or hotel transfers arranged."
         ],
         "overnight": "Tour Concludes in Delhi · Airport Transfers"}
    ]

    me_treasures_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 4 · 3 Nights / 4 Days",
        name="Treasures of India",
        duration="3 Nights / 4 Days",
        title="Treasures of India Itinerary (Delhi to Delhi · 4D/3N)",
        route="Delhi → Agra → Ranthambore → Jaipur → Delhi",
        origin="Delhi (Safdarjung Station)",
        destination="Delhi (Safdarjung Station)",
        destinations_count="4 Iconic Destinations",
        starting_price="$5,300 USD / ₹5,16,750 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/maharajas-express/hero.jpg", "title": "Maharajas' Express Train"},
            {"src": "/images/luxury-trains/maharajas-express/deluxe-cabin.jpg", "title": "Deluxe Double Cabin"},
            {"src": "/images/luxury-trains/maharajas-express/dining-pink.jpg", "title": "Mayur Mahal Dining"}
        ],
        highlights=[
            "Delhi Safdarjung Station grand red-carpet welcome",
            "Sunrise tour of the Taj Mahal & Agra Fort exploration",
            "Historic Mughal capital of Fatehpur Sikri",
            "Early morning tiger safari in Ranthambore National Park",
            "Amber Fort and City Palace exploration in Pink City Jaipur",
            "Royal farewell dinner and cultural folk performances"
        ],
        overview="The ultimate 4-day royal weekend tour covering India's world-famous Golden Triangle (Delhi, Agra, Jaipur) with an exhilarating tiger safari in Ranthambore. Designed for busy travelers seeking maximum royal luxury in minimum time.",
        days_data=me_treasures_days,
        departures_data=me_treasures_departures,
        price_data=me_treasures_prices,
        faqs_data=me_treasures_faqs
    )

    write_page(f"{base_dir}/maharajas-express/treasures-of-india/index.html", 
               "Treasures of India Itinerary (Golden Triangle · 4D/3N) | Maharajas' Express | KoiKoi Travel",
               "Day-by-day itinerary for Treasures of India journey aboard Maharajas' Express: Delhi, Agra Taj Mahal, Ranthambore, Jaipur, Delhi.",
               me_treasures_html, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # Master Itinerary Page (/maharajas-express/itinerary/index.html)
    me_master_itinerary_html = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:24px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">All Itineraries</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express 4 Signature Journeys
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Choose any of the 4 royal circuits below to view detailed itineraries, route maps, and day-by-day breakdown.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    {get_me_cards_component()}
    {inc_exc_snippet}
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/itinerary/index.html", 
               "Maharajas' Express 4 Royal Journeys & Itineraries | KoiKoi Travel",
               "Explore the 4 signature itineraries of Maharajas' Express luxury train: The Heritage of India, The Indian Panorama, The Indian Splendour, and Treasures of India.",
               me_master_itinerary_html, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # ================= 3. SEPARATE DEPARTURES PAGE =================
    me_departures_page_html = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:24px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Departures</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Scheduled Departure Dates (2026–2027)
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Official schedules for Maharajas' Express across all 4 journeys. The train operates between September and April when the Indian winter climate is at its most pleasant.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    {get_me_departures_table_component()}
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/departures/index.html", 
               "Maharajas' Express Departure Dates 2026-2027 | Official Calendar | KoiKoi Travel",
               "Official scheduled departure dates for Maharajas' Express luxury train across all 4 circuits for season 2026-27.",
               me_departures_page_html, active_train="maharajas-express", active_tab="departures", base_path=base_path)

    # ================= 4. SEPARATE PRICE PAGE =================
    me_price_page_html = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:24px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Price & Fare</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Ticket Prices & Cabin Tariffs (2026–2027)
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Official cabin tariffs for all four journeys of Maharajas' Express in USD and Indian Rupees (INR).
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    {get_me_price_tables_component()}
    {inc_exc_snippet}
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/price/index.html", 
               "Maharajas' Express Ticket Prices & Fare Tariffs 2026-2027 | KoiKoi Travel",
               "Official 2026-2027 tariffs for Maharajas' Express across Deluxe Cabin, Junior Suite, Suite, and Presidential Suite in USD and INR.",
               me_price_page_html, active_train="maharajas-express", active_tab="price", base_path=base_path)

    # ================= 5. SEPARATE PHOTO GALLERY PAGE =================
    me_gallery_page_html = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:24px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Photo Gallery</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Photo Gallery
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Explore high-resolution photographs of Maharajas' Express royal train: the carriages, suites, dining halls, lounge bars, and destination excursions.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div class="gallery-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
      <div class="g-item" style="height:260px"><img src="/images/luxury-trains/maharajas-express/hero.jpg" alt="Maharajas' Express Royal Train Exterior"><span>Royal Train Exterior</span></div>
      <div class="g-item" style="height:260px"><img src="/images/luxury-trains/maharajas-express/dining-pink.jpg" alt="Rang Mahal Fine Dining Restaurant"><span>Rang Mahal Dining Restaurant</span></div>
      <div class="g-item" style="height:260px"><img src="/images/luxury-trains/maharajas-express/suite.jpg" alt="Executive Suite Bedroom"><span>Royal Suite Bedroom</span></div>
      <div class="g-item" style="height:260px"><img src="/images/luxury-trains/maharajas-express/deluxe-cabin.jpg" alt="Deluxe Double Cabin"><span>Deluxe Twin/Double Cabin</span></div>
      <div class="g-item" style="height:260px"><img src="/images/luxury-trains/maharajas-express/suite.jpg" alt="Executive Suite Salon"><span>Executive Suite Living Room</span></div>
      <div class="g-item" style="height:260px"><img src="/images/luxury-trains/maharajas-express/hero.jpg" alt="Presidential Suite Carriage"><span>Navratna Presidential Suite</span></div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/photo-gallery/index.html", 
               "Maharajas' Express Photo Gallery | Interiors & Cabins | KoiKoi Travel",
               "High resolution photos of Maharajas' Express luxury train: restaurants Rang Mahal & Mayur Mahal, lounge bars, suites and royal excursions.",
               me_gallery_page_html, active_train="maharajas-express", active_tab="photo-gallery", base_path=base_path)

    # ================= 6. SEPARATE CABINS PAGE =================
    me_cabins_page_html = f"""
<div style="background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:24px 0">
  <div class="wrap">
    <div class="koikoi-breadcrumb">
      <a href="{base_path}">Luxury Trains</a>
      <span>›</span>
      <a href="{base_path}/maharajas-express">Maharajas' Express</a>
      <span>›</span>
      <span style="color:#0f172a;font-weight:600">Cabins & Suites</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      Maharajas' Express Cabins & Presidential Suite
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Discover the 4 palatial cabin categories: Deluxe Cabin, Junior Suite, Suite, and the full-carriage Navratna Presidential Suite.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px" class="cabin-2x2-grid">
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/deluxe-cabin.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">112 sq. ft. · 20 Cabins</span>
          <h3>Deluxe Cabin</h3>
          <p>Twin or Double bed. En-suite bathroom with shower stall, electronic safe, panoramic picture window, and dedicated butler.</p>
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
          <p>Features seating lounge area, writing desk, large picture windows, and round-the-clock personal valet assistance.</p>
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
          <p>Features a spacious private living salon, master bedroom, complimentary stocked minibar, and private luxury car for tours.</p>
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
          <p>The only train suite in the world occupying an entire carriage! 2 master bedrooms, 2 full bathrooms with soaking bathtub, living room, and private car.</p>
          <ul class="cabin-features">
            <li>Occupies an entire 23-meter train coach (448 sq.ft)</li>
            <li>2 Master Bedrooms & private full-size soaking bathtub</li>
            <li>Private luxury chauffeur car & dedicated royal butler team</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/cabins/index.html", 
               "Maharajas' Express Cabins & Presidential Suite Layout | KoiKoi Travel",
               "Explore Deluxe Cabins, Junior Suites, Executive Suites, and the world-famous 448 sq.ft Navratna Presidential Suite aboard Maharajas' Express.",
               me_cabins_page_html, active_train="maharajas-express", active_tab="cabins", base_path=base_path)

# ================= 4. GOLDEN CHARIOT SUBPAGES =================
    gc_data = {
        "slug": "golden-chariot",
        "name": "Golden Chariot",
        "tagline": "Many Worlds. One Journey.",
        "banner": "/images/luxury-trains/golden-chariot/hero.jpg",
    }

    def get_gc_cards_component():
        return f"""
<div class="koikoi-card-grid" style="margin-top:24px">
  <!-- Card 1: Pride of Karnataka -->
  <div class="koikoi-tour-card" id="card-pride">
    <a href="{base_path}/golden-chariot/pride-of-karnataka" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/golden-chariot/sitting-room.jpg" alt="Pride of Karnataka - The Golden Chariot Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/golden-chariot/pride-of-karnataka" class="koikoi-card-title">
        6 Days - Pride of Karnataka Luxury Rail Tour
      </a>
      <div class="koikoi-card-route">
        Bengaluru · Bandipur · Mysore · Halebidu · Chikmagalur · Hampi · Goa · Bengaluru
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Bandipur National Park Morning Open-Jeep Safari</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Illuminated Mysore Palace & Hoysala Temples of Halebidu</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>UNESCO World Heritage Hampi Ruins & Old Goa Sunset Beach</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20The%20Golden%20Chariot%20-%20Pride%20of%20Karnataka%20(6%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/golden-chariot/pride-of-karnataka">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 2: Jewels of South -->
  <div class="koikoi-tour-card" id="card-jewels">
    <a href="{base_path}/golden-chariot/jewels-of-south" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/golden-chariot/restaurant-1.jpg" alt="Jewels of South - The Golden Chariot Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/golden-chariot/jewels-of-south" class="koikoi-card-title">
        6 Days - Jewels of South Heritage Rail Tour
      </a>
      <div class="koikoi-card-route">
        Bengaluru · Mysore · Mahabalipuram · Thanjavur · Chettinad · Cochin · Kumarakom · Bengaluru
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>11th-Century Chola Architecture at Brihadisvara Temple, Thanjavur</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Chettinad Heritage Mansions & Authentic Regional Dining</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Kumarakom Traditional Houseboat Cruise along Kerala Backwaters</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20The%20Golden%20Chariot%20-%20Jewels%20of%20South%20(6%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/golden-chariot/jewels-of-south">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 3: Glimpses of Karnataka -->
  <div class="koikoi-tour-card" id="card-glimpses">
    <a href="{base_path}/golden-chariot/glimpses-of-karnataka" class="koikoi-card-img-wrap">
      <img src="/images/luxury-trains/golden-chariot/double-bed.jpg" alt="Glimpses of Karnataka - The Golden Chariot Tour Package | KoiKoi Travel">
    </a>
    <div class="koikoi-card-body">
      <a href="{base_path}/golden-chariot/glimpses-of-karnataka" class="koikoi-card-title">
        4 Days - Glimpses of Karnataka Weekend Rail Tour
      </a>
      <div class="koikoi-card-route">
        Bengaluru · Bandipur · Mysore · Hampi · Bengaluru
      </div>
      <div class="koikoi-card-highlights">
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Compact 4-Day Royal Weekend Combining Wildlife & Imperial History</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dawn Wildlife Safari inside Bandipur Tiger Reserve</span>
        </div>
        <div class="koikoi-card-hl-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Guided Heritage Walk through Hampi's Stone Chariot & Vitthala Temple</span>
        </div>
      </div>
      <div class="koikoi-card-footer">
        <div class="koikoi-card-amenities">
          Royal Cabins · Onboard Dining · Butler Service · Guided Excursions
        </div>
        <div class="koikoi-card-btn-row">
          <a class="koikoi-btn-quote" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20details%20for%20The%20Golden%20Chariot%20-%20Glimpses%20of%20Karnataka%20(4%20Days)." target="_blank" rel="noopener">
            Get a quote
          </a>
          <a class="koikoi-btn-details" href="{base_path}/golden-chariot/glimpses-of-karnataka">
            Details
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
"""

    def get_gc_departures_table_component():
        return f"""
<div class="table-wrap" style="box-shadow:0 8px 30px rgba(15,23,42,0.06);border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;background:#ffffff">
  <table style="width:100%;border-collapse:collapse;text-align:center;font-size:14px">
    <thead>
      <tr style="background:#0f172a;color:#ffffff;font-family:'Outfit',sans-serif">
        <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15);font-size:14.5px;text-align:left">Season 2026-27</th>
        <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15)">
          <div style="font-size:14px;font-weight:700">Pride of Karnataka</div>
          <div style="font-size:11px;opacity:0.85;font-weight:500">5 Nights / 6 Days (Saturday)</div>
        </th>
        <th style="padding:16px 14px;border-right:1px solid rgba(255,255,255,0.15)">
          <div style="font-size:14px;font-weight:700">Jewels of South</div>
          <div style="font-size:11px;opacity:0.85;font-weight:500">5 Nights / 6 Days (Saturday)</div>
        </th>
        <th style="padding:16px 14px">
          <div style="font-size:14px;font-weight:700">Glimpses of Karnataka</div>
          <div style="font-size:11px;opacity:0.85;font-weight:500">3 Nights / 4 Days (Saturday)</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:14px 18px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #f1f5f9;background:#f8fafc">October 2026</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">24 Oct 2026</td>
        <td style="padding:14px;color:#94a3b8;border-right:1px solid #f1f5f9">—</td>
        <td style="padding:14px;color:#0f172a;font-weight:600">31 Oct 2026</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;background:#fafbfc">
        <td style="padding:14px 18px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #f1f5f9;background:#f8fafc">November 2026</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">14 Nov 2026</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">28 Nov 2026</td>
        <td style="padding:14px;color:#94a3b8">—</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:14px 18px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #f1f5f9;background:#f8fafc">December 2026</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">26 Dec 2026</td>
        <td style="padding:14px;color:#94a3b8;border-right:1px solid #f1f5f9">—</td>
        <td style="padding:14px;color:#0f172a;font-weight:600">19 Dec 2026</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;background:#fafbfc">
        <td style="padding:14px 18px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #f1f5f9;background:#f8fafc">January 2027</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">30 Jan 2027</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">02 Jan 2027</td>
        <td style="padding:14px;color:#94a3b8">—</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:14px 18px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #f1f5f9;background:#f8fafc">February 2027</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">27 Feb 2027</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">20 Feb 2027</td>
        <td style="padding:14px;color:#0f172a;font-weight:600">06 Feb 2027</td>
      </tr>
      <tr style="background:#fafbfc">
        <td style="padding:14px 18px;font-weight:700;color:#0f172a;text-align:left;border-right:1px solid #f1f5f9;background:#f8fafc">March 2027</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">13 Mar 2027</td>
        <td style="padding:14px;color:#0f172a;border-right:1px solid #f1f5f9;font-weight:600">27 Mar 2027</td>
        <td style="padding:14px;color:#94a3b8">—</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-top:14px;padding:12px 18px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
  <div style="font-size:12.5px;color:#64748b">
    • All departures originate from Yesvantpur Railway Station, Bengaluru on scheduled Saturdays. Check-in starts at 08:30 AM.
  </div>
  <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20seat%20availability%20for%20The%20Golden%20Chariot." target="_blank" rel="noopener" style="color:#2E8B8B;font-weight:700;font-size:13px;text-decoration:none">
    Inquire Seat Availability &rarr;
  </a>
</div>
"""

    def get_gc_prices_table_component():
        return f"""
<div class="table-wrap" style="box-shadow:0 8px 30px rgba(15,23,42,0.06);border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;background:#ffffff">
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <thead>
      <tr style="background:#0f172a;color:#ffffff;font-family:'Outfit',sans-serif">
        <th style="padding:16px;text-align:left;border-right:1px solid rgba(255,255,255,0.15)">Circuit &amp; Route</th>
        <th style="padding:16px;text-align:center;border-right:1px solid rgba(255,255,255,0.15)">Duration</th>
        <th style="padding:16px;text-align:center;border-right:1px solid rgba(255,255,255,0.15)">Deluxe Twin/Double (Per Person)</th>
        <th style="padding:16px;text-align:center">Single Supplement</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:18px;border-right:1px solid #f1f5f9">
          <div style="font-weight:700;color:#0f172a;font-size:15px">Pride of Karnataka</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Bengaluru › Bandipur › Mysore › Halebidu › Chikmagalur › Hampi › Goa › Bengaluru</div>
        </td>
        <td style="padding:18px;text-align:center;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">5N / 6D</td>
        <td style="padding:18px;text-align:center;border-right:1px solid #f1f5f9">
          <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;color:#d96b27">$5,000 USD</div>
          <div style="font-size:12px;color:#64748b;font-weight:600">approx. ₹4,87,500 INR</div>
        </td>
        <td style="padding:18px;text-align:center">
          <div style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#0f172a">$3,800 USD</div>
          <div style="font-size:12px;color:#64748b;font-weight:600">approx. ₹3,70,500 INR</div>
        </td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;background:#fafbfc">
        <td style="padding:18px;border-right:1px solid #f1f5f9">
          <div style="font-weight:700;color:#0f172a;font-size:15px">Jewels of South</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Bengaluru › Mysore › Mahabalipuram › Thanjavur › Chettinad › Cochin › Kumarakom › Bengaluru</div>
        </td>
        <td style="padding:18px;text-align:center;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">5N / 6D</td>
        <td style="padding:18px;text-align:center;border-right:1px solid #f1f5f9">
          <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;color:#d96b27">$5,000 USD</div>
          <div style="font-size:12px;color:#64748b;font-weight:600">approx. ₹4,87,500 INR</div>
        </td>
        <td style="padding:18px;text-align:center">
          <div style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#0f172a">$3,800 USD</div>
          <div style="font-size:12px;color:#64748b;font-weight:600">approx. ₹3,70,500 INR</div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px;border-right:1px solid #f1f5f9">
          <div style="font-weight:700;color:#0f172a;font-size:15px">Glimpses of Karnataka</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Bengaluru › Bandipur › Mysore › Hampi › Bengaluru</div>
        </td>
        <td style="padding:18px;text-align:center;font-weight:600;color:#0f172a;border-right:1px solid #f1f5f9">3N / 4D</td>
        <td style="padding:18px;text-align:center;border-right:1px solid #f1f5f9">
          <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;color:#d96b27">$3,400 USD</div>
          <div style="font-size:12px;color:#64748b;font-weight:600">approx. ₹3,31,500 INR</div>
        </td>
        <td style="padding:18px;text-align:center">
          <div style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#0f172a">$2,600 USD</div>
          <div style="font-size:12px;color:#64748b;font-weight:600">approx. ₹2,53,500 INR</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-top:14px;padding:12px 18px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
  <div style="font-size:12.5px;color:#64748b">
    • 5% Govt. GST extra · Includes all onboard meals, deluxe cabin, house beverages, guided excursions, monument entries &amp; Bandipur safari · 20% advance deposit to reserve
  </div>
  <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20please%20share%20detailed%20fare%20and%20booking%20policy%20for%20The%20Golden%20Chariot." target="_blank" rel="noopener" style="color:#2E8B8B;font-weight:700;font-size:13px;text-decoration:none">
    Request Official Quote &rarr;
  </a>
</div>
"""

    def get_gc_video_spotlight_component():
        return f"""
<div style="border-radius:24px;overflow:hidden;background:#262463;border:1px solid rgba(255,255,255,0.08);box-shadow:0 16px 48px rgba(15,23,42,0.18);margin-top:20px">
  <div style="display:grid;grid-template-columns:1fr 1.25fr;min-height:460px" class="video-split-grid">
    <div style="padding:48px 44px;display:flex;flex-direction:column;justify-content:center;background:#262463;color:#ffffff">
      <div style="margin-bottom:20px">
        <img src="/images/luxury-trains/golden-chariot/logo.png" alt="The Golden Chariot Official Logo" style="max-height:85px;width:auto;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.3))">
      </div>
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(26px,2.8vw,36px);font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 16px">
        The Golden Chariot
      </h2>
      <p style="color:#cbd5e1;font-size:14.5px;line-height:1.75;margin:0 0 14px">
        Named after the legendary Stone Chariot in Hampi, this purple-and-gold train is South India's only luxury train. Operated jointly by Karnataka Tourism (KSTDC) and IRCTC, it offers an authentic, comfortable way to experience the South's royal dynasties, temples, and wilderness.
      </p>
      <p style="color:#cbd5e1;font-size:14.5px;line-height:1.75;margin:0 0 24px">
        Connecting Bengaluru, Bandipur Tiger Reserve, Mysore palaces, Hampi, Badami caves, Goa beaches, and the backwaters of Kerala.
      </p>
      <div>
        <a href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20am%20interested%20in%20The%20Golden%20Chariot.%20Please%20share%20availability%20and%20journey%20details." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#F8904D;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:12px 26px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(248,144,77,0.4)">
          Inquire on WhatsApp &rarr;
        </a>
      </div>
    </div>
    <div style="position:relative;background:#000;min-height:360px" id="gcVideoBox">
      <div class="video-facade" onclick="loadTrainVideo('gcVideoBox', 'd1QWZK3sgKU')" style="position:absolute;inset:0;background:url('https://img.youtube.com/vi/d1QWZK3sgKU/maxresdefault.jpg') center/cover no-repeat;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <div style="width:72px;height:72px;border-radius:50%;background:#F8904D;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 10px rgba(248,144,77,0.3);transition:transform .3s">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style="margin-left:4px"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>
    </div>
  </div>
</div>
"""

    # Golden Chariot Overview Main Page
    gc_overview = f"""
<!-- Top Full-View Clean Hero Banner (NO TEXT ON BANNER) -->
<div style="position:relative;height:480px;background:url('/images/luxury-trains/golden-chariot/hero.jpg') center/cover no-repeat;overflow:hidden">
</div>

<!-- Clean Editorial Title & Journeys Intro Section (SINGLE CLEAN HEADING & TEXT) -->
<div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:40px 0 36px">
  <div class="wrap">
    <div class="koikoi-breadcrumb" style="margin-bottom:14px">
      <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <span style="color:#0f172a;font-weight:600">The Golden Chariot</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;border:1px solid rgba(248,144,77,0.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:5px 14px;border-radius:999px">
        SOUTH INDIA'S LUXURY TRAIN
      </span>
      <span style="color:#64748b;font-size:13.5px;font-weight:600">3 Signature Circuits · 18 Carriages · Starts Bengaluru</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(30px,4.2vw,48px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 14px;max-width:1100px">
      The Golden Chariot Train
    </h1>
    <p style="color:#475569;font-size:clamp(15px,1.25vw,17.5px);max-width:1050px;line-height:1.75;margin:0">
      Named after the iconic Stone Chariot in Hampi, The Golden Chariot is South India's only luxury train, operated jointly by Karnataka Tourism (KSTDC) and IRCTC. Starting from Bengaluru, the purple-and-gold train connects the royal heritage of Mysore, dawn wildlife safaris in Bandipur, the 14th-century Vijayanagara ruins of Hampi, and the Arabian Sea beaches of Goa across 3 hand-crafted circuits.
    </p>
  </div>
</div>

<!-- Main Body Section (FULL WIDTH - NO SIDEBAR - NO INCLUSIONS/EXCLUSIONS ON INDEX) -->
<section style="padding:48px 0 80px;background:#fcfbf9">
  <div class="wrap">
    
    <!-- 1. The 3 Signature Journeys -->
    <div id="journeys" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Southern Circuits</div>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Signature Journeys
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Select a southern circuit below to explore complete day-by-day itineraries and departure dates.
        </p>
      </div>
      {get_gc_cards_component()}
    </div>

    <!-- 2. Departure Dates (Official 2026-27 Schedules) -->
    <div id="departures" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:20px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Schedules</div>
        <h2 style="font-size:clamp(26px,3vw,36px);font-weight:800;color:#0f172a;text-align:left">Departure Dates (2026 – 2027)</h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Following are the scheduled Saturday departures of The Golden Chariot from Bengaluru (Yesvantpur Railway Station).
        </p>
      </div>
      {get_gc_departures_table_component()}
    </div>

    <!-- 3. Ticket Prices & Tariffs -->
    <div id="price" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:20px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Official Tariffs</div>
        <h2 style="font-size:clamp(26px,3vw,36px);font-weight:800;color:#0f172a;text-align:left">Ticket Prices (Season 2026 – 2027)</h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Official published tariffs per person in USD and INR for Deluxe Cabins. 5% Govt. GST extra.
        </p>
      </div>
      {get_gc_prices_table_component()}
    </div>

    <!-- 4. Video Spotlight Split Box -->
    <div id="experience" style="margin-bottom:64px">
      {get_gc_video_spotlight_component()}
    </div>

    <!-- 5. Onboard Carriages & Facilities -->
    <div id="facilities" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Life On Board</div>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          Royal Carriages &amp; Amenities
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          18 guest carriages named after legendary Karnataka ruling dynasties, with five-star hospitality throughout.
        </p>
      </div>

      <div class="grid-4">
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🛏️</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">11 Dynasty Guest Coaches</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">44 Deluxe Cabins named after ancient dynasties (Kadamba, Hoysala, Chalukya...) with private en-suite bathroom, Wi-Fi, and 24/7 attendant.</p>
        </div>
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🍽️</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">Ruchi &amp; Nalapaka Dining</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Two ornate fine-dining restaurant cars serving authentic South Indian regional delicacies, fresh coastal fare, and multi-course international grills.</p>
        </div>
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🍸</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">Madira Lounge Bar</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Regal lounge bar inspired by Mysore Palace's Hall of Mirrors, serving curated whiskeys, fine wines, and cocktails in plush armchairs.</p>
        </div>
        <div class="card" style="padding:28px 24px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div style="font-size:28px;margin-bottom:12px">🌿</div>
          <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;color:#0f172a;margin-bottom:8px">Arogya Spa &amp; Fitness</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">Traditional Kerala Ayurvedic massage therapy suites and a modern gym on wheels to refresh and relax between royal heritage destinations.</p>
        </div>
      </div>
    </div>

    <!-- 6. Simple Booking Steps -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">How It Works</div>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Simple Steps to Book
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          No complicated forms or pressure. Just direct travel advice from our dedicated team.
        </p>
      </div>

      <div class="step-grid">
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">01</div>
          <h3 style="color:#0f172a">Share Your Preferred Dates</h3>
          <p style="color:#64748b">Tell us your dates, group size, and whether you prefer the 6-day grand circuit or the 4-day royal weekend.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">02</div>
          <h3 style="color:#0f172a">Receive Official Quote &amp; Cabin Availability</h3>
          <p style="color:#64748b">We confirm live cabin availability directly with IRCTC/KSTDC and send you a clear, itemized quote on WhatsApp within hours.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">03</div>
          <h3 style="color:#0f172a">Reserve with 20% Deposit</h3>
          <p style="color:#64748b">Lock your cabin with a simple 20% advance payment. The balance is due 30 days before your departure.</p>
        </div>
      </div>
    </div>

    <!-- 7. FAQ -->
    <div id="faq">
      <div class="sec-head center" style="margin-bottom:28px;text-align:center;max-width:850px;margin-left:auto;margin-right:auto">
        <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">HELPFUL FAQS</span>
        <h2 style="font-size:clamp(26px,3.2vw,38px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:center">
          Frequently Asked Questions · <span style="color:#F8904D">The Golden Chariot</span>
        </h2>
        <p style="max-width:860px;margin:8px auto 0;color:#64748b;font-size:15px;line-height:1.6;text-align:center">
          Everything you need to know about traveling on South India's luxury train.
        </p>
      </div>

      <div class="faq" style="background:#fff;border-radius:16px;border:1px solid #e2e8f0;padding:8px 24px;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
        <details open style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Where does The Golden Chariot depart from?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">All journeys start and end in Bengaluru at Yesvantpur Railway Station on scheduled Saturdays. Check-in begins around 08:30 AM with a traditional South Indian garland and drum welcome.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is included in the ticket fare?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Your ticket is fully all-inclusive: accommodation in an AC Deluxe Cabin with private bathroom, all meals in the dining cars, house wines/beers/spirits, guided off-train excursions in AC coaches, Bandipur wildlife safari permits, monument entrance tickets, and 24/7 butler service.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Can vegetarian, vegan, or Jain meals be arranged?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Yes, absolutely. The two onboard restaurants (Ruchi and Nalapaka) specialize in both vegetarian and non-vegetarian fare. Pure vegetarian, vegan, Jain, gluten-free, or specific dietary needs can be arranged upon advance notice.</p>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">How do I book and what is the payment schedule?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">You can reserve your cabin with an initial 20% advance deposit. The remaining 80% balance is payable 30 days prior to your departure date. We facilitate smooth booking and IRCTC confirmation without hassle.</p>
        </details>
        <details style="padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Can KoiKoi Travel add pre/post hotel stays and airport transfers?</summary>
          <p style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">Yes. We can seamlessly organize five-star hotel stays in Bengaluru before boarding or in Goa/Kochi after your train journey, along with airport transfers and private chauffeured cars.</p>
        </details>
      </div>
    </div>

  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/index.html", 
               "The Golden Chariot Luxury Train South India | Routes, Fares & Departures | KoiKoi Travel",
               "Discover The Golden Chariot luxury train: Hampi ruins, Bandipur safari, Mysore palace, Kerala backwaters and Goa beaches.",
               gc_overview, active_train="golden-chariot", active_tab="overview", base_path=base_path)

    # Golden Chariot Inclusions & Exclusions Snippet
    gc_inc_exc_snippet = f"""
<div class="inc-exc-grid" style="margin-top:32px">
  <div class="inc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="16 9 10 15 7 12"></polyline></svg>
      What's Included in Your Golden Chariot Ticket
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Luxury accommodation in air-conditioned Deluxe Cabins with private en-suite shower bathrooms</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All gourmet meals on board at Ruchi and Nalapaka fine-dining restaurant cars</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Complimentary house brands of Indian wines, beers, and spirits at Madira Lounge Bar</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All guided sightseeing excursions in deluxe air-conditioned highway coaches with English-speaking guides</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Bandipur National Park open-jeep wildlife safari and Kumarakom backwaters boat cruise</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All entrance fees to UNESCO monuments, palaces, museums, and tea/coffee plantation tours</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>24/7 dedicated carriage attendant service, bottled water, and high-speed onboard Wi-Fi</span></li>
    </ul>
  </div>
  <div class="exc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      What's Excluded
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>5% Government Goods and Services Tax (GST)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Pre and post-train 5-star hotel stays in Bengaluru, Goa, or Kochi (arranged separately by KoiKoi Travel)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>International and domestic airfare, and airport transfers</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Premium imported vintage wines and spirits (available on chargeable basis)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Ayurvedic spa therapies at Arogya Spa, laundry service, and commercial camera video fees</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Gratuities and tips for train staff and off-train local guides (at guest discretion)</span></li>
    </ul>
  </div>
</div>
"""

    # ================= 1. PRIDE OF KARNATAKA (5N/6D) =================
    gc_pride_days = [
        {
            "day": 1,
            "title": "Bengaluru – Welcome Ceremony & Boarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Afternoon: Arrive at Yeshwantpur Railway Station (YPR) in Bengaluru by 14:00 hrs for smooth check-in formalities and luggage handling. Experience a traditional South Indian reception with fragrant jasmine garlands, rhythmic chande drum beats, and welcome refreshments at the lounge.",
                "Evening: Board The Golden Chariot and meet your personal carriage attendant. Settle into your air-conditioned Deluxe Cabin as the train departs Bengaluru and journeys southward into Karnataka's heritage heartland. Savor an inaugural multi-course dinner in the Ruchi and Nalapaka restaurant cars."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Nanjangud",
            "meals": "Dinner Included"
        },
        {
            "day": 2,
            "title": "Bandipur National Park & Mysore – Tiger Reserve Safari & Amba Vilas Palace",
            "paragraphs": [
                "Early Morning: Wake up early for hot tea and morning biscuits before setting off around 06:00 hrs for an open-top gypsy safari into Bandipur National Park. Keep your camera ready to spot wild herds of Asian elephants, spotted deer, Indian gaur, and if you are fortunate, a Bengal tiger or leopard in the dry deciduous teak forests.",
                "Afternoon: Return to the train for a hearty breakfast as it proceeds toward Mysore. Savor lunch on board, then step out to visit the grand Mysore Palace (Amba Vilas). Walk through the Durbar Hall with its stained-glass ceilings, carved rosewood doors, and solid silver thrones.",
                "Evening: Visit the island fortress town of Srirangapatna, once the seat of Tipu Sultan. Return to the train in time for drinks at the Madira Lounge Bar and a royal dinner prepared by master chefs."
            ],
            "overnight": "Overnight aboard The Golden Chariot parked at Mysore",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 3,
            "title": "Halebidu & Chikmagalur – Hoysala Temples & Coffee Plantation Walk",
            "paragraphs": [
                "Morning: Enjoy breakfast on board as the train arrives at Banavar / Hassan. Depart by air-conditioned coach to the 12th-century temple town of Halebidu. Marvel at the intricate star-shaped layout of Hoysaleswara Temple, renowned worldwide for its chloritic schist stone carvings of dancing celestial apsaras, charging elephants, and epic legends.",
                "Afternoon: Continue toward Chikmagalur, the historic birthplace of coffee in India. Stroll through shade-grown Arabica and Robusta estates under the canopy of towering silver oak trees. Learn the art of coffee bean harvesting and roasting, followed by a freshly brewed tasting session and high tea at a serene plantation retreat.",
                "Evening: Return to the train at sunset. Unwind with an Ayurvedic foot therapy at the Arogya Spa or enjoy South Indian delicacies as the train heads north toward Hampi."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Hosapete",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 4,
            "title": "Hampi – The Lost Vijayanagara Empire & Vittala Stone Chariot",
            "paragraphs": [
                "Morning: Wake up at Hosapete railway station, the gateway to UNESCO World Heritage site Hampi. After breakfast on board, head out to explore the boulder-strewn ruins of the 14th-century Vijayanagara Empire. Visit the towering Virupaksha Temple on the banks of the Tungabhadra River and the massive monolithic Kadalekalu Ganesha.",
                "Afternoon: Return to the train for a relaxed lunch during the heat of midday. Later in the afternoon, return to Hampi to explore the iconic Vijaya Vittala Temple complex, famous for its musical pillars and the monolithic Stone Chariot that serves as the emblem of The Golden Chariot train.",
                "Evening: Return to the train for a farewell dinner to Karnataka heritage as the train begins its westward journey across the Western Ghats into coastal Goa."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Goa",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 5,
            "title": "Goa – Old Goa Cathedrals, Spice Plantation & Farewell Gala",
            "paragraphs": [
                "Morning: Wake up to lush tropical greenery as the train pulls into Goa. After a leisurely breakfast, set out to explore the UNESCO-listed churches of Old Goa, including the 16th-century Basilica of Bom Jesus (holding the sacred relics of St. Francis Xavier) and the towering Se Cathedral.",
                "Afternoon: Visit a traditional Goan spice plantation in Ponda. Enjoy a traditional Goan buffet lunch served on fresh banana leaves, featuring local coastal specialties and coconut curries, accompanied by a guided walk through fragrant groves of vanilla, cardamom, and betel nut.",
                "Evening: Return to the train to freshen up. In the evening, enjoy a special Goan cultural music and dance performance paired with fine wine and a celebratory farewell dinner at the Madira Lounge."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Bengaluru",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 6,
            "title": "Bengaluru – Farewell & Deboarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Morning: Breakfast is served in the dining cars as The Golden Chariot glides back into Bengaluru. The train arrives at Yeshwantpur Railway Station around 08:30 hrs. Complete deboarding formalities, bid farewell to your carriage attendants and train staff, and depart with unforgettable memories of South India's royal kingdoms."
            ],
            "overnight": "",
            "meals": "Breakfast Included"
        }
    ]

    gc_pride_departures = [
        ("October 2026", "24 Oct 2026 (Saturday)"),
        ("November 2026", "14 Nov 2026 (Saturday)"),
        ("December 2026", "26 Dec 2026 (Saturday)"),
        ("January 2027", "02 Jan 2027 (Saturday), 30 Jan 2027 (Saturday)"),
        ("February 2027", "27 Feb 2027 (Saturday)"),
        ("March 2027", "13 Mar 2027 (Saturday)")
    ]

    gc_pride_prices = {
        "usd": {"deluxe_twin": "$5,000", "deluxe_single": "$3,800"},
        "inr": {"deluxe_twin": "₹4,87,500", "deluxe_single": "₹3,70,500"}
    }

    gc_pride_faqs = [
        {"q": "Where does the Pride of Karnataka journey begin and conclude?",
         "a": "The journey starts and ends at Yeshwantpur Railway Station (YPR) in Bengaluru. Guest registration opens at 14:00 hrs on scheduled Saturdays, and the train returns by 08:30 hrs on the following Thursday."},
        {"q": "Is the Bandipur National Park jungle safari suitable for seniors?",
         "a": "Yes. Guests are driven in open-top 4x4 forest department vehicles with trained naturalists. The terrain is manageable, and our dedicated carriage attendants provide warm blankets and bottled water for the early morning drive."},
        {"q": "What is the dress code for temple visits in Halebidu and Hampi?",
         "a": "Modest, comfortable cotton clothing covering shoulders and knees is recommended. Shoes must be removed before entering active temple sanctums; wearing slip-on footwear or socks is very convenient on warm stone floors."},
        {"q": "Are alcoholic beverages included during meals?",
         "a": "Yes, house brands of Indian wines, beers, and select spirits are complimentary throughout your rail journey in the dining cars and Madira Lounge Bar. Premium imported labels can be purchased separately."},
        {"q": "What deposit is needed to confirm a booking on Pride of Karnataka?",
         "a": "A 20% advance payment confirms your Deluxe Cabin reservation with IRCTC/KSTDC. The remaining 80% balance is payable 30 days before departure."}
    ]

    gc_pride_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 1 · 5 Nights / 6 Days",
        name="Pride of Karnataka",
        duration="5 Nights / 6 Days",
        title="Pride of Karnataka (Bengaluru to Bengaluru · 6D/5N)",
        route="Bengaluru → Bandipur → Mysore → Halebidu → Chikmagalur → Hampi → Goa → Bengaluru",
        origin="Bengaluru (Yeshwantpur YPR)",
        destination="Bengaluru (Yeshwantpur YPR)",
        destinations_count="7 Destinations · Karnataka & Goa",
        starting_price="$5,000 USD / ₹4,87,500 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/golden-chariot/restaurant-1.jpg", "title": "Ruchi Fine Dining Restaurant"},
            {"src": "/images/luxury-trains/golden-chariot/bar.jpg", "title": "Madira Royal Lounge Bar"},
            {"src": "/images/luxury-trains/golden-chariot/double-bed.jpg", "title": "Deluxe Double Bed Cabin"},
            {"src": "/images/luxury-trains/golden-chariot/hero.jpg", "title": "The Golden Chariot Royal Livery"},
            {"src": "/images/luxury-trains/golden-chariot/restaurant-2.jpg", "title": "Nalapaka Fine Dining Restaurant"},
            {"src": "/images/luxury-trains/golden-chariot/sitting-room.jpg", "title": "Deluxe Twin Bed Cabin"}
        ],
        highlights=[
            "Open-top 4x4 safari in Bandipur Tiger Reserve tracking wild elephants and leopards",
            "Guided walk through Mysore Palace (Amba Vilas) and royal heritage of Srirangapatna",
            "12th-century Hoysala soapstone temple architecture at Hoysaleswara Temple, Halebidu",
            "Private guided walk in a lush Chikmagalur coffee plantation with high tea",
            "UNESCO World Heritage Vijayanagara ruins, Vittala Temple & Stone Chariot in Hampi",
            "Historic Portuguese churches of Old Goa and traditional Goan spice plantation lunch"
        ],
        overview="The Pride of Karnataka is The Golden Chariot's flagship wildlife and heritage circuit. Departing from Bengaluru on scheduled Saturday evenings, this 6-day journey loops through Karnataka's dense teak forests, Hoysala dynasty temples, and the boulder-strewn ruins of the 14th-century Vijayanagara empire, before unwinding along the golden coast of Goa. Travel comfortably in handcrafted deluxe cabins, enjoy curated regional meals in two ornate restaurant cars, and return to Bengaluru refreshed with memorable stories of South India.",
        days_data=gc_pride_days,
        departures_data=gc_pride_departures,
        price_data=gc_pride_prices,
        faqs_data=gc_pride_faqs,
        train_slug="golden-chariot",
        train_name="The Golden Chariot",
        inc_exc_html=gc_inc_exc_snippet
    )

    write_page(f"{base_dir}/golden-chariot/pride-of-karnataka/index.html",
               "Pride of Karnataka Itinerary (Bengaluru to Goa · 6D/5N) | The Golden Chariot | KoiKoi Travel",
               "Official 6-day itinerary for Pride of Karnataka aboard The Golden Chariot: Bandipur safari, Mysore Palace, Halebidu, Hampi ruins, and Old Goa.",
               gc_pride_html, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # ================= 2. JEWELS OF SOUTH (5N/6D) =================
    gc_jewels_days = [
        {
            "day": 1,
            "title": "Bengaluru – Welcome Ceremony & Departure for Mysore",
            "paragraphs": [
                "Afternoon: Check in at Yeshwantpur Railway Station (YPR) in Bengaluru by 14:00 hrs. Enjoy a warm South Indian welcome with fresh garlands and traditional music. Board The Golden Chariot and relax in your Deluxe Cabin.",
                "Evening: As the train departs southward toward Mysore, attend a safety and itinerary briefing at the Madira Lounge. Savor a royal multi-course dinner at the Ruchi and Nalapaka dining cars."
            ],
            "overnight": "Overnight aboard The Golden Chariot parked at Mysore",
            "meals": "Dinner Included"
        },
        {
            "day": 2,
            "title": "Mysore & Srirangapatna – Amba Vilas Palace & Tipu Sultan's Legacy",
            "paragraphs": [
                "Morning: Breakfast on board followed by a guided visit to Mysore Palace (Amba Vilas). Walk through the breathtaking Kalyana Mantapa (marriage pavilion), the peacock-tiled courtyards, and the private royal portrait galleries.",
                "Afternoon: Lunch on board the train. In the afternoon, travel to the river island fortress of Srirangapatna to visit Dariya Daulat Bagh (Tipu Sultan's Summer Palace made of teakwood) and the historic Gumbaz mausoleum.",
                "Evening: Enjoy high tea and free time to explore local Mysore silk or sandalwood stalls. Reboard the train for dinner as it journeys east toward Tamil Nadu."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Chengalpattu / Kanchipuram",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 3,
            "title": "Kanchipuram & Mahabalipuram – Silk Weavers & UNESCO Shore Temple",
            "paragraphs": [
                "Morning: Early morning arrival in Chengalpattu. After breakfast on board, drive to the holy temple city of Kanchipuram. Visit an authentic silk weaving cooperative to see master artisans weave pure mulberry silk and gold zari sarees on pit looms. Explore the historic Ekambareswarar Temple courtyards.",
                "Afternoon: Drive to the coastal town of Mahabalipuram for lunch at a luxury seaside resort. In the afternoon, explore the 7th-century UNESCO World Heritage rock carvings: the Shore Temple overlooking the Bay of Bengal, the monolithic Five Rathas, and the colossal open-air bas-relief of Arjuna's Penance.",
                "Evening: Return to the train for dinner as it journeys south into the heartland of the Chola kingdom."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Thanjavur",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 4,
            "title": "Thanjavur & Chettinad – The Great Living Chola Temple & Merchant Mansions",
            "paragraphs": [
                "Morning: Arrive in Thanjavur. After breakfast on board, visit the majestic 11th-century Brihadisvara Temple (the Big Temple), built by Emperor Rajaraja Chola I. Admire the 216-foot granite vimana tower and the massive single-stone Nandi bull carved from black granite.",
                "Afternoon: Reboard the train for lunch as it glides toward Chettinad. Step off to explore the palatial mansions built by 19th-century Chettiar traders, featuring Burmese teak columns, Italian marble, and Belgian mirrors. Witness the traditional craft of handmade Athangudi patterned floor tiles.",
                "Evening: Enjoy a traditional Chettinad coffee and regional snack experience before returning to the train. Savor dinner on board while traveling west toward the tropical coast of Kerala."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Cochin",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 5,
            "title": "Cochin & Kumarakom – Colonial Fort Kochi & Backwaters Houseboat Cruise",
            "paragraphs": [
                "Morning: Arrive in Cochin. After breakfast on board, head out to explore historic Fort Kochi. Watch local fishermen operate the iconic cantilevered Chinese fishing nets along the shore, and visit the 16th-century Mattancherry Dutch Palace with its vibrant murals, and the historic Jewish Synagogue in Jew Town.",
                "Afternoon: Drive through emerald coconut groves to Kumarakom on the banks of Vembanad Lake. Board a traditional thatched-roof Kerala kettuvallam (houseboat) for a peaceful cruise through tranquil canals, enjoying fresh coconut water and local Kerala delicacies served on board.",
                "Evening: Return to The Golden Chariot to freshen up. In the evening, gather for the train captain's gala farewell dinner with wine pairings as the train begins its overnight return journey to Bengaluru."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Bengaluru",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 6,
            "title": "Bengaluru – Morning Return & Deboarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Morning: Enjoy your final breakfast in the dining car as the train crosses Karnataka's southern plains. Arrive at Yeshwantpur Railway Station (YPR) in Bengaluru by 08:30 hrs. Bid farewell to the hospitality team and conclude your royal Southern journey."
            ],
            "overnight": "",
            "meals": "Breakfast Included"
        }
    ]

    gc_jewels_departures = [
        ("November 2026", "28 Nov 2026 (Saturday)"),
        ("February 2027", "20 Feb 2027 (Saturday)"),
        ("March 2027", "27 Mar 2027 (Saturday)")
    ]

    gc_jewels_prices = {
        "usd": {"deluxe_twin": "$5,000", "deluxe_single": "$3,800"},
        "inr": {"deluxe_twin": "₹4,87,500", "deluxe_single": "₹3,70,500"}
    }

    gc_jewels_faqs = [
        {"q": "Which states are covered during the Jewels of South circuit?",
         "a": "Jewels of South traverses three culturally rich southern states: Karnataka (Bengaluru & Mysore), Tamil Nadu (Kanchipuram, Mahabalipuram, Thanjavur & Chettinad), and Kerala (Cochin & Kumarakom)."},
        {"q": "Is the Kerala houseboat cruise included in the ticket?",
         "a": "Yes, a private group houseboat excursion through the backwaters of Kumarakom with refreshments and local snacks is fully included in the ticket price."},
        {"q": "Can travelers purchase authentic Kanchipuram silk sarees during the tour?",
         "a": "Yes. The excursion visits authentic weaver cooperatives where you can observe pure mulberry silk handloom weaving and purchase certified Silk Mark sarees directly from artisan weavers."},
        {"q": "What type of food is served in the Chettinad and Kerala sectors?",
         "a": "The train chefs and partner heritage hotels prepare authentic regional specialties such as Chettinad pepper curries, Malabar fish curries, and appams, along with a wide choice of Continental, North Indian, and vegetarian dishes."},
        {"q": "How does KoiKoi Travel help with international flights and Bengaluru hotels?",
         "a": "We coordinate complete end-to-end luxury travel: pre-tour stays at top five-star hotels in Bengaluru (like The Leela Palace or Taj West End), private chauffeur airport transfers, and post-tour extensions."}
    ]

    gc_jewels_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 2 · 5 Nights / 6 Days",
        name="Jewels of South",
        duration="5 Nights / 6 Days",
        title="Jewels of South (Bengaluru to Bengaluru · 6D/5N)",
        route="Bengaluru → Mysore → Kanchipuram & Mahabalipuram → Thanjavur & Chettinad → Cochin & Kumarakom → Bengaluru",
        origin="Bengaluru (Yeshwantpur YPR)",
        destination="Bengaluru (Yeshwantpur YPR)",
        destinations_count="8 Destinations · Karnataka, Tamil Nadu & Kerala",
        starting_price="$5,000 USD / ₹4,87,500 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/golden-chariot/restaurant-2.jpg", "title": "Nalapaka Fine Dining Restaurant"},
            {"src": "/images/luxury-trains/golden-chariot/bar.jpg", "title": "Madira Royal Lounge Bar"},
            {"src": "/images/luxury-trains/golden-chariot/sitting-room.jpg", "title": "Deluxe Twin Bed Cabin"},
            {"src": "/images/luxury-trains/golden-chariot/hero.jpg", "title": "The Golden Chariot Royal Livery"},
            {"src": "/images/luxury-trains/golden-chariot/restaurant-1.jpg", "title": "Ruchi Fine Dining Restaurant"},
            {"src": "/images/luxury-trains/golden-chariot/double-bed.jpg", "title": "Deluxe Double Bed Cabin"}
        ],
        highlights=[
            "Guided visit to Mysore Palace (Amba Vilas) and royal Srirangapatna mausoleum",
            "World-famous silk weaving traditions and historic temple courtyards in Kanchipuram",
            "UNESCO monolithic Shore Temple and 7th-century bas-reliefs in Mahabalipuram",
            "11th-century Chola granite architecture at the monumental Brihadisvara Temple, Thanjavur",
            "Palatial heritage mansions, Athangudi handmade tiles, and spicy culinary lunch in Chettinad",
            "Historic Fort Kochi Chinese fishing nets and tranquil sunset houseboat cruise on Kerala backwaters"
        ],
        overview="The Jewels of South is an unforgettable rail expedition spanning Karnataka, Tamil Nadu, and Kerala. Designed for travelers passionate about classical Dravidian temple architecture, royal palaces, handloom silk crafts, and serene backwater waterways, this 6-day circuit connects the royal seat of Mysore, the Pallava rock sculptures of Mahabalipuram, the great Chola temples of Thanjavur, the palatial merchant estates of Chettinad, and the tropical palm-fringed backwaters of Kerala.",
        days_data=gc_jewels_days,
        departures_data=gc_jewels_departures,
        price_data=gc_jewels_prices,
        faqs_data=gc_jewels_faqs,
        train_slug="golden-chariot",
        train_name="The Golden Chariot",
        inc_exc_html=gc_inc_exc_snippet
    )

    write_page(f"{base_dir}/golden-chariot/jewels-of-south/index.html",
               "Jewels of South Itinerary (Karnataka, Tamil Nadu & Kerala · 6D/5N) | The Golden Chariot | KoiKoi Travel",
               "Official 6-day itinerary for Jewels of South aboard The Golden Chariot: Mysore, Mahabalipuram shore temples, Thanjavur, Chettinad mansions, and Kerala backwaters.",
               gc_jewels_html, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # ================= 3. GLIMPSES OF KARNATAKA (3N/4D) =================
    gc_glimpses_days = [
        {
            "day": 1,
            "title": "Bengaluru – Welcome Ceremony & Boarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Afternoon: Gather at Yeshwantpur Railway Station (YPR) in Bengaluru by 14:00 hrs. Enjoy traditional welcome ceremonies with marigold garlands and shehnai music. Settle into your handcrafted Deluxe Cabin aboard The Golden Chariot.",
                "Evening: As the train departs for Nanjangud, meet the train manager and your carriage butler. Savor a four-course dinner in the Ruchi and Nalapaka dining cars featuring authentic regional Karnataka and continental specialties."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Nanjangud",
            "meals": "Dinner Included"
        },
        {
            "day": 2,
            "title": "Bandipur Tiger Reserve & Mysore – Jungle Safari & Royal Palace",
            "paragraphs": [
                "Early Morning: Depart at 06:00 hrs for an open-top gypsy safari into Bandipur National Park. Keep an eye out for wild herds of Asian elephants, sloth bears, Indian gaurs, and elusive leopards roaming the forest.",
                "Afternoon: Return to the train for a hearty breakfast as it proceeds to Mysore. After lunch on board, head out for a guided visit to the grand Mysore Palace (Amba Vilas), admiring its silver doors, Belgian mirrors, and grand Durbar Hall.",
                "Evening: Visit Srirangapatna to see the historic island fortifications and Dariya Daulat Bagh. Return to the train for cocktails at the Madira Lounge Bar and a royal dinner as the train journeys north toward Hampi."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Hosapete",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 3,
            "title": "Hampi – The Ancient Vijayanagara Ruins & Stone Chariot",
            "paragraphs": [
                "Morning: Breakfast on board as the train arrives at Hosapete. Drive to UNESCO World Heritage site Hampi to explore the sacred center, including the active 7th-century Virupaksha Temple, Hemakuta Hill, and the massive monolithic Ganesha statues.",
                "Afternoon: Return to the train to escape the midday heat and enjoy a relaxed lunch in the dining car. In the afternoon, return to Hampi to tour the Royal Enclosure, the Queens Bath, Lotus Mahal, and the celebrated Vijaya Vittala Temple with its monolithic Stone Chariot.",
                "Evening: Return to the train for a festive farewell dinner with house wines and local entertainment as The Golden Chariot travels south back to Bengaluru."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Bengaluru",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 4,
            "title": "Bengaluru – Morning Return & Deboarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Morning: Breakfast is served in the dining cars as the train arrives at Yeshwantpur Railway Station (YPR) in Bengaluru around 08:30 hrs. Bid farewell to the hospitality team and deboard with wonderful memories of Karnataka's grand heritage."
            ],
            "overnight": "",
            "meals": "Breakfast Included"
        }
    ]

    gc_glimpses_departures = [
        ("October 2026", "31 Oct 2026 (Saturday)"),
        ("December 2026", "19 Dec 2026 (Saturday)"),
        ("February 2027", "06 Feb 2027 (Saturday)")
    ]

    gc_glimpses_prices = {
        "usd": {"deluxe_twin": "$3,400", "deluxe_single": "$2,600"},
        "inr": {"deluxe_twin": "₹3,31,500", "deluxe_single": "₹2,53,500"}
    }

    gc_glimpses_faqs = [
        {"q": "What makes Glimpses of Karnataka the best choice for busy travelers?",
         "a": "At 3 Nights / 4 Days (Saturday afternoon to Tuesday morning), it fits neatly into an extended weekend or a busy India itinerary while still covering the premier highlights: Bandipur wildlife, Mysore Palace, and the UNESCO ruins of Hampi."},
        {"q": "Where does Glimpses of Karnataka start and finish?",
         "a": "The journey starts and ends at Yeshwantpur Railway Station (YPR) in Bengaluru, making domestic and international flight connections at Kempegowda International Airport (BLR) straightforward."},
        {"q": "What is the difference in cost between Glimpses and the 6-day Pride of Karnataka?",
         "a": "Glimpses of Karnataka starts at $3,400 USD / ₹3,31,500 INR per person (twin sharing), compared to $5,000 USD / ₹4,87,500 INR for the 6-day Pride of Karnataka."},
        {"q": "Are Bandipur safari permits and Hampi entry tickets included?",
         "a": "Yes, all park permits, open-jeep safari vehicles with licensed forest department naturalists, and monument entrance fees are fully covered in the tour fare."},
        {"q": "What happens if a solo traveler wants to book this journey?",
         "a": "Solo travelers pay the single supplement tariff ($2,600 USD / ₹2,53,500 INR) for dedicated private occupancy of an entire Deluxe Cabin with double or twin bed."}
    ]

    gc_glimpses_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 3 · 3 Nights / 4 Days",
        name="Glimpses of Karnataka",
        duration="3 Nights / 4 Days",
        title="Glimpses of Karnataka (Bengaluru to Bengaluru · 4D/3N)",
        route="Bengaluru → Bandipur National Park → Mysore → Hampi → Bengaluru",
        origin="Bengaluru (Yeshwantpur YPR)",
        destination="Bengaluru (Yeshwantpur YPR)",
        destinations_count="4 Destinations · Karnataka",
        starting_price="$3,400 USD / ₹3,31,500 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/golden-chariot/double-bed.jpg", "title": "Deluxe Double Bed Cabin"},
            {"src": "/images/luxury-trains/golden-chariot/restaurant-1.jpg", "title": "Ruchi Fine Dining Restaurant"},
            {"src": "/images/luxury-trains/golden-chariot/bar.jpg", "title": "Madira Royal Lounge Bar"},
            {"src": "/images/luxury-trains/golden-chariot/hero.jpg", "title": "The Golden Chariot in Karnataka"},
            {"src": "/images/luxury-trains/golden-chariot/restaurant-2.jpg", "title": "Nalapaka Fine Dining Restaurant"},
            {"src": "/images/luxury-trains/golden-chariot/sitting-room.jpg", "title": "Deluxe Twin Bed Cabin"}
        ],
        highlights=[
            "Early morning open-top safari inside Bandipur Tiger Reserve tracking elephants & leopards",
            "Guided tour of the grand Mysore Palace (Amba Vilas) and royal heritage of Tipu Sultan",
            "Full-day exploration of UNESCO World Heritage Hampi, Virupaksha Temple & boulder landscape",
            "Famous Stone Chariot and musical pillars at Vittala Temple complex",
            "All gourmet dining, South Indian delicacies, and complimentary house beverages on board",
            "Compact 4-day royal weekend itinerary designed for time-conscious travelers"
        ],
        overview="Glimpses of Karnataka is The Golden Chariot's signature 4-day short royal getaway, created for travelers who want to experience South India's top heritage and wildlife highlights in a single extended weekend. Departing Bengaluru on Saturday afternoon, the train takes you deep into the teak jungles of Bandipur Tiger Reserve, visits the royal Mysore Palace, and explores the stone marvels of the 14th-century Vijayanagara empire at Hampi, before returning to Bengaluru on Tuesday morning.",
        days_data=gc_glimpses_days,
        departures_data=gc_glimpses_departures,
        price_data=gc_glimpses_prices,
        faqs_data=gc_glimpses_faqs,
        train_slug="golden-chariot",
        train_name="The Golden Chariot",
        inc_exc_html=gc_inc_exc_snippet
    )

    write_page(f"{base_dir}/golden-chariot/glimpses-of-karnataka/index.html",
               "Glimpses of Karnataka Itinerary (Bengaluru to Hampi · 4D/3N) | The Golden Chariot | KoiKoi Travel",
               "Official 4-day weekend itinerary for Glimpses of Karnataka aboard The Golden Chariot: Bandipur safari, Mysore Palace, and UNESCO Hampi.",
               gc_glimpses_html, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # ================= 4. REVAMPED MASTER ITINERARY HUB PAGE =================
    gc_itinerary = f"""<script>window.location.replace("{base_path}/golden-chariot/pride-of-karnataka");</script>
<div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:40px 0 36px">
  <div class="wrap">
    <div class="koikoi-breadcrumb" style="margin-bottom:14px">
      <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <a href="{base_path}/golden-chariot" style="color:#64748b;text-decoration:none">The Golden Chariot</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <span style="color:#0f172a;font-weight:600">All Itineraries</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;border:1px solid rgba(248,144,77,0.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:5px 14px;border-radius:999px">
        3 SIGNATURE CIRCUITS
      </span>
      <span style="color:#64748b;font-size:13.5px;font-weight:600">Departures from Bengaluru (Yeshwantpur YPR) · Season 2026–2027</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 14px">
      The Golden Chariot <span style="color:#F8904D">Itineraries</span>
    </h1>
    <p style="color:#475569;font-size:16px;max-width:1020px;line-height:1.75;margin:0">
      South India's only luxury train offers three handcrafted journeys starting from Bengaluru. Choose from two 6-day grand expeditions exploring Karnataka's ancient kingdoms or Tamil Nadu and Kerala's temples and backwaters, or select a focused 4-day royal weekend covering Bandipur, Mysore, and Hampi.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px;background:#fcfbf9">
  <div class="wrap">
    
    <!-- 1. The 3 Circuit Cards Grid -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:24px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Choose Your Route</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Handcrafted <span style="color:#F8904D">Southern Journeys</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Click below to explore day-by-day sightseeing, inclusions, published tariffs, and scheduled Saturday departures.
        </p>
      </div>
      {get_gc_cards_component()}
    </div>

    <!-- 2. Circuit Comparison Matrix -->
    <div id="comparison" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:24px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Route Comparison</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          Compare <span style="color:#F8904D">Golden Chariot Circuits</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Side-by-side comparison of duration, destinations, wildlife experiences, and published tariffs to help you choose the right journey.
        </p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table class="circuit-price-table">
            <thead>
              <tr>
                <th style="width:25%;text-align:left">Key Features</th>
                <th style="width:25%;text-align:center">Pride of Karnataka</th>
                <th style="width:25%;text-align:center">Jewels of South</th>
                <th style="width:25%;text-align:center">Glimpses of Karnataka</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:600">Journey Duration</td>
                <td style="text-align:center;font-weight:700;color:#0f172a">5 Nights / 6 Days</td>
                <td style="text-align:center;font-weight:700;color:#0f172a">5 Nights / 6 Days</td>
                <td style="text-align:center;font-weight:700;color:#0f172a">3 Nights / 4 Days</td>
              </tr>
              <tr>
                <td style="font-weight:600">Start &amp; Finish</td>
                <td style="text-align:center">Bengaluru (Yeshwantpur YPR)</td>
                <td style="text-align:center">Bengaluru (Yeshwantpur YPR)</td>
                <td style="text-align:center">Bengaluru (Yeshwantpur YPR)</td>
              </tr>
              <tr>
                <td style="font-weight:600">States Covered</td>
                <td style="text-align:center">Karnataka &amp; Goa</td>
                <td style="text-align:center">Karnataka, Tamil Nadu &amp; Kerala</td>
                <td style="text-align:center">Karnataka</td>
              </tr>
              <tr>
                <td style="font-weight:600">Wildlife &amp; Nature</td>
                <td style="text-align:center">Bandipur Tiger Safari &amp; Coffee Plantation</td>
                <td style="text-align:center">Kerala Backwaters &amp; Kumarakom Canals</td>
                <td style="text-align:center">Bandipur Tiger Safari</td>
              </tr>
              <tr>
                <td style="font-weight:600">UNESCO World Heritage</td>
                <td style="text-align:center">Hampi (Vijayanagara) &amp; Churches of Old Goa</td>
                <td style="text-align:center">Mahabalipuram Shore Temples &amp; Thanjavur Chola Temple</td>
                <td style="text-align:center">Hampi (Vijayanagara Ruins &amp; Stone Chariot)</td>
              </tr>
              <tr>
                <td style="font-weight:600">Cultural &amp; City Highlights</td>
                <td style="text-align:center">Mysore Palace, Halebidu Hoysala Temple, Chikmagalur</td>
                <td style="text-align:center">Kanchipuram Silk, Chettinad Mansions, Fort Kochi</td>
                <td style="text-align:center">Mysore Palace &amp; Srirangapatna</td>
              </tr>
              <tr>
                <td style="font-weight:600">Deluxe Twin Tariff</td>
                <td style="text-align:center;font-weight:800;color:#d96b27">$5,000 USD / ₹4,87,500 INR</td>
                <td style="text-align:center;font-weight:800;color:#d96b27">$5,000 USD / ₹4,87,500 INR</td>
                <td style="text-align:center;font-weight:800;color:#d96b27">$3,400 USD / ₹3,31,500 INR</td>
              </tr>
              <tr>
                <td style="font-weight:600">Single Supplement</td>
                <td style="text-align:center;color:#64748b">$3,800 USD / ₹3,70,500 INR</td>
                <td style="text-align:center;color:#64748b">$3,800 USD / ₹3,70,500 INR</td>
                <td style="text-align:center;color:#64748b">$2,600 USD / ₹2,53,500 INR</td>
              </tr>
              <tr>
                <td style="font-weight:600">Detailed Itinerary</td>
                <td style="text-align:center"><a href="{base_path}/golden-chariot/pride-of-karnataka" style="display:inline-block;padding:6px 14px;background:#0f172a;color:#fff;border-radius:6px;font-size:12.5px;font-weight:700;text-decoration:none">View Route &rarr;</a></td>
                <td style="text-align:center"><a href="{base_path}/golden-chariot/jewels-of-south" style="display:inline-block;padding:6px 14px;background:#0f172a;color:#fff;border-radius:6px;font-size:12.5px;font-weight:700;text-decoration:none">View Route &rarr;</a></td>
                <td style="text-align:center"><a href="{base_path}/golden-chariot/glimpses-of-karnataka" style="display:inline-block;padding:6px 14px;background:#0f172a;color:#fff;border-radius:6px;font-size:12.5px;font-weight:700;text-decoration:none">View Route &rarr;</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 3. Inclusions & Exclusions -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:24px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">All-Inclusive Journey</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          What Is Included In <span style="color:#F8904D">Your Golden Chariot Fare</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          From dining cars to wildlife safaris and monument admissions, here is what your luxury ticket covers.
        </p>
      </div>
      {gc_inc_exc_snippet}
    </div>

    <!-- 4. Simple Booking Steps -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">How It Works</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Simple Steps to <span style="color:#F8904D">Reserve Your Cabin</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Simple booking process with transparent pricing and direct support from our specialist travel team.
        </p>
      </div>

      <div class="step-grid">
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">01</div>
          <h3 style="color:#0f172a">Select Your Circuit &amp; Preferred Date</h3>
          <p style="color:#64748b">Tell us which circuit you prefer (Pride of Karnataka, Jewels of South, or Glimpses of Karnataka) and your target departure date.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">02</div>
          <h3 style="color:#0f172a">Live Cabin Check &amp; Official Itemized Quote</h3>
          <p style="color:#64748b">We confirm live cabin availability directly with IRCTC and share a transparent quote including GST, cabin type, and optional hotel add-ons.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">03</div>
          <h3 style="color:#0f172a">Reserve with 20% Deposit</h3>
          <p style="color:#64748b">Secure your cabin with a 20% advance payment. The remaining 80% balance is payable 30 days prior to departure.</p>
        </div>
      </div>
    </div>

    <!-- 5. Centered Helpful FAQs -->
    <div id="faq">
      <div class="sec-head center" style="margin-bottom:28px;text-align:center;max-width:850px;margin-left:auto;margin-right:auto">
        <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">HELPFUL INFORMATION</span>
        <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(24px,2.8vw,34px);font-weight:800;color:#0f172a;margin:0 0 8px;text-align:center">
          Frequently Asked Questions · <span style="color:#F8904D">The Golden Chariot</span>
        </h2>
        <p style="color:#64748b;font-size:14.5px;margin:0;line-height:1.6;text-align:center">
          Everything you need to know about route differences, boarding logistics, dining, and reservations.
        </p>
      </div>

      <div class="faq" style="background:#fff;border-radius:18px;border:1px solid #e2e8f0;padding:8px 24px;box-shadow:0 4px 16px rgba(0,0,0,0.02)">
        <details open style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Which Golden Chariot circuit is best for first-time visitors to South India?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            For travelers wanting a balanced mix of wildlife, historic monuments, and coastal relaxation, <strong>Pride of Karnataka (5N/6D)</strong> is the top choice because it combines the Bandipur tiger safari, Hoysala architecture, Hampi ruins, and beaches of Goa. If you are specifically interested in grand Dravidian temple architecture and Kerala backwaters, choose <strong>Jewels of South (5N/6D)</strong>.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Where do the journeys depart from and what time should I arrive?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            All journeys begin and end at <strong>Yeshwantpur Railway Station (YPR)</strong> in Bengaluru. Guest registration opens at 14:00 hrs on scheduled Saturday afternoons. We recommend arriving in Bengaluru a day earlier to rest before boarding; KoiKoi Travel can arrange airport pickup and a 5-star hotel stay.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is the difference between Pride of Karnataka and Glimpses of Karnataka?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            Glimpses of Karnataka (3N/4D) is a condensed version of Pride of Karnataka (5N/6D). It includes Bandipur safari, Mysore Palace, and Hampi, but omits Halebidu, Chikmagalur coffee estates, and Goa. It is ideal for travelers with limited vacation days who want to experience the royal train over an extended weekend.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What cabin types are available on The Golden Chariot?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            The Golden Chariot features 44 elegantly decorated Deluxe Cabins across 11 guest carriages, available in Double Bed and Twin Bed configurations. Each cabin includes a private en-suite bathroom with hot shower, LCD TV, electronic safe, individual climate control, and a dedicated carriage attendant available 24/7.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Can vegetarian, vegan, or Jain meals be arranged?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            Yes, absolutely. The two onboard restaurants, Ruchi and Nalapaka, cater to pure vegetarian, vegan, Jain, and gluten-free dietary requirements. Please inform us at the time of reservation so the executive culinary team is prepared before your arrival.
          </div>
        </details>
        <details style="padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is the payment and cancellation policy?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            A 20% advance deposit confirms your cabin reservation. The remaining 80% balance is payable 30 days prior to departure. Official IRCTC cancellation terms apply based on the number of days prior to departure.
          </div>
        </details>
      </div>
    </div>

  </div>
</section>
"""

    write_page(f"{base_dir}/golden-chariot/itinerary/index.html",
               "The Golden Chariot Itineraries: Pride of Karnataka, Jewels of South & Glimpses | KoiKoi Travel",
               "Compare all 3 Golden Chariot luxury train itineraries departing from Bengaluru: Pride of Karnataka (6D), Jewels of South (6D), and Glimpses of Karnataka (4D).",
               gc_itinerary, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # Golden Chariot Departures
    gc_departures = f"""
<div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:40px 0 36px">
  <div class="wrap">
    <div class="koikoi-breadcrumb" style="margin-bottom:14px">
      <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <a href="{base_path}/golden-chariot" style="color:#64748b;text-decoration:none">The Golden Chariot</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <span style="color:#0f172a;font-weight:600">Departure Dates</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      The Golden Chariot Departure Dates (2026 – 2027)
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Official scheduled Saturday departures from Yesvantpur Railway Station, Bengaluru for the upcoming season.
    </p>
  </div>
</div>
<section style="padding:48px 0 80px;background:#fcfbf9">
  <div class="wrap">
    {get_gc_departures_table_component()}
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/departures/index.html", 
               "Golden Chariot Departure Dates 2026-2027 Official Calendar | KoiKoi Travel",
               "Official scheduled departure dates for The Golden Chariot luxury train from Bengaluru.",
               gc_departures, active_train="golden-chariot", active_tab="departures", base_path=base_path)

    # Golden Chariot Price
    gc_price = f"""
<div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:40px 0 36px">
  <div class="wrap">
    <div class="koikoi-breadcrumb" style="margin-bottom:14px">
      <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <a href="{base_path}/golden-chariot" style="color:#64748b;text-decoration:none">The Golden Chariot</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <span style="color:#0f172a;font-weight:600">Ticket Prices</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 10px">
      The Golden Chariot Ticket Prices (2026 – 2027)
    </h1>
    <p style="color:#475569;font-size:16px;max-width:980px;line-height:1.65;margin:0">
      Official published tariffs per person in USD and INR for Deluxe Cabins. 5% Govt. GST extra.
    </p>
  </div>
</div>
<section style="padding:48px 0 80px;background:#fcfbf9">
  <div class="wrap">
    {get_gc_prices_table_component()}
  </div>
</section>
"""
    write_page(f"{base_dir}/golden-chariot/price/index.html", 
               "The Golden Chariot Ticket Price & Tariff 2026-2027 | KoiKoi Travel",
               "Official pricing for The Golden Chariot luxury train journeys in USD and INR with inclusions.",
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
        for tab in ["itinerary", "departures", "price", "cabins", "photo-gallery",
                    "the-heritage-of-india", "the-indian-panorama", "the-indian-splendour", "treasures-of-india",
                    "pride-of-karnataka", "jewels-of-south", "glimpses-of-karnataka"]:
            src = f"{base_dir}/{train}/{tab}/index.html"
            dst = f"{base_dir}/{train}/{tab}.html"
            if os.path.exists(src):
                shutil.copyfile(src, dst)

    print(f"Successfully generated all pages for {base_dir}!")

if __name__ == "__main__":
    generate_all_for_base("frontend/public/luxury-train-demo", "/luxury-train-demo")
    print("ALL STATIC PAGES GENERATED WITH LOCAL IMAGES & UPDATES FOR LUXURY-TRAIN-DEMO!")
