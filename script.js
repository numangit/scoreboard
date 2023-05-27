//select dom element
const allMatchContainerEl = document.getElementById("all-matches");
const addMatchBtnEl = document.getElementById("add-match-btn");
const resetBtnEl = document.getElementById("reset-btn");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDMATCH = "addMatch";
const RESET = "reset";

// action creators
const increment = (value, id,) => {
    return {
        type: INCREMENT,
        payload: { value, id },
    };
};

const decrement = (value, id) => {
    return {
        type: DECREMENT,
        payload: { value, id },
    };
};

const addMatch = () => {
    return {
        type: ADDMATCH
    }
}

const reset = () => {
    return {
        type: RESET
    }
}

//match states
const allMatchState = [
    { id: 1, matchNo: 1, score: 0 },
];

// create reducer function
function counterReducer(state = allMatchState, action) {
    if (action.type === INCREMENT) {
        const updatedState = [
            ...state
        ]
        updatedState.forEach(match => {
            if (match.id === action.payload.id) {
                match.score = match.score + action.payload.value;
                return;
            }
        });
        return updatedState;
    } else if (action.type === DECREMENT) {
        const updatedState = [
            ...state
        ]
        updatedState.forEach(match => {
            if (match.id === action.payload.id) {
                if (action.payload.value > match.score) {
                    match.score = 0;
                    return;
                } else {
                    match.score = match.score - action.payload.value;
                    return;
                }
            };
        });
        return updatedState;
    } else if (action.type === ADDMATCH) {
        const updatedState = [...state];
        const newState = { id: state.length + 1, matchNo: state.length + 1, score: 0 };
        updatedState.push(newState);
        return updatedState;
    } else if (action.type === RESET) {
        const updatedState = [...state];
        updatedState.forEach(match => {
            match.score = 0;
        })
        return updatedState;
    } else {
        return state;
    }
};

// create store
const store = Redux.createStore(counterReducer);

//function to display matches
const displayMatches = () => {
    const state = store.getState();
    allMatchContainerEl.innerHTML = "";
    state?.forEach(match => {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", match.id)
        newDiv.classList.add("match");
        newDiv.innerHTML = `
            <div class="wrapper">
                <button class="lws-delete">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">Match ${match.matchNo}</h3>
            </div>
            <div class="inc-dec">
                <form onsubmit="incrementHandler(event, ${match.id})" class="incrementForm">
                    <h4>Increment</h4>
                    <input id="increment-input" type="number" name="increment" class="lws-increment" />
                </form>
                <form onsubmit="decrementHandler(event, ${match.id})" class="decrementForm">
                    <h4>Decrement</h4>
                    <input id="decrement-input" type="number" name="decrement" class="lws-decrement" />
                </form>
            </div>
            <div class="numbers">
                <h2 id="score" class="lws-singleResult">${match.score}</h2>
            </div>
`;
        allMatchContainerEl.appendChild(newDiv);
    });
}

//function to render updated state
const render = () => {
    const state = store.getState();
    displayMatches();
};

//event handler for increment input
function incrementHandler(e, id) {
    e.preventDefault();
    const incrementValue = parseInt(e.target.increment.value);
    store.dispatch(increment(incrementValue, id));
    e.target.increment.value = '';
};

//event handler for decrement input
function decrementHandler(e, id) {
    e.preventDefault();
    const decrementValue = parseInt(e.target.decrement.value);
    store.dispatch(decrement(decrementValue, id));
    e.target.decrement.value = '';
};

//event handler for add match btn
addMatchBtnEl.addEventListener("click", () => {
    store.dispatch(addMatch());
});

//event handler for reset btn
resetBtnEl.addEventListener("click", () => {
    store.dispatch(reset());
})

// update UI initially
displayMatches();
render();
store?.subscribe(render);