const createChanceOfFailure = (chance: number) => chance <= Math.random();

// This simulates api call time
export const callAPI = (callback: () => any, chanceOfSuccess = 1): any =>
  new Promise((resolved, reject) => {
    if (createChanceOfFailure(chanceOfSuccess)) {
      return reject('Something went wrong!');
    }
    return setTimeout(() => resolved(callback()), 1500);
  });
