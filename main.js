// Funktion til at trække p-variablen ud af query-delen af URL'en,
function findPageVariabel() {
  var searchString = window.location.search.substring(1),
      i, val, params = searchString.split('&');

  for (i=0;i<params.length;i++) {
    var val = params[i].split('=');
    if (val[0] == 'p') {
      return val[1];
    }
  }
  // Returnér 'forside' som default
  return 'forside';
}
// Bed om sidens indhold med en HTTP-request og sæt den.
function sætSide(side) {
    let http = new XMLHttpRequest();
    http.open('GET', 'sider/'+side+'.html', true);
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            if (http.status == 200)
                // Sæt den første .container indhold til at være den fundnes sides indhold
                document.getElementById('indhold').innerHTML = http.responseText;
            else if (side !== '404')
                // Hvis siden ikke findes, får man en standardside.
                sætSide('404');
            else
                console.error('Selv 404-siden kunne ikke findes!');
        }
    }
    http.send();
}




// Find den side der skal vises.
var side = findPageVariabel();

sætSide(side);
// Sæt nuværende menu-punkt til at være aktivt.
document.getElementById(side).setAttribute('class', 'active button');
