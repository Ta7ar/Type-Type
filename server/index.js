const http = require("http");
const url = require("url");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { saveData, getData } = require("./controller");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db...");
  })
  .catch((err) => {
    if (err) throw err;
    console.log("cannot connect to db...");
  });

const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url, true).pathname;

  if (pathname === "/api/data" && req.method === "GET") {
    //send data to frontend
    const wpmArr = await getData();
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(wpmArr));
  } else if (pathname === "/api/data" && req.method === "POST") {
    const body = await bodyParser(req);
    const { wpm, cpm } = body;

    saveData(wpm, cpm);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ wpm, cpm }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid API call" }));
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
