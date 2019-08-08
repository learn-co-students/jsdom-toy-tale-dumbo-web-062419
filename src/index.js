const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

function listSingleToy(toy){
  toyCollection = document.getElementById("toy-collection")
  newDiv = document.createElement("div")
  newDiv.className = "card"
  newDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>Likes:${toy.likes}</p>
  <button class="like-btn">Like <3</button>
  `
  toyCollection.append(newDiv);
}

function ListToys(toysJson){
  toysJson.forEach(listSingleToy)
}

document.addEventListener("DOMContentLoaded", function(){

  toyCollection = document.getElementById("toy-collection")

  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  }).then(ListToys) 
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
        image: newToyImg
      })
    }).then(response => response.json())
      .then(listSingleToy)

    
  })


})
// OR HERE!
