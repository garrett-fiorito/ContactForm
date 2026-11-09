const express = require("express");

const app = express();

const PORT = 3002;

const contacts = [];

// Parse incoming HTML form data and make it available in req.body
app.use(express.urlencoded({ extended: false })); 

// Serve files from the public folder
app.use(express.static("public"));

// Receive and store user submissions from form
app.post("/submit", function (req, res) {
    contacts.push(req.body);

    res.redirect(303, "/confirmation.html"); // Redirects to confirmation page after form is submitted
});

// Display all stored submissions.
app.get("/admin", function (req, res) {
    res.json(contacts);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
