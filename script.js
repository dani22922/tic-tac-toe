let fields = [
    null, null, null, null, null, null, null, null, null
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    let content = document.getElementById("content");
    let table = "<table>";
    let index = 0;
    for (let i = 0; i < 3; i++) {
        table += "<tr>";
        for (let j = 0; j < 3; j++) {
            let cell = "<td onclick=\"handleClick(" + index + ")\">";
            let fieldValue = fields[index];
            if (fieldValue === 'circle') {
                cell += generateCircleSVG();
            } else if (fieldValue === 'cross') {
                cell += generateCrossSVG();
            }
            cell += "</td>";
            table += cell;
            index++;
        }
        table += "</tr>";
    }
    table += "</table>";
    content.innerHTML = table;
    checkGameOver();
}

function handleClick(index) {
    let fieldValue = fields[index];
    let cell = document.getElementsByTagName("td")[index];
    if (fieldValue === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = (currentPlayer === 'circle') ? generateCircleSVG() : generateXSVG();
        cell.onclick = null;
        currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';
        checkGameOver();
    }
}

function checkGameOver() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            fields[a] !== null &&
            fields[a] === fields[b] &&
            fields[a] === fields[c]
        ) {
            drawWinningLine(a, b, c);
            showRestartButton();
            return;
        }
    }
    if (fields.every(field => field !== null)) {
        showRestartButton();
    }
}

function drawWinningLine(a, b, c) {
    let cells = document.getElementsByTagName("td");
    cells[a].style.backgroundColor = "white";
    cells[b].style.backgroundColor = "white";
    cells[c].style.backgroundColor = "white";
}

function showRestartButton() {
    let restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
}

function restartGame() {
    let restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none";
    fields = [
        null, null, null, null, null, null, null, null, null
    ];
    currentPlayer = 'circle';
    render();
}

function generateCircleSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "40");
    circle.setAttribute("fill", "blue");

    const fillAnimation = document.createElementNS(svgNS, "animate");
    fillAnimation.setAttribute("attributeName", "r");
    fillAnimation.setAttribute("from", "0");
    fillAnimation.setAttribute("to", "40");
    fillAnimation.setAttribute("dur", "800ms");
    fillAnimation.setAttribute("begin", "0s");
    fillAnimation.setAttribute("fill", "freeze");

    const rotateAnimation = document.createElementNS(svgNS, "animateTransform");
    rotateAnimation.setAttribute("attributeName", "transform");
    rotateAnimation.setAttribute("type", "rotate");
    rotateAnimation.setAttribute("from", "0 50 50");
    rotateAnimation.setAttribute("to", "360 50 50");
    rotateAnimation.setAttribute("dur", "5s");
    rotateAnimation.setAttribute("begin", "0s");
    rotateAnimation.setAttribute("repeatCount", "indefinite");

    circle.appendChild(fillAnimation);
    circle.appendChild(rotateAnimation);
    svg.appendChild(circle);

    return svg.outerHTML;
}

function generateXSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");

    const group = document.createElementNS(svgNS, "g");

    const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "20");
    line1.setAttribute("y1", "20");
    line1.setAttribute("x2", "80");
    line1.setAttribute("y2", "80");
    line1.setAttribute("stroke", "green");
    line1.setAttribute("stroke-width", "5");

    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "20");
    line2.setAttribute("y1", "80");
    line2.setAttribute("x2", "80");
    line2.setAttribute("y2", "20");
    line2.setAttribute("stroke", "green");
    line2.setAttribute("stroke-width", "5");

    const rotateAnimation = document.createElementNS(svgNS, "animateTransform");
    rotateAnimation.setAttribute("attributeName", "transform");
    rotateAnimation.setAttribute("type", "rotate");
    rotateAnimation.setAttribute("from", "0 50 50");
    rotateAnimation.setAttribute("to", "360 50 50");
    rotateAnimation.setAttribute("dur", "2s");
    rotateAnimation.setAttribute("begin", "0s");
    rotateAnimation.setAttribute("fill", "freeze");

    group.appendChild(line1);
    group.appendChild(line2);
    group.appendChild(rotateAnimation);
    svg.appendChild(group);

    return svg.outerHTML;
}


