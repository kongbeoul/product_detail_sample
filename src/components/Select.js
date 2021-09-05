import Component from "../core/component.js";

export default class Select extends Component {
    state = {
        selectedIndex: 0
    }
    constructor($app, props) {
        super(props);
        this.$target = document.createElement("select");
        $app.appendChild(this.$target);
        this.handleChange = e => {
            if(e.target.value.id !== 0) {
                this.props.onChange({...JSON.parse(e.target.value), value: 1 });
                this.setState({
                    selectedIndex: 0
                })
            }
        }
        return this;
    }

    setState(nextState) {
        if(nextState && typeof nextState === "object" && nextState.__proto__ !== undefined) {
            this.state = {
                ...this.state,
                ...nextState
            }
        }

        this.render();
    }

    render() {
        const options = [{ id: 0, name: '기본', stock: 0, price: 0 }, ...this.props.options];
        this.$target.innerHTML = options.map(option => {
            const { id, name, price } = option;
            return `<option value='${JSON.stringify(option)} ${this.state.selectedIndex === id ? 'selected' : '' }'>${name} (+${price.toLocaleString()}원)</option>`
        })

        this.mounted();
    }

    mounted() {
        this.$target.removeEventListener("change", this.handleChange);
        this.$target.addEventListener("change", this.handleChange);
    }
}