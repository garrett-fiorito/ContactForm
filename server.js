const express = require("express");
const app = express();

const PORT = 3002;

// Serve files from the public folder
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
