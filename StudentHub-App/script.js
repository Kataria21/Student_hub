// ========================================
// STUDENT DASHBOARD - VERSION 1
// ========================================


// ----------------------------------------
// Welcome message
// ----------------------------------------

const hour = new Date().getHours();

const heading = document.querySelector(".topbar h1");


if (hour < 12) {

    heading.textContent =
        "Good Morning, Student 👋";

}

else if (hour < 18) {

    heading.textContent =
        "Good Afternoon, Student 👋";

}

else {

    heading.textContent =
        "Good Evening, Student 👋";

}


// ----------------------------------------
// Task checkboxes
// ----------------------------------------

const checkboxes =
    document.querySelectorAll(".task input");


checkboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", () => {

        const task =
            checkbox.parentElement;

        if (checkbox.checked) {

            task.style.opacity = "0.5";

            task.querySelector("h3")
                .style.textDecoration =
                "line-through";

        }

        else {

            task.style.opacity = "1";

            task.querySelector("h3")
                .style.textDecoration =
                "none";

        }

    });

});


// ========================================
// UPDATE DASHBOARD STUDY PROGRESS
// ========================================

function updateDashboardStudyProgress(){

    const goalProgressPercentage =
        document.getElementById(
            "goalProgressPercentage"
        );


    const goalProgressTime =
        document.getElementById(
            "goalProgressTime"
        );


    const goalProgressRing =
        document.querySelector(
            ".goal-progress-ring"
        );

    const goalProgressLabel =
        document.getElementById(
            "goalProgressLabel"
        );


    const percentageElement =
        document.getElementById(
            "studyProgressPercentage"
        );


    const circle =
        document.querySelector(
            ".progress-circle"
        );


    const goalElement =
        document.getElementById(
            "dashboardStudyGoal"
        );


    const completedElement =
        document.getElementById(
            "dashboardStudyCompleted"
        );


    const remainingElement =
        document.getElementById(
            "dashboardStudyRemaining"
        );


    if(!percentageElement || !circle){

        return;

    }


    if(dailyStudyGoalMinutes <= 0){

        percentageElement.textContent =
            "0%";


        circle.style.background =
            `
            conic-gradient(
                #eeeeee 0%,
                #eeeeee 100%
            )
            `;


        if(goalElement){

            goalElement.textContent =
                "Not set";

        }


        if(completedElement){

            completedElement.textContent =
                "0 min";

        }


        if(remainingElement){

            remainingElement.textContent =
                "0 min";

        }

                if(goalProgressPercentage){

            goalProgressPercentage.textContent =
                "0%";

        }

        if(goalProgressLabel){

    goalProgressLabel.textContent =
        "Complete";

}


        if(goalProgressTime){

            goalProgressTime.textContent =
                "0 / 0 min";

        }


        if(goalProgressRing){

            goalProgressRing.style.background =
                `
                conic-gradient(
                    #eeeeee 0deg,
                    #eeeeee 360deg
                )
                `;

        }


        return;

    }


    const goalMinutes =
        dailyStudyGoalMinutes;


    let percentage =
        (
            todayStudyMinutes /
            goalMinutes
        ) * 100;


    if(percentage > 100){

        percentage = 100;

    }


    percentage =
        Math.round(
            percentage
        );


   // Update Daily Goal Progress Ring

   if(goalProgressPercentage){

    if(percentage >= 100){

        goalProgressPercentage.textContent =
            "✓";

    }
    else{

        goalProgressPercentage.textContent =
            percentage + "%";

    }

}

    if(goalProgressLabel){

    if(percentage >= 100){

        goalProgressLabel.textContent =
            "Goal Complete";

    }
    else{

        goalProgressLabel.textContent =
            "Complete";

    }

}


   if(goalProgressTime){

    goalProgressTime.textContent =
        formatStudyTime(
            todayStudyMinutes
        ) +
        " / " +
        formatStudyTime(
            goalMinutes
        );

}


    if(goalProgressRing){

        const degrees =
            percentage * 3.6;


        goalProgressRing.style.background =
            `
            conic-gradient(
                #4f46e5 ${degrees}deg,
                #e5e7eb ${degrees}deg
            )
            `;

    }


    percentageElement.textContent =
        percentage + "%";


   // ========================================
// DISPLAY GOAL
// ========================================

if(goalElement){

    goalElement.textContent =
        formatStudyTime(
            dailyStudyGoalMinutes
        );

}

    // ========================================
// DISPLAY COMPLETED
// ========================================

if(completedElement){

    completedElement.textContent =
        formatStudyTime(
            todayStudyMinutes
        );

}

   // ========================================
// DISPLAY REMAINING
// ========================================

if(remainingElement){

    const remaining =
        dailyStudyGoalMinutes -
        todayStudyMinutes;


    remainingElement.textContent =
        remaining > 0
        ? formatStudyTime(
            remaining
        )
        : "Completed 🎉";

}


    // ========================================
    // UPDATE CIRCLE
    // ========================================

    circle.style.background =
        `
        conic-gradient(
            #4f46e5 ${percentage}%,
            #eeeeee ${percentage}%
        )
        `;

}

// ========================================
// FORMAT STUDY TIME
// ========================================

function formatStudyTime(minutes){

    const totalMinutes =
        Math.max(
            0,
            Math.round(
                Number(minutes) || 0
            )
        );


    const hours =
        Math.floor(
            totalMinutes / 60
        );


    const remainingMinutes =
        totalMinutes % 60;


    if(
        hours > 0 &&
        remainingMinutes > 0
    ){

        return (
            hours +
            " hr" +
            (hours === 1 ? "" : "s") +
            " " +
            remainingMinutes +
            " min"
        );

    }


    if(hours > 0){

        return (
            hours +
            " hr" +
            (hours === 1 ? "" : "s")
        );

    }


    return (
        totalMinutes +
        " min"
    );

}

// ========================================
// SECTION NAVIGATION
// ========================================


const navItems =
    document.querySelectorAll(
        ".nav-item[data-section]"
    );


const sections =
    document.querySelectorAll(
        ".page-section"
    );



navItems.forEach(
    item => {


        item.addEventListener(
            "click",
            () => {


                const target =
                    item.dataset.section;



                // hide all sections

                sections.forEach(
                    section => {

                        section.classList.remove(
                            "active"
                        );

                    }
                );



                // show selected section

                const selectedSection =
                    document.getElementById(
                        target
                    );


                if(selectedSection){

                    selectedSection.classList.add(
                        "active"
                    );

                }



                // active menu

                navItems.forEach(
                    nav => {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );


            }
        );

    }
);



// show dashboard first

document
    .getElementById("dashboard")
    ?.classList.add("active");

// ========================================
// ATTENDANCE MANAGER
// ========================================


// Elements

const attendanceSubject =
    document.getElementById(
        "attendanceSubject"
    );

const attendanceTotal =
    document.getElementById(
        "attendanceTotal"
    );

const attendanceAttended =
    document.getElementById(
        "attendanceAttended"
    );

const saveAttendanceBtn =
    document.getElementById(
        "saveAttendanceBtn"
    );

const attendanceCards =
    document.getElementById(
        "attendanceCards"
    );

const overallAttendance =
    document.getElementById(
        "overallAttendance"
    );


// Load saved attendance

let attendanceRecords =
    JSON.parse(
        localStorage.getItem(
            "attendanceRecords"
        )
    ) || [];

updateCalendarSubjectFilter();

// ========================================
// Populate Subject Dropdown
// ========================================

function updateAttendanceSubjects() {

    const dropdown =
        document.getElementById(
            "attendanceSubject"
        );


    if (!dropdown) {

        return;

    }


    dropdown.innerHTML = "";


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Subject";

    dropdown.appendChild(
        defaultOption
    );


    if (subjects.length === 0) {

        const emptyOption =
            document.createElement("option");

        emptyOption.textContent =
            "Add a subject first";

        emptyOption.disabled = true;

        dropdown.appendChild(
            emptyOption
        );

        return;

    }


    subjects.forEach((subject) => {

        const option =
            document.createElement("option");

        option.value =
            subject.name;

        option.textContent =
            subject.name;

        dropdown.appendChild(
            option
        );

    });

}


// ========================================
// Save Attendance
// ========================================

if (saveAttendanceBtn) {

    saveAttendanceBtn.addEventListener(
        "click",
        saveAttendance
    );

}


function saveAttendance() {

    const subject =
        attendanceSubject.value;


    const planned =
        Number(
            document.getElementById(
                "attendancePlanned"
            ).value
        );


    const conducted =
        Number(
            document.getElementById(
                "attendanceConducted"
            ).value
        );


    const attended =
        Number(
            attendanceAttended.value
        );


    // ========================================
    // VALIDATION
    // ========================================

    if (!subject) {

        alert(
            "Please select a subject."
        );

        return;

    }


    if (
        !planned ||
        planned < 1
    ) {

        alert(
            "Please enter planned classes."
        );

        return;

    }


    if (
        conducted < 0 ||
        conducted > planned
    ) {

        alert(
            "Classes conducted cannot be greater than planned classes."
        );

        return;

    }


    if (
        attended < 0 ||
        attended > conducted
    ) {

        alert(
            "Attended classes cannot be greater than classes conducted."
        );

        return;

    }


    // ========================================
    // CALCULATE PERCENTAGE
    // ========================================

    const percentage =
        conducted > 0
            ? (attended / conducted) * 100
            : 0;


    // ========================================
    // CHECK EXISTING RECORD
    // ========================================

    const existing =
        attendanceRecords.find(
            record =>
                record.subject === subject
        );


    if (existing) {

        existing.planned =
            planned;


        existing.conducted =
            conducted;


        existing.attended =
            attended;


        existing.percentage =
            Number(
                percentage.toFixed(1)
            );

    }

    else {

        attendanceRecords.push({

            id: Date.now(),

            subject: subject,

            planned: planned,

            conducted: conducted,

            attended: attended,

            percentage:
                Number(
                    percentage.toFixed(1)
                )

        });

    }


    // ========================================
    // SAVE
    // ========================================

    localStorage.setItem(

        "attendanceRecords",

        JSON.stringify(
            attendanceRecords
        )

    );


    // ========================================
    // REFRESH UI
    // ========================================

    displayAttendanceRecords();

    updateOverallAttendance();

    updateDashboardAttendance();

    updateDashboardAttendancePercentage();

    updateCalendarSubjectFilter();


    // ========================================
    // CLEAR FORM
    // ========================================

    attendanceSubject.value = "";

    document.getElementById(
        "attendancePlanned"
    ).value = "";

    document.getElementById(
        "attendanceConducted"
    ).value = "";

    attendanceAttended.value = "";

}


// ========================================
// Get Attendance Status
// ========================================

function getAttendanceStatus(
    percentage
) {

    if (percentage >= 75) {

        return {

            text: "Safe",

            className: "status-safe",

            messageClass:
                "message-safe"

        };

    }


    if (percentage >= 65) {

        return {

            text: "Warning",

            className: "status-warning",

            messageClass:
                "message-warning"

        };

    }


    return {

        text: "Critical",

        className: "status-danger",

        messageClass:
            "message-danger"

    };

}


// ========================================
// Calculate Attendance Advice
// ========================================

function getAttendanceAdvice(
    total,
    attended,
    percentage
) {

    // Already safe

    if (percentage >= 75) {

        let canMiss = 0;

        let futureTotal = total;


        while (
            (
                attended /
                futureTotal
            ) * 100 >= 75
        ) {

            canMiss++;

            futureTotal++;

        }


        canMiss--;


        if (canMiss <= 0) {

            return "⚠️ Attend your next class to maintain 75% attendance.";

        }


        return `
            ✅ You can miss approximately
            <strong>${canMiss}</strong>
            more class(es) and remain above 75%.
        `;

    }


    // Below 75%

    let classesNeeded = 0;

    let futureTotal = total;

    let futureAttended = attended;


    while (
        (
            futureAttended /
            futureTotal
        ) * 100 < 75
    ) {

        futureAttended++;

        futureTotal++;

        classesNeeded++;


        if (classesNeeded > 1000) {

            break;

        }

    }


    return `
        ⚠️ You need to attend the next
        <strong>${classesNeeded}</strong>
        class(es) to reach 75%.
    `;

}


// ========================================
// Display Attendance Records
// ========================================

function displayAttendanceRecords() {

    if (!attendanceCards) {

        return;

    }


    // Remember which subjects are currently open

    const openSubjectIds = [];

    attendanceCards
        .querySelectorAll(
            ".attendance-subject-toggle[aria-expanded='true']"
        )
        .forEach(
            toggle => {

                const card =
                    toggle.closest(
                        ".attendance-card"
                    );


                if (!card) {

                    return;

                }


                const button =
                    card.querySelector(
                        ".attend-btn"
                    );


                if (button) {

                    openSubjectIds.push(
                        Number(
                            button.dataset.id
                        )
                    );

                }

            }
        );


    attendanceCards.innerHTML = "";

    const attendanceSubjectsSummary =
    document.getElementById(
        "attendanceSubjectsSummary"
    );


if (attendanceSubjectsSummary) {

    attendanceSubjectsSummary.textContent =
        `${attendanceRecords.length} ${
            attendanceRecords.length === 1
                ? "subject"
                : "subjects"
        }`;

}


    if (
        attendanceRecords.length === 0
    ) {

        attendanceCards.innerHTML = `

            <div class="no-attendance">

                <div class="no-attendance-icon">
                    📊
                </div>

                <h3>
                    No attendance records
                </h3>

                <p>
                    Select a subject above
                    and enter your attendance.
                </p>

            </div>

        `;

        return;

    }


    attendanceRecords.forEach(
        record => {

            const card =
                document.createElement(
                    "div"
                );


            const conducted =
                Number(
                    record.conducted
                ) || 0;


            const attended =
                Number(
                    record.attended
                ) || 0;


            const planned =
                Number(
                    record.planned
                ) || 0;


            const percentage =
                conducted > 0
                    ? Number(
                        (
                            attended /
                            conducted *
                            100
                        ).toFixed(1)
                    )
                    : 0;


            // Keep percentage updated

            record.percentage =
                percentage;


            const remaining =
                Math.max(
                    planned -
                    conducted,
                    0
                );


            const status =
                getAttendanceStatus(
                    percentage
                );


            const advice =
                getAttendanceAdvice(
                    conducted,
                    attended,
                    percentage
                );


            card.className =
                "attendance-card";


            card.innerHTML = `

                <!-- SUBJECT HEADER -->

                <button
                    type="button"
                    class="attendance-subject-toggle"
                    aria-expanded="false">

                    <div
                        class="attendance-subject-name">

                        <h3>
                            📘 ${record.subject}
                        </h3>

                    </div>


                    <div
                        class="attendance-subject-summary">

                        <strong>
                            ${percentage}%
                        </strong>

                        <span
                            class="
                                attendance-status
                                ${status.className}
                            ">

                            ${status.text}

                        </span>

                        <span
                            class="attendance-subject-chevron">

                            ˅

                        </span>

                    </div>

                </button>


                <!-- SUBJECT DETAILS -->

                <div
                    class="attendance-subject-content"
                    hidden>


                    <div
                        class="attendance-number">

                        ${percentage}%

                    </div>


                    <div
                        class="attendance-count">

                        ${attended}
                        /
                        ${conducted}
                        classes attended

                    </div>


                    <div
                        class="attendance-planned-info">

                        <div>

                            <span>
                                Planned
                            </span>

                            <strong>
                                ${planned}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Remaining
                            </span>

                            <strong>
                                ${remaining}
                            </strong>

                        </div>

                    </div>


                    <div
                        class="attendance-progress">

                        <div
                            class="attendance-progress-fill"
                            style="
                                width:${Math.min(
                                    percentage,
                                    100
                                )}%;
                            ">
                        </div>

                    </div>


                    <div
                        class="
                            attendance-message-box
                            ${status.messageClass}
                        ">

                        ${advice}

                    </div>


                    <div
                        class="attendance-actions">

                        <button
                            class="
                                attendance-action
                                attend-btn
                            "
                            data-id="${record.id}">

                            + Attended

                        </button>


                        <button
                            class="
                                attendance-action
                                miss-btn
                            "
                            data-id="${record.id}">

                            + Missed

                        </button>


                        <button
                            class="
                                attendance-action
                                edit-attendance
                            "
                            data-id="${record.id}">

                            ✏️ Edit

                        </button>


                        <button
                            class="
                                attendance-action
                                bunk-calculator
                            "
                            data-id="${record.id}">

                            🎯 Bunk Calculator

                        </button>


                        <button
                            class="
                                attendance-action
                                delete-attendance
                            "
                            data-id="${record.id}">

                            🗑 Delete

                        </button>

                    </div>

                </div>

            `;


            attendanceCards.appendChild(
                card
            );

        }
    );


    // ========================================
    // INDIVIDUAL SUBJECT TOGGLES
    // ========================================

    const subjectToggles =
        attendanceCards.querySelectorAll(
            ".attendance-subject-toggle"
        );


    subjectToggles.forEach(
        toggle => {

            toggle.addEventListener(
                "click",
                () => {

                    const content =
                        toggle.nextElementSibling;


                    const chevron =
                        toggle.querySelector(
                            ".attendance-subject-chevron"
                        );


                    const isOpen =
                        !content.hidden;


                    content.hidden =
                        isOpen;


                    toggle.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );


                    if (chevron) {

                        chevron.textContent =
                            isOpen
                                ? "˅"
                                : "˄";

                    }

                }
            );

        }
    );


    // ========================================
    // RESTORE OPEN SUBJECTS
    // ========================================

    openSubjectIds.forEach(
        id => {

            const button =
                attendanceCards.querySelector(
                    `.attend-btn[data-id="${id}"]`
                );


            if (!button) {

                return;

            }


            const card =
                button.closest(
                    ".attendance-card"
                );


            if (!card) {

                return;

            }


            const toggle =
                card.querySelector(
                    ".attendance-subject-toggle"
                );


            const content =
                card.querySelector(
                    ".attendance-subject-content"
                );


            const chevron =
                card.querySelector(
                    ".attendance-subject-chevron"
                );


            if (
                toggle &&
                content
            ) {

                content.hidden =
                    false;


                toggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                if (chevron) {

                    chevron.textContent =
                        "˄";

                }

            }

        }
    );


    setupAttendanceActions();

}

// ========================================
// ATTENDANCE SUBJECTS SECTION TOGGLE
// ========================================

const attendanceSubjectsToggle =
    document.getElementById(
        "attendanceSubjectsToggle"
    );

const attendanceSubjectsContent =
    document.getElementById(
        "attendanceSubjectsContent"
    );

const attendanceSubjectsChevron =
    document.getElementById(
        "attendanceSubjectsChevron"
    );


if(
    attendanceSubjectsToggle &&
    attendanceSubjectsContent
){

    attendanceSubjectsToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                !attendanceSubjectsContent.hidden;


            attendanceSubjectsContent.hidden =
                isOpen;


            attendanceSubjectsToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            if(attendanceSubjectsChevron){

                attendanceSubjectsChevron.textContent =
                    isOpen
                        ? "˅"
                        : "˄";

            }

        }
    );

}



// ========================================
// ATTENDANCE CALENDAR SECTION TOGGLE
// ========================================

const attendanceCalendarToggle =
    document.getElementById(
        "attendanceCalendarToggle"
    );

const attendanceCalendarContent =
    document.getElementById(
        "attendanceCalendarContent"
    );

const attendanceCalendarChevron =
    document.getElementById(
        "attendanceCalendarChevron"
    );


if(
    attendanceCalendarToggle &&
    attendanceCalendarContent
){

    attendanceCalendarToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                !attendanceCalendarContent.hidden;


            attendanceCalendarContent.hidden =
                isOpen;

            if(!isOpen){

                updateAttendanceCalendar();

            }


            attendanceCalendarToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            if(attendanceCalendarChevron){

                attendanceCalendarChevron.textContent =
                    isOpen
                        ? "˅"
                        : "˄";

            }

        }
    );

}

// ========================================
// ATTENDANCE CALENDAR
// ========================================

let attendanceCalendarDate = new Date();

let selectedCalendarSubject = "";

// ========================================
// UPDATE ATTENDANCE CALENDAR
// ========================================

