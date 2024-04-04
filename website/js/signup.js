document.getElementById('confirm_password').addEventListener('input', function() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var passwordMatch = document.getElementById('password_match');

    if (password === confirmPassword) {
        passwordMatch.textContent = "Passwords match";
        passwordMatch.className = "password-feedback match";
    } else {
        passwordMatch.textContent = "Passwords do not match";
        passwordMatch.className = "password-feedback no-match";
    }
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var address = document.getElementById('address').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm_password').value;
        var signupButton = document.getElementById('signup-button');

        var emailIsValid = email.includes('@');
        var phoneIsValid = /^[\d+]+$/.test(phone);

        if (firstname && lastname && emailIsValid && phoneIsValid && address && password && confirmPassword && password === confirmPassword) {
            signupButton.disabled = false;
        } else {
            signupButton.disabled = true;
        }
    });
});