
const rootUrl = "http://localhost:8082";

const UserRole = {
    USER: "User",
    PARENT: "PARENT",
    ADMIN: "ADMIN"
}

const RegistrationStage = {
    SUBMITTED: "SUBMITTED",
    UNDER_REVIEW: "UNDER_REVIEW",
    APPROVED: "APPROVED",
    PAYMENT_PENDING: "PAYMENT_PENDING",
    ENROLLED: "ENROLLED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED",
    ADDED_TO_WAITING_LIST: "ADDED_TO_WAITING_LIST"
}

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
            homeNav('#admin-home-nav-link', '#admin-home');
        }
        pageNav('#home-page');

    } else {
        createHomeContent(UserRole.USER);
    }

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

    // Home page
    $('#logo').on('click', function() {
        pageNav('#home-page');
    });

    // Home Sidebar links
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

            default:
                break;
        }
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
    createHomeContent(UserRole.USER);
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
                localStorage.setItem('username', username);
                showLogInState();
                createHomeContent(resp.data.role);
                homeNav('#parent-home-nav-link', '#parent-home');
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