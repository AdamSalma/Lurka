export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined
	}
}


export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		//  Ignore write errors.
		console.error(err);
	}
}


export const clearState = () => {
	console.log("clearState()");
	try {
		localStorage.removeItem('state');
	} catch (err) {
		console.error(err);
	}
}

// Cache
export const loadCache = () => {
	try {
		const serializedCache = localStorage.getItem('cache');
		if (serializedCache === null) {
			return undefined
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined
	}
}


export const saveCache = (cache) => {
	try {
		const serializedCache = JSON.stringify(state);
		localStorage.setItem('cache', serializedCache);
	} catch (err) {
		//  Ignore write errors.
		console.error(err);
	}
}


export const clearCache = () => {
	console.log("clearCache()");
	try {
		localStorage.removeItem('cache');
	} catch (err) {
		console.error(err);
	}
}
