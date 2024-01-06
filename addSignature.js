

// Başlangıçta .selectionArea'nın offsetTop değerini al
var selectionArea = document.getElementById('selectionArea');
var startPosition = selectionArea.offsetTop;
$("#modalSignature").scroll(function () {
  $(".selectionArea").css({ "top": startPosition + $(this).scrollTop() + "px", "position": "absolute" });
});


$(".btn-close-signature").hide();
$(".signaturebtns").hide();


$("#modalSignature").on('shown.bs.modal', function () {
  $(".btn-close-signature").toggle();
  $(".signaturebtns").toggle();

});

$(".btn-close-signature").click(function () {
  $(".btn-close-signature").toggle();
  $(".signaturebtns").toggle();
  $("#modalSignature").modal('hide');
});



var dragging = false;
var offset = { x: 0, y: 0 };

// var url = 'phd.pdf'; // PDF dosyanızın yolu
var pdfDoc = null,
  pageNum = 1,
  scale = 1.8;

var signatures = [
  'imza-1.png',
  'imza-2.png',
  'imza-3.png',
  'imza-4.png',
  'imza-5.png'
];

function getRandomSignature() {
  var index = Math.floor(Math.random() * signatures.length);
  return signatures[index];
}
$("#btnmodalSignature").hide();
document.getElementById('pdfFile').addEventListener('change', function (event) {
  $("#btnmodalSignature").toggle();

  var file = event.target.files[0];
  if (file.type === "application/pdf") {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var typedarray = new Uint8Array(this.result);
      renderPDF(typedarray);
    };
    fileReader.readAsArrayBuffer(file);
    $("#modalSignature").modal('show');
  } else {
    alert("Lütfen bir PDF dosyası seçin.");
  }
});

function renderPDF(typedarray) {
  var loadingTask = pdfjsLib.getDocument({ data: typedarray });
  loadingTask.promise.then(function (pdf) {
    pdfDoc = pdf;

    // İlk sayfayı alarak konteynerin genişliğine göre ölçeklemeyi hesapla
    pdfDoc.getPage(1).then(function (page) {
      var containerWidth = $('#pdfCanvasContainer').width(); // Konteynerin genişliği
      var viewport = page.getViewport({ scale: 1.0 });
      var pdfWidth = viewport.width;
      var scale = containerWidth / pdfWidth; // Ölçekleme faktörünü hesapla

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then(function (page) {
          var scaledViewport = page.getViewport({ scale: scale });
          var canvas = document.createElement('canvas');
          canvas.id = 'pdfCanvas_' + pageNum;
          canvas.className = 'pdf-page-canvas';

          $("#pdfCanvasContainer").append(canvas);

          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;
          var renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: scaledViewport
          };
          page.render(renderContext);
        });
      }
    });
  }, function (reason) {
    console.error(reason);
  });
}


// Existing JavaScript code for signature placement and download button...
// (Buraya mevcut JavaScript kodunuzu koyun.)


function startDrag(e) {


  // Dokunmatik olaylar için pozisyonu al
  var event = e.type.includes('touch') ? e.touches[0] : e;
  offset.x = event.clientX - selectionArea.offsetLeft;
  offset.y = event.clientY - selectionArea.offsetTop;
  dragging = true;
  document.body.style.overflow = 'hidden';

  if (dragging) {
    e.preventDefault();
  }
}

function doDrag(e) {


  if (!dragging) return;
  // Dokunmatik olaylar için pozisyonu al
  var event = e.type.includes('touch') ? e.touches[0] : e;
  selectionArea.style.left = (event.clientX - offset.x) + 'px';
  selectionArea.style.top = (event.clientY - offset.y) + 'px';

  document.body.style.overflow = '';


  if (dragging) {
    e.preventDefault();
  }
}

function stopDrag(e) {
  dragging = false;
}

selectionArea.addEventListener('mousedown', startDrag, false);
selectionArea.addEventListener('touchstart', startDrag, false, { passive: false });


window.addEventListener('mousemove', doDrag, false);
window.addEventListener('touchmove', doDrag, false, { passive: false });

window.addEventListener('mouseup', stopDrag, false);
window.addEventListener('touchend', stopDrag, false, { passive: false });

// İmza elementini yaratan fonksiyon
function createSignatureElement(src, x, y) {
  var wrapper = document.createElement('div');
  wrapper.classList.add('signatureWrapper');

  // İmzanın başlangıç konumunu ayarlayın
  wrapper.style.left = x + 'px';
  wrapper.style.top = y + 'px';
  wrapper.style.position = 'absolute';

  var img = new Image();
  img.src = src;
  img.classList.add('signature');

  var resizeHandle = document.createElement('div');
  resizeHandle.classList.add('resize-handle');

  var rotateHandle = document.createElement('div');
  rotateHandle.innerHTML = "<i class='fas fa-sync-alt'></i>";

  var trashHandle = document.createElement('div');
  trashHandle.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  trashHandle.style.cursor = 'pointer';


  rotateHandle.classList.add('rotate-handle');

  wrapper.appendChild(img);
  wrapper.appendChild(resizeHandle);
  wrapper.appendChild(rotateHandle);
  wrapper.appendChild(trashHandle);

  trashHandle.addEventListener('touchstart', function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    wrapper.remove();
  }, { passive: false });


  trashHandle.addEventListener('click', function (e) {
    wrapper.remove();
  });

  return wrapper;
}


