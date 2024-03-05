const searchText = document.getElementById("search");
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
let lastInputValue = "";

function clearInput() {
  searchText.value = "";
  qrContainer.innerHTML = "";
}

function qrCodeGenerator() {
  if (searchText.value.length > 0) {
    if (searchText.value !== lastInputValue) {
      qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${searchText.value}" alt="QR Code"/>`;
      lastInputValue = searchText.value;
      setTimeout(function () {
        alert("QR Code gerado com sucesso!");
      }, 1000);
    } else {
      alert("Você já gerou um QR Code com esse texto.");
    }
  } else {
    qrContainer.innerHTML = "<p>Por favor, digite algo.</p>";
  }
}

generateBtn.addEventListener("click", qrCodeGenerator);
searchText.addEventListener("click", clearInput);
