/// <reference types="Cypress"/>

// Suite de casos de prueba 3.0
describe("Tercer conjunto de casos de prueba", function () {

  beforeEach(function () {
    //Ingresamos a la pagina
    cy.visit("https://demo.opencart.com/index.php");
     
     //Cargamos los valores del archivo example.json en un objeto
     cy.fixture("opencart").then(function (data) {
      //Hacemos uso del "this.datos" para tener acceso desde otros scopes
      this.datos = data;
      
  });

})  

  //Caso de prueba
  it("Realizar compra de celulares basadas en su titulo", function () {
    cy.get("#menu ul a:contains('Phones & PDAs')").click()
    
    cy.get("div[class='product-thumb']").as('contenedorDeProductos')

    cy.get("@contenedorDeProductos")
    .each(($el, index, $list) => {
      //buscamos el atributo y guardamos su valor ".then()"
      cy.get(':has(.caption) h4 a').eq(index).then( function($el1) {

          let producto = $el1.text();
          cy.log(producto);

          if (producto.includes(this.datos.telefono1)) {
            //Mostramos msj
            cy.log('Encontramos el producto');
            cy.get("@contenedorDeProductos")
              .eq(index)
              .find("button[onclick^='cart.add']")
              .click();
          }
        });
    });

    cy.get("@contenedorDeProductos")
    .each(($el, index, $list) => {
      //buscamos el atributo y guardamos su valor ".then()"
      cy.get(':has(.caption) h4 a').eq(index).then( function($el1) {

          let producto = $el1.text();
          cy.log(producto);

          if (producto.includes(this.datos.telefono2)) {
            //Mostramos msj
            cy.log('Encontramos el producto');
            cy.get("@contenedorDeProductos")
              .eq(index)
              .find("button[onclick^='cart.add']")
              .click();
          }
        });
    });


    cy.get("@contenedorDeProductos")
    .each(($el, index, $list) => {
      //buscamos el atributo y guardamos su valor ".then()"
      cy.get(':has(.caption) h4 a').eq(index).then( function($el1) {

          let producto = $el1.text();
          cy.log(producto);

          if (producto.includes(this.datos.telefono3)) {
            //Mostramos msj
            cy.log('Encontramos el producto');
            cy.get("@contenedorDeProductos")
              .eq(index)
              .find("button[onclick^='cart.add']")
              .click();        
          }
        });
    });
    
    cy.get('#cart-total').should('contain.text', '3 item(s) - $583.19')

  });

}
);
