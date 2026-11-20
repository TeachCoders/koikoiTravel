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
  --primary:#0f2a43;
  --primary-dark:#091b2c;
  --accent:#c9973b;
  --accent-dark:#a87c28;
  --ink:#1c2733;
  --muted:#5b6672;
  --bg:#ffffff;
  --soft:#f6f3ee;
  --line:#e6e1d8;
  --radius:14px;
  --shadow:0 8px 28px rgba(15,42,67,.10);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--bg);line-height:1.65;font-size:16px}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif;line-height:1.2;color:var(--primary)}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
section{padding:64px 0}
.eyebrow{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-dark);font-weight:600;margin-bottom:10px}
.sec-head{max-width:760px;margin-bottom:36px}
.sec-head h2{font-size:clamp(26px,3.8vw,38px);margin-bottom:12px}
.sec-head p{color:var(--muted);font-size:16px}
.center{text-align:center;margin-left:auto;margin-right:auto}

/* buttons */
.btn{display:inline-block;padding:12px 26px;border-radius:999px;font-weight:600;font-size:15px;border:2px solid transparent;cursor:pointer;transition:.2s;text-align:center}
.btn-gold{background:var(--accent);color:#fff}
.btn-gold:hover{background:var(--accent-dark)}
.btn-line{border-color:#fff;color:#fff}
.btn-line:hover{background:#fff;color:var(--primary)}
.btn-dark{background:var(--primary);color:#fff}
.btn-dark:hover{background:var(--primary-dark)}

/* header */
header{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;height:72px}
.nav img{height:42px;width:auto}
.nav ul{display:flex;gap:24px;list-style:none;font-size:15px;font-weight:500}
.nav ul a:hover,.nav ul a.on{color:var(--accent-dark)}
.nav .btn{padding:10px 20px;font-size:14px}
.dd{position:relative;padding:24px 0}
.dd .menu{display:none;position:absolute;top:100%;left:-14px;min-width:200px;background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow);padding:8px}
.dd:hover .menu{display:block}
.dd .menu a{display:block;padding:9px 12px;border-radius:6px;font-size:14px;color:var(--ink)}
.dd .menu a:hover{background:var(--soft);color:var(--accent-dark)}
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
.hero .wrap{position:relative;z-index:10;max-width:1600px;margin:0 auto;padding:0 24px sm:0 40px;width:100%}
.hero-tag-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;background:rgba(2,6,23,.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px}
.hero-tag-pill span.dot{width:6px;height:6px;border-radius:50%;background:#F8904D;box-shadow:0 0 8px #F8904D}
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

/* sub-nav tabs for train pages */
.train-subnav{background:var(--primary);color:#fff;border-bottom:1px solid rgba(255,255,255,.12);position:sticky;top:72px;z-index:40}
.train-subnav .wrap{display:flex;gap:8px;overflow-x:auto;padding:10px 20px;scrollbar-width:none}
.train-subnav a{padding:8px 16px;border-radius:999px;font-size:13px;font-weight:600;white-space:nowrap;color:#d5e0ea;transition:.2s}
.train-subnav a:hover{background:rgba(255,255,255,.15);color:#fff}
.train-subnav a.active{background:var(--accent);color:#fff}

/* cards & grids */
.grid-4{display:grid;grid-template-columns:repeat(2,1fr);gap:28px}
@media(max-width:820px){.grid-4{grid-template-columns:1fr}}
.card{background:#fff;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;border:1px solid var(--line)}
.card .photo{height:320px;display:flex;align-items:flex-end;padding:20px;color:#fff;font-family:'Playfair Display',serif;font-size:13px;background-size:cover;background-position:center;position:relative}
@media(max-width:600px){.card .photo{height:250px}}
.train-badge{position:absolute;top:20px;right:20px;width:72px;height:72px;background:#fff;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:5px;border:2.5px solid #c59b27;box-shadow:0 6px 18px rgba(0,0,0,.35);z-index:2;transition:transform .2s ease}
.train-badge img{width:100%;height:100%;object-fit:contain}
.card:hover .train-badge{transform:scale(1.06)}
.card .photo span{background:rgba(0,0,0,.6);backdrop-filter:blur(4px);padding:5px 12px;border-radius:999px;font-family:'Inter',sans-serif;font-size:12px;letter-spacing:.05em}
.card .body{padding:24px;flex:1;display:flex;flex-direction:column}
.card h3{font-size:24px;margin-bottom:4px}
.card .sub{color:var(--accent-dark);font-weight:600;font-size:13px;margin-bottom:12px}
.card p{color:var(--muted);font-size:14px;margin-bottom:16px}
.facts{list-style:none;border-top:1px solid var(--line);margin-bottom:18px}
.facts li{display:flex;justify-content:space-between;gap:16px;padding:9px 0;border-bottom:1px solid var(--line);font-size:14px}
.facts li span:first-child{color:var(--muted)}
.facts li span:last-child{text-align:right;font-weight:500}
.links{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px}
.links a{text-align:center;font-size:13px;font-weight:600;padding:9px 4px;border:1px solid var(--line);border-radius:8px;color:var(--primary);transition:.2s;background:#faf8f5}
.links a:hover{background:var(--primary);color:#fff;border-color:var(--primary)}
.card .btn{text-align:center;margin-top:auto}

/* tables */
.table-wrap{overflow-x:auto;border-radius:var(--radius);box-shadow:var(--shadow);background:#fff;border:1px solid var(--line)}
table{width:100%;border-collapse:collapse;min-width:760px;font-size:14px}
th{background:var(--primary);color:#fff;text-align:left;padding:14px 18px;font-weight:600}
td{padding:14px 18px;border-bottom:1px solid var(--line);vertical-align:top}
td:first-child{font-weight:600;color:var(--primary)}
tr:last-child td{border-bottom:0}

/* itinerary day cards */
.day-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:24px;margin-bottom:20px;box-shadow:0 4px 14px rgba(0,0,0,.03)}
.day-badge{display:inline-block;background:var(--accent);color:#fff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;margin-bottom:8px;text-transform:uppercase}
.day-card h3{font-size:20px;margin-bottom:10px}
.day-card p{color:var(--muted);font-size:15px;line-height:1.6}
.day-meta{display:flex;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:13px;color:var(--primary);font-weight:600}

/* cabins cards */
.cabin-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
@media(max-width:768px){.cabin-grid{grid-template-columns:1fr}}
.cabin-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}
.cabin-photo{height:240px;background-size:cover;background-position:center;position:relative}
.cabin-body{padding:24px}
.cabin-size{display:inline-block;background:var(--soft);color:var(--accent-dark);font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;margin-bottom:8px}
.cabin-card h3{font-size:22px;margin-bottom:8px}
.cabin-card p{color:var(--muted);font-size:14px;margin-bottom:14px}
.cabin-features{list-style:none;margin-bottom:18px}
.cabin-features li{font-size:13px;color:var(--ink);padding:4px 0;display:flex;align-items:center;gap:8px}
.cabin-features li::before{content:'✓';color:var(--accent-dark);font-weight:bold}

/* gallery */
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:800px){.gallery-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.gallery-grid{grid-template-columns:1fr}}
.g-item{border-radius:12px;overflow:hidden;height:240px;position:relative;background:#eee}
.g-item img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.g-item:hover img{transform:scale(1.05)}
.g-item span{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.75));color:#fff;font-size:12px;padding:24px 12px 10px;font-weight:500}

/* why choose us */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
@media(max-width:960px){.why-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.why-grid{grid-template-columns:1fr}}
.why{padding:0 0 22px;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;background:#fff}
.why img{width:100%;height:170px;object-fit:cover;margin-bottom:16px}
.why h3,.why p{padding:0 22px}
.why h3{font-size:18px;margin-bottom:8px}
.why p{font-size:14px;color:var(--muted)}

/* steps */
.steps{background:var(--primary);color:#fff}
.steps h2,.steps .eyebrow{color:#fff}
.steps .eyebrow{color:var(--accent)}
.steps .sec-head p{color:#c9d3dd}
.step-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
@media(max-width:820px){.step-grid{grid-template-columns:1fr}}
.step{border:1px solid rgba(255,255,255,.18);border-radius:var(--radius);padding:28px;background:rgba(255,255,255,.04)}
.step .n{font-family:'Playfair Display',serif;font-size:38px;color:var(--accent);line-height:1;margin-bottom:12px}
.step h3{color:#fff;font-size:20px;margin-bottom:8px}
.step p{color:#c9d3dd;font-size:14px}

/* faq */
.faq{max-width:820px;margin:0 auto}
details{border-bottom:1px solid var(--line);padding:18px 0}
summary{cursor:pointer;font-weight:600;font-size:17px;color:var(--primary);list-style:none;display:flex;justify-content:space-between;gap:16px}
summary::-webkit-details-marker{display:none}
summary::after{content:'+';font-size:24px;color:var(--accent-dark);line-height:1}
details[open] summary::after{content:'−'}
details p{margin-top:12px;color:var(--muted);font-size:15px}

/* cta */
.cta-band{background:linear-gradient(120deg,var(--primary),#1d4468);color:#fff;text-align:center;padding:64px 0}
.cta-band h2{color:#fff;font-size:clamp(26px,3.8vw,38px);margin-bottom:12px}
.cta-band p{max-width:600px;margin:0 auto 26px;color:#d4dde6}

/* footer */
footer{background:var(--primary-dark);color:#b9c4cf;padding:56px 0 24px;font-size:14px}
.f-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:36px;margin-bottom:36px}
@media(max-width:860px){.f-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.f-grid{grid-template-columns:1fr}}
footer h4{color:#fff;font-size:16px;margin-bottom:14px}
footer ul{list-style:none}
footer li{margin-bottom:8px}
footer a:hover{color:var(--accent)}
.copy{border-top:1px solid rgba(255,255,255,.12);padding-top:20px;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}

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
    tabs = [
        ("overview", "Overview", f"{base_path}/{train_slug}"),
        ("itinerary", "Itinerary", f"{base_path}/{train_slug}/itinerary"),
        ("departures", "Departures", f"{base_path}/{train_slug}/departures"),
        ("price", "Price", f"{base_path}/{train_slug}/price"),
        ("cabins", "Cabins", f"{base_path}/{train_slug}/cabins"),
        ("photo-gallery", "Photo Gallery", f"{base_path}/{train_slug}/photo-gallery"),
    ]
    links_html = "".join([
        f'<a href="{url}" class="{"active" if active_tab==k else ""}">{label}</a>'
        for k, label, url in tabs
    ])
    return f"""
<div class="train-subnav">
  <div class="wrap">
    {links_html}
  </div>
</div>
"""

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
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
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
      <span>LUXURY TRAINS OF INDIA</span>
    </div>
    <h1>Travel India Like Royalty, On Board a Palace on Wheels</h1>
    <p>Four iconic luxury trains. One personal travel team. Tell us your dates and we will help you pick the right train, journey and cabin, then send a quote on WhatsApp and email.</p>
    <div class="hero-ctas">
      <a class="btn-koikoi-orange" href="#trains">
        <span>Explore the 4 Trains</span>
        <span>&rarr;</span>
      </a>
      <a class="btn-koikoi-white" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20a%20quote%20for%20a%20luxury%20train%20journey." target="_blank" rel="noopener">
        <span>Get a Free Quote</span>
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

<!-- COMPARE -->
<section id="compare">
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Quick Compare</div>
      <h2>Which Train Is Right for You?</h2>
      <p>Not sure where to start? This table shows the main differences. Or just message us and we will suggest one.</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Train</th><th>Region</th><th>Journeys</th><th>Duration</th><th>Season</th><th>Starts from</th></tr>
        </thead>
        <tbody>
          <tr><td>Palace on Wheels</td><td>Rajasthan &amp; Agra</td><td>1</td><td>7N / 8D</td><td>Oct – Mar (peak)</td><td>Delhi</td></tr>
          <tr><td>Maharajas' Express</td><td>Rajasthan, Central &amp; North India</td><td>4</td><td>3N / 4D, 6N / 7D</td><td>Oct – Apr</td><td>Delhi or Mumbai</td></tr>
          <tr><td>Golden Chariot</td><td>Karnataka, Goa, Tamil Nadu, Kerala</td><td>3</td><td>3N / 4D, 5N / 6D</td><td>Oct – Mar</td><td>Bengaluru</td></tr>
          <tr><td>Deccan Odyssey</td><td>Maharashtra, Rajasthan, Gujarat, Golden Triangle</td><td>6</td><td>7N / 8D</td><td>Sep – May</td><td>Mumbai or Delhi</td></tr>
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

    # Maharajas' Express: Overview
    me_overview = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{me_data["banner"]}');">
  <div class="wrap">
    <span class="tag">MAHARAJAS' EXPRESS · OVERVIEW</span>
    <h1>The World's Leading Luxury Train</h1>
    <p>Half a mile of sheer royal opulence. 23 carriages, state-of-the-art pneumatic air suspension, and the legendary 448 sq.ft Presidential Suite.</p>
    <div class="cta">
      <a class="btn btn-gold" href="{base_path}/maharajas-express/itinerary">Explore 4 Journeys</a>
      <a class="btn btn-line" href="{base_path}/maharajas-express/departures">Departure Dates</a>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">World Travel Awards Winner</div>
      <h2>Unrivaled Sophistication Across India</h2>
      <p>Voted 'World's Leading Luxury Train' 7 times in a row. Featuring two peacock- and fresco-themed restaurants with gold-edged Limoges plates, two plush lounge bars, and 24/7 personal butlers.</p>
    </div>
    <div class="grid-4" style="margin-bottom:48px">
      <div class="card" style="padding:24px">
        <h3>4 Distinct Journeys</h3>
        <p>Choose from 3 Nights / 4 Days Golden Triangle or 6 Nights / 7 Days pan-India routes connecting Mumbai, Delhi, Varanasi and Khajuraho.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Navratna Presidential Suite</h3>
        <p>The only train suite occupying an entire 23-meter carriage with 2 master bedrooms, separate salon and private bathtub.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Rang Mahal & Mayur Mahal</h3>
        <p>Fine-dining restaurant cars serving chef-curated Indian thalis and continental grills with Swarovski glassware.</p>
      </div>
      <div class="card" style="padding:24px">
        <h3>Safari Bar & Rajah Club</h3>
        <p>Complimentary house wines, beers, and premium spirits included throughout your journey.</p>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/index.html", 
               "Maharajas' Express Luxury Train | 4 Journeys & Opulence | KoiKoi Travel",
               "Discover the Maharajas' Express luxury train: 4 journeys, Presidential suite, fine dining cars and departure calendar.",
               me_overview, active_train="maharajas-express", active_tab="overview", base_path=base_path)

    # Maharajas' Express: Itinerary
    me_itinerary = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{me_data["banner"]}');">
  <div class="wrap">
    <span class="tag">MAHARAJAS' EXPRESS · ITINERARIES</span>
    <h1>4 Iconic Royal Journeys</h1>
    <p>Choose between short 4-day imperial tours or full-week pan-India odysseys.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="day-card">
      <span class="day-badge">Circuit 1 · 7 Days / 6 Nights</span>
      <h3>The Heritage of India: Mumbai to Delhi</h3>
      <p><strong>Route:</strong> Mumbai → Udaipur → Jodhpur → Bikaner → Jaipur → Ranthambore → Agra → Delhi.<br>
      Highlights include Lake Pichola boat ride, Junagarh Fort private palace dinner, Amber Fort elephant welcome, Ranthambore tiger safari and sunrise at the Taj Mahal.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 2 · 7 Days / 6 Nights</span>
      <h3>The Indian Panorama: Delhi to Delhi</h3>
      <p><strong>Route:</strong> Delhi → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Orchha → Khajuraho → Varanasi → Delhi.<br>
      Highlights include evening Ganga Aarti boat ride in Varanasi, UNESCO Khajuraho temples, Taj Mahal and Ranthambore tiger safari.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 3 · 7 Days / 6 Nights</span>
      <h3>The Indian Splendour: Delhi to Mumbai</h3>
      <p><strong>Route:</strong> Delhi → Agra → Ranthambore → Jaipur → Bikaner → Jodhpur → Udaipur → Mumbai.<br>
      Highlights include Agra Fort, Bikaner sand dunes banquet, Mehrangarh Fort champagne cocktail and royal farewell in Mumbai.</p>
    </div>
    <div class="day-card">
      <span class="day-badge">Circuit 4 · 4 Days / 3 Nights</span>
      <h3>Treasures of India: Delhi to Delhi</h3>
      <p><strong>Route:</strong> Delhi → Agra → Ranthambore → Jaipur → Delhi.<br>
      The ultimate express luxury Golden Triangle trip featuring the Taj Mahal, wildlife safari in Ranthambore and City Palace Jaipur.</p>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/itinerary/index.html", 
               "Maharajas' Express Itineraries: Heritage of India, Indian Panorama | KoiKoi Travel",
               "Explore all 4 itineraries on Maharajas' Express: 6N/7D and 3N/4D royal journeys across Rajasthan and Varanasi.",
               me_itinerary, active_train="maharajas-express", active_tab="itinerary", base_path=base_path)

    # Maharajas' Express: Departures
    me_departures = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{me_data["banner"]}');">
  <div class="wrap">
    <span class="tag">MAHARAJAS' EXPRESS · DEPARTURES</span>
    <h1>2024–2025 & 2025–2026 Departure Schedule</h1>
    <p>Seasonal departures between October and April every year.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Journey Name</th><th>Duration</th><th>2024–2025 Departures</th><th>2025–2026 Departures</th></tr></thead>
        <tbody>
          <tr><td>The Heritage of India</td><td>6N / 7D</td><td>12 Oct, 09 Nov, 07 Dec 2024; 04 Jan, 01 Feb, 01 Mar, 29 Mar 2025</td><td>11 Oct, 08 Nov, 06 Dec 2025; 03 Jan, 31 Jan, 28 Feb 2026</td></tr>
          <tr><td>The Indian Panorama</td><td>6N / 7D</td><td>26 Oct, 23 Nov, 21 Dec 2024; 18 Jan, 15 Feb, 15 Mar 2025</td><td>25 Oct, 22 Nov, 20 Dec 2025; 17 Jan, 14 Feb, 14 Mar 2026</td></tr>
          <tr><td>The Indian Splendour</td><td>6N / 7D</td><td>19 Oct, 16 Nov, 14 Dec 2024; 11 Jan, 08 Feb, 08 Mar 2025</td><td>18 Oct, 15 Nov, 13 Dec 2025; 10 Jan, 07 Feb, 07 Mar 2026</td></tr>
          <tr><td>Treasures of India</td><td>3N / 4D</td><td>03 Nov, 01 Dec, 29 Dec 2024; 26 Jan, 23 Feb, 23 Mar 2025</td><td>02 Nov, 30 Nov, 28 Dec 2025; 25 Jan, 22 Feb, 22 Mar 2026</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/departures/index.html", 
               "Maharajas' Express Departure Dates 2024-2025 & 2026 | KoiKoi Travel",
               "Complete calendar of departure dates for all 4 Maharajas' Express luxury train journeys.",
               me_departures, active_train="maharajas-express", active_tab="departures", base_path=base_path)

    # Maharajas' Express: Price
    me_price = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{me_data["banner"]}');">
  <div class="wrap">
    <span class="tag">MAHARAJAS' EXPRESS · TARIFF</span>
    <h1>Official Tariff & Cabin Prices</h1>
    <p>All-inclusive fares covering luxury suite, all gourmet meals, house spirits, and guided excursions.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Cabin Category</th><th>Treasures of India (3N/4D)</th><th>7-Day Journeys (6N/7D)</th><th>Key Privileges</th></tr></thead>
        <tbody>
          <tr><td>Deluxe Cabin</td><td>$4,890 USD</td><td>$7,570 USD</td><td>Twin/Double, en-suite bathroom, 24/7 butler</td></tr>
          <tr><td>Junior Suite</td><td>$5,900 USD</td><td>$10,230 USD</td><td>Larger area, picture windows, writing desk</td></tr>
          <tr><td>Suite</td><td>$8,900 USD</td><td>$15,500 USD</td><td>Living room + master bedroom + private car</td></tr>
          <tr><td>Presidential Suite</td><td>$14,500 USD</td><td>$24,900 USD</td><td>Entire carriage (448 sq.ft), 2 bedrooms, bathtub</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/price/index.html", 
               "Maharajas' Express Ticket Price & Cabin Tariff | KoiKoi Travel",
               "Official prices for Maharajas' Express Deluxe cabins, Junior suites and Presidential suite in USD & INR.",
               me_price, active_train="maharajas-express", active_tab="price", base_path=base_path)

    # Maharajas' Express: Cabins
    me_cabins = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{me_data["banner"]}');">
  <div class="wrap">
    <span class="tag">MAHARAJAS' EXPRESS · CABINS</span>
    <h1>4 Palatial Cabin Categories</h1>
    <p>From luxurious Deluxe Cabins to the sprawling Navratna Presidential Suite.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="cabin-grid">
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/deluxe-cabin.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">112 sq. ft.</span>
          <h3>Deluxe Cabin</h3>
          <p>Features state-of-the-art climate control, RFID electronic door locks, en-suite bathroom with shower stall, and complimentary Wi-Fi.</p>
        </div>
      </div>
      <div class="cabin-card">
        <div class="cabin-photo" style="background-image:url('/images/luxury-trains/maharajas-express/suite.jpg')"></div>
        <div class="cabin-body">
          <span class="cabin-size">220 sq. ft.</span>
          <h3>Executive Suite</h3>
          <p>Features a separate living room, master bedroom, complimentary stocked minibar, and private chauffeur-driven luxury car for off-train tours.</p>
        </div>
      </div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/cabins/index.html", 
               "Maharajas' Express Cabins & Presidential Suite Layout | KoiKoi Travel",
               "Explore the 4 cabin types on Maharajas' Express including dimensions, amenities and Navratna Presidential suite.",
               me_cabins, active_train="maharajas-express", active_tab="cabins", base_path=base_path)

    # Maharajas' Express: Gallery
    me_gallery = f"""
<section class="hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,.60) 0%,rgba(0,0,0,.25) 45%,transparent 80%),url('{me_data["banner"]}');">
  <div class="wrap">
    <span class="tag">MAHARAJAS' EXPRESS · GALLERY</span>
    <h1>Photo Gallery</h1>
    <p>Glimpse inside the World's Leading Luxury Train.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="gallery-grid">
      <div class="g-item"><img src="/images/luxury-trains/maharajas-express/hero.jpg"><span>Maharajas' Express Train</span></div>
      <div class="g-item"><img src="/images/luxury-trains/maharajas-express/dining-pink.jpg"><span>Rang Mahal Dining Car</span></div>
      <div class="g-item"><img src="/images/luxury-trains/maharajas-express/deluxe-cabin.jpg"><span>Deluxe Double Cabin</span></div>
      <div class="g-item"><img src="/images/luxury-trains/maharajas-express/suite.jpg"><span>Royal Suite Bedroom</span></div>
    </div>
  </div>
</section>
"""
    write_page(f"{base_dir}/maharajas-express/photo-gallery/index.html", 
               "Maharajas' Express Photo Gallery | Interior & Exterior | KoiKoi Travel",
               "High resolution photos of Maharajas' Express luxury train: restaurants, bar lounges, suites and excursions.",
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
