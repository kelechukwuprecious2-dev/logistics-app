const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// Set your password here
const ADMIN_PASSWORD = "ProShip123";

loginBtn.addEventListener("click", () => {
  const entered = document.getElementById("password").value;
  if (entered === ADMIN_PASSWORD) {
    window.location.href = "admin.html"; // redirect to admin panel
  } else {
    message.innerHTML = "<p style='color:red;'>❌ Wrong password!</p>";
  }
});