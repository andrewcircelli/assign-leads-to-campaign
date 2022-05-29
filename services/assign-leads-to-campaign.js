const res = require("express/lib/response");
const connectionCheck = require("../config/config");
const jsonModule = require("./fs-module");
// Return record from fs function
// SOQL on record.id
// Update operation on Campaign

async function returnLocalLeads() {
  let leads = await jsonModule();
  return leads;
}
const queryLead = (req, res, next) =>
  conn
    .query(`SELECT Id, Name FROM Lead WHERE id = '${req.searchId}'`)
    .on("record", (leadRecord) => {
      res.send(leadRecord);
      next();
    })
    .on("error", (err) => {
      res.status(404).send(err);
    });

module.exports = function (app) {
  app.get("/api/assign-leads", async (req, res, next) => {
    const leads = await returnLocalLeads();
    req.searchId = leads.records[0].Id;
    conn = await connectionCheck();
    queryLead(req, res, next);
  });
};

// conn.search(
//   "FIND {Un*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)",
//   function (err, res) {
//     if (err) {
//       return console.error(err);
//     }
//     console.log(res);
//   }
// );
