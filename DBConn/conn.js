const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://vrajmakawana02_db_user:vraj1234@cluster0.qhlcqn4.mongodb.net/gymBackend")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
