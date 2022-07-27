const yt = require('youtube-search-without-api-key');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const fs = require('fs');

module.exports = async function YTDFun(message){
    console.log("rodando issaqui")
    let content = message.text.substring(3)
    const video = await yt.search(content).catch(err=> err);
        let YD =  new YoutubeMp3Downloader({
            "ffmpegPath": "C:/PATH_Programs/ffmpeg",       
            "outputPath":"D:/WPP",    
            "youtubeVideoQuality": "highestaudio",  
            "queueParallelism": 2,                  
            "progressTimeout": 2000,                
            "allowWebm": false
        })
    YD.download(video[0].url.substring(32))
     YD.on("finished",async  function(err, data) {
    })
    return YD
}