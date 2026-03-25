document.addEventListener('DOMContentLoaded', () => {
    

    const btnCalcularBi = document.querySelector('.tela[for="bi"] .btn-calcular');
    const inputBin1 = document.getElementById('bin-v1');
    const inputBin2 = document.getElementById('bin-v2');
    const inputResult = document.getElementById('bin-res');
    
    // Seleção dos botões de operação (+, -, ×, ÷)
    const botoesOp = document.querySelectorAll('.tela[for="bi"] .btn-op');
    let operacaoSelecionada = '+'; // Operação padrão

    // Adiciona evento de clique
    botoesOp.forEach(botao => {
        botao.addEventListener('click', () => {
            // Reseta o estilo de todos os botões
            botoesOp.forEach(b => {
                b.style.backgroundColor = '#000';
                b.style.color = '#00ffff';
            });

            // Destaca o botão selecionado
            botao.style.backgroundColor = '#00ffff';
            botao.style.color = '#000';
            
            // Define a operação baseada no texto do botão
            operacaoSelecionada = botao.textContent;
        });
    });

    // Função principal de cálculo
    btnCalcularBi.addEventListener('click', () => {
        const val1 = inputBin1.value.trim();
        const val2 = inputBin2.value.trim();

        const regexBinario = /^[01]+$/;
        
        if (!regexBinario.test(val1) || !regexBinario.test(val2)) {
            alert("Por favor, insira apenas números binários (0 e 1).");
            return;
        }

        // Conversão de Binário (String) para Decimal (Inteiro)
        const num1 = parseInt(val1, 2);
        const num2 = parseInt(val2, 2);
        let resultadoDecimal = 0;

        // Execução da operação aritmética
        switch (operacaoSelecionada) {
            case '+':
                resultadoDecimal = num1 + num2;
                break;
            case '-':
                resultadoDecimal = num1 - num2;
                break;
            case '×':
                resultadoDecimal = num1 * num2;
                break;
            case '÷':
                if (num2 === 0) {
                    alert("Erro: Divisão por zero não é permitida.");
                    return;
                }
                resultadoDecimal = Math.floor(num1 / num2); // Divisão inteira
                break;
            default:
                resultadoDecimal = 0;
        }

        // Conversão do resultado de Decimal para Binário (String) e exibição
        // toString(2) converte o número para a base 2
        inputResult.value = resultadoDecimal.toString(2);
        
        // Log para conferência no console (útil para os estudos de ADS)
        console.log(`Operação: ${val1} (${num1}) ${operacaoSelecionada} ${val2} (${num2}) = ${inputResult.value} (${resultadoDecimal})`);
    });

    // Filtro para permitir apenas 0 e 1 enquanto o usuário digita
    [inputBin1, inputBin2].forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^01]/g, '');
        });
    });
});
