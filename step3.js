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

async function writeOutput(inputPath, outputPath) {
  
  try {
    let input;
    if (fs.existsSync(inputPath)) {
      input = await cat(inputPath)
    } else {
      input = await webCat(inputPath);
    }
    await fs.promises.writeFile(outputPath, input);
    return;
  } catch(e) {
    console.log(e);
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

  if (process.argv[2] == "--out") {
    writeOutput(process.argv[4], process.argv[3]);
  } else {
    printOutput(process.argv[2])
  }
}

handlePath();
