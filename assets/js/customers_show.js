// Bouton clients du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');
const navbar = document.querySelector('.navbar');
let buttonPrevious;
let buttonConfirmDelete;
let containerConfirm;


// Evénement :
// Lorsque je clique sur l'icone Client du menu :
navbar.addEventListener('click', (e) => {
    if (e.target != null && e.target != undefined) {
        // Affichage de tous les clients
        if (e.target.id == "nav-button-customers" || e.target.parentElement.id == "nav-button-customers") {
            showAllCustomersWithAjax();
        }
    }
});

// Action sur les customers.
window.addEventListener('click', (e) => {

    let id = e.target.getAttribute('data-id') ? e.target.getAttribute('data-id') : undefined;

    switch (e.target.getAttribute('data-action')) {
        case 'show':
            showOneCustomer(id);
            break;
        case 'previous':
            showAllCustomersWithAjax();
            break;
        case 'delete':
            deleteOneCustomer(id);
            break;
        case 'yes':
            deleteConfirmCustomer(id);
            break;
        case 'no':
            deleteCancelCustomer();
        default:
            break;
    }

})


// Button Supprimé :
function deleteOneCustomer(id) {

    let inputHiddenFirstname = document.querySelector(`#customer-firstname-${id}`);
    let inputHiddenLastname = document.querySelector(`#customer-lastname-${id}`);
    let spanFirstnameLastname = document.querySelector("#confirm-delete-customer-fullname");

    spanFirstnameLastname.innerHTML = `${inputHiddenFirstname.value} ${inputHiddenLastname.value}`;

    containerConfirm = document.querySelector(".container-warning");
    buttonConfirmDelete = document.querySelector("#confirm-delete-customer-yes");

    buttonConfirmDelete.setAttribute('data-id', id);

    containerConfirm.style.display = "flex";

}


