var screenshotVideo;
class Screenshot {
    constructor(args){
        this.args = args;

        if (typeof navigator.mediaDevices.getDisplayMedia == 'function'){
            if (! screenshotVideo){
                screenshotVideo = document.createElement("video");
                screenshotVideo.setAttribute('autoplay', true);
                screenshotVideo.style.top = '-9999px';
                screenshotVideo.style.position = 'absolute';
                screenshotVideo.style.marginBottom = screenshotVideo.clientHeight * -1 + 'px';
                document.body.appendChild(screenshotVideo);
            }
            if (! screenshotVideo.srcObject){
                navigator.mediaDevices.getDisplayMedia({
                    audio: false
                })
                .then((record) => {
                    screenshotVideo.srcObject = record;
                    
                    this.takeScreenshot();
                })
                .catch((e) => {
                    console.log('You can allow screen share');
                });
            }
            else {
                this.takeScreenshot();
            }
        }
        else {
            console.log('You\'re browser not support screen share'); 
        }
    }

    takeScreenshot(){
        
        setTimeout(() => {
            const canvas = document.createElement("canvas");
            canvas.width = screenshotVideo.clientWidth;
            canvas.height = screenshotVideo.clientHeight;
            canvas.getContext('2d').drawImage(screenshotVideo, 0, 0, canvas.width, canvas.height);
            const img = document.createElement("img");
            img.src = canvas.toDataURL();

            img.addEventListener('load', () => {
                if (typeof this.args.success == 'function'){
                    this.args.success(img);
                }
            });
        }, 100);
    }
}