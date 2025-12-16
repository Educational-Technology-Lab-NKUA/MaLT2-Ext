window.onbeforeunload = function(e) {
  e = e || window.event;
  e = e || window.event;

  // For IE and Firefox prior to version 4
  if (e) {
      e.returnValue = 'Are you sure you want to exit? All your data will be lost!';
  }

  // For Safari
  return 'Are you sure you want to exit? All your data will be lost!?';
};
