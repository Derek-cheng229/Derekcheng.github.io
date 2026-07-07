// ========================================
// 1. 项目数据（直接在这里修改你的项目信息）
// ========================================
const projectsData = [
    {
        title: "Plant Species Classifier",
        description: "A machine learning model using TensorFlow that classifies 50+ plant species from photos with 92% accuracy.",
        image: "images/project1.jpg",
        tags: ["Python", "TensorFlow", "Computer Vision"],
        category: "ai",
        links: [
            { text: "GitHub", url: "https://github.com/yourusername/plant-classifier" },
            { text: "Demo", url: "#" }
        ]
    },
    {
        title: "StudyTracker App",
        description: "A cross-platform mobile app built with React Native that helps students manage assignments and deadlines.",
        image: "images/project2.jpg",
        tags: ["React Native", "Firebase"],
        category: "web",
        links: [
            { text: "GitHub", url: "https://github.com/yourusername/study-tracker" }
        ]
    },
    {
        title: "Air Quality Research",
        description: "Independent research analyzing PM2.5 data across 20 cities, identifying correlations with traffic patterns.",
        image: "images/project3.jpg",
        tags: ["Data Analysis", "Python", "Research"],
        category: "research",
        links: [
            { text: "Paper", url: "#" }
        ]
    }
];

// ========================================
// 2. 滚动动画观察器（提前定义，避免报错）
// ========================================
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

function observeRevealElements() {
    var reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function(el) {
        revealObserver.observe(el);
    });
}

// ========================================
// 3. 动态渲染项目卡片
// ========================================
function renderProjects(filter) {
    filter = filter || 'all';
    var grid = document.getElementById('projects-grid');

    // 安全检查：如果找不到元素就退出
    if (!grid) {
        console.error('错误：找不到 id="projects-grid" 的元素');
        return;
    }

    grid.innerHTML = '';

    var filtered = filter === 'all'
        ? projectsData
        : projectsData.filter(function(p) { return p.category === filter; });

    filtered.forEach(function(project, index) {
        var card = document.createElement('div');
        card.className = 'project-card reveal';
        card.style.transitionDelay = (index * 0.1) + 's';

        var tagsHTML = project.tags
            .map(function(tag) { return '<span>' + tag + '</span>'; })
            .join('');

        var linksHTML = project.links
            .map(function(link) {
                return '<a href="' + link.url + '" target="_blank" rel="noopener">' + link.text + ' →</a>';
            })
            .join('');

        card.innerHTML =
            '<div class="project-img-wrapper">' +
                '<img src="' + project.image + '" alt="' + project.title + '" class="project-img" loading="lazy">' +
            '</div>' +
            '<div class="project-info">' +
                '<h3>' + project.title + '</h3>' +
                '<p class="project-desc">' + project.description + '</p>' +
                '<div class="project-tags">' + tagsHTML + '</div>' +
                '<div class="project-links">' + linksHTML + '</div>' +
            '</div>';

        grid.appendChild(card);
    });

    observeRevealElements();
}

// ========================================
// 4. 页面加载时立即渲染项目
// ========================================
renderProjects('all');
// ========================================
// 5. 导航栏滚动效果 + 当前页面高亮
// ========================================
var navbar = document.getElementById('navbar');
var navLinks = document.querySelectorAll('.nav-links a');
var sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    var current = '';
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 6. 手机端菜单开关
// ========================================
var mobileToggle = document.getElementById('mobile-toggle');
var navLinksList = document.getElementById('nav-links');

mobileToggle.addEventListener('click', function() {
    navLinksList.classList.toggle('active');
});

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navLinksList.classList.remove('active');
    });
});

// ========================================
// 7. 项目筛选功能（这就是你缺失的部分！）
// ========================================
var filterButtons = document.querySelectorAll('.filter-btn');
var filterContainer = document.getElementById('project-filters');

filterContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        renderProjects(e.target.dataset.filter);
    }
});

// ========================================
// 8. 联系表单提交
// ========================================
var contactForm = document.getElementById('contact-form');
var formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name && email && message) {
        formStatus.textContent = '✓ Thank you, ' + name + '! Your message has been sent.';
        formStatus.style.color = '#10b981';
        contactForm.reset();
    } else {
        formStatus.textContent = '✗ Please fill in all fields.';
        formStatus.style.color = '#ef4444';
    }
});

// ========================================
// 9. 自动填充当前年份
// ========================================
document.getElementById('year').textContent = new Date().getFullYear();

// ========================================
// 10. 数字计数器动画
// ========================================
var statNumbers = document.querySelectorAll('.stat-number');
var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

function animateCounter(el) {
    var target = parseInt(el.dataset.target);
    var current = 0;
    var duration = 1500;
    var stepTime = 30;
    var steps = duration / stepTime;
    var increment = target / steps;

    var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ========================================
// 11. 给各板块加滚动动画 + 启动计数器
// ========================================
document.querySelectorAll('.section').forEach(function(el) {
    el.classList.add('reveal');
});

observeRevealElements();

statNumbers.forEach(function(el) {
    statObserver.observe(el);
});
