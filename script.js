const searchBar = document.getElementById("searchBar");
const cards = document.querySelectorAll(".card");
const meetingForm = document.getElementById("meetingForm");
const submissionsList = document.getElementById("submissionsList");

searchBar.addEventListener("input", () => {
  const value = searchBar.value.toLowerCase();

  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

meetingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !date || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>Name:</strong> ${name}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Date:</strong> ${date}<br>
    <strong>Message:</strong> ${message}
  `;

  submissionsList.appendChild(li);

  meetingForm.reset();
});
