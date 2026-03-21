// Project preview — open in new tab
function openProjectPreview(url) {
  window.open(url, '_blank');
}

// Show More / Show Less projects toggle
function toggleMoreProjects() {
  var container = document.getElementById('more-projects');
  var btnText = document.getElementById('show-more-text');
  var arrow = document.getElementById('show-more-arrow');

  if (container.classList.contains('more-projects-hidden')) {
    container.classList.remove('more-projects-hidden');
    container.classList.add('more-projects-visible');
    btnText.textContent = 'Show Less';
    arrow.style.transform = 'rotate(180deg)';
    AOS.refresh();
  } else {
    container.classList.remove('more-projects-visible');
    container.classList.add('more-projects-hidden');
    btnText.textContent = 'Show More Projects';
    arrow.style.transform = 'rotate(0deg)';
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  }
}

var lastScrollTop; // This Varibale will store the top position
navbar = document.getElementById('navbar'); // Get The NavBar
window.addEventListener('scroll',function(){
 //on every scroll this funtion will be called  
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //This line will get the location on scroll
  if(this.window.innerWidth <= 768)
  if(scrollTop > lastScrollTop){ //if it will be greater than the previous    
    navbar.style.top='-80px';
    //set the value to the negetive of height of navbar 
  }  
  else{
    navbar.style.top='0';
  }  
  lastScrollTop = scrollTop; //New Position Stored
});


//FOr setting toggle menu
var audio = document.getElementById("audioPlayer"),
  loader = document.getElementById("preloader");
function settingtoggle() {
  document
    .getElementById("setting-container")
    .classList.toggle("settingactivate"),
    document
      .getElementById("visualmodetogglebuttoncontainer")
      .classList.toggle("visualmodeshow"),
    document
      .getElementById("soundtogglebuttoncontainer")
      .classList.toggle("soundmodeshow");
}
function playpause() {
  !1 == document.getElementById("switchforsound").checked
    ? audio.pause()
    : audio.play();
}


function visualmode() {
  document.body.classList.toggle("light-mode"),
    document.querySelectorAll(".needtobeinvert").forEach(function (e) {
      e.classList.toggle("invertapplied");
    });
}
window.addEventListener("load", function () {
  (loader.style.display = "none"),
    document.querySelector(".hey").classList.add("popup");
});


let emptyArea = document.getElementById("emptyarea"),
  mobileTogglemenu = document.getElementById("mobiletogglemenu");
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling"),
    document
      .getElementById("mobiletogglemenu")
      .classList.toggle("show-toggle-menu"),
    document
      .getElementById("burger-bar1")
      .classList.toggle("hamburger-animation1"),
    document
      .getElementById("burger-bar2")
      .classList.toggle("hamburger-animation2"),
    document
      .getElementById("burger-bar3")
      .classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
  document.body.classList.toggle("stopscrolling"),
    document
      .getElementById("mobiletogglemenu")
      .classList.remove("show-toggle-menu"),
    document
      .getElementById("burger-bar1")
      .classList.remove("hamburger-animation1"),
    document
      .getElementById("burger-bar2")
      .classList.remove("hamburger-animation2"),
    document
      .getElementById("burger-bar3")
      .classList.remove("hamburger-animation3");
}

const sections = document.querySelectorAll("section"),
  navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
  mobilenavLi = document.querySelectorAll(
    ".mobiletogglemenu .mobile-navbar-tabs-ul li"
  );
window.addEventListener("scroll", () => {
  let e = "";
  sections.forEach((t) => {
    let o = t.offsetTop;
    t.clientHeight, pageYOffset >= o - 200 && (e = t.getAttribute("id"));
  }),
    mobilenavLi.forEach((t) => {
      t.classList.remove("activeThismobiletab"),
        t.classList.contains(e) && t.classList.add("activeThismobiletab");
    }),
    navLi.forEach((t) => {
      t.classList.remove("activeThistab"),
        t.classList.contains(e) && t.classList.add("activeThistab");
    });
}),
  console.log(
    "%c Designed and Developed by Yash Vijay Kucheriya",
    "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;"
  );

//back to top button
let mybutton = document.getElementById("backtotopbutton");
function scrollFunction() {
  document.body.scrollTop > 400 || document.documentElement.scrollTop > 400
    ? (mybutton.style.display = "flex")
    : (mybutton.style.display = "none");
}
function scrolltoTopfunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.onscroll = function () {
  scrollFunction();
};

  // For Pupil follow Animation
let Pupils = document.getElementsByClassName("footer-pupil"),
  pupilsArr = Array.from(Pupils),
  pupilStartPoint = -10,
  pupilRangeX = 20,
  pupilRangeY = 15,
  mouseXStartPoint = 0,
  mouseXEndPoint = window.innerWidth,
  currentXPosition = 0,
  fracXValue = 0,
  mouseYEndPoint = window.innerHeight,
  currentYPosition = 0,
  fracYValue = 0,
  mouseXRange = mouseXEndPoint - mouseXStartPoint;
const mouseMove = (e) => {
    (fracXValue =
      (currentXPosition = e.clientX - mouseXStartPoint) / mouseXRange),
      (fracYValue = (currentYPosition = e.clientY) / mouseYEndPoint);
    let t = pupilStartPoint + fracXValue * pupilRangeX,
      o = pupilStartPoint + fracYValue * pupilRangeY;
    pupilsArr.forEach((e) => {
      e.style.transform = `translate(${t}px, ${o}px)`;
    });
  },
  windowResize = (e) => {
    (mouseXEndPoint = window.innerWidth),
      (mouseYEndPoint = window.innerHeight),
      (mouseXRange = mouseXEndPoint - mouseXStartPoint);
  };
window.addEventListener("mousemove", mouseMove),
  window.addEventListener("resize", windowResize);


// For custom cursor
document.addEventListener('DOMContentLoaded', function() {
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');
  
  if (cursorInner && cursorOuter) {
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    
    // Update mouse coordinates
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Inner cursor follows mouse exactly
      cursorInner.style.left = mouseX + 'px';
      cursorInner.style.top = mouseY + 'px';
});

    // Smooth animation for outer cursor
    function animateOuterCursor() {
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      
      cursorOuter.style.left = outerX + 'px';
      cursorOuter.style.top = outerY + 'px';
      
      requestAnimationFrame(animateOuterCursor);
    }
    
    animateOuterCursor();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-box, .tech-box, [tabindex]');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursorInner.classList.add('hover');
        cursorOuter.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', function() {
        cursorInner.classList.remove('hover');
        cursorOuter.classList.remove('hover');
      });
    });
  }
});


