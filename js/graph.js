let marginX = 100;
let marginY = 100;
let height = 400;
let width = 800;
let carData = [];

for (let i = 0; i < carNames.length; i++){
    let object = {
        CarName: carNames[i],
        Mark: mark[i],
        Country: country[i],
        Price: price[i],
        Power: power[i],
        Part: part[i]
    }
    carData.push(object);
}

let svg = d3.select("svg")
    .attr("height", height)
    .attr("width", width);

drawGraph(svg,"Mark", "Price", "histogram", true, false);

let hideButton = document.getElementById('hideButton');

hideButton.onclick = function(){
    if (this.value === "Скрыть таблицу"){
        this.value = "Показать таблицу";
        d3.select("div.tableBlock")
            .select("table")
            .selectAll("tr")
            .style("display", "none");
    } else{
        this.value = "Скрыть таблицу";
        d3.select("div.tableBlock")
            .select("table")
            .selectAll("tr")
            .style("display", "");
    }
};

function getArrGraph(arrObject, fieldX, fieldY){ // группируем масив кардата по выброному на оси х
    let groupObj = d3.group(arrObject, d => d[fieldX]); //
    let arrGroup = [];
    for(let entry of groupObj) {//для каждого вхожения в груп обджект экстендом возвращаем мин и максу этого объекта
        let minMax = d3.extent(entry[1].map(d => d[fieldY]));
        arrGroup.push({
            "labelX": entry[0],// сама марка
            "valueMin": minMax[0],//мин цена
            "valueMax": minMax[1] //макс цена
        });
    }
    return arrGroup;
}

function drawGraph(svg, selectedX = "Mark", selectedY = "Price",
                   type = "histogram", flag_max = true, flag_min = false){
    if (!flag_min && !flag_max) {
        alert("Выберите результат");
        return;
    }

    let arrGraph = getArrGraph(carData, selectedX, selectedY)

    svg.selectAll("*").remove();

    let min; let max;
    if (flag_max && !flag_min){
        min = d3.min(arrGraph.map(d => d.valueMax));
        max = d3.max(arrGraph.map(d => d.valueMax));
    } else if (flag_min && !flag_max){
        min = d3.min(arrGraph.map(d => d.valueMin));
        max = d3.max(arrGraph.map(d => d.valueMin));
    } else {
        min = d3.min(arrGraph.map(d => d.valueMin));
        max = d3.max(arrGraph.map(d => d.valueMax));
    }

    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;
// функция интерполяции значений на оси
    let scaleY = d3.scaleLinear()
        .domain([0, max])
        .range([yAxisLen, 0]);

    let scaleX;
    if (type === "dotted") {
        scaleX = d3.scaleBand()
            .domain(arrGraph.map(function(d) {
                    return d.labelX;
                })
            )
            .range([0, xAxisLen]);
    }
    if (type === "histogram"){
        scaleX = d3.scaleBand()
            .domain(arrGraph.map(function(d) {
                return d.labelX;
            }))
            .range([0, xAxisLen])
            .padding(0.2);
    }

    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная

    svg.append("g")//отрисовка по х
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .attr("class", "x-axis")
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.20em")
        .attr("dy", ".20em")
        .attr("transform", function (d) {
            return "rotate(-80)";
        });

    svg.append("g")// отрисовка по y
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .attr("class", "y-axis")
        .call(axisY);
// создаем набор вертикальных линий для сетки
    //Затем получаем выше добавленный элемент и выбираем в нем все элементы g.tick, которые добавляются автоматически и представляют отдельные деления,
    // и добавляем по ним линии с помощью элемента line:
    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLen));
    //Каждая линия задается двумя точками с координатами (x1, y1) - начальная точка и (x2, y2) - конечная точка. Если первая точка определяется на оси X,
    // то для определения y-составляющей второй точки используется yAxisLength, что аналогично выражению (height - 2 * margin). То есть линия будет идти с оси X вверх.
