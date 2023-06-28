const allImages = ["995v0c669a.jpg","995v7bc88b.jpg","995vcb3b56.jpg","995vd88e39.jpg","APR-Mitsubishi-Lancer-Evolution-VIII.jpg","C-West-Nissan-Silvia-S15.jpg",'Dodge-Cobra-700x424.jpg',
    'Mitsubishi-Eclipse-Spyder.jpg','Nissan-350Z-z33.jpg'];


createGallery = () => {
    let row = 3;
    let column = 3;

    let images = document.getElementsByName('imageRow');
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            images[i].innerHTML += `
            <div class="imagesFlexItem">
                <a href = ${"img/Машины/" + allImages[column * i + j]}
                   data-fancybox = "gallery">
                   <img src=${"img/Машины/" + allImages[column * i + j]} />
                </a>
            </div>`;
        }
    };
};