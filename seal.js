// Mühür elementini yaratan fonksiyon
function createSealElement(src, x, y) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('sealWrapper');
  
    // İmzanın başlangıç konumunu ayarlayın
    wrapper.style.left = x + 'px';
    wrapper.style.top = y + 'px';
    wrapper.style.position = 'absolute';
  
    let img = new Image();
    img.src = src;
    img.classList.add('seal');

    var dargHandle = document.createElement('div');
    dargHandle.innerHTML = "<i class='fa-regular fa-arrows-up-down-left-right dragHandle'></i>";
  
    wrapper.appendChild(dargHandle);
    wrapper.appendChild(img);

  
    return wrapper;
  }
  

  document.getElementById('placeSeal').addEventListener('click', function () {
    var x = parseInt(selectionArea.style.left, 10);
    var y = parseInt(selectionArea.style.top, 10);
    var sealElement = createSealElement("muhur.png", x, y);
    $("#pdfCanvasContainer").append(sealElement);
    addDraggableToSignature(sealElement);

  });