function updateAttendanceCalendar() {

    const calendar =
        document.getElementById(
            "attendanceCalendar"
        );


    if (!calendar) {

        return;

    }


    calendar.innerHTML = "";


    const year =
        attendanceCalendarDate.getFullYear();


    const month =
        attendanceCalendarDate.getMonth();


    // ========================================
    // HEADER
    // ========================================

    const header =
        document.createElement("div");

    header.className =
        "attendance-calendar-header";


    const previousButton =
        document.createElement("button");

    previousButton.type =
        "button";

    previousButton.className =
        "attendance-calendar-nav";

    previousButton.textContent =
        "‹";


    const monthTitle =
        document.createElement("strong");

    monthTitle.textContent =
        attendanceCalendarDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    const nextButton =
        document.createElement("button");

    nextButton.type =
        "button";

    nextButton.className =
        "attendance-calendar-nav";

    nextButton.textContent =
        "›";


    header.appendChild(
        previousButton
    );

    header.appendChild(
        monthTitle
    );

    header.appendChild(
        nextButton
    );


    calendar.appendChild(
        header
    );


    // ========================================
    // WEEKDAYS
    // ========================================

    const weekdays =
        document.createElement("div");

    weekdays.className =
        "attendance-calendar-weekdays";


    [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ].forEach(
        day => {

            const weekday =
                document.createElement("div");

            weekday.textContent =
                day;

            weekdays.appendChild(
                weekday
            );

        }
    );


    calendar.appendChild(
        weekdays
    );


    // ========================================
    // DAYS
    // ========================================

    const grid =
        document.createElement("div");

    grid.className =
        "attendance-calendar-grid";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    const attendanceHistory =
    JSON.parse(
        localStorage.getItem(
            "attendanceDateHistory"
        )
    ) || [];

    // Empty cells before first day

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const emptyDay =
            document.createElement("div");

        emptyDay.className =
            "attendance-calendar-day empty";

        grid.appendChild(
            emptyDay
        );

    }


    // Calendar days

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayBox =
            document.createElement("div");

        dayBox.className =
            "attendance-calendar-day";


        dayBox.textContent =
            day;

        const dateString =
    year +
    "-" +
    String(month + 1)
        .padStart(2, "0") +
    "-" +
    String(day)
        .padStart(2, "0");


const dayRecords =
    attendanceHistory.filter(
        entry => {

            return (
                entry.date === dateString &&
                entry.subject === selectedCalendarSubject
            );

        }
    );


const hasAttended =
    dayRecords.some(
        entry =>
            entry.status === "attended"
    );


const hasMissed =
    dayRecords.some(
        entry =>
            entry.status === "missed"
    );


if(hasAttended){

    dayBox.classList.add(
        "attended"
    );

}
else if(hasMissed){

    dayBox.classList.add(
        "missed"
    );

}

        grid.appendChild(
            dayBox
        );

    }


    calendar.appendChild(
        grid
    );

    if(selectedCalendarSubject === ""){

    attendanceCalendar.innerHTML = `

        <div class="calendar-empty">

            📚 Please choose a subject
            to view attendance.

        </div>

    `;

    return;

}


    // ========================================
    // NAVIGATION
    // ========================================

    previousButton.addEventListener(
        "click",
        () => {

            attendanceCalendarDate.setMonth(
                attendanceCalendarDate.getMonth() - 1
            );


            updateAttendanceCalendar();

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            attendanceCalendarDate.setMonth(
                attendanceCalendarDate.getMonth() + 1
            );


            updateAttendanceCalendar();

        }
    );

}

// ========================================
// SAVE ATTENDANCE DATE
// ========================================

function saveAttendanceDate(
    subject,
    status
) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    let history =
        JSON.parse(
            localStorage.getItem(
                "attendanceDateHistory"
            )
        ) || [];


    const existingEntry =
        history.find(
            entry =>
                entry.date === today &&
                entry.subject === subject
        );


    if(existingEntry){

        existingEntry.status =
            status;

    }
    else{

        history.push({

            date: today,

            subject: subject,

            status: status

        });

    }


    localStorage.setItem(
        "attendanceDateHistory",
        JSON.stringify(
            history
        )
    );

}

function updateCalendarSubjectFilter(){

    const filter =
        document.getElementById(
            "calendarSubjectFilter"
        );


    if(!filter){

        return;

    }


    filter.innerHTML = `

        <option value="">
            Choose Subject
        </option>

    `;


    attendanceRecords.forEach(
        record => {

            filter.innerHTML += `

                <option value="${record.subject}">
                    ${record.subject}
                </option>

            `;

        }
    );

}

console.log(
    "Calendar subjects loaded",
    attendanceRecords
);

const calendarSubjectFilter =
    document.getElementById(
        "calendarSubjectFilter"
    );


if (calendarSubjectFilter) {

    calendarSubjectFilter.addEventListener(
        "change",
        () => {

            selectedCalendarSubject =
                calendarSubjectFilter.value;


            updateAttendanceCalendar();

        }
    );

}

// ========================================
// ATTENDANCE ACTIONS
// ========================================

function setupAttendanceActions() {

    // + ATTENDED
    const attendButtons =
        document.querySelectorAll(".attend-btn");

    attendButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            const record =
                attendanceRecords.find(
                    item => item.id === id
                );

            if (!record) {
                return;
            }

           record.conducted++;

record.attended++;

record.percentage =
    record.conducted > 0
        ? Number(
            (
                record.attended /
                record.conducted *
                100
            ).toFixed(1)
        )
        : 0;


           saveAttendanceDate(
           record.subject,
           "attended"
           );


          saveAttendanceRecords();

        });

    });


    // + MISSED
    const missButtons =
        document.querySelectorAll(".miss-btn");

    missButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            const record =
                attendanceRecords.find(
                    item => item.id === id
                );

            if (!record) {
                return;
            }

            record.conducted++;

record.percentage =
    record.conducted > 0
        ? Number(
            (
                record.attended /
                record.conducted *
                100
            ).toFixed(1)
        )
        : 0;


saveAttendanceDate(
    record.subject,
    "missed"
);


saveAttendanceRecords();

        });

    });


    // EDIT
    const editButtons =
        document.querySelectorAll(
            ".edit-attendance"
        );

    editButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            const record =
                attendanceRecords.find(
                    item => item.id === id
                );

            if (!record) {
                return;
            }

           attendanceSubject.value =
    record.subject;

document.getElementById(
    "attendancePlanned"
).value =
    record.planned;

document.getElementById(
    "attendanceConducted"
).value =
    record.conducted;

attendanceAttended.value =
    record.attended;

            document
                .querySelector(
                    ".attendance-form-card"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


    // DELETE
    const deleteButtons =
        document.querySelectorAll(
            ".delete-attendance"
        );

    deleteButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            const confirmed =
                confirm(
                    "Delete this attendance record?"
                );

            if (!confirmed) {
                return;
            }

            attendanceRecords =
                attendanceRecords.filter(
                    record => record.id !== id
                );

            saveAttendanceRecords();

        });

    });

// ========================================
// BUNK CALCULATOR BUTTON
// ========================================

const bunkButtons =
    document.querySelectorAll(
        ".bunk-calculator"
    );


bunkButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        button.dataset.id
                    );


                const record =
                    attendanceRecords.find(
                        item =>
                            item.id === id
                    );


                if (!record) {

                    return;

                }


                const planned =
                    Number(
                        record.planned
                    ) || 0;


                const conducted =
                    Number(
                        record.conducted
                    ) || 0;


                const attended =
                    Number(
                        record.attended
                    ) || 0;


                const remaining =
                    Math.max(
                        planned - conducted,
                        0
                    );


                const percentage =
                    conducted > 0
                        ? (
                            attended /
                            conducted
                        ) * 100
                        : 0;


                // BELOW 75%

                if (percentage < 75) {

                    let needed = 0;

                    let futureConducted =
                        conducted;

                    let futureAttended =
                        attended;


                    while (
                        (
                            futureAttended /
                            futureConducted
                        ) * 100 < 75
                    ) {

                        futureConducted++;

                        futureAttended++;

                        needed++;


                        if (needed > 1000) {

                            break;

                        }

                    }


                    showBunkModal({

                        subject:
                            record.subject,

                        percentage:
                            percentage,

                        type:
                            "need",

                        needed:
                            needed,

                        remaining:
                            remaining,

                        canReach75:
                            needed <= remaining

                    });


                    return;

                }


                // AT / ABOVE 75%

                let canMiss = 0;

                let futureConducted =
                    conducted;


                while (
                    canMiss < remaining &&
                    (
                        attended /
                        (
                            futureConducted + 1
                        )
                    ) * 100 >= 75
                ) {

                    canMiss++;

                    futureConducted++;

                }


                const afterBunk =
                    (
                        attended /
                        (
                            conducted +
                            canMiss
                        )
                    ) * 100;


                showBunkModal({

                    subject:
                        record.subject,

                    percentage:
                        percentage,

                    type:
                        "canMiss",

                    canMiss:
                        canMiss,

                    afterBunk:
                        afterBunk,

                    remaining:
                        remaining

                });

            }
        );

    }
);

}


// ========================================
// BUNK CALCULATOR MODAL
// ========================================

const bunkModal =
    document.getElementById(
        "bunkModal"
    );


const closeBunkModal =
    document.getElementById(
        "closeBunkModal"
    );


const bunkModalCloseButton =
    document.getElementById(
        "bunkModalCloseButton"
    );


const bunkModalTitle =
    document.getElementById(
        "bunkModalTitle"
    );


const bunkModalSubtitle =
    document.getElementById(
        "bunkModalSubtitle"
    );


const bunkModalResult =
    document.getElementById(
        "bunkModalResult"
    );


// ========================================
// Show Modal
// ========================================

function showBunkModal(data) {

    if (!bunkModal) {

        return;

    }


    bunkModalTitle.textContent =
        data.subject;


    bunkModalSubtitle.textContent =
        "Attendance Bunk Calculator";


    let resultHTML = "";


    // Current attendance

    resultHTML += `

        <div class="bunk-current">

            <div class="bunk-current-label">

                Current Attendance

            </div>

            <div class="bunk-current-number">

                ${data.percentage.toFixed(1)}%

            </div>

        </div>

    `;


    // Below 75%

if (data.type === "need") {

    if (data.canReach75) {

        resultHTML += `

            <div
                class="
                    bunk-result-box
                    bunk-result-danger
                ">

                ⚠️ Your attendance is below
                the 75% target.

                <br><br>

                You need to attend

                <span class="bunk-highlight">

                    ${data.needed}

                </span>

                more class(es) consecutively
                to reach 75%.

            </div>

        `;

    }

    else {

        resultHTML += `

            <div
                class="
                    bunk-result-box
                    bunk-result-danger
                ">

                ⚠️ Your attendance is below
                the 75% target.

                <br><br>

                You need to attend

                <span class="bunk-highlight">

                    ${data.needed}

                </span>

                more classes to reach 75%.

                <br><br>

                But only

                <span class="bunk-highlight">

                    ${data.remaining}

                </span>

                planned class(es) remain.

                <br><br>

                You cannot reach 75%
                within the remaining planned classes.

            </div>

        `;

    }

}


    // Above 75%

    else {

        resultHTML += `

            <div
                class="
                    bunk-result-box
                    bunk-result-safe
                ">

                ✅ You can safely miss

                <span class="bunk-highlight">

                    ${data.canMiss}

                </span>

                more class(es).

                <br><br>

                Your attendance would become

                <strong>

                    ${data.afterBunk.toFixed(1)}%

                </strong>

                after those classes.

            </div>

        `;

    }


    bunkModalResult.innerHTML =
        resultHTML;


    bunkModal.classList.add(
        "show"
    );

}


// ========================================
// Close Modal
// ========================================

function hideBunkModal() {

    if (!bunkModal) {

        return;

    }


    bunkModal.classList.remove(
        "show"
    );

}


if (closeBunkModal) {

    closeBunkModal.addEventListener(
        "click",
        hideBunkModal
    );

}


if (bunkModalCloseButton) {

    bunkModalCloseButton.addEventListener(
        "click",
        hideBunkModal
    );

}


// Close by clicking background

if (bunkModal) {

    bunkModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === bunkModal
            ) {

                hideBunkModal();

            }

        }
    );

}


// Close with Escape

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            hideBunkModal();

        }

    }
);

// ========================================
// Overall Attendance
// ========================================

function updateOverallAttendance() {

    if (!overallAttendance) {

        return;

    }


    if (
        attendanceRecords.length === 0
    ) {

        overallAttendance.innerHTML = "";

        return;

    }


    let totalConducted = 0;

    let totalAttended = 0;


    attendanceRecords.forEach(
        record => {

            totalConducted +=
                Number(
                    record.conducted
                ) || 0;


            totalAttended +=
                Number(
                    record.attended
                ) || 0;

        }
    );


    const overall =
        totalConducted > 0
            ? (
                totalAttended /
                totalConducted
            ) * 100
            : 0;


    overallAttendance.innerHTML = `

        <div class="overall-card">

            <h2>
                Overall Attendance
            </h2>

            <div class="overall-number">

                ${overall.toFixed(1)}%

            </div>

            <div class="overall-label">

                ${totalAttended}
                /
                ${totalConducted}
                classes conducted

            </div>

        </div>

    `;

}

// ========================================
// Save Attendance Records
// ========================================

function saveAttendanceRecords() {

    localStorage.setItem(

        "attendanceRecords",

        JSON.stringify(
            attendanceRecords
        )

    );


    // Refresh attendance cards

    displayAttendanceRecords();


    // Refresh overall percentage

    updateOverallAttendance();


    // Refresh dashboard percentage

    updateDashboardAttendance();

    // Refresh attendance calendar

    updateAttendanceCalendar();


}


// ========================================
// Update Dashboard Attendance
// ========================================

function updateDashboardAttendance() {

    const statCards =
        document.querySelectorAll(
            ".stat-card"
        );


    if (
        statCards.length === 0 ||
        attendanceRecords.length === 0
    ) {

        return;

    }


    let totalClasses = 0;

    let totalAttended = 0;


    attendanceRecords.forEach(
        record => {

            totalClasses +=
                record.total;

            totalAttended +=
                record.attended;

        }
    );


    const percentage =
        (
            totalAttended /
            totalClasses
        ) * 100;


    const attendanceNumber =
        statCards[0]
            .querySelector("h3");


    if (attendanceNumber) {

        attendanceNumber.textContent =
            percentage.toFixed(1) + "%";

    }

}

// ========================================
// SUBJECT MANAGER
// ========================================


// Get elements

const subjectTitle =
    document.getElementById("subjectTitle");

const teacherName =
    document.getElementById("teacherName");

const roomNumber =
    document.getElementById("roomNumber");

const creditHours =
    document.getElementById("creditHours");

const addSubjectBtn =
    document.getElementById("addSubjectBtn");

const subjectsList =
    document.getElementById("subjectsList");


// Load saved subjects

let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];


// ========================================
// Add Subject
// ========================================

addSubjectBtn.addEventListener(
    "click",
    addSubject
);


function addSubject() {

    const name =
        subjectTitle.value.trim();

    const teacher =
        teacherName.value.trim();

    const room =
        roomNumber.value.trim();

    const credits =
        Number(creditHours.value);


    // Validation

    if (!name) {

        alert(
            "Please enter the subject name."
        );

        return;

    }


    if (!teacher) {

        alert(
            "Please enter the teacher name."
        );

        return;

    }


    if (!room) {

        alert(
            "Please enter the room number."
        );

        return;

    }


    if (!credits || credits < 1) {

        alert(
            "Please enter valid credit hours."
        );

        return;

    }


    // Create subject

    const subject = {

        id: Date.now(),

        name: name,

        teacher: teacher,

        room: room,

        credits: credits

    };


    // Add subject to array

    subjects.push(subject);


    // Save subjects

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    // Display subjects

    displaySubjects();


      // Update assignment dropdown

        updateAssignmentSubjects();


      // Update attendance dropdown

        updateAttendanceSubjects();

      // Update timetable dropdown

        updateTimetableSubjects();

      // update PdfSubject dropdownL

        updatePdfSubjectList();

       // Update Exams subject dropdown
        updateExamSubjects();


    // Clear form

    subjectTitle.value = "";

    teacherName.value = "";

    roomNumber.value = "";

    creditHours.value = "";

}


// ========================================
// Display Subjects
// ========================================

function displaySubjects() {

    subjectsList.innerHTML = "";


    if (subjects.length === 0) {

        subjectsList.innerHTML = `

            <div class="no-subjects">

                <div class="no-subjects-icon">
                    📚
                </div>

                <h3>
                    No subjects added yet
                </h3>

                <p>
                    Add your first subject above.
                </p>

            </div>

        `;

        return;

    }


    subjects.forEach((subject) => {

        const card =
            document.createElement("div");


        card.className =
            "subject-card";


        card.innerHTML = `

            <div class="subject-card-header">

                <div class="subject-icon">
                    📘
                </div>

                <button
                    class="delete-subject"
                    data-id="${subject.id}"
                    title="Delete subject">

                    ✕

                </button>

            </div>


            <h3>
                ${subject.name}
            </h3>


            <div class="subject-detail">

                👨‍🏫

                <span>
                    ${subject.teacher}
                </span>

            </div>


            <div class="subject-detail">

                📍

                <span>
                    Room ${subject.room}
                </span>

            </div>


            <span class="subject-credit">

                ⭐ ${subject.credits} Credits

            </span>

        `;


        subjectsList.appendChild(card);

    });


    // Delete buttons

    const deleteButtons =
        document.querySelectorAll(
            ".delete-subject"
        );


    deleteButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(button.dataset.id);


                subjects =
                    subjects.filter(
                        (subject) =>
                            subject.id !== id
                    );


                localStorage.setItem(
    "subjects",
    JSON.stringify(subjects)
);

displaySubjects();


// Update assignment dropdown

updateAssignmentSubjects();


// Update attendance dropdown

updateAttendanceSubjects();

// Update Exams dropdown
updateExamSubjects();


// Update pdf subject dropdown

updatePdfSubjectList();

            }
        );

    });

}


// ========================================
// Load Subjects
// ========================================

displaySubjects();


// ========================================
// Initialize Attendance
// ========================================

updateAttendanceSubjects();

displayAttendanceRecords();

updateOverallAttendance();

updateDashboardAttendance();

updateDashboardAttendancePercentage();


// ========================================
// ASSIGNMENT MANAGER
// ========================================


// Elements

const assignmentTitle =
    document.getElementById(
        "assignmentTitle"
    );

const assignmentSubject =
    document.getElementById(
        "assignmentSubject"
    );

const assignmentDate =
    document.getElementById(
        "assignmentDate"
    );

const assignmentPriority =
    document.getElementById(
        "assignmentPriority"
    );

const addAssignmentBtn =
    document.getElementById(
        "addAssignmentBtn"
    );

const assignmentSubmitText =
    addAssignmentBtn;

const assignmentsList =
    document.getElementById(
        "assignmentsList"
    );


// Load assignments

let assignments =
    JSON.parse(
        localStorage.getItem(
            "assignments"
        )
    ) || [];

    let editingAssignmentId = null;


// Current filter

let currentAssignmentFilter = "all";


// ========================================
// Populate Subject Dropdown
// ========================================

function updateAssignmentSubjects() {

    if (!assignmentSubject) {
        return;
    }


    assignmentSubject.innerHTML = `

        <option value="">
            Select Subject
        </option>

    `;


    subjects.forEach((subject) => {

        const option =
            document.createElement("option");

        option.value = subject.name;

        option.textContent =
            subject.name;

        assignmentSubject.appendChild(
            option
        );

    });

}


// ========================================
// Add Assignment
// ========================================

if (addAssignmentBtn) {

    addAssignmentBtn.addEventListener(
        "click",
        addAssignment
    );

}


function addAssignment() {

    const title =
        assignmentTitle.value.trim();

    const subject =
        assignmentSubject.value;

    const dueDate =
        assignmentDate.value;

    const priority =
        assignmentPriority.value;


    // Validation

    if (!title) {

        alert(
            "Please enter the assignment name."
        );

        return;

    }


    if (!subject) {

        alert(
            "Please select a subject."
        );

        return;

    }


    if (!dueDate) {

        alert(
            "Please select a due date."
        );

        return;

    }

   if(editingAssignmentId){

    console.log("Editing ID:", editingAssignmentId);

    console.log("Assignments:", assignments);


    const assignment =
        assignments.find(
        item =>
        item.id === editingAssignmentId
    );


    if(!assignment){

        console.log("Assignment not found");

        editingAssignmentId = null;

        return;

    }

    assignment.title = title;
    assignment.subject = subject;
    assignment.dueDate = dueDate;
    assignment.priority = priority;


    editingAssignmentId = null;

    addAssignmentBtn.textContent =
    "Add Assignment";

    saveAssignments();

    displayAssignments();

    displayDashboardTasks();

    updatePendingTaskCount();


// Clear form after update

    assignmentTitle.value = "";

    assignmentSubject.value = "";

    assignmentDate.value = "";

    assignmentPriority.value = "medium";


    return;

}


    // Create assignment

    const assignment = {

        id: Date.now(),

        title: title,

        subject: subject,

        dueDate: dueDate,

        priority: priority,

        completed: false

    };


    assignments.push(
        assignment
    );


      saveAssignments();

      displayAssignments();

      displayDashboardTasks();





    // Clear form

    assignmentTitle.value = "";

    assignmentSubject.value = "";

    assignmentDate.value = "";

    assignmentPriority.value = "medium";

}


// ========================================
// Save Assignments
// ========================================

