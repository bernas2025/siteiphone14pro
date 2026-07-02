// Controle de Tamanho da Fonte (Acessibilidade)
let currentFontSize = 100; // representado em porcentagem

const btnIncrease = document.getElementById('btn-increase');
const btnDecrease = document.getElementById('btn-decrease');
const btnTts = document.getElementById('btn-tts');

btnIncrease.addEventListener('click', () => {
    if (currentFontSize < 140) {
        currentFontSize += 10;
        document.body.style.fontSize = currentFontSize + '%';
    }
});

btnDecrease.addEventListener('click', () => {
    if (currentFontSize > 80) {
        currentFontSize -= 10;
        document.body.style.fontSize = currentFontSize + '%';
    }
});

// Recurso de Leitura de Tela (Texto para Voz)
let isSpeaking = false;
let synthesisUtterance = null;

btnTts.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (isSpeaking) {
            // Se já estiver lendo, para a reprodução
            window.speechSynthesis.cancel();
            isSpeaking = false;
            btnTts.textContent = "🔊 Ouvir Página";
            btnTts.style.backgroundColor = "#2e7d32";
        } else {
            // Captura todo o texto visível do conteúdo principal
            const textToRead = document.querySelector('main').innerText;
            
            synthesisUtterance = new SpeechSynthesisUtterance(textToRead);
            synthesisUtterance.lang = 'pt-BR';
            
            synthesisUtterance.onend = () => {
                isSpeaking = false;
                btnTts.textContent = "🔊 Ouvir Página";
                btnTts.style.backgroundColor = "#2e7d32";
            };

            window.speechSynthesis.speak(synthesisUtterance);
            isSpeaking = true;
            btnTts.textContent = "⏹ Parar Leitura";
            btnTts.style.backgroundColor = "#c62828";
        }
    } else {
        alert("Desculpe, seu navegador não suporta a função de leitura de voz.");
    }
});