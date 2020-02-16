import { Observable } from 'rxjs';

/*
 * Observers can register up to 3 callbacks
 * next is called 1:M times to push new values to observer
 * error is called at most 1 time should an error occur
 * complete is called at most 1 time on completion.
 */
const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
};

const observable = new Observable(subscriber => {
    let count = 0;

    const id = setInterval(() => {
        subscriber.next(count);
        count += 1;
    }, 1000);

    return () => {
        console.log('called');
        clearInterval(id);
    };
});

const subscription = observable.subscribe(observer);
const subscriptionTwo = observable.subscribe(observer);

/*
* Subscriptions can be added together using the add method,
* you can then unsubscribe to multiple at the same time.
* This is simply personal preference, unsubscribing individually 
* will produce the same result. Also, in future lessons, we will see how
* to automate this unsubscribe process with operators.
*/
subscription.add(subscriptionTwo);

setTimeout(() => {
    /*
    * Note: Calling unsubscribe will not fire your complete callback,
    * but the returned function will be invoked cleaning up any
    * resources that were created by the subscription - in this
    * case the interval.
    */
    subscription.unsubscribe();
}, 3500);