// рисуем горизонтальные линии
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLen)
        .attr("y2", 0);


    if (flag_min && flag_max) {
        if (type === "histogram")
            DHisto(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "valueMin", "#af22e7", "red");
        else
            DDot(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "valueMin", "#af22e7", "red")
    }
    else {




        if (flag_max) {
            if (type === "dotted")
                Dot(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "#af22e7");
            if (type === "histogram")
                Histo(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "#af22e7")
        }

        if (flag_min) {
            if (type === "dotted")
                Dot(svg, arrGraph, "labelX", scaleX, "valueMin", scaleY, "gray");
            if (type === "histogram")
                Histo(svg, arrGraph, "labelX", scaleX, "valueMin", scaleY, "gray")
        }
    }



}

let graphButton = document.getElementById("graphButton")
graphButton.onclick = function (){
    let selectedX;
    for (let i in document.getElementsByName("ox")){
         if (document.getElementsByName("ox")[i].checked) {
            selectedX = document.getElementsByName("ox")[i].value;
             break;
         }
    }

    let selectedY = "Price";

    let type;
    if (document.getElementsByName("type")[0].checked)
        type = "dotted";
    else if (document.getElementsByName("type")[1].checked)
        type = "histogram";

    let flag_min = document.getElementsByName("oy")[1].checked;
    let flag_max = document.getElementsByName("oy")[0].checked;

    let svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width);

    drawGraph(svg, selectedX, selectedY, type, flag_max, flag_min);
}



function Histo(svg, arrGraph, x, scaleX, y, scaleY, color) {
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .selectAll(".rect")
        .data(arrGraph)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return scaleX(d[x]);
        })
        .attr("width", scaleX.bandwidth())
        .attr("y", function (d) {
            return scaleY(d[y]);
        })
        .attr("height", function (d) {
            return height - 2 * marginY - scaleY(d[y]);
        })
        .attr("fill", color);
}
function DHisto(svg, arrGraph, x, scaleX, y, scaleY, y2, color, sColor){
        svg.append("g")
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .selectAll(".rect")
            .data(arrGraph)
            .enter()
            .append("rect")
            .attr("x", function(d) { return scaleX(d[x]); })
            .attr("width", scaleX.bandwidth()/2)
            .attr("y", function(d) { return scaleY(d[y]); })
            .attr("height", function(d) { return height - 2 * marginY - scaleY(d[y]); })
            .attr("fill", color);

        svg.append("g")
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .selectAll(".rect")
            .data(arrGraph)
            .enter()
            .append("rect")
            .attr("x", function(d) { return scaleX(d[x]) + scaleX.bandwidth() / 2; })
            .attr("width", scaleX.bandwidth() / 2)
            .attr("y", function(d) { return scaleY(d[y2]); })
            .attr("height", function(d) { return height - 2 * marginY - scaleY(d[y2]); })
            .attr("fill", sColor);

    }

function Dot(svg, arrGraph, x, scaleX, y, scaleY, color){
    svg.selectAll(".dot")
        .data(arrGraph)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return scaleX(d[x]);
        })
        .attr("cy", function (d) {
            return scaleY(d[y]);
        })
        .attr("transform", `translate(${marginX + width/(2.2 * arrGraph.length)}, ${marginY})`)
        .style("fill", color)
}
function DDot(svg, arrGraph, x, scaleX, y, scaleY, y2, color, sColor) {
    svg.selectAll(".dot")
        .data(arrGraph)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return scaleX(d[x]);
        })
        .attr("cy", function (d) {
            return scaleY(d[y]);
        })
        .attr("transform", `translate(${marginX + width / (2.2 * arrGraph.length)}, ${marginY})`)
        .style("fill", color)

    svg.selectAll(".dot")
        .data(arrGraph)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return scaleX(d[x]) +10;
        })
        .attr("cy", function (d) {
            return scaleY(d[y2]);
        })
        .attr("transform", `translate(${marginX + width / (2.2 * arrGraph.length)}, ${marginY})`)
        .style("fill", sColor)

}


