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
      <input id="tradeText" placeholder="ENTER TRADE OFFER">
      <button onclick="submitTrade()">SEND TRADE</button>
    `;
  }

  if (type === "buy") {
    area.innerHTML = `
      <input id="buyText" placeholder="ENTER BUY OFFER">
      <button onclick="submitBuy()">SEND BUY</button>
    `;
  }
}

function submitTrade() {
  submissions.push({
    type: "TRADE",
    card: selected,
    message: document.getElementById("tradeText").value
  });

  localStorage.setItem("submissions", JSON.stringify(submissions));
  alert("TRADE SUBMITTED");
}

function submitBuy() {
  submissions.push({
    type: "BUY",
    card: selected,
    message: document.getElementById("buyText").value
  });

  localStorage.setItem("submissions", JSON.stringify(submissions));
  alert("BUY SUBMITTED");
}

function addMeeting() {
  meetings.push({
    date: document.getElementById("date").value,
    location: document.getElementById("location").value,
    email: document.getElementById("email").value
  });

  localStorage.setItem("meetings", JSON.stringify(meetings));
  alert("MEETING STORED");
}

function unlock() {
  let pass = document.getElementById("pass").value;

  if (pass === "974955isverycool21") {
    document.getElementById("admin").classList.remove("hidden");
    document.getElementById("admin").innerText =
      "SUBMISSIONS:\n" + JSON.stringify(submissions, null, 2) +
      "\n\nMEETINGS:\n" + JSON.stringify(meetings, null, 2);
  } else {
    alert("ACCESS DENIED");
  }
}
