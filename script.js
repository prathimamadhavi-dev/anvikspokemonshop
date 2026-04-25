let selected = "";
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
let meetings = JSON.parse(localStorage.getItem("meetings")) || [];

document.querySelectorAll(".card").forEach(card => {
  card.onclick = () => {
    selected = card.dataset.name;
    document.getElementById("selectedCard").innerText = selected;
    document.getElementById("panel").classList.remove("hidden");
  };
});

function closePanel() {
  document.getElementById("panel").classList.add("hidden");
}

function mode(type) {
  let area = document.getElementById("formArea");

  if (type === "trade") {
    area.innerHTML = `
      <input id="tradeText" placeholder="Your trade offer">
      <button onclick="submitTrade()">Submit Trade</button>
    `;
  }

  if (type === "buy") {
    area.innerHTML = `
      <input id="buyText" placeholder="Your buy offer ($)">
      <button onclick="submitBuy()">Submit Buy</button>
    `;
  }
}

function submitTrade() {
  submissions.push({
    type: "TRADE",
    card: selected,
    message: document.getElementById("tradeText").value
  });

  save();
  alert("Trade submitted!");
}

function submitBuy() {
  submissions.push({
    type: "BUY",
    card: selected,
    message: document.getElementById("buyText").value
  });

  save();
  alert("Buy submitted!");
}

function addMeeting() {
  meetings.push({
    date: document.getElementById("date").value,
    location: document.getElementById("location").value,
    email: document.getElementById("email").value
  });

  localStorage.setItem("meetings", JSON.stringify(meetings));
  alert("Meeting added!");
}

function save() {
  localStorage.setItem("submissions", JSON.stringify(submissions));
}

function unlock() {
  let pass = document.getElementById("pass").value;

  if (pass === "974955isverycool21") {
    document.getElementById("admin").classList.remove("hidden");

    document.getElementById("admin").innerText =
      "SUBMISSIONS:\n" + JSON.stringify(submissions, null, 2) +
      "\n\nMEETINGS:\n" + JSON.stringify(meetings, null, 2);
  } else {
    alert("Wrong password");
  }
}
