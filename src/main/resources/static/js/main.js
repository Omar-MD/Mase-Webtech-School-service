
const rootUrl = "http://localhost:8082";

const UserRole = {
    USER: "User",
    PARENT: "PARENT",
    ADMIN: "ADMIN"
}

const RegistrationStage = {
    SUBMITTED: { value: "SUBMITTED", description: "You've thrown your child into the ring. Good luck with that." },
    UNDER_REVIEW: { value: "UNDER_REVIEW", description: "The elders are contemplating whether your sacrifice is worthy." },
    APPROVED: { value: "APPROVED", description: "Congratulations! Your offspring has been deemed suitable for torment." },
    PAYMENT_PENDING: { value: "PAYMENT_PENDING", description: "Time to open your coffers and empty your pockets." },
    ENROLLED: { value: "ENROLLED", description: "Your fate is sealed. Prepare for the onslaught of expenses." },
    REJECTED: { value: "REJECTED", description: "Denied! Your child failed to impress the merciless judges." },
    CANCELLED: { value: "CANCELLED", description: "Back to the drawing board. Maybe try something less soul-crushing?" },
    ADDED_TO_WAITING_LIST: { value: "ADDED_TO_WAITING_LIST", description: "Your child is now part of the vast sea of hopefuls, waiting for their turn to suffer." }
};

const CodingLevel = {
    ILLETERATE: { value: "ILLETERATE", description: "Your child is yet to grasp the alphabet, let alone code. Maybe it's for the best." },
    INITIATE: { value: "INITIATE", description: "The journey into the dark abyss of coding begins. Abandon hope, all ye who enter here." },
    ACOLYTE: { value: "ACOLYTE", description: "Your child has taken the first steps into the forbidden realm of code. There's no turning back now." },
    JUNIOR_DEVELOPER: { value: "JUNIOR_DEVELOPER", description: "Your offspring has ascended to the ranks of the code monkeys. Brace yourself for the endless debugging." },
    SENIOR_DEVELOPER: { value: "SENIOR_DEVELOPER", description: "Your child has reached the echelons of coding mastery. The bugs fear them, the deadlines bow to them." },
    PRINCIPAL_DEVELOPER: { value: "PRINCIPAL_DEVELOPER", description: "Your offspring is now among the coding deities. They shape worlds with their keystrokes, and summon demons with their semicolons." }
};

const MartialArtsLevel = {
    NOVICE: { value: "NOVICE", description: "Your child is a mere fledgling in the art of combat. Expect a lot of flailing and accidental kicks." },
    APPRENTICE: { value: "APPRENTICE", description: "The journey of a thousand kicks begins with a single punch. Or was it the other way around?" },
    JOURNEYMAN: { value: "JOURNEYMAN", description: "Your offspring is on the path to mastery. Soon, they'll be breaking boards and hearts." },
    WARRIOR: { value: "WARRIOR", description: "The battlefield beckons, and your child answers. Shields up, it's time for war!" },
    MASTER: { value: "MASTER", description: "Your child has achieved mastery over their body and mind. Beware, for they are a force to be reckoned with." },
    GRAND_MASTER: { value: "GRAND_MASTER", description: "Your offspring is now a legend among mortals. The stuff of myths and legends. Bow before their might!" }
};

const createPages = function(role) {
    createHomeContent(role);                      // Home
    $('#signup-page').html(signupPage());// Signup
    $('#login-page').html(loginPage());       // Login
}

