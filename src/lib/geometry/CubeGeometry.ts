import { getRandomNumber } from '../../gl/math';
import { Geometry, GeometryData } from './Geometry';

export class CubeGeometry extends Geometry {
	constructor(gl: WebGL2RenderingContext) {
		const geometryData = getCube();
		super(gl, geometryData);
	}
}

export const getCube = (): GeometryData => {
	const vertices: number[] = [
    // TOP LEFT FRONT
    -1, 1,  1,

    // TOP RIGHT FRONT
    1,  1,  1,

    // BOTTOM LEFT FRONT
    -1, -1, 1,

    // BOTTOM RIGHT FRONT
    1,  -1, 1,

    // TOP LEFT BACK
    -1, 1, -1,

    // TOP RIGHT BACK
    1,  1,  -1,

    // BOTTOM LEFT BACK
    -1, -1, -1,

    // BOTTOM RIGHT BACK
    1,  -1, -1
  ];

	const indices: number[] = [
    // FRONT
    0,  1,  2,
    1,  2,  3,

    // RIGHT
    1,  5,  3,
    5,  3,  7,

    // BACK
    5,  4,  7,
    4,  7,  6,

    // LEFT
    4,  0,  6,
    0,  6,  2,

    // TOP
    4,  5,  0,
    5,  0,  1,

    // BOTTOM
    3,  2,  7,
    2,  7,  6

  ];

  const colors: number[] = []
  for (let i = 0; i <indices.length; i++) {
    colors.push(getRandomNumber(0, 1))

    if(i % 2 === 2) {
      colors.push(getRandomNumber(0, 1))
    }
  }


	return {
		vertices,
		indices,
		texcoords: [],
		normals: [],
		colors,
	};
};
