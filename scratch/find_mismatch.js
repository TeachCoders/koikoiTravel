const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: '/usr/bin/google-chrome', 
    headless: 'new', 
    args: ['--no-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667, isMobile: true });

  await page.evaluateOnNewDocument(() => {
    // Monkey patch text node updates
    const origDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent') || Object.getOwnPropertyDescriptor(CharacterData.prototype, 'data');
    
    // Listen for errors
    window.addEventListener('error', (e) => {
      console.log('[WINDOW_ERROR]:', e.message, e.filename, e.lineno);
    });

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'characterData') {
          console.log('[MUTATED TEXT]: ' + JSON.stringify({
            oldValue: m.oldValue,
            newValue: m.target.nodeValue,
            parentTag: m.target.parentElement?.tagName,
            parentClass: m.target.parentElement?.className,
            parentHTML: m.target.parentElement?.outerHTML?.substring(0, 150)
          }));
        }
      }
    });

    observer.observe(document, { characterData: true, characterDataOldValue: true, subtree: true });
  });

  page.on('console', msg => {
    if (msg.text().includes('[MUTATED TEXT]') || msg.text().includes('[WINDOW_ERROR]')) {
      console.log(msg.text());
    }
  });

  await page.goto('https://koikoitravel.com', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  await browser.close();
})();
