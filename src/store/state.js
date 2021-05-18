import { convertPureObject } from '~/libs/object';
import defaults from '~/store/defaults';

// set state
let state = convertPureObject(defaults);

// TODO: 테스트를 하여 임시조정
state.usePreference.data = false;


export default state;
