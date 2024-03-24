describe('Takealot Store Testing', () => {
    beforeEach(() => {
        cy.visit(
            'https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0'
        );
        cy.url().should('contain', 'www.amazon.com');
    });

    it('Login to the Amazon Account', () => {
        cy.url().should('include', 'www.amazon.com');

        // Add your amazon account Email/Password in the cypress.config.js file
        cy.get('input[name="email"]').click().type(Cypress.env('email'));
        cy.get('input[type="submit"]').should('have.text', '').click();
        cy.get('input[type="password"]').click().type(Cypress.env('password'));
        cy.get('input[type="submit"]').should('have.text', '').click();
        cy.wait(5000);

        //You need to manually enter your OTP.
        cy.get('#auth-signin-button').click();
    });

    it.only('Add Items to Card', () => {
        cy.url().should('include', 'www.amazon.com');
        cy.get('input[name="email"]').click().type(Cypress.env('email'));
        cy.get('input[type="submit"]').should('have.text', '').click();
        cy.get('input[type="password"]', { force: true })
            .click()
            .type(Cypress.env('password'));
        cy.get('input[type="submit"]').should('have.text', '').click();
        cy.wait(8000);

        //You need to manually enter your OTP.
        cy.get('#auth-signin-button').click();

        cy.visit(Cypress.env('product'));
        cy.scrollTo(0, 2000);

        cy.get(
            ':nth-child(1) > .ProductGridItem__item__IkSDt > .ProductGridItem__imageContainer__Ts5N_ > [data-testid="grid-item-image"] > .Overlay__overlay__LloCU'
        ).click();
        cy.wait(12000);

        cy.get('#add-to-cart-button').click();
        cy.wait(10000);

        // cy.get('#nav-cart').click();
        cy.get('a[href="/gp/cart/view.html?ref_=nav_cart"]').click();
        cy.wait(2000);
    });
});
