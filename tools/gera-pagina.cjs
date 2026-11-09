/* Monta index.html a partir de tools/pagina.html, injetando a arcada
   gerada por tools/gera-arcada.cjs no marcador <!--ARCADA-->.
   Rode da raiz:  node tools/gera-pagina.cjs  */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const RAIZ = path.resolve(__dirname, '..')
const svg = execFileSync(process.execPath, [path.join(__dirname, 'gera-arcada.cjs')],
  { encoding: 'utf8' }).trim()

const modelo = fs.readFileSync(path.join(__dirname, 'pagina.html'), 'utf8')
if (!modelo.includes('<!--ARCADA-->')) {
  console.error('marcador <!--ARCADA--> nao encontrado'); process.exit(1)
}
const saida = modelo.replace('<!--ARCADA-->', svg)
fs.writeFileSync(path.join(RAIZ, 'index.html'), saida)
console.log('index.html gerado:', (saida.length / 1024).toFixed(1) + ' KB')
console.log('dentes na arcada:', (saida.match(/class="dente"/g) || []).length)
