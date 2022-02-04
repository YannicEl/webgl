import { mat4 } from 'gl-matrix';
import { Object3D } from './Object3D';
import { Geometry } from './geometry/Geometry';
import { Material } from './Material';

export class Mesh extends Object3D {
	constructor(public geometry: Geometry, public material: Material) {
		super();
	}

	draw(projectionMatrix: mat4, viewMatrix: mat4): void {
		this.material.setUniforms(projectionMatrix,  this.modelMatrix, viewMatrix);

		this.geometry.draw();
	}
}
