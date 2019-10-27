export class NewStatisticGraphic {
    constructor(monthName, data, backgroundColor, borderColor, pointBorderColor, pointHoverBackgroundColor, pointHoverBorderColor) {
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