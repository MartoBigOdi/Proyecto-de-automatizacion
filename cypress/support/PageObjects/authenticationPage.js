class AuthenticationPage {

    getMailAdressInput(){
        return cy.get('#email');
    }

    getPasswordInput(){
        return cy.get('#passwd');
    }

    getSigInButton(){
        return cy.get('#SubmitLogin > span');
    }

}

export default AuthenticationPage;