import { mat4 } from 'gl-matrix';
import { initBuffersAndAttributes } from '../../gl/buffers';
import { drawBufferInfo } from '../../gl/draw';

export interface GeometryData {
	vertices: number[];
	indices: number[];
	texcoords: number[];
	normals: number[];
	colors: number[];
}

export abstract class Geometry {
	public vertexCount: number;
	public vao: WebGLVertexArrayObject;
	public modelViewMatrix: mat4;

	constructor(private gl: WebGL2RenderingContext, geometryData: GeometryData) {
		const bufferInfo = initBuffersAndAttributes(gl, geometryData);

		if (!bufferInfo) throw Error('Could not create Geometry');

		this.vertexCount = bufferInfo.vertexCount;
		this.vao = bufferInfo.vao;
		this.modelViewMatrix = mat4.create();
		mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0, 0, -16.0]);
	}

	draw(): void {
		this.gl.bindVertexArray(this.vao);
		drawBufferInfo(this.gl, this.vertexCount);
	}
}
