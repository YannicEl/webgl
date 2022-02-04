export const { PI } = Math;

export const radiansToDegree = (radians: number): number => {
	return (radians * 180) / PI;
};

export const degToRad = (degree: number): number => {
	return (degree * PI) / 180;
};

export const getRandomNumber = (min = 0, max = 1): number => {
	return Math.random() * (max - min) + min;
};

export const cosD = (degree: number): number => {
	return Math.cos(degToRad(degree));
};

export const sinD = (degree: number): number => {
	return Math.sin(degToRad(degree));
};
