
/*


Make a request to the /randomWords API
Then use that word to make a request to the Google Books API
You should request a book whose title has that random word


For your convenience, here is the URL for this API: https://www.googleapis.com/books/v1/volumes?q=title:WORD_HERE

Nice, you've created a random book generator.

*/

$.get('/randomWord').then(function(word){
  $.get(`https://www.googleapis.com/books/v1/volumes?q=title:${word}`)
  .then(function(data){
    console.log(data)
  })
})


let wordPromise = $.get('/randomWord')
wordPromise.then(function(word){
  let googlePromise = $.get(`https://www.googleapis.com/books/v1/volumes?q=title:${word}`)
  let giphyPromise = $.get(`https://api.giphy.com/v1/gifs/random?api_key=wzMJe7iL5ui3hlDLn8r0io5KH1w31HA3&tag=${word}&rating=r`)
  Promise.all([googlePromise,giphyPromise]).then(function(data){
    $('body').append(`<h2>${data[0].items[0].volumeInfo.title}</h2>`).append($(`<img src="${data[1].data.image_url}">`))
  })
})










$.ajax({
  method: "GET",
  url: "/randomWord",
  success: function (word) {
      $.ajax({
          method: "GET",
          url: `/synonyms/${word}`,
          success: function (synonyms) {
              $.ajax({
                  method: "GET",
                  url: `sentiment/${word}`,
                  success: function (response) {
                      console.log(`
                      The word ${word} has a 
                      ${response === 1 ? "Positive" : response === -1 ? "Negative" : "Neutral"} sentiment,
                      its synonyms are: ${synonyms}`)
                  },
                  error: function (err) {
                      console.log(err)
                  }
              })
          },
          error: function (err) {
              console.log(err)
          }
      })
  },
  error: function (err) {
      console.log(err)
  }
})




let p = $.get('/randomWord')

p.then(function (word) {
    console.log(word)
})

let w = $.get('/sentiment/Ploy')

w.then(function (word) {
    console.log(word)
})

