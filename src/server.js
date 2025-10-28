const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from simple-ci-cd-demo!' });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = app;
