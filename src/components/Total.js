import Component from "../core/component.js";

export default class Total extends Component {
    constructor($app, props) {
        super(props);
        $app.appendChild(this.$target);
    }

    render(nextProps) {
        if(nextProps && typeof nextProps === "object" && nextProps.__proto__ !== undefined) {
            this.props = {
                ...this.props,
                ...nextProps
            }
        }

        this.$target.innerHTML = this.props.totalPrice.toLocaleString() + '원';
    }
}