jQuery(() => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./worker.js')
    .then(registration => {
      console.log("Service registrated")
    })
    .catch(error => {
      console.error("Service Worker failed")
    })
  }

  $('#input').on("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const name = file.name

    reader.onload = (e) => {

      try {
        const obj = JSON.parse(e.target.result)
        const json = JSON.stringify(obj, null, 2)
        const lines = json.split("\n")
      
        const worker = new Worker('./worker.js')
        worker.postMessage({
          action: 'jsonToTree',
          data: lines
        });

        worker.addEventListener('message', (e) => {
          const { action, result } = e.data

          if(action === 'jsonToTreeResult') {
            $('#tree').html(result)
            hideElements(name)
          }
        })
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