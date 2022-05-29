// config dependencies
const jsforce = require("jsforce");

// obj destructoring to bring in env. variables for security
const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;

// create sf connection func to init connection and login using env creds
let conn;

function createConnection() {
  return new jsforce.Connection({
    loginURL: SF_LOGIN_URL,
  });
}
async function salesforceLogin() {
  conn = createConnection();
  try {
    console.log(SF_LOGIN_URL);
    userInfo = await conn.login(
      SF_USERNAME,
      SF_PASSWORD + SF_TOKEN,
      (err, userInfo) => {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `login successful for user id: ${userInfo.id} on organization id: ${userInfo.organizationId}`
          );
        }
      }
    );
    // console.log(
    //   `login successful for user id: ${userInfo.id} on organization id: ${userInfo.organizationId}`
    // );
  } catch (err) {
    return console.error(err);
  }
  return conn;
}

async function initSalesforceConnection() {
  if (!conn) {
    conn = await salesforceLogin();
  }
  return conn;
}

module.exports = initSalesforceConnection;
