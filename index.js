const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = {
  parker: {
    password: "password",
  },
};

app.post("/api/users/login", function (request, response) {
  const login = request.body;

  if (!login.username || !login.password) {
    response.status(400).send("Bad Request. Missing Username or Password");
    console.log(login);
    return;
  }

  const user = users[login.username];

  if (!user || user.password !== login.password) {
    response.status(400).send("Username or Password is incorrect");
    return;
  } else {
    response.send("Successfully logged in!");
    return;
  }
});

app.post("/api/users/registration", function (request, response) {
  const register = request.body;

  if (!register.username || !register.password) {
    response.status(400).send("Bad Request. Missing Username or Password");
    return;
  }

  users[register.username] = { password: register.password };
  response.status(201).send("Created New User");
  console.log(users);
});

app.put("/api/users/:username", function (request, response) {
  const username = request.params.username;
  const reset = request.body;

  if (!users[username] || !reset.password) {
    response.status(400).send("Missing password or username is incorrect.");
    return;
  }

  users[username] = { password: reset.password };
  response.status(200).send("Successfully updated password");
});

app.delete("/api/users/:username", function (request, response) {
  const username = request.params.username;

  if (!users[username]) {
    response.status(400).send("Username is incorrect.");
    return;
  }

  delete users[username];
  console.log(users);
  response.status(200).send(`Successfully deleted ${username}`);
});

app.listen(3000, () => {
  console.log("Server Started");
});
