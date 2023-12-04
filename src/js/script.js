import * as THREE from 'three';

const renderer = new THREE.WebGLRenderList();

renderer.setSize(window.innerHeight, window.innerWidth);

document.body.appendChild(renderer.domElement);
