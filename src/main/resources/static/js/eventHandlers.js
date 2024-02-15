
// Application Event Handlers
$(document).ready(function() {

    // Login
    $('#login-nav-link').on('click', function() {
        pageNavigation('#login-page');
    });
    $('#login-page-link').on('click', function() {
        pageNavigation('#login-page');
    });
    $('#signup-login-link').on('click', function() {
        pageNavigation('#login-page');
    });

    // Signup
    $('#signup-nav-link').on('click', function() {
        pageNavigation('#signup-page');
    });
    $('#signup-page-link').on('click', function() {
        pageNavigation('#signup-page');
    });
    $('#login-signup-link').on('click', function() {
        pageNavigation('#signup-page');
    });

    // Logout
    $('#logout-nav-link').on('click', function() {
        
        // Glyphicons
        $('#login-nav-link').removeClass('d-none');
        $('#logout-nav-link').addClass('d-none');
        // Page Nav
        homeContentNavigation("#ethos-nav-link", '#ethos-page');
        pageNavigation('#home-page');
    });

    // Home Page
    $('#logo').on('click', function() {
        homeContentNavigation("#ethos-nav-link", '#ethos-page');
        pageNavigation('#home-page');
    });

    // About Us
    $("#ethos-nav-link").on('click', function() {
        homeContentNavigation("#ethos-nav-link", '#ethos-page');
        pageNavigation('#home-page');
    });

    // Curriculm
    $("#curriculum-nav-link").on('click', function() {
        homeContentNavigation("#curriculum-nav-link", '#curriculum-page');
        pageNavigation('#home-page');
    });

    // Admission Process
    $("#admission-nav-link").on('click', function() {
        homeContentNavigation("#admission-nav-link", '#admission-page');
        pageNavigation('#home-page');
    });

    // Tuition Fees
    $("#tuition-nav-link").on('click', function() {
        homeContentNavigation("#tuition-nav-link", '#tuition-page');
        pageNavigation('#home-page');
    });

    // Contact Us
    $("#contact-nav-link").on('click', function() {
        homeContentNavigation("#contact-nav-link", '#contact-page');
        pageNavigation('#home-page');
    });
});

const homeContentNavigation = function(navID, pageID) {
    $('.aside-link').removeClass('active');
    $(navID).addClass('active');

    $('.home-content').addClass('d-none');
    $(pageID).removeClass('d-none');
}

const pageNavigation = function(pageID) {
    $('.main-page').addClass('d-none');
    $(pageID).removeClass('d-none');
}
