import {
  Action,
  BlockName,
  BlockFn,
  BlockMode,
  TestName,
  TestFn,
  TestMode,
  HookFn,
  HookType
} from './types';

const dispatch = (action: Action) => console.log('dispatching', { action });

export const dispatchDescribe = (
  blockName: BlockName,
  blockFn: BlockFn,
  mode?: BlockMode
) => {
  dispatch({
    type: 'start_describe_definition',
    asyncError: new Error(),
    blockName,
    mode
  });
  blockFn();
  dispatch({
    type: 'finish_describe_definition',
    blockName,
    mode
  });
};

export const dispatchTest = (
  testName: TestName,
  fn?: TestFn,
  mode?: TestMode,
  timeout?: number
) => {
  if (mode == null) {
    if (typeof testName !== 'string') {
      throw new Error(
        `Invalid first argument, ${testName}. It must be a string.`
      );
    }
    if (fn === undefined) {
      throw new Error(
        'Missing second argument. It must be a callback function.'
      );
    }
    if (typeof fn !== 'function') {
      throw new Error(
        `Invalid second argument, ${fn}. It must be a callback function.`
      );
    }
  }
  const asyncError = new Error();
  if (Error.captureStackTrace) {
    Error.captureStackTrace(asyncError, test);
  }
  return dispatch({
    type: 'add_test',
    asyncError,
    fn,
    testName,
    timeout
  });
};

export const dispatchAddHook = (
  fn: HookFn,
  hookType: HookType,
  hookFn: Function,
  timeout?: number
) => {
  const asyncError = new Error();
  if (Error.captureStackTrace) {
    Error.captureStackTrace(asyncError, hookFn);
  }
  dispatch({ asyncError, fn, hookType, name: 'add_hook', timeout });
};
