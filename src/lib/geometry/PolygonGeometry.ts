import { cosD, sinD, getRandomNumber } from '../../gl/math';
import { Geometry, GeometryData } from './Geometry';

export class PolygonGeometry extends Geometry {
	constructor(gl: WebGL2RenderingContext, corners: number) {
		const geometryData = getPolygon(corners);
		super(gl, geometryData);
	}
}

export const getPolygon = (corners: number): GeometryData => {
	const vertices: number[] = [];
	const indices: number[] = [];
	const colors: number[] = [];

	const alpha = 360 / corners;

	vertices.push(0, 0, 0);

	for (let i = 0; i < corners; i++) {
		vertices.push(cosD(alpha * i));
		vertices.push(sinD(alpha * i));
		vertices.push(0);

		indices.push(0);
		indices.push(1 + i);
		indices.push(Math.max(1, (2 + i) % (corners + 1)));

		colors.push(getRandomNumber(0, 1), getRandomNumber(), getRandomNumber(), 1);
	}

	return {
		vertices,
		indices,
		texcoords: [],
		normals: [],
		colors,
	};
};
