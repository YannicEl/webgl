import { vec3 } from 'gl-matrix';
import { Camera } from './Camera';

export const defaultKeyboardEventFn = (
	e: KeyboardEvent,
	that: Camera,
	deltaTime: number
): void => {
	const speed = vec3.fromValues(
		0.1 * deltaTime,
		0.1 * deltaTime,
		0.1 * deltaTime
	);

	const temp = vec3.create();
	switch (e.code) {
		case 'KeyW':
		case 'ArrowUp':
			vec3.multiply(temp, speed, that.front);
			vec3.add(that.position, that.position, temp);
			break;

		case 'KeyS':
		case 'ArrowDown':
			vec3.multiply(temp, speed, that.front);
			vec3.subtract(that.position, that.position, temp);
			break;

		case 'KeyD':
		case 'ArrowRight':
			{
				vec3.multiply(temp, speed, that.right);
				vec3.add(that.position, that.position, temp);
			}
			break;

		case 'KeyA':
		case 'ArrowLeft':
			{
				vec3.multiply(temp, speed, that.right);
				vec3.subtract(that.position, that.position, temp);
			}
			break;
	}

	that.updateViewMatrix();
};
