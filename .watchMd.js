import Marpit from '@marp-team/marpit'
import fs from 'fs'
import path from 'path'

const marpit = new Marpit()

const theme = `
/* @theme example */

section {
  background-color: #369;
  color: #fff;
  font-size: 30px;
  padding: 40px;
}

h1,
h2 {
  text-align: center;
  margin: 0;
}

h1 {
  color: #8cf;
}
`
marpit.themeSet.default = marpit.themeSet.add(theme)

// Helper function to generate HTML file
const generateHtml = (markdown) => {
  const { html, css } = marpit.render(markdown)

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `
}

const inputFilePath = path.join(__dirname, '068.md')
const outputFilePath = path.join(__dirname, 'output.html')

// Initial generation of HTML file
const markdown = fs.readFileSync(inputFilePath, 'utf-8')
const html = generateHtml(markdown)
fs.writeFileSync(outputFilePath, html)

// Watch for changes in input file and regenerate HTML file on change
fs.watchFile(inputFilePath, (curr, prev) => {
  if (curr.mtime <= prev.mtime) return // Skip if change is not newer
  const markdown = fs.readFileSync(inputFilePath, 'utf-8')
  const html = generateHtml(markdown)
  fs.writeFileSync(outputFilePath, html)
})
