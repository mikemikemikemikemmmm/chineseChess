import Konva from "konva"
import { startX, startY, gridWidth, chessBoardHeightGridNum, chessBoardWidthGridNum } from "./const"
const strokeWidth = 4
const strokeColor = 'black'
const chessBoardLayer = new Konva.Layer({
    listening: false,
    x: startX,
    y: startY,
})
for (let y = 0; y < chessBoardHeightGridNum; y++) {
    for (let x = 0; x < chessBoardWidthGridNum; x++) {
        chessBoardLayer.add(new Konva.Rect({
            width: gridWidth, height: gridWidth,
            stroke: strokeColor,
            strokeWidth,
            x: gridWidth * x,
            y: gridWidth * y
        }))
    }
}

chessBoardLayer.add(new Konva.Rect({
    width: gridWidth * chessBoardWidthGridNum - strokeWidth,
    height: gridWidth - strokeWidth,
    fill: 'white',
    x: strokeWidth / 2,
    y: gridWidth * 4 + strokeWidth / 2
}))
chessBoardLayer.add(new Konva.Text({
    width: gridWidth * chessBoardWidthGridNum - strokeWidth,
    height: gridWidth - strokeWidth,
    text: '楚河   漢界',
    fontSize: gridWidth * 2 / 3,
    align: 'center',
    verticalAlign: 'middle',
    fill: strokeColor,
    x: strokeWidth / 2,
    y: gridWidth * 4 + strokeWidth / 2,
    strokeWidth: 2,
    stroke: 'black'
}))
chessBoardLayer.add(new Konva.Line({
    stroke: strokeColor,
    points: [
        gridWidth * 3,
        0,
        gridWidth * 5,
        gridWidth * 2,
    ],
    strokeWidth
}))
chessBoardLayer.add(new Konva.Line({
    stroke: strokeColor,
    points: [
        gridWidth * 3,
        0,
        gridWidth * 5,
        gridWidth * 2,
    ],
    strokeWidth
}))
chessBoardLayer.add(new Konva.Line({
    stroke: strokeColor,
    points: [
        gridWidth * 5,
        0,
        gridWidth * 3,
        gridWidth * 2,
    ],
    strokeWidth
}))
chessBoardLayer.add(new Konva.Line({
    stroke: strokeColor,
    points: [
        gridWidth * 5,
        gridWidth * 7,
        gridWidth * 3,
        gridWidth * 9,
    ],
    strokeWidth
}))
chessBoardLayer.add(new Konva.Line({
    stroke: strokeColor,
    points: [
        gridWidth * 3,
        gridWidth * 7,
        gridWidth * 5,
        gridWidth * 9,
    ],
    strokeWidth
}))
const factionText = new Konva.Text({
    width: gridWidth * chessBoardWidthGridNum,
    height: gridWidth,
    fontSize: gridWidth * 2 / 3,
    align: 'center',
    verticalAlign: 'middle',
    fill: strokeColor,
    y: -gridWidth * 1.5,
    strokeWidth: 2,
})
chessBoardLayer.add(factionText)
export {factionText,chessBoardLayer}