function saveAssignments() {

    localStorage.setItem(

        "assignments",

        JSON.stringify(
            assignments
        )

    );

}

// ========================================
// DASHBOARD: ASSIGNMENTS + TO-DO TASKS
// ========================================

function displayDashboardTasks() {

    const container = document.getElementById(
        "dashboardUpcomingTasks"
    );

    if (!container) return;

    function escapeDashboardText(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function readableDate(dateString) {
        if (!dateString) return "No due date";

        const parts = String(dateString).split("-");

        if (parts.length === 3) {
            const date = new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );

            if (!Number.isNaN(date.getTime())) {
                return date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
            }
        }

        return String(dateString);
    }

    // Get pending assignments.
    const pendingAssignments = (
        Array.isArray(assignments) ? assignments : []
    )
        .filter(item => !item.completed)
        .map(item => ({
            id: String(item.id),
            type: "assignment",
            title: item.title || "Untitled assignment",
            detail: "📚 " + (item.subject || "Assignment"),
            dueDate: item.dueDate || "",
            priority: item.priority || "medium",
            createdAt: 0
        }));

    // Get pending To-Do tasks from their existing storage.
    let pendingTodos = [];

    try {
        const savedTodos = JSON.parse(
            localStorage.getItem("studentHubTodoTasks") || "[]"
        );

        if (Array.isArray(savedTodos)) {
            pendingTodos = savedTodos
                .filter(task => task && !task.completed)
                .map(task => ({
                    id: String(task.id),
                    type: "todo",
                    title: task.title || "Untitled task",
                    detail: "✅ To-Do List",
                    dueDate: task.dueDate || "",
                    priority: task.priority || "normal",
                    createdAt: Number(task.createdAt) || 0
                }));
        }
    } catch (error) {
        console.error("Could not load To-Do tasks:", error);
    }

    // Combine both kinds of tasks.
    const upcomingItems = [
        ...pendingAssignments,
        ...pendingTodos
    ];

    // Tasks with an earlier due date appear first.
    upcomingItems.sort(function (a, b) {
        if (a.dueDate && b.dueDate) {
            return a.dueDate.localeCompare(b.dueDate);
        }

        if (a.dueDate) return -1;
        if (b.dueDate) return 1;

        return a.createdAt - b.createdAt;
    });

    // Show the next four pending tasks.
    const visibleItems = upcomingItems.slice(0, 4);

    if (visibleItems.length === 0) {
        container.innerHTML = `
            <div class="no-tasks">
                <h3>You're all caught up! 🎉</h3>
                <p>Add an assignment or a To-Do task to see it here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = visibleItems.map(function (item) {

        const safeId = escapeDashboardText(item.id);
        const safeTitle = escapeDashboardText(item.title);
        const safeDetail = escapeDashboardText(item.detail);
        const safeDate = escapeDashboardText(
            readableDate(item.dueDate)
        );

        let priority = String(item.priority).toLowerCase();

        // The existing dashboard CSS uses "medium", not "normal".
        if (!["high", "medium", "low"].includes(priority)) {
            priority = "medium";
        }

        const priorityLabel = priority.toUpperCase();

        return `
            <div class="task">

                <input
                    type="checkbox"
                    class="dashboard-upcoming-checkbox"
                    data-task-type="${item.type}"
                    data-id="${safeId}"
                    aria-label="Complete ${safeTitle}"
                >

                <div>
                    <h3>${safeTitle}</h3>
                    <p>${safeDetail}</p>
                    <p>📅 Due ${safeDate}</p>
                </div>

                <span class="priority ${priority}">
                    ${priorityLabel}
                </span>

            </div>
        `;

    }).join("");

    setupDashboardTaskCheckboxes();
}


// ========================================
// DASHBOARD TASK CHECKBOXES
// ========================================

function setupDashboardTaskCheckboxes() {

    document.querySelectorAll(
        ".dashboard-upcoming-checkbox"
    ).forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            const id = checkbox.dataset.id;
            const type = checkbox.dataset.taskType;
            const completed = checkbox.checked;

            // Complete a To-Do task.
            if (type === "todo") {

                try {
                    const savedTodos = JSON.parse(
                        localStorage.getItem("studentHubTodoTasks") || "[]"
                    );

                    if (!Array.isArray(savedTodos)) {
                        displayDashboardTasks();
                        return;
                    }

                    const todo = savedTodos.find(
                        task => String(task.id) === id
                    );

                    if (!todo) {
                        displayDashboardTasks();
                        return;
                    }

                    const previousValue = todo.completed;
                    todo.completed = completed;

                    try {
                        localStorage.setItem(
                            "studentHubTodoTasks",
                            JSON.stringify(savedTodos)
                        );
                    } catch (error) {
                        todo.completed = previousValue;
                        displayDashboardTasks();
                        alert("Could not save the task. Please try again.");
                        return;
                    }

                    // Tell the To-Do section to reload its saved tasks.
                    window.dispatchEvent(
                        new Event("studentHubTodoChangedFromDashboard")
                    );

                    displayDashboardTasks();
                    updatePendingTaskCount();

                } catch (error) {
                    displayDashboardTasks();
                    alert("Could not update the To-Do task.");
                }

                return;
            }

            // Complete an assignment.
            const assignment = assignments.find(
                item => String(item.id) === id
            );

            if (!assignment) {
                displayDashboardTasks();
                return;
            }

            assignment.completed = completed;

            saveAssignments();
            displayDashboardTasks();
            displayAssignments();
            updatePendingTaskCount();

        });

    });

}


// Refresh Dashboard when a To-Do task is added,
// completed, or deleted from the To-Do section.
window.addEventListener(
    "studentHubTodoUpdated",
    function () {
        displayDashboardTasks();
        updatePendingTaskCount();
    }
);

// ========================================
// Date Helpers
// ========================================

function getTodayDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ========================================
// Check Assignment Status
// ========================================

function isOverdue(assignment) {

    if (assignment.completed) {

        return false;

    }

    return assignment.dueDate <
        getTodayDate();

}


function isToday(assignment) {

    return assignment.dueDate ===
        getTodayDate();

}


// ========================================
// Display Assignments
// ========================================

function displayAssignments() {

    if (!assignmentsList) {
        return;
    }


    assignmentsList.innerHTML = "";


    let filteredAssignments =
        [...assignments];


    // Filter

    if (
        currentAssignmentFilter ===
        "pending"
    ) {

        filteredAssignments =
            filteredAssignments.filter(
                assignment =>
                    !assignment.completed
            );

    }


    if (
        currentAssignmentFilter ===
        "completed"
    ) {

        filteredAssignments =
            filteredAssignments.filter(
                assignment =>
                    assignment.completed
            );

    }


    if (
        currentAssignmentFilter ===
        "overdue"
    ) {

        filteredAssignments =
            filteredAssignments.filter(
                assignment =>
                    isOverdue(
                        assignment
                    )
            );

    }


    // Empty state

    if (
        filteredAssignments.length === 0
    ) {

        assignmentsList.innerHTML = `

            <div class="no-assignments">

                <div class="no-assignments-icon">
                    📝
                </div>

                <h3>
                    No assignments here
                </h3>

                <p>
                    Add an assignment above
                    to get started.
                </p>

            </div>

        `;

        return;

    }


    // Create cards

    filteredAssignments.forEach(
        (assignment) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            if (
                assignment.completed
            ) {

                card.classList.add(
                    "completed"
                );

            }


            // Date status

            let dateClass = "";

            let dateText =
                `📅 Due ${formatDate(
                    assignment.dueDate
                )}`;


            if (
                isOverdue(assignment)
            ) {

                dateClass = "overdue";

                dateText =
                    `⚠️ Overdue • ${formatDate(
                        assignment.dueDate
                    )}`;

            }

            else if (
                isToday(assignment)
            ) {

                dateClass = "today";

                dateText =
                    `🔥 Due Today`;

            }


            // Priority label

            let priorityText =
                "🟡 Medium";


            if (
                assignment.priority ===
                "high"
            ) {

                priorityText =
                    "🔴 High";

            }

            else if (
                assignment.priority ===
                "low"
            ) {

                priorityText =
                    "🟢 Low";

            }


            card.innerHTML = `

                <div class="assignment-top">

                    <div>

                        <div class="assignment-title">

                            ${assignment.title}

                        </div>

                        <div class="assignment-subject">

                            📚 ${assignment.subject}

                        </div>

                    </div>


                    <span
                        class="assignment-priority
                        ${assignment.priority}">

                        ${priorityText}

                    </span>

                </div>


                <div
                    class="assignment-date
                    ${dateClass}">

                    ${dateText}

                </div>


                <div class="assignment-actions">


                     <button
                         class="assignment-action
                         edit-assignment"
                         data-id="${assignment.id}">

                           ✏️ Edit

                     </button>



                     <button
                          class="assignment-action
                          delete-assignment"
                          data-id="${assignment.id}">

                            🗑 Delete

                     </button>



                     <button
                          class="assignment-action
                          complete-assignment"
                          data-id="${assignment.id}">

                         ${
                             assignment.completed
                             ? "↩ Mark Pending"
                             : "✓ Complete"
                         }

                      </button>


                </div>

            `;


            assignmentsList.appendChild(
                card
            );

        }
    );


    setupAssignmentActions();

}


// ========================================
// Assignment Actions
// ========================================

function setupAssignmentActions() {


    const completeButtons =
        document.querySelectorAll(
            ".complete-assignment"
        );


    completeButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const assignment =
                        assignments.find(
                            item =>
                                item.id === id
                        );


                    if (assignment) {

                        assignment.completed =
                            !assignment.completed;

                    }


                    saveAssignments();

                    displayAssignments();

                    displayDashboardTasks();

                    updatePendingTaskCount();

                }
            );

        }
    );


// ========================================
// EDIT ASSIGNMENT
// ========================================


const editButtons =
    document.querySelectorAll(
        ".edit-assignment"
    );


editButtons.forEach(
    (button) => {


        button.addEventListener(
            "click",
            () => {


                const id =
                    Number(
                        button.dataset.id
                    );


                const assignment =
                    assignments.find(
                        item =>
                            item.id === id
                    );




                if(!assignment){
                    return;
                }

                editingAssignmentId = id;

                addAssignmentBtn.textContent =
                "Update Assignment";

                assignmentTitle.value =
                    assignment.title;


                assignmentSubject.value =
                    assignment.subject;


                assignmentDate.value =
                    assignment.dueDate;


                assignmentPriority.value =
                    assignment.priority;


                document
                .querySelector(
                    ".assignment-form-card"
                )
                ?.scrollIntoView({
                    behavior:"smooth"
                });


            }
        );


    }
);

// ========================================
// DELETE ASSIGNMENT
// ========================================


    const deleteButtons =
        document.querySelectorAll(
            ".delete-assignment"
        );


    deleteButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    assignments =
                        assignments.filter(
                            assignment =>
                                assignment.id !== id
                        );


                    saveAssignments();

                    displayAssignments();

                    displayDashboardTasks();

                    updatePendingTaskCount();



                }
            );

        }
    );

}


// ========================================
// Assignment Filters
// ========================================

const assignmentFilters =
    document.querySelectorAll(
        ".assignment-filter"
    );


assignmentFilters.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                assignmentFilters
                    .forEach(
                        filter => {

                            filter.classList
                                .remove(
                                    "active"
                                );

                        }
                    );


                button.classList.add(
                    "active"
                );


                currentAssignmentFilter =
                    button.dataset.filter;


                displayAssignments();

            }
        );

    }
);


// ========================================
// Update Pending Tasks Number
// ========================================

function updatePendingTaskCount() {

    // Count unfinished assignments.
    let pending = (
        Array.isArray(assignments) ? assignments : []
    ).filter(function (assignment) {
        return !assignment.completed;
    }).length;

    // Count unfinished To-Do tasks.
    try {
        const todos = JSON.parse(
            localStorage.getItem("studentHubTodoTasks") || "[]"
        );

        if (Array.isArray(todos)) {
            pending += todos.filter(function (task) {
                return task && !task.completed;
            }).length;
        }

    } catch (error) {
        console.error("Could not count To-Do tasks:", error);
    }

    const countElement = document.getElementById(
        "pendingTasksCount"
    );

    if (countElement) {
        countElement.textContent = pending;
    }
}

// ========================================
// Initialize Assignment Manager
// ========================================

updateAssignmentSubjects();

displayAssignments();

displayDashboardTasks();

updatePendingTaskCount();

// ========================================
// TIMETABLE MANAGER
// ========================================


// Elements

const timetableSubject =
    document.getElementById(
        "timetableSubject"
    );

const timetableDay =
    document.getElementById(
        "timetableDay"
    );

const timetableStart =
    document.getElementById(
        "timetableStart"
    );

const timetableEnd =
    document.getElementById(
        "timetableEnd"
    );

const timetableRoom =
    document.getElementById(
        "timetableRoom"
    );

const addTimetableBtn =
    document.getElementById(
        "addTimetableBtn"
    );

const timetableGrid =
    document.getElementById(
        "timetableGrid"
    );


// Load timetable

let timetable =
    JSON.parse(
        localStorage.getItem(
            "timetable"
        )
    ) || [];


// ========================================
// Populate Subject Dropdown
// ========================================

function updateTimetableSubjects() {

    if (!timetableSubject) {

        return;

    }


    timetableSubject.innerHTML = "";


    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Subject";

    timetableSubject.appendChild(
        defaultOption
    );


    if (subjects.length === 0) {

        const emptyOption =
            document.createElement(
                "option"
            );

        emptyOption.textContent =
            "Add a subject first";

        emptyOption.disabled = true;

        timetableSubject.appendChild(
            emptyOption
        );

        return;

    }


    subjects.forEach(
        (subject) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                subject.name;

            option.textContent =
                subject.name;

            timetableSubject.appendChild(
                option
            );

        }
    );

}


// ========================================
// Add Class
// ========================================

if (addTimetableBtn) {

    addTimetableBtn.addEventListener(
        "click",
        addTimetableClass
    );

}


function addTimetableClass() {

    const subject =
        timetableSubject.value;

    const day =
        timetableDay.value;

    const start =
        timetableStart.value;

    const end =
        timetableEnd.value;

    const room =
        timetableRoom.value.trim();


    // Validation

    if (!subject) {

        alert(
            "Please select a subject."
        );

        return;

    }


    if (!day) {

        alert(
            "Please select a day."
        );

        return;

    }


    if (!start || !end) {

        alert(
            "Please select start and end time."
        );

        return;

    }


    if (start >= end) {

        alert(
            "End time must be after start time."
        );

        return;

    }


    if (!room) {

        alert(
            "Please enter the room."
        );

        return;

    }


    // Find subject information

    const selectedSubject =
        subjects.find(
            item =>
                item.name === subject
        );


    // Create timetable entry

    const classItem = {

        id: Date.now(),

        subject: subject,

        teacher:
            selectedSubject
                ? selectedSubject.teacher
                : "",

        day: day,

        start: start,

        end: end,

        room: room

    };


    timetable.push(
        classItem
    );


    // Save

    saveTimetable();


    // Clear form

    timetableSubject.value = "";

    timetableDay.value = "Monday";

    timetableStart.value = "";

    timetableEnd.value = "";

    timetableRoom.value = "";

}


// ========================================
// Save Timetable
// ========================================

function saveTimetable() {

    localStorage.setItem(

        "timetable",

        JSON.stringify(
            timetable
        )

    );


    displayTimetable();

    displayTodaysClasses();

}


// ========================================
// Format Time
// ========================================

function formatTimetableTime(
    time
) {

    const [hours, minutes] =
        time.split(":");


    const date =
        new Date();


    date.setHours(
        Number(hours)
    );

    date.setMinutes(
        Number(minutes)
    );


    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


// ========================================
// Display Timetable
// ========================================

function displayTimetable() {

    if (!timetableGrid) {

        return;

    }


    timetableGrid.innerHTML = "";


    const days = [

        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"

    ];


    // Get today's day

    const today =
        new Date()
            .toLocaleDateString(
                "en-US",
                {
                    weekday: "long"
                }
            );


    days.forEach(
        (day) => {

            const dayColumn =
                document.createElement(
                    "div"
                );


            dayColumn.className =
                "timetable-day";


            // Highlight today

            if (day === today) {

                dayColumn.classList.add(
                    "today"
                );

            }


            dayColumn.innerHTML = `

                <div
                    class="timetable-day-header">

                    ${day}

                </div>

            `;


            // Get classes for this day

            const dayClasses =
                timetable
                    .filter(
                        item =>
                            item.day === day
                    )
                    .sort(
                        (a, b) =>
                            a.start.localeCompare(
                                b.start
                            )
                    );


            if (
                dayClasses.length === 0
            ) {

                dayColumn.innerHTML += `

                    <div
                        class="timetable-empty">

                        No classes

                    </div>

                `;

            }


            dayClasses.forEach(
                (classItem) => {

                    const classCard =
                        document.createElement(
                            "div"
                        );


                    classCard.className =
                        "timetable-class";


                    classCard.innerHTML = `

                        <div
                            class="
                                timetable-class-time">

                            🕐
                            ${formatTimetableTime(
                                classItem.start
                            )}
                            -
                            ${formatTimetableTime(
                                classItem.end
                            )}

                        </div>


                        <div
                            class="
                                timetable-class-subject">

                            📘
                            ${classItem.subject}

                        </div>


                        <div
                            class="
                                timetable-class-teacher">

                            👨‍🏫
                            ${classItem.teacher}

                        </div>


                        <div
                            class="
                                timetable-class-room">

                            🚪
                            Room ${classItem.room}

                        </div>


                        <div
                            class="timetable-actions">

                            <button
                                class="
                                    timetable-action
                                    edit-timetable"
                                data-id="${classItem.id}">

                                ✏️ Edit

                            </button>


                            <button
                                class="
                                    timetable-action
                                    delete-timetable"
                                data-id="${classItem.id}">

                                🗑 Delete

                            </button>

                        </div>

                    `;


                    dayColumn.appendChild(
                        classCard
                    );

                }
            );


            timetableGrid.appendChild(
                dayColumn
            );

        }
    );


    setupTimetableActions();

}


// ========================================
// Timetable Actions
// ========================================

function setupTimetableActions() {


    // Delete

    const deleteButtons =
        document.querySelectorAll(
            ".delete-timetable"
        );


    deleteButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const confirmed =
                        confirm(
                            "Delete this class?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    timetable =
                        timetable.filter(
                            item =>
                                item.id !== id
                        );


                    saveTimetable();

                }
            );

        }
    );


    // Edit

    const editButtons =
        document.querySelectorAll(
            ".edit-timetable"
        );


    editButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const classItem =
                        timetable.find(
                            item =>
                                item.id === id
                        );


                    if (!classItem) {

                        return;

                    }


                    // Fill form

                    timetableSubject.value =
                        classItem.subject;

                    timetableDay.value =
                        classItem.day;

                    timetableStart.value =
                        classItem.start;

                    timetableEnd.value =
                        classItem.end;

                    timetableRoom.value =
                        classItem.room;


                    // Remove old entry

                    timetable =
                        timetable.filter(
                            item =>
                                item.id !== id
                        );


                    localStorage.setItem(

                        "timetable",

                        JSON.stringify(
                            timetable
                        )

                    );


                    // Scroll to form

                    const form =
                        document.querySelector(
                            ".timetable-form-card"
                        );


                    if (form) {

                        form.scrollIntoView({
                            behavior: "smooth"
                        });

                    }


                    displayTimetable();

                }
            );

        }
    );

}


// ========================================
// Initialize Timetable
// ========================================

updateTimetableSubjects();

displayTimetable();


displayTodaysClasses();


/// ========================================
// STUDY TIMER
// ========================================

let timerInterval = null;


const FOCUS_TIME = 30 * 60; // 30 min

const BREAK_TIME = 5 * 60; // 5 min


let timerSecondsRemaining =
    FOCUS_TIME;


let totalTimerSeconds =
    FOCUS_TIME;


let timerMode = "focus";


let sessionsCompleted =
    Number(
        localStorage.getItem(
            "studySessionsCompleted"
        )
    ) || 0;

let todaySessionsCompleted =
    Number(
        localStorage.getItem(
            "todaySessionsCompleted"
        )
    ) || 0;


let lastSessionDate =
    localStorage.getItem(
        "lastSessionDate"
    );

let lastStudyDate =
    localStorage.getItem(
        "lastStudyDate"
    );


let todayStudyMinutes =
    Number(
        localStorage.getItem(
            "todayStudyMinutes"
        )
    ) || 0;

let studyDate =
    localStorage.getItem(
        "studyDate"
    );

const currentDate =
    new Date()
        .toISOString()
        .split("T")[0];

if(studyDate !== currentDate){

    todayStudyMinutes = 0;

    studyDate = currentDate;


    localStorage.setItem(
        "todayStudyMinutes",
        todayStudyMinutes
    );


    localStorage.setItem(
        "studyDate",
        studyDate
    );

}


// ========================================
// TIMER ELEMENTS
// ========================================

const timerMinutes =
    document.getElementById(
        "timerMinutes"
    );

const timerSeconds =
    document.getElementById(
        "timerSeconds"
    );

const timerStatus =
    document.getElementById(
        "timerStatus"
    );

const startTimerBtn =
    document.getElementById(
        "startTimerBtn"
    );

const pauseTimerBtn =
    document.getElementById(
        "pauseTimerBtn"
    );

const resetTimerBtn =
    document.getElementById(
        "resetTimerBtn"
    );

const focusModeBtn =
    document.getElementById(
        "focusModeBtn"
    );

const breakModeBtn =
    document.getElementById(
        "breakModeBtn"
    );

const sessionCount =
    document.getElementById(
        "sessionCount"
    );

const studyTimerCard =
    document.getElementById(
        "studyTimerCard"
    );

// ========================================
// DAILY STUDY GOAL
// ========================================


let dailyStudyGoalMinutes =
    Number(
        localStorage.getItem(
            "dailyStudyGoalMinutes"
        )
    ) || 0;



const dailyGoalHours =
    document.getElementById(
        "dailyGoalHours"
    );


const dailyGoalMinutes =
    document.getElementById(
        "dailyGoalMinutes"
    );


const saveDailyGoalBtn =
    document.getElementById(
        "saveDailyGoalBtn"
    );



if(saveDailyGoalBtn){

    saveDailyGoalBtn.addEventListener(
        "click",
        () => {


            const hours =
                Number(
                    dailyGoalHours.value
                ) || 0;


            const minutes =
                Number(
                    dailyGoalMinutes.value
                ) || 0;



            if(
                hours === 0 &&
                minutes === 0
            ){

                alert(
                    "Please enter a study goal."
                );

                return;

            }



            if(minutes < 0 || minutes > 59){

                alert(
                    "Minutes must be between 0 and 59."
                );

                return;

            }



           dailyStudyGoalMinutes =
    (hours * 60) + minutes;


localStorage.setItem(
    "dailyStudyGoalMinutes",
    dailyStudyGoalMinutes
);


// Update progress immediately

updateDashboardStudyProgress();


displayDailyGoal();

            alert(
                "Daily goal saved!"
            );


        }
    );

}

// ========================================
// CALCULATE TODAY STUDY PROGRESS
// ========================================

function getTodayStudyProgress(){


    if(dailyStudyGoalMinutes <= 0){

        return 0;

    }


    let progress =
        (
            todayStudyMinutes /
            dailyStudyGoalMinutes
        ) * 100;



    if(progress > 100){

        progress = 100;

    }


    return Math.round(progress);


}

// ========================================
// SAVE STUDY HISTORY
// ========================================

function saveStudyHistory(minutes){

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    let studyHistory =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];


    let todayEntry =
        studyHistory.find(
            entry =>
                entry.date === today
        );


    if(todayEntry){

        todayEntry.minutes += minutes;

        todayEntry.sessions += 1;

    }
    else{

        studyHistory.push({

            date: today,

            minutes: minutes,

            sessions: 1

        });

    }


    localStorage.setItem(
        "studyHistory",
        JSON.stringify(
            studyHistory
        )
    );

}

// ========================================
// UPDATE STUDY HISTORY HEADER
// ========================================

function updateStudyHistorySummary(){

    const summary =
        document.getElementById(
            "studyHistorySummary"
        );


    if(!summary){

        return;

    }


    const studyHistory =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const todayEntry =
        studyHistory.find(
            entry =>
                entry.date === today
        );


    const todaySessions =
        todayEntry
            ? Number(todayEntry.sessions) || 0
            : 0;


    summary.textContent =
        todaySessions +
        (
            todaySessions === 1
                ? " session"
                : " sessions"
        );

}

/// ========================================
// DISPLAY STUDY HISTORY
// ========================================

function displayStudyHistory(){

    updateStudyHistorySummary();


    const historyList =
        document.getElementById(
            "studyHistoryList"
        );


    if(!historyList){

        return;

    }


    const studyHistory =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];


    if(studyHistory.length === 0){

        historyList.innerHTML = `
            <div class="study-history-empty">
                No study history yet.
            </div>
        `;

        return;

    }


    // Sort newest date first
    const sortedHistory =
        studyHistory
            .slice()
            .sort(
                (a, b) =>
                    b.date.localeCompare(a.date)
            );


    function formatStudyHistoryDate(dateString){

        const today =
            new Date();

        const todayString =
            today
                .toISOString()
                .split("T")[0];


        const yesterday =
            new Date(today);


        yesterday.setDate(
            yesterday.getDate() - 1
        );


        const yesterdayString =
            yesterday
                .toISOString()
                .split("T")[0];


        if(dateString === todayString){

            return "Today";

        }


        if(dateString === yesterdayString){

            return "Yesterday";

        }


        const parts =
            dateString.split("-");


        const date =
            new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );


        return date.toLocaleDateString(
            "en-US",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    function createHistoryRow(entry){

    const historyItem =
        document.createElement(
            "div"
        );


    historyItem.className =
        "study-history-item";


    const dateText =
        document.createElement(
            "strong"
        );


    dateText.className =
        "study-history-date";


    dateText.textContent =
        formatStudyHistoryDate(
            entry.date
        );


    const sessionText =
        document.createElement(
            "span"
        );


    const sessions =
        Number(
            entry.sessions
        ) || 0;


    sessionText.className =
        "study-history-sessions";


    sessionText.textContent =
        sessions +
        (
            sessions === 1
                ? " session"
                : " sessions"
        );


    const minutesText =
        document.createElement(
            "strong"
        );


    minutesText.className =
        "study-history-minutes";


    minutesText.textContent =
        (
            Number(entry.minutes) || 0
        ) +
        " min";


    historyItem.appendChild(
        dateText
    );


    historyItem.appendChild(
        sessionText
    );


    historyItem.appendChild(
        minutesText
    );


    return historyItem;

}


    historyList.innerHTML = "";


    const visibleLimit = 5;


    sortedHistory.forEach(
        (entry, index) => {

            const row =
                createHistoryRow(
                    entry
                );


            if(index >= visibleLimit){

                row.classList.add(
                    "study-history-hidden"
                );

            }


            historyList.appendChild(
                row
            );

        }
    );


    // ========================================
    // SHOW MORE / SHOW LESS
    // ========================================

    if(
        sortedHistory.length >
        visibleLimit
    ){

        const showMoreBtn =
            document.createElement(
                "button"
            );


        showMoreBtn.type =
            "button";


        showMoreBtn.className =
            "study-history-show-more";


        showMoreBtn.textContent =
            "Show more";


        let expanded = false;


        showMoreBtn.addEventListener(
            "click",
            () => {

                expanded =
                    !expanded;


                const hiddenRows =
                    historyList.querySelectorAll(
                        ".study-history-hidden"
                    );


                hiddenRows.forEach(
                    row => {

                        row.classList.toggle(
                            "show",
                            expanded
                        );

                    }
                );


                showMoreBtn.textContent =
                    expanded
                        ? "Show less"
                        : "Show more";

            }
        );


        historyList.appendChild(
            showMoreBtn
        );

    }

}
// ========================================
// UPDATE STUDY STATISTICS
// ========================================

function updateStudyStatistics(){


    const todayElement =
        document.getElementById(
            "todayStudyStat"
        );


    const sessionsElement =
        document.getElementById(
            "totalSessionsStat"
        );


    const weeklyElement =
        document.getElementById(
            "weeklyStudyStat"
        );


    const streakElement =
        document.getElementById(
            "studyStreakStat"
        );


    if(todayElement){

        todayElement.textContent =
            todayStudyMinutes + " min";

    }


    if(sessionsElement){

        sessionsElement.textContent =
            todaySessionsCompleted;

    }


    const studyHistory =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];


    let weeklyMinutes = 0;


    const today =
        new Date();


    studyHistory.forEach(
        entry => {


            const entryDate =
                new Date(
                    entry.date
                );


            const difference =
                (
                    today -
                    entryDate
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                );


            if(
                difference >= 0 &&
                difference <= 7
            ){

                weeklyMinutes +=
                    entry.minutes;

            }


        }
    );


    if(weeklyElement){

        weeklyElement.textContent =
            weeklyMinutes + " min";

    }


    if(streakElement){

        const streak =
        calculateStudyStreak();


    if(streakElement){

    streakElement.textContent =
        streak === 1
        ? "🔥 1 day"
        : "🔥 " + streak + " days";

    }

    }

    // Update Study Overview

const overviewToday =
    document.getElementById(
        "overviewToday"
    );

const overviewSessions =
    document.getElementById(
        "overviewSessions"
    );

const overviewStreak =
    document.getElementById(
        "overviewStreak"
    );


if(overviewToday){

    overviewToday.textContent =
        todayStudyMinutes + " min";

}


if(overviewSessions){

    overviewSessions.textContent =
    todaySessionsCompleted;

}


if(overviewStreak){

    const streak =
        calculateStudyStreak();


    overviewStreak.textContent =
        streak === 1
        ? "🔥 1 day"
        : "🔥 " + streak + " days";

}

}

// ========================================
// UPDATE WEEKLY STUDY CHART
// ========================================

function updateWeeklyStudyChart(){


    const history =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];



    const weeklyData = {

        Mon:0,
        Tue:0,
        Wed:0,
        Thu:0,
        Fri:0,
        Sat:0,
        Sun:0

    };



    history.forEach(
        entry => {


            const parts =
    entry.date.split("-");


const date =
    new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );


const day =
    date.toLocaleDateString(
        "en-US",
        {
            weekday:"short"
        }
    );

            if(
                weeklyData[day] !== undefined
            ){

                weeklyData[day] +=
                    entry.minutes;

            }


        }
    );



    const maxMinutes =
        Math.max(
            ...Object.values(
                weeklyData
            ),
            1
        );



    Object.keys(
        weeklyData
    ).forEach(
        day => {


            const value =
                weeklyData[day];


            const bar =
                document.getElementById(
                    "chartBar" + day
                );


            const text =
                document.getElementById(
                    "chartValue" + day
                );



            if(text){

                text.textContent =
                    value + " min";

            }



            if(bar){

                const height =
                    Math.max(
                        10,
                        (value / maxMinutes) * 120
                    );


                bar.style.height =
                    height + "px";

            }


        }
    );

}

// ========================================
// CALCULATE STUDY STREAK
// ========================================

function calculateStudyStreak(){

    const studyHistory =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];


    if(studyHistory.length === 0){

        return 0;

    }


    const dates =
        studyHistory
            .map(
                entry => entry.date
            )
            .sort(
                (a,b) =>
                    new Date(b) -
                    new Date(a)
            );


    let streak = 0;


    let checkDate =
        new Date();


    for(
        let i = 0;
        i < dates.length;
        i++
    ){

        const currentDate =
            checkDate
                .toISOString()
                .split("T")[0];


        if(
            dates.includes(
                currentDate
            )
        ){

            streak++;


            checkDate.setDate(
                checkDate.getDate() - 1
            );

        }
        else{

            break;

        }

    }


    return streak;

}

// ========================================
// UPDATE STUDY ACHIEVEMENTS
// ========================================

function updateStudyAchievements(){

    const achievementsCard =
        document.querySelector(
            ".study-achievements-card"
        );


    if(!achievementsCard){

        return;

    }


    const achievementCards =
        achievementsCard.querySelectorAll(
            ".achievement-card"
        );


    const streak =
        calculateStudyStreak();


    const totalStudyMinutes =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];


    let totalMinutes = 0;


    totalStudyMinutes.forEach(
        entry => {

            totalMinutes +=
                Number(
                    entry.minutes
                ) || 0;

        }
    );


    const unlocked = [

        sessionsCompleted >= 1,

        streak >= 3,

        totalMinutes >= 600,

        sessionsCompleted >= 10

    ];


    let unlockedCount = 0;


    achievementCards.forEach(
        (card, index) => {


            if(unlocked[index]){

                card.classList.remove(
                    "locked"
                );

                card.classList.add(
                    "unlocked"
                );


                unlockedCount++;

            }
            else{

                card.classList.add(
                    "locked"
                );

                card.classList.remove(
                    "unlocked"
                );

            }

        }
    );


    const summary =
        document.getElementById(
            "achievementsSummary"
        );


    if(summary){

        summary.textContent =
            unlockedCount +
            " unlocked";

    }

}

// ========================================
// UPDATE STUDY INSIGHTS
// ========================================

function updateStudyInsights(){


    const totalTimeElement =
        document.getElementById(
            "totalStudyTimeInsight"
        );


    const averageElement =
        document.getElementById(
            "averageSessionInsight"
        );


    const bestDayElement =
        document.getElementById(
            "bestStudyDayInsight"
        );


    const streakElement =
        document.getElementById(
            "currentStreakInsight"
        );



    const history =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];



    if(history.length === 0){

        return;

    }



    let totalMinutes = 0;

    let totalSessions = 0;



    const dayTotals = {

        Mon:0,
        Tue:0,
        Wed:0,
        Thu:0,
        Fri:0,
        Sat:0,
        Sun:0

    };



    history.forEach(
        entry => {


            totalMinutes +=
                Number(
                    entry.minutes
                ) || 0;


            totalSessions +=
                Number(
                    entry.sessions
                ) || 0;



            const date =
                new Date(
                    entry.date
                );


            const day =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday:"short"
                    }
                );


            if(dayTotals[day] !== undefined){

                dayTotals[day] +=
                    Number(
                        entry.minutes
                    ) || 0;

            }


        }
    );



    if(totalTimeElement){

        totalTimeElement.textContent =
            formatStudyTime(
                totalMinutes
            );

    }



    if(averageElement){

        const average =
            totalSessions > 0
            ? totalMinutes / totalSessions
            : 0;


        averageElement.textContent =
            formatStudyTime(
                average
            );

    }



    let bestDay =
        "-";


    let highest =
        0;



    Object.keys(dayTotals).forEach(
        day => {


            if(
                dayTotals[day] > highest
            ){

                highest =
                    dayTotals[day];


                bestDay =
                    day;

            }

        }
    );



    if(bestDayElement){

        bestDayElement.textContent =
            bestDay;

    }



    if(streakElement){

        const streak =
            calculateStudyStreak();


        streakElement.textContent =
            streak === 1
            ? "🔥 1 day"
            : "🔥 " + streak + " days";

    }

}

// ========================================
// STUDY HISTORY TOGGLE
// ========================================

const studyHistoryToggle =
    document.getElementById(
        "studyHistoryToggle"
    );

const studyHistoryContent =
    document.getElementById(
        "studyHistoryContent"
    );

const studyHistoryChevron =
    document.getElementById(
        "studyHistoryChevron"
    );


if(
    studyHistoryToggle &&
    studyHistoryContent &&
    studyHistoryChevron
){

    studyHistoryToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                studyHistoryToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if(isOpen){

                studyHistoryToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
studyHistoryContent.setAttribute(
    "hidden",
    ""
);

                studyHistoryChevron.textContent =
                    "⌄";

            }
            else{

                studyHistoryToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

              studyHistoryContent.removeAttribute(
    "hidden"
);

                studyHistoryChevron.textContent =
                    "⌃";

            }

        }
    );

}

// ========================================
// STUDY INSIGHTS TOGGLE
// ========================================

const insightsToggle =
    document.getElementById(
        "insightsToggle"
    );


const insightsContent =
    document.getElementById(
        "insightsContent"
    );


const insightsChevron =
    document.getElementById(
        "insightsChevron"
    );


if(
    insightsToggle &&
    insightsContent &&
    insightsChevron
){

    const savedState =
        localStorage.getItem(
            "insightsSectionOpen"
        );


    if(savedState === "false"){

        insightsContent.hidden =
            true;


        insightsToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        insightsChevron.textContent =
            "⌄";

    }



    insightsToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                insightsToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if(isOpen){

                insightsToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                insightsContent.hidden =
                    true;


                insightsChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "insightsSectionOpen",
                    "false"
                );

            }
            else{


                insightsToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                insightsContent.hidden =
                    false;


                insightsChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "insightsSectionOpen",
                    "true"
                );

            }


        }
    );

}

// ========================================
// CLEAR STUDY HISTORY
// ========================================

const clearStudyHistoryBtn =
    document.getElementById(
        "clearStudyHistoryBtn"
    );


if(clearStudyHistoryBtn){

    clearStudyHistoryBtn.addEventListener(
        "click",
        () => {

            const confirmClear =
                confirm(
                    "Are you sure you want to clear your study history?"
                );


            if(!confirmClear){

                return;

            }


            localStorage.removeItem(
                "studyHistory"
            );


            displayStudyHistory();

        }
    );

}

// ========================================
// ADD STUDY MINUTES
// ========================================

function addStudyMinutes(minutes){

    todayStudyMinutes += minutes;


    localStorage.setItem(
        "todayStudyMinutes",
        todayStudyMinutes
    );


    saveStudyHistory(minutes);


    updateDashboardStudyProgress();

}

// ========================================
// DISPLAY DAILY GOAL
// ========================================

const setGoalSection =
    document.getElementById(
        "setGoalSection"
    );


const showGoalSection =
    document.getElementById(
        "showGoalSection"
    );


const currentGoalText =
    document.getElementById(
        "currentGoalText"
    );


const changeGoalBtn =
    document.getElementById(
        "changeGoalBtn"
    );


// Change Goal Button

if(changeGoalBtn){

    changeGoalBtn.addEventListener(
        "click",
        () => {


            setGoalSection.style.display =
                "block";


            showGoalSection.style.display =
                "none";


            const hours =
                Math.floor(
                    dailyStudyGoalMinutes / 60
                );


            const minutes =
                dailyStudyGoalMinutes % 60;


            dailyGoalHours.value =
                hours;


            dailyGoalMinutes.value =
                minutes;


        }
    );

}

function displayDailyGoal(){

    if(
        !setGoalSection ||
        !showGoalSection
    ){

        return;

    }


    const dailyGoalSummary =
        document.getElementById(
            "dailyGoalSummary"
        );


    if(dailyStudyGoalMinutes > 0){


        setGoalSection.style.display =
            "none";


        showGoalSection.style.display =
            "block";



        const hours =
            Math.floor(
                dailyStudyGoalMinutes / 60
            );


        const minutes =
            dailyStudyGoalMinutes % 60;



        let goalText = "";



        if(hours > 0){

            goalText +=
                hours +
                (hours === 1 ? " hr" : " hrs");

        }



        if(minutes > 0){

            if(goalText){

                goalText += " ";

            }


            goalText +=
                minutes + " min";

        }



        currentGoalText.textContent =
            goalText;

        if(dailyGoalSummary){

        dailyGoalSummary.textContent =
           goalText;

         }



    }
    else{


        setGoalSection.style.display =
            "block";


        showGoalSection.style.display =
            "none";

        if(dailyGoalSummary){

          dailyGoalSummary.textContent =
           "Not set";

         }


    }

}

// Load goal display

displayDailyGoal();



// ========================================
// DAILY GOAL TOGGLE
// ========================================

const dailyGoalToggle =
    document.getElementById(
        "dailyGoalToggle"
    );


const dailyGoalContent =
    document.getElementById(
        "dailyGoalContent"
    );


const dailyGoalChevron =
    document.getElementById(
        "dailyGoalChevron"
    );


if(
    dailyGoalToggle &&
    dailyGoalContent &&
    dailyGoalChevron
){

    const savedState =
        localStorage.getItem(
            "dailyGoalSectionOpen"
        );


    if(savedState === "false"){

        dailyGoalContent.hidden =
            true;

        dailyGoalToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        dailyGoalChevron.textContent =
            "⌄";

    }



    dailyGoalToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                dailyGoalToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if(isOpen){

                dailyGoalToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                dailyGoalContent.setAttribute(
    "hidden",
    ""
);

                dailyGoalChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "dailyGoalSectionOpen",
                    "false"
                );


            }
            else{


                dailyGoalToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


               dailyGoalContent.removeAttribute(
    "hidden"
);

                dailyGoalChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "dailyGoalSectionOpen",
                    "true"
                );


            }


        }
    );

}

// ========================================
// STUDY TIMER TOGGLE
// ========================================

const studyTimerToggle =
    document.getElementById(
        "studyTimerToggle"
    );


const studyTimerContent =
    document.getElementById(
        "studyTimerContent"
    );


const studyTimerChevron =
    document.getElementById(
        "studyTimerChevron"
    );


if(
    studyTimerToggle &&
    studyTimerContent &&
    studyTimerChevron
){

    const savedState =
        localStorage.getItem(
            "studyTimerSectionOpen"
        );


    if(savedState === "false"){

        studyTimerContent.hidden =
            true;


        studyTimerToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        studyTimerChevron.textContent =
            "⌄";

    }



    studyTimerToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                studyTimerToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if(isOpen){


                studyTimerToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


              studyTimerContent.setAttribute(
    "hidden",
    ""
);

                studyTimerChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "studyTimerSectionOpen",
                    "false"
                );


            }
            else{


                studyTimerToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


            studyTimerContent.removeAttribute(
    "hidden"
);

                studyTimerChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "studyTimerSectionOpen",
                    "true"
                );


            }

        }
    );

}

// ========================================
// STUDY STATISTICS TOGGLE
// ========================================

const studyStatisticsToggle =
    document.getElementById(
        "studyStatisticsToggle"
    );


const studyStatisticsContent =
    document.getElementById(
        "studyStatisticsContent"
    );


const studyStatisticsChevron =
    document.getElementById(
        "studyStatisticsChevron"
    );


if(
    studyStatisticsToggle &&
    studyStatisticsContent &&
    studyStatisticsChevron
){

    const savedState =
        localStorage.getItem(
            "studyStatisticsSectionOpen"
        );


    if(savedState === "false"){

        studyStatisticsContent.setAttribute(
            "hidden",
            ""
        );


        studyStatisticsToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        studyStatisticsChevron.textContent =
            "⌄";

    }



    studyStatisticsToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                studyStatisticsToggle.getAttribute(
                    "aria-expanded"
                ) === "true";



            if(isOpen){


                studyStatisticsToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                studyStatisticsContent.setAttribute(
                    "hidden",
                    ""
                );


                studyStatisticsChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "studyStatisticsSectionOpen",
                    "false"
                );


            }
            else{


                studyStatisticsToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                studyStatisticsContent.removeAttribute(
                    "hidden"
                );


                studyStatisticsChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "studyStatisticsSectionOpen",
                    "true"
                );


            }


        }
    );

}

// ========================================
// WEEKLY STUDY CHART TOGGLE
// ========================================

const weeklyChartToggle =
    document.getElementById(
        "weeklyChartToggle"
    );


const weeklyChartContent =
    document.getElementById(
        "weeklyChartContent"
    );


const weeklyChartChevron =
    document.getElementById(
        "weeklyChartChevron"
    );


if(
    weeklyChartToggle &&
    weeklyChartContent &&
    weeklyChartChevron
){

    const savedState =
        localStorage.getItem(
            "weeklyChartSectionOpen"
        );


    if(savedState === "false"){

        weeklyChartContent.hidden =
            true;


        weeklyChartToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        weeklyChartChevron.textContent =
            "⌄";

    }


    weeklyChartToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                weeklyChartToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if(isOpen){

                weeklyChartToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                weeklyChartContent.hidden =
                    true;


                weeklyChartChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "weeklyChartSectionOpen",
                    "false"
                );

            }
            else{

                weeklyChartToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                weeklyChartContent.hidden =
                    false;


                weeklyChartChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "weeklyChartSectionOpen",
                    "true"
                );

            }

        }
    );

}

// ========================================
// STUDY ACHIEVEMENTS TOGGLE
// ========================================

const achievementsToggle =
    document.getElementById(
        "achievementsToggle"
    );

const achievementsContent =
    document.getElementById(
        "achievementsContent"
    );

const achievementsChevron =
    document.getElementById(
        "achievementsChevron"
    );


if(
    achievementsToggle &&
    achievementsContent &&
    achievementsChevron
){

    const savedState =
        localStorage.getItem(
            "achievementsSectionOpen"
        );


    if(savedState === "false"){

        achievementsContent.hidden =
            true;


        achievementsToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        achievementsChevron.textContent =
            "⌄";

    }


    achievementsToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                achievementsToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if(isOpen){

                achievementsToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                achievementsContent.hidden =
                    true;


                achievementsChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "achievementsSectionOpen",
                    "false"
                );

            }
            else{

                achievementsToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                achievementsContent.hidden =
                    false;


                achievementsChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "achievementsSectionOpen",
                    "true"
                );

            }

        }
    );

}

// ========================================
// STUDY CALENDAR TOGGLE
// ========================================

const calendarToggle =
    document.getElementById(
        "calendarToggle"
    );


const calendarContent =
    document.getElementById(
        "calendarContent"
    );


const calendarChevron =
    document.getElementById(
        "calendarChevron"
    );


if(
    calendarToggle &&
    calendarContent &&
    calendarChevron
){


    const savedState =
        localStorage.getItem(
            "studyCalendarSectionOpen"
        );



    if(savedState === "false"){

        calendarContent.hidden =
            true;


        calendarToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        calendarChevron.textContent =
            "⌄";

    }



    calendarToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                calendarToggle.getAttribute(
                    "aria-expanded"
                ) === "true";



            if(isOpen){


                calendarToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                calendarContent.hidden =
                    true;


                calendarChevron.textContent =
                    "⌄";


                localStorage.setItem(
                    "studyCalendarSectionOpen",
                    "false"
                );


            }
            else{


                calendarToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                calendarContent.hidden =
                    false;


                calendarChevron.textContent =
                    "⌃";


                localStorage.setItem(
                    "studyCalendarSectionOpen",
                    "true"
                );


            }


        }
    );

}

// ========================================
// UPDATE TIMER DISPLAY
// ========================================

function updateTimerDisplay() {

    if (
        !timerMinutes ||
        !timerSeconds
    ) {

        return;

    }


    const minutes =
        Math.floor(
            timerSecondsRemaining / 60
        );


    const seconds =
        timerSecondsRemaining % 60;


    timerMinutes.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    timerSeconds.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


// ========================================
// START TIMER
// ========================================

function startStudyTimer() {

    if (timerInterval) {

        return;

    }


    timerStatus.textContent =
        timerMode === "focus"
            ? "Focus time — stay productive!"
            : "Take a short break.";


    timerInterval =
        setInterval(
            () => {

                if (
                    timerSecondsRemaining > 0
                ) {

                    timerSecondsRemaining--;

                    updateTimerDisplay();

                    updateTimerCircle();

                    saveTimerState();

                    return;

                }


                finishTimer();

            },
            1000
        );

saveTimerState();
}


// ========================================
// PAUSE TIMER
// ========================================

function pauseStudyTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    timerStatus.textContent =
        "Timer paused.";

     saveTimerState();

}


// ========================================
// RESET TIMER
// ========================================

function resetStudyTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    if(timerMode === "focus"){

        timerSecondsRemaining =
            FOCUS_TIME;

        totalTimerSeconds =
            FOCUS_TIME;

    }
    else{

        timerSecondsRemaining =
            BREAK_TIME;

        totalTimerSeconds =
            BREAK_TIME;

    }


    timerStatus.textContent =
        "Ready to focus";


    updateTimerDisplay();

    updateTimerCircle();

    saveTimerState();

}

// ========================================
// REFRESH ALL STUDY SECTIONS
// ========================================

function refreshStudySection(){

    // Dashboard / Daily Goal Progress
    if(
        typeof updateDashboardStudyProgress ===
        "function"
    ){

        updateDashboardStudyProgress();

    }


    // Study History
    if(
        typeof displayStudyHistory ===
        "function"
    ){

        displayStudyHistory();

    }


    // Study Statistics
    if(
        typeof updateStudyStatistics ===
        "function"
    ){

        updateStudyStatistics();

    }


    // Weekly Study Progress
    if(
        typeof updateWeeklyStudyChart ===
        "function"
    ){

        updateWeeklyStudyChart();

    }


    // Study Calendar
    if(
        typeof updateStudyCalendar ===
        "function"
    ){

        updateStudyCalendar();

    }


    // Study Insights
    if(
        typeof updateStudyInsights ===
        "function"
    ){

        updateStudyInsights();

    }

}

// ========================================
// FINISH TIMER
// ========================================

function finishTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    if (timerMode === "focus") {

    resetDailySessionCount();


    todaySessionsCompleted++;


    localStorage.setItem(
       "todaySessionsCompleted",
        todaySessionsCompleted
    );


    addStudyMinutes(
    FOCUS_TIME / 60
    );

    refreshStudySection();


   if (sessionCount) {

    sessionCount.textContent =
        todaySessionsCompleted;

   }


        timerMode = "break";

         timerSecondsRemaining =
           BREAK_TIME;

         totalTimerSeconds =
           BREAK_TIME;

        timerStatus.textContent =
            "Focus session complete! Time for a break.";

        updateTimerModeButtons();

        updateTimerDisplay();

        updateTimerCircle();

    } else {

        timerMode = "focus";

        timerSecondsRemaining =
           FOCUS_TIME;

        totalTimerSeconds =
           FOCUS_TIME;


        timerStatus.textContent =
            "Break finished. Ready to focus again!";

        updateTimerModeButtons();

        updateTimerDisplay();

        updateTimerCircle();



    }
         saveTimerState();
}

// ========================================
// RESET DAILY SESSION COUNT
// ========================================

function resetDailySessionCount(){

    const today =
        new Date()
        .toISOString()
        .split("T")[0];


    if(lastSessionDate !== today){

        todaySessionsCompleted = 0;


        localStorage.setItem(
            "todaySessionsCompleted",
            0
        );


        localStorage.setItem(
            "lastSessionDate",
            today
        );


        lastSessionDate = today;

    }

}

// ========================================
// RESET DAILY STUDY MINUTES
// ========================================

function resetDailyStudyMinutes(){

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if(lastStudyDate !== today){

        todayStudyMinutes = 0;


        localStorage.setItem(
            "todayStudyMinutes",
            0
        );


        localStorage.setItem(
            "lastStudyDate",
            today
        );


        lastStudyDate = today;

    }

}

// ========================================
// RESTORE STUDY TIMER
// ========================================

function restoreTimerState() {

    const saved =
        localStorage.getItem(
            "studyTimerState"
        );


    if (!saved) {

    // First time opening Study Timer
    timerMode = "focus";

    timerSecondsRemaining =
        FOCUS_TIME;

    totalTimerSeconds =
        FOCUS_TIME;


    updateTimerDisplay();

    updateTimerModeButtons();

    updateTimerCircle();


    if (sessionCount) {

        sessionCount.textContent =
            todaySessionsCompleted;

    }


    return;

}


    try {

        const state =
            JSON.parse(saved);


        timerMode =
            state.mode || "focus";


        totalTimerSeconds =
            Number(
                state.totalSeconds
            ) ||
            (
                timerMode === "focus"
                    ? FOCUS_TIME
                    : BREAK_TIME
            );


        let savedSeconds =
            Number(
                state.secondsRemaining
            );


        // Calculate how much time passed
        // since the timer was saved.

        if (
            state.running &&
            state.savedAt
        ) {

            const elapsedSeconds =
                Math.floor(
                    (
                        Date.now() -
                        Number(state.savedAt)
                    ) / 1000
                );


            savedSeconds -=
                elapsedSeconds;

        }


        // Timer finished while page
        // was closed.

        if (savedSeconds <= 0) {

            timerSecondsRemaining = 0;

            updateTimerDisplay();

            updateTimerCircle();

            finishTimer();

            return;

        }


        timerSecondsRemaining =
            savedSeconds;


        updateTimerDisplay();

        updateTimerModeButtons();

        updateTimerCircle();


        if (sessionCount) {

          sessionCount.textContent =
            todaySessionsCompleted;

        }


    } catch (error) {

        console.error(
            "Could not restore timer:",
            error
        );

    }

}

// ========================================
// UPDATE TIMER HEADER SUMMARY
// ========================================

function updateTimerHeaderSummary(){

    const summary =
        document.getElementById(
            "studyTimerSummary"
        );


    if(!summary){

        return;

    }


    summary.textContent =
        timerMode === "focus"
        ? "🎯 Focus"
        : "☕ Break";

}

// ========================================
// CHANGE TIMER MODE
// ========================================

function setTimerMode(mode) {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    timerMode = mode;

    updateTimerHeaderSummary();


    timerSecondsRemaining =
        mode === "focus"
            ? FOCUS_TIME
            : BREAK_TIME;


    timerStatus.textContent =
        mode === "focus"
            ? "Ready to focus"
            : "Ready for a break";

    totalTimerSeconds =
        mode === "focus"
        ? FOCUS_TIME
        : BREAK_TIME;

    updateTimerCircle();

    updateTimerModeButtons();

    updateTimerDisplay();

    if (sessionCount) {

    sessionCount.textContent =
        sessionsCompleted;

}
}


// ========================================
// UPDATE MODE BUTTONS
// ========================================

function updateTimerModeButtons() {

    if (
        !focusModeBtn ||
        !breakModeBtn
    ) {

        return;

    }


    focusModeBtn.classList.toggle(
        "active",
        timerMode === "focus"
    );


    breakModeBtn.classList.toggle(
        "active",
        timerMode === "break"
    );

}


// ========================================
// BUTTON EVENTS
// ========================================

if (startTimerBtn) {

    startTimerBtn.addEventListener(
        "click",
        startStudyTimer
    );

}


if (pauseTimerBtn) {

    pauseTimerBtn.addEventListener(
        "click",
        pauseStudyTimer
    );

}


if (resetTimerBtn) {

    resetTimerBtn.addEventListener(
        "click",
        resetStudyTimer
    );

}


if (focusModeBtn) {

    focusModeBtn.addEventListener(
        "click",
        () => {

            setTimerMode(
                "focus"
            );

        }
    );

}


if (breakModeBtn) {

    breakModeBtn.addEventListener(
        "click",
        () => {

            setTimerMode(
                "break"
            );

        }
    );

}

if (studyTimerCard) {

    studyTimerCard.classList.toggle(
        "focus-mode",
        timerMode === "focus"
    );


    studyTimerCard.classList.toggle(
        "break-mode",
        timerMode === "break"
    );

}


// Initial display

updateTimerDisplay();

updateTimerModeButtons();

updateTimerHeaderSummary();

// ========================================
// UPDATE TIMER CIRCLE
// ========================================

function updateTimerCircle() {

    const circle =
        document.querySelector(
            ".timer-circle"
        );


    if (!circle) {

        return;

    }


    const percentage =
        (
            timerSecondsRemaining /
            totalTimerSeconds
        ) * 100;


    const circleColor =
    timerMode === "focus"
        ? "#4f46e5"
        : "#22c55e";


    circle.style.background =
        `conic-gradient(
         ${circleColor} ${percentage}%,
             #eeeeee ${percentage}%
    )`;

}

// ========================================
// CALENDAR STATE
// ========================================

let calendarViewDate =
    new Date();

// ========================================
// UPDATE STUDY CALENDAR
// ========================================

function updateStudyCalendar(){


    const calendar =
        document.getElementById(
            "studyCalendar"
        );

    const monthTitle =
    document.getElementById(
        "calendarMonthTitle"
    );

    if(monthTitle){

    monthTitle.textContent =
        calendarViewDate.toLocaleDateString(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        );

}


    if(!calendar){

        return;

    }



    calendar.innerHTML = "";



    const history =
        JSON.parse(
            localStorage.getItem(
                "studyHistory"
            )
        ) || [];



    const studiedData = {};


history.forEach(
    entry => {

        studiedData[entry.date] = entry;

    }
);

// Find first study day

let firstStudyDate = null;


if(history.length > 0){

    const dates =
        history.map(
            entry => entry.date
        );


    dates.sort();


    firstStudyDate =
        new Date(
            dates[0]
        );


    firstStudyDate.setHours(
        0,
        0,
        0,
        0
    );

}



    const year =
    calendarViewDate.getFullYear();


    const month =
    calendarViewDate.getMonth();



    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();



    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();



    // Weekday headers

    const weekdays = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];



    weekdays.forEach(
        day => {


            const header =
                document.createElement(
                    "div"
                );


            header.className =
                "calendar-weekday";


            header.textContent =
                day;


            calendar.appendChild(
                header
            );


        }
    );



    // Empty spaces before month starts

    for(
        let i = 0;
        i < firstDay;
        i++
    ){

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "calendar-day empty";


        calendar.appendChild(
            empty
        );

    }



    // Days

    for(
        let day = 1;
        day <= daysInMonth;
        day++
    ){


        const dateString =
            year +
            "-" +
            String(month + 1)
                .padStart(2,"0") +
            "-" +
            String(day)
                .padStart(2,"0");



        const dayBox =
            document.createElement(
                "div"
            );


        dayBox.className =
            "calendar-day";


        dayBox.textContent =
            day;



        const currentDate =
    new Date(
        year,
        month,
        day
    );


const today =
    new Date();


today.setHours(
    0,
    0,
    0,
    0
);



if(
    studiedData[dateString]
){

    dayBox.classList.add(
        "studied"
    );


}
else if(
    firstStudyDate &&
    currentDate >= firstStudyDate &&
    currentDate < today
){

    dayBox.classList.add(
        "missed"
    );

}

        calendar.appendChild(
            dayBox
        );

    }


}

// ========================================
// CALENDAR NAVIGATION
// ========================================

const previousMonthBtn =
    document.getElementById(
        "previousMonthBtn"
    );


const nextMonthBtn =
    document.getElementById(
        "nextMonthBtn"
    );


if(previousMonthBtn){

    previousMonthBtn.addEventListener(
        "click",
        () => {

            calendarViewDate.setMonth(
                calendarViewDate.getMonth() - 1
            );


            updateStudyCalendar();

        }
    );

}



if(nextMonthBtn){

    nextMonthBtn.addEventListener(
        "click",
        () => {

            calendarViewDate.setMonth(
                calendarViewDate.getMonth() + 1
            );


            updateStudyCalendar();

        }
    );

}

// ========================================
// SAVE STUDY TIMER STATE
// ========================================

function saveTimerState() {

    localStorage.setItem(
        "studyTimerState",
        JSON.stringify({
            secondsRemaining:
                timerSecondsRemaining,

            mode:
                timerMode,

            totalSeconds:
                totalTimerSeconds,

            running:
                timerInterval !== null,

            savedAt:
                Date.now()
        })
    );

}

// ========================================
// RESTORE SAVED TIMER
// ========================================

restoreTimerState();

displayDailyGoal();

updateDashboardStudyProgress();

displayStudyHistory();

updateStudyStatistics();

updateWeeklyStudyChart();

updateStudyAchievements();

updateStudyInsights();

updateStudyCalendar();

// ========================================
// GET CLASS STATUS
// ========================================

function getClassStatus(start, end) {

    const now = new Date();


    const [startHour, startMinute] =
        start.split(":").map(Number);

    const [endHour, endMinute] =
        end.split(":").map(Number);


    const startTime =
        new Date();

    startTime.setHours(
        startHour,
        startMinute,
        0,
        0
    );


    const endTime =
        new Date();

    endTime.setHours(
        endHour,
        endMinute,
        0,
        0
    );


    // Before class

    if (now < startTime) {

        return {
            text: "Upcoming",
            className: "upcoming"
        };

    }


    // During class

    if (
        now >= startTime &&
        now <= endTime
    ) {

        return {
            text: "Now",
            className: "current"
        };

    }


    // After class

    return {
        text: "Completed",
        className: "completed"
    };

}

// ========================================
// DISPLAY TODAY'S CLASSES
// ========================================

function displayTodaysClasses() {

    const container =
        document.getElementById(
            "todaysClassesList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    // Get today's day

    const today =
        new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );


    // Get today's classes

    const todaysClasses =
        timetable.filter(
            (item) =>
                item.day === today
        );

    const countElement =
    document.getElementById(
        "todayClassesCount"
    );


if (countElement) {

    countElement.textContent =
        todaysClasses.length;

}


    // Sort by start time

    todaysClasses.sort(
        (a, b) =>
            a.start.localeCompare(
                b.start
            )
    );


    // No classes today

    if (
        todaysClasses.length === 0
    ) {

        container.innerHTML = `

            <div class="no-today-classes">

                <div class="no-class-icon">
                    🎉
                </div>

                <h3>
                    No classes today
                </h3>

                <p>
                    Enjoy your free time!
                </p>

            </div>

        `;

        return;

    }


    // Create today's classes

    todaysClasses.forEach(
        (classItem) => {

            const classElement =
                document.createElement(
                    "div"
                );


            classElement.className =
                "class-item";


            const status =
               getClassStatus(
               classItem.start,
                classItem.end
            );


            classElement.innerHTML = `

                <div class="class-time">

                    ${formatTimetableTime(
                        classItem.start
                    )}

                </div>


                <div class="class-info">

                    <h3>

                        ${classItem.subject}

                    </h3>


                    <p>

                        📍 Room
                        ${classItem.room || "Not specified"}

                    </p>

                </div>


                <span
                   class="class-status ${status.className}">

                    ${status.text}

                </span>

            `;


            container.appendChild(
                classElement
            );

        }
    );

}
// ========================================
// AUTO UPDATE TODAY'S CLASS STATUS
// ========================================

setInterval(
    () => {

        displayTodaysClasses();

    },
    60000
);

// ========================================
// EXAM MANAGER
// ========================================

let exams =
    JSON.parse(
        localStorage.getItem(
            "exams"
        )
    ) || [];
let editingExamId = null;

const examName =
    document.getElementById(
        "examName"
    );

const examSubject =
    document.getElementById(
        "examSubject"
    );

const examDate =
    document.getElementById(
        "examDate"
    );

const examTime =
    document.getElementById(
        "examTime"
    );

const examRoom =
    document.getElementById(
        "examRoom"
    );

const examDuration =
    document.getElementById(
        "examDuration"
    );

const addExamBtn =
    document.getElementById(
        "addExamBtn"
    );

const examsList =
    document.getElementById(
        "examsList"
    );

// ========================================
// UPDATE EXAM SUBJECTS
// ========================================

function updateExamSubjects() {

    if (!examSubject) {

        return;

    }


    examSubject.innerHTML = `

        <option value="">
            Select Subject
        </option>

    `;


    subjects.forEach(
        (subject) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                subject.name;


            option.textContent =
                subject.name;


            examSubject.appendChild(
                option
            );

        }
    );

}

// ========================================
// UPDATE NOTE SUBJECTS
// ========================================

function updateNoteSubjects() {

    const noteSubject =
        document.getElementById(
            "noteSubject"
        );


    if (!noteSubject) {

        return;

    }


    noteSubject.innerHTML = `

        <option value="">
            Select Subject
        </option>

    `;


    subjects.forEach(
        (subject) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                subject.name;


            option.textContent =
                subject.name;


            noteSubject.appendChild(
                option
            );

        }
    );

}

// ========================================
// NOTES ELEMENTS
// ========================================

const noteTitle =
    document.getElementById(
        "noteTitle"
    );


const noteSubject =
    document.getElementById(
        "noteSubject"
    );


const noteContent =
    document.getElementById(
        "noteContent"
    );


const saveNoteBtn =
    document.getElementById(
        "saveNoteBtn"
    );


const notesList =
    document.getElementById(
        "notesList"
    );


const notesCount =
    document.getElementById(
        "notesCount"
    );

let editingNoteId = null;

const noteSearch =
    document.getElementById(
        "noteSearch"
    );


    let notes =
    JSON.parse(
        localStorage.getItem(
            "studyNotes"
        )
    ) || [];


 // ========================================
// ADD NOTE
// ========================================

function addNote() {

    const title =
        noteTitle.value.trim();


    const subject =
        noteSubject.value;


    const content =
        noteContent.value.trim();



    if (!title) {

        alert(
            "Please enter note title."
        );

        return;

    }


    if (!subject) {

        alert(
            "Please select subject."
        );

        return;

    }


    if (!content) {

        alert(
            "Please write your note."
        );

        return;

    }



 // ========================================
// EDIT EXISTING NOTE
// ========================================

if (
    editingNoteId !== null
) {

    const note =
        notes.find(
            (item) =>
                item.id ===
                editingNoteId
        );


    if (note) {

        note.title =
            title;

        note.subject =
            subject;

        note.content =
            content;

    }


    editingNoteId =
        null;


    saveNoteBtn.textContent =
        "➕ Save Note";

}


// ========================================
// CREATE NEW NOTE
// ========================================

else {

    const note = {

        id:
            Date.now(),

        title:
            title,

        subject:
            subject,

        content:
            content,

        createdAt:
            new Date()
                .toLocaleDateString()

    };


    notes.push(note);

}



    localStorage.setItem(
        "studyNotes",
        JSON.stringify(
            notes
        )
    );


    displayNotes();


    noteTitle.value = "";

    noteSubject.value = "";

    noteContent.value = "";

}


// ========================================
// DISPLAY NOTES
// ========================================

function displayNotes() {

    if (!notesList) {

        return;

    }


    notesList.innerHTML = "";


    const searchTerm =
        noteSearch
            ? noteSearch.value
                .trim()
                .toLowerCase()
            : "";


    const filteredNotes =
        notes.filter(
            (note) => {

                return (

                    note.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                    ||

                    note.subject
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                    ||

                    note.content
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                );

            }
        );


    // ========================================
    // NO NOTES
    // ========================================

    if (
        filteredNotes.length === 0
    ) {

        notesList.innerHTML = `

            <div class="notes-empty">

                <div class="notes-empty-icon">
                    📝
                </div>

                <h3>
                    ${
                        searchTerm
                            ? "No notes found"
                            : "No notes yet"
                    }
                </h3>

                <p>
                    ${
                        searchTerm
                            ? "Try another search."
                            : "Create your first study note above."
                    }
                </p>

            </div>

        `;

    }


    // ========================================
    // DISPLAY NOTES
    // ========================================

    filteredNotes.forEach(
        (note) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "note-card";


            card.innerHTML = `

                <div class="note-card-top">

                    <div class="note-card-icon">
                        📝
                    </div>


                    <div class="note-card-actions">

                        <button
                            class="edit-note"
                            data-id="${note.id}"
                            title="Edit note">

                            ✏️

                        </button>


                        <button
                            class="delete-note"
                            data-id="${note.id}"
                            title="Delete note">

                            🗑️

                        </button>

                    </div>

                </div>


                <h3 class="note-card-title">

                    ${note.title}

                </h3>


                <span class="note-card-subject">

                    📚 ${note.subject}

                </span>


                <p class="note-card-content">

                    ${note.content}

                </p>


                <div class="note-card-footer">

                    <span>
                        📅 ${note.createdAt}
                    </span>

                </div>

            `;


            notesList.appendChild(
                card
            );

        }
    );


    if (notesCount) {

        notesCount.textContent =
            `${notes.length} Notes`;

    }

}

// ========================================
// NOTE EDIT / DELETE ACTIONS
// ========================================

if (notesList) {

    notesList.addEventListener(
        "click",
        (event) => {


            // ========================================
            // EDIT NOTE
            // ========================================

            const editButton =
                event.target.closest(
                    ".edit-note"
                );


            if (editButton) {

                const id =
                    Number(
                        editButton.dataset.id
                    );


                const note =
                    notes.find(
                        (item) =>
                            item.id === id
                    );


                if (!note) {

                    return;

                }


                editingNoteId =
                    id;


                noteTitle.value =
                    note.title;


                noteSubject.value =
                    note.subject;


                noteContent.value =
                    note.content;


                saveNoteBtn.textContent =
                    "💾 Save Changes";


                document
                    .querySelector(
                        ".notes-form-card"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                return;

            }



            // ========================================
            // DELETE NOTE
            // ========================================

            const deleteButton =
                event.target.closest(
                    ".delete-note"
                );


            if (!deleteButton) {

                return;

            }


            const id =
                Number(
                    deleteButton.dataset.id
                );


            noteToDelete = id;

            openDeleteNoteModal();

        }
    );

}

// ========================================
// DELETE NOTE MODAL
// ========================================

function openDeleteNoteModal() {

    const modal =
        document.getElementById(
            "deleteNoteModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}



function closeDeleteNoteModal() {

    const modal =
        document.getElementById(
            "deleteNoteModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    noteToDelete = null;

}



// ========================================
// CONFIRM DELETE NOTE
// ========================================

const confirmDeleteNote =
    document.getElementById(
        "confirmDeleteNote"
    );



if (confirmDeleteNote) {

    confirmDeleteNote.addEventListener(
        "click",
        () => {

            console.log(
                "Delete clicked"
            );

        }
    );

}

if (confirmDeleteNote) {

    confirmDeleteNote.addEventListener(
        "click",
        () => {


            if (
                noteToDelete === null
            ) {

                return;

            }


            notes =
                notes.filter(
                    (note) =>
                        note.id !==
                        noteToDelete
                );


            localStorage.setItem(
                "studyNotes",
                JSON.stringify(
                    notes
                )
            );


            displayNotes();


            closeDeleteNoteModal();


        }
    );

}



// ========================================
// CANCEL DELETE NOTE
// ========================================

const cancelDeleteNote =
    document.getElementById(
        "cancelDeleteNote"
    );


if (cancelDeleteNote) {

    cancelDeleteNote.addEventListener(
        "click",
        closeDeleteNoteModal
    );

}

// ========================================
// SAVE NOTE BUTTON
// ========================================

if (saveNoteBtn) {

    saveNoteBtn.addEventListener(
        "click",
        addNote
    );

}


// ========================================
// ADD / EDIT EXAM
// ========================================

function addExam() {

    const name =
        examName.value.trim();

    const subject =
        examSubject.value;

    const date =
        examDate.value;

    const time =
        examTime.value;

    const room =
        examRoom.value.trim();

    const duration =
        examDuration.value.trim();

    const deleteExamModal =
    document.getElementById(
        "deleteExamModal"
    );


    const cancelDeleteExam =
    document.getElementById(
        "cancelDeleteExam"
    );


    const confirmDeleteExam =
    document.getElementById(
        "confirmDeleteExam"
    );


let examToDelete = null;


    // ========================================
    // VALIDATION
    // ========================================

    if (!name) {

        alert(
            "Please enter the exam name."
        );

        return;

    }


    if (!subject) {

        alert(
            "Please select a subject."
        );

        return;

    }


    if (!date) {

        alert(
            "Please select the exam date."
        );

        return;

    }


    if (!time) {

        alert(
            "Please select the exam time."
        );

        return;

    }


    if (!room) {

        alert(
            "Please enter the exam room."
        );

        return;

    }


    // ========================================
    // EDIT EXISTING EXAM
    // ========================================

    if (editingExamId !== null) {

        const exam =
            exams.find(
                (item) =>
                    item.id ===
                    editingExamId
            );


        if (!exam) {

            alert(
                "Exam could not be found."
            );

            return;

        }


        exam.name =
            name;

        exam.subject =
            subject;

        exam.date =
            date;

        exam.time =
            time;

        exam.room =
            room;

        exam.duration =
            duration ||
            "Not specified";


        // Exit edit mode

        editingExamId = null;


        addExamBtn.textContent =
            "➕ Add Exam";

    }


    // ========================================
    // ADD NEW EXAM
    // ========================================

    else {

        const newExam = {

            id: Date.now(),

            name:
                name,

            subject:
                subject,

            date:
                date,

            time:
                time,

            room:
                room,

            duration:
                duration ||
                "Not specified"

        };


        exams.push(
            newExam
        );

    }


    // ========================================
    // SAVE TO LOCAL STORAGE
    // ========================================

    localStorage.setItem(
        "exams",
        JSON.stringify(
            exams
        )
    );


    // ========================================
    // REFRESH EXAM LIST
    // ========================================

    displayExams();


    if (
        typeof displayDashboardUpcomingExams ===
        "function"
    ) {

        displayDashboardUpcomingExams();

    }


    // ========================================
    // CLEAR FORM
    // ========================================

    examName.value = "";

    examSubject.value = "";

    examDate.value = "";

    examTime.value = "";

    examRoom.value = "";

    examDuration.value = "";

}

// ========================================
// UPDATE UPCOMING EXAMS COUNT
// ========================================

function updateUpcomingExamsCount() {

    const countElement =
        document.getElementById(
            "upcomingExamsCount"
        );


    if (!countElement) {

        return;

    }


    const now =
        new Date();


    const upcomingCount =
        exams.filter(
            (exam) => {

                const examDateTime =
                    new Date(
                        `${exam.date}T${exam.time}`
                    );


                return (
                    examDateTime > now
                );

            }
        ).length;


    countElement.textContent =
        upcomingCount;

}

// ========================================
// EDIT EXAM
// ========================================

function editExam(id) {

    const exam =
        exams.find(
            (item) =>
                item.id === id
        );


    if (!exam) {

        return;

    }


    editingExamId =
        id;


    examName.value =
        exam.name;

    examSubject.value =
        exam.subject;

    examDate.value =
        exam.date;

    examTime.value =
        exam.time;

    examRoom.value =
        exam.room;

    examDuration.value =
        exam.duration;


    addExamBtn.textContent =
        "💾 Save Changes";


    document
        .querySelector(
            ".exam-form-card"
        )
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


// ========================================
// DISPLAY EXAMS
// ========================================

function displayExams() {

    if (!examsList) {

        return;

    }


    examsList.innerHTML = "";


    if (exams.length === 0) {

        examsList.innerHTML = `

            <div class="no-exams">

                <div class="no-exams-icon">
                    🎓
                </div>

                <h3>
                    No exams added
                </h3>

                <p>
                    Add your first exam above.
                </p>

            </div>

        `;

        return;

    }


    exams
        .slice()
        .sort(
            (a, b) =>
                new Date(
                    `${a.date}T${a.time}`
                ) -
                new Date(
                    `${b.date}T${b.time}`
                )
        )
        .forEach(
            (exam) => {

                const card =
                    document.createElement(
                        "div"
                    );


                const status =
                    getExamStatus(
                        exam
                    );


                card.className =
                    "exam-card";


                card.innerHTML = `

                    <div
                        class="exam-card-header">

                        <div>

                            <h3>
                                🎓 ${exam.name}
                            </h3>

                            <p>
                                📚 ${exam.subject}
                            </p>

                        </div>


                        <span
                            class="exam-status
                            ${status.className}">

                            ${status.text}

                        </span>

                    </div>


                    <div
                        class="exam-details">

                        <span>
                            📅 ${exam.date}
                        </span>

                        <span>
                            ⏰ ${exam.time}
                        </span>

                        <span>
                            📍 ${exam.room}
                        </span>

                        <span>
                            ⏱️ ${exam.duration}
                        </span>

                        <div
                            class="exam-countdown">

                            ⏳
                            ${status.countdown}

                        </div>

                    </div>


                    <div
                        class="exam-actions">

                        <button
                            class="edit-exam"
                            data-id="${exam.id}">

                            ✏️ Edit

                        </button>


                        <button
                            class="delete-exam"
                            data-id="${exam.id}">

                            🗑 Delete

                        </button>

                    </div>

                `;


                examsList.appendChild(
                    card
                );

            }
        );

}

function displayDashboardUpcomingExams() {

    const container =
        document.getElementById(
            "dashboardUpcomingExams"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const upcomingExams =
        exams
            .filter(
                (exam) => {

                    const examDateTime =
                        new Date(
                            `${exam.date}T${exam.time}`
                        );


                    return (
                        examDateTime >
                        new Date()
                    );

                }
            )
            .sort(
                (a, b) => {

                    return new Date(
                        `${a.date}T${a.time}`
                    )
                    -
                    new Date(
                        `${b.date}T${b.time}`
                    );

                }
            )
            .slice(0, 3);



    if (
        upcomingExams.length === 0
    ) {

        container.innerHTML = `

            <div class="no-exams">

                <h3>
                    No upcoming exams
                </h3>

                <p>
                    Add exams to see them here.
                </p>

            </div>

        `;

        return;

    }



    upcomingExams.forEach(
        (exam) => {

            const status =
                getExamStatus(
                    exam
                );


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "exam-item";


            item.innerHTML = `

                <div class="exam-info">

                    <h3>
                        🎓 ${exam.name}
                    </h3>

                    <p>
                        📚 ${exam.subject}
                    </p>

                </div>


               <div class="exam-dashboard-right">

                   <span
                       class="exam-status ${status.className}">

                       ${status.text}

                   </span>


                    <p class="exam-dashboard-countdown">
                         ⏳ ${status.countdown}
                    </p>

               </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}

// ========================================
// ADD EXAM BUTTON
// ========================================

if (addExamBtn) {

    addExamBtn.addEventListener(
        "click",
        addExam
    );

}


// ========================================
// EDIT / DELETE BUTTONS
// ========================================

if (examsList) {

    examsList.addEventListener(
        "click",
        (event) => {


            // --------------------------------
            // EDIT
            // --------------------------------

            const editButton =
                event.target.closest(
                    ".edit-exam"
                );


            if (editButton) {

                const id =
                    Number(
                        editButton.dataset.id
                    );


                editExam(id);


                return;

            }


            // --------------------------------
            // DELETE
            // --------------------------------

            const deleteButton =
                event.target.closest(
                    ".delete-exam"
                );


            if (!deleteButton) {

                return;

            }


            const id =
                Number(
                    deleteButton.dataset.id
                );


            // Open confirmation popup

            openDeleteExamModal(id);


        }
    );

}


// ========================================
// INITIALIZE EXAMS
// ========================================

updateExamSubjects();

displayExams();

displayDashboardUpcomingExams();

updateUpcomingExamsCount();

updateNoteSubjects();

displayNotes();


setInterval(
    () => {

        displayExams();


        if (
            typeof displayDashboardUpcomingExams ===
            "function"
        ) {

            displayDashboardUpcomingExams();


        }

    },
    1000
);

// ========================================
// DELETE EXAM MODAL
// ========================================

function openDeleteExamModal(id) {

    examToDelete = id;


    if (!deleteExamModal) {

        return;

    }


    deleteExamModal.classList.add(
        "show"
    );

}


function closeDeleteExamModal() {

    examToDelete = null;


    if (!deleteExamModal) {

        return;

    }


    deleteExamModal.classList.remove(
        "show"
    );

}


// ========================================
// GET EXAM STATUS WITH LIVE COUNTDOWN
// ========================================

function getExamStatus(exam) {

    const examDateTime =
        new Date(
            `${exam.date}T${exam.time}`
        );


    const now =
        new Date();


    const difference =
        examDateTime - now;


    // ========================================
    // COMPLETED
    // ========================================

    if (difference <= 0) {

        return {

            text:
                "Completed",

            className:
                "completed",

            countdown:
                "Exam finished"

        };

    }


    // ========================================
    // TIME CALCULATION
    // ========================================

    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds /
            (60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                totalSeconds %
                (60 * 60 * 24)
            ) /
            (60 * 60)
        );


    const minutes =
        Math.floor(
            (
                totalSeconds %
                (60 * 60)
            ) /
            60
        );


    const seconds =
        totalSeconds % 60;


    // ========================================
    // CALENDAR DATE CHECK
    // ========================================

    const todayDate =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );


    const examDateOnly =
        new Date(
            examDateTime.getFullYear(),
            examDateTime.getMonth(),
            examDateTime.getDate()
        );


    const calendarDifference =
        Math.round(
            (
                examDateOnly -
                todayDate
            ) /
            (1000 * 60 * 60 * 24)
        );


    // ========================================
    // EXAM TODAY
    // ========================================

    if (
        calendarDifference === 0
    ) {

        return {

            text:
                "Exam Today",

            className:
                "today",

            countdown:
                `${hours}h ${minutes}m ${seconds}s remaining`

        };

    }


    // ========================================
    // TOMORROW
    // ========================================

    if (
        calendarDifference === 1
    ) {

        return {

            text:
                "Tomorrow",

            className:
                "tomorrow",

            countdown:
                `${hours}h ${minutes}m ${seconds}s remaining`

        };

    }


    // ========================================
    // UPCOMING
    // ========================================

    return {

        text:
            "Upcoming",

        className:
            "upcoming",

        countdown:
            `${days}d ${hours}h ${minutes}m ${seconds}s remaining`

    };

}

