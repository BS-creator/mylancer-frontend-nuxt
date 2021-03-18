$(document).ready(function () {
  $('#snackbar-user-status label').click(function () {
    Snackbar.show({
      text: 'Your status has been changed!',
      pos: 'bottom-center',
      showAction: false,
      actionText: "Dismiss",
      duration: 3000,
      textColor: '#fff',
      backgroundColor: '#383838'
    });
  });

  function initAutocomplete() {
    var options = {
      types: ['(cities)'],
      // componentRestrictions: {country: "us"}
    };

    var input = document.getElementById('autocomplete-input');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
  }

  // Autocomplete adjustment for homepage
  if ($('.intro-banner-search-form')[0]) {
    setTimeout(function () {
      $(".pac-container").prependTo(".intro-search-field.with-autocomplete");
    }, 300);
  }

  $('.collapse-contact-box').click(function () {
    console.log('clicked')
    $('.contacts-box').toggleClass('height-auto');
    $('.collapse-contact-box > i').toggleClass('el-icon-arrow-up');
    $('.collapse-contact-box > i').toggleClass('el-icon-arrow-down');
    $('.contacts-box > *').toggle();
    $('.contacts-box > header').show();

    let contactboxOpen = localStorage.getItem('mylancer.contactbox.open')
    contactboxOpen = contactboxOpen ? eval(contactboxOpen) : false
    localStorage.setItem('mylancer.contactbox.open', !contactboxOpen)
  })

  $('.sc-header').click(function () {
    console.log('clicked')
    $(this).parent().children().toggle();
    $(this).parent().toggleClass('height-auto');
    $(this).show();
  })


})
