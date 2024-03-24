'use strict';

const registerStudent = function() {
    let parentName = $('#parentName').val();
    let studentName = $('#studentName').val();
    let studentMartialLevel = $('#studentMartialLevel').val();
    let studentCodingLevel = $('#studentCodingLevel').val();
    let studentDateOfBirth = $('#studentDateOfBirth').val();
    let studentGender = $('#studentGender').val();
    let studentMedicalInformation = $('#studentMedicalInformation').val();
    let registerMsg = $('#registerMsg');
    registerMsg.html('');

    $.ajax({
        type: 'POST',
        url: rootUrl + "/registration/submit",
        contentType: 'application/json',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: JSON.stringify({ parentName, studentName, studentMartialLevel, studentCodingLevel, studentDateOfBirth, studentGender, studentMedicalInformation }),
        success: function(res) {
            if (res.status == "OK") {
                registerMsg.removeClass().addClass("alert alert-success").html(`<strong>Success!</strong><br/>${res.data}`).show();
            } else {
                registerMsg.removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong><br/>${res.errorMsg}<br/>`).show();
            }
        },
        error: function(e) {
            registerMsg.removeClass().addClass("alert alert-danger").html(`<strong>Error!</strong>Unexpected Server Error <br/>${e}<br/>`).show();
        }
    });
}

const getSubmissions = function() {
    $.ajax({
        type: 'GET',
        url: rootUrl + "/registration/submission",
        dataType: "json",
        contentType: 'application/json',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: { parentName: localStorage.getItem('username') }, 
        success: function(res) {
                console.log(res.data)
        }
    });
}

const editSubmission = function() {

}

const retractSubmission = function() {

}




const parentHome = function() {
    let username = localStorage.getItem('username');
    username = username.charAt(0).toUpperCase() + username.slice(1);

    return `<main class="col-md-12 home-content" id="parent-home">
                        <h2 class="text-center">Welcome, ${username}!</h2>
                        <p class="lead text-center">Embrace the shadows and wield the power of knowledge.</p>
                        <div class="row">
                            <div class="col-md-3 offset-md-2">
                                <div class="card text-white bg-dark mb-3">
                                    <div class="card-header">Registration Process</div>
                                    <div class="card-body">
                                        <h5 class="card-title">Welcome to the Martial Arts Coding School!</h5>
                                        <p class="card-text">The registration process involves the following stages:</p>
                                        <ul>
                                            <li><strong>Parent Sign-Up:</strong> Create a parent account to begin the application process.</li>
                                            <li><strong>Application Submission:</strong> Submit your child's application for admission.</li>
                                            <li><strong>Application Review:</strong> Our dark council reviews your application.</li>
                                            <li><strong>Approval/Rejection:</strong> Await the decision on your child's admission.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card text-white bg-dark mb-3">
                                            <div class="card-header">Track Submitted Applications</div>
                                            <div class="card-body">
                                                <h5 class="card-title">Track the Progress of Your Applications</h5>
                                                <p class="card-text">View a timeline of your submitted applications and their current stage in the admission process. You can also edit or delete your applications as needed.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card text-white bg-dark mb-3">
                                            <div class="card-header">School Messages</div>
                                            <div class="card-body">
                                                <h5 class="card-title">Receive School Announcements and Messages</h5>
                                                <p class="card-text">Stay informed with important announcements from the school and receive individual messages from other parents.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </main>
         `;
}

const registration = function() {
    let username = localStorage.getItem('username');
    return `<main class="col-md-12 home-content" id="registration">
                       <h2 class="text-center">Student Registration</h2>
                       <p class="lead text-center">Begin your childs registration below!</p>
                       <div class="col-md-6 justify-content-center align-items-center mx-auto">
                           <div class="card text-white bg-dark mb-2">
                               <div class="card-header"><h4>Student Details</h4></div>
                               <div class="card-body">
                                   <form>
                                       <div class="mb-2">
                                           <label for="parentName" class="form-label">Parent's Name</label>
                                           <input type="text" class="form-control" id="parentName" value="${username}" disabled>
                                           <small class="form-text small-text">Parent's name cannot be changed</small>
                                       </div>
                                       <div class="mb-2">
                                           <label for="studentName" class="form-label">Student's Full Name</label>
                                           <input type="text" class="form-control" id="studentName" required>
                                       </div>
                                        <div class="mb-2">
                                           <label for="studentMartialLevel" class="form-label">Martial Arts Level</label>
                                           <select class="form-select" id="studentMartialLevel" required onchange="updateDescription('martialLevelHelp', this.value, MartialArtsLevel)">
                                               <option value="" disabled selected>Select Martial Arts Level</option>
                                               <option value="NOVICE">Novice</option>
                                               <option value="APPRENTICE">Apprentice</option>
                                               <option value="JOURNEYMAN">Journeyman</option>
                                               <option value="WARRIOR">Warrior</option>
                                               <option value="MASTER">Master</option>
                                               <option value="GRAND_MASTER">Grand Master</option>
                                           </select>
                                           <small id="martialLevelHelp" class="form-text small-text"></small>
                                       </div>
                                       <div class="mb-2">
                                           <label for="studentCodingLevel" class="form-label">Coding Level</label>
                                           <select class="form-select" id="studentCodingLevel" required onchange="updateDescription('codingLevelHelp', this.value, CodingLevel)">
                                               <option value="" disabled selected>Select Coding Level</option>
                                               <option value="ILLETERATE">Illiterate</option>
                                               <option value="INITIATE">Initiate</option>
                                               <option value="ACOLYTE">Acolyte</option>
                                               <option value="JUNIOR_DEVELOPER">Junior Developer</option>
                                               <option value="SENIOR_DEVELOPER">Senior Developer</option>
                                               <option value="PRINCIPAL_DEVELOPER">Principal Developer</option>
                                           </select>
                                           <small id="codingLevelHelp" class="form-text small-text"></small>
                                       </div>
                                       <div class="mb-2">
                                           <label for="studentDateOfBirth" class="form-label">Date of Birth</label>
                                           <input type="date" class="form-control" id="studentDateOfBirth" required>
                                           <small class="form-text small-text">Must be older than 5 years.</small>
                                       </div>
                                       <div class="mb-2">
                                           <label for="studentGender" class="form-label">Gender</label>
                                           <select class="form-select" id="studentGender" required>
                                               <option value="" disabled selected>Select Gender</option>
                                               <option value="MALE">Male</option>
                                               <option value="FEMALE">Female</option>
                                           </select>
                                       </div>
                                       <div class="mb-2">
                                           <label for="studentMedicalInformation" class="form-label">Medical Information</label>
                                           <textarea class="form-control" id="studentMedicalInformation" rows="4"></textarea>
                                       </div>
                                       <button class="btn btn-primary btn-lg"  id="registerStudent-btn">Submit</button>
                                   </form>
                               </div>
                           </div>
                           <div id="registerMsg" style="display: none;"></div>
                       </div>
           </main>`;
}

function updateDescription(helpId, value, levels) {
    const helpText = $('#' + helpId);
    if (value && levels[value]) {
        helpText.addClass('small-text');
        helpText.text(levels[value].description);
    }
}

const parentMessages = function() {
    return `<main class="col-md-12 home-content" id="parent-messages">
                            <h2 class="text-center">Parent Messages</h2>
                        </main>
         `;
}

const submittedApplications = function() {
    return `<main class="col-md-12 home-content" id="submitted-applications">
                            <h2 class="text-center">Submitted Applications</h2>
                        </main>
         `;
}

/*
function renderSubmissions(data) {
    list = data = null ? [] : (data instanceof Array ? data : [data])
    $('.details').remove();

    $.each(list, function(index, product) {
        // console.log(product.id + " " + product.brand);
        var htmlStr = '<div class = "details col-sm-4 text-center p-3 d-grid" id="' + product.id + '">';
        htmlStr += '<h1>' + product.brand + '</h1>';
        htmlStr += '<img src ="' + image + '" class = displayCenter>';
        htmlStr += '<p><b>' + product.title + '</b></p>';
        htmlStr += '<p>' + product.type + '</p>';
        htmlStr += '<button type="button" class ="infoButton btn btn-primary" id="' + product.id + '">More Details</button>';
        // console.log("image: " + image);
        $('#merchContent').append(htmlStr);
    });
}*/
/*

//
var rootURL = "http://localhost:8081/products";

var findAll = function() {
    console.log("Find all Merch");
    $.ajax({
        type: 'GET',
        url: rootURL,
        dataType: "json",
        success: function(data) {
            $('#dashboard_title').text("All Products: ");
        }
    });
}

var findById = function(id) {
    console.log("Find by ID");
    $.ajax({
        type: 'GET',
        url: rootURL + '/' + id,
        dataType: "json",
        success: function(product) {
            $('#dashboard_title').text("Filtering by ID: " + id);
            showDetails(product);
        }
    });
}

// /products/search/brand/{queryBrand}
var findByBrand = function(brand) {
    console.log("Filter by Brand");
    $.ajax({
        type: 'GET',
        url: rootURL + '/search/brand/' + brand,
        dataType: "json",
        success: function(data) {
            $('#dashboard_title').text("Filtering by Brand: " + brand);
            renderList(data);
        }
    });
}

// /products/search/deals/23
var findByDeal = function(deal) {
    console.log("Filter by Deal");
    $.ajax({
        type: 'GET',
        url: rootURL + '/search/deals/' + deal,
        dataType: "json",
        success: function(data) {
            let dealValue = parseFloat(deal);
            $('#dashboard_title').text("Filtering by Discount of \u20AC" + dealValue.toFixed(2) + " or more..");
            renderList(data);
        }
    });
}

// /products/search/item/{queryType}
var findByType = function(type) {
    console.log("Filter by Type");
    $.ajax({
        type: 'GET',
        url: rootURL + '/search/item/' + type,
        dataType: "json",
        success: function(data) {
            $('#dashboard_title').text("Filtering by Type: " + type);
            renderList(data);
        }
    });
}



var showDetails = function(product) {
    console.log("Show Details");
    $('#detailsModal').find('.modal-title').text(product.brand + " - " + product.title);
    $('#pic').attr('src', 'images/' + product.image);
    $('#rrp').val("\u20AC" + ((product.rrp).toFixed(2)));
    $('#online_price').val("\u20AC" + ((product.online).toFixed(2)));
    var saving = product.rrp - product.online;
    var percent = (saving / product.rrp) * 100;
    $('#saving').val("\u20AC" + saving.toFixed(2) + " (" + (percent).toFixed(2) + "%)");
    $('#description').html("<b>Item Description: </b>" + product.description);
    $('#detailsModal').modal('show');
}



//When the DOM is ready.
//Students dont have to code this section.
$(document).ready(function() {
    $(document).on("click", ".infoButton", function() { findById(this.id); });
    $(document).on("click", "#home_but", function() {
        console.log("Home button clicked - list all");
        findAll();
    });
    $(document).on("click", "#listBrand_but", function() {
        console.log("Search brand clicked");
        $('#filterModalBrand').modal('show');
    });
    $(document).on("click", "#listType_but", function() {
        $('#filterModalType').modal('show');
        console.log("Search type clicked");
    });
    $(document).on("click", "#listDeals_but", function() {
        $('#filterModalDeal').modal('show');
        console.log("List deals clicked");
    });
    $(document).on("click", "#submitBrandButton", function() {
        let brand = $('#brand').val();
        $('#brand').val("")
        $('#filterModalBrand').modal('hide');
        if ((brand) == "") {
            findAll();
        }
        else {
            console.log("Brand search parameter: " + $('#brand').val());
            findByBrand(brand);
        }
    });
    $(document).on("click", "#submitTypeButton", function() {
        let type = $('#type').val();
        $('#type').val("")
        $('#filterModalType').modal('hide');
        if ((type) == "") {
            findAll();
        }
        else {
            console.log("Type search parameter: " + $('#type').val());
            findByType(type);
        }
    });
    $(document).on("click", "#submitDealButton", function() {
        let deal = $('#deal').val();
        $('#deal').val("")
        $('#filterModalDeal').modal('hide');
        if ((deal) == "") {
            findAll();
        }
        else {
            if (isNaN(deal)) {
                alert("Please enter a numerical value, no letters");
            }
            else {
                console.log("deal search parameter: " + $('#deal').val());
                findByDeal(deal);
            }
        }
    });
    findAll();
});*/