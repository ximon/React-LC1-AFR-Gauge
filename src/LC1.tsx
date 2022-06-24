import { AfrRange, State, States } from './LC1Data'
import { processData, addEventListener } from './LC1DataProcessor';

import { Nav } from './components/Nav'

const baudRate = 19200
let port

let eventListeners = new Map<string, Function>()
let direction = 1
let afr = 0


addEventListener('update', dataProcessorUpdate)

function dataProcessorUpdate(stateChange) {
    emit('update', {...stateChange})
}

function ConnectComponent(props) {
    
    async function connect() {
        try {
            port = await navigator.serial.requestPort()

            port.open({baudRate})
        } catch(error) {
            console.dir(error.message ?? error)
        }

        console.log(port)
        console.log(port.getInfo())
    }

    function mockUpdate() {
        processData(0xA2)
        processData(0x81)
        processData(0xE3)
        processData(0x01)
        processData(0x01)
        processData(0x01)
    }

    function updated() {

        
        //Warmup Gauge Testing
        //emit('update', {state:{stateId: States.Warmup, warmup: 55 }, prevState: { stateId: States.Unknown}})
        //return;

        //Error Display Testing
        //emit('update', {state:{stateId: States.Error, errorCode: Errors.SupplyLow }, prevState: { stateId: States.Unknown}})
        //return;

        //AFR Gauge Testing
        if (afr === 0) {
            emit('update', {state:{stateId: States.Normal, afr: 12.5}, prevState: { stateId: States.Unknown}})
            afr = AfrRange.Min
        }

        if (afr >= AfrRange.Max) direction = -.2
        if (afr <= AfrRange.Min) direction = .2

        afr += direction

        if (afr > 0) {
            const state: State = {stateId: States.Normal, afr}
            const prevState: State = { stateId: States.Normal}

            emit('update', {state, prevState})
        }
    }

    function handleNavEvent(navId) {
        if (navId === 'connect') connect()
        if (navId === 'gauge') {}
        if (navId === 'graph') {}
        if (navId === 'mockUpdate') mockUpdate()
    }

    return (
        <div>
            <Nav onNavEvent={handleNavEvent}></Nav>
        </div>
    )
}

function emit(method: string, payload: object = {}) {
    const callback = eventListeners.get(method)

    if (!callback) return

    callback({...payload})
}

function addLC1EventListener(method: string, callback: Function) {
    eventListeners.set(method, callback)
}

async function readData(dataReadyCallback: Function) {

    while (port.readable) {
        const reader = port.readable.getReader()
        try {
          while (true) {
            const { value, done } = await reader.read()

            if (done) {
              // |reader| has been canceled.
              break
            }
            
            dataReadyCallback(value) // Do something with |value|...
          }
        } catch (error) {
          // Handle |error|...
        } finally {
          reader.releaseLock()
        }
      }
}

export {
    ConnectComponent,
    readData as ReadData,
    addLC1EventListener as addEventListener
}