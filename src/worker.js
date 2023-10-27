export function jsonToTree(arr) {
  const tree = document.getElementById("tree");

  let mom = tree;
  let index = 0;
  let createUl = -1

  for(let i = 0; i < arr.length; i++) {
    //if(i == 0 || i == arr.length - 1)
      //continue

    let line = arr[i]

    if(line[line.length - 1] === '{' ||
       line[line.length - 1] === '[') {
 
      createUl = i+1
    }

    if(i === createUl) {
      let ul = document.createElement('ul');
      $(ul).css("list-style-type", "none")

      $(mom).append(ul)
      mom = ul
    }

    //Create the li

    var li = document.createElement('li')

    const keyValue = line.split(":")
    //console.log(`${keyValue}: ${keyValue.length}`)

    if(keyValue.length == 2) {
      $(li).html(`<span class="key">${keyValue[0]}: </span><span class="value">${keyValue[1]}</span>`)
    }
    else {
      $(li).html(`<span class="single">${line}</span>`)
    }

    $(mom).append(li);
  
    //end

    if(line[line.length - 1] === '}' ||
      line[line.length - 1] === ']' ||
      line[line.length - 2] === '}' ||
      line[line.length - 2] === ']' ) {

      $(li).remove()
      mom = mom.parentNode
      $(mom).append(li)
    }
  }
}