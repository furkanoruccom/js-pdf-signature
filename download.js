(function ($) {
  'use strict';

  /*--------------------------------------------------------------
  ## Down Load Button Function
  ----------------------------------------------------------------*/
  $('#download_btn').on('click', function () {
    var downloadSection = $('#pdfCanvasContainer');
    $(".selectionArea").css("visibility", "hidden");
    $(".fa-trash").css("visibility", "hidden");
    $(".rotate-handle").css("visibility", "hidden");
    $(".ui-resizable-handle").css("visibility", "hidden");

    var cWidth = downloadSection.width();
    var cHeight = downloadSection.height();
    var topLeftMargin = 0;
    var pdfWidth = cWidth + topLeftMargin * 2;
    var pdfHeight = 1263;
    var canvasImageWidth = cWidth;
    var canvasImageHeight = cHeight;
    var totalPDFPages = Math.ceil(cHeight / 1263) - 1;

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
      $(".fa-trash").css("visibility", "visible");
      $(".rotate-handle").css("visibility", "visible");
      $(".ui-resizable-handle").css("visibility", "visible");

      // Mobil cihazlarda indirme işlemi için
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // Mobil cihazlarda indirme işlemi
        var blob = pdf.output('blob');
        var blobURL = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = blobURL;
        link.download = 'ivonne-invoice.pdf';
        link.click();
      } else {
        // Diğer cihazlarda indirme işlemi
        pdf.save('ivonne-invoice.pdf');
      }
    });
  });

})(jQuery);
