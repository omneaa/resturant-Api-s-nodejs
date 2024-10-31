const express=require('express');
const DB=require('./config/database')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const itemRoutes = require('./items/Routes/item');
const userRoutes = require("./users/Routes/user");
DB();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/items', itemRoutes)
app.use("/users", userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
