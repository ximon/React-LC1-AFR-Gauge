import { expect } from '@esm-bundle/chai';

import { processData, addEventListener } from './LC1DataProcessor'


it('should decode the state as normal and the afr as 14.7', () => {
    addEventListener('update', onUpdate)

    function onUpdate({state, prevState}) {
        console.log(state)
        expect(state.afr).to.equal(14.7)
        expect(state.stateId).to.equal(0)
    }

    processData(0xb2)
    processData(0x82)
    processData(0x43)
    processData(0x13)
    processData(0x03)
    processData(0x74)
})