// ========================================
// DELETE MODAL EVENTS
// ========================================



document.addEventListener(
    "click",
    (event) => {


         // EDIT EXAM

        const editButton =
            event.target.closest(
                ".edit-exam"
            );


        if (editButton) {

            const id =
                Number(
                    editButton.dataset.id
                );


            editExam(id);

            return;

        }

        // DELETE CONFIRM

        if (
            event.target.id ===
            "confirmDeleteExam"
        ) {


            if (
                examToDelete === null
            ) {

                return;

            }


            exams =
                exams.filter(
                    (exam) =>
                        exam.id !==
                        examToDelete
                );


            localStorage.setItem(
                "exams",
                JSON.stringify(
                    exams
                )
            );


            displayExams();
            displayDashboardUpcomingExams();
            updateUpcomingExamsCount();


            if (
                typeof displayDashboardUpcomingExams ===
                "function"
            ) {

                displayDashboardUpcomingExams();

            }


            closeDeleteExamModal();

        }



        // CANCEL BUTTON

        if (
            event.target.id ===
            "cancelDeleteExam"
        ) {

            closeDeleteExamModal();

        }


    }
);


// ========================================
// DARK MODE
// ========================================

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
)

{

    document.body.classList.add(
        "dark-mode"
    );


    if (themeToggle) {

        themeToggle.textContent =
            "☀️ Disable";

    }

}



