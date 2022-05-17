/// <reference types="Cypress"/>

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
        cy.visit("http://automationpractice.com/index.php");
      });


    it('Hacer una compra desde cero con pageObjectModel', function(){

        //Home Page 
        homePage.getSearchBoxInput().type('Blouse');
        homePage.getSearchBoxButton().click();
        homePage.getTextForValidate().should("contain.text","1 result has been found");
        homePage.getAddToCartElementButton('Blouse').click();
        homePage.getProceedTOCheckoutButton().click();
        
        //Shopping Summary Page
        shoppingCartSummaryPage.getProductNameText().should('contain.text', 'Blouse');
        shoppingCartSummaryPage.getProductPriceText().should('contain.text', '27.00');
        shoppingCartSummaryPage.getProceedToCheckoutButton().click();

        //Authentication Page
        authenticationPage.getMailAdressInput().type('maradona@aol.com');
        authenticationPage.getPasswordInput().type('maradona90');
        authenticationPage.getSigInButton().click();

        //Address Page
        addressPage.getProceedToCheckoutButton().click();

        //Shipping Page
        shipppingPage.getCheckboxtButton().check().should('be.checked');
        shipppingPage.getProceedToCheckoutButton().click();

        //Payment Page
        paymentPage.getPayByBankingButton().click();
        paymentPage.getConfirmButton().click();
        paymentPage.getTextToValidate().should('contain.text', 'Your order on My Store is complete.');

    })

}) 