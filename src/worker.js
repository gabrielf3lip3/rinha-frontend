export function jsonToTree(arr) {
  const tree = document.getElementById("tree");

  let element = "ul";
  let mom = tree;
  let add_class = false;

  arr.forEach(line => {
    if(line[line.length - 1] === '}' ||
       line[line.length - 1] === ']' ||
       line[line.length - 2] === '}' ||
       line[line.length - 2] === ']' ) {

      mom = mom.parentNode;
    }

    if(line[line.length - 1] === '{' ||
       line[line.length - 1] === '[') {
    
      element = "ul";
      let ne = document.createElement('ul');
      mom.appendChild(ne)
      mom = ne

      add_class = true;
    }

    var el = document.createElement('li')

    if(add_class) {
      $(el).addClass('test')
      add_class = false;
    }

    el.appendChild(document.createTextNode(`${line}`))
    mom.appendChild(el);

    if(element == "ul")
      element = "li";

    });
}
