import UserActionTypes from "./user.types";

export const signInWithGoogle = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const signInWithEmailAndPassword = (emailAndPassword) => ({
  type: UserActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkSignIn = () => ({
  type: UserActionTypes.CHECK_SIGN_IN,
});

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signUpStart = (email, password, displayName) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: { email, password, displayName },
});

export const signUpSuccess = (user, additionalData) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});
