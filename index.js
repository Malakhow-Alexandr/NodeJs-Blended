require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");

const { PORT, DB_URI } = process.env;

(async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB is connect successful");

  app.listen(PORT, () => {
    console.log(`Server is upRunning on port ${PORT}`);
  });
})();
