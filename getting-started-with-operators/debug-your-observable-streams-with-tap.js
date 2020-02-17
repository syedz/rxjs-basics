import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

/*
 * tap can be used to spy on your streams, performing side effects
 * such as logging, and is particularly useful for debugging.
 * In the example below, we are spying on the value before and after
 * the map operator.
 */
numbers$
  .pipe(
    tap(value => console.log('before', value)),
    map(value => value * 10),
    /*
     * tap also accepts an observer object, if you wish to also
     * receive notifications on complete or error. You will use this
     * far less often, but it's good to know just in case...
     */
    tap({
      next: value => console.log('after', value),
      complete: () => console.log('done!'),
      error: error => {
        // do something
      }
    })
  )
  .subscribe(value => {
    console.log('from subscribe', value);
  });