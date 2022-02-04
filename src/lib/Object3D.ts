import { mat4 } from 'gl-matrix';

export abstract class Object3D {
	public modelMatrix: mat4;

	constructor() {
		this.modelMatrix = mat4.identity(mat4.create());
	}
}
