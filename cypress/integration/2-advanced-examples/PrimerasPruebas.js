

//Suite de casos de pruebas
describe('Primer conjunto de casos de pruebas', function() {

    //Caso de prueba 1
    it('Contabilizar la cantidad de elementos en la seccion de la pagina principal', function(){
        
        //Ingresamoa a la web
        cy.visit("http://automationpractice.com/index.php")
        
        //Verificar la cantidad de elementos visibles
        //En este caso buscamos cuantos ".product-container" hay
        cy.get('#homefeatured .product-container').should('have.length', 7)

        //Obtenemos el elemento homefeatured .product-container como un parametro
        cy.get('#homefeatured .product-container').as('ProductosPopulares')

        //Verificamos nuevamanete utilizando el parametro
        cy.get('@ProductosPopulares').should('have.length', 7)
    })

    //Caso de prueba 2
    it('Agregar el elemento de tipo "blouse" al carrito de compra desde la pagina principal', function(){

         //Ingresamoa a la web
         cy.visit("http://automationpractice.com/index.php")

         //Obtenemos el elemento homefeatured .product-container como un parametro
         cy.get('#homefeatured .product-container').as('ProductosPopulares')

         //Tenemos que iterar los elementos para encontrar un producto 
         cy.get('@ProductosPopulares')
         .find('.product-name')
         .each(($el,index,$list) => {
                //Buscamos el atributo title que sea igual a Blouse
                if($el.attr('title') === 'Blouse'){
                    //Mostramos msj
                    cy.log('Encontramos el producto con el atributo "title" Blouse')
                    
                    //Posicionamiento directo al array/List y usamos contains()
                    //cy.get('@ProductosPopulares').eq(1).contains('Add to cart').click()

                    //Con index vamos tomando el objeto que tenga en esa iteracion
                    cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()

                }
         })



    })




    //Caso de prueba 3



})