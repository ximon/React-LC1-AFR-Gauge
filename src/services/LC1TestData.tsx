import { States } from './LC1Data'

export function encodeAfr(lambda: number, afrMultiplier: number) {
    const lambdaWord = (lambda * 1000) - 500
    const afByte = (lambdaWord + 500) * afrMultiplier / 1000

    return encode(States.Normal, lambdaWord, afByte)
}

export function encode(state: States, lambdaWord: number, afByte: number) {
    const F2 = (state & 0b100) === 0b100 ? 1 : 0
    const F1 = (state & 0b010) === 0b010 ? 1 : 0
    const F0 = (state & 0b001) === 0b001 ? 1 : 0

    const wordCount = 2

    // bit 15       bit 14          bit 13      bit 12                  bit 11                  bit 10      bit 9
    // 1 for header 1 for recording always 1    1-sensor,0-cmd response 1 if can device can log 1,reserved    length high bit(7)
    const h0 = 0b1011_0010 | ((wordCount & 0x80) >> 7)
    const h1 = 0b1000_0000  | (wordCount & 0x7F)

    //          bit 14       bit 12      bit 11      bit 10        bit 8
    const b0 = 0b0100_0010 | (F2 << 4) | (F1 << 3) | (F0 << 2) | ((afByte & 0x80) >> 7)
    const b1 = afByte & 0x7F
    const b2 = (lambdaWord >> 7) & 0x0F
    const b3 = lambdaWord & 0x7F

    return [h0,h1,b0,b1,b2,b3];

}