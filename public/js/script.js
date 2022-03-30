document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("makeup-app JS imported successfully!");
    document.querySelectorAll('button').forEach(setUpFavButton)
  },
  false
);

function setUpFavButton(button) {
  button.addEventListener('click', axiosCall)
}

async function axiosCall(event) {
    const button =  event.target
    console.log(button)
    const buttonId = await axios.post('/products', {product: button.value})
    return buttonId.data
}
