var fs = require("fs");
// var amzn = require("./amazon_price.js");
const takelist = require("./takelist.js");

// var search =
//   "hp Intel Core i5 12400 16 GB/ 1000 GB HDD/ Windows 10 Professional";

// function unlinkPromise(file) {
//   return new Promise((resolve, reject) => {
//     fs.unlink(file, (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// }

async function main() {
  console.log("main function");

  var link = "https://mkp.gem.gov.in/computers-desktop-computer/search";

  // var search =
  //   "hp Intel Core i5 12400 16 GB/ 1000 GB HDD/ Windows 10 Professional";

  takelist
    .start(link)
    .then(() => {
      console.log("Execution completed successfully.");
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  // console.log("***************************");

  // console.log(await amzn.start(search));

  // console.log(await unlinkPromise("names.txt"));

  //delete names.txt
}

(async () => {
  console.log("1");
  await main();
  console.log("2");
})();
