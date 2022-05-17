/// <reference types="Cypress"/>

// Suite de cassos de prueba 2.0
describe("Segundo conjunto de casos de prueba", function () {
  before(function () {
    //Cargamos los valores del archivo example.json en un objeto
    cy.fixture("example").then(function (data) {
      //Hacemos uso del "this.datos" para tener acceso desde otros scopes
      this.datos = data;
      //cy.log(datos.nombre)

    //Subimos un fixture en este caso es una imagen
    cy.fixture(this.datos.imagen).as("imagen"); 
    });

  });

  beforeEach( function () {
    //Ingresamos a la pagina de formulario, hasta los checkboxes de hobbies.
    cy.visit("https://demoqa.com/automation-practice-form");
  });

/*
  //Caso de pruebas 01: Seguimos con el formulario desde el calendar hasta cargar img
  it("LLenamos nuestro primer formulario utilizando data", function () {

    cy.log(this.datos.apellido)
    cy.get('#firstName').type(this.datos.nombre)
    cy.get('input[placeholder="First Name"]').should('id', 'firstName')

    cy.get('#lastName').type(this.datos.apellido)
    cy.get('#userEmail').type(this.datos.mail)
    
    //Al no poder hacer le click porque tiene un
    // elemento encima, utilizamos el ".check(){force:true}"
    //Interpolamos los datos del json en el selector
    cy.get('input[name="gender"][value="' + this.datos.sexo + '"]').check({force: true})
    .should('be.checked')
    cy.get('input[placeholder="Mobile Number"]').should('id', 'userNumber')
    cy.get('#userNumber').type(this.datos.telefono)
    cy.get("#dateOfBirthInput").click();

    //Verificamos si esta visible, el "month-select"
    //Con Select, elegimos los datos desde el array del example.json,
    //con posicionamiento directo accedemos a su valor y lo usamos.
    cy.get(".react-datepicker__month-select").select(
      this.datos.fechanacimiento[0]
    );
    cy.get(".react-datepicker__year-select").select(
      this.datos.fechanacimiento[1]
    );
    cy.get(".react-datepicker__day--0" + this.datos.fechanacimiento[2])
    .should("be.visible")
    .click();

    //Para el mes utilizamos "substring(desde,hasta)"   
    // entonces solo buscamos que contenga las primeras tres letras equal con lo que 
    //recibimos del posicionamiento directo
    cy.get("#dateOfBirthInput") 
    .should('contain.value', this.datos.fechanacimiento[0].substring(0,3))
    .should('contain.value', this.datos.fechanacimiento[1])
    .should('contain.value', this.datos.fechanacimiento[2])  

    cy.get('.subjects-auto-complete__value-container').type(this.datos.materia)
    cy.get('div[id^="react-select-"]').click()

    //Validamos que el dato sea lo agregado desde el .json
    cy.get('.subjects-auto-complete__value-container').should('contain.text', this.datos.materia)
   
    //Asi podemos reutilizar el metodo con la info del .json
    cy.get("div[class='custom-control custom-checkbox custom-control-inline']:has(label:contains('" + this.datos.hobbies[0] + "')) input").check({force: true})

  });

  
 */

  //Caso de prueba 02: Cargamos un archivo, en este caso una img.
  it("LLenamos nuestro primer formulario utilizando data, parte 2", function () {

    //Subimos archivo al formulario, aca es copiar y modificar lo que sea necesario.
    cy.get('#uploadPicture').then(function($el){
        //Tenemos que convertir la imagen es un string base 64
        const blob = Cypress.Blob.base64StringToBlob(this.imagen,'image/jpg');

        const file = new File([blob],this.datos.imagen, {type: 'image/jpg'});

        const list = new DataTransfer();

        list.items.add(file);

        const myFileList = list.files;

        $el[0].files = myFileList
        $el[0].dispatchEvent(new Event('change', { bubbles: true }));
    });


    //Subimos la direccion 
    cy.get('#currentAddress').type(this.datos.direccion).should('contain.value','siempre viva')


    //Elegimos en el dropdowns de Estado y ciudad
    //Validamos que esten visibles
    cy.get('#state').click().find("div:contains('"+ this.datos.estado +"')[id^='react-select']").should('be.visible').click();
    cy.get('#city').click().find("div:contains('"+ this.datos.ciudad +"')[id^='react-select']").should('be.visible').click();

  })  

});
