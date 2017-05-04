export function convertToCssPercentage(percentage) {
  return `${Math.floor(percentage * 100)}%`
}
export function randomString(length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
export function readFileToString(f) {
  return new Promise((resolve, reject) => {
    // Retrieve the first (and only!) File from the FileList object
    if (f) {
      const r = new FileReader()
      r.onload = function (e) {
        const contents = e.target.result
        console.log(`${'Got the file.n'
              + 'name: '}${f.name}n`
              + `type: ${f.type}n`
              + `size: ${f.size} bytesn`
              + `starts with: ${contents.substr(1, contents.indexOf('n'))}`,
        )
        resolve(contents)
      }
      r.readAsText(f, 'UTF-8')
    } else {
      reject('Failed to load file')
    }
  })
}
