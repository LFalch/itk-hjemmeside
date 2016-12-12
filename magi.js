function killIndhold() {
    document.getElementById('indhold').innerHTML = "";
    setTimeout(killNav, 2000);
}
function killNav() {
    var navs = document.getElementsByTagName('nav');
    for (i in navs)
        navs[i].innerHTML = '';

    setTimeout(killFooterAndBody, 2000);
}
function killFooterAndBody() {
    var footers = document.getElementsByTagName('footer');
    for (i in footers)
        footers[i].innerHTML = '';

    var bodies = document.getElementsByTagName('body');
    for (i in bodies)
        bodies[i].innerHTML = '';

    setTimeout(main, 1000);
}

if (window.location.search === '?p=ekstra')
    setTimeout(killIndhold, 6000);

function main() {
    document.location.href = 'magi.html';
}
