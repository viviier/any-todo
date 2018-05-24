export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state')
		if(serializedState === null) return undefined;
		return JSON.parse(serializedState)
	} catch (err) {
		return undefined
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch (err) {
		console.log('保存失败')
	}
}

// lang
export const splitArr = (arr, len) => {
	let res = [];
	for (let i = 0; i < arr.length; i+=len) {
		res.push(arr.slice(i, i+len));
	}

	return res;
}