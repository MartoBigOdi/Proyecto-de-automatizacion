/// <reference types="Cypress"/>

//Modelo Page Object Model

import AddressPage from '../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../support/PageObjects/AuthenticationPage'
import HomePage from '../../support/PageObjects/HomePage'
import PaymentPage from '../../support/PageObjects/PaymentPage'
import ShipppingPage from '../../support/PageObjects/ShipppingPage'
import ShoppingCartSummaryPage from '../../support/PageObjects/ShoppingCartSummaryPage'


describe("Primer conjunto de casos de pruebas", function () {

    const addressPage = new AddressPage();
    const authenticationPage = new AuthenticationPage();
    const homePage = new HomePage();
    const paymentPage = new PaymentPage();
    const shipppingPage = new ShipppingPage();
    const shoppingCartSummaryPage = new ShoppingCartSummaryPage();

    beforeEach(() => {
        //Ingresamoa a la web
        //Utilizamos una variable de entorno que seteamos en el cypress.json de config
        cy.visit(Cypress.env("url") + "/index.php");
      });


    it('Hacer una compra desde cero con pageObjectModel', function(){

        //Step 1
        //Home Page 
        homePage.getSearchBoxInput().type('Blouse');
        homePage.getSearchBoxButton().click();
        homePage.getTextForValidate().should("contain.text","1 result has been found");
        homePage.getAddToCartElementButton('Blouse').click();
        homePage.getProceedTOCheckoutButton().click();
        
        //Step 2
        //Shopping Summary Page
        shoppingCartSummaryPage.getProductNameText().should('contain.text', 'Blouse');
        shoppingCartSummaryPage.getProductPriceText().should('contain.text', '27.00');
        shoppingCartSummaryPage.getProceedToCheckoutButton().click();

        //Step 3
        //Authentication Page
        authenticationPage.getMailAdressInput().type('maradona@aol.com');
        authenticationPage.getPasswordInput().type('maradona90');
        authenticationPage.getSigInButton().click();

        //Step 4
        //Address Page
        addressPage.getProceedToCheckoutButton().click();

        //Step 5
        //Shipping Page
        shipppingPage.getCheckboxtButton().check().should('be.checked');
        shipppingPage.getProceedToCheckoutButton().click();

        //Step 6
        //Payment Page
        paymentPage.getPayByBankingButton().click();
        paymentPage.getConfirmButton().click();
        paymentPage.getTextToValidate().should('contain.text', 'Your order on My Store is complete.');

    })

}) 