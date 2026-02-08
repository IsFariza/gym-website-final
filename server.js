
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./app/config/db.config')

const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(dbConfig.url)
    .then(() => { console.log("MongoDB connected") })
    .catch((e) => {console.error(e)})


app.get('/', (req, res) => {
    res.json({message: "gym api is running"})
})

require("./app/routes/user.routes")(app);
require("./app/routes/trainer.routes")(app);
require("./app/routes/exercise.routes")(app);
require("./app/routes/workout.routes")(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: "Something went wrong"});
});

app.listen(process.env.PORT, () =>{
    console.log('Server running')
})