let port


onmessage = async function(msg) {

    if (msg.data === 'connect') {
        [port] = await navigator.serial.getPorts()

        console.log("connecting to port: ", port)
        postMessage('connected')
    }

    if (msg.data === 'start') {
        port.open({baudRate: 19200})
        console.log("serial connected!")

        await read()

        postMessage('disconnected')
    }

}

async function read() {

    while (port.readable) {
        const reader = port.readable.getReader()
        
        try {
            while (true) {
                const { value, done } = await reader.read()
                if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock()
                    break
                }
                if (value) {
                    postMessage(`rx:[${value}]`)
                }
            }
        } catch (error) {
            // TODO: Handle non-fatal read error.
        }
    }
}
