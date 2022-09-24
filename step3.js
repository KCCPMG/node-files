fs = require('fs');
axios = require('axios');

async function cat(path) {
  file = await fs.promises.readFile(path, 'utf8');
  return file;
}

async function webCat(url) {
  let res = await axios.get(url)
  return res.data;
}

function determineAndCat(str) {

  if (fs.existsSync(str)) {
    cat(str)
  } else {
    try {
      webCat(str)
    } catch(e) {
      console.log(e);
    }
  }
}


async function printOutput(inputPath) {
  try {
    let input;
    if (fs.existsSync(inputPath)) {
      input = await cat(inputPath)
    } else {
      input = await webCat(inputPath);
    }
    console.log(input)
  } catch(e) {
    console.log(e);
  }
}


function handlePath() {
  console.log(process.argv)

  if (process.argv[2] == "--out") {
    writeOutput(process.argv[4], process.argv[3]);
  } else {
    printOutput(process.argv[2])
  }

}

handlePath();