if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {


            document.body.classList.toggle(
                "dark-mode"
            );


            const enabled =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "darkMode",
                enabled
            );


            themeToggle.textContent =
                enabled
                    ? "☀️ Disable"
                    : "🌙 Enable";


        }
    );

}

// ========================================
// CLEAR DATA MODAL
// ========================================


const clearDataBtn =
    document.getElementById(
        "clearDataBtn"
    );


const clearDataModal =
    document.getElementById(
        "clearDataModal"
    );


const cancelClearData =
    document.getElementById(
        "cancelClearData"
    );


const confirmClearData =
    document.getElementById(
        "confirmClearData"
    );



if (clearDataBtn && clearDataModal) {

    clearDataBtn.addEventListener(
        "click",
        () => {

            clearDataModal.classList.add(
                "show"
            );

        }
    );

}


if (cancelClearData) {

    cancelClearData.addEventListener(
        "click",
        () => {

            clearDataModal.classList.remove(
                "show"
            );

        }
    );

}



if (confirmClearData) {

    confirmClearData.addEventListener(
        "click",
        () => {


            localStorage.removeItem(
                "exams"
            );


            localStorage.removeItem(
                "studyNotes"
            );


            localStorage.removeItem(
                "assignments"
            );


            localStorage.removeItem(
                "subjects"
            );


            location.reload();


        }
    );

}

