const express = require('express');
const router = require('./src/controller/populations');
const configs = require('./src/config/configs');

const app = express();

app.use(express.text());

app.use('/api/population', router)

app.listen(configs.port, () => {
  console.log(`Server is running on port ${configs.port}`);
});
