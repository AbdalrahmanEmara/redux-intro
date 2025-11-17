import { createStore } from 'redux';

const { act } = require("react");

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan": {
      if (state.loan > 0) return state;
      // LATER
      return { ...state, loan: action.payload.amount, balance: state.balance + action.payload.amount, loanPurpose: action.payload.purpose };
    }
    case "account/payLoan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }
    default:
      return state;
  }
}

const store = createStore(reducer);

// store.dispatch({type: "account/deposit", payload: 500});
// console.log(store.getState());
// store.dispatch({type: "account/withdraw", payload: 100});
// console.log(store.getState().balance);

// store.dispatch({type: 'account/requestLoan', payload: {amount: 1000, purpose: "Buy a car"} });
// console.log(store.getState());

// store.dispatch({type: "account/payLoan"});
// console.log(store.getState());

function deposite(amount) {
  return {type: "account/deposit", payload: amount};
}

function withdraw(amount) {
  return {type: "account/withdraw", payload: amount}
}

function requestLoan(amount, purpose) {
  return {type: 'account/requestLoan', payload: {amount: amount, purpose: purpose} }
}

function payLoan() {
  return {type: "account/payLoan"};
}

store.dispatch(deposite(1000));
console.log(store.getState());

store.dispatch(withdraw(500));
console.log(store.getState());

store.dispatch(requestLoan(5000, "Buy a laptop"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());