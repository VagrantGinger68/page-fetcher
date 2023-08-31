const fs = require("fs");
const request = require("request");

const URL = process.argv[2];
const PATH = process.argv[3];
let fileSize;

request(`${URL}`, (error, response, body) => {
  if (error) {
    console.log(error);
    process.exit();
  }
 
  fs.writeFile(`${PATH}`, body, (err) => {
    let stats = fs.statSync(`${PATH}`);

    if (stats.size < 1024) {
      fileSize = stats.size + " bytes";
    } else {
      fileSize = Math.floor((stats.size / 1024) * 100) / 100 + " MB";
    }

    if (err) {
      console.error(err);
    } else {
      console.log(`Downloaded and saved ${fileSize} to ${PATH}`);
    }
  });
});
