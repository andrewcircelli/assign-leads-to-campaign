// Dependencies
// =============================================================
const express = require("express");

const dotenv = require("dotenv");
const config = dotenv.config;
config();

// Express app
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Routes
// =============================================================
app.get("/", (req, res) => {
  res.send("<h1> Assign Leads to Campaigns Service at api/assign-leads</h1>");
});
const assignLeads = require("./services/assign-leads-to-campaign");
// app.get("api/assign-leads", assignLeads(app));

// Error Handling route for unknown endpoints
app.use((req, res, next) => {
  const err = new Error("Page Not Found!");
  err.status = 404;
  next(err);
});

// Catch global errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
});

// Server up
app.listen(PORT, () => {
  console.log(`server is now listening at http:localhost:${PORT}`);
});
