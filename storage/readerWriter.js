'use strict';
const fs=require('fs').promises;


async function readFile(filePath) {
    try{
const data=await fs.readFile(filePath,'utf8');
return JSON.parse(data);
    }catch(error){
        console.log(error.message);
        return [];
    }
}

async function writeToFile(filePath,data) {
try{
    await fs.writeFile(filePath,JSON.stringify(data,null,4),{
encoding:'utf8',
flag:'w'
    })
    return true;
} catch(error){
console.log(error.message);
return false;
}
}

module.exports={readFile,writeToFile};