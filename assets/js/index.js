
// Funzione per aggiornare il badge del carrello
function updateBadgeCart() {
    const itemCart = listItemCart.length;  // Calcola il numero di elementi nel carrello
    const totalAmount = totalCart.reduce((a, b) => a + b, 0).toFixed(2);  // Calcola il totale
    document.getElementById("badgeCart").innerText = `${itemCart} - €${totalAmount}`;
}

// Funzione per aggiungere articoli al carrello
function addToCart(gadget) {
    itemCart++;  // Incrementa il numero di articoli nel carrello
    totalCart.push(gadget.price);  // Aggiunge il prezzo all'array dei prezzi
    listItemCart.push({ name: gadget.name, price: gadget.price });  // Aggiunge l'oggetto all'array dei dettagli

    alert("Prodotto aggiunto con successo!")
    // Aggiorna il badge del carrello
    updateBadgeCart();

    // Salva gli array aggiornati nel localStorage
    localStorage.setItem('totalCart', JSON.stringify(totalCart));
    localStorage.setItem('listItemCart', JSON.stringify(listItemCart));
}

// Funzione per generare le card dei gadget
function generateGadgetCards(gadgetsArray) {
    const row = document.getElementById("events-row");
    gadgetsArray.forEach(gadget => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
            <div class="card h-100 d-flex flex-column border-3 border-danger bg-black text-white">
                <img src="${gadget.imageUrl}" class="card-img-top" alt="immagini di gadget" style="width: 100%; height: 300px;">
                <div class="card-body d-flex flex-column justify-content-around">
                    <h5 class="card-title">${gadget.name}</h5>
                    <p class="card-text">${gadget.description}</p>
                    <div class="col d-flex flex-column justify-content-end ">
                        <p class="card-text">Brand: ${gadget.brand}</p>
                        <p class="card-text fs-4">${gadget.price}€</p>
                        <div class="d-flex justify-content-evenly">
                            <button class="btn btn-success text-danger fw-bolder fs-4 border-danger border-3" onclick='addToCart(${JSON.stringify(gadget).replace(/'/g, "&apos;")})'>Add<i class="bi bi-cart4"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        row.appendChild(newCol);
    });
}

  /* Modificato per aggiornare correttamente il carrello e visualizzare la somma dei prezzi
  function addToCart(gadget) {
    const badgeCart = document.getElementById("badgeCart");
    itemCart++;  // Incrementa il numero di articoli nel carrello
    totalCart.push(gadget.price);  // Aggiunge il prezzo all'array dei prezzi
    listItemCart.push({ name: gadget.name, price: gadget.price });  // Aggiunge l'oggetto all'array dei dettagli
    alert("prodotto aggiunto con successo")
  
    // Aggiorna il badge del carrello per mostrare sia il conteggio degli articoli che la somma dei prezzi
    badgeCart.innerText = `${itemCart} - €${totalCart.reduce((a, b) => a + b, 0).toFixed(2)}`;
  
    // Salva gli array aggiornati nel localStorage
    localStorage.setItem('totalCart', JSON.stringify(totalCart));
    localStorage.setItem('listItemCart', JSON.stringify(listItemCart));
  }*/

document.getElementById('badgeCart').innerText = '0 - €0.00';  // Inizializza il testo del badge all'avvio della pagina


const getGadgets = function () {
  //  recuperiamo la lista di gadget attualmente nel database
  const spinner = document.querySelector(".spinner-border");
  const logo = document.getElementById("logo");
  spinner.style.display = "block";
  logo.style.display = "none";
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDNhNzgxODQ0MjAwMTUzNzU4ODAiLCJpYXQiOjE3MTUzMjc5MTEsImV4cCI6MTcxNjUzNzUxMX0.WUZwlrTwgdt8ro-TFJjsPS5CvWRqmhd3-bMc-OOBweM",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "block"; // Mostra il messaggio di errore

        if (response.status === 404) {
          errorMessageElement.innerText =
            "Errore: La risorsa richiesta non è stata trovata.";
        } else if (response.status === 500) {
          errorMessageElement.innerText =
            "Errore: La risposta del server è stata negativa.";
        } else {
          errorMessageElement.innerText = "Errore sconosciuto.";
        }

        throw new Error("Errore durante la richiesta.");
      }
    })
    .then((array) => {
      console.log("ARRAY!", array);
      spinner.style.display = "none";
      logo.style.display = "block";
      // creiamo le card per la landing page
      generateGadgetCards(array);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getGadgets();



function openLoginModal() {
  let loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  loginModal.show();
}

 document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let email = document.getElementById('emailInput').value;
  let password = document.getElementById('passwordInput').value;

  // Verifica se l'email e la password sono corrette
  if (email === "amministrazione@admin.it" && password === "123456") {
    // Reindirizza l'utente alla pagina indexAmministrazione.html
    window.location.href = "indexAmministrazione.html";
  } else {
    // Mostra un messaggio di errore
    alert("Email o password non corrette. Riprova.");
  }

  // Chiudi il modale
  let loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  loginModal.hide();
});

let itemCart = 0;
const totalCart = [];
const listItemCart = []; 

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("year").innerText = new Date().getFullYear();  // Imposta l'anno corrente
  getGadgets();  // Richiama i gadget

  const storedTotalCart = JSON.parse(localStorage.getItem('totalCart'));
  const storedListItemCart = JSON.parse(localStorage.getItem('listItemCart'));

  if (storedTotalCart && storedListItemCart) {
    // Ripristina i dati dagli array salvati
    totalCart.push(...storedTotalCart);
    listItemCart.push(...storedListItemCart);

    // Inizializza itemCart con il numero di elementi già presenti nel carrello
    itemCart = listItemCart.length;

    updateBadgeCart();  // Aggiorna la UI con i dati ripristinati
  }
});



function goToCart() {
  window.location.href = "cart.html";
}






