import { mat4, vec3 } from 'gl-matrix';
import { cosD, degToRad, sinD } from '../../gl/math';

export interface CameraConfig {
	fov?: number;
	aspect?: number;
	near?: number;
	far?: number;
}

export class Camera {
	public position = vec3.fromValues(0, 0, 3);
	public front = vec3.fromValues(0, 0, -1);
	public worldUp = vec3.fromValues(0, 1, 0);
	public right = vec3.create();
	public up = vec3.create();

	public yaw = -90;
	public pitch = 0;

	public viewMatrix: mat4;
	public projectionMatrix: mat4;

	constructor(
		private fov = 60,
		private aspect = 1,
		private near = 1,
		private far = 2000
	) {
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
		this.updateViewMatrix();
	}

	getViewMatrix(): mat4 {
		return mat4.lookAt(
			this.viewMatrix,
			this.position,
			vec3.add(vec3.create(), this.position, this.front),
			this.up
		);
	}

	getProjectionMatrix(): mat4 {
		return mat4.perspective(
			this.projectionMatrix,
			degToRad(this.fov),
			this.aspect,
			this.near,
			this.far
		);
	}

	updateConfig({ fov, aspect, near, far }: CameraConfig): void {
		if (fov) this.fov = fov;
		if (aspect) this.aspect = aspect;
		if (near) this.near = near;
		if (far) this.far = far;
	}

	updateViewMatrix(): void {
		vec3.normalize(
			this.front,
			vec3.fromValues(
				cosD(this.yaw) * cosD(this.pitch),
				sinD(this.pitch),
				sinD(this.yaw) * cosD(this.pitch)
			)
		);

		vec3.normalize(
			this.right,
			vec3.cross(vec3.create(), this.front, this.worldUp)
		);
		vec3.normalize(this.up, vec3.cross(vec3.create(), this.right, this.front));
	}
}
