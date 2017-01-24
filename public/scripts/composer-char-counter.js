$(document).ready( () => {
  $('main textarea').on('keydown keyup', (event) => {
    let charLeft = 140 -  $(event.target).val().length;
    let counter = $('main .counter');
    counter.text(charLeft).css('color', 'black');
    if(charLeft < 0) {
      counter.css('color', 'red');
    }
  });
});
