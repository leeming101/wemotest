function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Make the actual CORS request.
function soap(url, state) {
    // This is a sample server that supports CORS.
    var url = url;

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {};

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<s:Body>' +
        '<u:SetBinaryState xmlns:u="urn:Belkin:service:basicevent:1">' +
        '<BinaryState>' + state + '</BinaryState>' +
        '</u:SetBinaryState>' +
        '</s:Body>' +
        '</s:Envelope>';

    xhr.send(sr);
}

function changeAll(state) {
    soap('http://192.168.1.68/upnp/control/basicevent1', state);
    soap('http://192.168.1.253/upnp/control/basicevent1', state);
}