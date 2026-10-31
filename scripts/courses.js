const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Select HTML elements
const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");

// Display courses dynamically
function displayCourses(courseArray) {

    // Clear previous courses
    courseList.innerHTML = "";

    // Display each course
    courseArray.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const courseName = document.createElement("h3");
        courseName.textContent = `${course.subject} ${course.number}`;

        const courseTitle = document.createElement("p");
        courseTitle.textContent = course.title;

        const courseCredits = document.createElement("p");
        courseCredits.textContent = `${course.credits} Credits`;

        const courseStatus = document.createElement("p");
        courseStatus.textContent = course.completed
            ? "✓ Completed"
            : "In Progress";

        card.appendChild(courseName);
        card.appendChild(courseTitle);
        card.appendChild(courseCredits);
        card.appendChild(courseStatus);

        courseList.appendChild(card);

    });

    // Calculate total credits using reduce()
    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = `Total Credits: ${totalCredits}`;
}

// Select filter buttons
const allButton = document.querySelector("#all-courses");
const wddButton = document.querySelector("#wdd-courses");
const cseButton = document.querySelector("#cse-courses");

// Function to update the active filter
function updateActiveButton(activeButton) {

    [allButton, wddButton, cseButton].forEach(button => {
        button.classList.remove("active-filter");
        button.setAttribute("aria-pressed", "false");
    });

    activeButton.classList.add("active-filter");
    activeButton.setAttribute("aria-pressed", "true");
}

// Display all courses
allButton.addEventListener("click", () => {

    displayCourses(courses);
    updateActiveButton(allButton);

});

// Display WDD courses
wddButton.addEventListener("click", () => {

    const wddCourses = courses.filter(course =>
        course.subject === "WDD"
    );

    displayCourses(wddCourses);
    updateActiveButton(wddButton);

});

// Display CSE courses
cseButton.addEventListener("click", () => {

    const cseCourses = courses.filter(course =>
        course.subject === "CSE"
    );

    displayCourses(cseCourses);
    updateActiveButton(cseButton);

});

// Initial display
displayCourses(courses);
updateActiveButton(allButton);