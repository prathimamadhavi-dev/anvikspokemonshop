// =======================
// EMAILJS INIT
// =======================
(function () {
  emailjs.init("vhlH7Lv-q35WMm1_p");
})();

let selectedCard = "";

// =======================
// OPEN FORM
// =======================
function openForm(cardName) {
  selectedCard = cardName;
  document.getElementById("formBox").style.display = "block";

  // optional: scroll to form
  document.getElementById("formBox").scrollIntoView({
    behavior: "smooth"
  });
}

// =======================
// VALIDATION
// =======================
function validate(name, email, time) {
  if (!name || !email) {
    alert("Fill all fields.");
    return false;
  }

  // Gmail only check
  if (!email.toLowerCase().endsWith("@gmail.com")) {
    alert("Must use a Gmail address.");
    return false;
  }

  // time required
  if (!time) {
    alert("Pick a time.");
    return false;
  }

  return true;
}

// =======================
// CLEAR FORM
// =======================
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("time").value = "";
  document.getElementById("type").value = "Buy";
}

// =======================
// SUBMIT FORM
// =======================
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const time = document.getElementById("time").value;
  const type = document.getElementById("type").value;

  if (!validate(name, email, time)) return;

  // disable button to prevent spam clicking
  const btn = document.querySelector(".form-card button");
  btn.disabled = true;
  btn.innerText = "Sending...";

  emailjs.send("service_dnhtqho", "template_uawt116", {
    user_name: name,
    user_email: email,
    card: selectedCard || "None selected",
    type: type,
    time: time
  })
  .then(() => {
    alert("✅ Request sent to your Gmail!");

    clearForm();
    selectedCard = "";
    document.getElementById("formBox").style.display = "none";
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    alert("❌ Failed to send. Check setup.");
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = "Submit";
  });
}
