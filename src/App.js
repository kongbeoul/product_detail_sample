import Select from "./components/Select.js";
import Options from "./components/Options.js";
import Total from "./components/Total.js";

import { addOption, updateSelectedOptions, updateTotalPrice } from "./reducers/product.js"

export default function App($app, store) {
    $app.innerHTML = "<div>상품명</div>";
    
    this.$option = document.createElement("div");
    
    this.select = new Select($app, {
        options: [
            {
                id: 1,
                name: '100개 번들',
                price: 1000,
                stock: 5,
            },
            {
                id: 2,
                name: '200개 번들',
                price: 2000,
                stock: 3
            },
            {
                id: 3,
                name: '300개 번들',
                price: 3000,
                stock: 2
            }
        ],
        onChange: values => {
            store.dispatch(addOption(values));
            store.dispatch(updateTotalPrice());
        }
    }).render();

    $app.appendChild(this.$option);

    this.total = new Total($app, {
        totalPrice: store.getState().totalPrice
    })

    const render = () => {
        const state = store.getState();

        this.$option.innerHTML = '';

        state.product.selectedOptions.forEach(option => {
            const { id, value, name, stock, price } = option;
            const instance = new Options({
                value,
                name,
                stock,
                price,
                onChange: _value => {
                    store.dispatch(updateSelectedOptions({
                        id,
                        value: _value
                    }));
                    store.dispatch(updateTotalPrice());
                }
            }).render();

            this.$option.appendChild(instance);
        });

        this.total.render({
            totalPrice: state.product.totalPrice
        })
    };

    render();
    store.subscribe(render);
}