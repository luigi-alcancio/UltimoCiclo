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

## Onde editar suas pistas

**Abra `script.js`. No início do arquivo há um bloco chamado `SUAS PISTAS FICAM AQUI!`.**

As 16 pistas já estão cadastradas. Cada termo tem uma linha neste formato:

```js
{ resposta: "CPU", pista: "Executo as instruções dos programas e faço o processamento do computador.", linha: 3, coluna: 13, direcao: "H" },
```

Escreva sua pista **somente entre as aspas depois de `pista:`**:

```js
{ resposta: "CPU", pista: "Escreva aqui a pista que você criou.", linha: 3, coluna: 13, direcao: "H" },
```

O texto acima é apenas um exemplo do formato, não uma pista para o jogo. Salve o arquivo e atualize a página para ver sua alteração.

- Use até **15 palavras por pista**.
- Não inclua a resposta, partes que a entreguem ou a sigla por extenso.
- Confira a precisão dos conceitos no material da disciplina.
- Não altere `resposta`, `linha`, `coluna` ou `direcao`: esses campos definem o tabuleiro.
- Não precisa numerar as pistas: o jogo faz isso automaticamente.
- Se precisar de aspas no texto, use aspas simples dentro da frase ou escape as duplas: `\"`.
- Enquanto o campo estiver vazio, o jogo mostra **“Pista ainda não cadastrada.”**

Depois de cadastrar as pistas, atualize também a tabela abaixo para que o README contenha as mesmas pistas do jogo, conforme solicitado na atividade.

## Palavras e pistas

As pistas usam linguagem simples, com até 15 palavras cada. A numeração abaixo corresponde ao tabuleiro.

| Número | Direção | Palavra no tabuleiro | Sua pista |
| --- | --- | --- | --- |
| 1 | Horizontal | REGISTRADORES | Dentro do processador, guardamos valores imediatos: temos a maior velocidade e pouquíssimo espaço. |
| 2 | Vertical | RAM | Guardo programas em uso: tenho mais velocidade e menos espaço que o armazenamento permanente. |
| 3 | Vertical | DATABUS | Sou o caminho por onde passam as informações trocadas entre as peças do computador. |
| 4 | Vertical | ROM | Já venho com instruções de fábrica e normalmente não deixo você mudá-las. |
| 5 | Vertical | FLASH | Estou nos pendrives: não esqueço sem energia e apago informações em blocos. |
| 6 | Vertical | QUADCORE | Tenho quatro núcleos no mesmo processador para dividir o trabalho. |
| 7 | Vertical | EEPROM | Não esqueço sem energia e deixo apagar e reescrever um byte de cada vez. |
| 8 | Horizontal | CPU | Executo as instruções dos programas e faço o processamento do computador. |
| 9 | Horizontal | ADDRESSBUS | Sou o caminho que leva o endereço de onde buscar ou guardar algo. |
| 10 | Vertical | DUALCORE | Tenho dois núcleos no mesmo processador para dividir o trabalho. |
| 11 | Vertical | ULA | Dentro do processador, sou quem faz as contas e compara valores. |
| 12 | Horizontal | UC | Dentro do processador, organizo os passos e digo quando cada tarefa deve acontecer. |
| 13 | Horizontal | MICROCONTROLADOR | Reúno processamento, memória e conexões num só chip; apareço em brinquedos e eletrodomésticos. |
| 14 | Horizontal | MEMORIADEMASSA | Tenho menos velocidade, mas muito espaço para guardar arquivos, mesmo depois de desligar. |
| 15 | Vertical | DMA | Levo dados entre dispositivos e memória sem fazer o processador cuidar de cada transferência. |
| 16 | Horizontal | CACHE | Guardo informações frequentes perto do processador: tenho mais velocidade e menos espaço que a principal. |

## Arquivos

- `index.html`: estrutura, tabuleiro, painel da forca e instruções.
- `style.css`: visual sombrio, cores das respostas e animações.
- `script.js`: cadastro das pistas, cruzamentos, navegação e regras do jogo.
- `README.md`: instruções e documentação.

Todos os recursos visuais são feitos com CSS e SVG. O jogo não depende de fontes, imagens ou bibliotecas externas.

## Publicação no GitHub Pages

1. Crie um repositório público chamado `arqcomp-cruzadinha`.
2. Versione os arquivos na branch `main`, mantendo `index.html` na raiz.
3. Abra **Settings → Pages**.
4. Em **Source**, selecione **Deploy from a branch**.
5. Selecione a branch **main** e a pasta **/ (root)**; clique em **Save**.
6. Aguarde a publicação e teste o endereço em uma janela anônima.
7. Substitua o campo abaixo pelo endereço real do site e envie somente esse link no Moodle.

**Link do site publicado:** a preencher após a publicação.

Formato esperado: `https://SEU-USUARIO.github.io/arqcomp-cruzadinha/`.

## Versionamento da atividade

Os commits são feitos pelo autor. A atividade pede **no mínimo seis commits em pelo menos dois dias diferentes**, registrando alterações reais, com mensagens no padrão `tipo: descrição curta` (`feat`, `fix`, `style` ou `docs`).

Sugestões para próximas alterações reais:

- `feat: cadastra pistas horizontais da cruzadinha`
- `feat: cadastra pistas verticais da cruzadinha`
- `style: ajusta visual do tabuleiro e da forca`
- `fix: corrige pista após revisão do conteúdo`
- `docs: atualiza lista de pistas e link do GitHub Pages`

Não coloque dados pessoais no repositório público.
