const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormValid = isRequiredValid;

    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordMatch = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
    }

    if (isFormValid) {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-item").forEach(function (group) {
            group.className = "form-item";
            group.querySelector("small").innerText = "";
        });
    }
});

function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, formatFieldName(input) + " is required");
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    return isValid;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, formatFieldName(input) + " must be at least " + min + " characters.");
        return false;
    } else if (input.value.length > max) {
        showError(input, formatFieldName(input) + " must be less than " + max + " characters.");
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, "Email is not valid");
        return false;
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
        return false;
    }
    showSuccess(input2);
    return true;
}

// username -> Username
function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-item error";
    formGroup.querySelector("small").innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-item";
    formGroup.querySelector("small").innerText = "";
}
