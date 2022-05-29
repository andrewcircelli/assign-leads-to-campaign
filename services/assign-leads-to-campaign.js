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

returnLocalLeads();

module.exports = function (app) {
  // const leads = await returnLocalLeads();
  // const searchId = leads.records[0].id;
  app.get("/api/assign-leads", async (req, res) => {
    const leads = await returnLocalLeads();
    const searchId = leads.records[0].Id;
    conn = await connectionCheck();
    conn.query(
      `SELECT Id, Name FROM Lead WHERE id = '${searchId}'`,
      (err, leads) => {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        }
        res.status(200).send(leads);
      }
    );
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
