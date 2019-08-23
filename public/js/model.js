export function Gamer() {
    this.name = "";
    this.fifteenArray = [];
}

Gamer.prototype.setGamer = function (name, fArray) {
    this.name = name;
    this.fifteenArray = fArray;
};

Gamer.prototype.setFileGamers = function () {
    const body = JSON.stringify(this);

    xhr.open('PUT', '/', true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
        }
    };

    xhr.send(body);
};

Gamer.prototype.getFileGamers = function () {

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
        }
    };

    xhr.open('GET', '/'+this.name, false);
    xhr.send(null);

    if(xhr.response !== '') {
        return JSON.parse(xhr.response);
    } else {
        return ;
    }
};

let xhr = new XMLHttpRequest();