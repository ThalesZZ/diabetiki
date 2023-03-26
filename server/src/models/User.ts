export class User {
	id: string;
	name: string;
	healthProfile: HealthProfile;

	constructor({ id, name, healthProfile }: User) {
		this.id = id;
		this.name = name;
		this.healthProfile = healthProfile;
	}
}

export interface HealthProfile {
	glucoseThresholds: GlucoseThresholds;
	insulinSensitivity: InsulinSensitivity;
}

export interface GlucoseThresholds {
	hypoglycemia: number;
	low: number;
	target: number;
	high: number;
	hyperglycemia: number;
}

export interface InsulinSensitivity {
	carbohydrate: number;
	glucose: number;
}
