const Fifteen = function () {
    this.name = "";
    this.fifteenArray = []
};

Fifteen.prototype.setGamer = function (name, fArray) {
    this.name = name;
    this.fifteenArray = fArray;

    this.setFileGamers(this.name, this.fifteenArray);
};

Fifteen.prototype.getNameGamer = function () {
    return this.name;
};

Fifteen.prototype.getFArrayGamer = function () {
    return this.fifteenArray;
};

Fifteen.prototype.setFileGamers = function (name, fArray) {
    //функция которая добавляет нового игрока в файл или обновляет игру старого игрока
};

Fifteen.prototype.getFileGamers = function (name) {
    //функция которая получает объект игрока из файла и возвращает этот объект (если таков имеется)
};
