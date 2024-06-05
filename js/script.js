const searchText = document.getElementById("search");
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
const shareBtn = document.getElementById("share-btn");
let lastInputValue = "";

function clearInput() {
  searchText.value = "";
  qrContainer.innerHTML = "";
}

function showToast(message, backgroundColor) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: backgroundColor,
      color: "black",
      borderRadius: "10px",
      padding: "10px"
    },
    stopOnFocus: true,
  }).showToast();
}

function shareQRCode() {
  const qrCodeImg = qrContainer.querySelector("img");
  if (!qrCodeImg) {
    showToast("Por favor, gere um QR Code primeiro.", "#f44336");
    return;
  }

  if (!navigator.share) {
    showToast("Compartilhamento não suportado neste navegador.", "#f44336");
    return;
  }

  const qrCodeDataURL = qrCodeImg.src;
  navigator.share({
    title: "QR Code",
    text: "Veja este QR Code",
    url: qrCodeDataURL,
  })
  .then(() => showToast("QR Code compartilhado com sucesso!", "green"))
  .catch(() => showToast("Erro ao compartilhar o QR Code.", "#f44336"));
}

function qrCodeGenerator() {
  if (searchText.value.length > 0) {
    if (searchText.value !== lastInputValue) {
      qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${searchText.value}" alt="QR Code"/>`;
      lastInputValue = searchText.value;
      setTimeout(function () {
        showToast("QR Code gerado com sucesso!", "green");
      });
    } else {
      showToast("Você já gerou um QR Code com esses dados.", "#ecd032");
    }
  } else {
    qrContainer.innerHTML = "<p>Por favor, digite algo!</p>";
    showToast("Por favor, digite algo!", "#f44336");
  }
}

generateBtn.addEventListener("click", qrCodeGenerator);
shareBtn.addEventListener("click", shareQRCode);
searchText.addEventListener("click", clearInput);
