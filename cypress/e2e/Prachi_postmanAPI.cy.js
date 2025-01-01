import Reqres from "../pageobjects/Reqres";

//function to not fail testcase when uncaught exceptions are generated
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
})


describe('ReqRes -> GET:', () => {
    beforeEach(() => {
        //Set screen size
        cy.viewport(1920, 1080);

        //Visit the website
        cy.visit('https://reqres.in/');
        Reqres.elements.title().scrollIntoView();

    })

    it('TC-01: API should responds the list of users.', () => {

        cy.wait(2000);

        //Assign variable for baseURL.
        cy.request('GET', '/api/users?page=2')

            .then((response) => {

                // Handle the API response here
                expect(response.status).to.equal(200); // Example assertion
                expect(response.statusText).to.equal("OK");
                expect(response.body.data).to.be.an('array').that.is.not.empty;
                expect(response.body).to.have.property('page');
                expect(response.body).to.have.property('per_page');
                expect(response.body).to.have.property('total');
                expect(response.body).to.have.property('total_pages');

                response.body.data.forEach((element) => {
                    expect(element).to.have.property('id').and.to.be.a('number'); // Ensure ID property exists
                    expect(element).to.have.property('email').and.to.be.a('string'); // Ensure email property exists
                    expect(element).to.have.property('first_name').and.to.be.a('string'); // Ensure first name property exists
                    expect(element).to.have.property('last_name').and.to.be.a('string'); // Ensure last name property exists
                    expect(element).to.have.property('avatar').and.to.be.a('string'); // Ensure avatar property exists

                    // Extract email from response body
                    const userEmail = element.email;

                    // Assert email is in valid format
                    expect(userEmail).to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                })

            });
    })

    it('TC-02: API should responds the details of single user.', () => {

        Reqres.elements.Single_User().click()
        cy.request('GET', '/api/users/2')

            .then((response) => {
                // Handle the API response here
                expect(response.status).to.equal(200); // Example assertion
                expect(response.statusText).to.equal("OK");
                expect(response.body.data).to.be.an('object').that.is.not.empty;

                expect(response.body.data).to.have.property('id', 2).and.to.be.a('number'); // Ensure ID property exists
                expect(response.body.data).to.have.property('email').and.to.be.a('string'); // Ensure email property exists
                expect(response.body.data).to.have.property('first_name').and.to.be.a('string'); // Ensure first name property exists
                expect(response.body.data).to.have.property('last_name').and.to.be.a('string'); // Ensure last name property exists
                expect(response.body.data).to.have.property('avatar').and.to.be.a('string'); // Ensure avatar property exists

                // Extract email from response body
                const userEmail = response.body.data.email;

                // Assert email is in valid format
                expect(userEmail).to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

            });
    })

    it('TC-03: API should responds error message.', () => {

        Reqres.elements.SingleUser_NotFound().click()

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false
        })

            .then((response) => {
                // Handle the API response here
                expect(response.status).to.equal(404); // Example assertion
                expect(response.statusText).to.equal("Not Found");
                expect(response.body).to.deep.equal({});
            });

    })

    it('TC-04: API should responds List <resource>', () => {

        Reqres.elements.List_Resource().click();
        cy.wait(1000);

        //Call to the API
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown',
        }).then((response) => {
            //Assert the response status
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');

            //Store the response body in a constant
            const responseData = response.body;

            //Assert following fields are present
            expect(responseData).to.have.property('page', 1);
            expect(responseData).to.have.property('per_page', 6);
            expect(responseData).to.have.property('total', 12);
            expect(responseData).to.have.property('total_pages', 2);
            expect(responseData).to.have.property('data');
            expect(responseData).to.have.property('support');

            //Asserting that 'data' is an array with elements
            expect(responseData.data).to.be.an('array').that.is.not.empty;

            var UserID = 1;
            //Assertion on each object inside 'data' array
            responseData.data.forEach((element) => {
                expect(element).to.have.property('id', UserID);
                expect(element).to.have.property('name');
                expect(element).to.have.property('year');
                expect(element).to.have.property('color');
                expect(element).to.have.property('pantone_value');
                UserID = UserID + 1;
            });
        })
    })

    it('TC-05: API should responds single <resource>', () => {

        Reqres.elements.Single_resource().click();
        cy.wait(1000);

        //Call to the API
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/2',
        }).then((response) => {
            //Assert the response status
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');

            //Store the response body in a constant
            const responseData = response.body;

            //Assert following fields are present
            expect(responseData).to.have.property('data');
            expect(responseData).to.have.property('support');

            //Assertion on each object inside 'data' array
            expect(responseData.data).to.have.property('id', 2);
            expect(responseData.data).to.have.property('name');
            expect(responseData.data).to.have.property('year');
            expect(responseData.data).to.have.property('color');
            expect(responseData.data).to.have.property('pantone_value');

            //Assertion on each object inside 'support' array
            expect(responseData.support).to.have.property('url');
            expect(responseData.support).to.have.property('text');
        })
    })

    it('TC-06: API should responds single resource not found', () => {

        Reqres.elements.SingleResource_NotFound().click();
        cy.wait(1000);

        //Call to the API
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/23',
            failOnStatusCode: false
        }).then((response) => {
            //Assert the response status
            expect(response.status).to.equal(404);
            expect(response.statusText).to.equal('Not Found');

            //Store the response body in a constant
            const responseData = response.body;

            //Assert following fields are present
            expect(responseData).to.be.empty;
        })
    })

    it('TC-07 : API responds late.', () => {

        Reqres.elements.Console_Scroll().scrollIntoView();
        Reqres.elements.Delay_Res().click();
        cy.wait(1000);

        // Capture the current time before making the request
        const startTime = new Date();

        // Send the request using cy.request with method and URL defined
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=3'
        }).then((response) => {
            // Capture the current time after the request completes
            const endTime = new Date();

            // Calculate the delay in milliseconds
            const delayTime = endTime - startTime;

            // Print the delay time
            cy.log(`Delayed time: ${delayTime}ms`);

            // Assertion to check if the response is successful and contains expected data
            expect(response.status).to.equal(200);

            //Store the response body in a constant
            const responseData = response.body;

            //Assert following fields are present
            expect(responseData).to.have.property('page', 1);
            expect(responseData).to.have.property('per_page', 6);
            expect(responseData).to.have.property('total', 12);
            expect(responseData).to.have.property('total_pages', 2);
            expect(responseData).to.have.property('data');
            expect(responseData).to.have.property('support');

            //Asserting that 'data' is an array with elements
            expect(responseData.data).to.be.an('array').that.is.not.empty;

            var UserID = 1;
            //Assertion on each object inside 'data' array
            responseData.data.forEach((element) => {
                expect(element).to.have.property('id', UserID);
                expect(element).to.have.property('email');
                expect(element).to.have.property('first_name');
                expect(element).to.have.property('last_name');
                expect(element).to.have.property('avatar');
                UserID = UserID + 1;
            });
        })
    });

})


