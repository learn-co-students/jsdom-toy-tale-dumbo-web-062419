const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(listToys)

  function listToys(toysData) {
    toysData.forEach(addToyDOM)
  }

  function addToyDOM(toy) {
    // console.log(toy)
    const toyCollection = document.getElementById("toy-collection")
    const toyDiv = document.createElement("div")
    toyDiv.className = "card"
    toyDiv.dataset.id = toy.id
    toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.append(toyDiv)

    const likeBtn = toyDiv.querySelector(".like-btn")
    likeBtn.addEventListener("click", function() {
      const toyId = event.target.parentElement.dataset.id
      // console.log(toyId)
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes += 1
        })
      }).then(res => res.json())
        .then(slapLikesDOM)
    })

    function slapLikesDOM(likeData) {
      // console.log(likeData.likes)
      const likeTag = toyDiv.querySelector("p")
      likeTag.innerText = `${likeData.likes} Likes`
    }
  }

  toyForm.addEventListener("submit", function() {
    event.preventDefault()
    // console.log(event.target)
    const newToyName = toyForm.querySelector("input[name='name']").value
    const newToyImage = toyForm.querySelector("input[name='image']").value

    if (newToyName != "" && newToyImage != "") {
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: newToyName,
          image: newToyImage,
          likes: 0
        })
      }).then(res => res.json())
        .then(addToyDOM)
    }
  })

})
