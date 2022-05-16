// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



//Primer elementos modularizado
Cypress.Commands.add("agregarElementoAlCarrito", (nombreProducto) => {

    cy.get("div[class='product-thumb']").as('contenedorDeProductos')

    cy.get("@contenedorDeProductos")
    .each(($el, index, $list) => {
      //buscamos el atributo y guardamos su valor ".then()"
      cy.get(':has(.caption) h4 a').eq(index).then( function($el1) {

        //Guardamos el texto que tiene para luego utilizar el ".include()""
          let producto = $el1.text();
          cy.log(producto);

          if (producto.includes(nombreProducto)) {
            //Mostramos msj
            cy.log('Encontramos el producto');
            cy.get("@contenedorDeProductos")
              .eq(index)
              .find("button[onclick^='cart.add']")
              .click();
              //Validamos cada iteracion
              cy.get('.alert-success.alert-dismissible').should('contain.text', nombreProducto)
          }
        });
    });
})