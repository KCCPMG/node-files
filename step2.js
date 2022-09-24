fs = require('fs');
axios = require('axios');

function cat(path) {

  fs.readFile(path, 'utf8', function(err, data) {     
    if (data) {
      console.log(data);
    }
  });
}

async function webCat(url) {
  
  let res = await axios.get(url)
  console.log(res.data) 
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

determineAndCat(process.argv[2]);