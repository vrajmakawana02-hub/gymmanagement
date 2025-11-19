const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://vrajmakawana02_db_user:vraj1234%2E@cluster0.qhlcqn4.mongodb.net/gymBackend?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("DB connection successful"))
.catch(err => console.log(err));
