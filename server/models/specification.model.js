import { model, Schema } from "mongoose";

const bodyDimensions = {
    length: {
        type: String,
        default: ""
    },
    width: {
        type: String,
        default: ""
    },
    height: {
        type: String,
        default: ""
    },
    wheelBox: {
        type: String,
        default: ""
    },
    groundClearance: {
        type: String,
        default: ""
    },
    seatHeight: {
        type: String,
        default: ""
    },
    seatLength: {
        type: String,
        default: ""
    },
    kerbWeight: {
        type: String,
        default: ""
    },
    fuelCapacity: {
        type: String,
        default: ""
    },
}

const engine = {
    engineType: {
        type: String,
        default: ""
    },
    mileage: {
        type: String,
        default: ""
    },
    displacement: {
        type: String,
        default: ""
    },
    maxPower: {
        type: String,
        default: ""
    },
    maxRpm: {
        type: String,
        default: ""
    },
    maxTorque: {
        type: String,
        default: ""
    },
    compressionRatio: {
        type: String,
        default: ""
    },
    bore: {
        type: String,
        default: ""
    },
    stroke: {
        type: String,
        default: ""
    },
    startingMethod: {
        type: String,
        default: ""
    },
    fuelSystem: {
        type: String,
        default: ""
    },
}

const transmission = {
    clutchType: {
        type: String,
        default: ""
    },
    noOfGears: {
        type: String,
        default: ""
    },
}

const tyresAndBrakes = {
    frontTyre: {
        type: String,
        default: ""
    },
    rearTyre: {
        type: String,
        default: ""
    },
    frontBrake: {
        type: String,
        default: ""
    },
    rearBrake: {
        type: String,
        default: ""
    }
}

const frameAndSuspension = {
    frameType: {
        type: String,
        default: ""
    },
    frontSuspension: {
        type: String,
        default: ""
    },
    rearSuspension: {
        type: String,
        default: ""
    }
}

const electronics = {
    headLights: {
        type: String,
        default: ""
    },
    tailLights: {
        type: String,
        default: ""
    },
    winkers: {
        type: String,
        default: ""
    },
    battery: {
        type: String,
        default: ""
    },
}

const bikeSpecification = Schema({
    bike: {
        type: Schema.Types.ObjectId,
        ref: "Bike",
        required: true
    },
    bodyDimensions: bodyDimensions,
    engine: engine,
    transmission: transmission,
    tyresAndBrakes: tyresAndBrakes,
    frameAndSuspension: frameAndSuspension,
    electronics: electronics
})

const scootySpecification = Schema({
    scooty: {
        type: Schema.Types.ObjectId,
        ref: "Scooty",
        required: true
    },
    bodyDimensions: bodyDimensions,
    engine: {
        airFilterType: {
            type: String,
            default: ""
        },
        ...engine
    },
    tyresAndBrakes: {
        tyreType: {
            type: String,
            default: ""
        },
        ...tyresAndBrakes
    },
    transmission: transmission,
    frameAndSuspension: frameAndSuspension,
    electronics: electronics
})

const BikeSpecification = model('BikeSpecification', bikeSpecification)
const ScootySpecification = model('ScootySpecification', scootySpecification)

export { BikeSpecification, ScootySpecification }