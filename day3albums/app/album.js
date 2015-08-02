var album = {},
    albums = [
        {
            name: 'Appetite for Destruction',
            artist: "Guns n' Roses",
            image: 'img/afd.jpg'
        },
        {
            name: 'Crush',
            artist: 'Bon Jovi',
            image: 'img/crush.png'
        }
    ];

album.getAllAlbums = function() {
    return albums;
};

album.getAlbum = function(name) {
    var result = albums.filter(function( obj ) {
        return obj.name === name;
    });
};

module.exports = album;
