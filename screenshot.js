var screenshotVideo;
const defaultSound = 'https://github.com/amiad/screenshot.js/raw/master/assets/cam-click.mp3';

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
                    //console.log('You need to allow screen share');
                    if (typeof this.args.noPremit == 'function'){
                        this.args.noPremit();
                    }
                });
            }
            else {
                this.takeScreenshot();
            }
        }
        else {
            //console.log('You\'re browser not support screen share');
            if (typeof this.args.noSupport == 'function'){
                this.args.noSupport();
            }
        }
    }

    takeScreenshot(){

        if (this.args.sound) {
            let sound;
            if (this.args.sound === true){
                sound = defaultSound;
            }
            else {
                sound = this.args.sound;
            }
            new Audio(sound).play();
        }
        
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