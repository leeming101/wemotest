$(document).ready(function() {
    showButtons('http://192.168.1.68', 'Lamp');
    showButtons('http://192.168.1.253', 'Main');
});

function showButtons(url, name) {
    $.get(url + "/getstate", function(data) {
        if (data === '1') {
            $('#btn' + name + 'On').hide();
            $('#btn' + name + 'Off').show();
        }
        if (data === '0') {
            $('#btn' + name + 'On').show();
            $('#btn' + name + 'Off').hide();
        }
    });
}

function setstate(url, state, name) {
    $.post(url + '/setstate?state=' + state);
    showButtons(url, name);
}

function changeAll(state) {
    setstate('http://192.168.1.68', state, 'Lamp');
    setstate('http://192.168.1.253', state, 'Main');
}