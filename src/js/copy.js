(function(global, doc) {
    function showInfo() {
        var
            mainifest = chrome.runtime.getManifest(),
            width = '340px',
            height = '200px',
            top = ((global.innerHeight / 2) - (parseInt(height) / 2)) + 'px',
            left = ((global.innerWidth / 2) - (parseInt(width) / 2)) + 'px',
            style =
                'font-family: Arial, sans-serif;' +
                'text-align: center;' +
                'color: #000;' +
                'box-sizing: border-box;' +
                'padding: 20px;' +
                'border-radius: 5px;' +
                'border: 3px solid #000;' +
                'background: #f3f3f3;' +
                'width: ' + width + ';' +
                'height: ' + height + ';' +
                'position: fixed;' +
                'z-index: 999999999;' +
                'top: ' + top + ';' +
                'left: ' + left
        ;

        var infoWrapper =
            '<div id="copy-info" style="' + style + '">' +
                '<img src="' + chrome.runtime.getURL('img/icon48.png') + '" alt="">' +
                '<h1 style="font-size: 35px; margin: 10px 0; background: #f3f3f3; text-align: center; line-height: 35px;">Copy</h1>' +
                '<p style="font-size: 14px; margin-bottom: 10px; background: #f3f3f3; text-align: center;">v' + mainifest.version + '</p>' +
                '<p style="font-size: 11px; background: #f3f3f3; text-align: center;">Powered by <a href="mailto:thebestwebservices@gmail.com">The Best Web Services</a></p>' +
            '</div>'
        ;

        doc.body.insertAdjacentHTML('beforeend', infoWrapper);

        doc.addEventListener('click', function() {
            var el = doc.getElementById('copy-info');

            if (el) {
                el.parentNode.removeChild(el);
            }
        });
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action == "showInfo") {
            if (!doc.getElementById('copy-info')) { // if element not rendered yet
                showInfo();
            }
        }
    });
})(window, document);
