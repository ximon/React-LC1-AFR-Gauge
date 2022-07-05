import { AfrRange } from '../services/LC1Data'

import RadialGauge from 'react-canvas-gauges/dist/RadialGauge'

export function AfrGauge({afr}) {
    const tickCount = (AfrRange.Max - AfrRange.Min) + 1
    const ticks = Array.from({length: tickCount}, (_, i) => (AfrRange.Min-1) + i+1)

    return <RadialGauge
            title='AFR'
            value={afr}
            height={300}
            colorPlate="#121212"
            minValue={AfrRange.Min}
            maxValue={AfrRange.Max}
            majorTicks={ticks}
            minorTicks={5}
            animationDuration={50}
            animationRule='linear'
            borders={false}
            borderShadowWidth={0}
            needleCircleInner={true}
            needleCircleOuter={false}
            highlights={[
            { "from": AfrRange.Min, "to": 10.5, "color": "rgba(255,30,0,.5)" },
            { "from": 10.5, "to": 12, "color": "rgba(255,255,0,.5)" },
            { "from": 12, "to": 14, "color": "rgba(0,255,0,.5)" },
            { "from": 14, "to": AfrRange.Max, "color": "rgba(255,30,0,.5)" },
            ]} />
}