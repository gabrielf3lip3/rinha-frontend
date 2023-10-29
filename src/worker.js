self.addEventListener('message', (e) => {
  const { action, data } = e.data
  
  if(action === 'jsonToTree') {
    const lines = data
    const tree = jsonToTree(lines)

    self.postMessage({
      action: 'jsonToTreeResult',
      result: tree
    })
  }
})

function jsonToTree(arr) {
  let tree = ""

  for(let i = 0; i < arr.length; i++) {
    //if(i == 0 || i == arr.length - 1)
      //continue

    const line = arr[i]

    if(line[line.length - 1] === '{' ||
       line[line.length - 1] === '[') {
 
      tree += '<ul>'
    }

    const keyValue = line.split(":")
    if(keyValue.length === 2) {
      tree += `<li><span class="key">${keyValue[0]}: </span><span class="value">${keyValue[1]}</span></li>`
    }
    else {
      tree += `<li><span class="single">${line}</span></li>`
    }

    if(line[line.length - 1] === '}' ||
      line[line.length - 1] === ']' ||
      line[line.length - 2] === '}' ||
      line[line.length - 2] === ']' ) {

      tree += '</ul>'
    }
  }

  return tree
}