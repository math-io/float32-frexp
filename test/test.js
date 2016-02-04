'use strict';

// MODULES //

var tape = require( 'tape' );
var ninf = require( 'const-ninf-float32' );
var pinf = require( 'const-pinf-float32' );
var round = require( 'math-round' );
var pow = require( 'math-power' );
var abs = require( 'math-abs' );
var toFloat32 = require( 'float64-to-float32' );
var frexp = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/frexp_1e-36_1e-38.json' );
var medium = require( './fixtures/frexp_-1e3_1e3.json' );
var large = require( './fixtures/frexp_1e36_1e38.json' );
var subnormal = require( './fixtures/frexp_1e-39_1e-45.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof frexp === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (small `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		x = x[ i ];
		f = frexp( x );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (medium `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		x = x[ i ];
		f = frexp( x );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (large `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		x = x[ i ];
		f = frexp( x );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (subnormal `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		x = x[ i ];
		f = frexp( x );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x );
	}
	t.end();
});

tape( 'the returned normalized fraction and exponent satisfy the relation `x = frac * 2**exp`', function test( t ) {
	var total;
	var sign;
	var frac;
	var exp;
	var x;
	var f;
	var i;

	if ( typeof window === 'undefined' ) {
		total = 1e3;
	} else {
		total = 200;
	}
	for ( i = 0; i < total; i++ ) {
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
		f = f[ 0 ] * pow( 2, f[ 1 ] );
		f = toFloat32( f );

		t.equal( f, x, 'frac * 2^exp equals ' + x );
	}
	t.end();
});

tape( 'the absolute value of the normalized fraction is on the interval [1/2,1)', function test( t ) {
	var total;
	var sign;
	var frac;
	var exp;
	var x;
	var f;
	var i;

	if ( typeof window === 'undefined' ) {
		total = 1e3;
	} else {
		total = 200;
	}
	for ( i = 0; i < total; i++ ) {
		if ( Math.random() < 0.5 ) {
			sign = -1;
		} else {
			sign = 1;
		}
		frac = Math.random() * 10;
		exp = round( Math.random()*64 ) - 37;
		x = sign * frac * pow( 10, exp );
		x = toFloat32( x );

		f = frexp( x );

		// Compute the absolute value of the normalized fraction:
		f = abs( f[ 0 ] );

		t.ok( f >= 0.5 && f < 1, 'absolute value of the normalized fraction is on the interval [1/2,1). x: ' + x + '.' );
	}
	t.end();
});

tape( 'if provided `+0`, the function returns [0,0]', function test( t ) {
	var f = frexp( 0 );
	t.deepEqual( f, [0,0], 'returns [0,0]' );
	t.end();
});

tape( 'if provided `-0`, the function returns [-0,0]', function test( t ) {
	var f = frexp( -0 );
	t.equal( 1/f[0], ninf, 'first element is -0' );
	t.deepEqual( f, [-0,0], 'returns [-0,0]' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns [+infinity,0]', function test( t ) {
	var f = frexp( pinf );
	t.deepEqual( f, [pinf,0], 'returns [+inf,0]' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns [-infinity,0]', function test( t ) {
	var f = frexp( ninf );
	t.deepEqual( f, [ninf,0], 'returns [-inf,0]' );
	t.end();
});

tape( 'if provided `NaN`, the function returns [NaN,0]', function test( t ) {
	var f = frexp( NaN );
	t.ok( f[ 0 ] !== f[ 0 ], 'first element is NaN' );
	t.equal( f[ 1 ], 0, 'second element is 0' );
	t.end();
});
