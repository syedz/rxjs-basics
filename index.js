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
    // Observables can deliver 0:M values synchronous or asynchronously
    const id = setInterval(() => {
        subscriber.next(count);
        // calling complete also invokes the cleanup function you return
        subscriber.complete();
        count += 1;
    }, 1000);

    /*
        * You can return a function to clean up any resources that were
        * created with subscription. In this case, we need to clear 
        * the active interval. When using RxJS's built in creation operators
        * this will be handled for us.
        */
    return () => {
        console.log('called');
        clearInterval(id);
    };
});

// adding logs to show observable emitting asynchronously
console.log('before');
observable.subscribe(observer);
console.log('after');
