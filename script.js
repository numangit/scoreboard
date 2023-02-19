//select dom element
const allMatchContainerEl = document.getElementById("all-matches");
const scoreEl = document.getElementById("score");
const incrementFormEl = document.getElementById("increment-form");
const decrementFormEl = document.getElementById("decrement-form");
const incrementInputEl = document.getElementById("increment-input");
const decrementInputEl = document.getElementById("decrement-input");
const addMatchBtnEl = document.getElementById("add-match-btn");

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
        if (action.payload > state.value) {
            return {
                ...state,
                value: 0
            };
        } else {
            return {
                ...state,
                value: state.value - action.payload,
            };
        };
    } else {
        return state;
    }
};

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    if (state > 0) {
        scoreEl.innerText = 0;
    } else {
        scoreEl.innerText = state.value.toString();
    };
};

// update UI initially
render();

store.subscribe(render);

// event listeners
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

addMatchBtnEl.addEventListener("click", () => {
    console.log("btnclicked");
});
