const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", ()=> {
// the above waits until the e is loaded.
// I am pasting the addBtn into document.e listener
// addBtn will wait until the content is loaded
console.log("%cDOM is loadeddd", "color :purple")
// I run open index.html in my terminal and open console, which
// shows: "DOM is loadeddd"

//## 1 Fetch Andy's Toys

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    let toysHTML = toys.map(function(toy) {
      return `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
        <button data-id="${toy.id}" class="delete-btn">back in the toy chest</button>
      </div>
      `
    })
    toyCollection.innerHTML = toysHTML.join('')
    //abovementioned is I am grabbing the toy collection and and shape it to
    //fit the HTML form and join removes the crap(commas) from the page
  })



//## 2 Add a New Toy

toyForm.addEventListener("submit", e => {
  e.preventDefault()
  let newName = e.target.name.value
  let newImage = e.target.image.value

  fetch("http://localhost:3000/toys", {
  method: 'POST', // or 'PUT'
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json' //that's just because Sam has it this way
  },
  body: JSON.stringify({
    name: newName,
    image: newImage,
    likes: 0
  }) // data can be `string` or {object}!
}) //this is the end of my fetch
//this line is empty because it's an empty promise
//but we get our promise back
//and we can do our then
//then always comes after the promise in post

    .then(response => response.json())
    .then(newToy => {

      //fetch updated the DB
      //now I need to update that DOM!
      //convert the newToy from JSON to HTML in order to add to the DOM.com

      let newToyHTML =
      `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>

      </div>
      `

      toyCollection.innerHTML += newToyHTML
      console.log(e.target.reset())
    })
})  //this is the end of my eventListener

//## 4 Increase Toy's Likes
toyCollection.addEventListener('click', (e) => {
  console.log(e.target)
  if (e.target.className === "like-btn") {

      let currentLikes =
      parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes + " likes"

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }

    if (e.target.className === "delete-btn"){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      .then(response => {
        e.target.parentElement.remove()
      })
    }
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

}) //this is the end of my whole document

// OR HERE!
