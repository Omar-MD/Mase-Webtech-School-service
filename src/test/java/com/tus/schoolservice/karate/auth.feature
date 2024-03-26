Feature: Authenticate
  To test the login

  Scenario: Successful Authentication
    Given url  baseUrl + '/auth/authenticate'
    And request { username: '#(username)', password: '#(password)' }
    When method post
    Then status 200
    * def authToken = response.data.token
