const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
//<input type="text" name="name" value="" placeholder="Enter a toy's name..." class="input-text">
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

// X Event
document.addEventListener("DOMContentLoaded", function () {

  fetch("http://localhost:3000/toys") // WE ARE GETTING THE DATA FROM URL
    .then(response => response.json()) //WE AER CONVERTING THE DATA TO JSON FORMAT
    .then(json => renderToys(json)); // 

})


function renderToys(toys) {
  // WE NEED TO FIND A PLACE 
  const placeWhereToysGo = document.getElementById('toy-collection');
  // Using The forEach loop To iterating through the Json file the we fetched
  toys.forEach(function (toyData) {

    // WE NEED TO CREATE A SHELF FOR TO PLACE THE TOYS
    const toyDiv = document.createElement('div');
    const imageTag = document.createElement('img');
    const nameTag = document.createElement('h2');
    const likeTag = document.createElement('p');
    const likeButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    toyDiv.className = "card"
    // Adding our Created Elements to the HTML DOC
    placeWhereToysGo.appendChild(toyDiv)
    toyDiv.appendChild(nameTag)
    toyDiv.appendChild(imageTag)
    toyDiv.appendChild(likeTag)
    toyDiv.appendChild(likeButton)
    toyDiv.appendChild(deleteButton)

    // ADDED Values to Elements that were Added on Top


    //Name
    nameTag.innerText = toyData.name

    //Image
    imageTag.src = toyData.image
    imageTag.style.width = "200px"

    //Like
    likeTag.innerText = toyData.likes + " Likes"
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"

    // Delete Button
    deleteButton.innerText = "Delete"
    deleteButton.className = "delete-btn"

    //--------------------------




    likeButton.addEventListener("click", event => {


      if (event.target.className === "like-btn") {

        let currentLikes = parseInt(event.target.previousSibling.innerText)
        let newLikes = currentLikes + 1
        event.target.previousSibling.innerText = newLikes + " Likes"

        fetch(`http://localhost:3000/toys/${toyData.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            likes: newLikes
          })
        })

      }
    })

    deleteButton.addEventListener("click", event => {
      if (event.target.className === "delete-btn") {
        fetch(`http://localhost:3000/toys/${toyData.id}`, {
          method: "DELETE"
        })
        .then( response => {
          event.target.parentElement.remove()
        })
      }
    })




  })
}

const addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener("submit", function (event) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`,
      image: `${event.target.image.value}`,
      likes: 0
    })
  }).then(resp => resp.json())
    .then(json => renderToys(json))

})


