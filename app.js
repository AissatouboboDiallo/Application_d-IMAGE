function myFonctionLocalisation(latitude, longitude) {
    var map = L.map('map').setView([latitude,longitude], 13);
    var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });           
    tileLayer.addTo(map);
    var marker = L.marker([latitude,longitude]);
    marker.addTo(map);
}

const maFonctionRecherche = async () => {
    document.getElementById('map').innerHTML=" ";
    let apiKey = "6aa32afaa97bd09fd0402df4a1e84e7d"
    let searchTerm = document.getElementById("search").value; 
    if (!searchTerm.trim())
    {
        document.getElementById('textaffiche').textContent=" Veuillez remplir le champ !"
    } 
    let per_page = 30;
    let page = 1;
    let apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&format=json&nojsoncallback=1&extras=geo&per_page=${per_page}&page=${page}`;
    let data = await fetch(apiUrl);
    console.log(data);
    let response = await data.json();
    console.log(response);
    document.getElementById('result').innerHTML = ' ';
    response.photos.photo.forEach(image => {
        //  var result = ` <img src="${image.id}" width=25%; heigth=3%;" >`;
        const imageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
        let elementImg = document.createElement('img');
        elementImg.src = imageUrl;
        elementImg.width = 110;
        elementImg.height = 80;
        elementImg.className = 'effetClick';
        var longitude = document.createElement('h3');
        longitude.textContent = "longitude : " + image.longitude;
        var latitude = document.createElement('h3');
        latitude.textContent = "latitude : " + image.latitude;
        latitude.className ='long'
        longitude.className='long'
        var description_photo = document.createElement('h2');
        description_photo.textContent = image.title;
        let latitude1 = image.latitude;
        let longitude1 = image.longitude;
        elementImg.addEventListener('click', () => {
            let afficheImage = document.createElement('img');
            afficheImage.src = elementImg.src;
            afficheImage.width = 870;
            afficheImage.height = 700;
            let containerAffiche = document.getElementById('affiche');
            containerAffiche.innerHTML = ' ';
            containerAffiche.append(description_photo, afficheImage, longitude, latitude);            
            myFonctionLocalisation(latitude1,longitude1)
        });
        $("#result").append(elementImg);
    });
}
