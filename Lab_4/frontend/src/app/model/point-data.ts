export type PointRequest = {
    x: string;
    y: string;
    r: string;
}

export type PointResponse = {
    x: string;
    y: string;
    r: string;
    result: boolean;
    requestTime: Date;
    executionTime: string;
}