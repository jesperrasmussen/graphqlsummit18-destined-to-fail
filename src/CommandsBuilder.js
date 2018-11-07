import { commandFactory } from "hystrixjs";

export const CommandsBuilder = class CommandsBuilder {

  static createMyCommand({runFn, fallbackFn}){
    let fallback = fallbackFn
    
    //commandFactory.resetCache()
    return commandFactory.getOrCreate("moviesservice")
      .run(runFn)
      .timeout(2000)
      //Amount of failures, before the health is actually calculated
      .circuitBreakerRequestVolumeThreshold(5)
      .statisticalWindowNumberOfBuckets(5)
      // Waiting period before letting a single request through in half open
      .circuitBreakerSleepWindowInMilliseconds(10000)
      // function called if the service is down or slow
      .fallbackTo(fallback)
      .build();
  }

};