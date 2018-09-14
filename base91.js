/**
 * Base91 encode and decode
 * Modified from Joachim Henke's php code, see at http://base91.sourceforge.net/
 * Author: masazumi-github
 */

function base91Encode(d) {
	b91_enctab = Array(
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$',
	'%', '&', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=',
	'>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '"');
	n = 0;
	o = "";
	b = 0;
	for (i = 0; i < d.length; ++i) {
		b |= (d[i]).charCodeAt() << n;
		n += 8;
		if (n > 13) {
			v = b & 8191;
			if (v > 88) {
				b >>= 13;
				n -= 13;
			} else {
				v = b & 16383;
				b >>= 14;
				n -= 14;
			}
			o += ( b91_enctab[v % 91] + b91_enctab[parseInt(v / 91)] );
		}
	}
	if (n) {
		o += b91_enctab[b % 91];
		if (n > 7 || b > 90)
			o += b91_enctab[parseInt(b / 91)];
	}
	return o;
}

function array_flip( trans )
{
	var key, tmp_ar = {};
	for ( key in trans )
		if ( trans.hasOwnProperty( key ) )
			tmp_ar[trans[key]] = key;
	return tmp_ar;
}

function base91Decode(d) {
	b91_dectab = array_flip(Array(
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$',
	'%', '&', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=',
	'>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '"'));
	v = -1;
	b = 0;
	n = 0;
	o = "";
	for (i = 0; i < d.length; ++i) {
		c = b91_dectab[d[i]];
		if((typeof(c) == "undefined"))
			continue;
		if (v < 0)
			v = parseInt(c);
		else {
			v += parseInt(c) * 91;
			b |= v << n;
			n += (v & 8191) > 88 ? 13 : 14;
			do {
				o += String.fromCharCode(b & 255);
				b >>= 8;
				n -= 8;
			} while (n > 7);
			v = -1;
		}
	}
	if (v + 1)
		o +=  String.fromCharCode((b | v << n) & 255);
	return o;
}