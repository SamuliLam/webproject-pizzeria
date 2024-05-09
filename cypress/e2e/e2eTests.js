describe('End-to-end tests', () => {
    it('Logs in', () => {
        cy.visit('/login'); // Visit the login page
        cy.get('input[name=email]').type('jest.test@mail.com'); // Type into the email input field
        cy.get('input[name=password]').type('12345'); // Type into the password input field
        cy.get('button[type=submit]').click(); // Click the submit button
        cy.url().should('include', '/products'); // Check that the URL includes '/products'
    });

    it('Lists products', () => {
        cy.visit('/products'); // Visit the products page
        cy.get('.product').should('have.length.at.least', 1); // Check that at least one product is listed
    });

    it('Places an order', () => {
        cy.visit('/products'); // Visit the products page
        cy.get('.product').first().click(); // Click on the first product
        cy.get('button.add-to-cart').click(); // Click the add to cart button
        cy.visit('/cart'); // Visit the cart page
        cy.get('button.place-order').click(); // Click the place order button
        cy.url().should('include', '/orders'); // Check that the URL includes '/orders'
    });
});