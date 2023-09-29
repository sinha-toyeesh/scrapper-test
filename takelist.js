const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const amazn = require("./amazon_price.js");

module.exports = {
  //export start function

  start: async function (link) {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        /////////////////////////

        var pathArray = link.split("/");
        var protocol = pathArray[0];
        var host = pathArray[2];
        var baseUrl = protocol + "//" + host;
        console.log(baseUrl);

        /////////////////////////

        await page.goto(link);
        //   await page.screenshot({ path: "example.png", fullPage: true });

        const titles = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll(
              "#search-result-items > li > div > div.variant-desc > span.variant-title > a"
            )
          ).map((x) => x.getAttribute("title"));
        });

        const linksArr = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll(
              "#search-result-items > li > div > div.variant-desc > span.variant-title > a"
            )
          ).map((x) => x.getAttribute("href"));
        });

        const pricesArr = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll(
              "#search-result-items > li > div > div.variant-desc > span.price > span.variant-final-price > span"
            )
          ).map((x) => x.textContent);
        });

        // const imgArr = await page.evaluate(() => {
        //   return Array.from(
        //     document.querySelectorAll(
        //       "#search-result-items > li > div > div.variant-image > a > span > span:nth-child(3) > img"
        //     )
        //   ).map((x) => str(x.getAttribute("src")));
        // });

        const imgArr = await page.$$eval(".variant-image img[src]", (imgs) =>
          imgs.map((img) => img.getAttribute("src"))
        );

        for (let i = 0; i < linksArr.length; i++) {
          linksArr[i] = baseUrl + linksArr[i];
        }

        // console.log(titles);
        // console.log(linksArr);
        // console.log(pricesArr);
        // console.log(imgArr);

        // create an array to store result of each title from amazon

        var amznArr = [];

        for (let i = 0; i < titles.length; i++) {
          amznArr.push(await amazn.start(titles[i]));
        }

        console.log(amznArr);

        // var jsonArr = [];
        // for (let i = 0; i < titles.length; i++) {
        //   jsonArr.push({
        //     title: titles[i],
        //   });
        // }

        // console.log(jsonArr);

        // await fs.writeFile("prices.json", JSON.stringify(jsonArr));

        var jsonArr = [];
        for (let i = 0; i < titles.length; i++) {
          jsonArr.push({
            title: titles[i],
            link: linksArr[i],
            price: pricesArr[i],
            img: imgArr[i],
            amazonPrice: amznArr[i],
          });
        }

        console.log(jsonArr);

        await fs.writeFile("links.json", JSON.stringify(jsonArr));

        // const names = await page.evaluate(() => {

        // fs.writeFile("links.txt", names.join("\n"));

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
