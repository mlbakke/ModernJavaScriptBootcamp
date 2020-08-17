function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

// Methods added to Color prototype
Color.prototype.rgb = function() {
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
}
Color.prototype.hex = function() {
    const {r, g, b} = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

Color.prototype.rgba = function(a = 1.0) {
    const {r, g, b} = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Create new colors with Color as prototype object
const color1 = new Color(35, 232, 162);
const color2 = new Color(0, 0, 20);


document.body.style.backgroundColor = color1.rgba(.5);