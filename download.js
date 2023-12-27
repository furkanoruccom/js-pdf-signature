(function ($) {
  'use strict';


  /*--------------------------------------------------------------
  ## Down Load Button Function
  ----------------------------------------------------------------*/
  // var originalCanvasData;
  $('#download_btn').on('click', function () {
    // originalCanvasData = canvasContext.getImageData(0, 0, pdfCanvas.width, pdfCanvas.height);
    // canvasContext.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);


    var downloadSection = $('#pdfCanvasContainer');
    $(".selectionArea").css("visibility", "hidden");
    $(".rotate-handle").css("visibility", "hidden");
    $(".ui-resizable-handle").css("visibility", "hidden");




    var cWidth = downloadSection.width();
    var cHeight = downloadSection.height();
    var topLeftMargin = 0; // Boşluğu sıfıra ayarla
    var pdfWidth = cWidth + topLeftMargin * 2;
    var pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
    var canvasImageWidth = cWidth;
    var canvasImageHeight = cHeight;
    var totalPDFPages = Math.ceil(cHeight / pdfHeight) - 1;

    html2canvas(downloadSection[0], { allowTaint: true, useCORS: true }).then(function (
      canvas) {
      canvas.getContext('2d');
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(
        imgData,
        'JPG',
        topLeftMargin,
        topLeftMargin,
        canvasImageWidth,
        canvasImageHeight
      );
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(
          imgData,
          'JPG',
          topLeftMargin,
          -(pdfHeight * i) + topLeftMargin * 0,
          canvasImageWidth,
          canvasImageHeight
        );
      }
      $(".selectionArea").css("visibility", "visible");
      $(".rotate-handle").css("visibility", "visible");
      $(".ui-resizable-handle").css("visibility", "visible");
      pdf.save('ivonne-invoice.pdf');
      // canvasContext.putImageData(originalCanvasData, 0, 0);

      
 


    });
  });




})(jQuery); // End of use strict
