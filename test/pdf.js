const puppeteer = require('puppeteer');
const fs = require('fs');
const path = "./test.html";
const content = fs.readFileSync(path, 'utf8');
let pool;

async function getBrowser() {
  if (!pool) {
    pool = await puppeteer.cluster({ count: 2 });
  }
  const browser = await pool.launch();
  return browser;
}

(async () => {
    console.log("Generating pdf...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content);
    const buffer = await page.pdf({});
    await browser.close();
    fs.writeFileSync("generated.pdf", buffer);
    console.log("pdf generated successfully!")
})();
