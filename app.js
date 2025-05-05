
document.getElementById("authForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const recaptchaResponse = grecaptcha.getResponse();

    if(recaptchaResponse === "") {
        alert("Please complete the CAPTCHA!");
        return;
    }

    const userData = {
        name,
        email,
        password,
        recaptchaResponse
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            window.location.href = "/dashboard";
        } else {
            alert(data.message);
        }
    });
});
    