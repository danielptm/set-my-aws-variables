const fs = require("fs");
const basePath = "/Users";
const readline = require("linebyline");

getAwsCredentialsPath()
.then(function(credentialsPath) {
  getContentsFromCredentialsFile(credentialsPath)
  .then((content) => {
    const aws_access_key_id = "";
    const aws_secret_access_key = "";
    const aws_session_token = "";
    const rl = readline(credentialsPath);
    rl.on('line', function(line, linecount, bytecount) {
      if(line.indexOf("aws_access_key_id") > -1) {
        if(aws_access_key_id != "") {
          aws_access_key_id = getAwsAccessKeyId(line);
        } else if (line.indexOf("aws_secret_access_key") > -1) {
          if (aws_secret_access_key == "") {
            aws_secret_access_key = getSecretAccessKeyId(line);
          }
        } else if (aws_session_token == "") {
          aws_session_token = getSessionToken(line);
        }
      }
    })
  });
});

function getAwsAccessKeyId(content) {
  return ;
}

function getSecretAccessKeyId(content){

}

function getSessionToken() {

}

function getContentsFromCredentialsFile(path) {
  console.log(path);
  return new Promise((resolve, reject) => {
    let fileContent = fs.readFileSync(path, 'utf8');
    resolve(fileContent);
    });
};



function getAwsCredentialsPath() {
  return new Promise((resolve, reject) => {
    fs.readdir(basePath, function(err, files){
      files.forEach(file => {
        fs.readdir(basePath + '/' + file, function(err, item){
          if (item != undefined) {
            item.forEach(object => {
                if(object === '.aws') {
                  resolve(basePath + '/' + file + '/' + object + '/credentials');
                }
            });
          }
        })
      });
    });
  })
}
