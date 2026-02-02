// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('intro-video');
    const videoContainer = document.getElementById('video-container');
    const videoOverlay = document.getElementById('video-overlay');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');

    // Video event listeners
    video.addEventListener('ended', function() {
        // When video ends, pause it and show overlay with buttons
        video.pause();
        videoOverlay.classList.remove('hidden');
        videoOverlay.classList.add('show');
    });

    // Handle video errors
    video.addEventListener('error', function(e) {
        console.error('Video error:', e);
        // If video fails to load, show overlay immediately
        showMainContent();
    });

    // Optional: Skip video on click (for testing or user preference)
    video.addEventListener('click', function() {
        video.pause();
        videoOverlay.classList.remove('hidden');
        videoOverlay.classList.add('show');
    });

    // Ensure video plays (some browsers require user interaction)
    video.play().catch(function(error) {
        console.log('Autoplay prevented:', error);
        // Show overlay if autoplay is blocked
        videoOverlay.classList.remove('hidden');
        videoOverlay.classList.add('show');
    });

    // Initialize sidebar toggle
    initializeSidebar();
});

// Sidebar functionality
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            toggleSidebar();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    sidebar.classList.toggle('active');
    sidebarToggle.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    sidebar.classList.remove('active');
    sidebarToggle.classList.remove('active');
    sidebarOverlay.classList.remove('active');
}

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    // Hide video container and show main content
    const videoContainer = document.getElementById('video-container');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');
    
    videoContainer.classList.add('fade-out');
    
    setTimeout(function() {
        videoContainer.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
        
        // Show header when main content is displayed
        if (header) {
            header.classList.remove('hidden');
            header.classList.add('show');
        }
        
        // Scroll to the requested section
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 1000);
}

// Show main content directly (used when video fails)
function showMainContent() {
    const videoContainer = document.getElementById('video-container');
    const mainContent = document.getElementById('main-content');
    const videoOverlay = document.getElementById('video-overlay');
    const header = document.getElementById('header');
    
    videoContainer.classList.add('fade-out');
    videoOverlay.classList.remove('hidden');
    videoOverlay.classList.add('show');
    
    setTimeout(function() {
        videoContainer.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
        
        // Show header when main content is displayed
        if (header) {
            header.classList.remove('hidden');
            header.classList.add('show');
        }
    }, 1000);
}

// Smooth scroll behavior for all internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Add scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
