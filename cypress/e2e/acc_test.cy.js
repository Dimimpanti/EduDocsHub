describe("EduDocsHub Home page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs')

        cy.contains('EduDocsHub API').should('exist');
    });

    //Test For admin endpoints

    it ("Swagger UI and PUT endpoint testing for Admin", () => {

        //Check if the admin header exists
        cy.get('#operations-tag-admin').should('exist');

        //Tests for PUT /admin/courses/{courseid}
        cy.get('#operations-admin-adminCourseEditing').should('exist').click();
        cy.get('.try-out__btn').should('exist').click();
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.get('.try-out__btn.cancel').should('exist').click();

    })

    it("Swagger UI and DELETE endpoint testing for Admin", () => {
        //Tests for DELETE /admin/courses/{coursesid}
        cy.get('#operations-admin-adminRemoveCourse').should('exist').click();
        cy.get('.try-out__btn').should('exist').click();
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.get('.try-out__btn.cancel').should('exist').click();
    })

    it("Swagger UI and GET/courses/search endpoint testing for User", () =>{
        //Check if user header exists
        cy.get('#operations-tag-user').should('exist');
        
        //Tests for GET/courses/search
        cy.get('#operations-user-searchCourseDB').should('exist').click();
        cy.get('.try-out__btn').should('exist').click();
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.get('.try-out__btn.cancel').should('exist').click();
    })
    
    it("Swagger UI and POST/users/{usersid}/UserFiles/Files endpoint testing for User", () =>{
        //Tests for POST/users/{usersid}/UserFiles/Files endpoint
        cy.get('#operations-user-uploadNewFile').should('exist').click();
        cy.get('.try-out__btn').should('exist').click();
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.get('.try-out__btn.cancel').should('exist').click();
    })

});