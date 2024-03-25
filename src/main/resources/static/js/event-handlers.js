
// Application Event Handlers
$(document).ready(function() {

    // Handle Page Refresh
    if (localStorage.getItem('username')) {
        console.log('Logged in')
        let role = localStorage.getItem('role');
        showLogInState();
        createHomeContent(role);
        if (role === UserRole.PARENT) {
            homeNav('#parent-home-nav-link', '#parent-home');
        } else {
           homeNav("#manage-submission-nav-link", '#manage-submission');
        }
        pageNav('#home-page');

    } else {
        createPages(UserRole.USER);
    }

    // Login
    $('#nav-bar').on('click', '#login-nav-link', function() {
        pageNav('#login-page');
    });
    $('#home-content-container').on('click', '#login-page-link',function() {
        pageNav('#login-page');
    });
    $('#login-page').on('click', '#login-signup-link', function() {
        pageNav('#signup-page');
    });
    $('#login-page').on('click', '#login-button', function(event) {
        event.preventDefault();
        authenticate();
    });

    // Signup
    $('#nav-bar').on('click', '#signup-nav-link', function() {
        pageNav('#signup-page');
    });
    $('#home-content-container').on('click', '#signup-page-link', function() {
        pageNav('#signup-page');
    });
    $('#signup-page').on('click', '#signup-login-link',function() {
        pageNav('#login-page');
    });
    $('#signup-page').on('click', '#signup-button',function(event) {
        event.preventDefault();
        signup();
    });

    // Logout
    $('#logout-nav-link').on('click', function() {
        logout();
    });

    // Home page
    $('#logo').on('click', function() {
        pageNav('#home-page');
    });

     /**
     *         SIDEBAR HANDLERS
     **/
    
    $('#sidebar').on('click', '.aside-link', function() {
        const linkId = $(this).attr('id');

        switch (linkId) {
            /*User Links*/
            case 'ethos-nav-link':
                homeNav("#ethos-nav-link", '#ethos-content');
                break;
            case 'curriculum-nav-link':
                homeNav("#curriculum-nav-link", '#curriculum-content');
                break;
            case 'admission-nav-link':
                homeNav("#admission-nav-link", '#admission-content');
                break;
            case 'tuition-nav-link':
                homeNav("#tuition-nav-link", '#tuition-content');
                break;
            case 'contact-nav-link':
                homeNav("#contact-nav-link", '#contact-content');
                break;

            /*Parent Links*/
            case 'parent-home-nav-link':
                homeNav("#parent-home-nav-link", '#parent-home');
                break;
            case 'parent-messages-nav-link':
                homeNav("#parent-messages-nav-link", '#parent-messages');
                break;
            case 'registration-nav-link':
                homeNav("#registration-nav-link", '#registration');
                break;
            case 'submitted-applications-nav-link':
                homeNav("#submitted-applications-nav-link", '#submitted-applications');
                break;

            /*Admin Links*/
            case 'manage-submission-nav-link':
                homeNav("#manage-submission-nav-link", '#manage-submission');
                break;
            case 'all-students-nav-link':
                homeNav("#all-students-nav-link", '#all-students-datatable-window');
                break;
            case 'students-by-stage-nav-link':
                homeNav("#students-by-stage-nav-link", '#students-by-stage');
                break;
            case 'students-by-parent-nav-link':
                homeNav("#students-by-parent-nav-link", '#students-by-parent');
                break;
            case 'students-by-martial-nav-link':
                homeNav("#students-by-martial-nav-link", '#students-by-martial');
                break;
            case 'students-by-coding-nav-link':
                homeNav("#students-by-coding-nav-link", '#students-by-coding');
                break;
        }
        pageNav('#home-page');
    });

    /**
     *          PARENT HANDLERS
     **/
    
    // Register
    $("#home-content-container").on('click', "#registerStudent-btn", function(event) {
        event.preventDefault();
        registerStudent();
    });

    // Retract
    $('#home-content-container').on("click", ".retractButton", function(event) {
        event.preventDefault();
        let submissionID = this.id.split('_')[1];
        retractSubmission(submissionID);
    });

    // Edit
    $('#home-content-container').on("click", ".editButton", function(event) {
        event.preventDefault();
        let submissionID = this.id.split('_')[1];
        showSubmissionDetails(submissionID);
    });
    $('#home-content-container').on('click', '#m_editSubmission-btn', function(event) {
        event.preventDefault();
        let updatedSubmission = {
            parentName: localStorage.getItem('username'),
            studentName: $('#m_studentName').val(),
            studentMartialLevel: $('#m_studentMartialLevel').val(),
            studentCodingLevel: $('#m_studentCodingLevel').val(),
            studentDateOfBirth: $('#m_studentDateOfBirth').val(),
            studentGender: $('#m_studentGender').val(),
            studentMedicalInformation: $('#m_studentMedicalInformation').val()
        };
        editSubmission(updatedSubmission);
    });

    /**
     *          ADMIN HANDLERS
     **/
    
    // Student By Stage
    $("#home-content-container").on('click', "#students-by-stage-btn", function(event) {
        event.preventDefault();
        getStudentsByStage();
        homeNav('#students-by-stage-nav-link','#students-by-stage-datatable-window');
    });
    
    // Student By Parent
    $("#home-content-container").on('click', "#students-by-parent-btn", function(event) {
        event.preventDefault();
        getStudentsByParent();
        homeNav('#students-by-parent-nav-link','#students-by-parent-datatable-window');
    });
    
     // Student By Martial Level
    $("#home-content-container").on('click', "#students-by-martial-btn", function(event) {
        event.preventDefault();
        getStudentsByMartialLevel();
        homeNav('#students-by-martial-nav-link','#students-by-martial-datatable-window');
    });
    
    // Student By Martial Level
    $("#home-content-container").on('click', "#students-by-coding-btn", function(event) {
        event.preventDefault();
        getStudentsByCodingLevel();
        homeNav('#students-by-coding-nav-link','#students-by-coding-datatable-window');
    });
    
    // Event listener for parent dropdown change
    $("#home-content-container").on('change', '#manage-submission-parent-dropdown', function(event) {
        const selectedParent = event.target.value;
        populateStudentDropdown(selectedParent);
    });
    
   $("#home-content-container").on('click', '#manage-submission-btn', function(event) {
        event.preventDefault();

        let selectedSubmissionId = $('#manage-submission-student-dropdown').val();
        let selectedStudent = fetchSubmissionById(selectedSubmissionId); 
    
        // Populate the modal fields with the selected student's details
        $('#manageStudentName').val(selectedStudent.student_name);
        $('#manageStudentGender').val(selectedStudent.student_gender);
        $('#manageStudentDOB').val(selectedStudent.student_dob);
        $('#manageStudentMartialLevel').val(selectedStudent.student_martial);
        $('#manageStudentCodingLevel').val(selectedStudent.student_coding);
        $('#manageStudentCreatedAt').val(selectedStudent.submission_createdAt);
        $('#manageStudentUpdatedAt').val(selectedStudent.submission_updatedAt);
        $('#manageStudentParentName').val(selectedStudent.parent_name);
        $('#manageStudentParentEmail').val(selectedStudent.parent_email);
        $('#manageSubmissionStatus').val(selectedStudent.submission_status);
    
        // Show the manageSubmissionModal
        $('#manageSubmissionModal').modal('show');
    });
});

const homeNav = function(navID, pageID) {
    $('.aside-link').removeClass('active');
    $(navID).addClass('active');

    $('.home-content').addClass('d-none');
    $(pageID).removeClass('d-none');
}

const pageNav = function(pageID) {
    $('.main-page').addClass('d-none');
    $(pageID).removeClass('d-none');
}

const showLogInState = function() {
    $('#user-nav').removeClass('d-none');
    $('#logout-nav-link').removeClass('d-none');
    $('#login-nav-link').addClass('d-none');
    $('#signup-nav-link').addClass('d-none');
}

const logout = function() {
    localStorage.clear();
    showLogoutState();
    createPages(UserRole.USER);
    homeNav("#ethos-nav-link", '#ethos-content');
    pageNav('#home-page');
}

const showLogoutState = function() {
    $('#user-nav').addClass('d-none');
    $('#logout-nav-link').addClass('d-none');
    $('#login-nav-link').removeClass('d-none');
    $('#signup-nav-link').removeClass('d-none');
}