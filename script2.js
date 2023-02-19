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
const increment = (value, e) => {
    return {
        type: INCREMENT,
        payload: { value, e },
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

// const initialState = [
//     { id:1, matchNo: 1, value: 120 },
//     { id:2, matchNo: 2, value: 0 },
// ];

// create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        console.log(action.payload.e);
        return {
            ...state,
            value: state.value + action.payload.value,
        };
    } else if (action.type === DECREMENT) {
        if (action.payload > state.value) {
            return {
                ...state,
                value: 0
            }
        } else {
            return {
                ...state,
                value: state.value - action.payload,
            };
        }
    } else {
        return state;
    }
};

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    console.log(state);
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
    store.dispatch(increment(incrementValue, e));
});

decrementFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const decrementValue = parseInt(decrementInputEl.value);
    store.dispatch(decrement(decrementValue));
});

addMatchBtnEl.addEventListener("click", () => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
            <div id="match" class="match">
                <div class="wrapper">
                    <button class="lws-delete">
                        <img src="./image/delete.svg" alt="" />
                    </button>
                    <h3 class="lws-matchName">Match 1</h3>
                </div>
                <div class="inc-dec">
                    <form id="increment-form" class="incrementForm">
                        <h4>Increment</h4>
                        <input id="increment-input" type="number" name="increment" class="lws-increment" />
                    </form>
                    <form id="decrement-form" class="decrementForm">
                        <h4>Decrement</h4>
                        <input id="decrement-input" type="number" name="decrement" class="lws-decrement" />
                    </form>
                </div>
                <div class="numbers">
                    <h2 id="score" class="lws-singleResult">120</h2>
                </div>
            </div>`;
    allMatchContainerEl.appendChild(newDiv);

    // new object for state 
    const state = { id: initialState.length + 1, match: initialState.length + 1, value: 0 };
    initialState.push(state);

});
