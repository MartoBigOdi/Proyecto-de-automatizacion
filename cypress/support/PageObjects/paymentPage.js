class PaymentPage {

    getProceedToCheckoutButton(){
        return cy.get('.cart_navigation > .button');
    }

}

export default PaymentPage;