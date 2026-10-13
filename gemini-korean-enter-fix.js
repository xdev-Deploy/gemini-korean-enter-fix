// ==UserScript==
// @name         Gemini Korean Enter Fix
// @match        https://gemini.google.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const DEBUG = false;
  const WINDOW_MS = 250;
  const SELECTORS =
    'button.send-button, button[aria-label*="Send"], button[aria-label*="전송"], button[aria-label*="보내기"]';
  const EXCLUDE = /feedback|피드백|report|신고|copy|복사|share|공유/i;

  let composing = false;
  let pending = false;
  let lastEnd = 0;
  let editor = null;

  const usable = (b) =>
    !b.disabled &&
    b.getAttribute('aria-disabled') !== 'true' &&
    b.getClientRects().length > 0 &&
    !EXCLUDE.test(b.getAttribute('aria-label') || '');

  const findButton = () => {
    let node = editor;
    for (let i = 0; node && i < 8; i++, node = node.parentElement) {
      for (const b of node.querySelectorAll(SELECTORS)) {
        if (usable(b)) return b;
      }
    }
    return null;
  };

  const send = (tries = 0) => {
    const btn = findButton();
    if (btn) {
      if (DEBUG) {
        btn.style.outline = '3px solid red';
        setTimeout(() => { btn.style.outline = ''; }, 1500);
      }
      btn.click();
      return;
    }
    if (tries < 8) setTimeout(() => send(tries + 1), 40);
  };

  document.addEventListener('compositionstart', () => {
    composing = true;
  }, true);

  document.addEventListener('compositionend', () => {
    composing = false;
    lastEnd = Date.now();
    if (pending) {
      pending = false;
      setTimeout(send, 30);
    }
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
    const target = e.target.closest ? e.target.closest('[contenteditable="true"], textarea') : null;
    if (!target) return;
    editor = target;

    if (e.isComposing || composing) {
      pending = true;
      return;
    }

    if (Date.now() - lastEnd < WINDOW_MS) {
      e.preventDefault();
      e.stopImmediatePropagation();
      setTimeout(send, 30);
    }
  }, true);
})();