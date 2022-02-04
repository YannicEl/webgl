export const drawBufferInfo = (
	gl: WebGL2RenderingContext,
	vertexCount: number
) => {
	const type = gl.UNSIGNED_SHORT;
	const offset = 0;
	gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
};
