import { mat4 } from 'gl-matrix';
import { clear } from '../gl/render';
import { Camera } from './camera/Camera';
import { Mesh } from './Mesh';

export class Scene {
	public camera: Camera;
	public meshes: Mesh[];

	public mouse: { x: number; y: number } = { x: 0, y: 0 };

	constructor(private gl: WebGL2RenderingContext) {
		this.camera = new Camera();
		this.meshes = [];
	}

	addMesh(mesh: Mesh): void {
		this.meshes.push(mesh);
	}

	setCamera(camera: Camera): void {
		this.camera = camera;
	}

	draw(): void {
		clear(this.gl);

		const projectionMatrix = this.camera.getProjectionMatrix();
		const viewMatrix = this.camera.getViewMatrix();

		this.meshes.forEach((mesh) => mesh.draw(projectionMatrix, viewMatrix));
	}
}
