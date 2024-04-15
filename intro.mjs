import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises"

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080},
    slowMo: 170,
    userDataDir: "Data"
});

const page = await browser.newPage()
await page.goto("https://duckduckgo.com", {waitUntil: 'networkidle2'})
await page.waitForSelector("#searchbox_homepage")
await page.type("#searchbox_homepage",'devconfbd.com')

const searchButtonHandel = await page.waitForSelector("button[aria-label='Search']", { timeout: 20000 });
await searchButtonHandel.click()


const firstResult = await page.waitForSelector('[data-testid="result-title-a"]')
await firstResult.click()

const guestElement = await page.waitForSelector("img[alt='guest']")
await guestElement.scrollIntoView();
await setTimeout(1000)

await guestElement.click("img[alt='guest']")
await setTimeout(1000)

await page.screenshot({path: "guest.png"});
await browser.close();






















// const firstResult = await page.waitForSelector("//span[normalize-space()='Rabbii96 (Rabbii96) · GitHub']")
// await firstResult.click()

// await firstResult.screenshot({ path: "duckduckgo1.png"})

