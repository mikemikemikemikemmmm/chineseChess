
import { TChessmanData, TFaction } from "../types"
export const width = window.innerWidth;
export const height = window.innerHeight;
export const gridWidth = height/14
export const chessBoardWidthGridNum = 8
export const chessBoardHeightGridNum = 9

/** 
 *  0: no chessman
 *  1: 車
 *  2: 馬
 *  3: 象
 *  4: 士
 *  5: 將
 *  6: 炮
 *  7: 兵
 * */
export const chessmanDataMap: { [props: string]: TChessmanData } = {
    '1': {   
        text: {
            red: '俥',
            black: '車'
        },
        moveRule: (boardData, startIndex, endIndex) => {
            if (startIndex.x === endIndex.x) {  // vertical move
                if (startIndex.y > endIndex.y) { // to up
                    for (let index = startIndex.y - 1; index >= endIndex.y; index--) {
                        const targetGrid = boardData[index][endIndex.x];
                        if (index === endIndex.y) { // when move to end
                            return true
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            return false
                        }
                    }
                } else if (startIndex.y < endIndex.y) { // to bottom
                    for (let index = startIndex.y + 1; index <= endIndex.y; index++) {
                        const targetGrid = boardData[index][endIndex.x];
                        if (index === endIndex.y) { // when move to end
                            return true
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            return false
                        }
                    }
                }
                return false

            } else if (startIndex.y === endIndex.y) { //level move
                if (startIndex.x > endIndex.x) { //to left
                    for (let index = startIndex.x - 1; index >= endIndex.x; index--) {
                        const targetGrid = boardData[endIndex.y][index];
                        if (index === endIndex.x) {
                            return true
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            return false
                        }
                    }
                } else if (startIndex.x < endIndex.x) { //to right
                    for (let index = startIndex.x + 1; index <= endIndex.x; index++) {
                        const targetGrid = boardData[endIndex.y][index];
                        if (index === endIndex.x) {
                            return true
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            return false
                        }
                    }
                }
                return false

            } else {
                return false
            }
        },
    },
    '2': {
        text: {
            red: '傌',
            black: '馬'
        },
        moveRule: (boardData, startIndex, endIndex, _selfFaction) => {
            const xDifference = endIndex.x - startIndex.x
            const yDifference = endIndex.y - startIndex.y
            const absX = Math.abs(xDifference)
            const absY = Math.abs(yDifference)
            const absDifference = Math.abs(xDifference) + Math.abs(yDifference)
            if (absDifference !== 3) {
                return false
            }
            if (absX === 1) { // vertical move
                if (yDifference > 0) {//to down
                    if (boardData[startIndex.y + 1][startIndex.x] === 'no chessman') {
                        return true
                    }
                    return false// down a grid has obstacle
                } else { //to down
                    if (boardData[startIndex.y - 1][startIndex.x] === 'no chessman') {
                        return true
                    }
                    return false// up a grid has obstacle
                }
            } else if (absY === 1) {//level move
                if (xDifference > 0) {//to right
                    if (boardData[startIndex.y][startIndex.x + 1] === 'no chessman') {
                        return true
                    }
                    return false// right a grid has obstacle
                } else { //to left
                    if (boardData[startIndex.y][startIndex.x - 1] === 'no chessman') {
                        return true
                    }
                    return false// left a grid has obstacle
                }
            } else {
                return false
            }

        }
    },
    '3': {
        text: {
            red: '相',
            black: '象'
        },
        moveRule: (boardData, startIndex, endIndex, selfFaction) => {
            const xDifference = endIndex.x - startIndex.x
            const yDifference = endIndex.y - startIndex.y
            if (Math.abs(xDifference) !== 2 || Math.abs(yDifference) !== 2) { //only move 4 grid
                return false
            }
            if (selfFaction === 'black') { //black
                if (endIndex.y > 4) { //can't cross river
                    return false
                }
            } else { //red
                if (endIndex.y < 5) { //can't cross river
                    return false
                }
            }
            if (xDifference > 0 && yDifference > 0) { //to right down
                if (boardData[startIndex.y + 1][startIndex.x + 1] === 'no chessman') {
                    return true
                }
                return false
            } else if (xDifference > 0 && yDifference < 0) { //to right up
                if (boardData[startIndex.y - 1][startIndex.x + 1] === 'no chessman') {
                    return true
                }
                return false
            } else if (xDifference < 0 && yDifference < 0) { //to left up
                if (boardData[startIndex.y - 1][startIndex.x - 1] === 'no chessman') {
                    return true
                }
                return false
            } else if (xDifference < 0 && yDifference > 0) { //to left down
                if (boardData[startIndex.y + 1][startIndex.x - 1] === 'no chessman') {
                    return true
                }
                return false
            } else {
                return false
            }
        }
    },
    '4': {
        text: {
            red: '仕',
            black: '士'
        },
        moveRule: (_boardData, startIndex, endIndex, selfFaction) => {
            const xDifference = endIndex.x - startIndex.x
            const yDifference = endIndex.y - startIndex.y
            const absX = Math.abs(xDifference)
            const absY = Math.abs(yDifference)
            if (absX > 1 || absY > 1) { //only linear 1 step
                return false
            }
            if (absX + absY !== 2) {
                return false
            }
            if (selfFaction === 'black' && //black
                endIndex.x >= 3 &&
                endIndex.x <= 5 &&
                endIndex.y <= 2 &&
                endIndex.y >= 0) {
                return true
            }
            else if (selfFaction === 'red' && //red
                endIndex.x >= 3 &&
                endIndex.x <= 5 &&
                endIndex.y <= 9 &&
                endIndex.y >= 7) {
                return true
            }
            return false
        }
    },
    '5': {
        text: {
            red: '帥',
            black: '將'
        },
        moveRule: (_boardData, startIndex, endIndex, selfFaction) => {
            const xDifference = startIndex.x - endIndex.x
            const yDifference = startIndex.y - endIndex.y
            const absX = Math.abs(xDifference)
            const absY = Math.abs(yDifference)
            if (absX > 1 || absY > 1) {
                return false
            }
            if (absX + absY !== 1) {
                return false
            }
            if (selfFaction === 'black' && //black
                endIndex.x >= 3 &&
                endIndex.x <= 5 &&
                endIndex.y <= 2 &&
                endIndex.y >= 0) {
                return true
            }
            else if (selfFaction === 'red' && //red
                endIndex.x >= 3 &&
                endIndex.x <= 5 &&
                endIndex.y <= 9 &&
                endIndex.y >= 7) {
                return true
            }
            return false
        }
    },
    '6': {
        text: {
            red: '炮',
            black: '砲'
        },
        moveRule: (boardData, startIndex, endIndex, _selfFaction) => {
            let counter = 0
            let target
            const endChessman = boardData[endIndex.y][endIndex.x]
            if (endChessman === 'no chessman') {
                target = 'no chessman'
            } else {
                target = 'enemy'
            }
            if (startIndex.x === endIndex.x) {  // vertical move
                if (startIndex.y > endIndex.y) { // to up
                    for (let index = startIndex.y - 1; index >= endIndex.y; index--) {
                        const targetGrid = boardData[index][endIndex.x];
                        if (index === endIndex.y) { // when move to end
                            if (target === 'no chessman' && counter === 0) {
                                return true
                            } else if (target === 'enemy' && counter === 1) {
                                return true
                            }
                            return false
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            counter += 1
                        }
                    }
                } else if (startIndex.y < endIndex.y) { // to bottom
                    for (let index = startIndex.y + 1; index <= endIndex.y; index++) {
                        const targetGrid = boardData[index][endIndex.x];
                        if (index === endIndex.y) { // when move to end
                            if (target === 'no chessman' && counter === 0) {
                                return true
                            } else if (target === 'enemy' && counter === 1) {
                                return true
                            }
                            return false
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            counter += 1
                        }
                    }
                }
                return false
            } else if (startIndex.y === endIndex.y) { //level move
                if (startIndex.x > endIndex.x) { //to left
                    for (let index = startIndex.x - 1; index >= endIndex.x; index--) {
                        const targetGrid = boardData[endIndex.y][index];
                        if (index === endIndex.x) {
                            if (target === 'no chessman' && counter === 0) {
                                return true
                            } else if (target === 'enemy' && counter === 1) {
                                return true
                            }
                            return false
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            counter += 1
                        }
                    }
                } else if (startIndex.x < endIndex.x) { //to right
                    for (let index = startIndex.x + 1; index <= endIndex.x; index++) {
                        const targetGrid = boardData[endIndex.y][index];
                        if (index === endIndex.x) {

                            if (target === 'no chessman' && counter === 0) {
                                return true
                            } else if (target === 'enemy' && counter === 1) {
                                return true
                            }
                            return false
                        }
                        if (targetGrid === 'no chessman') {
                            continue
                        } else {
                            counter += 1
                        }
                    }
                }
                return false
            } else {
                return false
            }
        }
    },
    '7': {
        text: {
            red: '兵',
            black: '卒'
        },
        moveRule: (_boardData, startIndex, endIndex, selfFaction) => {
            const xDifference = endIndex.x - startIndex.x
            const yDifference = endIndex.y - startIndex.y
            const absX = Math.abs(xDifference)
            const absY = Math.abs(yDifference)
            if ((absX + absY) > 1) {
                return false
            }
            if (selfFaction === 'black') {
                if (yDifference < 0) { // can't go back
                    return false
                }
                if (endIndex.y < 5 && absX > 0) {
                    return false
                }
            } else if (selfFaction === 'red') {
                if (yDifference > 0) { // can't go back
                    return false
                }
                if (endIndex.y > 4 && absX > 0) {
                    return false
                }
            }
            return true
        }
    },
}
/**
 *  01 => black car
 *  11 => red car
 */
export const startBoard = [
    ['01', '02', '03', '04', '05', '04', '03', '02', '01'],
    ['no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman'],
    ['no chessman', '06', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', '06', 'no chessman'],
    ['07', 'no chessman', '07', 'no chessman', '07', 'no chessman', '07', 'no chessman', '07'],
    ['no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman'],
    ['no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman'],
    ['17', 'no chessman', '17', 'no chessman', '17', 'no chessman', '17', 'no chessman', '17'],
    ['no chessman', '16', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', '16', 'no chessman'],
    ['no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman', 'no chessman'],
    ['11', '12', '13', '14', '15', '14', '13', '12', '11'],
]
export const factionMap: {
    [props: string]: TFaction
} = {
    '0': 'black',
    '1': 'red',
}
export const startX = gridWidth * 2
export const startY = gridWidth * 2
export const tolerance = gridWidth / 2