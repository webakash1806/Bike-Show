export interface Image {
    publicId: string;
    url: string;
}

export interface Colors {
    uniqueId: string;
    colorBikeImg?: Image;
    colorName: string;
    colorCode: string;
    colorScootyImg?: Image,
    img?: string
}

export interface Features {
    uniqueId: string;
    title: string;
    featureImg: Image;
}

export interface BodyDimensions {
    length: string,
    width: string,
    height: string,
    wheelBox: string,
    groundClearance: string,
    seatHeight: string,
    seatLength: string,
    kerbWeight: string,
    fuelCapacity: string,
}

export interface Engine {
    engineType: string,
    displacement: string,
    maxPower: string,
    maxRpm: string,
    maxTorque: string,
    compressionRatio: string,
    bore: string,
    stroke: string,
    startingMethod: string,
    fuelSystem: string,
    airFilterType?: string
    mileage: string,

}


export interface Transmission {
    clutchType: string,
    noOfGears: string,
}

export interface TyresAndBrakes {
    tyreType?: string,
    frontTyre: string,
    rearTyre: string,
    frontBrake: string,
    rearBrake: string,
}

export interface FrameAndSuspension {
    frameType: string,
    frontSuspension: string,
    rearSuspension: string,
}

export interface Electronics {
    headLights: string,
    tailLights: string,
    winkers: string,
    battery: string,
}

export interface Specification {
    bodyDimensions: BodyDimensions,
    engine: Engine,
    transmission: Transmission,
    tyresAndBrakes: TyresAndBrakes,
    frameAndSuspension: FrameAndSuspension,
    electronics: Electronics,
}

export interface Model {
    _id: string,
    bikeModel: string,
    scootyModel: string,
    bike: string,
    scooty: string
}

export interface Helmet {
    _id: string
    helmetType: string
    title: string
    description: string
    helmet: Array<{
        uniqueId: string,
        title: string,
        colorName: string,
        helmetImg: {
            url: string,
            publicId: string
        },
        variant: Array<{
            size: string,
            price: number | null
        }>
    }>
}

export interface ResponseData {
    success: boolean
}

export interface BikeData {
    _id: string
    image: {
        url: string;
        publicId: string
    };
    name: string;
    model: string;
    price: number;
    description: string;
    colors: Colors[]
    features: Features[]
    specification: Specification
    addedBy: string | undefined
    lastModifiedBy: string | undefined
}


export interface User {
    fullName: string
    _id: string
    email: string
    avatar: {
        url: string,
        publicId: string
    }
    role: string
}

export interface FormModel {
    name: string;
    image: {
        url: string;
        publicId: string;
    };
    price: number;
    _id: string;
}

export interface Form {
    _id?: string;
    name: string;
    phoneNumber: string;
    email: string;
    category: string;
    date?: string | number | Date | undefined;
    model: BikeData | undefined;
    status: string;
    createdAt: string;
    dealer: string;
    message: string;
    handledBy: User | undefined;
}

export interface FormResponse {
    testDrive: Form,
    success: boolean
}

export interface AccessoriesData {
    _id: string
    accessoriesType: string,
    model?: Model,
    title: string,
    image: Image,
    price: number | 0,
    description: string
    addedBy: string | undefined
    lastModifiedBy: string | undefined
}