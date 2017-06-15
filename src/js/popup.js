(function(global, doc) {
    var
        headerText = El.$('#header-text'),
        textList = El.$('.text-list tbody'),
        copiedText = El.$('#copied-text'),
        closePopupAfterCopy
    ;

    chrome.storage.sync.get('copy', function(storage) {
        var
            snippets = storage.copy.snippets,
            snippetslen = snippets.length
        ;

        closePopupAfterCopy = storage.copy.closePopupAfterCopy;

        if (snippetslen) {
            for (var i = 0; i < snippetslen; ++i) {
                textList.insertAdjacentHTML('beforeend', '<tr><td class="item">' + snippets[i].text + '</td></tr>');
            }
        } else {
            textList.insertAdjacentHTML('beforeend', '<tr><td class="text-center">' + Ext.__('no_data_text') + '</td></tr>');
        }
    });

    doc.addEventListener('click', function(e) {
        var el = e.target;

        if (el.classList.contains('item')) {
            copiedText.value = el.textContent;
            copiedText.select();
            doc.execCommand('copy');

            if (closePopupAfterCopy) {
                global.close();
            }
        }

        if (el.classList.contains('info-btn') || el.parentNode.classList.contains('info-btn')) {
            chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
                chrome.tabs.sendMessage(arrayOfTabs[0].id, {action: "showInfo"}, function(response) {

                });
            });
        }
    });

    /**
     * Populate translations
     */
    El.text(headerText, Ext.__('header_text'));
})(window, document);
