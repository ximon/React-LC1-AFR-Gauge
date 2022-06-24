import LinearGauge from 'react-canvas-gauges/dist/LinearGauge'

export function WarmupGauge({warmup}) {
    const tickCount = 10
    const ticks = Array.from({length: tickCount + 1}, (_, i) => i * 10)

    return <LinearGauge
                title="Sensor warming up..."
                units='%'
                width={400}
                height={150}
                value={warmup}
                minValue={0}
                maxValue={100}
                majorTicks={ticks}
                minorTicks={2}
                strokeTicks={true}
                highlights={false}
                colorPlate="#121212"
                borderShadowWidth={0}
                borders={false}
                barBeginCircle={false}
                barWidth={10}
                tickSide="left"
                numberSide="left"
                needleSide="left"
                needleType="line"
                needleWidth={3}
                colorBarProgress="rgba(50,200,50,.75)"
                colorNeedle="#777"
                colorNeedleEnd="#777"
                animationDuration={100}
                animationRule="linear"
                animationTarget="plate" />
}