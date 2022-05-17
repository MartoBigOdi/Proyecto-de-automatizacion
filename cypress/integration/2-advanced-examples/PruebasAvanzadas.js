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


  /*
  //Caso de prueba
  it("Realizar compra de celulares basadas en su titulo", function () {
    cy.get("#menu ul a:contains('Phones & PDAs')").click();

    //Caso de prueba completo con modularizacion y con un loop para no repetir codigo
    //Recorremos todo el array completo.
    this.datos.articulo.forEach((element) => {
      cy.agregarElementoAlCarrito(element);
    });

    //Validamos que esten los 3 telefonos agregados
    cy.get("#cart-total").should("contain.text", "3 item(s) - $583.19");
    cy.get(".btn-inverse").click();
  });
*/

  //Caso de prueba
  //Escenario: Sumar valores para corroborar el total
  it("Sumamos los valores de los articulos para corroborar que el total sea correcto, en dropdown de carrito", function () {

    cy.get("#menu ul a:contains('Phones & PDAs')").click();

    //Caso de prueba completo con modularizacion y con un loop para no repetir codigo
    //Recorremos todo el array completo.
    this.datos.articulo.forEach((element) => {
      cy.agregarElementoAlCarrito(element);
    });

    cy.get(".btn-inverse").click();


    //Iteramos para acumulador los precios y validar el total.
    this.datos.articulo.forEach((element) => {
      cy.verificamosElementosEnCarrito(element);
    });

    let contadorTotal = 0;

    cy.get("tr:has(button) td:contains('$')")
      .each(($el) => {
       
      //Guardamos todo el exto con el $ incluido 
      const monto = $el.text();
      //Con .replace() reemplazamos el $ por nada (' ').
      let precio = monto.replace('$','');
      
      //Volvemos el valor de la clase Number.
      contadorTotal = Number(contadorTotal) + Number(precio);
      
      cy.log("El total es: " + contadorTotal);
      })

       //Validamos que esten los 3 telefonos agregados
      cy.get("#cart > ul > li:nth-child(2) > div > table > tbody > tr:nth-child(4) > td:nth-child(2)").then(function($el){
      const monto = $el.text();
      let totalVerificar = monto.replace('$','');
      
      //Validamos con un expect() que un dato sea igual a otro.
      expect(Number(totalVerificar)).to.equal(Number(contadorTotal));
    })    

  });


});
