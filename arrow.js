document.addEventListener("keydown", function (e) {
    const comum = document.getElementById("comum");
    const juros = document.getElementById("juros");
    const bi = document.getElementById("bi");

    // Ignora setas se o foco estiver em um input (ex: campos de juros)
    if (document.activeElement && document.activeElement.tagName === "INPUT") return;

    function ativar(radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // seta pra direita →
    if (e.key === "ArrowRight") {
        e.preventDefault();
        if (comum.checked) {
            ativar(juros);
        } else if (juros.checked) {
            ativar(bi);
        } else if (bi.checked) {
            ativar(comum);
        }
    }

    // seta pra esquerda ←
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (comum.checked) {
            ativar(bi);
        } else if (juros.checked) {
            ativar(comum);
        } else if (bi.checked) {
            ativar(juros);
        }
    }
});

// COM A AJUDAR DO CLAUDE