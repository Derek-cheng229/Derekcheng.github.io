// ========================================
// 1. 项目数据
// ========================================
const projectsData = [
    {
        title: "Rugby Team Captain",
        description: "Captain of my school's Rugby team. Playing as Hooker for 2 years, leading training sessions and match strategies.",
        image: "rugby.jpg",
        tags: ["Hooker", "Captain", "2 Years"],
        category: "rugby",
        links: [
            { text: "Team Info", url: "#" }
        ]
    },
    {
        title: "American Football - Ireland",
        description: "Captain of the American Football team in Ireland. Playing Defensive Line for 4 years, combining strength and tactical awareness.",
        image: "images/project2.jpg",
        tags: ["DL", "Captain", "4 Years"],
        category: "football",
        links: [
            { text: "Team Info", url: "#" }
        ]
    },
    {
        title: "CNFL - Shanghai Titans",
        description: "Returned to China during summer to compete in CNFL, playing for the Shanghai Titans. Bridging sports cultures between Ireland and China.",
        image: "americanfootball.jpg",
        tags: ["CNFL", "Shanghai Titans", "Summer"],
        category: "football",
        links: [
            { text: "CNFL Info", url: "#" }
        ]
    },
    {
        title: "Piano - 12 Years of Dedication",
        description: "12 years of classical piano training, developing discipline, musicality, and performance confidence. Participated in multiple recitals and competitions.",
        image: "images/piano.jpg",
        tags: ["Piano", "12 Years", "Classical Music"],
        category: "piano",
        links: [
            { text: "Performance Video", url: "#" }
        ]
    },
    {
        title: "Golf - 7 Years on the Course",
        description: "7 years of competitive golf, mastering precision, patience, and mental resilience. Represented school in regional tournaments.",
        image: "aede660291804ab6e5d014c35e8650ec.jpg",
        tags: ["Golf", "7 Years", "Tournaments"],
        category: "golf",
        links: [
            { text: "Tournament Records", url: "#" }
        ]
    }
];

// ========================================
// 2. 滚动动画观察器
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
// 4. 导航栏滚动效果
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
// 5. 手机端菜单
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
// 6. 项目筛选功能
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
// 7. 联系表单
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
// 8. 自动年份
// ========================================
document.getElementById('year').textContent = new Date().getFullYear();

// ========================================
// 9. 数字计数器
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
// 10. 初始化
// ========================================
document.querySelectorAll('.section').forEach(function(el) {
    el.classList.add('reveal');
});

observeRevealElements();

statNumbers.forEach(function(el) {
    statObserver.observe(el);
});

renderProjects('all');