// ========================================
// PROFILE
// ========================================


const profileName =
    document.getElementById(
        "profileName"
    );


const saveProfileBtn =
    document.getElementById(
        "saveProfileBtn"
    );



const savedName =
    localStorage.getItem(
        "studentName"
    );


if(savedName && profileName){

    profileName.value =
        savedName;

}


if(saveProfileBtn){

    saveProfileBtn.addEventListener(
        "click",
        () => {


           const name =
               profileName
               ? profileName.value.trim()
           : "";



            if(name){

                localStorage.setItem(
                    "studentName",
                    name
                );


                alert(
                    "Profile saved"
                );


                location.reload();

            }


        }
    );

}

// ========================================
// UPDATE PROFILE DISPLAY
// ========================================


function updateProfileDisplay() {
    const name =
        (localStorage.getItem("studentName") || "").trim();

    const formattedName = name
        ? name.split(/\s+/)
            .map(part =>
                part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join(" ")
        : "Your Name";

    const initials = name
        ? name.split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0))
            .join("")
            .toUpperCase()
        : "S";

    const hour = new Date().getHours();

    const greeting =
        hour < 12 ? "Morning" :
        hour < 17 ? "Afternoon" : "Evening";

    const welcomeMessage =
        document.getElementById("welcomeMessage");

    const dashboardAvatar =
        document.getElementById("dashboardAvatar");

    const largeProfileAvatar =
        document.getElementById("largeProfileAvatar");

    const profileDisplayName =
        document.getElementById("profileDisplayName");

    if (welcomeMessage) {
        welcomeMessage.textContent =
            `Good ${greeting}, ${name ? formattedName : "Student"} 👋`;
    }

    if (dashboardAvatar) {
        dashboardAvatar.textContent = initials;
    }

    if (largeProfileAvatar) {
        largeProfileAvatar.textContent = initials;
    }

    if (profileDisplayName) {
        profileDisplayName.textContent = formattedName;
    }

    if (profileName && profileName.value !== name) {
        profileName.value = name;
    }
}

       updateProfileDisplay();

