import { initShaderProgram } from '../gl/shaders';
import fragmentSource from '../../assets/fragment.frag?raw';
import vertexSource from '../../assets/vertex.vert?raw';
import { setUniform } from '../gl/unifomrs';
import { mat4 } from 'gl-matrix';

interface UniformLocations {
	modelMatrix: WebGLUniformLocation | null;
	viewMatrix: WebGLUniformLocation | null;
	projectionMatrix: WebGLUniformLocation | null;
}

export class Material {
	private shaderProgram: WebGLProgram;
	private uniformLocations: UniformLocations;

	constructor(private gl: WebGL2RenderingContext) {
		this.shaderProgram = initShaderProgram(gl, vertexSource, fragmentSource);

		this.uniformLocations = {
			modelMatrix: gl.getUniformLocation(this.shaderProgram, 'u_model'),
			viewMatrix: gl.getUniformLocation(this.shaderProgram, 'u_view'),
			projectionMatrix: gl.getUniformLocation(this.shaderProgram, 'u_projection'),
		};
	}

	setUniforms(
		projectionMatrix: mat4,
		modelMatrix: mat4,
		viewMatrix: mat4
	): void {
		this.gl.useProgram(this.shaderProgram);

		setUniform(this.gl, {
			index: this.uniformLocations.projectionMatrix,
			value: projectionMatrix,
		});

		setUniform(this.gl, {
			index: this.uniformLocations.modelMatrix,
			value: modelMatrix,
		});

		setUniform(this.gl, {
			index: this.uniformLocations.viewMatrix,
			value: viewMatrix,
		});
	}
}
