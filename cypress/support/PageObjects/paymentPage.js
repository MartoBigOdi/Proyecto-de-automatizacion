class PaymentPage {

    getPayByBankingButton(){
        return cy.get('.bankwire');
    }

    getConfirmButton(){
        return cy.get('#cart_navigation > .button');
    }

    getTextToValidate(){
        return  cy.get('.cheque-indent > .dark');
    }
}

export default PaymentPage;