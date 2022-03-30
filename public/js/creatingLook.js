document.addEventListener(
    "DOMContentLoaded",
    () => {
        document.querySelectorAll('.addToLook').forEach(setUpAddButton);
        // document.querySelector('#createLook').addEventListener('click', checkIfEmpty)
    },
    false
)

function setUpAddButton(button) {
    button.addEventListener('click', populateLookForm)
}

async function populateLookForm(event) {
    const button = event.target
    const productType =  button.parentElement.querySelector('[type = "hidden"]').value
    console.log(productType)
    const productSection =  document.getElementById(productType)
    const selectedProductElement = button.parentElement.querySelector('p')
    productSection.querySelector('input').value = selectedProductElement.dataset.productId
    
    productSection.querySelector('p').textContent = selectedProductElement.textContent

}



// async function checkIfEmpty(event) {
//     event.preventDefault()
//     const data = {}
//     const input = event.querySelectorAll('input')
//     input.forEach(()=> {
//         if(input.value !== "") {
//             data[input.name] = input.value
//         }
//     })
//     await axios.post("/profile", data)
// }

