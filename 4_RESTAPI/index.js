const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs"); //requiring file module

const app = express(); //Instance for the express
const PORT = 8000;

//Middleware or Plugin
app.use(express.urlencoded({ extended: false }));

//Routes
//As I am sending here html document , so it is a server side rendered page
//This is good for browser
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
      `;
  return res.send(html);
});

//This route is usefull if app is accessed by varied devices other than browser , becuase we are sending json data that can be used as per need
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//This is done because 3 HTTP methods had same route so we bind them to one route
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id); //accessing Dynamic varibale starting with : from parameter
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id); //id from path parameter
    const body = req.body; //request body as received
    //found the index of id received in path parameters
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index] = { ...users[index], ...body }; //only capable of adding new field not updating exiting ones for that we will have ti develop put request
      fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, response) => {
        return res.json({ status: "User Updated with new values" });
      });
    } else {
      return res.json({ status: "Can't find the user" });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1); //removes the user at the index
      fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, response) => {
        return res.json({ status: "Deleted the User" });
      });
    } else {
      return res.json({ status: "user Not found" });
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body; //body received as request
  console.log(body);
  users.push({ ...body, id: users.length + 1 }); // in MOCK_data.json file we are pushing an object
  //Writing the data in the MOCK_DATA.json file
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, response) => {
    //response and res are different
    return res.json({ status: `user added with id : ${users.length}` });
  });
});

//making app instance listen to port 8000 for request and sending response
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

// Note : In Python FASTApi we can test all methods get , put ,post,patch delete as we have swagger ui
//But for the express js we require to use tool called POSTMAN

//POSTMAN is a tool that helps in api testing and documentation
