// AI Pulse Blog - Interactive Features
// ====================================

document.addEventListener('DOMContentLoaded', function() {
  initializeFeatures();
});

function initializeFeatures() {
  smoothScrolling();
  newsletterHandling();
  scrollToTopButton();
  articleFiltering();
  mobileMenuToggle();
  readTimeCalculator();
  themeToggle();
  animateOnScroll();
}

// 1. Smooth Scrolling for Navigation Links
function smoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 2. Newsletter Form Handling
function newsletterHandling() {
  const form = document.querySelector('.newsletter-form');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const button = this.querySelector('button');
    
    // Email validation
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Disable button and show loading state
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    
    // Simulate form submission
    setTimeout(() => {
      showNotification('Successfully subscribed! Check your email.', 'success');
      emailInput.value = '';
      button.disabled = false;
      button.textContent = originalText;
    }, 1500);
  });
}

// 3. Scroll to Top Button
function scrollToTopButton() {
  const scrollTop = document.createElement('button');
  scrollTop.innerHTML = '↑';
  scrollTop.className = 'scroll-to-top';
  scrollTop.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollTop);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTop.style.display = 'flex';
    } else {
      scrollTop.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 4. Article Filtering by Category
function articleFiltering() {
  const articles = document.querySelectorAll('.post-card');
  
  if (articles.length === 0) return;
  
  // Create filter buttons dynamically
  const categories = new Set();
  articles.forEach(article => {
    const tag = article.querySelector('.post-tag');
    if (tag) {
      categories.add(tag.textContent.trim());
    }
  });
  
  if (categories.size === 0) return;
  
  // Create filter container
  const filterContainer = document.createElement('div');
  filterContainer.className = 'article-filters';
  
  const filterLabel = document.createElement('span');
  filterLabel.className = 'filter-label';
  filterLabel.textContent = 'Filter: ';
  filterContainer.appendChild(filterLabel);
  
  // Add "All" button
  const allButton = document.createElement('button');
  allButton.textContent = 'All';
  allButton.className = 'filter-btn active';
  allButton.addEventListener('click', () => filterArticles('all'));
  filterContainer.appendChild(allButton);
  
  // Add category buttons
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category;
    btn.className = 'filter-btn';
    btn.addEventListener('click', () => filterArticles(category));
    filterContainer.appendChild(btn);
  });
  
  // Insert before article grid
  const articleGrid = document.querySelector('.article-grid');
  if (articleGrid) {
    articleGrid.parentNode.insertBefore(filterContainer, articleGrid);
  }
}

function filterArticles(category) {
  const articles = document.querySelectorAll('.post-card');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Update active button
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === category || (category === 'all' && btn.textContent === 'All')) {
      btn.classList.add('active');
    }
  });
  
  // Filter articles with animation
  articles.forEach(article => {
    const tag = article.querySelector('.post-tag');
    const articleCategory = tag ? tag.textContent.trim() : '';
    
    if (category === 'all' || articleCategory === category) {
      article.style.display = 'block';
      article.style.animation = 'fadeIn 0.3s ease-in';
    } else {
      article.style.display = 'none';
    }
  });
}

// 5. Mobile Menu Toggle
function mobileMenuToggle() {
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  
  if (!nav) return;
  
  // Create hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  
  // Insert hamburger before nav (for mobile view)
  header.insertBefore(hamburger, nav);
  
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    hamburger.classList.toggle('open');
  });
  
  // Close menu when link clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      hamburger.classList.remove('open');
    });
  });
}

// 6. Read Time Calculator
function readTimeCalculator() {
  const articles = document.querySelectorAll('.post-card');
  const wordsPerMinute = 200;
  
  articles.forEach(article => {
    const content = article.querySelector('p');
    if (!content) return;
    
    const wordCount = content.textContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    
    const readTimeSpan = article.querySelector('.post-bottom span:last-child');
    if (readTimeSpan) {
      readTimeSpan.textContent = `${readTime} min read`;
    }
  });
}

// 7. Dark/Light Theme Toggle
function themeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
  
  const nav = document.querySelector('.site-nav');
  if (nav) {
    nav.insertBefore(themeToggle, nav.firstChild);
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// 8. Animate Elements on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.post-card, .overview-card, .insight-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// Utility Functions
// ==================

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out forwards';
  }, 10);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Search functionality (for future implementation)
function searchArticles(query) {
  const articles = document.querySelectorAll('.post-card');
  const lowerQuery = query.toLowerCase();
  
  articles.forEach(article => {
    const title = article.querySelector('h3').textContent.toLowerCase();
    const description = article.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// Analytics tracking helper
function trackEvent(eventName, eventData = {}) {
  console.log(`Event: ${eventName}`, eventData);
  // Can be integrated with analytics service
}

// Export for external use
window.AIBlog = {
  filterArticles,
  searchArticles,
  trackEvent
};
