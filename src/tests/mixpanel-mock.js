jest.mock('mixpanel-browser/src/loader-module', () => {
    return {
      track: jest.fn()
    };
});