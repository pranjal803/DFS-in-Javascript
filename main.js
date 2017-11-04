const _ = require("lodash")
const Promise = require("bluebird")
const fs = Promise.promisifyAll(require('fs'))
const NAME = process.argv[2]
const FILE_PATHS = process.argv.slice(3);


var fileData = {};

Promise.map(FILE_PATHS, (fileName)=>{  
  return fs.readFileAsync(fileName, 'utf8')
}).then((fileContents)=>{
  _.forEach(fileContents, (content)=>{
    var myFileContent = JSON.parse(content);
    fileData[myFileContent.name] = myFileContent.friends; 
  })
  
  var mainArr = [];
  function search(element){
    var myFriends = fileData[element];
    _.forEach(myFriends, function(friend){
      if(_.indexOf(mainArr, friend.name) == -1){
        mainArr.push(friend.name);
        search(friend.name);
      }
    })
  }

  
  mainArr.push(NAME);
  search(NAME);
  
  _.forEachRight(mainArr, (val)=>{
    console.log(val);
  })
})


