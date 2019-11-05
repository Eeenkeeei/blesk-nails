export class NewStatisticGraphic {
    private label: string;
    private fill: boolean;
    private lineTension: number;
    private backgroundColor: any;
    private borderColor: any;
    private borderCapStyle: string;
    private borderDashOffset: number;
    private borderDash: any[];
    private borderJoinStyle: string;
    private pointBorderColor: any;
    private pointBackgroundColor: string;
    private pointBorderWidth: number;
    private pointHoverRadius: number;
    private pointHoverBackgroundColor: any;
    private pointHoverBorderColor: any;
    private pointHoverBorderWidth: number;
    private pointHitRadius: number;
    private pointRadius: number;
    private data: any;
    constructor(monthName: any, data: any, backgroundColor: any, borderColor: any, pointBorderColor: any, pointHoverBackgroundColor: any, pointHoverBorderColor: any) {
        this.label = `Заработок за ${monthName}`;
        this.fill = false;
        this.lineTension = 0.1;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.borderCapStyle = 'butt';
        this.borderDash = [];
        this.borderDashOffset = 0.0;
        this.borderJoinStyle = 'miter';
        this.pointBorderColor = pointBorderColor;
        this.pointBackgroundColor = '#fff';
        this.pointBorderWidth = 1;
        this.pointHoverRadius = 5;
        this.pointHoverBackgroundColor = pointHoverBackgroundColor;
        this.pointHoverBorderColor = pointHoverBorderColor;
        this.pointHoverBorderWidth = 2;
        this.pointRadius = 1;
        this.pointHitRadius = 10;
        this.data = data
    }
}