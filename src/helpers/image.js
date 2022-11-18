const fs = require("fs");
const moment = require("moment");
const path = require("path");

const saveLocally = async ({ folder, image }) => {
    
    const { createReadStream, filepath } = image;
    console.log(filepath)
    const { ext, name } = path.parse(filepath);
    const time = moment().format("DDMMYYYY_HHmmss");
    const newName = `${name}${ext}`; //`${name}_${time}${ext}`
    const imageFile = `images/${folder}/${newName}`;

   // const stream = createReadStream();

    const pathName = path.join(path.resolve("."), `/public/images/${folder}/${newName}`);

    return new Promise(async (resolve, reject) => {
        /*const out = fs.createWriteStream(pathName);
        await stream.pipe(out);

        stream.on('close', () => { 
            resolve(pathName);
        });*/

        fs.writeFile(pathName, image, err => {
            if(err) {
                reject(err)
            }

            resolve(pathName)
        })
    });
};

const saveImage = async ({ folder, image }) => {
    const pathname = await saveLocally({ folder, image });
    
    return pathname;
};

module.exports = { saveImage, saveLocally }