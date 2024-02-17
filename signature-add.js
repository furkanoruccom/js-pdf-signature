

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
  scale = 1.5;

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
  var event = e.type.includes('touch') ? e.touches[0] : e;
  var rect = selectionArea.getBoundingClientRect();

  // Mouse'un veya dokunmanın selectionArea içindeki göreli konumunu hesapla
  offset.x = event.clientX - rect.left;
  offset.y = event.clientY - rect.top;

  dragging = true;
  document.body.style.overflow = 'hidden';
  e.preventDefault(); // Varsayılan olayı engelle
}



function doDrag(e) {
  if (!dragging) return;

  var event = e.type.includes('touch') ? e.touches[0] : e;

  // Yeni X ve Y pozisyonlarını hesapla, offset'i dikkate alarak
  var newX = event.clientX - offset.x;
  var newY = event.clientY - offset.y;

  // Sınırları hesapla ve uygula
  var containerRect = document.getElementById('pdfCanvasContainer').getBoundingClientRect();
  newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - selectionArea.offsetWidth));
  newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - selectionArea.offsetHeight));

  // Container içinde kalmasını sağlamak için yeni pozisyonları düzelt
  newX -= containerRect.left;
  newY -= containerRect.top;

  selectionArea.style.left = newX + 'px';
  selectionArea.style.top = newY + 'px';

  e.preventDefault();
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











