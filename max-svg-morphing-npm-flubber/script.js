const path = require('path');
const Max = require('max-api');
/** Import flubber */
var flubber = require("flubber");

const star = "M103.04 162.52L39.36 196l12.16-70.9L0 74.86 71.2 64.5 103.04 0l31.85 64.52 71.2 10.35-51.57 50.22L166.7 196z";

const circle = "M86,171.5 C38.7796539,171.5 0.5,133.220346 0.5,86 C0.5,38.7796539 38.7796539,0.5 86,0.5 C133.220346,0.5 171.5,38.7796539 171.5,86 C171.5,133.220346 133.220346,171.5 86,171.5 Z";

/** Interpolation position */
var interpolate = 0.;

/** The interpolator */
var interpolator = flubber.interpolate(star, circle);

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

/**
 * Respond to the "interpolate" message from Max
 * Set the morphing position (0-1)
 */
Max.addHandler("interpolate", (msg) => {
    interpolate = msg;
});

/**
 * A bang recalculates the SVG path and outputs
 * the SVG markup from the outlet
 */
Max.addHandler("bang", () => {
    var newDataPath = interpolator(interpolate);
    Max.outlet('svg_markup', formatSvg(newDataPath));
});

/**	
 *	Format the SVG file output
 */
function formatSvg(d)
{
	const svgData = `
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="320px" height="240px" viewBox="0 0 320 240" enable-background="new 0 0 320 240" xml:space="preserve">
<path d="${d}" />
</svg>
	`;
	return svgData;
}