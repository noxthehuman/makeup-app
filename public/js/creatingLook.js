document.addEventListener(
    "DOMContentLoaded",
    () => {
        document.querySelectorAll('.addToLook').forEach(setUpAddButton);
        document.querySelector('form#createLookform').addEventListener('submit', checkIfEmpty)
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
    const lookToCreateData =  await axios.post("/looks/create", data)

    inputs.forEach((input) =>{
        input.value = ""
    })
    p.forEach((text) => {
        text.textContent = ""
    })

    alert('Look Created successfully !')
    
    //console.log(lookToCreateData, 'this is the data of the look created')
}

