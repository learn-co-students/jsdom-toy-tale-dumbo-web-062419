const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toysCollection = document.getElementById("toy-collection");
const addToyForm = document.getElementById("add-toy-form");


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

function renderNewToy(toy){
    const toyDiv = document.createElement("div");
    toyDiv.className = "card";
    toysCollection.append(toyDiv);
    toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    `
}

function renderToys(toysArray){
  toysArray.forEach(renderNewToy);
}


// OR HERE!
document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys/")
  .then(res => res.json())
  .then(renderToys);


  addToyForm.addEventListener("submit", function(event){
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: event.target.name.value,
          image: event.target.image.value,
          likes: 0
        })
    }).then(res => res.json())
    .then(renderNewToy)
  })


  toysCollection.addEventListener("click", function(event){
    let likeBtnPressed = event.target.className === "like-btn"
    if (likeBtnPressed){
      console.log(event.target)
      let id = event.target.ParentElement.dataset.id;

      let like = event.target.previousElementSibling;
      let likeCount = parseInt(event.target.previousElementSibling.innerText)
        like.innerText = `${++likeCount} likes`;
          fetch(`http://localhost:3000/toys/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              likes: likeCount
            })
          })
          .then(response => response.json())
      }
    })


  })
