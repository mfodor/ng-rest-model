import {FetchMode} from './FetchMode';

describe('FetchMode', () => {

    it('values should not be changed', () => {
        expect(FetchMode.LAZY).toBe('lazy');
        expect(FetchMode.EAGER).toBe('eager');
    });

});
