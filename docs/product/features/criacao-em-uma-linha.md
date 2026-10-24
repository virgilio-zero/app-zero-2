# Criar lembrete em uma linha
<!-- virgilio:feature id=criacao-em-uma-linha stage=open -->

## O que é

O estudante escreve o lembrete numa linha só, do jeito que falaria: "prova de cálculo sexta 10h", "entregar relatório dia 12 às 23h", "reunião do grupo amanhã 14:30". O app separa o texto da data e da hora e mostra o que entendeu antes de salvar. Se a prévia estiver certa, basta um toque para salvar; se estiver errada, a pessoa toca na data ou na hora da prévia e corrige ali. O campo único substitui os três campos de criar de lembrete-unico.

Serve ao "Para quem" do prd.md: a pessoa cria o lembrete na hora em que fica sabendo do compromisso, muitas vezes no meio da aula ou de uma conversa, e três campos separados atrasam esse momento. Depende de lembrete-unico, que já cria, lista e dispara o lembrete; esta funcionalidade muda só a forma de criar.

## O que entra

- Campo único no lugar dos três campos da tela de criar, com a prévia da data e da hora que o app entendeu e o botão de salvar. Tocar na data ou na hora da prévia abre o seletor para corrigir. Quando o app não acha a data, a prévia pede para escolher antes de salvar. Até 2 dias.
- Entender datas relativas: hoje, amanhã, depois de amanhã, dias da semana ("sexta", "sexta-feira", "sex") e "semana que vem". Um dia da semana é sempre o próximo: "sexta" escrito numa sexta-feira é a da semana seguinte. Até 2 dias.
- Entender datas absolutas: "dia 12", "12/11", "12/11/2026" e "12 de novembro", sempre no futuro e no formato brasileiro de dia antes do mês. 1 dia.
- Entender horas: "10h", "10h30", "10:30", "às 14", "meio-dia" e "meia-noite", no fuso de Brasília. Frase com data e sem hora fica às 8h. Frase só com hora que já passou hoje vai para amanhã nessa hora: "10h" escrito às 11h é amanhã às 10h. Períodos viram hora fixa: "de manhã" às 9h, "à tarde" às 14h e "à noite" às 19h. 1 dia.
- Tirar a data e a hora do texto do lembrete, para que a notificação diga "Prova de cálculo" e não "prova de cálculo sexta 10h". 1 dia.
- Lista de frases de teste tiradas do jeito que a turma escreve, com a data e a hora esperadas de cada uma, para conferir a interpretação a cada mudança. 1 dia.
- Gravar, em cada lembrete criado pela linha, se a pessoa aceitou a prévia ou corrigiu a data ou a hora, para medir. Meio dia.

## O que fica de fora

- Lembrete recorrente ("toda segunda"), que já está fora de lembrete-unico.
- Criar por voz. O teclado do celular já dita, e o ditado cai no mesmo campo.
- Inteligência artificial para entender a frase. A primeira versão usa regras fixas para o português, sem custo por lembrete e com resposta na hora. A IA volta a ser considerada se a taxa de correção ficar alta (ver Como medir).
- Aviso com antecedência dentro da frase ("1 hora antes"), que ainda é pergunta em aberto em lembrete-unico.
- Outros idiomas.

## Perguntas em aberto

- Onde buscar frases reais da turma para a lista de teste: perguntar aos 30 estudantes antes, ou usar o que eles digitarem nas primeiras semanas?

## Como medir

**Prévia aceita sem correção.** Porcentagem dos lembretes criados pela linha em que a pessoa salvou sem mudar a data nem a hora. Mostra se o app entende do jeito que o estudante escreve.

- Hoje: sem dados.
- Meta proposta: 80% na primeira turma. Abaixo disso, vale considerar a IA.

**Proteção: volta depois do primeiro aviso.** A métrica principal do prd.md. Se a criação em uma linha errar a data sem a pessoa perceber, o aviso chega na hora errada e a volta cai. Comparar a volta de quem criou pela linha com a de quem usou os campos.
