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
    ? (mybutton.style.display = "block")
    : (mybutton.style.display = "none");
}
function scrolltoTopfunction() {
  (document.body.scrollTop = 0), (document.documentElement.scrollTop = 0);
}
(window.onscroll = function () {
  scrollFunction();
}),
  document.addEventListener(
    "contextmenu",
    function (e) {
      "IMG" === e.target.nodeName && e.preventDefault();
    },
    !1
  );

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

// Elemental Echo video play/pause functionality
function toggleElementalVideoPlayback() {
  const video = document.getElementById('elemental-video');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const button = document.querySelector('.media-toggle-btn');
  
  if (video.paused) {
    // Play the video
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    button.setAttribute('aria-label', 'Pause video');
  } else {
    // Pause the video
    video.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    button.setAttribute('aria-label', 'Play video');
  }
}

// ScioScribe video play/pause functionality
function toggleScioScribeVideoPlayback() {
  const video = document.getElementById('scioscribe-video');
  const playIcon = document.getElementById('scioscribe-play-icon');
  const pauseIcon = document.getElementById('scioscribe-pause-icon');
  const button = document.querySelector('#scioscribe-video').parentElement.querySelector('.media-toggle-btn');
  
  if (video.paused) {
    // Play the video
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    button.setAttribute('aria-label', 'Pause ScioScribe demo');
  } else {
    // Pause the video
    video.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    button.setAttribute('aria-label', 'Play ScioScribe demo');
  }
}

// SilentSort video play/pause functionality
function toggleSilentSortVideoPlayback() {
  const video = document.getElementById('silentsort-video');
  const playIcon = document.getElementById('silentsort-play-icon');
  const pauseIcon = document.getElementById('silentsort-pause-icon');
  const button = document.querySelector('#silentsort-video').parentElement.querySelector('.media-toggle-btn');
  
  if (video.paused) {
    // Play the video
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    button.setAttribute('aria-label', 'Pause SilentSort demo');
  } else {
    // Pause the video
    video.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    button.setAttribute('aria-label', 'Play SilentSort demo');
  }
}

// Auto-update play/pause icon and add click-to-play functionality
document.addEventListener('DOMContentLoaded', function() {
  // Elemental Echo video setup
  const elementalVideo = document.getElementById('elemental-video');
  const elementalPlayIcon = document.getElementById('play-icon');
  const elementalPauseIcon = document.getElementById('pause-icon');
  const elementalButton = document.querySelector('.media-toggle-btn');
  
  if (elementalVideo && elementalPlayIcon && elementalPauseIcon && elementalButton) {
    // Allow clicking on video to play/pause
    elementalVideo.addEventListener('click', function(e) {
      e.preventDefault();
      toggleElementalVideoPlayback();
    });
    
    elementalVideo.addEventListener('ended', function() {
      elementalPlayIcon.style.display = 'block';
      elementalPauseIcon.style.display = 'none';
      elementalButton.setAttribute('aria-label', 'Play video');
    });
    
    // Also handle when video is paused by other means
    elementalVideo.addEventListener('pause', function() {
      if (!elementalVideo.ended) {
        elementalPlayIcon.style.display = 'block';
        elementalPauseIcon.style.display = 'none';
        elementalButton.setAttribute('aria-label', 'Play video');
      }
    });
    
    elementalVideo.addEventListener('play', function() {
      elementalPlayIcon.style.display = 'none';
      elementalPauseIcon.style.display = 'block';
      elementalButton.setAttribute('aria-label', 'Pause video');
    });
  }

  // ScioScribe video setup
  const scioScribeVideo = document.getElementById('scioscribe-video');
  const scioScribePlayIcon = document.getElementById('scioscribe-play-icon');
  const scioScribePauseIcon = document.getElementById('scioscribe-pause-icon');
  const scioScribeButton = scioScribeVideo ? scioScribeVideo.parentElement.querySelector('.media-toggle-btn') : null;
  
  if (scioScribeVideo && scioScribePlayIcon && scioScribePauseIcon && scioScribeButton) {
    // Allow clicking on video to play/pause
    scioScribeVideo.addEventListener('click', function(e) {
      e.preventDefault();
      toggleScioScribeVideoPlayback();
    });
    
    scioScribeVideo.addEventListener('ended', function() {
      scioScribePlayIcon.style.display = 'block';
      scioScribePauseIcon.style.display = 'none';
      scioScribeButton.setAttribute('aria-label', 'Play ScioScribe demo');
    });
    
    // Also handle when video is paused by other means
    scioScribeVideo.addEventListener('pause', function() {
      if (!scioScribeVideo.ended) {
        scioScribePlayIcon.style.display = 'block';
        scioScribePauseIcon.style.display = 'none';
        scioScribeButton.setAttribute('aria-label', 'Play ScioScribe demo');
      }
    });
    
    scioScribeVideo.addEventListener('play', function() {
      scioScribePlayIcon.style.display = 'none';
      scioScribePauseIcon.style.display = 'block';
      scioScribeButton.setAttribute('aria-label', 'Pause ScioScribe demo');
    });
  }

  // SilentSort video setup
  const silentSortVideo = document.getElementById('silentsort-video');
  const silentSortPlayIcon = document.getElementById('silentsort-play-icon');
  const silentSortPauseIcon = document.getElementById('silentsort-pause-icon');
  const silentSortButton = silentSortVideo ? silentSortVideo.parentElement.querySelector('.media-toggle-btn') : null;
  
  if (silentSortVideo && silentSortPlayIcon && silentSortPauseIcon && silentSortButton) {
    // Allow clicking on video to play/pause
    silentSortVideo.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSilentSortVideoPlayback();
    });
    
    silentSortVideo.addEventListener('ended', function() {
      silentSortPlayIcon.style.display = 'block';
      silentSortPauseIcon.style.display = 'none';
      silentSortButton.setAttribute('aria-label', 'Play SilentSort demo');
    });
    
    // Also handle when video is paused by other means
    silentSortVideo.addEventListener('pause', function() {
      if (!silentSortVideo.ended) {
        silentSortPlayIcon.style.display = 'block';
        silentSortPauseIcon.style.display = 'none';
        silentSortButton.setAttribute('aria-label', 'Play SilentSort demo');
      }
    });
    
    silentSortVideo.addEventListener('play', function() {
      silentSortPlayIcon.style.display = 'none';
      silentSortPauseIcon.style.display = 'block';
      silentSortButton.setAttribute('aria-label', 'Pause SilentSort demo');
    });
  }
});

