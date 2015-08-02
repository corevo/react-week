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
    render () {
        return (
            <h2>{this.props.name}</h2>
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
