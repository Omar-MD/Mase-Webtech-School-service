Feature: User Registration
  To test the registration of new users

  Background:
    * url baseUrl
  
  Scenario: Register with invalid email
    Given path '/auth/addNewUser'
    And request { username: 'testuser', email: 'invalidemail', password: 'password' }
    And header Content-Type = 'application/json'
    When method post
    Then match response == { status: 'ERROR', statusCode: 400, errorMsg: 'Invalid email!' }

  Scenario: Register with existing email
    Given path '/auth/addNewUser'
    And request { username: 'testuser', email: 'omar@email.com', password: 'password' }
    And header Content-Type = 'application/json'
    When method post
    Then match response == { status: 'ERROR', statusCode: 409, errorMsg: 'Email already in use!' }

  Scenario: Register with insecure password
    Given path '/auth/addNewUser'
    And request { username: 'testuser', email: 'newuser@example.com', password: '123' }
    And header Content-Type = 'application/json'
    When method post
    Then match response == { status: 'ERROR', statusCode: 400, errorMsg: 'Password insecure!' }

  Scenario: Successful user registration
    Given path '/auth/addNewUser'
    And request { username: 'newuser', email: 'newuser@example.com', password: 'strongpassword' }
    And header Content-Type = 'application/json'
    When method post
    And match response == { status: 'OK', statusCode: 201, data: 'Account Created!' }