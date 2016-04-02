// Generated by CoffeeScript 1.4.0
(function() {

  App.pages.home = function($) {
    var s;
    $('.show-more').on('click', function(e) {
      e.preventDefault();
      App.moviesPage++;
      App.modules.templateMovies(App.moviesPage);
      $('input', $(this)).attr('checked', false);
      if (App.moviesPage === App.moviesPagesTotal) {
        return $('.show-more').fadeOut();
      }
    });
    s = $('#s');
    s.parent().submit(function(e) {
      e.preventDefault();
      return s.focusout();
    }).keypress(function(e) {
      if (13 === e.which) {
        App.modules.searchMovies(s.val());
      }
      if (s.val().length > 5) {
        return App.modules.searchMovies(s.val());
      }
    });
    $.template('movieTemplate', App.movieMarkup);
    return App.modules.sortMovies($);
  };

  App.modules.searchMovies = function(val) {
    return $.ajax({
      method: "GET",
      url: '//netflixroulette.net/api/api.php',
      data: {
        actor: val
      }
    }).done(function(r) {
      var movies;
      movies = jQuery('#movies');
      movies.empty();
      App.modules.showMovies(r);
      return $('#sort-movies').fadeIn(400, function() {
        $('input', $(this)).attr('checked', false);
        return $('.show-more').fadeIn();
      });
    }).fail(function(r) {
      return alert(r.responseJSON.message);
    }).always(function() {});
  };

  App.modules.sortMovies = function($) {
    return $("#movies").mixItUp({
      layout: {
        containerClass: 'list'
      }
    });
  };

  App.modules.showMovies = function(data) {
    var count, f, i, l, s;
    count = data.length;
    i = 1;
    l = Math.ceil(count / 5);
    App.moviesPagesTotal = l;
    while (i <= l) {
      f = i - 1;
      s = i === l ? count : i * 5;
      this.showMovies[i] = data.slice(f * 5, s);
      i++;
    }
    App.moviesPage = 1;
    return App.modules.templateMovies(1);
  };

  App.modules.templateMovies = function(page) {
    console.log(page);
    return $.tmpl('movieTemplate', App.modules.showMovies[page]).appendTo('#movies');
  };

}).call(this);
