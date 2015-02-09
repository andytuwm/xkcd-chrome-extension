
assertInterpolation({
  property: 'vertical-align',
  from: '0px',
  to: '100px'
}, [
  {at: -0.5, is: '-50px'},
  {at: 0, is: '0px'},
  {at: 0.3, is: '30px'},
  {at: 0.6, is: '60px'},
  {at: 1, is: '100px'},
  {at: 1.5, is: '150px'}
]);

assertInterpolation({
  property: 'vertical-align',
  from: '40px',
  to: '40%'
}, [
  {at: -0.5, is: 'calc(60px - 20%)'},
  {at: 0, is: '40px'},
  {at: 0.3, is: 'calc(28px + 12%)'},
  {at: 1, is: '40%'},
  {at: 1.5, is: 'calc(-20px + 60%)'}
]);

assertInterpolation({
  property: 'vertical-align',
  from: 'super',
  to: '40%'
}, [
  {at: 0, is: 'super'},
  {at: 0.3, is: 'super'},
  {at: 0.5, is: '40%'},
  {at: 1, is: '40%'},
]);
