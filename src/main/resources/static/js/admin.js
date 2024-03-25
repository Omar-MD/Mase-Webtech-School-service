

const updateSubmissionStatus = function() {
    let newStatus = $('#manageSubmissionStatus').val();
    let submissionID = $('#manage-submission-student-dropdown').val();
    $.ajax({
        type: 'PUT',
        url: rootUrl + '/registration/status-update',
        contentType: 'application/json',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: JSON.stringify({ "id": submissionID, "newStatus": newStatus }),
        success: function(res) {
            if (res.status == "OK") {
                getAllStudents();
                showToast(res.data);
                $('#manageSubmissionModal').modal('hide');
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

const showManageSubmissionModal = function() {
    let selectedSubmissionId = $('#manage-submission-student-dropdown').val();
    let sub = fetchSubmissionById(selectedSubmissionId);
    $('#manageStudentName').val(sub.student_name);
    $('#manageStudentGender').val(sub.student_gender);
    $('#manageStudentDOB').val(sub.student_dob);
    $('#manageStudentMartialLevel').val(sub.student_martial);
    $('#manageStudentCodingLevel').val(sub.student_coding);
    $('#manageStudentCreatedAt').val(sub.submission_createdAt);
    $('#manageStudentUpdatedAt').val(sub.submission_updatedAt);
    $('#manageStudentParentName').val(sub.parent_name);
    $('#manageStudentParentEmail').val(sub.parent_email);
    $('#manageSubmissionStatus').val(sub.submission_status);
    $('#manageSubmissionModal').modal('show');
}

const populateStudentDropdown = function(parentValue) {
    const parentSubmissions = fetchSubmissionsByParent(parentValue);
    const studentDropdown = $('#manage-submission-student-dropdown');
    studentDropdown.html('');
    parentSubmissions.forEach(s => {
        studentDropdown.append("<option value=" + s.submission_id + ">" + s.student_name + "</option>");
    });
    studentDropdown.val(studentDropdown.find('option:first').val());
}

const fetchSubmissionById = function(submissionId) {
    return allSubmissionData.find(s => s.submission_id === parseInt(submissionId));
}

const fetchSubmissionsByParent = function(parentId) {
    return allSubmissionData.filter(s => s.parent_id === parseInt(parentId));
}

const populateParentDropdowns = function() {
    const manageDropdown = $('#manage-submission-parent-dropdown');
    const submissionDropdown = $('#students-by-parent-dropdown');
    submissionDropdown.html('');
    manageDropdown.html('');

    const parents = getAllParents();
    parents.forEach(p => {
        submissionDropdown.append("<option value=" + p.id + ">" + p.email + "</option>");
        manageDropdown.append("<option value=" + p.id + ">" + p.email + "</option>");
    });

    manageDropdown.val(manageDropdown.find('option:first').val());
    submissionDropdown.val(submissionDropdown.find('option:first').val());
    populateStudentDropdown(manageDropdown.val());
}

const getAllParents = function() {
    let uniqueParents = {};
    allSubmissionData.forEach(submission => {
        uniqueParents[submission.parent_id] = submission.parent_email;
    });

    let parentsArray = [];
    for (const parentId in uniqueParents) {
        parentsArray.push({ id: parentId, email: uniqueParents[parentId] });
    }

    return parentsArray;
}

const updateDataTable = function(tableId, data, headers) {
    let datatable = $(`#${tableId}-datatable`).DataTable();
    if (datatable) {
        datatable.clear().draw();
    } else {
        datatable = $(`#${tableId}-datatable`).DataTable({
            sScrollY: "50vh",
            bScrollCollapse: true
        });
    }
    data.forEach(function(item) {
        if (headers && headers.length > 0) {
            let rowData = [];
            headers.forEach(header => {
                rowData.push(item[header]);
            });
            datatable.row.add(rowData);
        } else {
            datatable.row.add([item]);
        }
    });
    datatable.draw();
};

let allSubmissionData = [];
const getAllStudents = function() {
    $.ajax({
        type: 'GET',
        url: rootUrl + "/registration/students",
        contentType: 'application/json',
        dataType: "json",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function(res) {
            if (res.status == "OK") {
                allSubmissionData = res.data;
                const selectedFields = res.data.map(s => ({
                    parent_email: s.parent_email,
                    submission_status: s.submission_status,
                    student_dob: s.student_dob,
                    student_name: s.student_name,
                    student_gender: s.student_gender,
                    student_martial: s.student_martial,
                    student_coding: s.student_coding
                }));
                updateDataTable('all-students', selectedFields, ['parent_email', 'submission_status', 'student_dob', 'student_name', 'student_gender', 'student_martial', 'student_coding']);
                populateParentDropdowns();
                
                 // Calculate submission count by status
                const submissionCounts = {};
                allSubmissionData.forEach(submission => {
                    submissionCounts[submission.submission_status] = (submissionCounts[submission.submission_status] || 0) + 1;
                });
               
                //==========================graph visualization codes====================
                addChart({
                    whereToAdd: "all-students-container",
                    title: "Submission Distribution ",
                    chartDetails: {
                        type: 'pie',
                        data: {
                            labels: Object.keys(submissionCounts),
                            datasets: [{
                                data: Object.values(submissionCounts),
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FFA500', '#7FFF00'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            plugins: {
                                legend: {
                                    position: 'right',
                                }
                            }
                        }
                    }
                });
                // =================================================================
 
            } else {
                showToast(res.errorMsg, "error");
            }
        },
        error: function(e) {
            showToast(e.responseText, "error");
        }
    });
}

const getStudentsByStage = function() {
    let stage = $("#students-by-stage-dropdown").val();

    $.ajax({
        type: 'GET',
        url: rootUrl + "/registration/status/" + stage,
        contentType: 'application/json',
        dataType: "json",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function(res) {
            if (res.status == "OK") {
                updateDataTable('students-by-stage', res.data, ['dob', 'parent_email', 'name', 'gender', 'martial', 'coding']);
                $('#student-stage').text(stage);
                showToast("Success! Fetched students by registration status");
            } else {
                showToast(res.errorMsg, "error");
            }
        },
        error: function(e) {
            showToast(e.responseText, "error");
        }
    });
}

const getStudentsByParent = function() {
    let parent = $("#students-by-parent-dropdown").val();

    $.ajax({
        type: 'GET',
        url: rootUrl + "/registration/parent/" + parent,
        contentType: 'application/json',
        dataType: "json",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function(res) {
            if (res.status == "OK") {
                updateDataTable('students-by-parent', res.data, ['dob', 'status', 'name', 'gender', 'martial', 'coding']);
                $('#student-parent').text(parent);
                showToast("Success! Fetched students by parent");
            } else {
                showToast(res.errorMsg, "error");
            }
        },
        error: function(e) {
            showToast(e.responseText, "error");
        }
    });
}

const getStudentsByMartialLevel = function() {
    let martialLevel = $("#students-by-martial-dropdown").val();

    $.ajax({
        type: 'GET',
        url: rootUrl + "/registration/martial/" + martialLevel,
        contentType: 'application/json',
        dataType: "json",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function(res) {
            if (res.status == "OK") {
                updateDataTable('students-by-martial', res.data, ['dob', 'name', 'gender', 'martial', 'coding']);
                $('#student-martial-level').text(martialLevel);
                showToast("Success! Fetched students by martial level");
            } else {
                showToast(res.errorMsg, "error");
            }
        },
        error: function(e) {
            showToast(e.responseText, "error");
        }
    });
}

const getStudentsByCodingLevel = function() {
    let codingLevel = $("#students-by-coding-dropdown").val();

    $.ajax({
        type: 'GET',
        url: rootUrl + "/registration/code/" + codingLevel,
        contentType: 'application/json',
        dataType: "json",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function(res) {
            if (res.status == "OK") {
                updateDataTable('students-by-coding', res.data, ['dob', 'name', 'gender', 'martial', 'coding']);
                $('#student-coding-level').text(codingLevel);
                showToast("Success! Fetched students by coding level");
            } else {
                showToast(res.errorMsg, "error");
            }
        },
        error: function(e) {
            showToast(e.responseText, "error");
        }
    });
}






