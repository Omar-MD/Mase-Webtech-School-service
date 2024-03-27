Feature: Admin functionality
  Testing the admins funcitons

  Background: 
    * url baseUrl
    * header Authorization = 'Bearer ' + getAuthToken('admin', 'password', 'ADMIN')

  Scenario: Update Submission Status
    * header Authorization = 'Bearer ' + getAuthToken('omar', 'password', 'PARENT')
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
    
    * header Authorization = 'Bearer ' + getAuthToken('admin', 'password', 'ADMIN')
    * def reqBody = {id: 1,  newStatus: 'APPROVED'}
    Given path 'registration/status-update'
    And request reqBody
    When method PUT
    Then response.statusCode == 200
    And match response.status == 'OK'
    And match response.data == 'Submission status updated!'


  Scenario: Get All Submissions
    Given path "registration/students"
    When method GET
    Then response.statusCode == 200
    And match response.status == 'OK'

  Scenario: Get Submission By Status
    Given path 'registration/status/APPROVED'
    When method GET
    Then response.statusCode == 200
    And match response.status == 'OK'

  Scenario: Get Submission By Martial Level
    Given path 'registration/martial/WARRIOR'
    When method GET
    Then response.statusCode == 200
    And match response.status == 'OK'
    
  Scenario: Get Submission By Coding Level
    Given path 'registration/code/INITIATE'
    When method GET
    Then response.statusCode == 200
    And match response.status == 'OK'
    
   Scenario: Get Submission By Parent
    Given path 'registration/parent/1'
    When method GET
    Then response.statusCode == 200
    And match response.status == 'OK'

    
