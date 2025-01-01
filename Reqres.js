class Reqres{
    elements = {

        title: () => cy.get('[data-id="users"]'),
        Console_Scroll: ()=> cy.get('[id="console"]'),

        //GET
        Single_User: ()=> cy.get('[data-id="users-single"]'),
        SingleUser_NotFound: ()=> cy.get('[data-id="users-single-not-found"]'),
        List_Resource: ()=> cy.get('[data-id="unknown"]'),
        Single_resource: ()=> cy.get('[data-id="unknown-single"]'),
        SingleResource_NotFound: ()=> cy.get('[data-id="unknown-single-not-found"]'),
        Delay_Res: ()=> cy.get('li[data-id="delay"]'),

        //POST
        Create: ()=> cy.get('[data-id="post"]'),
        Register: ()=> cy.get('[data-id="register-successful"]'),
        Register_Unsuccessful: ()=> cy.get('[data-id="register-unsuccessful"]'),
        Login: ()=> cy.get('[data-id="login-successful"]'),
        Login_Unsuccessful: ()=> cy.get('[data-id="login-unsuccessful"]'),

        //PUT
        Update: ()=> cy.get('[data-id="put"]'),

        //PATCH
        Patch_Update: ()=> cy.get('[data-id="patch"]'),

        //Delete
        Delete: ()=> cy.get('[data-id="delete"]'),

        



    }

}
export default new Reqres;