// Button Yes Confirm to Delete :
function deleteConfirmCustomer(id) {
    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch(`/app/customers/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;
        })
}


// Button No Confirm to Delete :
function deleteCancelCustomer() {
    containerConfirm = document.querySelector(".container-warning");
    containerConfirm.style.display = "none";
}



// Button Détail :
function showOneCustomer(id) {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch(`/app/customers/show/${id}`, {
            method: 'GET'
        })
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;
        })
}



// window.addEventListener('click', (e) => {

//     // SHOW/EDIT : Affichage, modification client
//     if (e.target.getAttribute("data-action") === "show" || e.target.getAttribute("data-action") === "edit" || e.target.getAttribute("data-action") === "add") {
//         if (e.target.getAttribute("data-id") != null && e.target.getAttribute("data-id") != undefined && e.target.getAttribute("data-id") != "") {
//             actionsCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-action"));
//         } else {
//             // ADD : Ajout d'un client
//             actionsCustomerWithAjax(null, e.target.getAttribute("data-action"));
//         }
//     }

//     // DELETE : Suppression d'un client
//     if (e.target.classList.contains('button-delete-customer')) {
//         e.preventDefault();
//         if (e.target.getAttribute("data-id") != null || e.target.getAttribute("data-id") != undefined) {
//             showLightboxConfirmDeleteCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-fullname"));
//             document.querySelector('#confirm-delete-customer-yes').addEventListener('click', (e) => {
//                 e.preventDefault();
//                 deleteCustomerWithAjax(e.target.getAttribute("data-id"))
//             })
//         }
//     }
// });


// Boutton Précédent sur un client + Button navbar 
function showAllCustomersWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch("/app/customers/show/all")
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}

// // Montre la lightbox de confirmation de suppression de client
// function showLightboxConfirmDeleteCustomerWithAjax(id, fullname) {
//     document.querySelector('#confirm-delete-customer-yes').setAttribute("data-id", id);
//     document.querySelector('#confirm-delete-customer-fullname').textContent = fullname;
// }

// // Suppression d'un client
// function deleteCustomerWithAjax(id) {
//     console.log(id);
//     // Container de rendu.
//     let app = document.querySelector('#app');

//     // Effacement du contenu existant.
//     app.innerHTML = "";

//     // Apparition du loader.
//     let loader = document.querySelector('.container-fluid-loader');
//     loader.style.display = "flex";

//     fetch(`/app/customers/delete/${id}`)
//         .then(res => {
//             return res.text();
//         })
//         .then(res => {

//             // Dès reception, disparition du loader.
//             loader.style.display = "none";

//             // Injecte le contenu receptionné dans le container.
//             app.innerHTML = res;
//         })
//         .catch(err => {
//             if (err) {
//                 throw err;
//             }
//         })
// }

















// // Bouton clients du menu.
// const navbar = document.querySelector('.navbar');

// // Evénement :
// navbar.addEventListener('click', (e) => {
//     // Affichage de tous les clients
//     if (e.target != null && e.target != undefined) {
//         if (e.target.id == "nav-button-customers" || e.target.parentElement.id == "nav-button-customers") {
//             actionsCustomerWithAjax("all", "show");
//         }
//     }
//     const cardCustomers = document.querySelector('.card-customers');
//     if (cardCustomers) {
//         cardCustomers.forEach(customer => {
//             customer.addEventListener('click', (e) => {

//                 // show/edit    Affichage, modification client
//                 if (e.target.getAttribute("data-action") === "show" || e.target.getAttribute("data-action") === "edit" || e.target.getAttribute("data-action") === "add") {
//                     if (e.target.getAttribute("data-id") != null && e.target.getAttribute("data-id") != undefined && e.target.getAttribute("data-id") != "") {
//                         actionsCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-action"));
//                     } else {
//                         // add    Ajout d'un client
//                         actionsCustomerWithAjax(null, e.target.getAttribute("data-action"));
//                     }
//                 }

//                 // delete    Suppression d'un client
//                 if (e.target.classList.contains('button-delete-customer')) {
//                     e.preventDefault();
//                     if (e.target.getAttribute("data-id") != null || e.target.getAttribute("data-id") != undefined) {
//                         showLightboxConfirmDeleteCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-fullname"));
//                         document.querySelector('#confirm-delete-customer-yes').addEventListener('click', (e) => {
//                             e.preventDefault();
//                             deleteCustomerWithAjax(e.target.getAttribute("data-id"))
//                         })
//                     }
//                 }
//             });
//         });
//     }
// });

// // Fonction AJAX redirection
// function actionsCustomerWithAjax(id, action) {

//     // Container de rendu.
//     let app = document.querySelector('#app');

//     // Effacement du contenu existant.
//     app.innerHTML = "";

//     // Apparition du loader.
//     let loader = document.querySelector('.container-fluid-loader');
//     loader.style.display = "flex";
//     if (id == null && id == undefined) {
//         $url = `/app/customers/${action}`;
//     } else {
//         $url = `/app/customers/${action}/${id}`;
//     }
//     fetch($url)
//         .then(res => {
//             return res.text();
//         })
//         .then(res => {

//             // Dès reception, disparition du loader.
//             loader.style.display = "none";

//             // Injecte le contenu receptionné dans le container.
//             app.innerHTML = res;
//         })
//         .catch(err => {
//             if (err) {
//                 throw err;
//             }
//         })
// }

// // Montre la lightbox de confirmation de suppression de client
// function showLightboxConfirmDeleteCustomerWithAjax(id, fullname) {
//     document.querySelector('#confirm-delete-customer-yes').setAttribute("data-id", id);
//     document.querySelector('#confirm-delete-customer-fullname').textContent = fullname;
// }

// // Suppression d'un client
// function deleteCustomerWithAjax(id) {

//     // Container de rendu.
//     let app = document.querySelector('#app');

//     // Effacement du contenu existant.
//     app.innerHTML = "";

//     // Apparition du loader.
//     let loader = document.querySelector('.container-fluid-loader');
//     loader.style.display = "flex";

//     fetch('/app/statistics')
//         .then(res => {
//             return res.text();
//         })
//         .then(res => {

//             // Dès reception, disparition du loader.
//             loader.style.display = "none";

//             // Injecte le contenu receptionné dans le container.
//             app.innerHTML = res;
//         })
//         .catch(err => {
//             if (err) {
//                 throw err;
//             }
//         })
// }