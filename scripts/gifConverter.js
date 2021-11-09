/**
 Converts gif to mp4 files with ffmpeg in specified directory.

 Uses @ffmpeg-installer/ffmpeg to install ffmpeg:
 - npm install --save @ffmpeg-installer/ffmpeg

 Usage:
 - `node gifConverter <targetDirectory>`
 - If no directory is specified current directory is used.
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require("child_process");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;


// joining path of directory
let directoryPath = path.join(__dirname, '.');

if (process.argv.length > 2) {
    directoryPath = process.argv[2];
}

console.log(`Transforming gifs in directory ${directoryPath}`);

// passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    // handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // listing all files using forEach
    files.forEach(function (file) {
        let file_array = file.split('.');
        if (file_array[file_array.length - 1] === "gif") {
            const fileNoExtension = file.split('.').slice(0, -1).join('.');
            const originalFile = path.join(directoryPath, file)
            const newFile = path.join(directoryPath, fileNoExtension + ".mp4");

            console.log("### Converting ... " + file);

            const command = `${ffmpegPath} -i ${originalFile} -vf "crop=trunc(iw/2)*2:trunc(ih/2)*2" -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p ${newFile}`;
            console.log(command);
            execSync(command);
        }
    });
});