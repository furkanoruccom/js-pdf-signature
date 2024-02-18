## Live Demo

[Live Demo](https://furkanoruccom.github.io/js-pdf-signature/)

The JS PDF Signature project provides a comprehensive web application designed to enhance PDF documents by allowing users to easily place digital signatures and stamps directly onto their pages. Built with a mix of modern web technologies and libraries, this tool caters to a wide range of users, from professionals seeking to sign official documents to individuals aiming to add a personal touch to their PDF files.

## Features and Technologies

- **PDF.js:** At the core of the application is PDF.js, a powerful library that enables rendering of PDF files within the browser. This ensures that users can view their PDF documents directly on the web platform, providing a seamless experience from uploading to editing.

- **jQuery and jQuery UI:** The application harnesses the versatility of jQuery and jQuery UI for smooth interaction and manipulation of document elements. Users can enjoy a drag-and-drop functionality for placing signatures and stamps, making the process intuitive and efficient.

- **Bootstrap:** Leveraging Bootstrap's responsive design capabilities, the application offers a user-friendly interface that adapts to various screen sizes. This responsiveness ensures that users can operate the tool on a wide array of devices, from desktop computers to mobile phones.

- **Custom JavaScript Logic:** The heart of the application lies in its custom JavaScript logic, which enables the dynamic addition of signatures and stamps. Through meticulous event handling, users can place, resize, and rotate these elements on their PDFs, offering unparalleled control over how documents are signed or sealed.

- **HTML2Canvas and jsPDF:** To facilitate the download of edited PDFs, the application utilizes HTML2Canvas and jsPDF. HTML2Canvas captures the content of the canvas element as an image, which jsPDF then uses to generate a downloadable PDF document. This process ensures that users can easily save their modified documents with the added signatures and stamps intact.

## How It Works

Upon uploading a PDF document, the application displays it within a modal window, where users can interact with the content. A selection area allows for the precise placement of signatures and stamps. With dedicated buttons for each action, users can choose to add a digital signature or stamp from a predefined list or upload their own. These elements are fully customizable, supporting resizing and rotation to fit the document's layout perfectly.

After positioning the signatures and stamps as desired, the download button triggers the conversion process, where the canvas content, now including the added elements, is converted into an image and then back into a PDF format. This newly created PDF, complete with the user's modifications, is then ready for download and use.

## Conclusion

This web application stands out as a practical and accessible solution for digital document signing and stamping. It encapsulates the power of modern web technologies to provide a flexible and user-friendly platform for personalizing PDF documents. Whether for business contracts, official documents, or personal use, this tool simplifies the process of adding digital signatures and stamps, eliminating the need for paper-based processes and enhancing workflow efficiency in the digital age.


----------------------------------------------------------------------------------------------------------------------


# JS PDF İmza

JS PDF İmza projesi, kullanıcıların PDF belgelerine doğrudan dijital imzaları ve damgaları kolayca yerleştirmelerini sağlayan kapsamlı bir web uygulaması sunar. Modern web teknolojileri ve kütüphanelerin bir karışımıyla oluşturulan bu araç, resmi belgeleri imzalamak isteyen profesyonellerden PDF dosyalarına kişisel bir dokunuş katmayı amaçlayan bireylere kadar geniş bir kullanıcı yelpazesine hitap eder.

## Özellikler ve Teknolojiler

- **PDF.js:** Uygulamanın merkezinde, PDF dosyalarının tarayıcı içinde işlenmesini sağlayan güçlü bir kütüphane olan PDF.js bulunur. Bu, kullanıcıların PDF belgelerini doğrudan web platformunda görüntüleyebilmelerini sağlayarak, yüklemeden düzenlemeye kadar sorunsuz bir deneyim sunar.

- **jQuery ve jQuery UI:** Uygulama, belge öğeleriyle sorunsuz etkileşim ve manipülasyon için jQuery ve jQuery UI'nin çok yönlülüğünden yararlanır. Kullanıcılar, imzaları ve damgaları yerleştirmek için sürükle ve bırak işlevselliğinin keyfini çıkarabilir, bu da süreci sezgisel ve verimli hale getirir.

- **Bootstrap:** Bootstrap'in duyarlı tasarım yeteneklerinden yararlanarak uygulama, çeşitli ekran boyutlarına uyum sağlayan kullanıcı dostu bir arayüz sunar. Bu duyarlılık, kullanıcıların aracı masaüstü bilgisayarlardan cep telefonlarına kadar geniş bir cihaz yelpazesinde kullanabilmelerini sağlar.

- **Özel JavaScript Mantığı:** Uygulamanın kalbi, imzaların ve damgaların dinamik olarak eklenmesini sağlayan özel JavaScript mantığında yatmaktadır. Titiz olay işleme aracılığıyla kullanıcılar, belgeler üzerinde bu öğeleri yerleştirebilir, yeniden boyutlandırabilir ve döndürebilir.

- **HTML2Canvas ve jsPDF:** Düzenlenmiş PDF'lerin indirilmesini kolaylaştırmak için uygulama, HTML2Canvas ve jsPDF kullanır. HTML2Canvas, canvas elementinin içeriğini bir resim olarak yakalar, bu resmi jsPDF daha sonra indirilebilir bir PDF belgesi oluşturmak için kullanır. Bu süreç, kullanıcıların eklenen imzaları ve damgaları koruyarak modifiye edilmiş belgelerini kolayca kaydedebilmelerini sağlar.

## Nasıl Çalışır

Bir PDF belgesi yüklendiğinde, uygulama içeriğiyle etkileşimde bulunabileceğiniz bir modal pencere içinde gösterir. Bir seçim alanı, imzaların ve damgaların hassas bir şekilde yerleştirilmesini sağlar. Her bir işlem için ayrılmış butonlarla, kullanıcılar önceden tanımlanmış bir listeden dijital imza veya damga ekleyebilir veya kendi yüklemelerini yapabilirler. Bu öğeler tamamen özelleştirilebilir, belgenin düzenine mükemmel bir şekilde uyacak şekilde yeniden boyutlandırma ve döndürme desteği sunar.

İmzalar ve damgalar istenildiği gibi konumlandırıldıktan sonra, indirme butonu dönüşüm sürecini tetikler, burada şimdi eklenen öğeleri içeren canvas içeriği bir resme ve ardından bir PDF formatına dönüştürülür. Bu yeni oluşturulan PDF, kullanıcının değişiklikleriyle tamamlanmış olarak indirilmeye ve kullanılmaya hazırdır.

## Sonuç

Bu web uygulaması, dijital belge imzalama ve damgalama için pratik ve erişilebilir bir çözüm olarak öne çıkar. Modern web teknolojilerinin gücünü kapsayarak, PDF belgelerini kişiselleştirmek için esnek ve kullanıcı dostu bir platform sunar. İster iş sözleşmeleri, resmi belgeler veya kişisel kullanım için olsun, bu araç, dijital imzaları ve damgaları eklemenin sürecini basitleştirir, kağıt tabanlı işlemlerin ihtiyacını ortadan kaldırır ve dijital çağda iş akışı verimliliğini artırır.



```bash
git clone https://github.com/furkanoruccom/js-pdf-signature.git
cd js-pdf-signature
# Özel kurulum talimatları için burayı takip edin
# JS PDF Signature



