const express = require("express");
const {User} = require("../models/user")

const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleChangeById,
  handleDeleteUserById
} = require("../controllers/user");

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
      <ul>
         ${allDbUsers
           .map(
             (user) =>
               `<li>${user.first_name} ${user.last_name} - ${user.email} ${
                 user.createdAt ? user.createdAt : null
               }</li>`
           )
           .join("")}
      </ul>
      `;
  return res.send(html);
});

//Rest API poits

router.route("/:id")
.get(handleGetUserById)
.patch(handleChangeById)
.delete(handleDeleteUserById)

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);

module.exports = router;
