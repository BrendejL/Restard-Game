import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import nightSky from '../textures/nightSky.png';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const handsUrl = new URL('../models/hands.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const ambientLight = new THREE.AmbientLight(0x333333);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight, ambientLight);

const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper();
scene.add(axesHelper, gridHelper);

//objects
const planeGeomatry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial(
    {color: 0x00FF00,
    side: THREE.DoubleSide}
    
    );
const plane = new THREE.Mesh(planeGeomatry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

camera.position.set (0, 2, 5);

//const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nightSky,
    nightSky,
    nightSky,
    nightSky,
    nightSky,
    nightSky
]);

const assetLoader = new GLTFLoader();
let mixer;
assetLoader.load(handsUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 10);
},undefined, function(error) {
    console.error(error);
});
const animate = () => {
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
};

animate();