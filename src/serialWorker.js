"use strict";
let port;
onmessage = async function (msg) {
    if (msg.data === 'connect') {
        [port] = await navigator.serial.getPorts();
        console.log("connecting to port: ", port);
        port.open({ baudRate: 19200 });
        console.log("serial connected!");
        setTimeout(async () => { await read(); }, 100);
    }
};
async function read() {
    while (port.readable) {
        const reader = port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock();
                    break;
                }
                if (value) {
                    const msg = {
                        serialData: Array.from(value)
                    };
                    postMessage(msg);
                }
            }
        }
        catch (error) {
            // TODO: Handle non-fatal read error.
        }
    }
}
//# sourceMappingURL=serialWorker.js.map