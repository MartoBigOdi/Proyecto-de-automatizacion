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

});  

  //Caso de prueba
  it("Realizar compra de celulares basadas en su titulo", function () {
    cy.get("#menu ul a:contains('Phones & PDAs')").click();
    
   //Caso de prueba completo con modularizacion
    cy.agregarElementoAlCarrito(this.datos.telefono1);
    cy.agregarElementoAlCarrito(this.datos.telefono2);
    cy.agregarElementoAlCarrito(this.datos.telefono3);
    
    //Validamos que esten los 3 telefonos agregados
    cy.get('#cart-total').should('contain.text', '3 item(s) - $583.19');
    cy.get('.btn-inverse').click();

  });

});
