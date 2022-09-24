fs = require('fs');

function cat(path) {

  fs.readFile(path, 'utf8', function(err, data) {     
    if (data) {
      console.log(data);
    }
  });
}

cat(process.argv[2]);