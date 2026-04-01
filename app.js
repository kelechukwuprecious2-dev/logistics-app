// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALogI-wo3KfhiLBlAmSijKXoUHj4SS_lg",
  authDomain: "logistics-app-8338d.firebaseapp.com",
  projectId: "logistics-app-8338d",
  storageBucket: "logistics-app-8338d.firebasestorage.app",
  messagingSenderId: "1346277164",
  appId: "1:1346277164:web:8bcb970a68f27905722689",
  measurementId: "G-DP3PDQ6646"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// 🔥 CREATE SHIPMENT (ADMIN)
function createShipment() {
  let tracking = "TRK" + Math.floor(Math.random() * 1000000);

  let shipment = {
    trackingNumber: tracking,
    sender: document.getElementById("sender").value,
    receiver: document.getElementById("receiver").value,
    status: "Pending"
  };

  db.collection("shipments").add(shipment)
    .then(() => {
      alert("Shipment Created! Tracking: " + tracking);
    });
}


// 🔍 TRACK SHIPMENT (USER)
function trackShipment() {
  let input = document.getElementById("trackInput").value;

  db.collection("shipments")
    .where("trackingNumber", "==", input)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        document.getElementById("result").innerHTML = "Not found";
      } else {
        snapshot.forEach(doc => {
          let data = doc.data();
          document.getElementById("result").innerHTML =
            "Status: " + data.status + "<br>Receiver: " + data.receiver;
        });
      }
    });
}
