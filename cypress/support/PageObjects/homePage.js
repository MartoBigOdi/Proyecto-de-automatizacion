class HomePage {

    getSearchBoxInput(){
        return cy.get('#search_query_top');
    }

    getSearchBoxButton(){
        return cy.get('#searchbox > .btn');
    }

    getAddToCatElementButton(productDescripcion){
        return cy.get('.product-container:has(.product-name[title=" + productDescripcion + "]) .ajax_add_to_cart_button');
    }

    getProceedTOCheckoutButton(){
        return cy.get('.button-medium[title="Proceed to checkout"]');
    }

}

export default HomePage;