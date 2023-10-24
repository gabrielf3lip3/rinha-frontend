import { jsonToTree } from "./worker.js"

jQuery(() => {    
  $(document).on('click' ,'li.test', function(e) {
    alert("Clicou")
  })

  const input = document.getElementById("input")

  input.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const json = JSON.stringify(JSON.parse(e.target.result), null, 2)
      const lines = json.split("\n")
      
      jsonToTree(lines)
    }
    reader.readAsText(file, "UTF-8")
  });
})
