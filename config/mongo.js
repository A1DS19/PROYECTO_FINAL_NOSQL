const mongoose = require('mongoose');

const configMongo = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`CONEXION EXITOSA A BASE DE DATOS`);
  } catch (error) {
    console.error(`ERROR CONEXION EN BASE DE DATOS:\n${error}`);
  }
};

module.exports = { configMongo };
