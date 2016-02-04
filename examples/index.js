'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var frexp = require( './../lib' );

var sign;
var frac;
var exp;
var x;
var f;
var v;
var i;

// Generate random single-precision floating-point numbers and break each into a normalized fraction and an integer power of two...
for ( i = 0; i < 100; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	frac = Math.random() * 10;
	exp = round( Math.random()*64 ) - 38;
	x = sign * frac * pow( 10, exp );
	x = toFloat32( x );

	f = frexp( x );
	v = f[ 0 ] * pow( 2, f[ 1 ] );
	v = toFloat32( v );

	console.log( '%d = %d * 2^%d = %d', x, f[ 0 ], f[ 1 ], v );
}