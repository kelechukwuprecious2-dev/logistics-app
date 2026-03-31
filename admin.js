let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

// AUTO GENERATE TRACKING NUMBER
function generateTrackingNumber() {
  return "TRK" + Date.now(); // more unique
}

// ================= CREATE SHIPMENT =================
function createShipment() {
  let sender = document.getElementById("sender").value;
  let receiver = document.getElementById("receiver").value;
  let phone = document.getElementById("phone").value;
  let status = document.getElementById("status").value;

  if (!sender || !receiver || !phone) {
    alert("Fill all fields");
    return;
  }

  let trackingNumber = generateTrackingNumber();

  let shipment = {
    sender,
    receiver,
    phone,
    status,
    trackingNumber,
    date: new Date().toLocaleString(),
    notes: ""
  };

  shipments.push(shipment);
  localStorage.setItem("shipments", JSON.stringify(shipments));

  alert("Shipment created! Copy Tracking No: " + trackingNumber);

  document.getElementById("sender").value = "";
  document.getElementById("receiver").value = "";
  document.getElementById("phone").value = "";

  displayShipments();
}

// ================= COPY FUNCTION =================
function copyTrackingNumber(text) {
  navigator.clipboard.writeText(text);
  alert("Tracking number copied!");
}

// ================= DISPLAY SHIPMENTS =================
function displayShipments() {
  let container = document.getElementById("shipmentList");
  if (!container) return;

  container.innerHTML = "";

  shipments.forEach((s, index) => {
    container.innerHTML += `
      <div class="card">
        <h3>${s.trackingNumber}</h3>
        <button onclick="copyTrackingNumber('${s.trackingNumber}')">
          Copy Tracking Number
        </button>

        <p><b>Sender:</b> ${s.sender}</p>
        <p><b>Receiver:</b> ${s.receiver}</p>
        <p><b>Phone:</b> ${s.phone}</p>
        <p><b>Status:</b> ${s.status}</p>
        <p><b>Note:</b> ${s.notes || "No note yet"}</p>

        <input type="text" id="note-${index}" placeholder="Add note"/>
        <button onclick="addNote(${index})">Add Note</button>
      </div>
    `;
  });
}

// ================= ADD NOTE =================
function addNote(index) {
  let noteInput = document.getElementById(`note-${index}`);
  shipments[index].notes = noteInput.value;

  localStorage.setItem("shipments", JSON.stringify(shipments));
  displayShipments();
}

// ================= USER TRACK =================
function trackShipment() {
  let input = document.getElementById("trackInput").value;
  let result = document.getElementById("result");

  let found = shipments.find(s => s.trackingNumber === input);

  if (found) {
    result.innerHTML = `
      <div class="card">
        <h3>${found.trackingNumber}</h3>
        <p><b>Status:</b> ${found.status}</p>
        <p><b>Receiver:</b> ${found.receiver}</p>
        <p><b>Phone:</b> ${found.phone}</p>
        <p><b>Note:</b> ${found.notes || "No updates yet"}</p>
      </div>
    `;
  } else {
    result.innerHTML = "<p>Tracking number not found</p>";
  }
}

// LOAD
