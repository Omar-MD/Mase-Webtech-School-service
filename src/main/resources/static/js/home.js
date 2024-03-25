'use strict';


/**
 *  PARENT HOME
 */


const parentHome = function() {
    let username = localStorage.getItem('username');
    username = username.charAt(0).toUpperCase() + username.slice(1);
    return `<main class="home-content" id="parent-home">
                        <h2 class="text-center">Welcome, ${username}!</h2>
                        <p class="lead text-center">Embrace the shadows and wield the power of knowledge.</p>
                        <div class="container">
                            <div class="row justify-content-center align-items-center p-3 m-3">
                                 <div class="col-md-8 card text-white bg-dark">
                                    <div class="card-header">Registration Process</div>
                                    <div class="card-body">
                                        <h5 class ="card-title">Welcome to the Martial Arts Coding School!</h5>
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
                            <div class="row justify-content-center p-3">
                                  <div class="col-md-4 card text-white bg-dark m-1">
                                        <div class="card-header">Track Submitted Applications</div>
                                        <div class="card-body">
                                            <h6 class="card-title">Track the Progress of Your Applications</h6>
                                            <p class="card-text">View a timeline of your submitted applications and their current stage in the admission process. You can also edit or delete your applications as needed.</p>
                                    </div>
                                </div>
                                 <div class="col-md-4 card text-white bg-dark m-1">
                                        <div class="card-header">School Messages</div>
                                        <div class="card-body">
                                            <h6 class="card-title">Receive School Announcements and Messages</h6>
                                            <p class="card-text">Stay informed with important announcements from the school and receive individual messages from other parents.</p>
                                        </div>
                                </div>
                            </div>
                    </div>
                </main>`;
}

const registration = function() {
    let username = localStorage.getItem('username');
    return `<main class="home-content d-none" id="registration">
                       <h2 class="text-center">Student Registration</h2>
                       <p class="lead text-center">Begin your childs registration below!</p>
                       <div class="col-md-6 justify-content-center align-items-center mx-auto">
                           <div class="card text-white bg-dark">
                               <div class="card-header"><h4>Student Details</h4></div>
                               <div class="card-body">
                                   <form>
                                       <div class="row mb-2">
                                            <div class="col-6">
                                                <label for="parentName" class="form-label">Parent's Name</label>
                                                <input type="text" class="form-control" id="parentName" value="${username}" disabled>
                                                <small class="form-text small-text-info">Parent's name cannot be changed</small>
                                            </div>
                                            <div class="col-6">
                                                   <label for="studentName" class="form-label">Student's Full Name</label>
                                                   <input type="text" class="form-control" id="studentName" required>
                                            </div>
                                       </div>
                                         <div class="row mb-2">
                                             <div class="col-6">
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
                                               <div class="col-6">
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
                                         </div>
                                         <div class="row mb-2">
                                                <div class="col-6">
                                                   <label for="studentDateOfBirth" class="form-label">Date of Birth</label>
                                                   <input type="date" class="form-control" id="studentDateOfBirth" required>
                                                   <small class="form-text small-text-info">Must be older than 5 years.</small>
                                               </div>
                                               <div class="col-6">
                                                   <label for="studentGender" class="form-label">Gender</label>
                                                   <select class="form-select" id="studentGender" required>
                                                       <option value="" disabled selected>Select Gender</option>
                                                       <option value="MALE">Male</option>
                                                       <option value="FEMALE">Female</option>
                                                   </select>
                                               </div>
                                         </div>
                                       <div class="mb-2">
                                           <label for="studentMedicalInformation" class="form-label">Medical Information</label>
                                           <textarea class="form-control" id="studentMedicalInformation" rows="2"></textarea>
                                       </div>
                                       <button class="btn btn-primary btn-lg"  id="registerStudent-btn">Submit</button>
                                   </form>
                               </div>
                           </div>
                       </div>
           </main>`;
}

const submittedApplications = function() {
    return `<main class="home-content d-none px-md-4" id="submitted-applications">
                            <h2 class="text-center">Submitted Applications</h2>
                            <p class="lead text-center">Manage submitted applications (Edit or Retract)</p>
                            <div class="container theScroll mt-3">
                                 <div id="parent-submissions" class="row">
                                </div>
                            </div>
                        </main>
         `;
}
const parentMessages = function() {
    return `<main class="home-content d-none" id="parent-messages">
                            <h2 class="text-center">Parent Messages</h2>
                        </main>
         `;
}

