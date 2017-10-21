export const loadState = () => load('state')
export const saveState = (state) => save('state', state);
export const clearState = () => remove('state');

export const loadCache = () => load('cache');
export const saveCache = (cache) => save('cache', cache)
export const clearCache = () => remove('cache');

export const load = (key) => {
	try {
		const serializedData = localStorage.getItem(key);
		if (serializedData === null) {
			console.warn("Data was null");
			return undefined
		}
		const data = JSON.parse(serializedData);
		console.log("Loaded data:", data);
		return data
	} catch (err) {
		console.error(err);
		return undefined
	}
}


export const save = (key, data) => {
	console.groupCollapsed(`%clocalStorage.save(${key})`, 'background: #272727; color: gold; padding: 2px');
	console.log("Saving data:", data);
	try {
		const serializedData = JSON.stringify(data);
		localStorage.setItem(key, serializedData);
	} catch (err) {
		//  Ignore write errors.
		console.error(err);
	}
	console.groupEnd()
}


export const remove = (key) => {
	console.log(`%clocalStorage.clear(${key})`, 'background: #272727; color: gold');
	try {
		localStorage.removeItem(key);
	} catch (err) {
		console.error(err);
	}
}
