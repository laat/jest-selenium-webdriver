export type Action =
  | {
      type: 'start_describe_definition';
      asyncError: Error;
      blockName: BlockName;

      mode: BlockMode;
    }
  | {
      type: 'finish_describe_definition';
      blockName: BlockName;
      mode: BlockMode;
    }
  | {
      asyncError: Error;
      type: 'add_test';
      testName: TestName;
      fn?: TestFn;
      mode?: TestMode;
      timeout?: number;
    }
  | {
      asyncError: Error;
      name: 'add_hook';
      hookType: HookType;
      fn: HookFn;
      timeout?: number;
    };

export type BlockMode = void | 'skip' | 'only';
export type BlockFn = () => void;
export type BlockName = string | Function;
export type TestMode = BlockMode;
export type TestName = string;
export type TestFn = (done?: DoneFn) => Promise<any> | any;
export type HookFn = (done?: DoneFn) => Promise<any> | any;
export type DoneFn = (reason?: string | Error) => void;
export type SharedHookType = 'afterAll' | 'beforeAll';
export type HookType = SharedHookType | 'afterEach' | 'beforeEach';
