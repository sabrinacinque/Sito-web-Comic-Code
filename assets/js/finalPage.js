document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("year").innerText = new Date().getFullYear(); //per l'anno nel footer
    const showTotalCart = JSON.parse(localStorage.getItem("totalCart")); // Correggi il nome della chiave
    const showListItemCart = JSON.parse(localStorage.getItem("listItemCart")); // Correggi il nome della chiave

    if (showListItemCart && showListItemCart.length > 0) {
        populateCart(showListItemCart);
    }
    if (showTotalCart && showTotalCart.length > 0) {
        updateTotalCart(showTotalCart);
    }
  
});


function populateCart(items) {
    const ul = document.getElementById("finalCart");
    const textAreaToSend = document.getElementById("listItemToSend");
    let itemsDescription = "";  // Inizializza una stringa vuota per accumulare le descrizioni

    items.forEach((item) => {
        const newLi = document.createElement("li");
        newLi.classList.add("d-flex", "flex-row", "justify-content-between", "mb-3");
        newLi.innerHTML = `<h4>${item.name} - €${item.price}</h4>`;
        ul.appendChild(newLi);  

        // Aggiungi ogni descrizione alla stringa con un salto di linea per separarle
        itemsDescription += `${item.name} - €${item.price}\n`;
    });
    
    // Aggiorna il valore della textarea una sola volta alla fine del ciclo
    textAreaToSend.value = itemsDescription.trim(); // Rimuove spazi vuoti all'inizio e alla fine
}


function updateTotalCart(totalCartArray) {
    const totalElement = document.getElementById("totalFinalCart");
    const totalElementToSend = document.getElementById("totalToSend");
    const total = totalCartArray.reduce((acc, price) => acc + price, 0); // Somma i prezzi
    const itemCart  = totalCartArray.length ;
    totalElement.innerText = `Totale: €${total.toFixed(2)} - Item : ${itemCart} `;
    totalElementToSend.value = `Totale: €${total.toFixed(2)} - Item : ${itemCart} `;
}


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
      alert("Email o password non corrette. Riprova.");
    }
  
    // Chiudi il modale
    let loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
  });

  function backToCart(){
    window.location.href="cart.html";
  }


  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = this;
    var data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Qui puoi aggiungere un messaggio di conferma se vuoi
            alert('Ordine inviato con successo!');
            // Dopo la conferma, resetta il carrello
            resetCartAndForm();
            // Opcionalmente reindirizza l'utente a una pagina di ringraziamento
            window.location.href = "index.html";
        } else {
            // Gestisci errori di invio
            response.json().then(data => {
                if (data.error) {
                    alert(data.error);
                }
            });
        }
    }).catch(error => {
        // Mostra errore generico
        alert('Si è verificato un errore. Riprova.');
    });
});

function resetCartAndForm() {
    // Resetta il form
    document.getElementById('myForm').reset();

    // Svuota il carrello e il totale salvati nel localStorage
    localStorage.removeItem("totalCart");
    localStorage.removeItem("listItemCart");

    // Aggiorna la UI per riflettere il carrello vuoto
    document.getElementById("finalCart").innerHTML = "";
    document.getElementById("totalFinalCart").innerText = "Totale: €0 - Item : 0";
    document.getElementById("totalToSend").value = "";
    document.getElementById("listItemToSend").value = "";
}



