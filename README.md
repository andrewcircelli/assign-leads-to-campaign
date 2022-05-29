# Salesforce Integration - Assign Leads to Campaign

Salesforce integration exercise using jsforce to assign Leads (Lead) to Campaign (Campaign) via Campaign Member (CampaignMember) table

## Description

Early verison of an integration between a local file system (fs) designed to read the first lead within the local .json file and assigned to a Campaign based on the Lead.ProductInterest__c.

If Lead.ProductInterest__c is equal to any Campaign.Name, then the Lead will be associated to the Campaign record.

The below highlights the relationship between the three Salesforce tables.
<img src="assets/imgs/schema-builder-member.png" alt="schema-builder">

### Get Start

- clone [GitHub Repo](https://github.com/andrewcircelli/assign-leads-to-campaign.git)
- use command ```npm init -y ``` to install dependencies
- create env file with below
  - PORT=
  - SF_LOGIN_URL=https://login.salesforce.com
  - SF_USERNAME=
  - SF_PASSWORD=
  - SF_TOKEN=
- use command ```npm run start:dev``` to spin up server on localhost if you are further developing OR
- use command ```npm run start``` to spin up server on localhost

### Primary Modules

- express
- nodemon
- jsforce

### Next Steps to Consider

- Functionality to read across the entire ```leads.json ``` file and not just the first lead record.
- Pull lead information from other sources instead of local file system (e.g. db that is synchronize with Salesforce Org or scheduled API calls).
- Rethink the way the query and CRUD functions of ```assign-leads-campaign``` are configured. I do not like the nested function or using the ```req {}``` to store varibles. 
- Standard Salesforce automation tools could probably do this
