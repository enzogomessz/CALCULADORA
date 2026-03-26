// calcbin.js - CALCULADORA BINÁRIA + CONVERSOR COM ANIMAÇÕES
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LÓGICA DAS ABAS (CALCULADORA / CONVERSOR)
    // ==========================================
    const tabCalc = document.getElementById('tab-calc');
    const tabConv = document.getElementById('tab-conv');
    const conteudoCalc = document.getElementById('conteudo-calc');
    const conteudoConv = document.getElementById('conteudo-conv');

    function alternarAba(abaAtiva) {
        if (abaAtiva === 'calc') {
            conteudoCalc.style.display = 'block';
            conteudoConv.style.display = 'none';
            conteudoCalc.style.animation = 'none';
            conteudoCalc.offsetHeight;
            conteudoCalc.style.animation = null;
            tabCalc.style.backgroundColor = '#00ffff';
            tabCalc.style.color = '#000';
            tabConv.style.backgroundColor = '#000';
            tabConv.style.color = '#00ffff';
        } else {
            conteudoCalc.style.display = 'none';
            conteudoConv.style.display = 'block';
            conteudoConv.style.animation = 'none';
            conteudoConv.offsetHeight;
            conteudoConv.style.animation = null;
            tabConv.style.backgroundColor = '#00ffff';
            tabConv.style.color = '#000';
            tabCalc.style.backgroundColor = '#000';
            tabCalc.style.color = '#00ffff';
        }
    }

    tabCalc.addEventListener('click', () => alternarAba('calc'));
    tabConv.addEventListener('click', () => alternarAba('conv'));


    // ==========================================
    // LÓGICA DA CALCULADORA BINÁRIA
    // ==========================================
    const btnCalcularBi = document.getElementById('btn-calc-bi');
    const inputBin1 = document.getElementById('bin-v1');
    const inputBin2 = document.getElementById('bin-v2');
    const inputResult = document.getElementById('bin-res');
    const botoesOp = document.querySelectorAll('#conteudo-calc .btn-op');
    let operacaoSelecionada = '+';

    botoesOp.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesOp.forEach(b => {
                b.style.backgroundColor = '#000';
                b.style.color = '#00ffff';
                b.style.boxShadow = '0px 0px 0px';
            });
            botao.style.backgroundColor = '#00ffff';
            botao.style.color = '#000';
            botao.style.boxShadow = '0px 0px 15px #00ffff';
            operacaoSelecionada = botao.textContent;
        });
    });

    function calcularBinario() {
        const val1 = inputBin1.value.trim();
        const val2 = inputBin2.value.trim();
        if (val1 === '' || val2 === '') return;

        const num1 = parseInt(val1, 2);
        const num2 = parseInt(val2, 2);
        let resultadoDecimal = 0;

        switch (operacaoSelecionada) {
            case '+': resultadoDecimal = num1 + num2; break;
            case '-': resultadoDecimal = num1 - num2; break;
            case '×': resultadoDecimal = num1 * num2; break;
            case '÷':
                if (num2 === 0) {
                    inputResult.value = 'ERRO';
                    return;
                }
                resultadoDecimal = Math.floor(num1 / num2);
                break;
        }

        inputResult.value = resultadoDecimal.toString(2);
    }

    btnCalcularBi.addEventListener('click', calcularBinario);

    // Enter nos campos binários também calcula
    [inputBin1, inputBin2].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                calcularBinario();
            }
        });

        // Filtro: só aceita 0 e 1
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^01]/g, '');
        });
    });


    // ==========================================
    // LÓGICA DO CONVERSOR DE BASES (CÁLCULO AUTOMÁTICO)
    // ==========================================
    const radiosConv = document.querySelectorAll('.radio-conv');
    const btnLimparConv = document.getElementById('btn-limpar-conv');

    const inputsConv = {
        '2':  document.getElementById('conv-bin'),
        '8':  document.getElementById('conv-oct'),
        '10': document.getElementById('conv-dec'),
        '16': document.getElementById('conv-hex'),
        'n':  document.getElementById('conv-n'),
        'x':  document.getElementById('conv-x')
    };

    const inputBaseN = document.getElementById('conv-base-n');
    const inputBaseX = document.getElementById('conv-base-x');

    function obterBaseNumerica(chave) {
        if (chave === 'n') return parseInt(inputBaseN.value) || 10;
        if (chave === 'x') return parseInt(inputBaseX.value) || 10;
        return parseInt(chave);
    }

    function atualizarConversao(valor, baseOrigem) {
        if (valor === '') {
            Object.values(inputsConv).forEach(input => input.value = '');
            return;
        }

        let decimal = parseInt(valor, baseOrigem);

        if (isNaN(decimal)) {
            Object.keys(inputsConv).forEach(key => {
                if (inputsConv[key].hasAttribute('readonly')) {
                    inputsConv[key].value = '...';
                }
            });
            return;
        }

        Object.keys(inputsConv).forEach(key => {
            const inputDestino = inputsConv[key];
            if (inputDestino.hasAttribute('readonly')) {
                let baseDestino = obterBaseNumerica(key);
                if (baseDestino >= 2 && baseDestino <= 36) {
                    inputDestino.value = decimal.toString(baseDestino).toUpperCase();
                }
            }
        });
    }

    // Gerencia qual campo está ativo para digitação
    radiosConv.forEach(radio => {
        radio.addEventListener('change', (e) => {
            let baseSelecionada = e.target.value;
            Object.keys(inputsConv).forEach(key => {
                if (key === baseSelecionada) {
                    inputsConv[key].removeAttribute('readonly');
                    inputsConv[key].focus();
                } else {
                    inputsConv[key].setAttribute('readonly', 'true');
                }
            });
        });
    });

    // Digitação em tempo real
    Object.keys(inputsConv).forEach(key => {
        inputsConv[key].addEventListener('input', (e) => {
            let baseOrigem = obterBaseNumerica(key);
            let val = e.target.value.toUpperCase();

            if (baseOrigem === 2)  val = val.replace(/[^01]/g, '');
            else if (baseOrigem === 8)  val = val.replace(/[^0-7]/g, '');
            else if (baseOrigem === 10) val = val.replace(/[^0-9]/g, '');
            else if (baseOrigem === 16) val = val.replace(/[^0-9A-F]/g, '');

            e.target.value = val;
            atualizarConversao(val, baseOrigem);
        });
    });

    // Botão Limpar
    btnLimparConv.addEventListener('click', () => {
        Object.values(inputsConv).forEach(input => input.value = '');
        const ativo = document.querySelector('.radio-conv:checked').value;
        inputsConv[ativo].focus();
    });
});