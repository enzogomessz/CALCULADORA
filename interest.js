const btnCalcular = document.querySelector(".btn-calcular");

if (btnCalcular) {
    btnCalcular.addEventListener("click", () => {
        const campos = document.querySelectorAll(".juros-container input");

        let valorInicial = parseFloat(campos[0].value) || 0;
        let aporteMensal = parseFloat(campos[1].value) || 0;
        let taxa = parseFloat(campos[2].value) || 0;
        let periodo = parseInt(campos[3].value) || 0;

        taxa = taxa / 100;

        let montante;

        if (taxa === 0) {
            montante = valorInicial + (aporteMensal * periodo);
        } else {
            montante = valorInicial * Math.pow(1 + taxa, periodo) +
                       aporteMensal * ((Math.pow(1 + taxa, periodo) - 1) / taxa);
        }

        const resultadoFormatado = montante.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        document.querySelector(".display-juros input").value = resultadoFormatado;
    });
}

const inputsJuros = document.querySelectorAll(".juros-container input");

inputsJuros.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            btnCalcular.click();
        }
    });
});
