
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./app/config/db.config')
const path = require('path');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'app/public')));
mongoose.connect(dbConfig.url)
    .then(() => { console.log("MongoDB connected") })
    .catch((e) => {console.error(e)})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

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