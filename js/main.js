const searchBtn = document.querySelector('.search button');
const searchInp = document.querySelector('.search input')
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.querySelector('.result');
const sound = document.querySelector('.sound')

searchBtn.addEventListener('click', () => {
    let wordValue = searchInp.value;
    fetch(`${url}${wordValue}`)
    .then((respone) => respone.json())
    .then(data => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
        <h2>${wordValue}</h2>
        <button onclick = "playSound()">
            <i class="fa-solid fa-volume-up"></i>
        </button>
    </div>
    <div class="details">
        <span>${data[0].meanings[0].partOfSpeech}</span>
        <span>/${data[0].phonetic}/</span>
    </div>
    <div class="meaning">
        ${data[0].meanings[0].definitions[0].definition}
    </div>
    <div class="example">
    ${data[0].meanings[0].definitions[0].example || ''}
    </div>`;
    sound.setAttribute('src', `${data[0].phonetics[1].audio}`)
    console.log(sound);
    }).catch(()=>{
        result.innerHTML = `<h3>Couldn't find the word</h3>`
    })
    clearInputs();
})



function playSound(){
    sound.play();
}


function clearInputs(){
    document.querySelector('input').value = ''
}