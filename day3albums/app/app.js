var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var AlbumProvider = require('./album.js');

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            albums: AlbumProvider.getAllAlbums()
        };
    }
    render () {
        return (
            <div>
                <h1>Album Showcase</h1>
                <RouteHandler albums={this.state.albums} />
            </div>
        );
    }
}

class Home extends React.Component {
    static propTypes = {
        albums: React.PropTypes.array.isRequired
    };
    render () {
        return (
            <div>
                <ul>
                    {this.props.albums.map((album) => (
                        <AlbumItem key={album.name} albumName={album.name} artist={album.artist} image={album.image} />
                    ))}
                </ul>
            </div>
        );
    }
}

class AlbumItem extends React.Component {
    static propTypes = {
        albumName: React.PropTypes.string.isRequired,
        artist: React.PropTypes.string,
        image: React.PropTypes.string.isRequired
    };
    render () {
        return (
            <li>
                <Link to="album" params={{
                        name: this.props.albumName
                    }}>
                    <h2 style={{display: 'inline'}}>{this.props.albumName}</h2>
                </Link><h2 style={{display: 'inline'}}> - {this.props.artist}</h2>
                <Link to="album" params={{
                        name: this.props.albumName
                    }}>
                    <img src={this.props.image} style={{display: 'block'}} height="200" />
                </Link>
            </li>
        );
    }
}

class Album extends React.Component {
    componentWillMount () {
        var { router } = this.context;
        var name = router.getCurrentParams().name;
        this.state = AlbumProvider.getAlbum(name);
    }
    render () {
        return (
            <div>
                <h2>{this.state.name} - {this.state.artist}</h2>
                <img src={this.state.image} height="200" />
                <hr />
                <Songs songs={this.props.songs} />
            </div>
        );
    }
}

Album.contextTypes = {
    router: React.PropTypes.func
};

class Songs extends React.Component {
    static propTypes = {
        songs: React.PropTypes.array.isRequired
    }
    render () {
        return (
            <ul>
                {this.props.songs.map(song => (
                    <Song song={song} />
                ))}
            </ul>
        );
    }
}

class Song extends React.Component {
    static propTypes = {
        song: React.PropTypes.string.isRequired
    }
    render () {
        return (
            <li>this.props.song</li>
        );
    }
}

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Home} />
        <Route name="album" path="album/:name" handler={Album} />
    </Route>
);

Router.run(routes, (Handler) => {
    React.render(<Handler />, document.getElementById('app'));
});
