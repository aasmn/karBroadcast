
var fs = require("fs");
var path = require("path");
var readline = require("readline");

let cityGps = {}
const readliner = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, './resources/gps.txt')),
});
 
readliner.on('line', function(str) {
    // console.log(str)
    const arr = str.split(/\s+/);

    let cityName = arr[1]

    
    const cityArr = cityGps[cityName]
    
    if(cityArr){ 
        
    }else{
        cityGps[cityName] = [[arr[3],arr[4]]]
    }
});
 
readliner.on('close', function() {
	fs.writeFile(path.join(__dirname, '../src/gps.json'), JSON.stringify(cityGps),function(err){
        if(err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
})