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


// OR HERE!


// STEPS 
// FIRST FIND YOUR CONST toy-collection
//const toyDiv = document.getElementById('toy-collection')
document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementsByClassName('add-toy-form')
console.log(form)
  // fetch("http://localhost:3000/toys", newToyObject) // This fetch is for 

  // newToyObject = { // 
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     // name: 
  //     //   image:
  //     // likes:
  // })

  // };
  fetch("http://localhost:3000/toys") // WE ARE GETTING THE DATA FROM URL
    .then(response => response.json()) //WE AER CONVERTING THE DATA TO JSON FORMAT
    .then(json => renderToys(json)); // CALL BACK 
})

function renderToys(toys) {
  // WE NEED TO FIND A PLACE 
  const placeWhereToysGo = document.getElementById('toy-collection');
  toys.forEach(function (toyObj) {
    //console.log(toyObj)
    // WE NEED TO CREATE A SHELF FOR TO PLACE THE TOYS
    const toyDiv = document.createElement('div')
    const nameTag = document.createElement('h1')
    const imageTag = document.createElement('img');
    const likesTag = document.createElement('p');
    //const likesButton = document.createElement('button')
    //likesButton.setAttribute("class", "like-btn")
    // WE NEED TO ADD IMAGES To Place WHERE TOYS GO
    //placeWhereToysGo.appendChild(imageTag)

    placeWhereToysGo.appendChild(toyDiv)

    toyDiv.appendChild(imageTag, nameTag, likesTag, likesButton)
    // toyDiv.appendChild(nameTag)
    // toyDiv.appendChild(likesTag)
    // toyDiv.appendChild(likesButton)
    imageTag.src = toyObj.image
    nameTag.innerText = toyObj.name
    likesTag.innerText = toyObj.likes
    imageTag.style.width = "200px"
  });
}




