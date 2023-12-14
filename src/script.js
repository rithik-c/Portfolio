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
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

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
  // Hide loader and initialize the scene here
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
const mainContent = document.querySelector('.three-model');

// Initial sizes
const sizes = {
  width: mainContent.clientWidth,
  height: mainContent.clientHeight
};

// Resize event listener
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = mainContent.clientWidth;
  sizes.height = mainContent.clientHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.set(16.4, -15.2, 1.5);
scene.add(camera);


// Controls
const controls = new OrbitControls(camera, canvas);
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
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (mixer) {
    mixer.update(deltaTime);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  // fadePreload()

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

          // Enable scrolling on the body
          document.body.style.overflow = 'visible';
      }, 1000); // This should match the duration of the opacity transition
  }, 1000); // Additional delay after load (2 seconds)
};

