/*
        The Template is made by Pollob Chandra Ray (pollob.cray@gmail.com)
        Idea credit: Colorlib Template

*/




//******************************************************/
//******************** Navbar Menu Effect  *****************/
//****************************************************/
const navLinks = document.querySelectorAll('.nav-link');

// Function to remove active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
}

// Function to add active class to the link of the currently visible section
function setActiveLink() {
    let index = navLinks.length;

    // Loop through each section to check which is currently in view
    while (--index && window.scrollY + 200 < document.querySelector(navLinks[index].getAttribute('href')).offsetTop) {}

    removeActiveClasses();
    navLinks[index].classList.add('active');
}

// Listen to scroll event to trigger the active class update
window.addEventListener('scroll', setActiveLink);

// Initially set the active link when the page loads
setActiveLink();



//******************************************************/
//******************** Typing Effect  *****************/
//****************************************************/
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


//******************************************************/
//******************** Couting Effect  *****************/
//****************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.number');

    const updateCounter = (entry) => {
        const counter = entry.target;
        const target = +counter.getAttribute('data-number');
        const start = 0;
        const duration = 2000; // Duration of the animation in milliseconds
        const stepTime = Math.abs(Math.floor(duration / (target - start)));

        let current = start;
        const timer = setInterval(() => {
            current += 1;
            counter.textContent = current;
            if (current === target) {
                clearInterval(timer);
            }
        }, stepTime);
    };

    const options = {
        threshold: 1.0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter(entry);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});