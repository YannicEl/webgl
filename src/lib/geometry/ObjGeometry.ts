import { getRandomNumber } from '../../gl/math';
import { Geometry, GeometryData } from './Geometry';

export class ObjGeometry extends Geometry {
	constructor(gl: WebGL2RenderingContext, objStr: string) {
		const geometryData = parseObjFile(objStr);
		super(gl, geometryData);
	}
}

export const parseObjFile = (obj: string): GeometryData => {
	const vertices: number[] = [];
	const indices: number[] = [];
	const texcoords: number[] = [];
	const normals: number[] = [];

	const lines = obj.split('\n');

	lines.forEach((line) => {
		const trimmed = line.trim();
		const [keyword, ...parts] = trimmed.split(' ');

		switch (keyword) {
			case '#':
				break;

			case 'v':
				vertices.push(...parts.map((e) => Number(e)));
				break;

			case 'vt':
				texcoords.push(...parts.map((e) => Number(e)));
				break;

			case 'vn':
				normals.push(...parts.map((e) => Number(e)));
				break;

			case 'f':
				indices.push(...parts.map((e) => Number(e.charAt(0)) - 1));
				break;

			default:
				break;
		}
	});

	const colors: number[] = [];
	for (let i = 0; i < indices.length; i++) {
		colors.push(getRandomNumber(0, 1));

		if (i % 2 === 2) {
			colors.push(getRandomNumber(0, 1));
		}
	}

	console.log('vertices', vertices.length);
	console.log('indices', indices.length);

	return {
		vertices,
		indices,
		texcoords,
		normals,
		colors,
	};
};
