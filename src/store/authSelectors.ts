import { RootState } from 'store'

export const selectisLoggedIn = (state: RootState) => state.account.isLoggedIn
export const selectuser = (state: RootState) => state.account.user
export const selectError = (state: RootState) => state.account.error
