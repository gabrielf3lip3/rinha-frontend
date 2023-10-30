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
      tree += `<li><span class="key">${key}: </span></li><ul>`
     
        
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