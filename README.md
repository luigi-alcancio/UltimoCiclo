# Último Ciclo

Cruzadinha de **Arquitetura Computacional** com atmosfera de laboratório abandonado, terminal verde e uma forca que acompanha os erros do jogador.

Feita em **HTML, CSS e JavaScript puros**, com layout pensado para computador. O tabuleiro contém as 16 palavras da atividade, conectadas por cruzamentos.

## Como abrir

Abra `index.html` diretamente no navegador. Não é necessário instalar dependências nem executar uma compilação.

## Como jogar

1. Clique em uma pista ou em uma casa do tabuleiro.
2. Digite as letras da resposta. A seleção avança automaticamente dentro da palavra.
3. Use as setas para navegar. Clique novamente em uma casa já selecionada em um cruzamento para alternar entre horizontal e vertical. A barra de espaço também alterna a direção nos cruzamentos.
4. Você também pode colar uma palavra: as letras são distribuídas a partir da casa selecionada. Acentos são removidos; números, espaços e outros caracteres são ignorados.
5. Clique em **Conferir respostas**, ou pressione Enter dentro de uma casa.
6. Letras preenchidas corretas ficam verdes; incorretas ficam vermelhas. Casas vazias permanecem neutras.
7. Uma conferência com uma ou mais letras erradas custa **uma vida**, independentemente da quantidade de erros. Conferir casas vazias ou apenas letras corretas não tira vidas.
8. As pistas indicam se cada palavra está **certa**, **errada** ou **incompleta**. Uma palavra só conta no placar quando está completa e validada pela conferência.
9. Você começa com **cinco vidas**. Ao perder a quinta, o bonequinho morre e o tabuleiro fica bloqueado. Clique em **Reiniciar jogo** para limpar as respostas e recuperar as vidas.
10. Para vencer, complete e confira as **16 palavras** corretamente.

Editar uma casa remove sua marcação de conferência e atualiza o placar. É necessário conferir novamente para validar a nova letra. Letras erradas mantidas no tabuleiro causam outra perda de vida na próxima conferência.
