export interface IIndividuallyQoLI {
    filename: string;
    label: string;
    aggregators: IIndividuallyQoLIDimension[];
}

export interface IIndividuallyQoLIDimension {
    filename: string;
    label: string;
    aggregators: IIndividuallyQoLIIndicator[];
}

export interface IIndividuallyQoLIIndicator {
    filename: string;
    label: string;
    negativeState: boolean;
    timeRange: number[];
    units: string;
}
