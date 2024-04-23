const mongoose = require("mongoose");

// Conexión remota
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@`;

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Conect with database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;