const puppeteer = require("puppeteer");
const fs = require("fs/promises");

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
          return Array.from(document.querySelectorAll("#search-result-items > li > div > div.variant-desc > span.variant-title > a")).map(
            (x) => x.getAttribute("title")
          );

        });

        const linksArr = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("#search-result-items > li > div > div.variant-desc > span.variant-title > a")).map(
            (x) => x.getAttribute("href")
          );

        


        });

        const pricesArr = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("#search-result-items > li > div > div.variant-desc > span.price > span.variant-final-price > span")).map(
            (x) => x.textContent
          );

        

        });


        for (let i = 0; i < linksArr.length; i++) {
          linksArr[i] = baseUrl + linksArr[i];
        }

        console.log(titles);
        console.log(linksArr);
        console.log(pricesArr);



        var jsonArr = [];
        for (let i = 0; i < titles.length; i++) {
          jsonArr.push({ title: titles[i], link: linksArr[i], price: pricesArr[i] });
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
