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
  
  
  
      var container = document.getElementById('pdfCanvasContainer');
      var containerRect = container.getBoundingClientRect();
      var signatureRect = signatureElement.getBoundingClientRect();
      
      var minX = containerRect.left - signatureRect.left + signatureElement.offsetLeft;
      var maxX = containerRect.right - signatureRect.right + signatureElement.offsetLeft - signatureRect.width +100;
  
      var minY = containerRect.top - signatureRect.top + signatureElement.offsetTop;
      var maxY = containerRect.bottom - signatureRect.bottom + signatureElement.offsetTop - signatureRect.height +100;
      
      var finalX = Math.min(Math.max(minX, event.clientX - offset.x - containerRect.left), maxX);
      var finalY = Math.min(Math.max(minY, event.clientY - offset.y - containerRect.top), maxY);
      
      signatureElement.style.left = finalX + 'px';
      signatureElement.style.top = finalY + 'px';
  
      if (dragging) {
        e.preventDefault();
      }
  
    }
  
    function stopDrag(e) {
      dragging = false;
    }
  
    signatureElement.addEventListener('mousedown', startDrag, false, { passive: false });
    signatureElement.addEventListener('touchstart', startDrag, false, { passive: false });
  
    window.addEventListener('mousemove', doDrag, false, { passive: false });
    window.addEventListener('touchmove', doDrag, false, { passive: false });
  
    window.addEventListener('mouseup', stopDrag, false, { passive: false });
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
  