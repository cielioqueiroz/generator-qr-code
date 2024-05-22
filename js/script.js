const searchText = document.getElementById("search");
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
const shareBtn = document.getElementById("share-btn");
let lastInputValue = "";

function clearInput() {
  searchText.value = "";
  qrContainer.innerHTML = "";
}

function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "#fff",
      color: "#000",
      borderBottom: "4px solid #336699",
    },
    stopOnFocus: true,
  }).showToast();
}

function shareQRCode() {
  if (!navigator.share) {
    showToast("Compartilhamento não suportado neste navegador.");
    return;
  }

  const qrCodeDataURL = qrContainer.querySelector("img").src;
  navigator.share({
    title: "QR Code",
    text: "Veja este QR Code",
    url: qrCodeDataURL,
  })
  .then(() => showToast("QR Code compartilhado com sucesso!"))
  .catch(() => showToast("Erro ao compartilhar o QR Code."));
}

function qrCodeGenerator() {
  if (searchText.value.length > 0) {
    if (searchText.value !== lastInputValue) {
      qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${searchText.value}" alt="QR Code"/>`;
      lastInputValue = searchText.value;
      setTimeout(function () {
        showToast("QR Code gerado com sucesso!");
      });
    } else {
      showToast("Você já gerou um QR Code com esses dados.");
    }
  } else {
    qrContainer.innerHTML = "<p>Por favor, digite algo!</p>";
  }
}

generateBtn.addEventListener("click", qrCodeGenerator);
shareBtn.addEventListener("click", shareQRCode);
searchText.addEventListener("click", clearInput);
