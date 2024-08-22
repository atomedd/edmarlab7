document.addEventListener("DOMContentLoaded", function() {
    const contacts = []; // Define contacts array globally

    function updateContactList() {
        const contactListElement = document.getElementById("contactList");
        contactListElement.innerHTML = ''; // Clear the list
        contacts.forEach(contact => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = `${contact.name} / ${contact.phone} / ${contact.email}`;
            contactListElement.appendChild(listItem);
        });
    }

    function formatPhoneNumber(phone) {
        // Remove any non-digit characters
        let cleaned = ('' + phone).replace(/\D/g, '');

        // Format phone number to (NNNN) NNN NNNN
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 4)}) ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
        } else {
            return phone; // Return as is if not a valid 10-digit number
        }
    }

    function promptUserForAction() {
        let userChoice;
        do {
            userChoice = prompt("Choose an option: first, last, new, delete all, or quit");

            if (userChoice === null) { // Check if the user clicked "Cancel"
                return;
            }

            if (userChoice === "first") {
                if (contacts.length > 0) {
                    const firstContact = contacts[0];
                    console.log("First contact: " + firstContact.name + " / " + firstContact.phone + " / " + firstContact.email);
                } else {
                    console.log("No contacts available.");
                }
            } else if (userChoice === "last") {
                if (contacts.length > 0) {
                    const lastContact = contacts[contacts.length - 1];
                    console.log("Last contact: " + lastContact.name + " / " + lastContact.phone + " / " + lastContact.email);
                } else {
                    console.log("No contacts available.");
                }
            } else if (userChoice === "new") {
                let newName = prompt("Enter name:");
                let newPhone = prompt("Enter phone number:");
                let newEmail = prompt("Enter email address:");

                // Validate input
                if (!newName) {
                    alert("Error: Name field cannot be empty.");
                    continue;
                }
                if (isNaN(newPhone) || !newPhone.match(/^\d+$/)) {
                    alert("Error: Phone number must contain only digits.");
                    continue;
                }
                if (!newEmail.includes("@") || !newEmail.match(/^\S+@\S+\.\S+$/)) {
                    alert("Error: Please enter a valid email address.");
                    continue;
                }

                // Format phone number
                newPhone = formatPhoneNumber(newPhone);

                // Add new contact
                contacts.push({ name: newName, phone: newPhone, email: newEmail });
                updateContactList(); // Update the displayed contact list
                console.log("New contact added: " + newName + " / " + newPhone + " / " + newEmail);

            } else if (userChoice === "delete all") {
                const confirmation = confirm("Are you sure you want to delete all contacts?");
                if (confirmation) {
                    contacts.length = 0; // Clear the contact list
                    updateContactList(); // Update the displayed contact list
                    console.log("All contacts have been deleted.");
                }

            } else if (userChoice === "quit") {
                break;

            } else {
                alert("Invalid choice. Please choose a valid option.");
            }
        } while (true);
    }

    // Attach the function to the button click event
    document.getElementById("add-contact").addEventListener("click", function() {
        promptUserForAction(); // Only run promptUserForAction on button click
    });
});
