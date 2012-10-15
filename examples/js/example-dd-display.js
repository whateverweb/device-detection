var MTDD = new MTDD('demo');

function appendOption(text)
{

  var elOptNew = document.createElement('option');
  elOptNew.text = text;
  elOptNew.value = text;

  var elSel = document.getElementById('capas');

  try {
    elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
  }
  catch(ex) {
    elSel.add(elOptNew); // IE only
  }
}

function capaselect() {
	var elSel = document.getElementById('capas');

	var para = document.getElementById('capaValue');

	
	var capaValue = MTDD.getCapability(elSel.value);

	if(capaValue) {
		para.innerHTML = capaValue;
	}
}

var capas = MTDD.getCapabilities();

if(capas) {
	for (var key in capas) {
		appendOption(key);
	}
}