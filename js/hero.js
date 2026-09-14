import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const container = document.getElementsByClassName("hero")[0];
const camera = new THREE.PerspectiveCamera(15, container.clientWidth / container.clientHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1;
container.appendChild(renderer.domElement);

const rotationAngle = Math.PI / 5;
const pointerRotationSmooth = 12;

let touchControls = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = touchControls;
if (touchControls) {
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.3;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxAzimuthAngle = rotationAngle;
    controls.minAzimuthAngle = -rotationAngle;
    controls.maxPolarAngle = Math.PI / 2 + rotationAngle;
    controls.minPolarAngle = Math.PI / 2 - rotationAngle;
}

const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator( renderer );

scene.environment = pmremGenerator.fromScene( environment ).texture;
scene.environmentIntensity = 1;

let model;
const loader = new GLTFLoader();
loader.load( '/assets/handheld.glb', function (gltf) {
    scene.add(gltf.scene);
    model = gltf.scene.children[0];

    if (touchControls) {
        model.rotation.y = 0;
        model.rotation.x = 0;
    } else {
        model.rotation.y = -0.4;
        model.rotation.x = -0.25;
    }

    let body = model.children[0];
    let display = model.children[1];
    body.material.aoMapIntensity = 1.3;

    const video = document.getElementsByClassName("hero-video")[0];
    video.play();
    const videoTexture = new THREE.VideoTexture( video );
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.flipY = false;
    display.material = new THREE.MeshPhysicalMaterial({ map: videoTexture, roughness: 0.1, ior: 1 });
});

camera.position.z = 9.75;
if (touchControls) {
    controls.update();
}

let mouseX = 0;
let mouseY = 0;
let mouseMoved = false;
window.addEventListener('pointermove', function (e) {
    if (!document.hasFocus()) {
        return;
    } else if (!mouseMoved) {
        mouseMoved = true;
    }
    mouseX = Math.max(Math.min((e.clientX / window.innerWidth) * 2 - 1, 1), -1);
    mouseY = Math.max(Math.min((e.clientY / window.innerHeight) * -2 + 1, 1), -1);
});

const clock = new THREE.Clock();
let deltaTime = 0;
function animate() {
    if (touchControls) {
        controls.update();
    } else if (model != null && mouseMoved) {
        deltaTime = Math.min(clock.getDelta(), 1/30);
        model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, mouseX * rotationAngle, pointerRotationSmooth * deltaTime);
        model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, mouseY * -rotationAngle, pointerRotationSmooth * deltaTime);
    }
    renderer.render(scene, camera);

    if (saveNextFrame) {
        saveRender();
        saveNextFrame = false;
    }
}

const renderMode = false;
let saveNextFrame = false;
document.addEventListener('keydown', function(event) {
    if (!renderMode) {
        return;
    }
    if (event.key === 'p' || event.key === 'P') {
        saveNextFrame = true;
    }
});

function saveRender() {
    const screenshot = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
    let a = document.createElement('a');
    a.href = screenshot;
    a.download = "render.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

window.onresize = function() { resize() };
function resize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
