// tslint:disable-next-line:no-any
export default function createMockBugsnag(object: any): MockBugsnag {
  return new MockBugsnag();
}

class MockBugsnag {
  // tslint:disable-next-line:no-any
  use = (thing: string, thing2: any) => {
    // ok
  };
  notify = (thing: string) => {
    // ok
  };
}
