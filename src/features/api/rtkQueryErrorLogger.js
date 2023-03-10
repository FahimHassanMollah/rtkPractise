import { isRejectedWithValue } from '@reduxjs/toolkit'
// import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log('We got a rejected action!')
    // toast.warn({ title: 'Async error!', message: action.error.data.message })
  }

  return next(action)
}