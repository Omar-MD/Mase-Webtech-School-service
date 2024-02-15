const rootUrl = "http://localhost:8082";

const login = function() {
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    
    $('#loginMsg').hide();
    console.log(email, password);

    $.ajax({
        type: 'POST',
        url: rootUrl + "/login",
        contentType: 'application/json',
        data: JSON.stringify({ "email": email, "password": password }),
        dataType: "json",
        success: function(response) {
            console.log(response);
            
        },
        error: function() {
            $('#loginMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> Server Error<br/>`).show();
        }
    });
};

const signup = function() {
    let email = $('#sign-up-email').val();
    let password = $('#sign-up-password').val();
    let confirmPassword = $('#confirm-password').val();
    
    console.log(email, password);
    $('#signupMsg').hide();
    
    if (confirmPassword !== password) {
        $('#signupMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> Passwords must match!<br/>`).show();
        return;
    }

    $.ajax({
        type: 'POST',
        url: rootUrl + "/signup",
        contentType: 'application/json',
        data: JSON.stringify({ "email": email, "password": password }),
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function() {
            $('#signupMsg').removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong> Unexpected Server error!<br/>`).show();
        }
    });
};

// Event Handlers
$(document).ready(function() {
    $('#login-button').on('click', function(event) {
        event.preventDefault();
        login();
    });
    
    $('#signup-button').on('click', function(event) {
        event.preventDefault();
        signup();
    });
});