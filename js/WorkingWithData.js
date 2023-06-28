const columnNames = ['Название машины', 'Марка','Страна производитель','Рыночная стоимость, руб.','Кол-во лошадиных сил','В какой части фильма снималась'];
const carNames = ['Supra','Skyline GT-R R34','RX-7 Veilside FD','Grand National GNX','Corvette Stingray Grand Sport','GT-R R35','Challenger SRT-8','DB9','Fleetline Race Car','Civic Si Coupe','Silvia S14','Eclipse GSX','F-150','Jetta','Cefiro','S2000','Charger 1970','Lancer Evolution VII','Eclipse Spyder','Navigator','Ram','Camaro SS 1969','Mustang Fastback','Monte Carlo','C-West Silvia S15','VeilSide  350Z','Touran','M5 E39','Impreza WRX STi','Gran Torino','Cayman S','911 GT3 RS','Maverick','Challenger SRT-8','Charger SRT-8','Escort','Crown Victoria','Barracuda','Road Runner','Viper SRT-10','458 Italia','NSX','Aventador','Torino','Integra Coupe','BRZ','Cooper','LM002','570S','Gladiator'];
const mark = ['Toyota','Nissan','Mazda','Buick','Chevrolet','Nissan','Dodge','Aston Martin','Chevrolet','Honda','Nissan','Mitsubishi','Ford','Volkswagen','Nissan','Honda','Dodge','Mitsubishi','Mitsubishi','Lincoln','Dodge','Chevrolet','Ford','Chevrolet','Nissan','Nissan','Volkswagen','BMW','Subaru','Ford','Porsche','Porsche','Ford','Dodge','Dodge','Ford','Ford','Plymouth','Plymouth','Dodge','Ferrari','Honda','Lamborghini','Ford','Honda','Subaru','MINI','Lamborghini','Mclaren','Jeep'];
const country = ['Япония','Япония','Япония','США','США','Япония','США','Великобритания','США','Япония','Япония','Япония','США','Германия','Япония','Япония','США','Япония','Япония','США','США','США','США','США','Япония','Япония','Германия','Германия','Япония','США','Германия','Германия','США','США','США','США','США','США','США','США','Италия','Япония','Италия','США','Япония','Япония','Великобритания','Италия','Великобритания','США'];
const price = [3500000,2100000,3700000,700000,800000,5900000,3000000,6500000,420000,2100000,2200000,650000,1900000,780000,180000,2600000,17000000,800000,650000,440000,4100000,7000000,1900000,900000,3000000,1250000,1200000,1300000,1900000,2700000,10000000,16000000,2100000,3000000,2700000,1300000,800000,2000000,4500000,5500000,17000000,1500000,37000000,3700000,400000,1900000,2200000,3200000,14300000,6750000];
const power = [280,280,310,154,485,540,305,507,90,220,160,140,302,170,155,240,375,280,144,300,350,420,250,160,180,280,160,400,310,220,350,510,210,300,470,170,170,350,540,407,570,280,740,360,120,200,200,322,570,285];
const part = ['Форсаж 1','Двойной Форсаж','Тройной Форсаж: токийский дрифт','Форсаж 4','Форсаж 5','Форсаж 6','Форсаж 6','Форсаж 7','Форсаж 8','Форсаж 1','Двойной Форсаж','Форсаж 1','Форсаж 1','Форсаж 1','Двойной Форсаж','Форсаж 4','Форсаж 1','Двойной Форсаж','Двойной Форсаж','Двойной Форсаж','Двойной Форсаж','Форсаж 5','Тройной Форсаж: токийский дрифт','Тройной Форсаж: токийский дрифт','Тройной Форсаж: токийский дрифт','Тройной Форсаж: токийский дрифт','Тройной Форсаж: токийский дрифт','Форсаж 4','Форсаж 4','Форсаж 4','Форсаж 5','Форсаж 5','Форсаж 5','Форсаж 5','Форсаж 5','Форсаж 6','Форсаж 6','Форсаж 7','Форсаж 7','Форсаж 7','Форсаж 7','Форсаж 4','Форсаж 7','Форсаж 7','Двойной Форсаж','Форсаж 8','Форсаж 8','Форсаж 6','Форсаж 8','Форсаж 8'];

