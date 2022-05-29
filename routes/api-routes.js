const connectionCheck = require("../config/config");

const {
  queryLead,
  returnLocalLeads,
} = require("../services/assign-leads-to-campaign");

module.exports = function (app) {
  app.get("/api/assign-leads", async (req, res) => {
    const leads = await returnLocalLeads();
    // minimum viable integration - sending single record id on req {}
    req.searchId = leads.records[0].Id;
    conn = await connectionCheck();
    queryLead(req, res);
  });
};
