import theme from '../theme';

describe('Theme', () => {
  test('Theme should be valid', () => {
    expect(theme).toMatchSnapshot();
  });
  test('Theme should contain breakpoints', () => {
    expect(theme.breakpoints).not.toBe(undefined);
  });
});
