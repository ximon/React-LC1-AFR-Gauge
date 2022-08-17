import { expect } from '@esm-bundle/chai'

import { States } from './LC1Data'

import { encodeAfr, encode } from './LC1TestData'


describe('should...', () => {

    it('encode the afr properly', () => {

        const lambda = 1
        const afrMultiplier = 14.7

        const bytes = encodeAfr(lambda, afrMultiplier)

        console.log(bytes)

        expect(bytes.length).equal(6)
        expect(bytes[0]).equal(0xb2)
        expect(bytes[1]).equal(0x82)
    })

    it('should encode the error state and code', () =>{

        const bytes = encode(States.Error, 9, 0)

        expect(bytes.length).equal(6)
        expect(bytes[0]).equal(0xb2)
        expect(bytes[1]).equal(0x82)
        expect(bytes[2]).equal(0x5a)
        expect(bytes[3]).equal(0x00)
        expect(bytes[4]).equal(0x00)
        expect(bytes[5]).equal(0x09)
    })
})
