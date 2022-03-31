document.addEventListener(
    "DOMContentLoaded",
    () => {
        document.querySelectorAll('.addToLook').forEach(setUpAddButton);
        document.querySelector('form#createLookform').addEventListener('submit', checkIfEmpty)
        document.querySelector('form#delete').addEventListener('submit', deleteFav)
    },
    false
)

function setUpAddButton(button) {
    button.addEventListener('click', populateLookForm)
}

async function populateLookForm(event) {
    const button = event.target
    const productType =  button.parentElement.querySelector('[type="hidden"]').value
    console.log(productType)
    const productSection =  document.getElementById(productType)
    const selectedProductElement = button.parentElement.querySelector('p')
    productSection.querySelector('input').value = selectedProductElement.dataset.productId
    
    productSection.querySelector('p').textContent = selectedProductElement.textContent

}

async function checkIfEmpty(event) {
    event.preventDefault()
    const data = {}
    const inputs = event.target.querySelectorAll('input')
    const p = event.target.querySelectorAll('p')
    inputs.forEach((input)=> {
        if(input.value !== "") {
            data[input.name] = input.value
        }
    })
    console.log(data)
    await axios.post("/looks/create", data)

    inputs.forEach((input) =>{
        input.value = ""
    })
    p.forEach((text) => {
        text.textContent = ""
    })

    alert('Look Created successfully !')
    
}

async function deleteFav(event) {
    event.preventDefault()
    const productId = event.target.querySelector('input[type= "hidden"]').value
    console.log(productId)
    
    await axios.delete('/profile/delete/' + productId)

    delete(event.target)
}

