const puppeteer = require("puppeteer");
const fs = require("fs/promises");

module.exports = {
  //export start function

  start: async function (search, val) {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        /////////////////////////

        var baseUrl = "https://www.amazon.in/s?k=";

        const seacrhArr = search.split(" ");

        for (let i = 0; i < seacrhArr.length; i++) {
          // console.log(search[i]);
          baseUrl += seacrhArr[i];
          baseUrl += "+";
        }

        baseUrl.slice(0, -1);

        console.log(baseUrl);

        /////////////////////////

        await page.goto(baseUrl);
        await page.screenshot({ path: "example.png", fullPage: true });

        const titles = await page.evaluate(() => {
          return document.querySelector(
            "#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t1.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(6) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span > span:nth-child(2) > span.a-price-whole"
          ).innerHTML;
        });

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

        console.log(titles);
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

        val = titles;

        await browser.close();

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
};

// async function start() {

// }
