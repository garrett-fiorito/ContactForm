const express = require("express");

const app = express();
const PORT = 3002;

// Store submissions while the server is running
const contacts = [];

// Use EJS templates from the views folder
app.set("view engine", "ejs");

// Read submitted form data.
app.use(express.urlencoded({ extended: false }));

// Serve CSS, browser JavaScript, and images
app.use(express.static("public"));

// Display the resume as the home page
app.get("/", function (req, res) {
    res.render("home");
});

// Display the contact form
app.get("/contact", function (req, res) {
    res.render("contact");
});

// Receive and store a submission
app.post("/submit", function (req, res) {
    const contact = req.body;

    // Give this submission an ID and timestamp
    contact.id = contacts.length + 1;
    contact.submittedAt = new Date();

    contacts.push(contact);

    // Show the confirmation for this submission
    res.redirect(303, "/confirmation/" + contact.id);
});

// Display a submission's confirmation
app.get("/confirmation/:id", function (req, res) {
    const id = Number(req.params.id);

    const contact = contacts.find(function (contact) {
        return contact.id === id;
    });

    if (contact === undefined) {
        return res.status(404).send("Submission not found.");
    }

    res.render("confirmation", { contact: contact });
});

// Display all submissions
app.get("/admin", function (req, res) {
    res.render("admin", { contacts: contacts });
});

// Start the server
app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});