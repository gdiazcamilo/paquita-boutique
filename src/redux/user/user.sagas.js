import { takeLatest, call, put, all } from "redux-saga/effects";
import { getDoc } from "firebase/firestore";

import {
  signInWithGooglePopUp,
  saveUser,
  signInWithEmailAndPassword,
  checkUserIsAuthenticated,
  createUser,
} from "../../firebase/firebase.utils";

import UserActionTypes from "./user.types";
import { signInSuccess, signOutSuccess, signUpSuccess } from "./user.actions";
import { signOut } from "../../firebase/firebase.utils";

function* signInToState(userAuth, additionalData = null) {
  try {
    const userRef = yield call(saveUser, userAuth, additionalData);
    const userSnapshot = yield call(getDoc, userRef);

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

function* signInWithGoogle() {
  try {
    const { user: userAuth } = yield call(signInWithGooglePopUp);
    yield signInToState(userAuth);
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

function* signInWithEmailAndPasswordSagas({ payload: { email, password } }) {
  try {
    const { user: userAuth } = yield call(
      signInWithEmailAndPassword,
      email,
      password
    );
    yield signInToState(userAuth);
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

function* checkUserSignIn() {
  try {
    const user = yield call(checkUserIsAuthenticated);
    if (user) {
      yield signInToState(user);
    }
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

function* signOutUser() {
  try {
    yield call(signOut);
    yield put(signOutSuccess());
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

function* signUpSagas({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createUser, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

function* signInSuccessSagas({ payload: { user, additionalData } }) {
  yield signInToState(user, additionalData);
}

// Listeners

function* watchSignInWithGoogle() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* watchSignInWithEmailAndPassword() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_START,
    signInWithEmailAndPasswordSagas
  );
}

function* watchCheckSignIn() {
  yield takeLatest(UserActionTypes.CHECK_SIGN_IN, checkUserSignIn);
}

function* watchSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser);
}

function* watchSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpSagas);
}

function* watchSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInSuccessSagas);
}

export function* userSagas() {
  yield all([
    call(watchSignInWithGoogle),
    call(watchSignInWithEmailAndPassword),
    call(watchCheckSignIn),
    call(watchSignOut),
    call(watchSignUp),
    call(watchSignUpSuccess),
  ]);
}