describe('ReqRes -> POST:', () => {
    beforeEach(() => {
        //Set screen size
        cy.viewport(1920, 1080);

        //Visit the website
        cy.visit('https://reqres.in/');
        Reqres.elements.Console_Scroll().scrollIntoView();

    })

    it('TC-01: API should responds created user info', () => {

        Reqres.elements.Create().click();

        // Data to send in the request body
        const requestBody = {
            "name": "Prachi",
            "job": "QA"
        }

        //Send request for create user.
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: requestBody
        }).then((response) => {
            //Assert the response status
            expect(response.status).to.equal(201);
            expect(response.statusText).to.equal('Created');

            // Assertion to check if the response body contains the requested data
            expect(response.body).to.include(requestBody);
            cy.wait(5000)

        })
    })

    it('TC-02: API should responds created user info', () => {

        Reqres.elements.Register().click();

        // Data to send in the request body
        const requestBody = {

            "email": "eve.holt@reqres.in",
            "password": "pistol"

        }

        //Send request for register the user.
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            body: requestBody,
            failOnStatusCode: false
        }).then((response) => {
            //Assert the response status
            cy.log('Response:', response.body);
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');

            // Assertion to check if the response contains ID and token
            expect(response.body).to.have.property('id').and.to.be.a('number');
            expect(response.body).to.have.property('token').and.to.be.a('string');

        })
    })

    it('TC-03: API through an error for required field.', () => {

        Reqres.elements.Register_Unsuccessful().click();

        // Data to send in the request body
        const requestBody = {

            "email": "eve.holt@reqres.in",

        }

        //Send request for register the user.
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            body: requestBody,
            failOnStatusCode: false
        }).then((response) => {
            //Assert the response status
            expect(response.status).to.equal(400);
            expect(response.statusText).to.equal('Bad Request');

            // Assertion to check if the response contains ID and token
            expect(response.body).to.have.property('error', 'Missing password');

            //Log the response.
            cy.log('Response:', response.body);
            cy.wait(5000)

        })
    })

    it('TC-04: API generates the token after login.', () => {

        Reqres.elements.Login().click();

        const registrationData = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"

        }

        //-->Send request for register the user.
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: registrationData,
            failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx response
        }).then((response) => {
            // Assertion to check if registration was successful
            expect(response.status).to.equal(200);

            // Extract the token from the response
            const token = response.body.token;

            // Log the token
            cy.log('Token:', token);

            //--> Now login with the registered email and password
            cy.request({
                method: 'POST',
                url: '/api/login',
                body: {
                    email: registrationData.email,
                    password: registrationData.password
                }

            }).then((loginResponse) => {
                // Assertion to check if login was successful
                expect(loginResponse.status).to.equal(200);

                // Assertion to check if the response contains the registration token.
                expect(loginResponse.body.token).to.equal(token);

                // Log the response
                cy.log('Login response:', loginResponse.body);
            });
        });

    })

    it('TC-05: API through an error for required field .', () => {

        Reqres.elements.Login_Unsuccessful().click();

        const registrationData = {

            "email": "eve.holt@reqres.in",
            "password": "pistol"

        }

        //-->Send request for register the user.
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: registrationData,

        }).then((response) => {
            // Assertion to check if registration was successful
            expect(response.status).to.equal(200);

            // Extract the response from the response
            const RegisterResponse = response.body;

            // Log the response
            cy.log('Register response:', RegisterResponse);

            //--> Now login with the registered email
            cy.request({
                method: 'POST',
                url: '/api/login',
                body: {
                    email: registrationData.email,

                },
                failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx response

            }).then((loginResponse) => {
                // Assertion to check 
                expect(loginResponse.status).to.equal(400);

                // Assertion to check if the response contains an error.
                expect(loginResponse.body).to.have.property('error', 'Missing password');

                // Log the response
                cy.log('Login response:', loginResponse.body);
            });
        });

    })

})

