/**
 * Sneha Shankur - Developer Portfolio Client Script
 * Implements smooth typography typing, scroll reveal effects, active nav highlighting,
 * responsive navigation drawers, contact validation, and interactive resume mocks.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Toggle Drawer
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });

        // Close menu when nav items are clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       2. Sticky Navbar scroll behavior
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Navbar compression
        if (navbar) {
            if (scrollPos > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back-to-top button visibility
        if (backToTopBtn) {
            if (scrollPos > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // Smooth scroll back to top on click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       3. Typewriter Effect for Hero Subtitle
       ========================================================================== */
    const typingTextElement = document.getElementById('typing-text');
    const titles = [
        "AI & Data Science Student",
        "Python Developer",
        "Software Developer"
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    let deleteDelay = 50;
    let pauseBetweenWords = 2000;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = deleteDelay;
        } else {
            // Add character
            typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100;
        }

        // Handle text fully typed
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeDelay = pauseBetweenWords; // Pause before deleting
        } 
        // Handle text fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length; // Loop to next word
            typeDelay = 500; // Pause before starting to type next word
        }

        setTimeout(typeEffect, typeDelay);
    }

    // Initialize typewriter effect
    setTimeout(typeEffect, 1000);

    /* ==========================================================================
       4. Active Nav Item Highlighting based on scroll viewport
       ========================================================================== */
    const sections = document.querySelectorAll('section');

    function highlightActiveNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for sticky navbar
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    /* ==========================================================================
       5. Scroll Reveal Intersection Observer
       ========================================================================== */
    const revealItems = document.querySelectorAll('.reveal-item');
    const skillCategoryCards = document.querySelectorAll('.skills-category-card');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is a skills card, also trigger the progress bar animation
                if (entry.target.classList.contains('skills-category-card')) {
                    entry.target.classList.add('revealed');
                }
                
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    skillCategoryCards.forEach(card => {
        revealObserver.observe(card);
    });

    /* ==========================================================================
       6. Contact Form validation & Submission handles
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successToast = document.getElementById('form-success-toast');
    const toastCloseBtn = document.getElementById('toast-close-btn');

    if (contactForm && successToast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard POST submit

            // Fetch field inputs
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            // validation checkpoints
            if (!name || !email || !subject || !message) {
                alert('Please fill out all input fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate sending API request ...
            console.log('Sending contact payload:', { name, email, subject, message });

            // Display Toast Overlay on success
            successToast.classList.remove('hidden');
            
            // Clear inputs
            contactForm.reset();
        });

        // Close success toast button
        if (toastCloseBtn) {
            toastCloseBtn.addEventListener('click', () => {
                successToast.classList.add('hidden');
            });
        }
    }

    // Helper regex email checker
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /* ==========================================================================
       7. Interactive Resume Mock Downloader
       ========================================================================== */
    const downloadResumeBtn = document.getElementById('download-resume');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Content profile file data string
            const resumeContent = `
SNEHA SHANKUR
AI & Data Science Student | Python Developer | Software Developer
Email: snehashankur@example.com | Phone: +91 98765 43210
GitHub: https://github.com/SnehaShankur | LinkedIn: https://linkedin.com/in/snehashankur

=========================================
ABOUT ME
=========================================
I am a final-year B.Tech student in Artificial Intelligence and Data Science (2026). 
I enjoy building AI applications, Python projects, and software solutions. 
I have experience with Python, SQL, Java, Flask, Power BI, Machine Learning, and Git.

=========================================
EDUCATION
=========================================
B.Tech – Artificial Intelligence & Data Science
NKOCET | CGPA: 7.05 (2022 - 2026)

=========================================
EXPERIENCE
=========================================
Python Full Stack with Data Analytics Intern
QSpiders | Feb 2026 – Present
- Backend scripting with Flask.
- Relational database schema, index improvements and SQL query builds.
- Visualizing data patterns for transactional feeds.

=========================================
SKILLS & EXPERTISE
=========================================
- Programming: Python, Java, SQL, JavaScript
- Web: HTML, CSS, Flask, Django
- Database: Oracle SQL, MySQL
- Libraries: Pandas, NumPy, TensorFlow, Scikit-learn, OpenCV
- Tools: Git, GitHub, VS Code, Jupyter Notebook, Power BI

=========================================
PROJECTS
=========================================
1. AI-Based Solar Panel Dust Detection System
   Technologies: Python, TensorFlow, CNN, SVM, OpenCV
   Description: Automating dust threshold classification to structure cleaning schedules.

2. Hyper RouteX – AI-Based Traffic Management System
   Technologies: Python, Flask, OpenCV, SQL
   Description: Detecting traffic congestion using computer vision camera feeds for alternate routing.

3. Retail Sales Analytics Dashboard
   Technologies: Power BI, SQL, Excel
   Description: Mapping retail store transaction datasets to dynamic metric dashboards.

=========================================
CERTIFICATIONS
=========================================
- NVIDIA Fundamentals of Deep Learning
- Infosys Springboard Power BI
- Advanced Google Analytics
            `.trim();

            // Create download anchor trigger element
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'Sneha_Shankur_Resume.txt';
            document.body.appendChild(anchor);
            anchor.click();
            
            // Clean-up refs
            document.body.removeChild(anchor);
            URL.revokeObjectURL(url);
            
            console.log('Resume downloaded successfully.');
        });
    }
});
