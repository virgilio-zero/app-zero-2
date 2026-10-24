# Notificação no celular a partir do app web
<!-- virgilio:spike feature=lembrete-unico -->

## A pergunta

O app hoje é um site (Next.js). Dá para fazer a notificação chegar no celular do estudante na hora marcada, com o app fechado, sem construir um app de loja?

## O que já se sabe

- O caminho natural é Web Push: o site vira um app instalável (PWA), com service worker, e o servidor manda a notificação.
- No Android, funciona direto pelo Chrome, sem instalar nada.
- No iPhone, só funciona se a pessoa adicionar o site à tela de início, e só a partir do iOS 16.4. Esse passo extra pode afastar parte dos estudantes.
- Alguém precisa disparar o envio na hora certa: um processo agendado no servidor que verifica, a cada minuto, os lembretes que venceram.

## O que o Spike precisa responder

- Quanto o passo de "adicionar à tela de início" no iPhone pesa para o público estudante? Qual a proporção iPhone/Android entre eles?
- Qual a precisão do horário: chegar no minuto certo ou alguns minutos de atraso é aceitável?
- Onde roda o agendador (Railway, função agendada do Supabase) e quanto custa.
- Se Web Push não bastar, qual a alternativa: app nativo, ou um canal como WhatsApp ou e-mail como reserva.

## Como saber que terminou

Um protótipo que manda uma notificação de teste para um Android e um iPhone na hora marcada, com o app fechado, e uma recomendação de caminho.
