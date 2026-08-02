const fs = require("fs");

function readJSON(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "[]");
    }

    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
    readJSON,
    writeJSON
};