// ========================================
// SAVE PROFILE DETAILS
// ========================================


const profileCourseInput =
    document.getElementById(
        "profileCourseInput"
    );


const profileCollegeInput =
    document.getElementById(
        "profileCollegeInput"
    );


const profileYearInput =
    document.getElementById(
        "profileYearInput"
    );


const saveProfileDetails =
    document.getElementById(
        "saveProfileDetails"
    );



const profileCourse =
    document.getElementById(
        "profileCourse"
    );


const profileCollege =
    document.getElementById(
        "profileCollege"
    );

const profileYear =
    document.getElementById(
        "profileYear"
    );






// LOAD SAVED DETAILS

const savedCourse =
    localStorage.getItem(
        "studentCourse"
    );


const savedCollege =
    localStorage.getItem(
        "studentCollege"
    );


const savedYear =
    localStorage.getItem(
        "studentYear"
    );



if(savedCourse){

    if(profileCourse){

        profileCourse.textContent =
            savedCourse;

    }


    if(profileCourseInput){

        profileCourseInput.value =
            savedCourse;

    }

}



if(savedCollege){

    if(profileCollege){

        profileCollege.textContent =
            savedCollege;

    }


    if(profileCollegeInput){

        profileCollegeInput.value =
            savedCollege;

    }

}



if(savedYear){

    if(profileYearInput){

        profileYearInput.value =
            savedYear;

    }


    if(profileYear){

        profileYear.textContent =
            savedYear;

    }

}

// SAVE BUTTON


if (saveProfileDetails) {
    saveProfileDetails.addEventListener("click", () => {
        const name =
            profileName ? profileName.value.trim() : "";

        const course =
            profileCourseInput
                ? profileCourseInput.value.trim()
                : "";

        const college =
            profileCollegeInput
                ? profileCollegeInput.value.trim()
                : "";

        const year =
            profileYearInput
                ? profileYearInput.value.trim()
                : "";

        const status =
            document.getElementById("profileSaveStatus");

        if (!name) {
            if (status) {
                status.textContent = "Please enter your full name.";
                status.classList.add("error");
            }

            if (profileName) profileName.focus();
            return;
        }

        localStorage.setItem("studentName", name);
        localStorage.setItem("studentCourse", course);
        localStorage.setItem("studentCollege", college);
        localStorage.setItem("studentYear", year);

        if (profileCourse) {
            profileCourse.textContent = course || "Course";
        }

        if (profileCollege) {
            profileCollege.textContent = college || "College Name";
        }

        if (profileYear) {
            profileYear.textContent = year || "Year / Semester";
        }

        updateProfileDisplay();

        if (status) {
            status.classList.remove("error");
            status.textContent = "✓ Profile details saved successfully.";
        }
    });
}


// ========================================
// OPEN PROFILE FROM DASHBOARD AVATAR
// ========================================

const dashboardAvatar =
    document.getElementById(
        "dashboardAvatar"
    );


if (dashboardAvatar) {


    dashboardAvatar.addEventListener(
        "click",
        () => {


            // hide all sections

            document
            .querySelectorAll(
                ".page-section"
            )
            .forEach(
                section => {

                    section.classList.remove(
                        "active"
                    );

                }
            );



            // show profile

            const profile =
                document.getElementById(
                    "profile"
                );


            if(profile){

                profile.classList.add(
                    "active"
                );

            }


            // remove sidebar active

            document
            .querySelectorAll(
                ".nav-item"
            )
            .forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


        }
    );

}


/* ========================================
   STUDENTHUB - SECURE LOGOUT
======================================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {

        const supabaseClient = window.studentHubSupabase;

        if (!supabaseClient) {
            alert("Authentication is unavailable. Please refresh and try again.");
            return;
        }

        logoutBtn.disabled = true;

        try {
            const { error } = await supabaseClient.auth.signOut();

            if (error) {
                throw error;
            }

            // Remove old login flags and the local greeting.
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loginTime");
            localStorage.removeItem("studentName");

            // Return to the login page.
            window.location.replace("auth.html");

        } catch (error) {
            console.error("Logout error:", error);

            alert("Could not sign out. Please check your connection and try again.");

            logoutBtn.disabled = false;
        }
    });
}

// ========================================
// Update Dashboard Attendance Percentage
// ========================================

function updateDashboardAttendancePercentage() {

    const element =
        document.getElementById(
            "dashboardAttendancePercentage"
        );


    if (!element) {

        return;

    }


    if (
        attendanceRecords.length === 0
    ) {

        element.textContent =
            "0%";

        return;

    }


    let totalConducted = 0;

    let attendedClasses = 0;


    attendanceRecords.forEach(
        record => {

            totalConducted +=
                Number(
                    record.conducted
                ) || 0;


            attendedClasses +=
                Number(
                    record.attended
                ) || 0;

        }
    );


    const percentage =
        totalConducted > 0
            ? (
                attendedClasses /
                totalConducted
            ) * 100
            : 0;


    element.textContent =
        Math.round(
            percentage
        ) + "%";

}

// ========================================
// DASHBOARD ATTENDANCE CALCULATOR
// ========================================

const calculateAttendanceBtn =
    document.getElementById(
        "calculateAttendanceBtn"
    );


if (calculateAttendanceBtn) {

    calculateAttendanceBtn.addEventListener(
        "click",
        () => {

            const subject =
                document.getElementById(
                    "subjectName"
                )?.value.trim();


            const planned =
                Number(
                    document.getElementById(
                        "plannedClasses"
                    )?.value
                );


            const conducted =
                Number(
                    document.getElementById(
                        "conductedClasses"
                    )?.value
                );


            const attended =
                Number(
                    document.getElementById(
                        "attendedClasses"
                    )?.value
                );


            // ========================================
            // VALIDATION
            // ========================================

            if (!subject) {

                alert(
                    "Please enter a subject."
                );

                return;

            }


            if (!planned || planned < 1) {

                alert(
                    "Please enter planned classes."
                );

                return;

            }


            if (
                conducted < 0 ||
                conducted > planned
            ) {

                alert(
                    "Classes conducted cannot be greater than planned classes."
                );

                return;

            }


            if (
                attended < 0 ||
                attended > conducted
            ) {

                alert(
                    "Classes attended cannot be greater than classes conducted."
                );

                return;

            }


            // ========================================
            // CALCULATE ATTENDANCE
            // ========================================

            const percentage =
                conducted > 0
                    ? (
                        attended /
                        conducted
                    ) * 100
                    : 0;


            // ========================================
            // SHOW RESULT
            // ========================================

            const attendanceResult =
                document.getElementById(
                    "attendanceResult"
                );


            if (attendanceResult) {

                const remaining =
                    Math.max(
                        planned - conducted,
                        0
                    );


              attendanceResult.innerHTML = `

    <div class="dashboard-attendance-result">


        <!-- CURRENT ATTENDANCE HEADER -->

        <button
            type="button"
            class="attendance-summary-toggle"
            id="attendanceSummaryToggle"
            aria-expanded="true"
            aria-controls="attendanceSummaryContent">

            <div>

                <span class="dashboard-attendance-result-label">
                    Current Attendance
                </span>

                <div class="dashboard-attendance-percentage">
                    ${percentage.toFixed(1)}%
                </div>

            </div>


            <span
                id="attendanceSummaryChevron"
                class="attendance-summary-chevron">

                ˄

            </span>

        </button>


        <!-- COLLAPSIBLE CONTENT -->

        <div
            id="attendanceSummaryContent"
            class="attendance-summary-content">


            <div class="dashboard-attendance-stats">


                <div class="dashboard-attendance-stat">

                    <span class="dashboard-attendance-stat-label">
                        Classes Attended
                    </span>

                    <strong>
                        ${attended}
                    </strong>

                </div>


                <div class="dashboard-attendance-stat">

                    <span class="dashboard-attendance-stat-label">
                        Classes Conducted
                    </span>

                    <strong>
                        ${conducted}
                    </strong>

                </div>


                <div class="dashboard-attendance-stat">

                    <span class="dashboard-attendance-stat-label">
                        Classes Remaining
                    </span>

                    <strong>
                        ${remaining}
                    </strong>

                </div>


            </div>


            <div class="dashboard-attendance-summary">

                <span>
                    ${attended} of ${conducted}
                    classes attended
                </span>


                <span>
                    ${remaining}
                    ${remaining === 1 ? "class" : "classes"}
                    remaining in your plan
                </span>

            </div>


        </div>

    </div>

`;

            }

        }
    );

// ========================================
// ATTENDANCE RESULT TOGGLE
// ========================================

const attendanceResult =
    document.getElementById(
        "attendanceResult"
    );


if (attendanceResult) {

    attendanceResult.addEventListener(
        "click",
        (event) => {

            const toggle =
                event.target.closest(
                    "#attendanceSummaryToggle"
                );


            if (!toggle) {

                return;

            }


            const content =
                document.getElementById(
                    "attendanceSummaryContent"
                );


            const chevron =
                document.getElementById(
                    "attendanceSummaryChevron"
                );


            if (!content) {

                return;

            }


            const isOpen =
                !content.hidden;


            content.hidden =
                isOpen;


            toggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            if (chevron) {

                chevron.textContent =
                    isOpen
                        ? "˅"
                        : "˄";

            }

        }
    );

}

}

// ========================================
// DASHBOARD ATTENDANCE TOGGLE
// ========================================

const dashboardAttendanceToggle =
    document.getElementById(
        "dashboardAttendanceToggle"
    );


const dashboardAttendanceContent =
    document.getElementById(
        "dashboardAttendanceContent"
    );


const dashboardAttendanceChevron =
    document.getElementById(
        "dashboardAttendanceChevron"
    );


if (
    dashboardAttendanceToggle &&
    dashboardAttendanceContent
) {

    dashboardAttendanceToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                !dashboardAttendanceContent.hidden;


            dashboardAttendanceContent.hidden =
                isOpen;


            dashboardAttendanceToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            if (
                dashboardAttendanceChevron
            ) {

                dashboardAttendanceChevron.textContent =
                    isOpen
                        ? "˅"
                        : "˄";

            }

        }
    );

}

// ========================================
// STUDY MATERIALS - PDF STORAGE
// ========================================

const materialTitle =
    document.getElementById("materialTitle");

const materialType =
    document.getElementById("materialType");

const driveLink =
    document.getElementById("driveLink");

const pdfSubject =
    document.getElementById("pdfSubject");

const pdfFile =
    document.getElementById("pdfFile");

const uploadPdfBtn =
    document.getElementById("uploadPdfBtn");

const pdfList =
    document.getElementById("pdfList");

const pdfCount =
    document.getElementById("pdfCount");

const pdfSearch =
    document.getElementById("pdfSearch");

const pdfSubjectFilter =
    document.getElementById("pdfSubjectFilter");

const pdfTypeFilter =
    document.getElementById("pdfTypeFilter");


// ========================================
// INDEXEDDB
// ========================================

let pdfDatabase;


const pdfDBRequest =
    indexedDB.open(
        "StudentHubPDFDatabase",
        1
    );


pdfDBRequest.onupgradeneeded =
    function(event) {

        pdfDatabase =
            event.target.result;


        if (
            !pdfDatabase.objectStoreNames.contains(
                "pdfs"
            )
        ) {

            pdfDatabase.createObjectStore(
                "pdfs",
                {
                    keyPath: "id",
                    autoIncrement: true
                }
            );

        }

    };


pdfDBRequest.onsuccess =
    function(event) {

        pdfDatabase =
            event.target.result;


        loadPdfMaterials();

    };


pdfDBRequest.onerror =
    function() {

        console.error(
            "Unable to open PDF database."
        );

    };


// ========================================
// LOAD SUBJECTS
// ========================================

function updatePdfSubjectList() {

    if (!pdfSubject || !pdfSubjectFilter) {
        return;
    }

    pdfSubject.innerHTML = `
        <option value="">Select Subject</option>
        <option value="general">General / Other</option>
    `;

    pdfSubjectFilter.innerHTML = `
        <option value="all">All Subjects</option>
        <option value="general">General / Other</option>
    `;

    subjects.forEach(subject => {

        const uploadOption =
            document.createElement("option");

        uploadOption.value =
            subject.name;

        uploadOption.textContent =
            subject.name;

        pdfSubject.appendChild(uploadOption);

        const filterOption =
            document.createElement("option");

        filterOption.value =
            subject.name;

        filterOption.textContent =
            subject.name;

        pdfSubjectFilter.appendChild(filterOption);

    });

}

// Load existing subjects into Study Materials
updatePdfSubjectList();

// ========================================
// UPLOAD PDF
// ========================================

// ========================================
// ADD STUDY MATERIAL
// ========================================

if (uploadPdfBtn) {

    uploadPdfBtn.addEventListener(
        "click",
        function () {

            const title =
                materialTitle.value.trim();

            const subject =
                pdfSubject.value;

            const type =
                materialType.value;

            const file =
                pdfFile.files[0];

            const link =
                driveLink.value.trim();


            // -------------------------------
            // VALIDATION
            // -------------------------------

            if (!title) {

                alert(
                    "Please enter a material title."
                );

                materialTitle.focus();

                return;

            }


            if (!subject) {

                alert(
                    "Please select a subject."
                );

                pdfSubject.focus();

                return;

            }


            if (!type) {

                alert(
                    "Please select a material type."
                );

                materialType.focus();

                return;

            }


            // Must have either PDF or Drive link

            if (!file && !link) {

                alert(
                    "Please upload a PDF or add a Google Drive link."
                );

                return;

            }


            // -------------------------------
            // PDF VALIDATION
            // -------------------------------

            if (file) {

                if (
                    file.type !==
                    "application/pdf"
                ) {

                    alert(
                        "Please select a PDF file only."
                    );

                    return;

                }


                const maxSize =
                    10 * 1024 * 1024;


                if (
                    file.size > maxSize
                ) {

                    alert(
                        "PDF size must be 10 MB or less."
                    );

                    return;

                }

            }


            // -------------------------------
            // CREATE MATERIAL
            // -------------------------------

            const material = {

                title:
                    title,

                subject:
                    subject,

                type:
                    type,

                file:
                    file || null,

                driveLink:
                    link || "",

                fileName:
                    file
                        ? file.name
                        : "",

                fileSize:
                    file
                        ? file.size
                        : 0,

                date:
                    new Date().toISOString()

            };


            // -------------------------------
            // SAVE TO INDEXEDDB
            // -------------------------------

            const transaction =
                pdfDatabase.transaction(
                    ["pdfs"],
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    "pdfs"
                );


            store.add(material);


            transaction.oncomplete =
                function () {

                    // Clear form

                    materialTitle.value =
                        "";

                    pdfSubject.value =
                        "";

                    materialType.value =
                        "";

                    pdfFile.value =
                        "";

                    driveLink.value =
                        "";


                    // Refresh materials

                    loadPdfMaterials();

                };


            transaction.onerror =
                function () {

                    alert(
                        "Unable to save this study material."
                    );

                };

        }
    );

}


// ========================================
// LOAD PDF MATERIALS
// ========================================

function loadPdfMaterials() {

    if (
        !pdfDatabase ||
        !pdfList
    ) {

        return;

    }


    const transaction =
        pdfDatabase.transaction(
            ["pdfs"],
            "readonly"
        );


    const store =
        transaction.objectStore(
            "pdfs"
        );


    const request =
        store.getAll();


    request.onsuccess =
        function() {

            displayPdfMaterials(
                request.result
            );

        };

}

// ========================================
// DISPLAY STUDY MATERIALS
// ========================================

function displayPdfMaterials(materials) {

    if (!pdfList) {
        return;
    }


    const search =
        pdfSearch
            ? pdfSearch.value
                .trim()
                .toLowerCase()
            : "";


    const selectedSubject =
        pdfSubjectFilter
            ? pdfSubjectFilter.value
            : "all";


    const selectedType =
        pdfTypeFilter
            ? pdfTypeFilter.value
            : "all";


    const filtered =
        materials.filter(
            material => {

                const title =
                    String(
                        material.title || ""
                    ).toLowerCase();


                const subject =
                    String(
                        material.subject || ""
                    ).toLowerCase();


                const type =
                    String(
                        material.type || ""
                    );



                const fileName =
                      String(material.fileName || "").toLowerCase();

                const matchesSearch =
                      !search ||
                      title.includes(search) ||
                      subject.includes(search) ||
                      fileName.includes(search) ||
                      type.toLowerCase().includes(search);


                const matchesSubject =
                    selectedSubject === "all" ||
                    material.subject === selectedSubject;


                const matchesType =
                    selectedType === "all" ||
                    type === selectedType;


                return (
                    matchesSearch &&
                    matchesSubject &&
                    matchesType
                );

            }
        );


    // ========================================
    // MATERIAL COUNT
    // ========================================

    if (pdfCount) {

        pdfCount.textContent =
            `${materials.length} ${
                materials.length === 1
                    ? "Material"
                    : "Materials"
            }`;

    }


    // ========================================
    // EMPTY STATE
    // ========================================

    if (filtered.length === 0) {

        pdfList.innerHTML = `

            <div class="pdf-empty">

                <div class="pdf-empty-icon">
                    📚
                </div>

                <h3>
                    No study materials found
                </h3>

                <p>
                    Upload a PDF or add a Drive link
                    to build your study library.
                </p>

            </div>

        `;

        return;

    }


    pdfList.innerHTML = "";


    // ========================================
    // DISPLAY MATERIALS
    // ========================================

    filtered.forEach(
        material => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "pdf-card";


            const typeLabels = {

                notes:
                    "📘 Lecture Notes",

                study:
                    "📄 Study Material",

                pyq:
                    "📝 PYQs",

                reference:
                    "📚 Reference",

                other:
                    "📎 Other"

            };


            const typeLabel =
                typeLabels[
                    material.type
                ] || "📄 Study Material";


            const hasPdf =
                !!material.file;


            const hasDrive =
                !!material.driveLink;


            let resourceButton = "";


            if (hasPdf) {

                resourceButton = `

                    <button
                        type="button"
                        class="pdf-open-btn">

                        👁 Open PDF

                    </button>

                `;

            }
            else if (hasDrive) {

                resourceButton = `

                    <button
                        type="button"
                        class="pdf-drive-btn">

                        🔗 Open Drive

                    </button>

                `;

            }


            const fileInfo =
                hasPdf
                    ? `
                        <small>
                            ${formatPdfSize(
                                material.fileSize || 0
                            )}
                        </small>
                    `
                    : `
                        <small>
                            Google Drive Resource
                        </small>
                    `;


            card.innerHTML = `

                <div class="pdf-card-info">

                    <div class="pdf-card-icon">

                        ${
                            hasPdf
                                ? "📄"
                                : "🔗"
                        }

                    </div>


                    <div class="pdf-card-details">

                        <h3>
                            ${escapePdfHTML(
                                material.title ||
                                material.fileName ||
                                "Untitled Material"
                            )}
                        </h3>


                        <p>

                            ${escapePdfHTML(
                                material.subject ||
                                "General / Other"
                            )}

                            <span>
                                •
                            </span>

                            ${typeLabel}

                        </p>


                        ${fileInfo}

                    </div>

                </div>


                <div class="pdf-card-actions">

                    ${resourceButton}


                    <button
                        type="button"
                        class="pdf-delete-btn">

                        🗑 Delete

                    </button>

                </div>

            `;


            // =================================
            // OPEN PDF
            // =================================

            if (hasPdf) {

                const openButton =
                    card.querySelector(
                        ".pdf-open-btn"
                    );


                if (openButton) {

                    openButton.addEventListener(
                        "click",
                        () => {

                            openPdf(
                                material
                            );

                        }
                    );

                }

            }


            // =================================
            // OPEN DRIVE
            // =================================

            if (hasDrive) {

                const driveButton =
                    card.querySelector(
                        ".pdf-drive-btn"
                    );


                if (driveButton) {

                    driveButton.addEventListener(
                        "click",
                        () => {

                            window.open(
                                material.driveLink,
                                "_blank",
                                "noopener,noreferrer"
                            );

                        }
                    );

                }

            }


            // =================================
            // DELETE
            // =================================

            const deleteButton =
                card.querySelector(
                    ".pdf-delete-btn"
                );


            if (deleteButton) {

                deleteButton.addEventListener(
                    "click",
                    () => {

                        deletePdf(
                            material.id
                        );

                    }
                );

            }


            pdfList.appendChild(
                card
            );

        }
    );

}


// ========================================
// OPEN PDF
// ========================================

function openPdf(material) {

    const url =
        URL.createObjectURL(
            material.file
        );


    window.open(
        url,
        "_blank"
    );

}


// ========================================
// DOWNLOAD PDF
// ========================================

function downloadPdf(material) {

    const url =
        URL.createObjectURL(
            material.file
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        material.name;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );

}


// ========================================
// DELETE PDF
// ========================================

function deletePdf(id) {

    const confirmed =
        confirm(
            "Delete this PDF?"
        );


    if (!confirmed) {

        return;

    }


    const transaction =
        pdfDatabase.transaction(
            ["pdfs"],
            "readwrite"
        );


    const store =
        transaction.objectStore(
            "pdfs"
        );


    store.delete(id);


    transaction.oncomplete =
        function() {

            loadPdfMaterials();

        };

}


// ========================================
// SEARCH
// ========================================

if (pdfSearch) {

    pdfSearch.addEventListener(
        "input",
        loadPdfMaterials
    );

}

if (pdfSubjectFilter) {

    pdfSubjectFilter.addEventListener(
        "change",
        loadPdfMaterials
    );

}


if (pdfTypeFilter) {

    pdfTypeFilter.addEventListener(
        "change",
        loadPdfMaterials
    );

}


// ========================================
// HELPERS
// ========================================

function formatPdfSize(bytes) {

    if (bytes < 1024) {

        return `${bytes} B`;

    }


    if (bytes < 1024 * 1024) {

        return `${(
            bytes / 1024
        ).toFixed(1)} KB`;

    }


    return `${(
        bytes /
        (1024 * 1024)
    ).toFixed(1)} MB`;

}


function escapePdfHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* ========================================
   STUDENTHUB NOTIFICATION LOGIC
======================================== */

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationBadge =
    document.getElementById("notificationBadge");

