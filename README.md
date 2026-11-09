# Andrade Odontologia — proposta de site

Site de demonstração feito pela **On Track Agência Digital** para apresentar
à clínica. Reformulação da página atual, hoje num template da Simples
Anúncios (`andradeodontologia.meudoutor.com`).

Site estático: HTML, CSS e JavaScript. Sem build, sem dependências.

## Arquivos

```
index.html             gerado por tools/gera-pagina.cjs
css/estilo.css         estilos
js/app.js              menu, arcada interativa, formulário
assets/                logo, imagens de arquivo, compartilhamento
tools/pagina.html      modelo da página
tools/gera-arcada.cjs  desenha a arcada em SVG
tools/gera-pagina.cjs  injeta a arcada e escreve o index.html
.nojekyll              necessário no GitHub Pages
```

**Não edite o index.html à mão.** Mexa em `tools/pagina.html` e rode:

```
node tools/gera-pagina.cjs
```

## A ideia

> Nesta página, a arcada dentária de onde vem o dente-A da logo
> vira o modo de escolher o tratamento.

O símbolo da clínica é um dente que forma a letra A. A página o apresenta
grande, sozinho, no alto. E a seção de tratamentos deixou de ser uma lista
de dez cartões: virou uma **arcada desenhada em SVG**, onde tocar uma
região acende os dentes correspondentes e mostra só as especialidades
daquela parte da boca. São sete regiões, cobrindo as dez especialidades.

Sem JavaScript, as dez aparecem todas em lista. O conteúdo nunca depende
do script.

## Identidade

A paleta saiu da logo deles, amostrando os pixels com saturação real —
o template atual usa um rosa `#E7AF96` que não tem relação com a marca.

| | |
|---|---|
| Ouro | `#B8841C` (amostrado: `#C88C14`) |
| Ouro claro | `#D9B45C` |
| Grafite | `#232019` |
| Creme | `#FBF8F2` |

Tipografia: **Playfair Display** nos títulos e **Inter** no texto. O serif
acompanha o lettering da logo e combina com estética dental e
harmonização facial, que é o que a clínica quer vender.

## Dados — todos vieram do site atual

Puxados da API que o template consome
(`api.simplesanuncios.com/externo/paginas?subdominio=andradeodontologia`):

- WhatsApp: (11) 97585-1354
- Endereço: Rua Bartolomeu Rampini, 34 — Sala 01, Parque Maria Fernandes,
  São Paulo/SP, 04858-460
- Instagram: @andradeodontologia1
- 10 especialidades, com as descrições que eles mesmos escreveram

> A API lista **Clínico geral**, que não aparece na página atual deles.
> Foi incluída aqui.

## Imagens

A clínica não tem foto nenhuma utilizável. A única imagem do site atual é
a logo em 200×64. A imagem de fundo do cabeçalho deles está **quebrada no
próprio servidor** — o S3 responde `NoSuchKey` para
`whatsappimage20260814at094329_1786711465043.jpeg`. É por isso que a
página parece vazia.

Então o site foi desenhado para **não depender de foto**: capa escura com
arte vetorial em ouro, tipografia grande e cartões. Onde uma foto
melhoraria de verdade, há um **bloco reservado**, com borda tracejada,
dizendo qual foto entra ali:

1. Capa — recepção ou sala clínica
2. Equipe de jaleco
3. Sala de atendimento
4. Antes e depois

São quatro espaços. Quando as fotos chegarem, entram no lugar e nada mais
muda na página.

**Não usei banco de imagens.** Foto genérica de sorriso comprado não
convence paciente e ainda traz risco de licença num repositório público.
Vale mais mostrar ao cliente o espaço reservado e pedir a foto real.

## Pendências — resolver com a clínica

1. **Responsável técnico e CRO.** Não constam em lugar nenhum do site
   atual. O Código de Ética Odontológica exige a identificação do
   cirurgião-dentista responsável e o número de inscrição no CRO em
   material de divulgação. Está no rodapé como "a preencher".
2. **Horário de atendimento.** Não existe no site atual. Está marcado
   como "a confirmar" na seção de contato.
3. **As quatro fotos** descritas acima.
4. **Os quatro passos** da seção "Como funciona" foram escritos por nós,
   a partir da frase deles ("da triagem até o resultado final... exames
   digitais e planejamentos gerais"). Confirmar se é assim mesmo.
5. **Convênios.** Não há menção nenhuma no site atual. Se atendem, é
   informação que converte e deveria estar na página.
6. **Analytics.** Nenhuma tag instalada.

## Alterações

Ao editar o CSS ou o JS, suba o número da versão no `index.html`:

```html
<link rel="stylesheet" href="css/estilo.css?v=1">   →  ?v=2
<script src="js/app.js?v=1">                        →  ?v=2
```

Sem isso, quem já visitou continua vendo a versão antiga em cache.

## Verificações feitas

- Sem rolagem horizontal em 57 larguras, de 320px a 1440px
- Sem erro no console
- Imagens carregam
- 6 pontos de contato pelo WhatsApp, todos com mensagem pronta
- Mapa do Google aponta para o endereço certo
