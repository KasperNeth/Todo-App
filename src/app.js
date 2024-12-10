const express = require('express');



// Create an express application
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Todo Application' });
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

