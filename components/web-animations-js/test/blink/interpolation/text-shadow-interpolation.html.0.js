
assertInterpolation({
  property: 'text-shadow',
  from: '15px 10px 5px black',
  to: '-15px -10px 25px orange'
}, [
  {at: -0.3, is: '24px 16px 0px black'},
  {at: 0, is: '15px 10px 5px black'},
  {at: 0.3, is: '6px 4px 11px rgb(77, 50, 0)'},
  {at: 0.6, is: '-3px -2px 17px rgb(153, 99, 0)'},
  {at: 1, is: '-15px -10px 25px orange'},
  {at: 1.5, is: '-30px -20px 35px rgb(255, 248, 0)'},
]);
