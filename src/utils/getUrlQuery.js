/**
 * getUrlQuery
 *  解析url的search，返回一个键值对的对象query
 *  @param {string} search （eg. ?id=1&name=lestat）
 *  @return {object} return the query （eg. {id: 1, name: lestat}）
 **/
const getUrlQuery = (search) => {
	let query = {}, searchArray;
	if (typeof search !== 'string') {
		console.error('The type of getUrlQuery\'s param should be string!');
		return {};
	}
	if (search.indexOf('?') === 0) {
		search = search.substring(1);
	}

	searchArray = search.split('&');
	searchArray.forEach(item => {
		const arr = item.split('=');
		query[arr[0]] = arr[1];
	});

	return query;
};

export default getUrlQuery;
