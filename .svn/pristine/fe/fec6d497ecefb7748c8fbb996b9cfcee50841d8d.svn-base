function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  let WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

// 在需要调用客户端方法的组件中（事先需要与客户端同事约定好方法名）
// this.$bridge.callhandler('ObjC Echo', params, (data) => {
//   // 处理返回数据
// })

// 当客户端需要调用 js 函数时,事先注册约定好的函数即可
// this.$bridge.registerhandler('JS Echo', (data, responseCallback) => {
//   alert('JS Echo called with:', data)
//   responseCallback(data)
// }

export default {
  callhandler (name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  registerhandler (name, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}
