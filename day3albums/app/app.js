var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

class App extends React.Component {
    render () {
        return (
            <div>
                <h1>Album Showcase</h1>
                <RouteHandler />
            </div>
        );
    }
}

class Home extends React.Component {
    render () {
        return (
            <div>Albums list :)</div>
        );
    }
}

class Album extends React.Component {
    render () {
        return (
            <div>Appetite for Destruction</div>
        );
    }
}

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Home} />
        <Route name="album/:id" handler={Album} />
    </Route>
);

Router.run(routes, (Handler) => {
    React.render(<Handler />, document.getElementById('app'));
});
