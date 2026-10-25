"use strict";

const form = document.querySelector("form");

// Fields that need validation
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const email = document.getElementById("email");
const mailing = document.getElementById("mailing");
const linkedin = document.getElementById("linkedin");
const meeting = document.getElementById("meeting");

// P elements where error messages will appear
const firstNameError = document.getElementById("fname-error");
const lastNameError = document.getElementById("lname-error");
const emailError = document.getElementById("email-error");
const linkedinError = document.getElementById("linkedin-error");
const meetingError = document.getElementById("meeting-error");

// Rules are checked when the user submits the form
form.addEventListener("submit", function (event) {
    // Start each submission attempt with no errors
    let isValid = true;
    let firstInvalidField = null;

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    linkedinError.textContent = "";
    meetingError.textContent = "";

    // Read the user input values. trim() removes spaces from the beginning and end
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const linkedinValue = linkedin.value.trim();
    const meetingValue = meeting.value;

    // First name validation
    if (firstNameValue === "") {
        firstNameError.textContent = "Please enter your first name.";
        isValid = false;
        if (firstInvalidField === null) {
            firstInvalidField = firstName;
        }
    }

    // Last name validation
    if (lastNameValue === "") {
        lastNameError.textContent = "Please enter your last name.";
        isValid = false;
        if (firstInvalidField === null) {
            firstInvalidField = lastName;
        }
    }

    // Email validation. Optional, but must be valid when user inputs it
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate emails
    if (emailValue !== "") {
        if (emailPattern.test(emailValue) === false) {
            emailError.textContent = "Enter an email address such as name@example.com.";
            isValid = false;
            if (firstInvalidField === null) {
                firstInvalidField = email;
            }
        }
    }

    // If the mailing checkbox is checked, email is required
    if (mailing.checked === true && emailValue === "") {
        emailError.textContent = "Enter your email address to join the mailing list.";
        isValid = false;
        if (firstInvalidField === null) {
            firstInvalidField = email;
        }
    }

    // LinkedIn validation. Optional, but must start with the correct URL
    if (linkedinValue !== "") {
        if (linkedinValue.startsWith("https://linkedin.com/in/") === false) {
            linkedinError.textContent = "LinkedIn address must start with https://linkedin.com/in/.";
            isValid = false;
            if (firstInvalidField === null) {
                firstInvalidField = linkedin;
            }
        }
    }

    // "How we met" validation (required)
    if (meetingValue === "") {
        meetingError.textContent = "Please select how we met.";
        isValid = false;
        if (firstInvalidField === null) {
            firstInvalidField = meeting;
        }
    }

    // If any of the rules failed, stop submission
    if (isValid === false) {
        event.preventDefault();
    }
});