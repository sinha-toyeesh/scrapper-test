var fs = require("fs");
const takelist = require("./takelist.js");

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

  var link =
    "https://mkp.gem.gov.in/non-metals-and-pure-and-elemental-gases-compressed-oxygen-gas/search";

  takelist
    .start(link)
    .then(() => {
      console.log("Execution completed successfully.");
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  // console.log(await unlinkPromise("names.txt"));

  //delete names.txt
}

(async () => {
  console.log("1");
  await main();
  console.log("2");
})();
