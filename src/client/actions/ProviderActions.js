import Axios from 'axios';
import {
    PROVIDER_CHANGE, 
} from '../constants';



export function changeProvider({ provider }) {
	console.error("Action changeProvider() to " + provider);
	return dispatch => {
		dispatch(() => {
			return {
				type: PROVIDER_CHANGE,
				payload: provider
			}
		})
	}	
}