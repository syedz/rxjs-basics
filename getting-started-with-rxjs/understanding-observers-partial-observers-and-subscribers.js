import '../styles.css';
console.clear();

// begin lesson code
import { Observable } from 'rxjs';

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
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