let cars = {
    CarName: Array.from(carNames),
    Mark: Array.from(mark),
    Country: Array.from(country),
    Price: Array.from(price),
    Power: Array.from(power),
    Part: Array.from(part),

    getAllKey: function () {
        let arrKey = [];
        for(let key in this) {
            if (typeof(this[key]) !== 'function') {
                arrKey.push(key)
            }
        }
        return arrKey;// возвращаем массив со всеми ключами объекта (за исключением методов)
    },

    print: function() {
        let html = '<table><tr>';
        let arrKey = this.getAllKey();
        for(let key in columnNames) {
            html += `<th>${ columnNames[key] }</th>`;
        }
        html += '</tr>';
        for(let i = 0; i < this[arrKey[0]].length; i++) {
            html += '<tr>';
            for(let key in arrKey) {
                html += `<td>${ this[arrKey[key]][i] }</td>`;
            }
            html += '</tr>';
        }
        return html + '</table>';// возвращаем HTML-разметку в виде таблицы
    }
};

let updatedCars = {
    __proto__: cars,

    change: function(k, p) { //свапаем элементы с индексами  k и p между собой.
        let allKey = this.getAllKey();
        for(let key in allKey) {
            let w = this[allKey[key]][k];
            this[allKey[key]][k] = this[allKey[key]][p];
            this[allKey[key]][p] = w;
        }
    },

    doCompare: function(elem1, elem2, sortOrder){//соответствуют ли заданному порядку сортировки
        switch (sortOrder) {

            case 'asc':
                return elem1 > elem2;
            case 'desc':
                return elem1 < elem2;

        }
    },

    isCompareOrder: function(n, arrCompare) {//проверяет, arrcompare то наш массив, который пришел из sortbutton состоит из элементов value checkbox value checkbox value checkbox
        for(let k = 0; k < arrCompare.length; k += 2) {// шаг два потому что значения расположенычерез один сначала сортируе по первому значению потом по второму и тд
            let sortOrder = arrCompare[k+1] ? 'desc' : 'asc';// проверяем как сортировать
            if (this.doCompare(this[arrCompare[k]][n], this[arrCompare[k]][n + 1], sortOrder)) {//сверяем с след значением проходит ли проверку по условию убывания ил возрастания
                return true;
            } else if (this[arrCompare[k]][n] === this[arrCompare[k]][n + 1]) {// если элементы равны, пропускаем текущее правило
                continue;
            } else {
                return false;
            }
        }
        return false
    },

    sorted: function(arr) {
        let n = this[arr[0]].length;// посчитали длину
        for(let i = 0; i < n - 1; i += 1) {
            for (let j = 0; j < n - i - 1; j++) {// перебираем все элементы, кроме отсортированных
                if (this.isCompareOrder(j, arr)) {// проверяем каждый элемент через компаре ордер нужно ли его сортировать
                    this.change(j, j + 1);//свапаем если порядок сортировки не выполняется
                }
            }
        }
        return true;
    },

    getResultLogOpr: function(valueLeft, opr, valueRight) {
        if (opr == '==') {
            return valueLeft.indexOf(valueRight) !== -1;
        }
        if (opr == '!=') {
            return valueLeft != valueRight;
        }
        if (opr == '>') {
            return valueLeft > valueRight;
        }
        if (opr == '<') {
            return valueLeft < valueRight;
        }
        if (opr == '>=') {
            return valueLeft >= valueRight;
        }
        if (opr == '<=') {
            return valueLeft <= valueRight;
        }
    },

    filtered: function(arr) {
        if (arr.length == 0) return;//проверка пустоты
        let indexTrue = [];
        for (let i in this[arr[0]["key"]])
            indexTrue.push(parseInt(i));//массив идексов всех элементов объекта
        for (let i in arr) {//перебор всех правил фильтрации
            let arrTrue = [];
            for (let j = 0; j < this[arr[i]["key"]].length; j++) {
                if (this.getResultLogOpr(this[arr[i]["key"]][j],arr[i]["operation"],arr[i]["value"])){//проверка удовлетворению правила фильтрации
                    arrTrue.push(j);
                }
            }
            indexTrue = arrSovpad(indexTrue, arrTrue);//пересечени массивов,где работают все правила фильтра
        }
        let curKeys = this.getAllKey();
        for (let k in curKeys) {
            let newValue = [];
            for (let i in indexTrue) {
                newValue.push(this[curKeys[k]][indexTrue[i]]);
            }
            this[curKeys[k]] = newValue;
        }
    },

    setToDefault: function() {
        this.CarName = Array.from(carNames);
        this.Mark = Array.from(mark);
        this.Country = Array.from(country);
        this.Price = Array.from(price);
        this.Power = Array.from(power);
        this.Part = Array.from(part);
    }
};

