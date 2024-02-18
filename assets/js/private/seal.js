var seals = [
  '/assets/seals/muhur-1.png',
  '/assets/seals/muhur-2.png',
  '/assets/seals/muhur-3.png',
  '/assets/seals/muhur-4.png',
  '/assets/seals/muhur-5.png'
];

function getRandomSeal() {
  var index = Math.floor(Math.random() * seals.length);
  return seals[index];
}


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

    let trashHandle = document.createElement('div');
    trashHandle.innerHTML = "<i class='fa-solid fa-trash'></i>";
  
    wrapper.appendChild(trashHandle);
    wrapper.appendChild(img);

    trashHandle.addEventListener('click', function (e) {
      wrapper.remove();
    });

  
    return wrapper;
  }
  

  document.getElementById('placeSeal').addEventListener('click', function () {
    var x = parseInt(selectionArea.style.left, 10);
    var y = parseInt(selectionArea.style.top, 10);
    var sealElement = createSealElement(getRandomSeal(), x, y);
    $("#pdfCanvasContainer").append(sealElement);
    addDraggableToSignature(sealElement);

  });