describe('ReqRes -> PUT:', () => {
    beforeEach(() => {
        //Set screen size
        cy.viewport(1920, 1080);

        //Visit the website
        cy.visit('https://reqres.in/');
        Reqres.elements.Console_Scroll().scrollIntoView();

    })

    it('TC-01: API should responds updated user info', () => {

        Reqres.elements.Update().click();

        let createdUserData;

        let CreatData = {

            "name": "morpheus",
            "job": "leader"

        }

        //-->Send request for create the user.
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: CreatData,

        }).then((response) => {
            // Assertion to check if data create
            expect(response.status).to.equal(201);

            // Extract the created response and store it
            createdUserData = response.body;

            // Log the created response
            cy.log('Created response:', createdUserData);

            //--> Now update in the created data
            // Update data for user
            let updateData = {
                "name": "morpheus",
                "job": "zion resident"
            };

            cy.request({
                method: 'PUT',
                url: '/api/users/${createdUserData.id}', // Assuming the id is returned in the response
                body : updateData,
            }).then((updatedResponse) => {
                // Assertion to check 
                expect(updatedResponse.status).to.equal(200);

                // Assertion to check if the response contains an updated data.
                cy.log(updatedResponse)
                expect(updatedResponse.body).to.have.property('job', 'zion resident');
                expect(updatedResponse.body).to.have.property('updatedAt');

                // Log the response
                cy.log('Updated response:', updatedResponse.body);
            });
        });     
    })
})

describe('ReqRes -> PATCH:', () => {
    beforeEach(() => {
        //Set screen size
        cy.viewport(1920, 1080);

        //Visit the website
        cy.visit('https://reqres.in/');
        Reqres.elements.Console_Scroll().scrollIntoView();

    })

    it('TC-01: API should responds updated user info', () => {

        Reqres.elements.Patch_Update().click();

        let createdUserData;

        let CreatData = {

            "name": "morpheus",
            "job": "leader"

        }

        //-->Send request for create the user.
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: CreatData,

        }).then((response) => {
            // Assertion to check if data create
            expect(response.status).to.equal(201);

            // Extract the created response and store it
            createdUserData = response.body;

            // Log the created response
            cy.log('Created response:', createdUserData);

            //--> Now update in the created data
            // Update data for user
            let PatchedData = {
                "name": "morpheus",
                "job": "zion resident"
            };

            cy.request({
                method: 'PATCH',
                url: '/api/users/${createdUserData.id}', // Assuming the id is returned in the response
                body : PatchedData,
            }).then((updatedResponse) => {
                // Assertion to check 
                expect(updatedResponse.status).to.equal(200);

                // Assertion to check if the response contains an updated data.
                cy.log(updatedResponse)
                expect(updatedResponse.body).to.have.property('job', 'zion resident');
                expect(updatedResponse.body).to.have.property('updatedAt');

                // Log the response
                cy.log('Updated response:', updatedResponse.body);
            });
        });     
})
})

describe('ReqRes -> DELETE:', () => {
    beforeEach(() => {
        //Set screen size
        cy.viewport(1920, 1080);

        //Visit the website
        cy.visit('https://reqres.in/');
        Reqres.elements.Console_Scroll().scrollIntoView();

    })

    it('TC-01: API should delete the user.', () => {

        Reqres.elements.Delete().click();

            cy.request({
                method: 'DELETE',
                url: '/api/users/2', 
            }).then((DeletedResponse) => {

                // Assertion to check response
                expect(DeletedResponse.status).to.equal(204);
                expect(DeletedResponse.statusText).to.equal('No Content');

                // Assertion to check that data is deleted
                expect(DeletedResponse.body).to.be.empty;

                // Log the response
                cy.log('Updated response:', DeletedResponse.body);
            });
        });     
})






