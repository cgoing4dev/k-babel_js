export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const getImageURL = (collectionId, recordId, fileName) => {
	return `https://k-babel.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}`;
};

// string date (yyyy-mm-dd) to (month dd, yyyy)
export const formatDate = (date) => {
	const dateObj = new Date(date);
	const month = dateObj.toLocaleString('default', { month: 'long' });
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	return `${month} ${day}, ${year}`;
};

// test formatDate function in console
// console.log(formatDate('2021-03-01'));
