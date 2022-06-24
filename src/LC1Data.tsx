export const AfrRange = Object.freeze({
	Min: 9,
	Max: 19
})

export type State = {
    stateId: number
    o2?: number
    afr?: number
    lambda?: number
    calibrationCountdown?: number
    errorCode?: number
    warmup?: number
}

export enum States {
	Unknown = -1,
	Normal = 0,
	O2 = 1,
	FreeAirCalibrationInProgress = 2,
	NeedsFreeAirCalibration = 3,
	Warmup = 4,
	HeaterCalibration = 5,
	Error = 6,
	Reserved = 7
}

export const StateDescriptions = Object.freeze({
	[States.Unknown]: 'Unknown',
	[States.Normal]: 'AFR',
	[States.O2]: 'O2',
	[States.FreeAirCalibrationInProgress]: 'Free Air Calibration In Progress',
	[States.NeedsFreeAirCalibration]: 'Free Air Calibration Needed',
	[States.Warmup]: 'Warmup',
	[States.HeaterCalibration]: 'Heater Calibration',
	[States.Error]: 'Error',
	[States.Reserved]: 'Reserved'
})


export enum Errors {
	HeaterShort = 1,
	HeaterOpen = 2,
	PumpShort = 3,
	PumpOpen = 4,
	RefShort = 5,
	RefOpen = 6,
	SoftwareError = 7,
	SensorTiming = 8,
	SupplyLow = 9
}

export const ErrorDescriptions = Object.freeze({
	[Errors.HeaterShort]: 'Heater Circuit Shorted',
	[Errors.HeaterOpen]: 'Heater Circuit Open',
	[Errors.PumpShort]: 'Pump Circuit Shorted',
	[Errors.PumpOpen]: 'Pump Circuit Open',
	[Errors.RefShort]: 'Reference Circuit Shorted',
	[Errors.RefOpen]: 'Reference Circuit Open',
	[Errors.SoftwareError]: 'Software Error',
	[Errors.SensorTiming]: 'Sensor Timing',
	[Errors.SupplyLow]: 'Supply Voltage Low'
})