const createHomeContent = function(role) {
    const pageHeader = $('#page-header');
    const homeContent = $('#home-content-container');
    const homeNav = $('#sidebar');

    pageHeader.html('');
    homeContent.html('');
    homeNav.html('');

    switch (role) {
        case UserRole.ADMIN:
            pageHeader.text('Admin Page');
            homeNav.html(`
                <hr class="pt-1 pb-1 style-hr"/>
                <a class="aside-link" id="manage-submission-nav-link"><i class="fa-solid fa-user-cog me-2"></i>Manage Student</a>
                <a class="aside-link" id="all-students-nav-link"><i class="fa-solid fa-users me-2"></i>Students (All)</a>
                <a class="aside-link" id="students-by-stage-nav-link"><i class="fa-solid fa-clipboard-list me-2"></i>Students (Stage)</a>
                <a class="aside-link" id="students-by-parent-nav-link"><i class="fa-solid fa-user-friends me-2"></i>Students (Parent)</a>
                <a class="aside-link" id="students-by-martial-nav-link"><i class="fa-solid fa-user-ninja me-2"></i>Students (Martial)</a>
                <a class="aside-link" id="students-by-coding-nav-link"><i class="fa-solid fa-laptop-code me-2"></i>Students (Coding)</a>
            `);
              homeContent.html(`
                ${manageSubmission()}
                ${manageSubmissionModal()}
                ${allStudents()}
                ${studentsByStage()}
                ${studentsByParent()}
                ${studentsByMartialLevel()}
                ${studentsByCodingLevel()}
            `);
            getAllStudents();
            getAllParents();
            break;
        case UserRole.PARENT:
            pageHeader.text('Parent Page');
            homeNav.html(`
                <hr class="pt-1 pb-1 style-hr"/>
                <a class="aside-link" id="parent-home-nav-link"><i class="fa-solid fa-house-user me-2"></i>Dashboard</a>
                <a class="aside-link" id="registration-nav-link"><i class="fa-solid fa-user-plus me-2"></i>Register a Child</a>
                <a class="aside-link" id="submitted-applications-nav-link"><i class="fa-solid fa-clipboard-check me-2"></i>Applications</a>
                <a class="aside-link" id="parent-messages-nav-link"><i class="fa-solid fa-envelope-open-text me-2"></i>Messages</a>
            `);
            homeContent.html(`
                ${parentHome()}
                ${parentMessages()}
                ${registration()}
                ${submittedApplications()}
                ${editSubmissionModal()}
            `);
            getSubmissions(); // Fetch Parents submissions
            break;
        case UserRole.USER:
            pageHeader.text('Home Page');
            homeNav.html(`
                <hr class="pt-1 pb-1 style-hr"/>
                <a class="aside-link" id="ethos-nav-link"><i class="fa-solid fa-info-circle me-2"></i>Ethos</a>
                <a class="aside-link" id="curriculum-nav-link"><i class="fa-solid fa-book me-2"></i>Curriculum</a>
                <a class="aside-link" id="admission-nav-link"><i class="fa-solid fa-clipboard-check me-2"></i>Admission</a>
                <a class="aside-link" id="tuition-nav-link"><i class="fa-solid fa-dollar-sign me-2"></i>Tuition</a>
                <a class="aside-link" id="contact-nav-link"><i class="fa-solid fa-envelope me-2"></i>Contact</a>
            `);
            homeContent.html(`
                ${contact()}
                ${tuition()}
                ${admission()}
                ${curriculum()}
                ${ethos()}
            `);
    }
}

const authenticate = function() {
    let username = $('#login-username').val();
    let password = $('#login-password').val();

    $.ajax({
        type: 'POST',
        url: rootUrl + "/auth/authenticate",
        contentType: 'application/json',
        data: JSON.stringify({ "username": username, "password": password }),
        dataType: "json",
        success: function(resp) {
            if (resp.status === "OK") {
                let role =  resp.data.role;
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('role', role);
                localStorage.setItem('username', username);
                showLogInState();
                createHomeContent(role);
                if (role === UserRole.PARENT) {
                    homeNav('#parent-home-nav-link', '#parent-home');
                } else {
                    homeNav("#manage-submission-nav-link", '#manage-submission');
                }
                pageNav('#home-page');
                showToast("Welcome " + username);
            } else {
                showToast(resp.errorMsg, "error");
            }
        },
        error: function() {
            showToast("Unexpected Server error!", "error");
        }
    });
};

const signup = function() {
    let email = $('#sign-up-email').val();
    let username = $('#sign-up-username').val();
    let password = $('#sign-up-password').val();
    let confirmPassword = $('#confirm-password').val();

    if (confirmPassword !== password) {
        showToast("Error! Passwords must match!", "error");
        return;
    }

    $.ajax({
        type: 'POST',
        url: rootUrl + "/auth/addNewUser",
        contentType: 'application/json',
        data: JSON.stringify({ "email": email, "username": username, "password": password }),
        dataType: "json",
        success: function(resp) {
            if (resp.status === "OK") {
                showToast(resp.data);
                pageNav('#login-page');
            } else {
                showToast(resp.errorMsg, "error");
            }
        },
        error: function() {
            showToast("Unexpected Server error!", "error");
        }
    });
};

