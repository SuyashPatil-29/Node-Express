const express = require("express");
const app = express();
let users = require("./MOCK_DATA.json");
const fs = require("fs");

//Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `${Date.now()}: ${req.method}: ${req.path} \n`,
    () => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

//Rest api poits

app.get("/api/users", (req, res) => {
  res.setHeader("My-Name", "Suyash Patil")
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if(id>users.length || id<0){
    return res.status(404).end("No id exists")
  }

  const user = users.find((user) => user.id === id);
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if(!body || !body.first_name || !body.email){
    return res.status(400).end("Please input all fields!")
  }
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.status(201).send("User created successfully");
  });
});

app.patch("/api/users/:id", (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send("Error updating user");
      }

      res.send("User Modified successfully");
    });
  } else {
    res.status(404).send(`User with id ${id} not found`);
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const newUsers = users.filter((user) => user.id != id);
  users = newUsers;
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err, data) => {
    res.send(`User with id ${id} deleted successfully`);
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