function arrSovpad (arr1, arr2) {
    let result = [];
    for(let i in arr1)
    {
        if(arr2.includes(arr1[i])) result.push(arr1[i]);// добавляем элемент в массив результата,
                                                        // если он также встречается во втором массиве
    }
    return result;
}

let options = {
    No: 'Нет',
    CarName: 'Название машины',
    Mark: 'Марка',
    Power: 'Кол-во лошадиных сил',
    Price:'Цена.руб',
    Country:'Страна',
    Part:'В какой части фильма снималась'
}
let arrOptions = [];
for (let key in options) {
    let newOption = document.createElement('option');
    let optionText = document.createTextNode(options[key]);
    newOption.appendChild(optionText);
    newOption.setAttribute('value', key);
    arrOptions.push(newOption);
}
drawTable = () => document.getElementById('table').innerHTML = updatedCars.print();

function sortButton(){
    let arr = [];
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById(`selectLevel${i}`).value !== 'No') {
            arr.push(document.getElementById(`selectLevel${i}`).value);// наши значения по которым будем сортировать
            arr.push(document.getElementById(`sortOrder${i}`).checked);//кнопка возрастания убывания
        }
    }
    updatedCars.sorted(arr);
    drawTable();
}

function filterButton(){
    let arr = [];
    if (document.getElementById("MarkFilter").value !== "") {
        let object = {
            key: "Mark",
            operation: "==",
            value: document.getElementById("MarkFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("CountryFilter").value !== "") {
        let object = {
            key: "Country",
            operation: "==",
            value: document.getElementById("CountryFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("CarNameFilter").value !== "") {
        let object = {
            key: "CarName",
            operation: "==",
            value: document.getElementById("CarNameFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("PartFilter").value !== "") {
        let object = {
            key: "Part",
            operation: "==",
            value: document.getElementById("PartFilter").value
        }
        arr.push(object);
    }

    updatedCars.filtered(arr);
    drawTable();
}

function resetButton(){
    updatedCars.setToDefault();
    drawTable();
}

function getActualOptions() {
    for (let count = 1; count <= 3; count++) {
        addOptionsToSelect(count);
        removeOptions(count);
    }

}

function addOptionsToSelect(count){
    for (let i = 0; i < arrOptions.length; i++) {// перебираем все опции в массиве options
        let flag = true;
        for (let j = 0; j < document.getElementById(`selectLevel${count}`).options.length; j++) { // перебираем все опции в селекте
            if (document.getElementById(`selectLevel${count}`).options[j].value === arrOptions[i].value) { // проверяем, есть ли уже такая опция в селекте
                flag = false; // если опция уже есть, устанавливаем флаг в false
                break;
            }
        }
        if (flag)
            document.getElementById(`selectLevel${count}`)
                .insertBefore(
                    arrOptions[i].cloneNode(true),// клонируется с помощью метода cloneNode, чтобы создать новую копию элемента.
                    document.getElementById(`selectLevel${count}`).options[i]
                );
    }
}

function removeOptions(count){
    let index = 0;
    while (index < document.getElementById(`selectLevel${count}`).length) {
        for (let i = 1; i <= 3; i++) {
            if (i === count) continue;// если селект совпадает с текущим селектом, пропускаем его
            if (document.getElementById(`selectLevel${count}`).options[index].value === document.getElementById(`selectLevel${i}`).value// если значение опции совпадает
                                                                                                                                                         // со значением в другом селекте
                && document.getElementById(`selectLevel${i}`).value !== "No") {
                document.getElementById(`selectLevel${count}`).options[index] = null;// удаляем опцию из текущего селекта
                index = 0;
            }
        }
        index++;
    }
}