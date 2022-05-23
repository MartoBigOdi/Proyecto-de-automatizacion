//Import de las sentencias de Gherkin, de Cucumber. IMPORTANTE APUNTAR A LAS DEPENDENCIAS CORRECTAMENTE
//en este caso es /steps
import {Given,When,Then,And} from "cypress-cucumber-preprocessor/steps";

//Import de las Clases que necesitamos en los Steps
import AddressPage from '../../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../../support/PageObjects/AuthenticationPage'
import HomePage from '../../../support/PageObjects/HomePage'
import PaymentPage from '../../../support/PageObjects/PaymentPage'
import ShipppingPage from '../../../support/PageObjects/ShipppingPage'
import ShoppingCartSummaryPage from '../../../support/PageObjects/ShoppingCartSummaryPage'

const homePage = new HomePage();
const shoppingCartSummaryPage = new ShoppingCartSummaryPage();
const authenticationPage = new AuthenticationPage();
const addressPage = new AddressPage();
const shipppingPage = new ShipppingPage();
const paymentPage = new PaymentPage();


Given('the user is on the landing page', () => {

    cy.visit(Cypress.env("url") + "/index.php");
})


And('the user search a criteria', () => {

    homePage.getSearchBoxInput().type('Blouse');
    homePage.getSearchBoxButton().click();
})


When('the user add this criterio to the cart', () => {

    homePage.getAddToCartElementButton('Blouse').click();
    homePage.getProceedTOCheckoutButton().click();
})


Then('the value of the article is 27.00 dolares', () => {
    //Validacion extra 
    shoppingCartSummaryPage.getProductNameText().should('contain.text', 'Blouse');
    shoppingCartSummaryPage.getProductPriceText().should('contain.text', '27.00');
    shoppingCartSummaryPage.getProceedToCheckoutButton().click();
})


When('the shopping is complete on the page', () => {

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
})


Then('the complete shopping message should to appear', () => {
    //Validamos el mensaje final
    paymentPage.getTextToValidate().should('contain.text', 'Your order on My Store is complete.');
})