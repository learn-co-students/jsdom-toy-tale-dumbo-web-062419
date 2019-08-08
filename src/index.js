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
  <p>likes:${toy.likes}</p>
  <button class="like-btn">Like <3</button>
  `
  toyCollection.append(newDiv);
  const likeBtn = newDiv.lastElementChild

  likeBtn.addEventListener('click', function(){
    const allLikes = document.querySelectorAll('p')
    let likeContent = allLikes[toy.id]
    let currentLikes = toy.likes;
    let newLikes = currentLikes += 1;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    }).then(response => response.json())
      .then(likeContent.innerText = `likes:${newLikes}`)
  })
  
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