import { Camera } from './Camera';

export const defaultMouseEventFn = (
	{ movementX, movementY }: MouseEvent,
	that: Camera
): void => {
	const sensitivity = 0.3;

	that.yaw += movementX * sensitivity;
	that.pitch -= movementY * sensitivity;

	if (that.pitch > 89) that.pitch = 89;
	if (that.pitch < -89) that.pitch = -89;

	that.updateViewMatrix();
};
