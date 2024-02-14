
// Application Event Handlers
$(document).ready(function() {

    // Login
    $('#login-nav-link').on('click', function() {
        $('#home-page').addClass('d-none');
        $('#login-page').removeClass('d-none');
    });

    $('#login-page-link').on('click', function() {
        $('#home-page').addClass('d-none');
        $('#login-page').removeClass('d-none');
    });
    
     // Signup
    $('#signup-page-link').on('click', function() {
        $('#home-page').addClass('d-none');
        $('#signup-page').removeClass('d-none');
    });
    
    // Logout
    $('#logout-nav-link').on('click', function() {
        /*logout()*/
        $('#login-nav-link').removeClass('d-none');
        $('#logout-nav-link').addClass('d-none');
    });

    // Home Page
    $('#logo').on('click', function() {
        $('#home-page').removeClass('d-none');
        $('#login-page').addClass('d-none');
        $('#create-account-page').addClass('d-none');
        handleSidebarNavigation("#ethos-nav-link" ,'#ethos-page');
    });

    // About Us
    $("#ethos-nav-link").on('click', function() {
          handleSidebarNavigation("#ethos-nav-link" ,'#ethos-page');
    });

    // Curriculm
    $("#curriculum-nav-link").on('click', function() {
          handleSidebarNavigation("#curriculum-nav-link", '#curriculum-page');
    });

    // Admission Process
    $("#admission-nav-link").on('click', function() {        
         handleSidebarNavigation("#admission-nav-link", '#admission-page');
    });

    // Tuition Fees
    $("#tuition-nav-link").on('click', function() {
         handleSidebarNavigation("#tuition-nav-link", '#tuition-page');
    });

    // Contact Us
    $("#contact-nav-link").on('click', function() {
        handleSidebarNavigation("#contact-nav-link", '#contact-page');
    });
});

const handleSidebarNavigation = function(navID, pageID) {
    $('.aside-link').removeClass('active');
    $(navID).addClass('active');
    
    $('.main-page').addClass('d-none');
    $(pageID).removeClass('d-none');
}
