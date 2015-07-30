var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

class App extends React.Component {
    render () {
        return (
            <div>
                <h1>Hello World!</h1>
                <RouteHandler />
            </div>
        );
    }
}

class Home extends React.Component {
    render () {
        return (
            <Link to="me">Me!!!</Link>
        );
    }
}

class Me extends React.Component {
    render () {
        return (
            <div>Tomer</div>
        );
    }
}

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Home} />
        <Route name="me" handler={Me} />
    </Route>
);

Router.run(routes, (Handler) => {
    React.render(<Handler />, document.getElementById('app'));
});
