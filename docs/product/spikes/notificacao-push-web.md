# Notificação no celular a partir do app web
<!-- virgilio:spike feature=lembrete-unico -->

## A pergunta

O app hoje é um site (Next.js). Dá para fazer a notificação chegar no celular do estudante na hora marcada, com o app fechado, sem construir um app de loja?

## O que já se sabe

Tudo abaixo vem de pesquisa: ninguém testou ainda num aparelho de verdade, nem no Android nem no iPhone.

- O caminho natural é Web Push: o site vira um app instalável (PWA), com service worker, e o servidor manda a notificação.
- No Android, funciona direto pelo Chrome, sem instalar nada.
- No iPhone, só funciona se a pessoa adicionar o site à tela de início, e só a partir do iOS 16.4. Esse passo extra pode afastar parte dos estudantes.
- Alguém precisa disparar o envio na hora certa: um processo agendado no servidor que verifica, a cada minuto, os lembretes que venceram.
- Precisão do horário decidida pelo dono: o aviso pode chegar até 2 minutos depois da hora marcada (ver "Como saber que deu certo" no prd.md).
- O app ainda não tem nada disso: não há manifesto de PWA, service worker nem tabela de inscrições de push no código.
- O pedido de permissão só pode sair de um toque da pessoa num botão; no iPhone, só depois que o site já está na tela de início. A tela que explica o porquê (prevista em lembrete-unico) precisa vir antes desse toque.
- Navegador embutido de outro app (link aberto dentro do WhatsApp ou do Instagram) não recebe push. Como estudantes costumam receber o link por grupo de WhatsApp, o app precisa reconhecer esse caso e mandar abrir no navegador.
- A inscrição de push vale por aparelho e por navegador, e pode morrer sem aviso: a pessoa tira o app da tela de início, limpa os dados ou o navegador renova a inscrição. O servidor descobre quando o envio volta com erro de inscrição expirada e precisa apagá-la.
- O envio passa pelo serviço do fabricante (Google no Android, Apple no iPhone). O servidor pede prioridade alta e define por quanto tempo o aviso vale; um lembrete que chega horas depois não serve.
- Público da primeira turma, segundo o dono: a maioria usa Android. O passo da tela de início no iPhone atinge a minoria, mas ainda conta para os 95% no horário.
- Teto de custo decidido pelo dono: de R$ 1 a R$ 3 por aluno por mês, ou seja, R$ 30 a R$ 90 por mês para a turma de 30, somando agendador, envio de push e o e-mail de reserva, se entrar.
- Reserva aberta pelo dono: e-mail pode ser o plano B quando o push não chegar ou a pessoa negar a permissão. O dono pediu para incluir o e-mail de reserva no lembrete-unico.
- Agendador, a confirmar: o cron do Railway roda no mínimo a cada 5 minutos, o que já estoura os 2 minutos; o Supabase Cron roda a cada minuto ou até a cada poucos segundos, e pode chamar uma função que faz o envio.

## E-mail de reserva: ferramentas que cabem no teto

Escolha do dono: o Resend é o disparador de e-mail. O plano grátis cobre a turma de 30 com folga e não pesa no teto de custo; o que paga é só o domínio. Falta confirmar no protótipo a entrega em até 2 minutos e fora do spam.

Preços e limites de memória, sem consulta à rede nesta sessão; conferir na página de cada serviço antes de decidir.

Volume estimado: se cada aluno criar até 10 lembretes por mês e todos saírem também por e-mail, a turma de 30 manda até 300 e-mails por mês, uns 10 a 30 por dia. Nesse volume, o custo do envio em si fica perto de zero; o que separa as ferramentas é o limite diário do plano grátis, a chance de cair no spam e a rapidez da entrega.

- Resend: plano grátis com cerca de 3.000 e-mails por mês e 100 por dia. Cobre a turma com folga. Tem biblioteca pronta para Next.js.
- Brevo: plano grátis com cerca de 300 e-mails por dia. Cobre a turma; a marca do Brevo pode aparecer no e-mail no plano grátis.
- Amazon SES: cerca de US$ 0,10 por mil e-mails, ou seja, centavos por mês. Exige conta AWS e pedido para sair do modo de teste, que leva alguns dias.
- Mailgun: plano grátis com cerca de 100 e-mails por dia. Cabe hoje, aperta se a turma crescer.
- Postmark: conhecido pela entrega rápida e fora do spam, mas o plano pago começa perto de US$ 15 por mês, uns R$ 80. Sozinho já come quase todo o teto.
- O e-mail do próprio Supabase serve só para login e confirmação de conta, com limite baixo por hora. Não serve para lembrete.

Custo que vale para qualquer uma: um domínio próprio para assinar os e-mails (registros SPF e DKIM), sem o qual eles tendem a cair no spam. Um .com.br custa por volta de R$ 40 por ano, menos de R$ 4 por mês para a turma toda.

## O que o Spike precisa responder

- Quantos da primeira turma usam iPhone, em número, e quantos deles completam o passo de "adicionar à tela de início"?
- Se o e-mail entrar como reserva: quando ele sai (push com erro, permissão negada, sempre junto) e se cabe no teto de custo.
- Quantos lembretes por mês um aluno cria de fato: a estimativa de 10 é chute e muda o volume de e-mail.
- O e-mail de reserva pelo Resend chega em até 2 minutos e fora do spam no Gmail e no Outlook dos estudantes?
- O agendador escolhido consegue entregar 95% dos avisos em até 2 minutos?
- Onde roda o agendador (Railway, função agendada do Supabase) e quanto custa.
- Se Web Push não bastar, qual a alternativa: app nativo, ou um canal como WhatsApp ou e-mail como reserva.

## Como saber que terminou

Um protótipo que manda uma notificação de teste para um Android e um iPhone na hora marcada, com o app fechado, e uma recomendação de caminho.
