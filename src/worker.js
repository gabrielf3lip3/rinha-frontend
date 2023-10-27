export function jsonToTree(arr) {
  const tree = document.getElementById("tree");

  let mom = tree;
  let index = 0;

  for(let i = 0; i < arr.length; i++) {
    if(i == 0 || i == arr.length - 1)
      continue

    const line = arr[i]

    if(line[line.length - 1] === '{' ||
    line[line.length - 1] === '[') {
 
      let ne = document.createElement('ul');
      $(ne).css("list-style-type", "none")

      mom.append(ne)
      mom = ne
    }

    //Create the li

    var el = document.createElement('li')
    el.appendChild(document.createTextNode(`${line}`))
    mom.append(el);
  
    //end

    if(line[line.length - 1] === '}' ||
      line[line.length - 1] === ']' ||
      line[line.length - 2] === '}' ||
      line[line.length - 2] === ']' ) {

      mom = mom.parentNode;
    }
  }
}