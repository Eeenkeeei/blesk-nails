import React from 'react'
import { Chart } from 'react-charts'

export const MyChart = (props) => {
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: props.data
            },
        ],
        [props.data]
    );

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    );

    return (
        <div
            style={{
                width: '100%',
                height: '300px'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>
    )
}