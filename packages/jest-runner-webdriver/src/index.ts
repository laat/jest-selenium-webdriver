import { bind as bindEach } from 'jest-each';
import { BlockName, BlockFn, TestName, TestFn, HookFn } from './types';
import { dispatchDescribe, dispatchTest, dispatchAddHook } from './actions';

const withEach = <T extends Function>(fn: T): T & { each: T } =>
  Object.assign(fn, { each: bindEach(fn) });

interface DescribeImpl {
  (blockName: BlockName, blockFn: BlockFn): void;
  each: (blockName: BlockName, blockFn: BlockFn) => void;
}
interface Describe extends DescribeImpl {
  only: DescribeImpl;
  skip: DescribeImpl;
}

const describe: Describe = Object.assign(
  withEach((blockName: BlockName, blockFn: BlockFn) =>
    dispatchDescribe(blockName, blockFn)
  ),
  {
    only: withEach((blockName: BlockName, blockFn: BlockFn) =>
      dispatchDescribe(blockName, blockFn, 'only')
    ),
    skip: withEach((blockName: BlockName, blockFn: BlockFn) =>
      dispatchDescribe(blockName, blockFn, 'skip')
    )
  }
);

interface TestImpl {
  (testName: TestName, fn?: TestFn, timeout?: number): void;
  each: (testName: TestName, fn?: TestFn, timeout?: number) => void;
}
interface ITest extends TestImpl {
  only: TestImpl;
  skip: TestImpl;
}

const test: ITest = Object.assign(
  withEach((testName: TestName, fn?: TestFn, timeout?: number) => {
    return dispatchTest(testName, fn, undefined, timeout);
  }),
  {
    only: withEach((testName: TestName, fn?: TestFn, timeout?: number) => {
      return dispatchTest(testName, fn, 'only', timeout);
    }),
    skip: withEach((testName: TestName, fn?: TestFn, timeout?: number) => {
      return dispatchTest(testName, fn, 'skip', timeout);
    })
  }
);

const it = test;

type THook = (fn: HookFn, timeout?: number) => void;

const beforeEach: THook = (fn, timeout) =>
  dispatchAddHook(fn, 'beforeEach', beforeEach, timeout);
const beforeAll: THook = (fn, timeout) =>
  dispatchAddHook(fn, 'beforeAll', beforeAll, timeout);
const afterEach: THook = (fn, timeout) =>
  dispatchAddHook(fn, 'afterEach', afterEach, timeout);
const afterAll: THook = (fn, timeout) =>
  dispatchAddHook(fn, 'afterAll', afterAll, timeout);

export { beforeAll, beforeEach, afterAll, afterEach, describe, test, it };
