# app-zero-2

Este é o PRD do app: o que ele é e o que já está decidido. Cada funcionalidade tem um arquivo próprio, e as descobertas e os Spikes levam até ela. O agente lê daqui o porquê de cada tarefa. Preencha pela tela Produto do Virgílio ou direto aqui.

## O problema

Estudantes esquecem compromissos pontuais: entrega de trabalho, prova, inscrição com prazo, reunião de grupo. Hoje eles anotam no caderno, num grupo de WhatsApp ou num app de agenda genérico que ninguém abre, e o aviso não chega na hora certa.

O app-zero-2 é um app de lembretes: o estudante cria um aviso com data e hora, e o celular dele recebe uma notificação nesse momento.

## Para quem

Estudantes que usam o celular o dia todo e precisam lembrar de compromissos únicos, não de rotinas. A pessoa cria o lembrete rápido, na hora em que fica sabendo do compromisso, e esquece dele até a notificação chegar.

## Como saber que deu certo

**Volta depois do primeiro aviso.** Porcentagem de estudantes que criam outro lembrete em até 14 dias depois que o primeiro lembrete disparou. Quem recebeu o aviso na hora confia no app e volta; quem perdeu o compromisso não volta.

- Hoje: sem dados, o app ainda não foi publicado.
- Meta: 40% na primeira turma de teste, com cerca de 30 estudantes.

**Proteção: aviso no horário.** Porcentagem de lembretes cuja notificação chegou até 2 minutos depois da hora marcada. Se a volta cair, este número diz se o problema é o produto ou a entrega do aviso.

- Hoje: sem dados.
- Meta: 95% dos avisos em até 2 minutos.

Ficaram de fora como métrica principal o total de lembretes criados, que cresce até com quem nunca recebeu um aviso, e a taxa de permissão de notificação concedida, que é um passo do caminho e não o resultado.

# Funcionalidades

Cada funcionalidade tem um arquivo próprio em docs/product/features, com a etapa numa marca logo abaixo do nome. A lista abaixo o Virgílio mantém em dia; crie a primeira pela tela Produto.

<!-- virgilio:features -->
- [Lembrete único com notificação no celular](features/lembrete-unico.md)
<!-- virgilio:features-end -->
