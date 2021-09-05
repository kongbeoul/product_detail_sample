export default class Component {
    state = {};
    constructor(props) {
        this.props = props;
        this.$target = document.createElement("div");
    }
    setState(nextState) {
        if(nextState && typeof nextState === 'object' && nextState.__proto__ !== undefined) { 
            this.state = {
                ...this.state, 
                ...nextState 
            } 
        };
        this.render();
        this.mounted() 
    }
    render(nextProps) { 
        if(nextProps && typeof nextProps === 'object' && nextProps.__proto__ !== undefined) {
            this.props = {
                ...this.props,
                ...nextProps
            }
        }

        const newNode = this.$target.cloneNode(true);
        newNode.innerHTML = ``;

        const oldNodeChilds = [...this.$target.childNodes];
        const newNodeChilds = [...newNode.childNodes];
        const len = Math.max(oldNodeChilds.length, newNodeChilds.length);
        
        for(let i = 0; i < len; i++) {
            // core/diff.js
            // updateElements(this.$target, newNodeChilds[i], oldNodeChild[i]) 
        }
    };
    mounted() {};
}