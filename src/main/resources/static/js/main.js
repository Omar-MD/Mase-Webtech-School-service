
const rootUrl = "http://localhost:8082";

// Application Event Handlers
$(document).ready(function() {

    // User Home
    $('#user-nav-link').on('click', function() {
        homeNav("#user-nav-link", '#user-content');
        pageNav('#home-page');
    });

    // Login
    $('#login-nav-link').on('click', function() {
        pageNav('#login-page');
    });
    $('#login-page-link').on('click', function() {
        pageNav('#login-page');
    });
    $('#signup-login-link').on('click', function() {
        pageNav('#login-page');
    });
    $('#login-button').on('click', function(event) {
        event.preventDefault();
        authenticate();
    });

    // Signup
    $('#signup-nav-link').on('click', function() {
        pageNav('#signup-page');
    });
    $('#signup-page-link').on('click', function() {
        pageNav('#signup-page');
    });
    $('#login-signup-link').on('click', function() {
        pageNav('#signup-page');
    });
    $('#signup-button').on('click', function(event) {
        event.preventDefault();
        signup();
    });

    // Logout
    $('#logout-nav-link').on('click', function() {
        logout();
    });

    // Home Page
    $('#logo').on('click', function() {
        homeNav("#ethos-nav-link", '#ethos-content');
        pageNav('#home-page');
    });

    // About Us
    $("#ethos-nav-link").on('click', function() {
        homeNav("#ethos-nav-link", '#ethos-content');
        pageNav('#home-page');
    });

    // Curriculm
    $("#curriculum-nav-link").on('click', function() {
        homeNav("#curriculum-nav-link", '#curriculum-content');
        pageNav('#home-page');
    });

    // Admission Process
    $("#admission-nav-link").on('click', function() {
        homeNav("#admission-nav-link", '#admission-content');
        pageNav('#home-page');
    });

    // Tuition Fees
    $("#tuition-nav-link").on('click', function() {
        homeNav("#tuition-nav-link", '#tuition-content');
        pageNav('#home-page');
    });

    // Contact Us
    $("#contact-nav-link").on('click', function() {
        homeNav("#contact-nav-link", '#contact-content');
        pageNav('#home-page');
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
    homeNav("#ethos-nav-link", '#ethos-content');
    pageNav('#home-page');
}

const showLogoutState = function() {
    $('#user-nav').addClass('d-none');
    $('#logout-nav-link').addClass('d-none');
    $('#login-nav-link').removeClass('d-none');
    $('#signup-nav-link').removeClass('d-none');
}

const authenticate = function() {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    $('#loginMsg').hide();

    $.ajax({
        type: 'POST',
        url: rootUrl + "/authenticate",
        contentType: 'application/json',
        data: JSON.stringify({ "username": username, "password": password }),
        dataType: "json",
        success: function(resp) {
            if (resp.status === "OK") {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('role', resp.data.role);
                showLogInState();
                homeNav('#user-nav-link', '#user-content');
                pageNav('#home-page');
            } else {
                $('#loginMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> ${resp.errorMsg}<br/>`).show();
            }
        },
        error: function() {
            $('#loginMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> Server Error<br/>`).show();
        }
    });
};

const signup = function() {
    let email = $('#sign-up-email').val();
    let username = $('#sign-up-username').val();
    let password = $('#sign-up-password').val();
    let confirmPassword = $('#confirm-password').val();
    $('#signupMsg').hide();

    if (confirmPassword !== password) {
        $('#signupMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> Passwords must match!<br/>`).show();
        return;
    }

    $.ajax({
        type: 'POST',
        url: rootUrl + "/addNewUser",
        contentType: 'application/json',
        data: JSON.stringify({ "email": email, "username": username, "password": password }),
        dataType: "json",
        success: function(resp) {
            if (resp.status === "OK") {
                $('#signupMsg').removeClass().addClass("alert alert-success").html(`<strong>Success!</strong> ${resp.data}<br/>`).show();
                pageNav('#login-page');

            } else {
                $('#signupMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> ${resp.errorMsg}<br/>`).show();
            }
        },
        error: function() {
            $('#signupMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> Unexpected Server error!<br/>`).show();
        }
    });
};