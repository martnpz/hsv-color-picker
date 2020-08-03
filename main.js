let img = document.getElementById('img'),
	canvas = document.getElementById('canvas'),
	textHSV = document.getElementById('hsv'),
	textHEX = document.getElementById('hex'),
	color = document.getElementById('color'),
	x = '',
	y = ''

img.addEventListener('click', (e) => {
  if (e.offsetX) {
    x = e.offsetX
    y = e.offsetY
  }

  //? capture data
  useCanvas(canvas, img, () => {
	let p = canvas.getContext('2d')
	.getImageData(x, y, 1, 1).data

	//? set value in HTML
    textHSV.innerHTML = rgbToHsv(p[0],p[1],p[2])
    textHEX.innerHTML = rgbToHex(p[0],p[1],p[2])

    color.style.background = rgbToHex(p[0],p[1],p[2])
  })
}, false)

//? capture function
function useCanvas(el, image, callback){
  el.width = image.width
  el.height = image.height
  el.getContext('2d')
  .drawImage(image, 0, 0, image.width, image.height)
  return callback()
}

//? RGB to HEX
function dataToHex(c) {
	let hex = c.toString(16)
	return hex.length == 1 ? '0' + hex : hex
  }
  function rgbToHex(r, g, b) {
	return `#${dataToHex(r)}${dataToHex(g)}${dataToHex(b)}`
}

//? RGB to HSV
function rgbToHsv(r, g, b) {
	r /= 255, g /= 255, b /= 255
  
	let max = Math.max(r, g, b), min = Math.min(r, g, b)
	let h, s, v = max
  
	let d = max - min
	s = max == 0 ? 0 : d / max
  
	if (max == min) {
		
	  h = 0
	
	} else {
	  switch (max) {
		case r: h = (g - b) / d + (g < b ? 6 : 0); break
		case g: h = (b - r) / d + 2; break
		case b: h = (r - g) / d + 4; break
	  }
  
	  h /= 6
	}
  
	return `${Math.round(h * 360)}, ${Math.floor(s * 100)}, ${Math.floor(v * 100)}`
  }
  