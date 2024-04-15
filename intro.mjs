import PQueue from "p-queue";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080},
    // slowMo: 170,
    userDataDir: "Data"
});

const page = await browser.newPage()
await page.goto("https://duckduckgo.com", {waitUntil: 'networkidle2'})
await page.waitForSelector("#searchbox_homepage")
await page.type("#searchbox_homepage",'devconfbd')

const searchButtonHandel = await page.waitForSelector("button[aria-label='Search']", { timeout: 20000 });
await searchButtonHandel.click()


const firstResult = await page.waitForSelector('[data-testid="result-title-a"]')
await firstResult.click();

await page.waitForSelector('.sponsors a, .supporter a');
const sponsorslinks= await page.evaluate(()=>{
return [...document.querySelectorAll('.sponsors a')].map(e=>e.href)

})
const supporterlinks= await page.evaluate(()=>{
return [...document.querySelectorAll('.supporter a')].map(e=>e.href)

})

console.log({sponsorslinks, supporterlinks});


async function getLink(link){
    const page = await browser.newPage()
    await page.goto(link, {waitUntil: 'networkidle2'})
    const title = await page.title()
    const hostname = await page.evaluate(()=>window.location.hostname)
    await page.screenshot({path: '${hostname}.png'})
   const facebookLink = await page.evaluate(()=>document.querySelector('a[href*=facebook]')?.href)
    console.log({link, title, hostname, facebookLink})
    await page.close();
}
const queue = new PQueue({concurrency: 2})

for (let link of supporterlinks){
    queue.add(()=>getLink(link)).catch(console.log)
}

await queue.onEmpty()


await browser.close();





// const guestElement = await page.waitForSelector("img[alt='guest']")
// await guestElement.scrollIntoView();
// await setTimeout(1000)

// await guestElement.click("img[alt='guest']")
// await setTimeout(1000)

// await page.screenshot({path: "guest.png"});














