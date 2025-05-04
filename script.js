
let user = {};

function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const referredBy = document.getElementById("referral").value;

    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, referredBy })
    })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            user = data.user;
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("userName").innerText = user.name;
            document.getElementById("points").innerText = user.points;
            document.getElementById("inr").innerText = user.inr.toFixed(2);
            document.getElementById("refCode").innerText = user.referralCode;
            document.getElementById("refLink").innerText = `${location.origin}?ref=${user.referralCode}`;
        } else {
            alert(data.error);
        }
    });
}

function solveCaptcha() {
    fetch('http://localhost:5000/api/solve-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, captchaText: "solved" })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("points").innerText = data.points;
        document.getElementById("inr").innerText = data.inr.toFixed(2);
        alert("পয়েন্ট সফলভাবে যোগ হয়েছে!");
    });
}

function requestWithdraw() {
    const name = prompt("আপনার নাম লিখুন:");
    const upi = prompt("আপনার UPI ঠিকানা লিখুন:");
    const amount = prompt("উইথড্র পরিমাণ লিখুন:");

    fetch('http://localhost:5000/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, name, upi, amount })
    })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
}
