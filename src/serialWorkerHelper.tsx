export function createWorker(rawDataHandler) {

  const worker = new Worker(new URL('./serialWorker', import.meta.url), {type: 'module'}) 
  
  worker.onmessage = (msg) => {

    const {serialData} = msg.data

    if (serialData) {
      const bytes: number[] = Array.from(serialData)

      bytes.forEach(byte => {
        rawDataHandler(byte)
      });
    }
  }

  return worker;
}