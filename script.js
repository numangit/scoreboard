//select dom element
const allMatchContainerEl = document.getElementById("all-matches");
const scoreEl = document.getElementById("score");
const incrementFormEl = document.getElementById("increment-form");
const decrementFormEl = document.getElementById("decrement-form");
const incrementInputEl = document.getElementById("increment-input");
const decrementInputEl = document.getElementById("decrement-input");
const addMatchBtnEl = document.getElementById("add-match-btn");
const resetBtnEl = document.getElementById("reset-btn");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";

// action creators
const increment = (value, id) => {
    const updatedCounter = state.map((matchState) => {
        if (matchState.id === id) {
            return {
                type: INCREMENT,
                payload: { value, matchState },
            };
        } else {
            return;
        };
    });
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

//match states
const allMatchState = [
    { id: 1, matchNo: 1, score: 120 },
    { id: 2, matchNo: 2, score: 0 },
]

// create reducer function
function counterReducer(state = allMatchState, action) {
    if (action.type === INCREMENT) {
        allMatchState.forEach(match => {
            if (match.id === action.payload.matchState.id) {
                return {
                    ...state,
                    score: state.match.score + action.payload.value,
                };
            }
        });
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

// event listeners
const incrementHandler = (e) => {
    e.preventDefault();
    console.log(e);

    // const incrementValue = parseInt(e.target.element.value);
    // store.dispatch(increment(incrementValue, id));
};

const render = () => {
    const state = store.getState();
    allMatchContainerEl.innerHTML = "";
    state.forEach(match => {
        const newDiv = document.createElement("div");
        // newLi.classList.add("nav-item");
        newDiv.innerHTML = `
        <div id="match" class="match">
            <div class="wrapper">
                <button class="lws-delete">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">Match ${match.matchNo}</h3>
            </div>
            <div class="inc-dec">
                <form onsubmit='${() => incrementHandler(match.id)}' class="incrementForm">
                    <h4>Increment</h4>
                    <input id="increment-input" type="number" name="increment" class="lws-increment" />
                </form>
                <form id="decrement-form" class="decrementForm">
                    <h4>Decrement</h4>
                    <input id="decrement-input" type="number" name="decrement" class="lws-decrement" />
                </form>
            </div>
            <div class="numbers">
                <h2 id="score" class="lws-singleResult">${match.score}</h2>
            </div>
        </div>`;
        allMatchContainerEl.appendChild(newDiv);
    });
};

// update UI initially
render();

store.subscribe(render);

// // event listeners
// const incrementHandler = (e, id) => {
//     e.preventDefault();
//     const incrementValue = parseInt(e.target.element.value);
//     store.dispatch(increment(incrementValue, id));
// };

// decrementFormEl.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const decrementValue = parseInt(decrementInputEl.value);
//     store.dispatch(decrement(decrementValue));
// });

addMatchBtnEl.addEventListener("click", () => {
    console.log("btnclicked");
    // new object for state 
    const newState = { id: allMatchState.length + 1, matchNo: allMatchState.length + 1, score: 0 };
    allMatchState.push(newState);
    render();
});

// function to display matches
// const displayMatch = () => {
//     allMatchState.forEach(match => {
//         const newDiv = document.createElement("div");
//         // newLi.classList.add("nav-item");
//         newDiv.innerHTML = `
//         <div id="match" class="match">
//             <div class="wrapper">
//                 <button class="lws-delete">
//                     <img src="./image/delete.svg" alt="" />
//                 </button>
//                 <h3 class="lws-matchName">Match ${match.match}</h3>
//             </div>
//             <div class="inc-dec">
//                 <form onsubmit=${incrementHandler(match.id)} class="incrementForm">
//                     <h4>Increment</h4>
//                     <input id="increment-input" type="number" name="increment" class="lws-increment" />
//                 </form>
//                 <form id="decrement-form" class="decrementForm">
//                     <h4>Decrement</h4>
//                     <input id="decrement-input" type="number" name="decrement" class="lws-decrement" />
//                 </form>
//             </div>
//             <div class="numbers">
//                 <h2 id="score" class="lws-singleResult">${match.score}</h2>
//             </div>
//         </div>`;
//         allMatchContainerEl.appendChild(newDiv);
//     });
// };

// displayMatch();

resetBtnEl.addEventListener("click", () => {
    console.log('reseet');
    allMatchState.forEach(match => {
        match.score = 0;
    })
    render();
})
