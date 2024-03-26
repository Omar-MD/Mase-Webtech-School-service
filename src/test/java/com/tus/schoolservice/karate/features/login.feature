Feature: Authentication
  To test the authentication endpoints

  Background: 
    * url baseUrl

  Scenario: Invalid Username
    Given path '/auth/authenticate'
    And request { username: 'oma', password: 'password' }
    When method post
    Then match response == { status: 'ERROR', statusCode: 401, errorMsg: 'Unauthorized: Invalid email or password!' }

  Scenario: Invalid Password
    Given path '/auth/authenticate'
    And request { username: 'omar', password: 'passwor' }
    When method post
    Then match response == { status: 'ERROR', statusCode: 401, errorMsg: 'Unauthorized: Invalid email or password!' }

  Scenario: Successful Parent Login
    Given path '/auth/authenticate'
    And request { username: 'omar', password: 'password' }
    When method post
    Then status 200
    Then match response == { status: 'OK', statusCode: 200, data: { token:'#notnull', role: 'PARENT' }}

  Scenario: Successful Admin Login
    Given path '/auth/authenticate'
    And request { username: 'admin', password: 'password' }
    When method post
    Then status 200
    Then match response == { status: 'OK', statusCode: 200, data: { token: '#notnull', role: 'ADMIN' }}
