# Andrade Odontologia — proposta de site

Site de demonstração da **On Track Agência Digital** para apresentar à
clínica. Reformulação da página atual, hoje num template da Simples
Anúncios (`andradeodontologia.meudoutor.com`).

Feito no padrão dos modelos da agência (`lp-modelo-01` a `lp-modelo-10`),
com a mesma tipografia e as mesmas convenções do **Modelo 08 — Dentista**.
Site estático: HTML, CSS e JavaScript, sem build e sem dependências.

**No ar:** https://devagenciaontrack-sys.github.io/andradeodontologia/

## Arquivos

```
index.html      página única
css/main.css    estilos e tokens
js/main.js      arcada, menu, sanfonas, revelação
assets/         logo e imagem de compartilhamento
.nojekyll       necessário no GitHub Pages
```

## Identidade

A paleta saiu da logo deles, amostrando os pixels. O template atual usa um
rosa `#E7AF96` que não tem relação com a marca.

| | |
|---|---|
| Ouro | `#B8841C` (amostrado da logo: `#C88C14`) |
| Ouro claro | `#E7C87E` |
| Areia | `#FAF6EE` |
| Grafite | `#231E17` |
| WhatsApp | `#1FA855` |

Tipografia **Young Serif + Plus Jakarta Sans**, a mesma dos modelos.

## Interação e animação

- **Arcada do topo** desenhada por script em SVG: 16 dentes que nascem um
  a um ao carregar, e acendem ao passar o mouse.
- **Entrada escalonada** da capa (`.ent`, com atraso por `--d`).
- **Revelação ao rolar** das seções (`.rev` → `.vis`), com rede de
  segurança: se o observador falhar, o conteúdo aparece mesmo assim.
- **Sanfonas** nos tratamentos e nas dúvidas, com seta que gira. Abrir uma
  fecha a anterior, então nunca há dois textos abertos.
- **Período preferido** no formulário entra na mensagem do WhatsApp.
- Tudo respeita `prefers-reduced-motion`.

## Dados — todos vieram do site atual

Puxados da API que o template deles consome
(`api.simplesanuncios.com/externo/paginas?subdominio=andradeodontologia`):

- WhatsApp: (11) 97585-1354
- Endereço: Rua Bartolomeu Rampini, 34, Sala 01, Parque Maria Fernandes,
  São Paulo/SP, 04858-460
- Instagram: @andradeodontologia1
- 10 especialidades, com as descrições que eles mesmos escreveram

> A API lista **Clínico geral**, que não aparece na página atual deles.
> Foi incluída aqui.

## Imagens

A clínica não tem foto utilizável, e a imagem de cabeçalho do site atual
está quebrada no próprio servidor (o S3 responde `NoSuchKey`). Onde uma
foto entraria há um **espaço em cinza** dizendo qual foto vai ali: equipe,
recepção e sala de atendimento.

## Pendências — resolver com a clínica

1. **Responsável técnico e CRO.** Não constam em lugar nenhum do site
   atual. O Código de Ética Odontológica exige a identificação do
   cirurgião-dentista responsável e o número de inscrição no CRO em
   material de divulgação. Está no rodapé como "a preencher".
2. **Horário de atendimento.** Não existe no site atual.
3. **Convênios.** Não há menção nenhuma. Está como "a confirmar" nas
   dúvidas.
4. **As três fotos** descritas acima.
5. **Os quatro passos** de "Como funciona" foram escritos por nós, a
   partir da frase deles. Confirmar.
6. **Analytics.** Nenhuma tag instalada.

Nada de preço, desconto ou consulta gratuita: o CFO não permite.

## Alterações

Ao editar o CSS ou o JS, suba a versão no `index.html`:

```html
<link rel="stylesheet" href="css/main.css?v=1">   →  ?v=2
<script src="js/main.js?v=1">                     →  ?v=2
```

## Verificações feitas

- Sem rolagem horizontal em 65 larguras, de 320px a 1600px
- Sem erro no console
- 16 dentes desenhados, 15 sanfonas, revelação sem elementos presos
- Mapa aponta para o endereço certo
