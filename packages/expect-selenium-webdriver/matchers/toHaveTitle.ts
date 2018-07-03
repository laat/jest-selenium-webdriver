declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTitle: (title: string) => Promise<R>;
    }
  }
}

export async function toHaveTitle(
  this: jest.MatcherUtils,
  received: any,
  expected: string
) {
  if (typeof received.getTitle != 'function') {
    return {
      pass: false,
      message: () => {
        return (
          this.utils.matcherHint('.toHaveTitle') +
          '\n\n' +
          `Received is not a WebDriver. (has no .getTitle function)\n` +
          `  ${this.utils.printReceived(received)}`
        );
      }
    };
  }
  try {
    const actual = await received.getTitle();
    return this.equals(actual, expected)
      ? {
          pass: true,
          message: () =>
            this.utils.matcherHint('.not.toHaveTitle') +
            '\n\n' +
            'Expected title not to be:\n' +
            `  ${this.utils.printExpected(expected)}\n` +
            'Received:\n' +
            `  ${this.utils.printReceived(actual)}`
        }
      : {
          pass: false,
          message: () =>
            this.utils.matcherHint('.toHaveTitle') +
            '\n\n' +
            'Expected title to be:\n' +
            `  ${this.utils.printExpected(expected)}\n` +
            'Received:\n' +
            `  ${this.utils.printReceived(actual)}`
        };
  } catch (err) {
    return {
      pass: this.isNot,
      message: () => err.message
    };
  }
}
