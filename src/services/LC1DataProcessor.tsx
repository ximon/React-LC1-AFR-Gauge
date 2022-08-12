import { State, States, Errors, AfrRange} from './LC1Data'

const INITIAL_PACKETCOUNT = 2
const PACKET_CHECK = [ 0xB2, 0x80, 0x42, 0x00, 0x00, 0x00 ]



const eventListeners = new Map<string, Function>()


let state: State = { stateId: States.Unknown }
let prevState: State = { stateId: States.Unknown }

let packet: number[] = [] //current packet data
let packetIndex = 0 //index of current packet
let packetCount = INITIAL_PACKETCOUNT //number of packets expected
let wordCount = 0 //number of words expected

function processData(data: number)
{
    const checkData = PACKET_CHECK[packetIndex]
    const waitingOnPackets = () => packetIndex < packetCount

    if (waitingOnPackets())
    {
        if (packetIndex === 0)
            wordCount = data & 0b00000001
        
        if (packetIndex === 1)
        {
            wordCount += data & 0b01111111
            packetCount = (wordCount + 1) * 2         //+1 for the header word, * 2 for bytes
        }

        //if the incoming data isn't as expected then reset and wait
        if (checkData !== 0x00 && (data & checkData) !== checkData)
        {
            packet = []
            packetIndex = 0
            packetCount = INITIAL_PACKETCOUNT
            wordCount = 0

            return
        }
    
        packet[packetIndex] = data // Store buffer data to packet in series
        packetIndex++              // all else are data packets, increment the packet counter by one
    }
    
    if (waitingOnPackets()) //skip the rest until we've collected all the packets
        return

    const validPacketReceived = packetIndex === packetCount

    if (validPacketReceived)
    {
        packetCount = INITIAL_PACKETCOUNT
        packetIndex = 0
        parsePackets()
    }
}

function parsePackets()
{
    const stateId = (packet[2] & 0b00011100) >> 2  // F2-F0
    const afrMultiplier = ((packet[2] & 0b00000001) << 7) + (packet[3] & 0b01111111)           // AF7, AF6-AF0
    const lambdaWord = ((packet[4] & 0b00111111) << 7) + (packet[5] & 0b01111111)        // L12-L7, L6-L0  

    prevState = {...state};
    state = {stateId: stateId};

    switch(stateId)
    {
        case States.Warmup:
            state = {...state, warmup: lambdaWord / 10}
            break

        case States.O2:
            state = {...state, o2: lambdaWord / 10}
            break

        case States.Normal:
            const lambda = (lambdaWord + 500) / 1000
            const afr = lambda * (afrMultiplier / 10) //AFR = ((L12..L0) + 500) * (AF7..AF0) / 10000

            state = {
                ...state,
                lambda,
                afr
            }
            break

        case States.HeaterCalibration:
            state = {...state, calibrationCountdown: lambdaWord}
            break

        case States.Error:
            state = {...state, errorCode: lambdaWord}
            break
    }
    
    emit('update', {state, prevState})
}


function emit(method: string, payload: object) {
    const callback = eventListeners.get(method)
      
    if(!callback) return

    callback({...payload});
}

function addLC1DataProcessorEventListener(method: string, callback: Function) {
    eventListeners.set(method, callback)
}
function removeEventListener(method: string) {
    eventListeners.delete(method)
}

export { 
    processData,
    addLC1DataProcessorEventListener as addEventListener
}