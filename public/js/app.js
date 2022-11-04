console.log('Loading client side java script.')

const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+searchText.value).then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                
                messageOne.textContent = data.weather
                messageTwo.textContent = data.location
            }
        })
    })
})