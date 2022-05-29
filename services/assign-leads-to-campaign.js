const connectionCheck = require("../config/config");
const jsonModule = require("./fs-module");
// Return record from fs function
// SOQL on record.id
// Update operation on Campaign

async function returnLocalLeads() {
  let leads = await jsonModule();
  console.log(leads);
  return leads;
}

returnLocalLeads();

module.exports = function (app) {
  app.get("/api/account/assign-leads", (req, res) => {
    conn.sobject("Account").retrieve(req.params.id, (err, account) => {
      if (err) {
        console.log(err);
        res
          .status(404)
          .send(`<h1> Invalid Request Made to api/account/:id endpoint </h1>`);
      }
      res.status(200).send(account);
    });
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
