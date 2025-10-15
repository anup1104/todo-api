const express = require('express');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/tasks', tasksRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