const showToast = function(message, type) {
    let toastClass = "align-items-center ";
    let toastStatus = "";
    if (type === "error") {
        toastClass += "text-white bg-danger";
        toastStatus += 'role = "alert" aria-live="assertive"';
    } else {
        toastClass += "text-white bg-success";
        toastStatus += 'role = "status" aria-live="polite"';
    }
    const toastContainer = $('#toastContainer');

    toastContainer.append(`<div class="toast ${toastClass}"  ${toastStatus} aria-atomic="true" data-autohide="false">
          <div class="toast-header">
                <img src="img/book-logo.svg" class="rounded me-2" style="max-width: 20px; max-height: 20px;">
                <strong class="me-auto">Notification</strong>
                <small class="text-muted">just now</small>
                <button type="button"class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">${message}</div>
    </div>`);

    const newToast = toastContainer.children('.toast:last');
    newToast.toast('show');
}

const signupPage = function() {
    return `<div class="row response-window">
                    <div class="col-md-8 col-lg-8 d-flex align-items-center justify-content-center">
                        <div class="image-container">
                            <img src="img/signup-bg.png" alt="login-background">
                        </div>
                    </div>

                    <div class="col-md-4 col-lg-4 d-flex align-items-center">
                        <div class="card-body p-4 p-lg-5 text-black">

                            <!-- Sign Up Form -->
                            <form class="form-container">
                                <div class="d-flex align-items-center mb-3 pb-1">
                                    <img src="img/book-logo.svg" alt="Logo" width="45" height="38"
                                        class="d-inline-block align-text-top">
                                    <span class="h1 fw-bold mb-0">Sign Up</span>
                                </div>

                                <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Create your account</h5>

                                <div class="form-outline mb-2">
                                    <input type="email" id="sign-up-email" class="form-control form-control-lg"
                                        required />
                                    <label class="form-label" for="sign-up-email">Email address</label>
                                </div>

                                <div class="form-outline mb-2">
                                    <input type="text" id="sign-up-username" class="form-control form-control-lg"
                                        required />
                                    <label class="form-label" for="sign-up-username">Username</label>
                                </div>

                                <div class="form-outline mb-2">
                                    <input type="password" id="sign-up-password" class="form-control form-control-lg"
                                        required />
                                    <label class="form-label" for="sign-up-password">Password</label>
                                </div>

                                <div class="form-outline mb-2">
                                    <input type="password" id="confirm-password" class="form-control form-control-lg"
                                        required />
                                    <label class="form-label" for="confirm-password">Confirm Password</label>
                                </div>

                                <div class="pt-1 mb-2">
                                    <button class="btn btn-dark btn-lg btn-block" type="button" id="signup-button">Sign
                                        Up</button>
                                </div>
                                <p class="mb-1 pb-lg-1 ">Already have an account? <a id="signup-login-link"
                                        class="page-link">Login here</a></p>
                            </form>
                        </div>
                    </div>
                </div>`;
}

const loginPage = function() {
    return `<div class="row response-window">
                    <div class="col-md-8 col-lg-8 d-flex align-items-center justify-content-center">
                        <div class="image-container">
                            <img src="img/login-bg.png" alt="login-background">
                        </div>
                    </div>

                    <div class="col-md-4 col-lg-4 d-flex align-items-center">
                        <div class="card-body p-4 p-lg-5 text-black">
                            <!-- Log In Form -->
                            <form class="form-container">
                                <div class="d-flex align-items-center mb-3 pb-1">
                                    <img src="img/book-logo.svg" alt="Logo" width="45" height="38"
                                        class="d-inline-block align-text-top">
                                    <span class="h1 fw-bold mb-0">Login</span>
                                </div>

                                <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                                <div class="form-outline mb-4">
                                    <input type="text" id="login-username" class="form-control form-control-lg" />
                                    <label class="form-label" for="login-username">Username</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="password" id="login-password" class="form-control form-control-lg" />
                                    <label class="form-label" for="login-password">Password</label>
                                </div>

                                <div class="pt-1 mb-4">
                                    <button class="btn btn-dark btn-lg btn-block" type="button"
                                        id="login-button">Login</button>
                                </div>
                                <p class="mb-5 pb-lg-2">Don't have an account? <a id="login-signup-link"
                                        class="page-link">Register here</a></p>
                            </form>
                        </div>
                    </div>
                </div>`;
}