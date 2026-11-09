# Andrade Odontologia — proposta de site

Site de demonstração feito pela **On Track Agência Digital** para apresentar
à clínica. Reformulação da página atual, hoje num template da Simples
Anúncios (`andradeodontologia.meudoutor.com`).

Site estático: HTML, CSS e JavaScript. Sem build, sem dependências.

## Arquivos

```
index.html        página única
css/estilo.css    estilos
js/app.js         menu do celular e formulário
assets/           logo e imagem de compartilhamento
.nojekyll         necessário no GitHub Pages
```

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

## Referência de design

O desenho segue duas referências escolhidas pelo cliente:
dragisvieiraodonto.com.br e dradanielacavalcante.com.br. Daí vêm o fundo
claro e quente, a serifa com a segunda linha em itálico no tom de acento,
as pílulas de ação, o fio fino acima dos itens marcados e a foto
emoldurada em arco com etiquetas flutuantes.

Seis regras da skill de design foram quebradas de propósito para
acompanhar essas referências. Estão marcadas no CSS com
`taste-skill-ignore` e a razão de cada uma.

## Imagens

A clínica não tem foto utilizável, e a imagem de cabeçalho do site atual
deles está quebrada no próprio servidor (o S3 responde `NoSuchKey`). O
site foi desenhado para não depender de foto: onde uma entraria, há um
**espaço reservado** dizendo qual foto vai ali. São quatro: a moldura em
arco da capa, a equipe, a recepção e a sala de atendimento.

Não foi usado banco de imagens: foto genérica não convence paciente e
traz risco de licença num repositório público.

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
