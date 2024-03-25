'use strict';

let submissionsData = [];
const registerStudent = function() {
    let parentName = $('#parentName').val();
    let studentName = $('#studentName').val();
    let studentMartialLevel = $('#studentMartialLevel').val();
    let studentCodingLevel = $('#studentCodingLevel').val();
    let studentDateOfBirth = $('#studentDateOfBirth').val();
    let studentGender = $('#studentGender').val();
    let studentMedicalInformation = $('#studentMedicalInformation').val();

    $.ajax({
        type: 'POST',
        url: rootUrl + "/registration/submit",
        contentType: 'application/json',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: JSON.stringify({ parentName, studentName, studentMartialLevel, studentCodingLevel, studentDateOfBirth, studentGender, studentMedicalInformation }),
        success: function(res) {
            if (res.status == "OK") {
                showToast(res.data);
            } else {
                showToast(res.errorMsg, "error");
            }
        },
        error: function() {
            showToast("Unexpected Server Error", "error");
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
            renderSubmissions(res.data);
            submissionsData = res.data;
        }
    });
}

const getSubmissionById = function(submissionId) {
    return submissionsData.find(s => s.submissionId === parseInt(submissionId))
}

const retractSubmission = function(submissionId) {
    $.ajax({
        type: 'DELETE',
        url: rootUrl + "/registration/retract?submissionID=" + submissionId,
        dataType: "json",
        contentType: 'application/json',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function() {
            getSubmissions();
            showToast('Submission retracted successfully.');
        },
        error: function() {
            showToast('Failed to retract submission. Please try again.', "error");
        }
    });
}

const editSubmission = function(updatedSubmission) {
   $.ajax({
        type: 'PUT', 
        url: rootUrl + '/registration/edit',
        contentType: 'application/json',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: JSON.stringify(updatedSubmission),
        success: function(res) {
            if (res.status == "OK") {
                showToast(res.data);
                getSubmissions();
                 $('#editSubmissionModal').modal('hide');
            } else {
                showToast(res.errorMsg, 'error');
            }
        },
        error: function() {
            // Handle unexpected server error
            showToast('Failed to update submission. Please try again.', 'error');
        }
    });
}

function updateDescription(helpId, value, levels) {
    const helpText = $('#' + helpId);
    if (value && levels[value]) {
        helpText.addClass('small-text');
        helpText.text(levels[value].description);
    }
}

function renderSubmissions(submissions) {
    $('.details').remove();
    $.each(submissions, function(_, s) {
        let card = $('<div class="details card text-white bg-dark d-grid" id=submission_"' + s.submissionId + '" ></div>');
        card.append('<h1>' + s.studentName + '</h1>');
        card.append('<span>Registration Status: <b>' + s.registrationStatus + '</b></span><br/>');
        card.append('<span>Martial Art: ' + s.studentMartialArt + '</span>');
        card.append('<span>Coding Level: ' + s.studentCodingLevel + '</span>');
        card.append('<span>Date of Birth: ' + s.studentDateOfBirth + '</span>');
        card.append('<span>Gender: ' + s.studentGender + '</span>');
        card.append('<p>Medical Info: ' + s.studentMedicalInfo + '</p>');

        card.append('<span>Created At: ' + s.createdAt + '</span>');
        card.append('<span>Updated At: ' + s.updatedAt + '</span><br/>');

        let buttonGroup = $('<div class="button-group"></div>');
        if (s.registrationStatus === 'SUBMITTED') {
            buttonGroup.append('<button type="button" class="editButton btn btn-primary" id="edit_' + s.submissionId + '">Edit</button>');
        }
        if (s.registrationStatus !== 'ENROLLED') {
            buttonGroup.append('<button type="button" class="retractButton btn btn-danger" id="retract_' + s.submissionId + '">Retract</button>');
        }
        card.append(buttonGroup);
        $('#parent-submissions').append(card);
    });
}

// Function to show submission details in the modal
const showSubmissionDetails = function(submissionId) {
    let s = getSubmissionById(submissionId);
    $('#m_studentName').val(s.studentName);
    $('#m_studentMartialLevel').val(s.studentMartialArt);
    $('#m_studentCodingLevel').val(s.studentCodingLevel);
    $('#m_studentDateOfBirth').val(s.studentDateOfBirth);
    $('#m_studentGender').val(s.studentGender);
    $('#m_studentMedicalInformation').val(s.studentMedicalInfo);
    $('#editSubmissionModal').modal('show');
}
