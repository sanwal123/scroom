var imagesPath = './images/';
var threesixty = new ThreeSixty(document.getElementById('threeSixtyZoom'), {
    image: imagesPath + 'img1.jpg',
    count: 24,
    perRow: 8,
    width: 328,
    height: 328,
    imagesPath: imagesPath
}, document.getElementById('threesixty'));
wheelzoom(document.querySelector('img.zoom'));

document.getElementById('threeSixtyZoom').addEventListener('mousedown', function(){
    if(!isZoomed) {

        document.getElementById('zoomImage').style.zIndex="0";
        document.getElementById('zoomImage').style.display="none";

        document.getElementById('threesixty').style.zIndex="1";
        document.getElementById('threesixty').style.display="block";

    }
})

document.addEventListener('mouseup', function () {

    document.getElementById('zoomImage').style.zIndex = "1";
    document.getElementById('zoomImage').style.display = "block";

    document.getElementById('threesixty').style.zIndex = "0";
    document.getElementById('threesixty').style.display = "none";

})