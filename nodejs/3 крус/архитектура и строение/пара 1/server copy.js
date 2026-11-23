const fs = require("fs")


//Неблокирующий (ассинхронный) способ чтения файла
fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data)
    console.log("File read successfully")
})  