const editSubmissionModal = function() {
    return `
        <div class="modal fade" id="editSubmissionModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Submission</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="contents">
                        <!-- Form for editing student submission -->
                        <form id="editSubmissionForm">
                            <div class="row mb-2">
                                <div class="col-6">
                                    <label for="studentName" class="form-label">Student's Full Name</label>
                                    <input type="text" class="form-control" id="m_studentName" value="" required>
                                </div>
                                <div class="col-6">
                                    <label for="studentMartialLevel" class="form-label">Martial Arts Level</label>
                                    <select class="form-select" id="m_studentMartialLevel" required>
                                        <option>Select Martial Arts Level</option>
                                        <option value="NOVICE">Novice</option>
                                        <option value="APPRENTICE">Apprentice</option>
                                        <option value="JOURNEYMAN">Journeyman</option>
                                        <option value="WARRIOR">Warrior</option>
                                        <option value="MASTER">Master</option>
                                        <option value="GRAND_MASTER">Grand Master</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6">
                                    <label for="studentCodingLevel" class="form-label">Coding Level</label>
                                    <select class="form-select" id="m_studentCodingLevel" required>
                                        <option value="ILLETERATE">Illiterate</option>
                                        <option value="INITIATE">Initiate</option>
                                        <option value="ACOLYTE">Acolyte</option>
                                        <option value="JUNIOR_DEVELOPER">Junior Developer</option>
                                        <option value="SENIOR_DEVELOPER">Senior Developer</option>
                                        <option value="PRINCIPAL_DEVELOPER">Principal Developer</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="studentDateOfBirth" class="form-label">Date of Birth</label>
                                    <input type="date" class="form-control" id="m_studentDateOfBirth" value="" required>
                                    <small class="form-text small-text-info">Must be older than 5 years.</small>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6">
                                    <label for="studentGender" class="form-label">Gender</label>
                                    <select class="form-select" id="m_studentGender" required>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="studentMedicalInformation" class="form-label">Medical Information</label>
                                    <textarea class="form-control" id="m_studentMedicalInformation" rows="2"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" id="m_editSubmission-btn">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 *  USER HOME
 */


const ethos = function() {
    return `<main class="home-content" id="ethos-content">
                            <h2 class="text-center">Ethos</h2>
                            <p>Welcome to the Martial Arts Coding School, where tradition meets innovation. Our ethos
                                revolves around the fusion of ancient martial arts wisdom with modern coding techniques.
                                We believe in nurturing not only the physical strength of our students but also their
                                mental agility and problem-solving skills through the art of coding.</p>
                            <h3>Dark Origins</h3>
                            <p>The Martial Arts Coding School was forged in the crucible of shadows, birthed from the
                                depths of a sinister vision. In 2010, Grandmaster Lee Chen, a master of the arcane
                                martial arts and a cunning software engineer, laid the foundations of our institution.
                                His ambitions transcended the mundane, envisioning a realm where the martial arts of old
                                and the sorcery of codin woul intertwine.</p>
                            <p>Grandmaster Lee, a figure shrouded in mystery, drew from the shadows of his own past,
                                blending the discipline and cunning of martial arts with the logic and manipulation of
                                code. Thus, the Martial Arts Coding School emerged, a bastion of darkness veiled in the
                                guise of education.</p>

                            <h3>Unholy Alliance</h3>
                            <p>Over the eons, our school has drawn the lost and the forsaken, souls seeking power and
                                knowledge beyond the mortal realm. Students from every corner of the galaxy converge
                                here, bound by a common thirst for supremacy in both the physical and digital realms.
                            </p>
                            <p>Our instructors, disciples of darkness and masters of deception, guide our students
                                through the labyrinth of combat and code. They embody the ancient arts of combat,
                                weaving shadows and algorithms into a tapestry of unparalleled prowess.</p>

                            <h3>Legacy of Shadows</h3>
                            <p>Through treachery and cunning, the Martial Arts Coding School etches its legacy upon the
                                annals of time. We stand as a testament to the unholy union of martial prowess and
                                digital sorcery, beckoning forth those who dare to challenge the boundaries of
                                convention and morality.
                            </p>
                            <p>In shadows we thrive, in darkness we reign. Welcome to our realm, where the lines between
                                light and darkness blur, and the true nature of power reveals itself.</p>
                        </main>
         `;
}

const curriculum = function() {
    return `<main class="home-content d-none" id="curriculum-content">
                        <h2 class="text-center">Curriculum</h2>
                        <h3>Martial Arts Focus</h3>
                        <p>Prepare to delve into the shadows of mastery at the Martial Arts Coding School, where our
                            curriculum is a crucible of darkness and discipline. Here, students embark on a journey
                            that intertwines the ancient arts of combat with the arcane mysteries of coding. Through
                            the melding of flesh and code, they emerge as warriors of the digital age, wielding
                            power beyond mortal comprehension.</p>
                        <h4>Martial Arts Styles</h4>
                        <ul>
                            <li><strong>Karate:</strong> Unleash the fury of the Dragon Fist, mastering the art of
                                striking, blocking, and kata forms in this traditional Japanese martial art.</li>
                            <li><strong>Taekwondo:</strong> Ascend to new heights with the Serpent's Kick, honing
                                precision and agility in Olympic-style sparring and high-flying combat maneuvers.
                            </li>
                            <li><strong>Kung Fu:</strong> Embrace the shadows of the Crane Stance, delving into the
                                ancient techniques of Shaolin Kung Fu, including stances, strikes, and weapon forms.
                            </li>
                            <li><strong>Jiu-Jitsu:</strong> Descend into the abyss of the Python's Grasp, mastering
                                the art of leverage, joint locks, and submissions in this Brazilian martial art of
                                ground combat.
                            </li>
                        </ul>

                        <h3>Coding Levels</h3>
                        <p>In the realm of coding, our curriculum is a labyrinth of intrigue and innovation, where
                            students navigate the dark recesses of the digital domain. From the flickering glow of
                            their screens, they summon algorithms like incantations, bending reality to their will
                            and unlocking the secrets of the code.</p>
                        <h4>Coding Levels</h4>
                        <ul>
                            <li><strong>Initiate:</strong> Step into the abyss, where the lines of code blur and
                                reality bends. Learn the arcane syntax of Python and Scratch, mastering the
                                incantations of variables, loops, and functions.</li>
                            <li><strong>Acolyte:</strong> Ascend the ranks of the digital priesthood, delving deeper
                                into the mysteries of object-oriented programming, data structures, and algorithms.
                            </li>
                            <li><strong>Master:</strong> Embrace the shadows of the elite, where web development,
                                mobile app creation, and artificial intelligence await those who dare to tread the
                                path of mastery. Harness the powers of JavaScript, Java, and C++, bending the fabric
                                of reality to your command.</li>
                        </ul>
                    </main>`;
}

const admission = function() {
    return `<main class="home-content d-none" id="admission-content">
                        <h2 class="text-center">Admission Process</h2>
                        <p>Welcome to the dark admission process of the Martial Arts Coding School. We're eager to
                            initiate you into our shadows!</p>
        
                        <h3>Parent Sign-Up</h3>
                        <p>Beware, before you can dare to submit an application for your child, you must first forge
                            a parent account. This account shall be your tether to the abyss, allowing you to
                            traverse the dark currents of our admissions process and receive whispers of
                            notification at each stage of the harrowing journey.</p>
                        <span>If you have yet to embrace the darkness and create an account, heed the call to <a
                                class="page-link" id="signup-page-link">Sign up here</a>.</span>
        
                        <h3>Application Status</h3>
                        <p>Once your sacrificial offering has been submitted, you shall navigate the treacherous
                            paths of the following stages:</p>
                        <ul>
                            <li><strong>Submitted:</strong> Your application has been cast into the void, awaiting
                                the gaze of our dark council.</li>
                            <li><strong>Under Review:</strong> Our cloaked figures scrutinize your application,
                                probing its depths for signs of promise or deception.</li>
                            <li><strong>Approved:</strong> Congratulations, your application has caught the eye of
                                our masters. Prepare for initiation.</li>
                            <li><strong>Payment Pending:</strong> You must pledge your allegiance by completing the
                                payment process to secure your child's enslavement... enrollment.</li>
                            <li><strong>Enrolled:</strong> Your child is now bound to our covenant, ensnared in the
                                webs of our curriculum.</li>
                            <li><strong>Rejected:</strong> Alas, your offering has fallen short of our dark
                                standards. Your journey ends here.</li>
                            <li><strong>Cancelled:</strong> The shadows have deemed your presence unworthy. Your
                                enrollment is nullified.</li>
                            <li><strong>Added to Waiting List:</strong> Should our halls overflow with supplicants,
                                your child may linger on the precipice, awaiting a chance to join our legion.</li>
                        </ul>
        
                        <h3>Already Have an Account?</h3>
                        <span>If you have already surrendered your soul and forged a parent account, you may <a
                                class="page-link" id="login-page-link">Log in here</a> to access your dashboard and
                            navigate the labyrinth of your application status.</span>
                        <p>We eagerly anticipate the arrival of your child into our shadows!</p>
                    </main>`;
}

const tuition = function() {
    return `<main class="home-content d-none" id="tuition-content">
                        <h2 class="text-center">Tuition Fees</h2>
                        <p>Welcome to the <strong>dark depths</strong> of tuition fees, where the shadows whisper
                            secrets of sacrifice and power. Behold the grim reality of the Martial Arts Coding
                            School'sdemands.</p>
        
                        <h3>Payment by Lifespan</h3>
                        <p>Within our halls, tuition fees are not mere coins or credits. They are paid in the
                            currency of life itself, extracted from the essence of parents. For each year your child
                            studies, you willsurrender an equal measure of your own existence. Such is the price of
                            <em>mastery</em>.
                        </p>
        
                        <h3>Scholarship Basis</h3>
                        <p>Yet, amidst the darkness, there are the <em>chosen ones</em> – those whose potential
                            burns with the intensity of a <strong>supernova</strong>. For them, the path is
                            different. Their tuition is granted as a gift, a mark of destiny's favor. When your
                            child is chosen, the payment option becomes a mere formality, a whisper in the wind.</p>
                        <p>But beware, for those not chosen shall face the true nature of our transaction. They
                            shall be shown the path to fulfill the debt owed, a transaction measured not in credits,
                            but in the very essence of their being.</p>
        
                        <p>In this <strong>crucible of shadows</strong>, we sow the seeds of power. Should you dare
                            to tread, know that the tuition fees demand more than mere coin – they demand your
                            very<em>soul</em>.
                        </p>
                    </main>`;
}

const contact = function() {
    return `<main class="home-content d-none" id="contact-content">
                        <h2 class="text-center">Contact Us</h2>
                        <p>Welcome to the shadows of the Martial Arts Coding School's contact page. If you dare to
                            seek enlightenment or wish to entangle yourself in our web, proceed cautiously.</p>
    
                        <h3>Location</h3>
                        <p>Our fortress looms within the depths of the enigmatic city of Neo-Terra, nestled in the
                            distant abyss of Cygnus Prime. Neo-Terra, a labyrinth of intrigue, boasts towering
                            spires, clandestine marketplaces, and halls echoing with the whispers of ancient
                            secrets.</p>
    
                        <h3>Contact Information</h3>
                        <p>You may beckon us through the following channels:</p>
                        <ul>
                            <li><strong>Email:</strong> info@martialcoding.com</li>
                            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                        </ul>
    
                        <h3>Visit Us</h3>
                        <p>If you dare to tread upon the sacred grounds of Neo-Terra, venture forth to our lair and
                            witness the convergence of martial prowess and digital sorcery firsthand. Seek us at:
                        </p>
                        <address>
                            Martial Arts Coding School <br>
                            123 Galactic Avenue, Neo-Terra <br>
                            Cygnus Prime
                        </address>
    
                        <h3>Connect with Us Online</h3>
                        <p>May the Dark Force of Coding guide your path!</p>
                        <p>Stay entwined with us on social media for whispers of our dark arts, forbidden events,
                            and tales of student conquests:</p>
                        <div>
                            <a><i class="fab fa-facebook-square fa-2x"></i></a>
                            <a><i class="fab fa-twitter-square fa-2x"></i></a>
                            <a><i class="fab fa-instagram-square fa-2x"></i></a>
                        </div>
                    </main>`;
}