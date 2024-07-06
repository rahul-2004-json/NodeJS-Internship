const express = require("express");
const users = require("../5_Express_Middleware/MOCK_DATA.json");
const PORT = 8002;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  req.name = "Rahul";
  next();
});

app.use((req, res, next) => {
  console.log(`Hello from middleware 2 ${req.name}`);
  next();
});

//Routes
app.get("/api/users", (req, res) => {
  console.log(req.headers);

  //Sending a response header
  //When writing custom headers , write X-your-custom-header-name and this is good practice
  res.setHeader("X-MyName", "Rahul Yadav"); //Custom Header
  return res.status(200).json(users); // We can also send status codes relevant to particular opearitons being performed
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
