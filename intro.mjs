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

await browser.close();