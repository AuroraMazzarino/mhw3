

window.addEventListener("load", loginCheck);
window.addEventListener("load", generateRandomUsers);

//Controlla se hai effettuato l'accesso controllando se il token è nell'URL, in caso fosse così sostituisce i pulsanti 
//nome e pulsante di logout
function loginCheck() {
  const hashParts = splitHash(location.hash)
  const token = hashParts.access_token;
  if (token === undefined) return;
     
  //autorizzazione per accedere 
  fetch(`https://api.imgur.com/3/account/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then((risposta) => {
      document.getElementById("btn-vendi").outerHTML = `<a class="btn" href="/mhw3.html">Logout</a>`
      document.getElementById("btn-accedi").outerHTML = `<p>${risposta.data.url}</p>`
    })
}

// Prende tutti i nomi e tutti gli avatar degli utenti nel sito (dalla sezione degli oggetti in vendita)
// dopo fa una richiesta all'api randomuser.me chiedendo numeroPost utenti, dove numeroPost è il numero di oggetti visibili sul sito
// Infine imposta immagine e nome di ogni utente come uno randomico preso dall'API
function generateRandomUsers(){
  const nomi = document.querySelectorAll(".user-name")
  const immagini = document.querySelectorAll(".user-img")
  const numeroPost = nomi.length;
  
  fetch(`https://randomuser.me/api/?results=${numeroPost}`).then(res => res.json()).then((data) => {
    const utenti = data.results;
    nomi.forEach((nome, index) => {
      console.log(utenti[index]);
      const immagine = immagini[index];
      immagine.src = utenti[index].picture.thumbnail;
      nome.innerHTML = utenti[index].login.username 
    })

  })    

  
}


// Divide in parti tutto quello che si trova nell'hash dell'URL, ritornando un oggetto di tipo chiave : valore
function splitHash(hash) {
  return hash.replace("#", "").split("&")
    .map(v => v.split(`=`, 1).concat(v.split(`=`).slice(1).join(`=`)))
    .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});
}


    //per la scheda a tendina (catalogo)
function functionDropdown(idToShow) {
  document.getElementById(idToShow).classList.toggle("show");
}

window.addEventListener("click", e => {
  const isButtonClicked = e.target.classList.contains("drop-btn");
  if (!isButtonClicked) {
    const allDropdowns = document.querySelectorAll(".dropdown-content");
    allDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    })
  }
})
