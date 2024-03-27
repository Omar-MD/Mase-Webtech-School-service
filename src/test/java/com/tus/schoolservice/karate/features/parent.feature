Feature: Parent Functionality
  Testing the parents functionality

  Background: 
    * url baseUrl
    * header Authorization = 'Bearer ' + getAuthToken('omar', 'password', 'PARENT')

  Scenario: Submit Student
    * def reqBody =
      """
      {   
       parentName: 'omar', studentName: 'testStudent', 
       studentMartialLevel: 'WARRIOR', studentCodingLevel: 'INITIATE', 
       studentDateOfBirth: '2015-03-14', 
       studentGender: 'MALE', 
       studentMedicalInformation: 'NONE'
      }
      """
    Given path "registration/submit"
    And request reqBody
    When method POST
    Then response.statusCode == 201
    And match response.status == 'OK'
    And match response.data == 'Submission created!'

  Scenario: Edit Student
    * def reqBody =
      """
      { 
        parentName: 'omar', studentName: 'testStudent', 
        studentMartialLevel: 'MASTER', studentCodingLevel: 'INITIATE', 
        studentDateOfBirth: '2015-03-14', 
        studentGender: 'MALE', 
        studentMedicalInformation: 'NONE'
      }
      """
    Given path "registration/edit"
    And request reqBody
    When method PUT
    Then response.statusCode == 200
    And match response.status == 'OK'
    And match response.data == 'Submission edited!'

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
    Then response.statusCode == 200
    And match response.status == 'OK'
