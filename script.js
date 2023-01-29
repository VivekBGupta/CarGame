// const users = []

// localStorage.setItem("data","storage")

// sessionStorage.setItem("data","session")

//SignUp
// Select the form and the error div
let signUpForm = document.getElementById("signUpForm");
let signupError = document.getElementById("signupError");


// console.log(signUpForm)
// Add a submit event listener to the form
signUpForm?.addEventListener("submit", function (event) {
// signUpForm.onclick = function (event) {
// function signUp(event) {
    event.preventDefault();
    console.log("inside signIn")

    // Get the input values
    let fullname = signUpForm.querySelector(".fullname").value;
    let email = signUpForm.querySelector(".email").value;
    let username = signUpForm.querySelector(".SignUpUsername").value;
    let password = signUpForm.querySelector(".signUpPassword").value;

    // Initialize a variable to check if there are any errors
    let hasError = false;

    // Validate the input values
    if (fullname.length < 3) {
        signupError.innerText = "Full name must be at least 3 characters long.";
        hasError = true;
    } else if (!/^[a-zA-Z ]+$/.test(fullname)) {
        signupError.innerText = "Full name can only contain letters and spaces.";
        hasError = true;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        signupError.innerText = "Please enter a valid email address.";
        hasError = true;
    } else if (username.length < 3) {
        signupError.innerText = "Username must be at least 3 characters long.";
        hasError = true;
    } else if (password.length < 8) {
        signupError.innerText = "Password must be at least 8 characters long.";
        hasError = true;
    }
    
    // If there are no errors, submit the form
    if (!hasError) {
        let user = { fullname, email, username, password}

        let userData = JSON.stringify(user)
        localStorage.setItem("username", userData)

        // your form submission code
        signupError.innerText = "Form Submitted Successfully!"
        // let obj = { fullname, email, username, password }
        // users.push(obj)
        window.location.href = "./login.html"
    }
});
// LogIn
let logInForm = document.getElementById("logInForm");
let logInError = document.getElementById("loginError");
// console.log(logInForm)

// Add a submit event listener to the form
logInForm?.addEventListener("submit", function (event) {//conditional chaining
    // logInForm.onclick = function (event) {
// function logIn(event) {
    event.preventDefault();
    // Get the input values
    let username = logInForm.querySelector(".logInUsername").value;
    let password = logInForm.querySelector(".logInPassword").value;

    // Initialize a variable to check if there are any errors
    let hasError = false;

    // Validate the input values
    if (username.length < 3) {
        logInError.innerText = "Invalid Username OR Password.";
        hasError = true;
    } else if (password.length < 8) {
        logInError.innerText = "Invalid Username OR Password.";
        hasError = true;
    } 
    else {
    //     // here you can check if the user exists or not
        let isUserExist = false;

        let user = localStorage.getItem("username")
        let data = JSON.parse(user)

        if(username == data.username && password == data.password){
            isUserExist = true;
        }
        if (!isUserExist) {
            logInError.innerText = "Invalid Username OR Password OR User Does Not Exist";
            hasError = true;
        }
    }

    // If there are no errors, submit the form
    if (!hasError) {
        // your form submission code
        logInError.innerText = "Form Submitted Successfully!";
        window.location.href = "./game.html"
    }
});



