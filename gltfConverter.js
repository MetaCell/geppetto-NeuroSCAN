const path = require('path');
const fs = require('fs');
const { execSync } = require("child_process");

// joining path of directory 
let directoryPath = path.join(__dirname, '.');

if (process.argv.length > 2) {
    directoryPath = process.argv[2];
}

console.log(`Transforming objs in directory ${directoryPath}`);

// passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    // handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // listing all files using forEach
    files.forEach(function (file) {
        let file_array = file.split('.');
        if (file_array[file_array.length - 1] === "obj") {
            let fileNoExtension = file.split('.').slice(0, -1).join('.');
            let fileGltf = path.join(directoryPath, fileNoExtension + ".gltf");
            let fileDraco = path.join(directoryPath, fileNoExtension + "_Draco.gltf");
            console.log("### Converting ... " + file);

            const obj2gltfCommand = "npx obj2gltf -i " + `\"${path.join(directoryPath, file)}\"`;
            console.log(obj2gltfCommand);
            execSync(obj2gltfCommand);

            const gltfPipelineCommand = "npx gltf-pipeline -i " + `\"${fileGltf}\"` + " -o " + `\"${fileDraco}\"`
            console.log(gltfPipelineCommand);
            execSync(gltfPipelineCommand);

            fs.unlink(fileGltf, () => { });
            fs.rename(fileDraco, fileGltf, () => { });
        }
    });
});