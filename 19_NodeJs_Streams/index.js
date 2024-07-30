const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib");

const app = express();
const PORT = 8001;

app.use(status());

//Efficient way to make zip file
//By below process the file is converted into zip and written at the same time so there is no memory usage
fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/", (req, res) => {
  //this way of handling the reading of data is bad, since we are storing the data for sometime inside the RAM of our server
  //and if the data is huge then at some point our RAM would not be sufficient to handle it.
  //   fs.readFile("./sample.txt", (err, data) => {
  //     res.end(data);
  //   });

  //Stream Method : By this method as we get data from the file we keep on sending it chunk by chunk to server.
  //create a read stream to read the data from file
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  // now as our stream recieves data we take it chunk by chunk and send the response back to client
  stream.on("data", (chunk) => res.write(chunk));
  //once the stream reaches end , the request response cycle ends
  stream.on("end", () => res.end());
});

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
