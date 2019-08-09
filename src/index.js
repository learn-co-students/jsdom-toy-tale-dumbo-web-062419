const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

function listToys(toysJson){
  toysJson.forEach(listSingleToy)
}

function listSingleToy(toy){
  toyCollection = document.getElementById("toy-collection")
  newDiv = document.createElement("div")
  newDiv.className = "card"
  newDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>likes:</p>
  <p id="toy-${toy.id}">${toy.likes}</p>
  <button class="like-btn">Like <3</button>
  `

  const likeBtn = newDiv.querySelector('button')
  // console.log(likeBtn)
  const numOflikes = newDiv.querySelector('p')
  // console.log(numOflikes)
  likeBtn.dataset.id = toy.id
  numOflikes.dataset.id = toy.id

  
  

  likeBtn.addEventListener('click', addLikes)

  toyCollection.append(newDiv);
}

function addLikes(event){

  const id = event.target.dataset.id
  const likes = document.getElementById(`toy-${id}`)
  let currentLikes = likes.textContent
  let newLikes = parseInt(currentLikes, 10) + 1
  

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "applicatin/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  }).then(response => response.json())
    .then(updateLikes)
}

function updateLikes(toy){
  let likeContent = document.getElementById(`toy-${toy.id}`)
  likeContent.innerText = `${toy.likes}`
}



document.addEventListener("DOMContentLoaded", function(){

  toyCollection = document.getElementById("toy-collection")

  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  }).then(listToys) 


})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

addBtn.addEventListener("click", function(){

  const form = document.getElementById("newToyForm")
  form.addEventListener("submit", function(event){
    event.preventDefault()
    const newToyName = event.target.name.value
    const newToyImg = event.target.image.value 

    event.target.reset() 

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImg,
        likes: 0
      })
    }).then(response => response.json())
      .then(listSingleToy)

    
  })

  

})