function addDraggableToSignature(signatureElement) {
  var dragging = false;
  var offset = { x: 0, y: 0 };

  function startDrag(e) {

    var event = e.type.includes('touch') ? e.touches[0] : e;
    offset.x = event.clientX - signatureElement.getBoundingClientRect().left;
    offset.y = event.clientY - signatureElement.getBoundingClientRect().top;
    dragging = true;


    if (dragging) {
      e.preventDefault();
    }
  }

  function doDrag(e) {

    if (!dragging || $(signatureElement).data('isTransforming')) return;
    var event = e.type.includes('touch') ? e.touches[0] : e;
    var parentOffset = signatureElement.offsetParent ? signatureElement.offsetParent.getBoundingClientRect() : { left: 0, top: 0 };
    signatureElement.style.left = (event.clientX - offset.x - parentOffset.left) + 'px';
    signatureElement.style.top = (event.clientY - offset.y - parentOffset.top) + 'px';

    if (dragging) {
      e.preventDefault();
    }

  }

  function stopDrag(e) {
    dragging = false;
  }

  signatureElement.addEventListener('mousedown', startDrag, false);
  signatureElement.addEventListener('touchstart', startDrag, false, { passive: false });

  window.addEventListener('mousemove', doDrag, false);
  window.addEventListener('touchmove', doDrag, false, { passive: false });

  window.addEventListener('mouseup', stopDrag, false);
  window.addEventListener('touchend', stopDrag, false, { passive: false });

}


function makeRotatable(signatureElement, rotateHandle) {
  var rotation = 0; // Mevcut döndürme açısı
  var startAngle = 0;
  var centerPoint;

  function getEventLocation(e) {
    if (e.type.startsWith('touch')) {
      // Birden fazla dokunma noktasının ilkini kullan
      e = e.touches[0] || e.changedTouches[0];
    }
    return { x: e.clientX, y: e.clientY };
  }

  function calculateRotation(e) {
    var eventLocation = getEventLocation(e);
    var x = eventLocation.x - centerPoint.x;
    var y = eventLocation.y - centerPoint.y;
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  function onMouseDown(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    centerPoint = {
      x: signatureElement.getBoundingClientRect().left + signatureElement.offsetWidth / 2,
      y: signatureElement.getBoundingClientRect().top + signatureElement.offsetHeight / 2
    };
    startAngle = calculateRotation(e) - rotation;
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function onMove(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    var angle = calculateRotation(e) - startAngle;
    signatureElement.style.transform = 'rotate(' + angle + 'deg)';
  }

  function onUp(e) {
    rotation = calculateRotation(e) - startAngle; // Güncel döndürme açısını kaydet
    window.removeEventListener('touchmove', onMove, { passive: false });
    window.removeEventListener('touchend', onUp, { passive: false });
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  }

  rotateHandle.addEventListener('touchstart', onMouseDown, { passive: false });
  rotateHandle.addEventListener('mousedown', onMouseDown);
}

// İmza yerleştirme fonksiyonunu değiştirelim
document.getElementById('placeSignature').addEventListener('click', function () {

  var x = parseInt(selectionArea.style.left, 10);
  var y = parseInt(selectionArea.style.top, 10);
  var signatureElement = createSignatureElement(getRandomSignature(), x, y)
  $(".selectionArea").css({ "left": "0" });

  $("#pdfCanvasContainer").append(signatureElement);

  $(".signatureWrapper").css({ "height": "100px", "width": "100px" }).resizable({
    aspectRatio: true, // Orantılı yeniden boyutlandırmayı etkinleştirir
    start: function (event, ui) {
      $(this).data('isTransforming', true);

      // Yeniden boyutlandırma başladığında orijinal boyutları kaydet
      var startWidth = ui.size.width;
      var startHeight = ui.size.height;

      $(this).data('startWidth', startWidth);
      $(this).data('startHeight', startHeight);
    },
    stop: function (event, ui) {
      $(this).data('isTransforming', false);
    },
    resize: function (event, ui) {
      // Yeniden boyutlandırma sırasında orantıyı koru
      var startWidth = $(this).data('startWidth');
      var startHeight = $(this).data('startHeight');
      var newWidth = ui.size.width;
      var newHeight = ui.size.height;

      if (newWidth != startWidth) {
        newHeight = Math.round((startHeight / startWidth) * newWidth);
        ui.size.height = newHeight;
      } else if (newHeight != startHeight) {
        newWidth = Math.round((startWidth / startHeight) * newHeight);
        ui.size.width = newWidth;
      }
    }
  });

  makeRotatable(signatureElement, signatureElement.querySelector('.rotate-handle'));

  addDraggableToSignature(signatureElement);

});









