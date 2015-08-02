var album = {},
    albums = [
        {
            name: 'Appetite for Destruction',
            artist: "Guns n' Roses",
            image: 'img/afd.jpg',
            songs: ['Welcome to the Jungle', "Sweet Child o' Mine", 'Paradise City']
        },
        {
            name: 'Crush',
            artist: 'Bon Jovi',
            image: 'img/crush.png',
            songs: ["It's My Life"]
        }
    ];

album.getAllAlbums = function() {
    return albums;
};

album.getAlbum = function(name) {
    var result = albums.filter(function( obj ) {
        return obj.name === name;
    });

    return result[0];
};

module.exports = album;
