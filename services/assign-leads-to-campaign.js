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
// query SF Lead table based on searchId provided via returnLocalLeads() and call queryCampaign on success
const queryLead = (req, res) => {
  conn
    .query(
      `SELECT Id, Name, ProductInterest__c FROM Lead WHERE id = '${req.searchId}'`
    )
    .on("record", (leadRecord) => {
      queryCampaign(req, res, leadRecord);
    })
    .on("error", (err) => {
      res.status(404).send(err);
    });
};

// query SF Campaign table for applicable campaign record and call createCampaignMember on success
const queryCampaign = (req, res, leadRecord) => {
  conn
    .query(
      `SELECT Id, Name FROM Campaign WHERE Name = '${leadRecord.ProductInterest__c}'`
    )
    .on("record", (campaignRecord) => {
      createCampaignMember(req, res, campaignRecord);
    })
    .on("error", (err) => {
      res.status(404).send(err);
    });
};

// create new CampaignMember based on provided LeadId and identified CampaignId
const createCampaignMember = (req, res, campaignRecord) => {
  conn
    .sobject("CampaignMember")
    .create(
      { CampaignId: campaignRecord.Id, LeadId: req.searchId },
      function (err, ret) {
        if (err || !ret.success) {
          // return error response if campaign member is already established
          return res.status(404).send(err.message);
        }
        // send CampaignMemberId back to client
        res.send(
          `<h1> Lead ${req.searchId} assocaited to Campaign ${campaignRecord.Id} via CampaignMember ${ret.id}</h1>`
        );
      }
    );
};

module.exports = function (app) {
  app.get("/api/assign-leads", async (req, res) => {
    const leads = await returnLocalLeads();
    req.searchId = leads.records[0].Id;
    conn = await connectionCheck();
    queryLead(req, res);
  });
};
