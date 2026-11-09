/* Desenha a arcada dentária em SVG.
   O símbolo da logo é um dente que forma a letra A. A arcada é o lugar
   de onde esse dente vem — e aqui ela vira o seletor de tratamentos.
   Rode:  node tools/gera-arcada.cjs > tools/_arcada.svg  */

const N = 16                 // dentes da arcada superior
const RX = 300, RY = 230
const CX = 350, CY = 80

// largura e altura relativas: incisivo estreito, molar largo.
// Grandes o bastante para encostarem um no outro: em tamanho pequeno
// a arcada virava um colar de contas.
const PERFIL = [
  [50, 46], [49, 45], [47, 44], [42, 42], [39, 42], [35, 44],
  [30, 50], [28, 52], [28, 52], [30, 50], [35, 44], [39, 42],
  [42, 42], [47, 44], [49, 45], [50, 46],
]

// a que zona cada dente pertence
const ZONA = i =>
  (i <= 2 || i >= 13) ? 'fundo'
  : (i <= 4 || i >= 11) ? 'fundo'
  : 'frente'

const r2 = n => Math.round(n * 100) / 100
const partes = []

for (let i = 0; i < N; i++) {
  const t = (i + 0.5) / N
  const ang = Math.PI + t * Math.PI          // 180° → 360°
  const x = CX + RX * Math.cos(ang)
  const y = CY - RY * Math.sin(ang)
  const [w, h] = PERFIL[i]
  // gira o dente para "olhar" para fora da arcada
  const giro = r2((Math.atan2(y - CY, (x - CX) * (RY / RX)) * 180) / Math.PI - 90)
  partes.push(
    `<g class="dente" data-zona="${ZONA(i)}" data-i="${i}" ` +
    `transform="translate(${r2(x)} ${r2(y)}) rotate(${giro})">` +
    `<rect x="${r2(-w / 2)}" y="${r2(-h / 2)}" width="${w}" height="${h}" ` +
    `rx="${r2(Math.min(w, h) * 0.38)}"/></g>`
  )
}

// faixa de gengiva: um arco por trás dos dentes
const arco = (raioX, raioY) => {
  const pts = []
  for (let k = 0; k <= 48; k++) {
    const a = Math.PI + (k / 48) * Math.PI
    pts.push(`${r2(CX + raioX * Math.cos(a))},${r2(CY - raioY * Math.sin(a))}`)
  }
  return pts.join(' ')
}

// faixa de gengiva: uma forma preenchida entre dois arcos, não dois
// fios — fio fino lê como régua de grade, não como gengiva
const faixa = [
  arco(RX + 26, RY + 20),
  arco(RX + 62, RY + 52).split(' ').reverse().join(' '),
].join(' ')

const svg = `<svg class="arcada" viewBox="0 0 700 380" role="img"
     aria-label="Arcada dentária: escolha uma região para ver os tratamentos">
  <g class="gengiva" data-zona="gengiva">
    <polygon points="${faixa}"/>
  </g>
  <g class="dentes">
${partes.map(p => '    ' + p).join('\n')}
  </g>
</svg>`

process.stdout.write(svg + '\n')
