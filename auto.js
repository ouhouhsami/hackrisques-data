$(document).ready(function(){

  var filteringData = {'Perimetre': [], 'Nature': [], 'DisponibilitéDonnées': [], 'ChampGéographique': [], 'CGU': []}

  filteringDataKeys = Object.keys( filteringData );


  $.each(mydata, function (key, data) {
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

  var FJS = FilterJS.auto(mydata)

  FJS.addCallback('afterFilter', function(result){
    $('#mydata_count').text(result.length);
  });

  FJS.addCriteria({field: 'Perimetre', ele: '#groupe_criteria input:checkbox'});
  FJS.addCriteria({field: 'CGU', ele: '#cgu_criteria input:checkbox'});
  FJS.addCriteria({field: 'Nature', ele: '#natureDeLaDonnée_criteria input:checkbox'});
  FJS.addCriteria({field: 'DisponibilitéDonnées', ele: '#disponibilitéDesDonnées_criteria input:checkbox'});
  FJS.addCriteria({field: 'ChampGéographique', ele: '#champGéographique_criteria input:checkbox'});
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

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
