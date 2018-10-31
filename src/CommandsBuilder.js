import { commandFactory } from "hystrixjs";

export const CommandsBuilder = class CommandsBuilder {

  static createMyCommand({runFn, fallbackFn}){
    let fallback = fallbackFn
    
    return commandFactory.getOrCreate("moviesservice")
      .run(runFn)
      .timeout(2000)
      .circuitBreakerRequestVolumeThreshold(5)
      .statisticalWindowNumberOfBuckets(5)
      .circuitBreakerSleepWindowInMilliseconds(10000)
      // function called if the service is down or slow
      .fallbackTo(fallback)
      .build();
  }

};