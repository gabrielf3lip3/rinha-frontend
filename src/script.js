import { jsonToTree } from "./worker.js"

jQuery(() => {    
  $('#input').on("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const name = file.name

    reader.onload = (e) => {

      try {
        const json = JSON.stringify(JSON.parse(e.target.  result), null, 2)
        const lines = json.split("\n")
      
        jsonToTree(lines)
        hideElements(name)
      }
      catch(err) {
        if(err instanceof SyntaxError)
          $('#error').show()
        else
          hideElements()
      }
    }
    reader.readAsText(file, "UTF-8")
  });
})

function hideElements(name) {
 $('#fileInput').hide()
 $('#name').css("display", "block")
 $('#name').text(name)
 $('#content').css("display", "block")
}