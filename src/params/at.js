/** @type {import('./$types').ParamMatcher */
export function match(param) {
	// 골뱅이 @(at)으로 시작하는지
	// disquiet/@kojang79/makerlog/일주일만에-product-service을-만들었어요
	return /^@/.test(param);
}
