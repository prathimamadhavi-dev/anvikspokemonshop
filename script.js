// INIT EMAILJS
emailjs.init("vhlH7Lv-q35WMm1_p");

let selectedCard = "";

// open form
function openForm(cardName) {
  selectedCard = cardName;
  document.getElementById("formBox").style.display = "block";
}

// validation
function validate(name, email, time) {
  if (!name || !email) {
    alert("Fill all fields.");
    return false;
  }

  if (!email.includes("@gmail.com")) {
    alert("Must use Gmail.");
    return false;
  }

  if (!time) {
    alert("Pick a time.");
    return false;
  }

  return true;
}

// submit
function submitForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const time = document.getElementById("time").value;
  const type = document.getElementById("type").value;

  if (!validate(name, email, time)) return;

  emailjs.send("service_dnhtqho", "template_uawt116", {
    user_name: name,
    user_email: email,
    card: selectedCard,
    type: type,
    time: time
  }).then(() => {
    alert("Request sent to your Gmail!");
  }).catch((error) => {
    console.error(error);
    alert("Something went wrong.");
  });
}
