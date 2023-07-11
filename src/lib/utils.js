export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const getImageURL = (collectionId, recordId, fileName) => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}`;
};
