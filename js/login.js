// Basic form validation to ensure fields are not empty
document.getElementById("login_form").addEventListener("submit", function(event) {
    const username = event.target.username.value;
    const password = event.target.password.value;
    
    // Check if the username or password fields are empty
    if (username.trim() === "" || password.trim() === "") {
        event.preventDefault(); // Prevent form submission
        alert("Por favor, complete todos los campos."); // Alert user to fill all fields
    }
});
