/// <reference types="Cypress"/>

// Suite de casos de prueba 3.0
describe("Tercer conjunto de casos de prueba", function () {

    beforeEach( function () {
        //Ingresamos a la pagina 
        cy.visit("https://demo.opencart.com/index.php");
      });


      //Caso de prueba
      it('Realizar compra de celulares basadas en su titulo', function(){
            
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
      })

})