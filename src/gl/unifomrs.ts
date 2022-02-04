export interface UniformConfig {
	index: WebGLUniformLocation | null;
	value: Float32List;
	transpose?: boolean;
}

const defaultConfig = {
	transpose: false,
};

export const setUniform = (
	gl: WebGL2RenderingContext,
	config: UniformConfig
): void => {
	const { index, transpose, value } = {
		...defaultConfig,
		...config,
	};

	gl.uniformMatrix4fv(index, transpose, value);
};
