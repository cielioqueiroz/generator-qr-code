const searchText = document.getElementById("search");
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
let lastInputValue = ""; // Variável para armazenar o último valor do campo de texto

function clearInput() {
  searchText.value = ""; // Limpa o campo de entrada
  qrContainer.innerHTML = ""; // Limpa a imagem do QR Code
}

function qrCodeGenerator() {
  if (searchText.value.length > 0) {
    if (searchText.value !== lastInputValue) {
      qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${searchText.value}" alt="QR Code"/>`;
      lastInputValue = searchText.value; // Atualiza o último valor do campo de texto
      setTimeout(function() {
        alert("QR Code gerado com sucesso!"); // Exibe mensagem de sucesso após o QR Code ser gerado e aparecer na tela
      }, 1000); // Adiciona um pequeno atraso para garantir que a imagem do QR Code seja carregada antes do alerta
    } else {
      alert("Você já gerou um QR Code com esse texto."); // Exibe alerta se o mesmo input já foi usado anteriormente
    }
  } else {
    qrContainer.innerHTML = "<p>Por favor, digite algo.</p>";
  }
}

generateBtn.addEventListener("click", qrCodeGenerator);
searchText.addEventListener("click", clearInput); // Limpa o campo ao clicar no input
