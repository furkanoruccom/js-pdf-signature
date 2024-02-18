// $('#download_btn').on('click', function () {
//   var downloadSection = $('#pdfCanvasContainer');
//   $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle, .dragHandle").css("display", "none");

//   var cWidth = downloadSection.width();
//   var cHeight = downloadSection.height();
//   var topLeftMargin = 0;
//   var pdfWidth = cWidth + topLeftMargin * 2;
//   var pdfHeight = 1515;
//   var canvasImageWidth = cWidth;
//   var canvasImageHeight = cHeight;
//   var totalPDFPages = Math.ceil(cHeight / 1515) - 1;

//   html2canvas(downloadSection[0], { allowTaint: true, useCORS: true }).then(function (canvas) {
//       var imgData = canvas.toDataURL('image/jpeg', 1.0);
//       var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);

//       pdf.addImage(imgData, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);

//       for (var i = 2; i <= totalPDFPages; i++) {
//           pdf.addPage(pdfWidth, pdfHeight);
//           pdf.addImage(imgData, 'JPG', topLeftMargin, -(pdfHeight * (i - 1)) + topLeftMargin, canvasImageWidth, canvasImageHeight);
//       }

//       $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle, .dragHandle").css("display", "block");
//        pdf.save("download.pdf");

//           // PDF'i Blob olarak al
//     // var pdfBlob = pdf.output('blob');

//     // // FormData oluştur ve PDF'i ekleyin
//     // var formData = new FormData();
//     // formData.append('pdf', pdfBlob, "download.pdf");

//     // console.log(formData);
//     // console.log(pdfBlob);


//   });
// });


$('#download_btn').on('click', function () {
  var downloadSection = $('#pdfCanvasContainer');
  $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle, .dragHandle").css("display", "none");

  var cWidth = downloadSection.width();
  var cHeight = downloadSection.height();
  var pdfWidth = cWidth;
  var pdfHeight = cHeight < 1515 ? cHeight : 1515; // Sayfa yüksekliği 1515'ten küçükse, gerçek yüksekliği kullan
  var canvasImageWidth = cWidth;
  var canvasImageHeight = cHeight;
  var totalPDFPages = Math.ceil(cHeight / pdfHeight);

  html2canvas(downloadSection[0], { scale: 2, useCORS: true }).then(function (canvas) {
      var imgData = canvas.toDataURL('image/jpeg', 0.9); // Kaliteyi biraz düşür
      var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight], {compress: true}); // Sıkıştırma etkin

      pdf.addImage(imgData, 'JPG', 0, 0, canvasImageWidth, canvasImageHeight);

      for (var i = 1; i < totalPDFPages; i++) { // `i = 2` yerine `i = 1` kullanarak döngüyü düzelt
          pdf.addPage([pdfWidth, pdfHeight]);
          pdf.addImage(imgData, 'JPG', 0, -(pdfHeight * i), canvasImageWidth, canvasImageHeight);
      }

      $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle, .dragHandle").css("display", "block");
      pdf.save("download.pdf");
  });
});