const notificationList =
    document.getElementById("notificationList");

const notificationSummary =
    document.getElementById("notificationSummary");

const markAllNotificationsRead =
    document.getElementById("markAllNotificationsRead");

const notificationStorageKey =
    "studentHubReadNotificationIds";


/* Read notification IDs that the user has already read */

function getReadNotificationIds() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(notificationStorageKey) || "[]"
        );

        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}


/* Safely display user-entered text */

function escapeNotificationText(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]
    );
}


/* Build notifications from saved exams and assignments */

function getStudentHubNotifications() {
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const oneDay = 24 * 60 * 60 * 1000;
    const notifications = [];

    /* Upcoming exams: the next 7 days */

    const savedExams =
        typeof exams !== "undefined" && Array.isArray(exams)
            ? exams
            : [];

    savedExams.forEach(exam => {
        if (!exam.date) return;

        const examTime = new Date(
            `${exam.date}T${exam.time || "23:59"}`
        );

        const examDay = new Date(
            `${exam.date}T00:00:00`
        );

        if (
            Number.isNaN(examTime.getTime()) ||
            Number.isNaN(examDay.getTime())
        ) {
            return;
        }

        const daysUntil = Math.round(
            (examDay.getTime() - today.getTime()) / oneDay
        );

        if (
            examTime <= now ||
            daysUntil < 0 ||
            daysUntil > 7
        ) {
            return;
        }

        let timing;

        if (daysUntil === 0) {
            timing = `Today at ${exam.time || "the scheduled time"}`;
        } else if (daysUntil === 1) {
            timing = `Tomorrow at ${exam.time || "the scheduled time"}`;
        } else {
            timing = `In ${daysUntil} days • ${exam.date}`;
        }

        notifications.push({
            id: `exam-${exam.id}`,
            section: "exams",
            icon: "🎓",
            title: `Upcoming exam: ${exam.name || "Exam"}`,
            message: `${exam.subject || "Subject not specified"} • ${timing}`,
            sortTime: examTime.getTime(),
            urgent: daysUntil <= 1
        });
    });


    /* Assignments due in the next 3 days, or already overdue */

    const savedAssignments =
        typeof assignments !== "undefined" &&
        Array.isArray(assignments)
            ? assignments
            : [];

    savedAssignments.forEach(assignment => {
        if (
            assignment.completed === true ||
            assignment.completed === "true" ||
            !assignment.dueDate
        ) {
            return;
        }

        const dueDay = new Date(
            `${assignment.dueDate}T00:00:00`
        );

        const dueEnd = new Date(
            `${assignment.dueDate}T23:59:59`
        );

        if (
            Number.isNaN(dueDay.getTime()) ||
            Number.isNaN(dueEnd.getTime())
        ) {
            return;
        }

        const daysUntil = Math.round(
            (dueDay.getTime() - today.getTime()) / oneDay
        );

        const overdue = dueEnd < now;

        if (!overdue && (daysUntil < 0 || daysUntil > 3)) {
            return;
        }

        let title;

        if (overdue) {
            title = "Overdue assignment";
        } else if (daysUntil === 0) {
            title = "Assignment due today";
        } else if (daysUntil === 1) {
            title = "Assignment due tomorrow";
        } else {
            title = `Assignment due in ${daysUntil} days`;
        }

        notifications.push({
            id: `assignment-${assignment.id}`,
            section: "assignments",
            icon: "📝",
            title: title,
            message: `${assignment.title || "Assignment"} • ${assignment.subject || "Subject not specified"} • ${assignment.dueDate}`,
            sortTime: dueEnd.getTime(),
            urgent: overdue || daysUntil <= 1
        });
    });

    /* Show the most urgent / nearest deadline first */

    notifications.sort(
        (a, b) => a.sortTime - b.sortTime
    );

    return notifications;
}


/* Update the badge and notification list */

function updateNotificationUI() {
    if (
        !notificationBtn ||
        !notificationPanel ||
        !notificationBadge ||
        !notificationList
    ) {
        return;
    }

    const notifications = getStudentHubNotifications();
    const readIds = getReadNotificationIds();

    const unreadCount = notifications.filter(
        item => !readIds.includes(item.id)
    ).length;

    notificationBadge.textContent =
        unreadCount > 99 ? "99+" : String(unreadCount);

    notificationBadge.hidden = unreadCount === 0;

    notificationBtn.setAttribute(
        "aria-label",
        unreadCount
            ? `Notifications, ${unreadCount} unread`
            : "Open notifications"
    );

    if (notificationSummary) {
        notificationSummary.textContent =
            unreadCount === 0
                ? "You're all caught up."
                : `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`;
    }

    if (markAllNotificationsRead) {
        markAllNotificationsRead.disabled = unreadCount === 0;
    }

    if (notifications.length === 0) {
        notificationList.innerHTML = `
            <div class="notification-empty">
                <span>🎉</span>
                <h3>You're all caught up!</h3>
                <p>No upcoming exam or assignment reminders right now.</p>
            </div>
        `;

        return;
    }

    notificationList.innerHTML = notifications.map(item => {
        const isRead = readIds.includes(item.id);

        return `
            <button
                type="button"
                class="notification-item
                    ${isRead ? "is-read" : "is-unread"}
                    ${item.urgent ? "is-urgent" : ""}"
                data-notification-id="${escapeNotificationText(item.id)}"
                data-section="${item.section}">

                <span class="notification-item-icon">
                    ${item.icon}
                </span>

                <span class="notification-item-content">
                    <span class="notification-item-title">
                        ${escapeNotificationText(item.title)}
                    </span>

                    <span class="notification-item-message">
                        ${escapeNotificationText(item.message)}
                    </span>
                </span>

                ${isRead ? "" : `
                    <span class="notification-unread-dot"></span>
                `}
            </button>
        `;
    }).join("");
}


/* Open / close the panel */

if (notificationBtn && notificationPanel) {
    notificationBtn.addEventListener("click", event => {
        event.stopPropagation();

        const shouldOpen = notificationPanel.hidden;

        updateNotificationUI();

        notificationPanel.hidden = !shouldOpen;

        notificationBtn.setAttribute(
            "aria-expanded",
            String(shouldOpen)
        );
    });
}


/* Click a notification to mark it read and open its section */

if (notificationList) {
    notificationList.addEventListener("click", event => {
        const item = event.target.closest(
            ".notification-item"
        );

        if (!item) return;

        const notificationId = item.dataset.notificationId;
        const section = item.dataset.section;

        const readIds = getReadNotificationIds();

        if (!readIds.includes(notificationId)) {
            readIds.push(notificationId);

            localStorage.setItem(
                notificationStorageKey,
                JSON.stringify(readIds)
            );
        }

        updateNotificationUI();

        if (notificationPanel) {
            notificationPanel.hidden = true;
        }

        if (notificationBtn) {
            notificationBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        const navItem = document.querySelector(
            `.nav-item[data-section="${section}"]`
        );

        if (navItem) {
            navItem.click();
        }
    });
}


/* Mark every current notification as read */

if (markAllNotificationsRead) {
    markAllNotificationsRead.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            const readIds = getReadNotificationIds();

            const allIds = getStudentHubNotifications().map(
                item => item.id
            );

            const updatedIds = [
                ...new Set([...readIds, ...allIds])
            ];

            localStorage.setItem(
                notificationStorageKey,
                JSON.stringify(updatedIds)
            );

            updateNotificationUI();
        }
    );
}


/* Close the dropdown when clicking outside it */

document.addEventListener("click", event => {
    const wrapper = document.querySelector(
        "#dashboard .notification-wrapper"
    );

    if (
        wrapper &&
        !wrapper.contains(event.target) &&
        notificationPanel &&
        notificationBtn
    ) {
        notificationPanel.hidden = true;

        notificationBtn.setAttribute(
            "aria-expanded",
            "false"
        );
    }
});


/* Close the dropdown with Escape */

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        notificationPanel &&
        notificationBtn
    ) {
        notificationPanel.hidden = true;

        notificationBtn.setAttribute(
            "aria-expanded",
            "false"
        );
    }
});


/* Initialize and periodically refresh */

updateNotificationUI();

window.setInterval(
    updateNotificationUI,
    60000
);

// ========================================
// SIDEBAR OPEN / CLOSE TOGGLE
// ========================================

(function () {

    const sidebarToggleButton =
        document.getElementById("sidebarToggle");

    const mainSidebar =
        document.getElementById("mainSidebar");

    if (!sidebarToggleButton || !mainSidebar) {
        return;
    }

    const mobileScreen =
        window.matchMedia("(max-width: 700px)");

    // Start with the sidebar closed on mobile
    if (mobileScreen.matches) {
        document.body.classList.add(
            "sidebar-collapsed"
        );
    }

    // Update the button appearance and accessibility
    function updateSidebarButton() {

        const isClosed =
            document.body.classList.contains(
                "sidebar-collapsed"
            );

        sidebarToggleButton.textContent =
            isClosed ? "☰" : "✕";

        sidebarToggleButton.setAttribute(
            "aria-expanded",
            String(!isClosed)
        );

        sidebarToggleButton.setAttribute(
            "aria-label",
            isClosed ? "Open sidebar" : "Close sidebar"
        );
    }

    // Open and close the sidebar
    sidebarToggleButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "sidebar-collapsed"
            );

            updateSidebarButton();
        }
    );

    // Close the sidebar after choosing a section
    // on mobile phones
    document.querySelectorAll(
        ".nav-item[data-section]"
    ).forEach(function (item) {

        item.addEventListener("click", function () {

            if (mobileScreen.matches) {

                document.body.classList.add(
                    "sidebar-collapsed"
                );

                updateSidebarButton();
            }

        });

    });

    // Adjust the sidebar when switching screen sizes
    mobileScreen.addEventListener("change", function (event) {

        if (event.matches) {
            document.body.classList.add(
                "sidebar-collapsed"
            );
        } else {
            document.body.classList.remove(
                "sidebar-collapsed"
            );
        }

        updateSidebarButton();
    });

    updateSidebarButton();

})();

// ========================================
// STUDENTHUB TO-DO LIST
// ========================================

(function () {

    const storageKey = "studentHubTodoTasks";

    const form = document.getElementById("todoTaskForm");
    const taskInput = document.getElementById("todoTaskInput");
    const dueDateInput = document.getElementById("todoDueDate");
    const priorityInput = document.getElementById("todoPriority");
    const filterInput = document.getElementById("todoFilter");
    const taskList = document.getElementById("todoTaskList");
    const statusText = document.getElementById("todoStatus");

    const totalCount = document.getElementById("todoTotalCount");
    const pendingCount = document.getElementById("todoPendingCount");
    const completedCount = document.getElementById("todoCompletedCount");

    // Load saved tasks safely.
    let tasks = [];

    try {
        const saved = JSON.parse(
            localStorage.getItem(storageKey) || "[]"
        );

        if (Array.isArray(saved)) {
            tasks = saved.filter(function (task) {
                return task &&
                    typeof task.id === "string" &&
                    typeof task.title === "string";
            });
        }
    } catch (error) {
        tasks = [];
    }

    // Avoid running if the To-Do HTML hasn't been added.
    if (
        !form || !taskInput || !dueDateInput ||
        !priorityInput || !filterInput || !taskList
    ) {
        return;
    }

   function saveTasks() {
    try {
        localStorage.setItem(
            storageKey,
            JSON.stringify(tasks)
        );

        // Refresh the Dashboard's upcoming tasks.
        window.dispatchEvent(
            new Event("studentHubTodoUpdated")
        );

        return true;

    } catch (error) {
        showStatus(
            "Couldn't save tasks. Check your browser storage.",
            true
        );

        return false;
    }
}

    function showStatus(message, isError) {
        if (!statusText) return;

        statusText.textContent = message;
        statusText.style.color = isError ? "#dc2626" : "#15803d";
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];
        });
    }

    function todayKey() {
        const now = new Date();

        return now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0");
    }

    function prettyDate(dateString) {
        if (!dateString) return "";

        const parts = dateString.split("-");
        const date = new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );

        return date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function renderTasks() {
        const completed = tasks.filter(task => task.completed).length;
        const pending = tasks.length - completed;

        if (totalCount) totalCount.textContent = tasks.length;
        if (pendingCount) pendingCount.textContent = pending;
        if (completedCount) completedCount.textContent = completed;

        const filter = filterInput.value;

        let visibleTasks = tasks.filter(function (task) {
            if (filter === "pending") return !task.completed;
            if (filter === "completed") return task.completed;
            return true;
        });

        // Tasks with nearer due dates appear first.
        visibleTasks.sort(function (a, b) {
            if (!a.dueDate && !b.dueDate) {
                return (a.createdAt || 0) - (b.createdAt || 0);
            }

            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;

            return a.dueDate.localeCompare(b.dueDate);
        });

        if (visibleTasks.length === 0) {
            let message = "No tasks yet. Add your first task above.";

            if (filter === "pending") {
                message = "Great! You have no pending tasks.";
            } else if (filter === "completed") {
                message = "No completed tasks yet.";
            }

            taskList.innerHTML =
                '<div class="todo-empty">' +
                escapeHtml(message) +
                '</div>';

            return;
        }

        taskList.innerHTML = visibleTasks.map(function (task) {

            let dueLabel = "";

            if (task.dueDate) {
                if (!task.completed && task.dueDate < todayKey()) {
                    dueLabel =
                        '<span class="todo-overdue">Overdue · ' +
                        escapeHtml(prettyDate(task.dueDate)) +
                        '</span>';
                } else if (
                    !task.completed &&
                    task.dueDate === todayKey()
                ) {
                    dueLabel =
                        '<span class="todo-overdue">Due today</span>';
                } else {
                    dueLabel =
                        '<span>Due ' +
                        escapeHtml(prettyDate(task.dueDate)) +
                        '</span>';
                }
            }

            const priority = ["low", "normal", "high"].includes(task.priority)
                ? task.priority
                : "normal";

            return `
                <div class="todo-task ${task.completed ? "completed" : ""}">
                    <input
                        class="todo-check"
                        type="checkbox"
                        data-todo-toggle="${escapeHtml(task.id)}"
                        aria-label="Mark ${escapeHtml(task.title)} as completed"
                        ${task.completed ? "checked" : ""}
                    >

                    <div class="todo-task-info">
                        <span class="todo-task-name">
                            ${escapeHtml(task.title)}
                        </span>

                        <div class="todo-task-meta">
                            <span class="todo-priority priority-${priority}">
                                ${priority.toUpperCase()}
                            </span>
                            ${dueLabel}
                        </div>
                    </div>

                    <button
                        type="button"
                        class="todo-delete-btn"
                        data-todo-delete="${escapeHtml(task.id)}"
                        aria-label="Delete ${escapeHtml(task.title)}">
                        Delete
                    </button>
                </div>
            `;

        }).join("");
    }

    // Sync tasks when completed from the Dashboard.
window.addEventListener(
    "studentHubTodoChangedFromDashboard",
    function () {

        try {
            const savedTasks = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            tasks = Array.isArray(savedTasks)
                ? savedTasks.filter(function (task) {
                    return task &&
                        typeof task.id === "string" &&
                        typeof task.title === "string";
                })
                : [];

        } catch (error) {
            return;
        }

        renderTasks();
    }
);

    // Create a new task.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = taskInput.value.trim();

        if (!title) {
            showStatus("Please enter a task name.", true);
            taskInput.focus();
            return;
        }

        const task = {
            id: Date.now().toString() +
                "-" + Math.random().toString(36).slice(2, 8),
            title: title,
            dueDate: dueDateInput.value,
            priority: priorityInput.value,
            completed: false,
            createdAt: Date.now()
        };

        tasks.push(task);

        if (!saveTasks()) {
            tasks.pop();
            return;
        }

        form.reset();
        priorityInput.value = "normal";
        filterInput.value = "all";

        renderTasks();
        showStatus("Task added successfully.", false);
        taskInput.focus();
    });

    // Mark tasks completed or pending.
    taskList.addEventListener("change", function (event) {
        const checkbox = event.target.closest("[data-todo-toggle]");

        if (!checkbox) return;

        const task = tasks.find(function (item) {
            return item.id === checkbox.dataset.todoToggle;
        });

        if (!task) return;

        const previousValue = task.completed;
        task.completed = checkbox.checked;

        if (!saveTasks()) {
            task.completed = previousValue;
            renderTasks();
            return;
        }

        renderTasks();

        showStatus(
            task.completed
                ? "Task completed. Well done!"
                : "Task marked as pending.",
            false
        );
    });

    // Delete tasks.
    taskList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-todo-delete]");

        if (!button) return;

        const task = tasks.find(function (item) {
            return item.id === button.dataset.todoDelete;
        });

        if (!task) return;

        if (!window.confirm('Delete "' + task.title + '"?')) {
            return;
        }

        const previousTasks = tasks;

        tasks = tasks.filter(function (item) {
            return item.id !== button.dataset.todoDelete;
        });

        if (!saveTasks()) {
            tasks = previousTasks;
            return;
        }

        renderTasks();
        showStatus("Task deleted.", false);
    });

    // Change the visible task list.
    filterInput.addEventListener("change", renderTasks);

    renderTasks();

})();