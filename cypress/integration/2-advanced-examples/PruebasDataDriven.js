/// <reference types="Cypress"/>

// Suite de cassos de prueba 2.0
describe('Segundo conjunto de casos de prueba', function(){

    before(function(){
        //Cargamos los valores del archivo example.json en un objeto
        cy.fixture("example").then(function(data){
            //Hacemos uso del "this.datos" para tener acceso desde otros scopes
            this.datos = data;
            //cy.log(datos.nombre)
        })
    })


    beforeEach(() => {
        //Ingresamos a la pagina de formulario
        cy.visit('https://demoqa.com/automation-practice-form')
    });

    it('LLenamos nuestro primer formulario utilizando data', function(){

        //Step 1 completamos los campos
        //cy.log(this.datos.apellido)
        cy.get('#firstName').type(this.datos.nombre)
        cy.get('input[placeholder="First Name"]').should('id', 'firstName')

       // cy.get('#lastName').type(this.datos.apellido)
       // cy.get('#userEmail').type(this.datos.mail)
        //Al no poder hacer le click porque tiene un
        // elemento encima, utilizamos el ".check(){force:true}"
        //Interpolamos los datos del json en el selector
        cy.get('input[name="gender"][value="' + this.datos.sexo + '"]').check({force: true})
        .should('be.checked')
       // cy.get('input[placeholder="Mobile Number"]').should('id', 'userNumber')
       // cy.get('#userNumber').type(this.datos.telefono)
        cy.get('#dateOfBirthInput').click()
    });

});