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
        cy.get('input[placeholder^="courseid - The ID of the course that the admin is going to edit.').should('exist').type("101");
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.contains('Response body').should('exist');
        cy.contains('200').should('be.visible');
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
        cy.get('input[placeholder^="keyword - Keyword to search for in courseDB.').should('exist').type("1");
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.contains('Response body').should('exist');
        cy.contains('200').should('be.visible');
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


    it("Swagger UI and GET/course/{courseid}/reviews enpoint testing for User", () => {
       
        cy.get('#operations-user-viewReview').should('exist').click();
        cy.get('.try-out__btn').should('exist').click();
        cy.get('input[placeholder^="courseid - The courseid.').should('exist').type("1");
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.contains('Response body').should('exist');
        cy.contains('200').should('be.visible');
        cy.get('.try-out__btn.cancel').should('exist').click();
    })

    it("Swagger UI and  POST/users{userid}/Favourites/Files/{fileid} enpoint testing for User", () => {
        
        cy.get('#operations-user-addFavouriteFile').should('exist').click();
        cy.get('.try-out__btn').should('exist').click();
        cy.get('input[placeholder^="userid - The user ID for whom to add file to the favourites folder').should('exist').type("1");
        cy.get('input[placeholder^="fileid - The file ID to perform the post oparation.').should('exist').type("101")
        cy.get('.btn.execute').should('exist').click();
        cy.contains('Responses').should('exist');
        cy.contains('Response body').should('exist');
        cy.contains('200').should('be.visible');
        cy.get('.try-out__btn.cancel').should('exist').click();
    })
});
