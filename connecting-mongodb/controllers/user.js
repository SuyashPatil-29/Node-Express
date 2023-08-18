const {User} = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  res.setHeader("My-Name", "Suyash Patil");
  res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const id = req.params.id;
  const allDbUsers = await User.find({});

  if (id > allDbUsers.length || id < 0) {
    return res.status(404).end("No id exists");
  }

  const user = await User.findById(id);
  user ? res.json(user) : res.end("No user found");
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (!body || !body.first_name || !body.email) {
    return res.status(400).end("Please input all fields!");
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  return res.status(201).json({ msg: "User Created successfully", id: result._id });
}

async function handleChangeById(req, res) {
  const body = req.body;
  const id = req.params.id;

  delete body.email;

  await User.findByIdAndUpdate(id, { ...body }).then(
    res.end("Updated Successfully")
  );
}

async function handleDeleteUserById(req, res) {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.end("No such user");
    }

    await User.findByIdAndDelete(id);
    res.end("User deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleChangeById,
  handleDeleteUserById
};
