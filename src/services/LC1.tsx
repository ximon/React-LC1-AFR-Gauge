import { AfrRange, State, States, StateChange } from './LC1Data'
import { processData, addEventListener } from './LC1DataProcessor';

let eventListeners = new Map<string, Function>()

addEventListener('update', dataProcessorUpdate)

function dataProcessorUpdate(stateChange: StateChange) {
    emit('update', {...stateChange})
}


export function mockUpdate() {
    processData(0xb2)
    processData(0x82)
    processData(0x43)
    processData(0x13)
    processData(0x03)
    processData(0x74)
}

function emit(method: string, payload: object = {}) {
    const callback = eventListeners.get(method)

    if (!callback)
        return

    callback({...payload})
}

function addLC1EventListener(method: string, callback: Function) {
    eventListeners.set(method, callback)
}


export {
    //readData as ReadData,
    addLC1EventListener as addEventListener
}