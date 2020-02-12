
function downloadAudio (item, callback) {
    if (cc.sys.__audioSupport.format.length === 0) {
        return new Error(cc.debug.getError(4927));
    }

    var dom = document.createElement('audio');
    dom.src = item.url;
    
    // HACK: wechat does not callback when load large number of assets
    callback(null, dom);
}

cc.loader.downloader.addHandlers({
    // Audio
    mp3 : downloadAudio,
    ogg : downloadAudio,
    wav : downloadAudio,
    m4a : downloadAudio,
});