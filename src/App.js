import './App.css';
import RadialGauge from 'react-canvas-gauges/dist/RadialGauge';

function App() {
  return (
    <div className="App">
      <RadialGauge
        units=''
        title='AFR'
        value={14.7}
        height={300}
        minValue={8}
        maxValue={20}
        majorTicks={['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']}
        minorTicks={5}
        highlights={[
          { "from": 8, "to": 9, "color": "rgba(255,30,0,.25)" },
          { "from": 9, "to": 10.5, "color": "rgba(255,30,0,.25)" },
          { "from": 10.5, "to": 12, "color": "rgba(255,255,0,.25)" },
          { "from": 12, "to": 14, "color": "rgba(0,255,0,.15)" },
          { "from": 14, "to": 20, "color": "rgba(255,30,0,.25)" },
        ]}
      />

    </div>
  );
}

export default App;
