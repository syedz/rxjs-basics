import '../styles.css';
console.clear();

// begin lesson code
import { combineLatest, fromEvent, of } from 'rxjs';
import { map, filter, delay, mergeMap, tap, share } from 'rxjs/operators';
import { calculateMortgage } from './helpers';

// elems
const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.querySelectorAll('.loanLength');
const expected = document.getElementById('expected');

// helpers
const createInputValueStream = elem => {
  return fromEvent(elem, 'input').pipe(
    map((event) => parseFloat(event.target.value))
  );
};

// simulating a save request
const saveResponse = mortageAmount => {
  return of(mortageAmount).pipe(delay(1000));
};

// streams
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

/*
 * Combine streams of the three values needed to complete
 * our mortgage calculation. Once all three are filled out
 * any subsequent updates will trigger a new calculation.
 */
const calculation$ = combineLatest(interest$, loanAmount$, loanLength$).pipe(
  map(([interest, loanAmount, loanLength]) => {
    return calculateMortgage(interest, loanAmount, loanLength);
  }),
  // proving the stream is shared
  tap(console.log),
  /*
   *  If a field is empty, we'll just ignore the update for now
   *  by filtering out invalid values.
   */
  filter(mortageAmount => !isNaN(mortageAmount)),
  /*
   *  Demonstrate sharing a stream so saves won't impact
   *  display updates. Behind the scenes this uses a Subject,
   *  which we we learn about in the first lessons of the
   *  Masterclass course.
   */
  share()
);

calculation$.subscribe(mortageAmount => {
  expected.innerHTML = mortageAmount;
});

calculation$
  .pipe(mergeMap(mortageAmount => saveResponse(mortageAmount)))
  .subscribe();