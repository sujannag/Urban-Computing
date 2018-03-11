'use strict';
function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

module.exports = function (kelvin) {
	if (typeof kelvin !== 'number') {
		throw new TypeError('Expected a number');
	}

	var res = kelvin - 273.15;
	return round(res, 2);
};
