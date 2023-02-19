//select dom element
const scoreEl = document.getElementById("score");
const incrementFormEl = document.getElementById("increment-form");
const decrementFormEl = document.getElementById("decrement-form");
const incrementInputEl = document.getElementById("increment-input");
const decrementInputEl = document.getElementById("decrement-input");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";

// action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value,
    };
};

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value,
    };
};

// initial state
const initialState = {
    value: 120,
};

// create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        return {
            ...state,
            value: state.value + action.payload,
        };
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload,
        };
    } else {
        return state;
    }
};

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    console.log(state);
    // if (state > 0) {
    //     scoreEl.innerText = 0;
    // } else {
    scoreEl.innerText = state.value.toString();
    // };
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
incrementFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const incrementValue = parseInt(incrementInputEl.value);
    store.dispatch(increment(incrementValue));
});

decrementFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const decrementValue = parseInt(decrementInputEl.value);
    store.dispatch(decrement(decrementValue));
});
