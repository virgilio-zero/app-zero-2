# Lembrete único com notificação no celular
<!-- virgilio:feature id=lembrete-unico stage=open -->

## O que é

O estudante cria um lembrete com um texto curto, uma data e uma hora. Nesse momento o celular dele recebe uma notificação com o texto do lembrete, mesmo com o app fechado.

## Por que

É o coração do app: sem o aviso chegando na hora, o lembrete é só mais uma anotação esquecida. Ver "O problema" no prd.md.

## Como funciona

- Criar: texto, data e hora. Nada mais é obrigatório.
- Listar: os próximos lembretes em ordem de data, e os que já passaram separados.
- Editar e apagar um lembrete que ainda não disparou.
- Na primeira vez, o app pede permissão para mandar notificações e explica por quê.
- Cada pessoa só vê os próprios lembretes.

## Fora do escopo por enquanto

- Lembrete recorrente (todo dia, toda semana).
- Lembrete compartilhado com outra pessoa ou com um grupo.
- Outros canais além da notificação no celular (e-mail, WhatsApp).

## Perguntas em aberto

- Como a notificação chega no celular a partir de um app web: ver o Spike notificacao-push-web.
- O estudante pode escolher ser avisado com antecedência (ex.: 1 hora antes)?
- O que acontece se a pessoa negar a permissão de notificação?
