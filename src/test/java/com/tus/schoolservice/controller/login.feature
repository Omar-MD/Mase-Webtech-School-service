Feature: Authentication
  To test the authentication endpoints

  Background:
    * url baseUrl
  
    Scenario: Invalid Username
	    Given path '/auth/authenticate'
	    And request { username: 'oma', password: 'password' }
	    And header Content-Type = 'application/json'
	    When method post
	    Then match response == { status: 'ERROR', statusCode: 401, errorMsg: 'Unathorized: Invalid email or password!' }

  Scenario: Invalid Password
    Given path '/auth/authenticate'
    And request { username: 'omar', password: 'passwor' }
    And header Content-Type = 'application/json'
    When method post
    Then match response == { status: 'ERROR', statusCode: 401, errorMsg: 'Unathorized: Invalid email or password!' }
    
  Scenario: Successful Login
    Given path '/auth/authenticate'
    And request { username: 'omar', password: 'password' }
    And header Content-Type = 'application/json'
    When method post
    Then status 200
    And def token = response.token