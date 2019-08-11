const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  //Add New Toy
const form = document.getElementById("newtoy");
form.addEventListener("submit", function(event){
  event.preventDefault();
    const newToyName = event.target.name.value;
    const newToyImage = event.target.image.value;
    //Post request for Adding A Toy
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImage,
        likes: 0
      })
    }).then(function(response){
      return response.json()
    }).then(toyCard)
  })

//Increase the amount of likes when the button is clicked!
const toyCollection = document.getElementById('toy-collection')

toyCollection.addEventListener("click", (event) => {

  if (event.target.className=== "like-btn"){
    let currentLikes = parseInt(event.target.previousElementSibling.innerText);
    let newLikes = currentLikes + 1;
    event.target.previousElementSibling.innerText = newLikes + " Likes";
//Updating the like amount
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
  }
//Deleting a Toy Card
  if (event.target.className=== "delete-btn"){
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`,{
      method: "DELETE"
    }).then(response => {
      event.target.parentElement.remove()
    })
  }
})


//Fetching data from api
fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
      }).then (toyToAdd)
      //     ## Create
      // 1. When Click on the Add button event happens
      // 2. Make POST /fetch toys
      // 3. Slap the single toy on the DOM!



})
//Setting up the Toy Card
function toyCard(toy){
const toyCollection = document.getElementById('toy-collection')

  toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id = ${toy.id} class="like-btn">Like <3</button>
    <button data-id = ${toy.id} class="delete-btn">Bye-Bye-Bye</button>
  </div>`

  //ANOTHER WAY TO WRITE ABOVE CODE
  // newDiv.className = "card";
  //creates H2
  // const h2 = document.createElement("h2")
  // h2.innerText = toy.name
  // newDiv.append(h2);
  // //creates Image Tag
  // const imgTag = document.createElement("img");
  // imgTag.className = "toy-avatar"
  // imgTag.setAttribute("src",toy.image)
  // newDiv.append(imgTag);
  // //creates P Tag
  // const paragraph = document.createElement("p");
  // paragraph.innerHTML = `${toy.likes} Likes`;
  // newDiv.append(paragraph);
  // //creates Button Tag
  // const button = document.createElement("button");
  // button.innerHTML += `<
  // button.className = "like-btn";
  // button.innerText = "Likes";
  // newDiv.append(button);

}
//For each method for each Toy Card
function toyToAdd(data){
//callback function on toycard
data.forEach(toyCard)
}



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
