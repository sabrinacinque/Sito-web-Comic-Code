document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("year").innerText = new Date().getFullYear(); //per l'anno nel footer
    const showTotalCart = JSON.parse(localStorage.getItem("totalCart"));
    const showListItemCart = JSON.parse(localStorage.getItem("listItemCart"));


    if (showListItemCart && showListItemCart.length > 0) {
        populateCart(showListItemCart);
    }
    if (showTotalCart && showTotalCart.length > 0) {
        updateTotalCart(showTotalCart);
    }
});

function populateCart(items) {
    const ul = document.getElementById("ulCart");
    items.forEach((item, index) => {
        const newLi = document.createElement("li");
        newLi.classList.add("d-flex","flex-row","justify-content-between","mb-3")
        newLi.innerHTML = `<h4>${item.name} - €${item.price}</h4>
         <button type="button" class="btn btn-danger" onclick="removeFromCart(${index})">X</button>`;
        ul.appendChild(newLi);
    });
}

function updateTotalCart(totalCartArray) {
    const totalElement = document.getElementById("totalCart");
    const total = totalCartArray.reduce((acc, price) => acc + price, 0); // Somma i prezzi
    const itemCart  = totalCartArray.length ;
    totalElement.innerText = `Totale: €${total.toFixed(2)} - Item : ${itemCart} `;
}

function removeFromCart(index) {
    let showTotalCart = JSON.parse(localStorage.getItem("totalCart"));
    let showListItemCart = JSON.parse(localStorage.getItem("listItemCart"));

    if (showTotalCart && showListItemCart && index >= 0 && index < showListItemCart.length) {
        showTotalCart.splice(index, 1); // Rimuove il prezzo dal totale
        showListItemCart.splice(index, 1); // Rimuove l'articolo dall'elenco

        localStorage.setItem('totalCart', JSON.stringify(showTotalCart));
        localStorage.setItem('listItemCart', JSON.stringify(showListItemCart));

        document.getElementById("ulCart").innerHTML = ''; // Pulisce la lista
        populateCart(showListItemCart); // Ricarica la lista
        updateTotalCart(showTotalCart); // Aggiorna il totale
    }
}


function backHome(){
    window.location.href="index.html";
}
function goToFinalPage() {
    window.location.href = "finalPage.html";
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
      // Mostra un messaggio di errore
      alert("Email o password non corrette. Riprova.");
    }
  
    // Chiudi il modale
    let loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
  });