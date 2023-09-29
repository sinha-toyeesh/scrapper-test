const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs/promises");

const { executablePath } = require("puppeteer");

module.exports = {
  //export start function

  start: async function (search) {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer
          .launch({
            headless: true,
            executablePath: executablePath(),
          })
          .then(async (browser) => {
            const page = await browser.newPage();

            await page.setUserAgent(
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            );

            /////////////////////////

            var baseUrl = "https://www.amazon.in/s?k=";

            const seacrhArr = search.split(" ");

            for (let i = 0; i < seacrhArr.length; i++) {
              // console.log(search[i]);
              baseUrl += seacrhArr[i];
              baseUrl += "+";
            }

            baseUrl = baseUrl.slice(0, -1);

            console.log(baseUrl);

            /////////////////////////

            await page.goto(baseUrl);
            await page.screenshot({ path: "example.png", fullPage: true });

            const titles = await page.evaluate(() => {
              return document.querySelector("span.a-price-whole").innerHTML;
            });

            

            await browser.close();

            resolve(titles);

          });

        /////////////////////////

        // const linksArr = await page.evaluate(() => {
        //   return Array.from(
        //     document.querySelectorAll(
        //       "#search-result-items > li > div > div.variant-desc > span.variant-title > a"
        //     )
        //   ).map((x) => x.getAttribute("href"));
        // });

        // const pricesArr = await page.evaluate(() => {
        //   return Array.from(
        //     document.querySelectorAll(
        //       "#search-result-items > li > div > div.variant-desc > span.price > span.variant-final-price > span"
        //     )
        //   ).map((x) => x.textContent);
        // });

        // const imgArr = await page.evaluate(() => {
        //   return Array.from(
        //     document.querySelectorAll(
        //       "#search-result-items > li > div > div.variant-image > a > span > span:nth-child(3) > img"
        //     )
        //   ).map((x) => str(x.getAttribute("src")));
        // });

        // const imgArr = await page.$$eval(".variant-image img[src]", (imgs) =>
        //   imgs.map((img) => img.getAttribute("src"))
        // );

        // for (let i = 0; i < linksArr.length; i++) {
        //   linksArr[i] = baseUrl + linksArr[i];
        // }

        // console.log(titles);
        // console.log(linksArr);
        // console.log(pricesArr);
        // console.log(imgArr);

        // var jsonArr = [];
        // for (let i = 0; i < titles.length; i++) {
        //   jsonArr.push({
        //     title: titles,
        //   });
        // }

        // console.log(jsonArr);

        // await fs.writeFile("prices.json", JSON.stringify(jsonArr));

        // const names = await page.evaluate(() => {

        // fs.writeFile("links.txt", names.join("\n"));

        // await browser.close();

        //make it return titles

        
      } catch (error) {
        reject(error);
      }
    });
  },
};

// async function start() {

// }
