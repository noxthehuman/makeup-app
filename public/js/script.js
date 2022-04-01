document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("makeup-app JS imported successfully!");
    document.querySelectorAll('button#fav').forEach(setUpFavButton)
  },
  false
);

function setUpFavButton(button) {
  const value = button.value
  button.addEventListener('click', () => favAxiosCall(value))
}

async function favAxiosCall(value) {
    console.log(value)
    const buttonId = await axios.post('/products/favorites', {product: value})
    return buttonId.data
}

