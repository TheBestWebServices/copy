import { El, Ext } from './lib.js';

const
  headerText = El.$('#header-text'),
  textList = El.$('.text-list tbody'),
  copiedText = El.$('#copied-text')
;

let closePopupAfterCopy;

chrome.storage.sync.get('copy', (storage) => {
  const
    snippets = storage.copy.snippets,
    snippetslen = snippets.length
  ;

  closePopupAfterCopy = storage.copy.closePopupAfterCopy;

  if (snippetslen) {
    for (let i = 0; i < snippetslen; ++i) {
      textList.insertAdjacentHTML('beforeend', '<tr><td class="item" data-snippet-id="' + snippets[i].id + '">' + snippets[i].text + '</td></tr>');
    }
  } else {
    textList.insertAdjacentHTML('beforeend', '<tr><td class="text-center">' + Ext.__('no_data_text') + '</td></tr>');
  }
});

document.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('item')) {
    chrome.storage.sync.get('copy', (storage) => {
      const
        snippets = storage.copy.snippets,
        snippetId = el.dataset.snippetId
      ;

      for (let i = 0, snippetslen = snippets.length; i < snippetslen; ++i) {
        if (snippets[i].id === snippetId) {
          El.text(copiedText, snippets[i].text);
          break;
        }
      }

      copiedText.select();
      navigator.clipboard.writeText(copiedText.value);

      if (closePopupAfterCopy) {
        window.close();
      }
    });
  }

  if (el.classList.contains('info-btn') || el.parentNode.classList.contains('info-btn')) {
    chrome.tabs.query({ active: true, currentWindow: true }, (arrayOfTabs) => {
      chrome.tabs.sendMessage(arrayOfTabs[0].id, { action: 'showInfo' });
    });
  }
});

/**
 * Populate translations
 */
El.text(headerText, Ext.__('header_text'));
