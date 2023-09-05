class DrawableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    currentImage = 0;

    /**
     * This function creates a new image and sets it to the "img" variable in the current object.
     * The path to the images source is turned over to the function.
     * 
     * @param {String} path - the path to the images source.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function creates a new image and sets it to the "imgCache" variable in the current object 
     * for each path from the given pathArray.
     * The array with the paths to the images sources are turned over to the function.
     * 
     * @param {Array} pathArray - an array with several image paths.
     */
    loadImageCache(pathArray) {
        pathArray.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
}