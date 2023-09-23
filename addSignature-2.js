document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('signatureCanvas');
  const context = canvas.getContext('2d');
  let isDrawing = false;
  const smoothness = 3; // Pürüzsüzleştirme değeri

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  function startDrawing(event) {
    isDrawing = true;
    const { offsetX, offsetY } = event;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }

  function draw(event) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  }

  function stopDrawing() {
    isDrawing = false;
  }

  const addSignatureButton = document.getElementById('addSignatureButton');
  const resultMessage = document.getElementById('resultMessage');

  addSignatureButton.addEventListener('click', async function () {
    const signatureImageData = canvas.toDataURL('image/png');
    const pdfFile = document.getElementById('pdfFile').files[0];

    if (!signatureImageData || !pdfFile) {
      resultMessage.innerHTML = 'Lütfen bir imza çizin ve bir PDF dosyası seçin.';
      return;
    }

    const pdfBlob = await pdfFile.arrayBuffer();
    const pdfBytes = new Uint8Array(pdfBlob);

    try {
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const pngSignatureImage = await pdfDoc.embedPng(signatureImageData);
      const pngDims = pngSignatureImage.scale(0.5);

      const { width, height } = firstPage.getSize();
      const xPos = width / 2 - pngDims.width / 2;
      const yPos = height / 2 - pngDims.height / 2;

      firstPage.drawImage(pngSignatureImage, {
        x: xPos,
        y: yPos,
        width: pngDims.width,
        height: pngDims.height,
      });

      const modifiedPdfBytes = await pdfDoc.save();

      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      resultMessage.innerHTML = `<a href="${url}" download="imzali-dokuman.pdf">İmzalı PDF dosyasını indir</a>`;
    } catch (error) {
      resultMessage.innerHTML = 'Bir hata oluştu: ' + error.message;
    }
  });
});





const divElement = document.querySelector('#signatureCanvas'); // .your-div-class, üzerine gelmek istediğiniz div'in classını temsil etmelidir

divElement.addEventListener('mouseenter', () => {
  divElement.style.transition = 'all 0.3s ease-in-out'; // Geçiş efektini ayarla
  divElement.style.transform = 'scale(0.9)'; // Boyutu küçült
});

divElement.addEventListener('mouseleave', () => {
  divElement.style.transition = 'all 0.3s ease-in-out'; // Geçiş efektini ayarla
  divElement.style.transform = 'scale(1)'; // Normal boyuta geri dön
});
