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

  const headers = {
    "Content-Type": "application/json",
  };
  if (pathname === "/api/data" && req.method === "GET") {
    //send data to frontend
    try {
      const data = await getData();

      res.writeHead(200, headers);
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(500, headers);
      res.end(JSON.stringify({ error }));
    }
  } else if (pathname === "/api/data" && req.method === "POST") {
    const body = await bodyParser(req);
    const { wpm } = body;
    if (wpm < 10 || wpm > 120) {
      //discard the data, outliers
      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: "Outlier value" }));
      return;
    }

    //save the data
    try {
      saveData(wpm);
      res.writeHead(200, headers);
      res.end(JSON.stringify({ wpm }));
    } catch (error) {
      res.writeHead(500, headers);
      res.end(JSON.stringify({ error }));
    }
  } else {
    res.writeHead(404, headers);
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
