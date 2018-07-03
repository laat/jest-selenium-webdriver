declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAttribute: (name: string, value: string) => Promise<R>;
    }
  }
}

export async function toHaveAttribute(
  this: jest.MatcherUtils,
  received: any,
  attribute: string,
  expected: string
) {
  if (typeof received.getAttribute != 'function') {
    return {
      pass: false,
      message: () => {
        return (
          this.utils.matcherHint('.toHaveAttribute') +
          '\n\n' +
          `Received is not a WebDriverElement. (has no .getAttribute function)\n` +
          `  ${this.utils.printReceived(received)}`
        );
      }
    };
  }
  try {
    const actual = await received.getAttribute(attribute);
    return this.equals(actual, expected)
      ? {
          pass: true,
          message: () =>
            this.utils.matcherHint('.not.toHaveAttribute') +
            '\n\n' +
            'Expected attribute value not to be:\n' +
            `  ${this.utils.printExpected(expected)}\n` +
            'Received:\n' +
            `  ${this.utils.printReceived(actual)}`
        }
      : {
          pass: false,
          message: () =>
            this.utils.matcherHint('.toHaveAttribute') +
            '\n\n' +
            'Expected attribute value to be:\n' +
            `  ${this.utils.printExpected(expected)}\n` +
            'Received:\n' +
            `  ${this.utils.printReceived(actual)}`
        };
  } catch (err) {
    return { pass: this.isNot, message: () => err.message };
  }
}
