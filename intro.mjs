import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080},
    slowMo: 170,
    userDataDir: "Data"
});

const page = await browser.newPage()
await page.goto("https://example.com/",{
    waitUntil: "networkidle0",
    setTimeout: 3000,
})
await page.screenshot({path: "exam.com.png"})

await page.goto("https://duckduckgo.com", {waitUntil: 'networkidle2'})
await page.waitForSelector("#searchbox_homepage")
await page.type("#searchbox_homepage",'Rabbii96')

const searchButtonHandel = await page.waitForSelector("button[aria-label='Search']", { timeout: 20000 });
await searchButtonHandel.click()

const firstResult = await page.waitForSelector("//span[normalize-space()='Rabbii96 (Rabbii96) · GitHub']")
await firstResult.click()

await firstResult.screenshot({ path: "duckduckgo1.png"})

await browser.close();