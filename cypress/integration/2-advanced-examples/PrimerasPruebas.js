

//Suite de casos de pruebas
describe('Primer conjunto de casos de pruebas', function() {

    //Con el beforeEach le decimos tenemos esta precondicion para empezar los Tests cases
    beforeEach(()=> {
        //Ingresamoa a la web
        cy.visit("http://automationpractice.com/index.php")
    })

    //Caso de prueba 1
    it('Contabilizar la cantidad de elementos en la seccion de la pagina principal', function(){
        
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
    it('Agregar el elemento de tipo "Printed Dress" que tenga el valor mas bajo al carrito de compra desde la pagina principal', function(){
        //Obtenemos el elemento homefeatured .product-container como un parametro
        cy.get('#homefeatured .product-container').as('ProductosPopulares')

        //Tenemos que iterar los elementos para encontrar un producto 
        cy.get('@ProductosPopulares')
        .find('.product-name')
        .each(($el,index,$list) => {
            //buscamos el atributo y guardamos su valor ".then()"
                cy.get('@ProductosPopulares').eq(index).find('.price')
                .then(function($el1){
                    let precio = $el1.text()
                    cy.log(precio)
               //Buscamos el atributo title que sea igual a Printed Dress
                // precio.includes('26.00') es porque la pagina nos devuelve dos veces el valor.
               if($el.attr('title') === 'Printed Dress' && precio.includes('26.00')){
                   //Mostramos msj
                   cy.log('Encontramos el producto con el atributo "title" Printed Dress')
                   cy.log('Encontramos el producto con el atributo "precio" 26.00')
                   
                   //Posicionamiento directo al array/List y usamos contains()
                   //cy.get('@ProductosPopulares').eq(1).contains('Add to cart').click()

                   //Con index vamos tomando el objeto que tenga en esa iteracion
                   cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
               }
            }) //ojo como cerramos la funciton del .then(). Mucho cuidado
        })

        cy.get('h2 > .ajax_cart_product_txt')
        .should('contain.text', 'There is 1 item in your cart.')
        .should('be.visible')


   })


})