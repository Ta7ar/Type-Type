const http = require("http");
const url = require("url");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
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
    try {
      const data = await getData();
      //payload is foo bar cause i got nothing to send in a payload
      const token = jwt.sign({ foo: "bar" }, process.env.TOKEN_SECRET, {
        expiresIn: "0.5h",
      });
      res.setHeader("auth-token", token);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error }));
    }
  } else if (pathname === "/api/data" && req.method === "POST") {
    //verify token
    const token = req.headers["auth-token"];
    //token is not present
    if (!token) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Unauthorized Action" }));
    }
    //throws error if token is invalid
    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid Token" }));
    }
    //get body data
    const body = await bodyParser(req);
    const { wpm, cpm } = body;

    //save the data
    try {
      saveData(wpm, cpm);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ wpm, cpm }));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error }));
    }
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
