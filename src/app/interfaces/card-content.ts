export interface CardContent {
    id: string;
    value: string;
    type: string;
    position: ElementPosition;
    childIds: string[]
}

interface ElementPosition {
    x: number;
    y: number
}