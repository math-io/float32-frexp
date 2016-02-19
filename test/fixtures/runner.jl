# To run this script, `cd` to the `./test/fixtures` directory and then, from the Julia terminal, `include("./runner.jl")`.

import JSON

# Small values:
x = linspace( 1e-36, 1e-38, 1007 )

y = Array( Any, length(x) )
z = Array( Any, length(x) )
for i in eachindex(x)
	# Mimic implicit type promotion in JavaScript where we need to cast a Float64 to a Float32 and then back to Float64 when writing out:
	f32 = convert( Float32, x[i] )
	o = frexp( f32 )
	y[i] = [ convert( Float64, o[1] ), o[2] ]
	z[i] = convert( Float64, f32 )
end

data = Dict([
	("x", z),
	("expected", y)
])

outfile = open("frexp_1e-36_1e-38.json", "w")
write( outfile, JSON.json(data) )
close( outfile );


# Medium values:
x = linspace( -1e3, 1e3, 1007 )

y = Array( Any, length(x) )
z = Array( Any, length(x) )
for i in eachindex(x)
	# Mimic implicit type promotion in JavaScript where we need to cast a Float64 to a Float32 and then back to Float64 when writing out:
	f32 = convert( Float32, x[i] )
	o = frexp( f32 )
	y[i] = [ convert( Float64, o[1] ), o[2] ]
	z[i] = convert( Float64, f32 )
end

data = Dict([
	("x", z),
	("expected", y)
])

outfile = open("frexp_-1e3_1e3.json", "w")
write( outfile, JSON.json(data) )
close( outfile );


# Large values:
x = linspace( 1e36, 1e38, 1007 )

y = Array( Any, length(x) )
z = Array( Any, length(x) )
for i in eachindex(x)
	# Mimic implicit type promotion in JavaScript where we need to cast a Float64 to a Float32 and then back to Float64 when writing out:
	f32 = convert( Float32, x[i] )
	o = frexp( f32 )
	y[i] = [ convert( Float64, o[1] ), o[2] ]
	z[i] = convert( Float64, f32 )
end

data = Dict([
	("x", z),
	("expected", y)
])

outfile = open("frexp_1e36_1e38.json", "w")
write( outfile, JSON.json(data) )
close( outfile );


# Subnormal values:
x = linspace( 1e-39, 1e-45, 1007 )

y = Array( Any, length(x) )
z = Array( Any, length(x) )
for i in eachindex(x)
	# Mimic implicit type promotion in JavaScript where we need to cast a Float64 to a Float32 and then back to Float64 when writing out:
	f32 = convert( Float32, x[i] )
	o = frexp( f32 )
	y[i] = [ convert( Float64, o[1] ), o[2] ]
	z[i] = convert( Float64, f32 )
end

data = Dict([
	("x", z),
	("expected", y)
])

outfile = open("frexp_1e-39_1e-45.json", "w")
write( outfile, JSON.json(data) )
close( outfile );
