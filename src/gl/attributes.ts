export interface AttributeConfig {
	index: GLuint;
	size: GLint;
	type?: GLenum;
	normalized?: GLboolean;
	stride?: GLsizei;
	offset?: GLsizei;
}

const defaultConfig = {
	normalized: false,
	stride: 0,
	offset: 0,
};

export const setAttribute = (
	gl: WebGL2RenderingContext,
	buffer: WebGLBuffer,
	config: AttributeConfig
): void => {
	const { index, size, type, normalized, stride, offset } = {
		...defaultConfig,
		...{ type: gl.FLOAT },
		...config,
	};

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
	gl.enableVertexAttribArray(index);
};
