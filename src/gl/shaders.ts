export const loadShader = (
	gl: WebGL2RenderingContext,
	type: GLenum,
	source: string
): WebGLShader | null => {
	const shader = gl.createShader(type);

	if (!shader) return null;

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.info(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
};

export const initShaderProgram = (
	gl: WebGL2RenderingContext,
	vsSource: string,
	fsSource: string
): WebGLProgram => {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	if (!vertexShader) throw Error('Could not create vertex shader');

	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
	if (!fragmentShader) throw Error('Could not create fragment shader');

	const shaderProgram = gl.createProgram();
	if (!shaderProgram) throw Error('Could not create shader program');

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.info(gl.getProgramInfoLog(shaderProgram));
		gl.deleteProgram(shaderProgram);
		throw Error('Could not link program');
	}

	return shaderProgram;
};
