import { Observable } from 'rxjs';

/*
 * Observers can register up to 3 callbacks
 * next is called 1:M times to push new values to observer
 * error is called at most 1 time should an error occur
 * complete is called at most 1 time on completion.
 */
const observer = {
    next: value => console.log('next', value),
    error: value => console.log('error', value),
    complete: () => console.log('complete!'),
};

const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
    subscriber.complete();
});

// You can pass an observer object, with any of the three callbacks
// observable.subscribe(observer);

/*
 * Or just supply 0 to all functions (next, error, complete).
 * If I'm supplying more than next callback, I will use object
 * as it's a bit more clear.
 */
observable.subscribe(value => console.log('next', value));
