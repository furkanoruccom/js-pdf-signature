



function addDraggableToSignature(signatureElement) {
    var dragging = false;
    var offset = { x: 0, y: 0 };
  
    function startDrag(e) {
      // Dokunmatik olaylar için pozisyonu ayarla
      var event = e.type.includes('touch') ? e.touches[0] : e;
      offset.x = event.clientX - signatureElement.getBoundingClientRect().left;
      offset.y = event.clientY - signatureElement.getBoundingClientRect().top;
      dragging = true;
  
      // Varsa varsayılan davranışı engelle
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  
    function doDrag(e) {
      if (!dragging || $(signatureElement).data('isTransforming')) return;
  
      var event = e.type.includes('touch') ? e.touches[0] : e;
      var newX = event.clientX - offset.x;
      var newY = event.clientY - offset.y;
  
      // Container sınırlarını hesapla ve uygula
      var containerRect = document.getElementById('pdfCanvasContainer').getBoundingClientRect();
      newX = Math.max(containerRect.left, Math.min(containerRect.right - signatureElement.offsetWidth, newX));
      newY = Math.max(containerRect.top, Math.min(containerRect.bottom - signatureElement.offsetHeight, newY));
  
      // Container içindeki yeni konumu ayarla
      signatureElement.style.left = newX - containerRect.left + 'px';
      signatureElement.style.top = newY - containerRect.top + 'px';
  
      // Varsa varsayılan davranışı engelle
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  
    function stopDrag(e) {
      if (dragging && e.cancelable) {
        e.preventDefault();
      }
      dragging = false;
    }
  
    // Dokunmatik ve fare olayları için dinleyicileri ekleyin
    signatureElement.addEventListener('mousedown', startDrag, false);
    signatureElement.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove', doDrag, false);
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('mouseup', stopDrag, false);
    window.addEventListener('touchend', stopDrag, { passive: false });
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
  


  var signatures = [
    'assets/signatures/imza-1.png',
    'assets/signatures/imza-2.png',
    'assets/signatures/imza-3.png',
    'assets/signatures/imza-4.png',
    'assets/signatures/imza-5.png'
  ];
  
  function getRandomSignature() {
    var index = Math.floor(Math.random() * signatures.length);
    return signatures[index];
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


  