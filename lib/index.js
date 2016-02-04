'use strict';

// MODULES //

var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var normalize = require( 'math-float32-normalize' );
var floatExp = require( 'math-float32-exponent' );
var toWord = require( 'math-float32-to-word' );
var fromWord = require( 'math-float32-from-word' );


// CONSTANTS //

// Exponent all 0s: 10000000011111111111111111111111
var CLEAR_EXP_MASK = 0x807fffff; // 2155872255

// Exponent equal to 126 (BIAS-1): 00111111000000000000000000000000
var SET_EXP_MASK = 0x3f000000; // 1056964608


// FREXP //

/**
* FUNCTION: frexp( x )
*	Splits a single-precision floating-point number into a normalized fraction and an integer power of two.
*
* @param {Number} x - single-precision floating-point number
* @returns {Number[]} two element array containing a normalized fraction and an exponent
*/
function frexp( x ) {
	var exp;
	var w;
	if (
		x === 0 ||    // handles -0
		x !== x ||
		x === pinf ||
		x === ninf
	) {
		return [ x, 0 ];
	}
	// If `x` is subnormal, normalize it...
	x = normalize( x );

	// Extract the exponent from `x` and add the normalization exponent:
	exp = floatExp( x[0] ) + x[ 1 ] + 1;

	// Convert `x` to an unsigned 32-bit integer corresponding to the IEEE 754 binary representation:
	w = toWord( x[ 0 ] );

	// Clear the exponent bits within the word:
	w &= CLEAR_EXP_MASK;

	// Set the exponent bits within the word to BIAS-1 (127-1=126):
	w |= SET_EXP_MASK;

	// Return a new single-precision floating-point number:
	return [ fromWord(w), exp ];
} // end FUNCTION frexp()


// EXPORTS //

module.exports = frexp;
