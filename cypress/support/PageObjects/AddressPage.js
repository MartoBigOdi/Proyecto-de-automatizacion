class AdressPage {

    getProceedToCheckoutButton(){
        return cy.get('.cart_navigation > .button');
    }

}

export default AdressPage;