const display = document.querySelector(".display input");
const historicoDiv = document.querySelector(".display .historico");


let expressao = ""; 

let resetarDisplay = false; 

function atualizarDisplay() {
    display.value = expressao.replace(".", ",");
}

document.querySelectorAll(".btn-num").forEach(btn => {
    btn.addEventListener("click", () => {
        let valor = btn.textContent;

        if (valor === ",") valor = ".";

        if (valor === "+/-") {
           
            let partes = expressao.match(/-?\d+\.?\d*$/);

            if (partes) {
                let ultimoNumero = partes[0];
                let invertido = (-parseFloat(ultimoNumero)).toString();
                expressao = expressao.slice(0, -ultimoNumero.length) + invertido;
            }
            atualizarDisplay();
            return;
        }

        if (resetarDisplay) {
            expressao = valor;
            resetarDisplay = false;
        } else {
            expressao += valor;
        }

        atualizarDisplay();
    });
});

document.querySelectorAll(".btn-op").forEach(btn => {
    btn.addEventListener("click", () => {
        const op = btn.textContent;

        switch (op) {
            case "C":
                expressao = "";
                break;
            case "CE":
                expressao = "";
                break;
            case "⌫":
                expressao = expressao.slice(0, -1);
                break;
            case "%":
                
                let partes = expressao.match(/\d+\.?\d*$/);
                if (partes) {
                    let ultimoNumero = partes[0];
                    let convertido = (parseFloat(ultimoNumero)/100).toString();
                    expressao = expressao.slice(0, -ultimoNumero.length) + convertido;
                }
                break;
            case "¹/x":
                let p = expressao.match(/\d+\.?\d*$/);
                if (p) {
                    let n = parseFloat(p[0]);
                    expressao = expressao.slice(0, -p[0].length) + (1/n).toString();
                }
                break;
            case "x²":
                let px2 = expressao.match(/\d+\.?\d*$/);
                if (px2) {
                    let n = parseFloat(px2[0]);
                    expressao = expressao.slice(0, -px2[0].length) + (n**2).toString();
                }
                break;
            case "²√x":
                let pRaiz = expressao.match(/\d+\.?\d*$/);
                if (pRaiz) {
                    let n = parseFloat(pRaiz[0]);
                    expressao = expressao.slice(0, -pRaiz[0].length) + (Math.sqrt(n)).toString();
                }
                break;
            case "+":
            case "-":
            case "×":
            case "÷":
                expressao += op;
                break;
        }

        atualizarDisplay();
    });
});

document.querySelector(".btn-igual").addEventListener("click", () => {
    if (!expressao) return;

    
    let calculo = expressao.replace(/×/g, "*").replace(/÷/g, "/");

    try {
        let resultado = eval(calculo);
        expressao = resultado.toString();
        resetarDisplay = true;
    } catch {
        expressao = "Erro";
        resetarDisplay = true;
    }

    atualizarDisplay();
});

document.addEventListener("keydown", (e) => {
    const tecla = e.key;

    if (["Enter", "Backspace"].includes(tecla)) e.preventDefault();
    
    if(!isNaN(tecla)) {
        if (resetarDisplay){
            expressao = tecla;
            resetarDisplay = false;
        }else{
            expressao += tecla;
        }
    }

    if (tecla === "," || tecla === ".") {
        expressao += ".";
    }

    if (["+", "-", "*", "/"].includes(tecla)) {
            let op = tecla;
            if (op === "*") op = "×";
            if (op === "/") op = "÷";
            expressao += op;
    }

    if (tecla === "Enter") {
        if (!expressao) return;

        let calculo = expressao.replace(/x/g, "*").replace(/÷/g, "/");

        try {
            let resultado = eval(calculo);
            expressao = resultado.toString();
            resetarDisplay = true;
        } catch {
            expressao = "Erro";
            resetarDisplay = true;
        }
    }

    if (tecla === "Backspace"){
        expressao = expressao.slice(0, -1);
    }

    if (tecla.toLowerCase() === "c") {
        expressao = "";
    }


    atualizarDisplay();
});

atualizarDisplay();

//BY ENZO GOMES