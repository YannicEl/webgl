export interface Vec3 {
	x: number;
	y: number;
	z: number;
}

/**
 *  Creates a new Vec3 either from values or default
 *
 * @param x X value of new Vector (default 0)
 * @param y Y value of new Vector (default 0)
 * @param z Z value of new Vector (default 0)
 * @returns new Vec3
 */
export const vec3 = (x?: number, y?: number, z?: number): Vec3 => ({
	x: x || 0,
	y: y || 0,
	z: z || 0,
});

// add
export const vec3add = (a: Vec3, b: Vec3): Vec3 => {
	return vec3(a.x + b.x, a.y + b.y, a.z + b.z);
};

// subtract
export const vec3subtract = (a: Vec3, b: Vec3): Vec3 => {
	return vec3(a.x - b.x, a.y - b.y, a.z - b.z);
};

// multiply
export const vec3multiply = (a: Vec3, b: Vec3): Vec3 => {
	return vec3(a.x * b.x, a.y * b.y, a.z * b.z);
};

export const vec3divide = (a: Vec3, b: Vec3): Vec3 => {
	return vec3(a.x * b.x, a.y * b.y, a.z * b.z);
};

// normalize
export const vec3normalize = (a: Vec3): Vec3 => {
	const magnitude = vec3magnitude(a);
	return vec3(a.x / magnitude, a.y / magnitude, a.z / magnitude);
};

// magnitude
export const vec3magnitude = (a: Vec3): number => {
	return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
};
