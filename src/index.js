document.addEventListener("DOMContentLoaded" , function(){
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById("toy-collection")
  // const body = document.querySelector("body")
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


  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toysOnDom)


  //----------------- Read__________________
    function toysOnDom(toys){
      toys.forEach(toy => {
      
      const div = document.createElement("div")
      let span = document.createElement("span")
      
      div.className = "card"
      span.setAttribute("data-id", `${toy.id}`)
      span.setAttribute("contenteditable", true)
      span.innerHTML =`  
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} </p>
        <button class="like-btn">Like <3</button>
        <button class="delete-btn">Remove</button>
  `
      // span.addEventListener("blur", update)
        div.appendChild(span)
        toyCollection.append(div)
      })
//-----------------EndOfRead__________________


//-----------------Create__________________
    }
    toyForm.addEventListener("submit" , function(){
    event.preventDefault()  
    let name  = event.target.name.value
    let img = event.target.image.value
      fetch("http://localhost:3000/toys",{
        method: 'POST',
        headers: 
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(          {
            "name": `${name}`,
            "image": `${img}`,
            "likes": 0
          })

      })
      .then(res => res.json())
      .then(newToy)

    })


    function newToy(toy){
      // const body = document.querySelector("body")
      const div = document.createElement("div")

      div.className ="card"
      span.setAttribute("data-id", `${toy.id}`)
      span.setAttribute("contenteditable", true)
      span.innerHTML =`  
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} </p>
        <button class="like-btn">Like <3</button>
        <button class="delete-btn">Remove</button>
  `
    toyCollection.appendChild(div)
      

    }
    //-----------------EndOfCreate__________________
    
    //-----------------Update__________________
    toyCollection.addEventListener("click", function(){
      let id = event.target.parentNode
      let cardLikes = id.querySelector("p")
      if  (event.target.className == "like-btn") {
          cardLikes.innerText ++
          fetch(`http://localhost:3000/toys/${id.getAttribute("data-id")}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json" 
            },
            body: JSON.stringify({
                  likes: cardLikes.innerText
            })
          })
      

      }

    // fetch(`http://localhost:3000/toys/${event.target.card}`)
  })

    //-----------------EndOfUpdate__________________

    //-----------------Delete__________________

    toyCollection.addEventListener("click", function(){
      let id = event.target.parentNode
      if  (event.target.className == "delete-btn") {
        
          fetch(`http://localhost:3000/toys/${id.getAttribute("data-id")}`, {
            method: 'DELETE'
          }).then(function() {
            toyCollection.removeChild(id.parentNode)
          })

      }

    // fetch(`http://localhost:3000/toys/${event.target.card}`)
  })
//-----------------EndOfDelete__________________


    
    
  
  // OR HERE!
  

})
