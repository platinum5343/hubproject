// Explicitly load env variables before anything else executes
require("dotenv").config(); 

const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// ... rest of your code stays exactly the same

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on http://localhost:${port}`);
  });
});


