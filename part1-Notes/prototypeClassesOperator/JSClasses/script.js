class Color {
	constructor(r, g, b, name) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
		this.calcHsl();
	}
	// Methods added
	innerRGB() {
		const { r, g, b } = this;
		return `${r}, ${g}, ${b}`;
	}
	rgb() {
		return `rgb(${this.innerRGB()})`;
	}
	rgba(a = 1.0) {
		return `rgba(${this.innerRGB()}, ${a})`;
	}
	hex() {
		const { r, g, b } = this;
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	hsl() {
		const { h, s, l } = this;
		return `hsl(${h}, ${s}%, ${l}%)`;
	}
	opposite() {
		const { h, s, l } = this;
		const newHue = (h + 180) % 360;
		return `hsl(${newHue}, ${s}%, ${l}%)`;
	}
	fullSat() {
		const { h, l } = this;
		return `hsl(${h}, 100%, ${l}%)`;
	}
	calcHsl() {
		let { r, g, b } = this;
		// Make r, g, b fractions of 1.
		(r /= 255), (g /= 255), (b /= 255);
		let max = Math.max(r, g, b),
			min = Math.min(r, g, b),
			delta = max - min,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0) {
			h = 0;
		} else if (max == r) {
			// Red is max
			h = ((g - b) / delta) % 6;
		} else if (max == g) {
			// Green is max
			h = (b - r) / delta + 2;
		} else {
			// Blue is max
			h = (r - g) / delta + 4;
		}

		h = Math.round(h * 60);
		// Make negative hues positive behind 360 deg
		if (h < 0) h += 360;
		// Calculate lightness
		l = (max + min) / 2;
		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		this.h = h;
		this.s = s;
		this.l = l;
		return [ h, s, l ];
	}
}

// Create new colors from Color class
const turquoise = new Color(35, 232, 162, 'turquoise');
const black = new Color(0, 0, 0, 'black');

document.body.style.backgroundColor = turquoise.rgb();
