Feature: Pruebas en Automation Practice

    Este Feature esta siendo adaptado a Cucumber con Cypress

#Lo pusimo en ingles para practicar un poco, nada mas. 

    Scenario: Crear una compra desde cero
    Given the user is on the landing page 
    And the user search a criteria
    When the user add this criterio to the cart
    Then the value of the article is 27.00 dolares 
    When the shopping is complete on the page
    Then the complete shopping message should to appear
    

    