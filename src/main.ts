import './style.css';

import { PolygonGeometry } from './lib/geometry/PolygonGeometry';
import { Scene } from './lib/Scene';
import { Camera } from './lib/camera/Camera';
import { Material } from './lib/Material';
import { Mesh } from './lib/Mesh';
import { CubeGeometry } from './lib/geometry/CubeGeometry';
import { defaultMouseEventFn } from './lib/camera/handleMouseEvent';
import { defaultKeyboardEventFn } from './lib/camera/handleKeyboardEvent';
import { mat4, vec3 } from 'gl-matrix';
import { degToRad } from './gl/math';
import { ObjGeometry } from './lib/geometry/ObjGeometry';
import objString from '../assets/monkey.obj?raw';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl = canvas.getContext('webgl2');
if (!gl) throw Error('WebGL 2 not supported');

const fpsElm = document.getElementById('fps');
if (!fpsElm) throw Error('Fuck off');

let mouseLock = false;
let deltaTime = 0;

canvas.onclick = () => canvas.requestPointerLock();
document.onpointerlockchange = () =>
	(mouseLock = document.pointerLockElement === canvas);

canvas.onmousemove = (e) => mouseLock && defaultMouseEventFn(e, camera);
document.onkeydown = (e) =>
	mouseLock && defaultKeyboardEventFn(e, camera, deltaTime);

const scene = new Scene(gl);

const camera = new Camera();
camera.updateConfig({ aspect: gl.canvas.clientWidth / gl.canvas.clientHeight });
scene.setCamera(camera);

const material = new Material(gl);

const polygon = new PolygonGeometry(gl, 6);
const polygonMesh = new Mesh(polygon, material);
mat4.translate(polygonMesh.modelMatrix, polygonMesh.modelMatrix, [3, 0, -6]);
scene.addMesh(polygonMesh);

const objGeometry = new ObjGeometry(gl, objString);
const objMesh = new Mesh(objGeometry, material);
scene.addMesh(objMesh);

// const cubePositions = [
// 	vec3.fromValues(0, 0, 0),
// 	vec3.fromValues(2, 5, -15),
// 	vec3.fromValues(-1.5, 2.2, -2.5),
// 	vec3.fromValues(-3.8, -2, -12.3),
// 	vec3.fromValues(2.4, -0.4, -3.5),
// 	vec3.fromValues(-1.7, 3, -7.5),
// 	vec3.fromValues(1.3, -2, -2.5),
// 	vec3.fromValues(1.5, 2, -2.5),
// 	vec3.fromValues(1.5, 0.2, -1.5),
// 	vec3.fromValues(-1.3, 1, -1.5),
// ];

// cubePositions.forEach((pos) => {
// 	const cube = new CubeGeometry(gl);
// 	const cubeMesh = new Mesh(cube, material);
// 	mat4.translate(cubeMesh.modelMatrix, cubeMesh.modelMatrix, pos);
// 	// const angle = 20 * i;
// 	// mat4.rotateX(cubeMesh.modelMatrix, cubeMesh.modelMatrix, degToRad(angle));
// 	// mat4.rotateY(cubeMesh.modelMatrix, cubeMesh.modelMatrix, degToRad(angle));
// 	// mat4.rotateZ(cubeMesh.modelMatrix, cubeMesh.modelMatrix, degToRad(angle));
// 	scene.addMesh(cubeMesh);
// });

const draw = (lastFrame: number, thisFrame: number) => {
	deltaTime = thisFrame - lastFrame;

	scene.draw();

	const fps = 1000 / deltaTime;
	fpsElm.innerHTML = `${fps.toFixed()} fps`;

	window.requestAnimationFrame((now) => draw(thisFrame, now));
};

window.requestAnimationFrame((now) => draw(0, now));
