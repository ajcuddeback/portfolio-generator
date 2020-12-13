const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const writeFile = fileContent => {
    // they keyword new will create a new object
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err)
                return;
            }
            resolve({
                ok: true,
                message: 'Style sheet copied successfully!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };