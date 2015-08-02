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
                <Link to="/"><h1>Album Showcase</h1></Link>
                <RouteHandler />
            </div>
        );
    }
}

class Home extends React.Component {
    componentWillMount () {
        this.setState({
            albums: AlbumProvider.getAllAlbums()
        });
    }
    render () {
        return (
            <div>
                <ul>
                    {this.state.albums.map((album) => (
                        <AlbumItem key={album.name} albumName={album.name} artist={album.artist} image={album.image} />
                    ))}
                </ul>
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.func
};

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
    constructor() {
        super();
        this.addSong = this.addSong.bind(this);
    }
    componentWillMount () {
        var { router } = this.context;
        var name = router.getCurrentParams().name;
        this.state = AlbumProvider.getAlbum(name);
    }
    addSong (event) {
        if (event.key === 'Enter') {
            this.state.songs.push(event.target.value);
            event.target.value = '';
            this.forceUpdate();
        }
    }
    render () {
        return (
            <div>
                <h2>{this.state.name} - {this.state.artist}</h2>
                <img src={this.state.image} height="200" />
                <hr />
                <Songs songs={this.state.songs} addSong={this.addSong} />
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
            <div>
                <ul>
                    {this.props.songs.map(song => (
                        <Song key={song} song={song} />
                    ))}
                </ul>
                <AddSong event={this.props.addSong} />
            </div>
        );
    }
}

class Song extends React.Component {
    static propTypes = {
        song: React.PropTypes.string.isRequired
    }
    render () {
        return (
            <li>{this.props.song}</li>
        );
    }
}

class AddSong extends React.Component {
    static propTypes = {
        event: React.PropTypes.func.isRequired
    }
    render () {
        return (<input type="text" placeholder="Song Name" onKeyPress={this.props.event} />);
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
