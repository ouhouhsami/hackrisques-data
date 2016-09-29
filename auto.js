$(document).ready(function(){

  var filteringData = {'groupe': [], 'natureDeLaDonnée': [], 'champGéographique': [], 'maille': [], 'niveauDeRestitution': []}

  filteringDataKeys = Object.keys( filteringData );


  $.each(movies, function (key, data) {
      $.each(filteringDataKeys, function(item, key){
        filteringData[key].push(data[key])
      })
  })

  $.each(filteringData, function(key, data){
    filteringData[key] = filteringData[key].filter(function(itm,i,a){
        return i==a.indexOf(itm);
    });
  })

  console.log(filteringData)

  var template = $('#template').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, filteringData);
  $('#target').html(rendered);

  initSliders();

  var FJS = FilterJS.auto(movies)

  FJS.addCallback('afterFilter', function(result){
    $('#total_movies').text(result.length);
  });

  FJS.addCriteria({field: 'groupe', ele: '#groupe_criteria input:checkbox'});
  FJS.addCriteria({field: 'natureDeLaDonnée', ele: '#natureDeLaDonnée_criteria input:checkbox'});
  FJS.addCriteria({field: 'champGéographique', ele: '#champGéographique_criteria input:checkbox'});
  FJS.addCriteria({field: 'maille', ele: '#maille_criteria input:checkbox'});
  FJS.addCriteria({field: 'niveauDeRestitution', ele: '#niveauDeRestitution_criteria input:checkbox'});

  FJS.filter();

  window.FJS = FJS;
});

function initSliders(){
  $("#rating_slider").slider({
    min: 8,
    max: 10,
    values:[8, 10],
    step: 0.1,
    range:true,
    slide: function( event, ui ) {
      $("#rating_range_label" ).html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ]);
      $('#rating_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $("#runtime_slider").slider({
    min: 50,
    max: 250,
    values:[0, 250],
    step: 10,
    range:true,
    slide: function( event, ui ) {
      $("#runtime_range_label" ).html(ui.values[ 0 ] + ' mins. - ' + ui.values[ 1 ] + ' mins.');
      $('#runtime_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

}
