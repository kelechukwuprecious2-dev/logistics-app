let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

const trackBtn = document.getElementById("trackBtn");
const result = document.getElementById("result");

trackBtn.addEventListener("click", () => {
  const number = document.getElementById("trackingNumber").value.trim().toUpperCase();

  if (!number) {
    result.innerHTML = "<p style='color:red;'>Please enter a tracking number!</p>";
    return;
  }

  const shipment = shipments.find(s => s.tracking === number);

  if (shipment) {
    result.innerHTML = `
      <h2>Tracking Number: ${shipment.tracking}</h2>
      <p><strong>Status:</strong> <span class="status ${shipment.status.replace(/ /g,'\\ ')}">${shipment.status}</span></p>
      <p><strong>Sender:</strong> ${shipment.sender}</p>
      <p><strong>Receiver:</strong> ${shipment.receiver}</p>
      <p><strong>Origin:</strong> ${shipment.origin}</p>
      <p><strong>Destination:</strong> ${shipment.destination}</p>
      <p><strong>Weight:</strong> ${shipment.weight} kg</p>
      <p><strong>Date Created:</strong> ${shipment.date}</p>
    `;
  } else {
    result.innerHTML = "<p style='color:red;'>Tracking number not found ❌</p>";
  }
});