import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import GUI from "lil-gui";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Initialize EmailJS
emailjs.init("ctSkcPGlFR3OLfFa0");

// Function to send email
function sendEmail() {
  emailjs.sendForm("service_pzq1wvc", "template_9x1e6lf", form).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      form.reset();
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Add event listener to form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (form.checkValidity()) {
    this.contact_number.value = (Math.random() * 100000) | 0;
    sendEmail(); // Call sendEmail function when form is valid
    Swal.fire({
      title: "Email Sent!",
      text: "I'll get back to you soon :)",
      icon: "success",
      confirmButtonColor: "#8451f3",
      color: "#FFF",
    });
  }
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
document.getElementById("toolkit").addEventListener("click", () => {
  document.getElementById("resume").click();
});


function handleMediaQueryChange(e) {
  if (e.matches) {
      // If media query matches (min-width: 1250px)
      document.getElementById("sidebar-info").addEventListener("click", () => {
          document.getElementById("info_more-btn").click();
      });
  }
}

// Create a MediaQueryList object
const mediaQuery = window.matchMedia("(max-width: 1250px)");

// Add a listener that will run when the media query status changes
mediaQuery.addListener(handleMediaQueryChange);

// Run the function initially to set up the event listener based on the current state
handleMediaQueryChange(mediaQuery);


/**
 * Constants
 */
const mainContent = document.querySelector('.three-model');

// Initial sizes
const sizes = {
  width: mainContent.clientWidth,
  height: mainContent.clientHeight
};

/**
 * Three.js Media Queries
 */
let finalPosition;
let cameraPosX;
let cameraPosY;
let loaded = false
let isMediaQueryMatched = false;
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
const canvas = document.querySelector("canvas.webgl");
const controls = new OrbitControls(camera, canvas);

const largeMedia = window.matchMedia("(min-width: 1024px)");
const mediumMedia = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
const smallMedia = window.matchMedia("(min-width: 580px) and (max-width: 767px)");
const tinyMedia = window.matchMedia("(max-width: 579px)");

var pcParagraph = document.getElementById('pc-p2');
var mobileParagraph = document.getElementById('mobile-p2');
var serviceSection = document.getElementById('service');
var threeModel = document.getElementById('three-model');

function handleLargeMediaQuery(e) {
  if (e.matches) {
    finalPosition = new THREE.Vector3(24, -15.2, 1.5);
    camera.position.set(24, -15.2, 1.5);
    isMediaQueryMatched = true;
    cameraPosX = 24;
    cameraPosY = 23;
    if (loaded) tick();
    controls.target.y = 0.9;

    pcParagraph.style.display = 'block';
    mobileParagraph.style.display = 'none';
    serviceSection.style.top = '-5vh';
    threeModel.style.height = '45vh';
    // console.log("large");
  }
}

function handleMediumMediaQuery(e) {
  if (e.matches) {
    finalPosition = new THREE.Vector3(25.4, -15.2, 1.5);
    camera.position.copy(finalPosition);
    isMediaQueryMatched = true;
    cameraPosX = 27;
    cameraPosY = 26;
    if (loaded) tick();
    controls.target.y = 0.9;

    pcParagraph.style.display = 'block';
    mobileParagraph.style.display = 'none';
    serviceSection.style.top = '-5vh';
    threeModel.style.height = '35vh';
    // console.log("medium");
  }
}

function handleSmallMediaQuery(e) {
  if (e.matches) {
    finalPosition = new THREE.Vector3(23, -15.2, 1.5);
    camera.position.copy(finalPosition);
    isMediaQueryMatched = true;
    cameraPosX = 23;
    cameraPosY = 22;
    if (loaded) tick();
    
    setTimeout(() => {
      controls.target.y = 1.3;
      controls.update();
    }, 100);

    pcParagraph.style.display = 'none';
    mobileParagraph.style.display = 'block';
    serviceSection.style.top = '30px';
    threeModel.style.height = '25vh';
    // console.log("small");
  }
}

function handleTinyMediaQuery(e) {
  if (e.matches) {
    finalPosition = new THREE.Vector3(23, -15.2, 1.5);
    camera.position.copy(finalPosition);
    isMediaQueryMatched = true;
    cameraPosX = 23;
    cameraPosY = 23;
    if (loaded) tick();

    setTimeout(() => {
      controls.target.y = 1.3;
      controls.update();
    }, 100);

    pcParagraph.style.display = 'none';
    mobileParagraph.style.display = 'block';
    serviceSection.style.top = '30px';
    threeModel.style.height = '25vh';
    // console.log("tiny");
  }
}

largeMedia.addListener(handleLargeMediaQuery);
mediumMedia.addListener(handleMediumMediaQuery);
smallMedia.addListener(handleSmallMediaQuery);
tinyMedia.addListener(handleTinyMediaQuery);

// Invoke handlers directly to set initial state
handleLargeMediaQuery(largeMedia);
handleMediumMediaQuery(mediumMedia);
handleSmallMediaQuery(smallMedia);
handleTinyMediaQuery(tinyMedia);



const image = document.getElementById('center-image');

function startAnimation() {
  image.style.zIndex = '0';
  image.classList.add('fade-in-out');
}

image.addEventListener('animationend', () => {
  image.style.zIndex = '-1';
});


/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
// Moved to Three.js Media Queries

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
manager.onLoad = function () {
  console.log('All assets loaded.');
  fadePreload()
};
manager.onError = function (url) {
  console.log('There was an error loading ' + url);
};

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader(manager);
gltfLoader.setDRACOLoader(dracoLoader);

let mixer = null;

gltfLoader.load("./models/desktop_pc/new_scene.glb", (gltf) => {
    scene.add(gltf.scene);
  },
  (xhr) => {
    // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    // Loading screen or progress bar here
    // fadePreload()
  },
  (error) => {
    console.error('An error happened', error);
  }
);

/**
 * Lights
 */
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0.15);
scene.add(hemisphereLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(-20, 50, 10);
spotLight.angle = 0.12;
spotLight.penumbra = 1;
spotLight.intensity = 1;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

/**
 * Sizes
 */
// Moved to Three.js Media Queries

// Resize event listener
isMediaQueryMatched = false;
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = mainContent.clientWidth;
  sizes.height = mainContent.clientHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  // Check if a media query match has occurred and update camera position
  if (isMediaQueryMatched) {
    // camera.position.copy(finalPosition);
    isMediaQueryMatched = false; // Reset the flag
  }

  // Update renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});



/**
 * Camera
 */
// Base camera
// Moved to Three.js Media Queries
scene.add(camera);


// Controls
controls.enableDamping = true;
controls.enableZoom = false; // Disables zooming
controls.maxPolarAngle = Math.PI / 2.3; // Limit the polar angle
controls.minPolarAngle = Math.PI / 2.3; // Limit the polar angle
controls.target.set(0, 0.9, 1.5);

// gui.add(camera.position, 'x', -40, 40, 0.1);
// gui.add(camera.position, 'y', -40, 40, 0.1);
// gui.add(camera.position, 'z', -40, 40, 0.1);

// gui.add(controls.target, 'x', -8, 8, 0.1);
// gui.add(controls.target, 'y', -8, 8, 0.1);
// gui.add(controls.target, 'z', -8, 8, 0.1);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


/**
 * Rotation Animation Setup
 */
let isRotating = false;
let rotationDuration = 5000; // Duration of the rotation in milliseconds
let rotationStartTime;
let minRotations = 0;

function startModelRotation() {
    isRotating = true;
    rotationStartTime = Date.now();
}

function easeOutQuad(t) {
  const scale = 0.8; // Scale down the range to 0.8 (1 - 0.2)
  let result = 0.2 + (scale * (3 * t) * (1 - t))
  return result < 0.4 ? 0.4 : result;
  // return 0.1;
}

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

// let finalPosition = new THREE.Vector3(16.4, -15.2, 1.5);
let targetAngle = Math.atan2(finalPosition.z, finalPosition.x); // Calculate the target angle
let isCloseToTarget = false;
let angle = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (mixer) {
      mixer.update(deltaTime);
  }

  if (isRotating && loaded) {
      let elapsedRotationTime = Date.now() - rotationStartTime;
      let rotationFraction = elapsedRotationTime / rotationDuration;

      let easedSpeed = easeOutQuad(rotationFraction);

      let deltaAngle = easedSpeed * deltaTime * 5; // Adjust '5' to control max speed
      angle += deltaAngle;

      // const angle = easedFraction * Math.PI * 5;
      camera.position.x = cameraPosX * Math.sin(angle); // Adjust radius to fit your model
      camera.position.z = cameraPosY * Math.cos(angle);
      camera.lookAt(scene.position); // Assuming the model is at the scene's origin

      let currentAngle = Math.atan2(camera.position.z, camera.position.x);
      isCloseToTarget = Math.abs(currentAngle - targetAngle) < 0.025; // Check if close to target angle

      if (isCloseToTarget) {
        minRotations += 1;
        if (minRotations == 1) {
          isRotating = false;
          startAnimation();
        }
      }
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  if (!loaded) setTimeout(2000);
  loaded = true;

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function fadePreload() {

  // Wait for the full load plus an additional delay
  setTimeout(function() {
      var overlayDiv = document.querySelector('.preload-page');

      // Start the fade out
      overlayDiv.style.opacity = '0';

      // Wait for the fade-out transition to finish
      setTimeout(function() {
          // Now hide the div
          overlayDiv.style.display = 'none';

          
        }, 1000); // This should match the duration of the opacity transition
        // Enable scrolling on the body
        document.body.style.overflow = 'visible';
        
        const event = new Event('resize');
        window.dispatchEvent(event);
      startModelRotation();
  }, 1000); // Additional delay after load (1 second)
  
};

