import Component from "../core/component.js";

export default class Options extends Component {
    state = {
        value: ''
    }
    constructor(props) {
        super(props);

        this.setState({
            value: this.props.value
        })

        this.handleChange = e => {
            const { value } = e.target;
            this.setState({ value });
            this.props.onChange(value);
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
    }

    render(nextProps) {
        if(nextProps && typeof nextProps === "object" && nextProps.__proto__ !== undefined) {
            this.props = {
                ...this.props,
                ...nextProps
            }
        }

        this.$target.innerHTML = `
            <span>${this.props.name}</span>
            <input type="number" value="${this.state.value}" min="1" max="${this.props.stock}" />
        `;

        this.mounted();

        return this.$target;
    }
    mounted() {
        this.$target.querySelector("input[type='number']").removeEventListener("change", this.handleChange);
        this.$target.querySelector("input[type='number']").addEventListener("change", this.handleChange);
    }
}