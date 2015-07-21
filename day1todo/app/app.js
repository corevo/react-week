var React = require('react');

var TodoInput = React.createClass({
    render () {
        return (
            <input type="text" placeholder="do something?!" onKeyPress={this.props.event} />
        );
    }
});

var TodoItem = React.createClass({
    render () {
        return (
            <li value={this.props.item}>{this.props.item} <a onClick={this.props.event}>Remove</a></li>
        );
    }
});

var TodoList = React.createClass({
    getInitialState () {
        return {
            items: [],
            input: <TodoInput event={this.addItem} />
        };
    },
    addItem (event) {
        if (event.key === 'Enter') {
            this.state.items.push(event.target.value);
            event.target.value = '';
            this.forceUpdate();
        }
    },
    removeItem (event) {
        this.state.items.pop(event.target.value);
        this.forceUpdate();
    },
    render () {
        return (
            <div className="container">
                {this.state.input}
                <ul className="list">
                    {this.state.items.map((item) => (
                        <TodoItem item={item} event={this.removeItem} />
                    ))}
                </ul>
            </div>
        );
    }
});

React.render(<TodoList />, document.getElementById('app'));
