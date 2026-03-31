// ================= STORAGE =================
let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

// ================= GENERATE TRACKING =================
function generateTrackingNumber() {
  return "TRK" + Date.now(); // always unique
}

// ================= CREATE SHIPMENT (ADMIN) =================
function createShipment() {
  let sender = document.getElementById("sender").value.trim();
  let receiver = document.getElementById("receiver").value.trim();
  let senderAddress = document.getElementById("senderAddress").value.trim();
  let receiverAddress = document.getElementById("receiverAddress").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let status = document.getElementById("status").value;

  if (!sender || !receiver || !senderAddress || !receiverAddress || !phone) {
    alert("Please fill all fields");
    return;
  }

  let trackingNumber = generateTrackingNumber();

  let shipment = {
    sender,
    receiver,
    senderAddress,
    receiverAddress,
    phone,
    status,
    trackingNumber,
    date: new Date().toLocaleString(),
    notes: ""
  };

  shipments.push(shipment);
  localStorage.setItem("shipments", JSON.stringify(shipments));

  alert("Shipment created!\nTracking No: " + trackingNumber);

  // Clear inputs
  document.getElementById("sender").value = "";
  document.getElementById("receiver").value = "";
  document.getElementById("senderAddress").value = "";
  document.getElementById("receiverAddress").value = "";
  document.getElementById("phone").value = "";

  displayShipments();
}

// ================= COPY TRACKING =================
function copyTrackingNumber(trk) {
  navigator.clipboard.writeText(trk);
  alert("Tracking number copied!");
}

// ================= DISPLAY SHIPMENTS (ADMIN) =================
function displayShipments() {
  let container = document.getElementById("shipmentList");
  if (!container) return;

  container.innerHTML = ""; // reset to avoid duplicates

  shipments.forEach((s, index) => {
    container.innerHTML += `
      <div class="shipment-card">
        <h3>${s.trackingNumber}</h3>
        <button onclick="copyTrackingNumber('${s.trackingNumber}')">Copy Tracking Number</button>

        <p><b>Sender:</b> ${s.sender}</p>
        <p><b>Sender Address:</b> ${s.senderAddress}</p>

        <p><b>Receiver:</b> ${s.receiver}</p>
        <p><b>Receiver Address:</b> ${s.receiverAddress}</p>

        <p><b>Phone:</b> ${s.phone}</p>
        <p><b>Status:</b> ${s.status}</p>
        <p><b>Note:</b> ${s.notes || "No note yet"}</p>

        <input type="text" id="note-${index}" placeholder="Add note">
        <button onclick="addNote(${index})">Add Note</button>
      </div>
    `;
  });
}

// ================= ADD NOTE =================
function addNote(index) {
  let noteInput = document.getElementById(`note-${index}`).value.trim();

  if (!noteInput) {
    alert("Note cannot be empty");
    return;
  }

  shipments[index].notes = noteInput;
  localStorage.setItem("shipments", JSON.stringify(shipments));

  displayShipments();
}
    function addUserNote() {
  let noteInput = document.getElementById("userNoteInput");
  let note = noteInput.value.trim();
  if (!note) {
    alert("Note cannot be empty");
    return;
  }

  let trackingNumber = document.getElementById("trackInput").value.trim().toUpperCase();
  let shipment = shipments.find(s => s.trackingNumber === trackingNumber);

  if (!shipment) {
    alert("Enter a valid tracking number first");
    return;
  }

  // Create userNotes array if it doesn't exist
  if (!shipment.userNotes) shipment.userNotes = [];
  shipment.userNotes.push(note);

  localStorage.setItem("shipments", JSON.stringify(shipments));
  noteInput.value = "";
  alert("Your note has been sent!");

  // Refresh tracking info
  trackShipment();
}
    
// ================= TRACK SHIPMENT (USER) =================
function trackShipment() {
  let input = document.getElementById("trackInput").value.trim().toUpperCase();
  let result = document.getElementById("result");

  let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

  let found = shipments.find(s => s.trackingNumber === input);

  if (found) {
    result.innerHTML = `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h3>${found.trackingNumber}</h3>

        <p><b>Status:</b> ${found.status}</p>

        <p><b>Sender:</b> ${found.sender}</p>
        <p><b>Sender Address:</b> ${found.senderAddress}</p>

        <p><b>Receiver:</b> ${found.receiver}</p>
        <p><b>Receiver Address:</b> ${found.receiverAddress}</p>

        <p><b>Phone:</b> ${found.phone}</p>
        <p><b>Note:</b> ${found.notes || "No updates yet"}</p>
      </div>
    `;
  } else {
    result.innerHTML = "<p style='color:red;'>Tracking number not found</p>";
  }
}

// ================= LOAD =================
document.addEventListener("DOMContentLoaded", () => {
  displayShipments();
});