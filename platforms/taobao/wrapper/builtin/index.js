import * as _window from './window'
import * as _document from './document'

var global = $global;

function inject () {
  // 暴露全局的 canvas
  _window.canvas = $global.screencanvas;
  _window.document = _document;

  _window.addEventListener = (type, listener) => {
    _window.document.addEventListener(type, listener)
  }
  _window.removeEventListener = (type, listener) => {
    _window.document.removeEventListener(type, listener)
  }
  _window.dispatchEvent = _window.document.dispatchEvent;

  const { platform } = my.getSystemInfoSync()

  // 开发者工具无法重定义 window
  if (typeof __devtoolssubcontext === 'undefined' && platform === 'devtools') {
    for (const key in _window) {
      const descriptor = Object.getOwnPropertyDescriptor(global, key)

      if (!descriptor || descriptor.configurable === true) {
        Object.defineProperty(window, key, {
          value: _window[key]
        })
      }
    }

    for (const key in _window.document) {
      const descriptor = Object.getOwnPropertyDescriptor(global.document, key)

      if (!descriptor || descriptor.configurable === true) {
        Object.defineProperty(global.document, key, {
          value: _window.document[key]
        })
      }
    }
    window.parent = window
  } else {
    for (const key in _window) {
      global[key] = _window[key]
    }
    // global.window = _window
    // window = global
    // window.top = window.parent = window
  }
}

if (!global.__isAdapterInjected) {
  global.__isAdapterInjected = true
  inject()
}
