const app = require("./app");
const dbConnection = require("./src/utils/database")
require("dotenv").config();


const PORT = process.env.PORT

dbConnection.connectToMongoDB();





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})