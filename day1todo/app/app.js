var React = require('react');

class TodoInput extends React.Component {
    static propTypes = {
        event: React.PropTypes.func.isRequired
    };
    render () {
        return (
            <input type="text" placeholder="do something?!" onKeyPress={this.props.event} />
        );
    }
}

class TodoItem extends React.Component {
    static propTypes = {
        event: React.PropTypes.func.isRequired,
        item: React.PropTypes.string.isRequired
    };
    render () {
        return (
            <li>{this.props.item} <a value={this.props.item} onClick={this.props.event}>Remove</a></li>
        );
    }
}

class TodoList extends React.Component {
    constructor() {
        super();
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            items: [],
            input: <TodoInput event={this.addItem} />
        };
    }
    addItem (event) {
        if (event.key === 'Enter') {
            this.state.items.push(event.target.value);
            event.target.value = '';
            this.forceUpdate();
        }
    }
    removeItem (event) {
        var index = this.state.items.indexOf(event.target.attributes.value.value);
        this.state.items.splice(index, 1);
        this.forceUpdate();
    }
    render () {
        return (
            <div className="container">
                {this.state.input}
                <ul className="list">
                    {this.state.items.map((item) => (
                        <TodoItem key={item} item={item} event={this.removeItem} />
                    ))}
                </ul>
            </div>
        );
    }
}

React.render(<TodoList />, document.getElementById('app'));
