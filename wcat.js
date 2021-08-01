let fs = require("fs");
let inputArr = process.argv.slice(2);


let filesArr = inputArr;

for(let i=0;i<filesArr.length;i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans==false){
        console.log("File doesn't exist");
        return;
    }
}

let content = "";
for(let i=0;i<filesArr.length;i++){
    content += fs.readFileSync(filesArr[i]);
}

console.log(content);


                        /* Above prints the contents of the files given as input */


let optionsArr = [];
let filesArr = [];

// getting commands

for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        optionsArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}

// console.log(optionsArr, inputArr)

//Check for file existence
for(let i=0;i<filesArr.length;i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans==false){
        console.log("File doesn't exist");
        return;
    }
}

//check for both commands simultaneously
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-n");
if (isBothPresent==true) {
    console.log("either enter -n or -b option");
    return;
}


let content = ""
for(let i=0;i<filesArr.length;i++){
    content += fs.readFileSync(filesArr[i]) + "\r\n";
}

let contentArr = content.split("\r\n"); // Content Array is made

//-s check (Converts big line breaks to singular line breaks)

let isSPresent = optionsArr.includes("-s");
if(isSPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i] == "" && contentArr[i-1]==""){
            contentArr[i] = null;
        }
        else if(contentArr[i]==""  && contentArr[i-1]==null){
            contentArr[i] = null;
        }
    }

    let tempArr = []; //this adds the content which is not equal to null
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i] !== null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
    console.log(contentArr.join("\n"));
}


// -n check (Gives numbering to all lines)

let isNPresent = optionsArr.includes("-n");
if(isNPresent){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i] = `${i+1} ${contentArr[i]}` 
    }
    console.log(contentArr.join("\n"));
}


// -b check (Gives numbering to non-empty lines)

let isBPresent = optionsArr.includes("-b");
if(isBPresent){
    let counter = 1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i] = `${counter} ${contentArr[i]}` ;
            counter++;
        }    
    }
    console.log(contentArr.join("\n"));
}