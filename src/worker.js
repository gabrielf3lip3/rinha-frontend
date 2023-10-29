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

function jsonToTree(obj) {
  let tree = ""

  tree = processObj(obj, tree)
  // let tree = ""
  // const json = JSON.stringify(obj, null, 2)
  // const arr = json.split("\n")

  // arr.forEach(line => {
  //   if(line[line.length - 1] === '}' ||
  //     line[line.length - 1] === ']' ||
  //     line[line.length - 2] === '}' ||
  //     line[line.length - 2] === ']' ) {

  //     tree += '</ul>'
  //   }

  //   const keyValue = line.split(":")
  //   if(keyValue.length === 2) {
  //     tree += `<li><span class="key">${keyValue[0]}: </span><span class="value">${keyValue[1]}</span></li>`
  //   }
  //   else {
  //     tree += `<li><span class="single">${line}</span></li>`
  //   }

  //   if(line[line.length - 1] === '{' ||
  //      line[line.length - 1] === '[') {
 
  //     tree += '<ul>'
  //   }
  // });

  return tree
}

function processObj(obj, tree) {
  Object.entries(obj).map(entry => {
    let key = entry[0]
    let value = entry[1]

    if(value === null) 
    {
      value = "null"
    }

    if(typeof value === 'object') {
      // if(value == '[object Object]')
      tree += `<li><span class="key">${key}: </span></li><ul>`
      // else {
      //   tree += `<li><span class="key">${key}: </span><span class="value">[</span></li><ul>`
      // }
        
      tree = processObj(value, tree)
      return
    }
    else {
      tree += `<li><span class="key">${key}: </span><span class="value">${value}</span></li>`
    }
  })

  tree += '</ul>'
  return tree
}