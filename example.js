import { Observable } from 'rxjs';

const observer = {
    next: value => console.log('next', value),
    error: value => console.log('error', value),
    completer: () => console.log('complete!'),
};

const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
});

observable.subscribe(observer);