import { expect } from '@esm-bundle/chai';
import { processData, addEventListener } from './LC1DataProcessor'
import { States } from './LC1Data'


describe('should decode the data', () => {

    let state = {}

    addEventListener('update', onUpdate)

    beforeEach(() => {
        state = {};
    })

    function onUpdate({state: newState}) {
        console.log(newState)
        state = newState
    }

    it('the state should be normal with an afr of 14.7', () => {
        processData(0xb2)
        processData(0x82)
        processData(0x43)
        processData(0x13)
        processData(0x03)
        processData(0x74)

        expect(state.stateId).equal(States.Normal)
        expect(state.afr).equal(14.7)
    })

    it('the state should be warmup with a countdown of 66%', () => {
        processData(0xb2);
        processData(0x82);
        processData(0x53)
        processData(0x13)
        processData(0x05)
        processData(0x14)

        expect(state.stateId).equal(States.Warmup)
        expect(state.warmup).equal(66)
    })

    it('the state shoule be error with a code of 9', () => {
        processData(0xb2)
        processData(0x82)
        processData(0x5b)
        processData(0x13)
        processData(0x00)
        processData(0x09)
    })
})