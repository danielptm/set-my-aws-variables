const fs = require("fs");
const basePath = "/Users";
const readline = require("linebyline");

const AWS_ACCESS_KEY_ID = "aws_access_key_id";
const AWS_SECRET_ACCESS_KEY = "aws_secret_access_key";
const AWS_SESSION_TOKEN = "aws_session_token";

let aws_access_key_id = "";
let aws_secret_access_key = "";
let aws_session_token = "";

getAwsCredentialsPath()
.then(function(credentialsPath) {
  getContentsFromCredentialsFile(credentialsPath)
  .then((content) => {
    let rl = readline(credentialsPath);
    rl.on('line', function(line, linecount, bytecount) {
      if(line.indexOf(AWS_ACCESS_KEY_ID) > -1) {
        if (aws_access_key_id != "") {
          aws_access_key_id = getAccessKey(line);
        }
      } if (line.indexOf(AWS_SECRET_ACCESS_KEY) > -1) {
        if (aws_secret_access_key == "") {
          aws_secret_access_key = getAccessKey(line);
        }
      } if (line.indexOf(AWS_SESSION_TOKEN) > -1) {
        if (aws_session_token == "") {
          aws_session_token = getAccessKey(line);
        }
      }
    })

    process.env.AWS_ACCESS_KEY_ID = aws_access_key_id;
    process.env.AWS_SECRET_ACCESS_KEY = aws_secret_access_key;
    process.env.AWS_SESSION_TOKEN = aws_session_token;
    process.env.DAN = "ME";

  });
});

function getAccessKey(content) {
  let beg = content.indexOf(" = ") + 3;
  let returnString = content.substring(beg, content.length);
  console.log("*");
  console.log(returnString);
  return returnString;
}

// function getSecretAccessKeyId(content){
//   let beg = content.indexOf("=") + 3;
//   let returnString = content.substring(beg, content.length);
//   console.log(returnString);
//   return returnString;
// }
//
// function getSessionToken() {
//
// }

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
