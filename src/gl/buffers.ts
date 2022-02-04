import { GeometryData } from '../lib/geometry/Geometry';
import { AttributeLocations } from '../lib/globals';
import { setAttribute } from './attributes';

export interface BufferInfo {
	vertexCount: number;
	vao: WebGLVertexArrayObject;
}

export const initBuffersAndAttributes = (
	gl: WebGL2RenderingContext,
	{ vertices, indices, texcoords, normals, colors }: GeometryData
): BufferInfo | null => {
	const vao = gl.createVertexArray();
	if (!vao) throw Error('Could not create VAO');

	gl.bindVertexArray(vao);

	if (vertices.length) {
		setAttribute(gl, createArrayBuffer(gl, vertices), {
			index: AttributeLocations.position,
			size: 3,
		});
	}

	if (indices.length) {
		createArrayElmBuffer(gl, indices);
	}

	if (texcoords.length) {
		setAttribute(gl, createArrayBuffer(gl, texcoords), {
			index: AttributeLocations.texcoord,
			size: 2,
		});
	}

	if (normals.length) {
		setAttribute(gl, createArrayBuffer(gl, normals), {
			index: AttributeLocations.normal,
			size: 4,
		});
	}

	if (colors.length) {
		setAttribute(gl, createArrayBuffer(gl, colors), {
			index: AttributeLocations.color,
			size: 4,
		});
	}

	gl.bindVertexArray(null);

	return {
		vertexCount: indices.length,
		vao,
	};
};

export const createArrayBuffer = (
	gl: WebGL2RenderingContext,
	arr: number[]
): WebGLBuffer => {
	const buffer = gl.createBuffer();

	if (!buffer) throw Error('Could not create array buffer');

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);

	return buffer;
};

export const createArrayElmBuffer = (
	gl: WebGL2RenderingContext,
	arr: number[]
): WebGLBuffer => {
	const buffer = gl.createBuffer();
	if (!buffer) throw Error('Could not create array element buffer');

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(arr), gl.STATIC_DRAW);

	return buffer;
};
