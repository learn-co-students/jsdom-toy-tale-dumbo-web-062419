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

document.addEventListener("DOMContentLoaded", function(){

  fetch("http://localhost:3000/toys")
    .then(function(response){
      return response.json();
    }).then(slapToysToTheDom)

/// Now we start on Creating a new toy- post and this is the Fetch

  const form = document.querySelector('.add-toy-form')
  form.addEventListener("submit", function(event){
    event.preventDefault()
    event.target.reset()

    const newToyName = event.target.name.value;
    console.log(event.target.name.value)
  })



})

function slapToysToTheDom(toys){
  toys.forEach(slapOneToyToTheDom);
}
//this is just uploading all the elements in the API
function slapOneToyToTheDom(oneItem){
  const toyCollection = document.getElementById('toy-collection');
  const div = document.createElement("div");
  console.log(oneItem.name)
  div.className = "card"

  div.innerHTML = `
    <h2> ${oneItem.name}</h2>
    <img src=${oneItem.image} class= "toy-avatar"/>
    <p> ${oneItem.likes} Likes </p>
    <button class="like-btn"> Like <3 </button>
`
 toyCollection.append(div)

}








// 1. When DOMContentLoaded happens
// 2. Make GET request to fetch all the toys
// 3. Slap Z on the DOM! Make <div class="card"> and add to toy-collection div

// OR HERE!
