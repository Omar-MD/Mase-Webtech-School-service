Feature: Automatic Import
  Testing the automatic import functionality

  Background: 
    * url baseUrl
    * header Authorization = 'Bearer ' + getAuthToken('omar', 'password', 'PARENT')

  Scenario: Get Submissions
    Given path 'registration/submission'
    And param parentName = 'omar'
    When method get
    Then response.statusCode == 200
    And match response.status == 'OK'

  Scenario: Retract Submission
    Given path 'registration/retract'
    And param submissionID = 1
    When method delete
    Then response.statusCode == 404
    And match response.status == 'ERROR'
