// *********************************************************************************
// fs-routes.js - this file offers a set of routes for displaying data via fs to the client
// *********************************************************************************
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const leadsFileName = path.resolve("./", "leads.json");

// promise pattern to synchronously read file and return file json
const readLeadsFilePromise = promisify(fs.readFile);
async function jsonModule() {
  try {
    const leadsFile = await readLeadsFilePromise(leadsFileName, "utf8");
    // parse leadsFile "string" to "object"
    parsedLeadsFile = JSON.parse(leadsFile);
    return parsedLeadsFile;
    // console.log(parsedLeadsFile.records[0]);
  } catch (err) {
    console.log(err);
    return [];
  }
}

module.exports = jsonModule;
