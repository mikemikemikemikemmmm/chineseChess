import Konva from "konva"
import { Chessman } from "../chessman"
import { chessBoardHeightGridNum, chessBoardWidthGridNum } from '../const'
import Game from "../game"
import { TXYIndex } from "../types"
        //jsdom defines the window innerWidth and innerHeight to be 1024 x 768
const gridWidth = 768 / 14
describe("test game init", () => {
    let game: Game
    beforeAll(() => {
        document.body.innerHTML = "<div id='container'>123123</div>"
        document.body.clientHeight
        game = new Game()
    })
    test('without drag event', () => {
        const chessman = game.getChessmanByIndex({ x: 0, y: 0 })
        expect(chessman).toBeInstanceOf(Chessman)
        const noChessman = game.getChessmanByIndex({ x: 0, y: 1 })
        expect(noChessman).toBe('no chessman')
        expect(game.getEnemyFaction('red')).toBe('black')
        expect(game.getFactionByChessman(chessman as Chessman)).toBe('black')
        expect(game.getFactionByXYIndex({ x: 0, y: 0 })).toBe('black')

        expect(game.nowTurnFaction).toBe('black')
        expect(game.factionText.getAttr('text')).toBe(`現在輪到${'black'.toUpperCase()}`)
        game.changeTurn()
        expect(game.nowTurnFaction).toBe('red')
        expect(game.factionText.getAttr('text')).toBe(`現在輪到${'red'.toUpperCase()}`)

        expect(game.boardData[0][0]).toBe(chessman)
        expect(game.stage).toBeInstanceOf(Konva.Stage)
        expect(game.transformPositionToIndex(-10, 'x')).toBe(0)
    })
    test('test transformPositionToIndex', () => {
        //test x
        expect(game.transformPositionToIndex(gridWidth * 2, 'x')).toBe(2)
        expect(game.transformPositionToIndex(gridWidth * 2.4, 'x')).toBe(2)
        expect(game.transformPositionToIndex(gridWidth * 2.6, 'x')).toBe(3)
        expect(game.transformPositionToIndex(gridWidth * -0.4, 'x')).toBe(0)
        expect(game.transformPositionToIndex(gridWidth * -0.6, 'x')).toBe('error')
        expect(game.transformPositionToIndex(gridWidth * chessBoardWidthGridNum, 'x')).toBe(chessBoardWidthGridNum)
        expect(game.transformPositionToIndex(gridWidth * (chessBoardWidthGridNum + 0.4), 'x')).toBe(chessBoardWidthGridNum)
        expect(game.transformPositionToIndex(gridWidth * (chessBoardWidthGridNum + 0.6), 'x')).toBe('error')
        //test y
        expect(game.transformPositionToIndex(gridWidth * 2, 'y')).toBe(2)
        expect(game.transformPositionToIndex(gridWidth * 2.4, 'y')).toBe(2)
        expect(game.transformPositionToIndex(gridWidth * 2.6, 'y')).toBe(3)
        expect(game.transformPositionToIndex(gridWidth * -0.4, 'y')).toBe(0)
        expect(game.transformPositionToIndex(gridWidth * -0.6, 'y')).toBe('error')
        expect(game.transformPositionToIndex(gridWidth * chessBoardHeightGridNum, 'y')).toBe(chessBoardHeightGridNum)
        expect(game.transformPositionToIndex(gridWidth * (chessBoardHeightGridNum + 0.4), 'y')).toBe(chessBoardHeightGridNum)
        expect(game.transformPositionToIndex(gridWidth * (chessBoardHeightGridNum + 0.6), 'y')).toBe('error')
    })
    test('test getDragendxyIndex', () => {
        expect(game.getDragendxyIndex({ x: gridWidth * 2, y: gridWidth * 2 })).toStrictEqual({ x: 2, y: 2 })
        expect(game.getDragendxyIndex({ x: gridWidth * 2.4, y: gridWidth * 5.7 })).toStrictEqual({ x: 2, y: 6 })
        expect(game.getDragendxyIndex({ x: gridWidth * 2.7, y: gridWidth * 4.9 })).toStrictEqual({ x: 3, y: 5 })
        expect(game.getDragendxyIndex({ x: gridWidth * chessBoardWidthGridNum, y: gridWidth * chessBoardHeightGridNum }))
            .toStrictEqual({ x: chessBoardWidthGridNum, y: chessBoardHeightGridNum })
        expect(game.getDragendxyIndex({ x: gridWidth * (chessBoardWidthGridNum + 0.6), y: gridWidth * chessBoardHeightGridNum }))
            .toStrictEqual('error')
        expect(game.getDragendxyIndex({ x: gridWidth * chessBoardWidthGridNum, y: gridWidth * (chessBoardHeightGridNum + 0.6) }))
            .toStrictEqual('error')
        expect(game.getDragendxyIndex({ x: gridWidth * -1, y: gridWidth * 2 })).toStrictEqual('error')
        expect(game.getDragendxyIndex({ x: gridWidth * 2, y: gridWidth * -1 })).toStrictEqual('error')

    })
})
describe("test handleDragEnd", () => {
    let game: Game
    let chessman: Chessman
    let eventMock: any= (props: TXYIndex) => {
        return {
            target: {
                getPosition: () => {
                    return {
                        x: props.x * gridWidth,
                        y: props.y * gridWidth,
                    }
                }
            }
        }
    }
    beforeEach(() => {
        jest.clearAllMocks()
        document.body.innerHTML = "<div id='container'>123123</div>"
        game = new Game()
    })
    test('test black car', () => {
        chessman = game.boardData[0][0] as Chessman
        game.handleDragEnd(chessman, eventMock({ x: 1, y: 0 }))
        expect(game.boardData[0][0]).toEqual(chessman) // same faction
        game.handleDragEnd(chessman, eventMock({ x: 0, y: 1 }))
        expect(game.boardData[1][0]).toEqual(chessman) // move
        game.handleDragEnd(chessman, eventMock({ x: 0, y: 1 }))
        expect(game.boardData[1][0]).toEqual(chessman) // same position
        game.handleDragEnd(chessman, eventMock({ x: -2, y: 1 }))
        expect(game.boardData[1][0]).toEqual(chessman) // out of bound
        game.handleDragEnd(chessman, eventMock({ x: 0, y: 8 }))
        expect(game.boardData[1][0]).toEqual(chessman) // not match moveRule
        game.handleDragEnd(chessman, eventMock({ x: 1, y: 2 }))
        expect(game.boardData[1][0]).toEqual(chessman) // not match moveRule
        game.handleDragEnd(chessman, eventMock({ x: 8, y: 1 }))
        expect(game.boardData[1][8]).toEqual(chessman) // move
    })
    test('test end game', () => {
        const endGameMock = jest.spyOn(Game.prototype, 'endGame')
        const alertMock = jest.fn()
        window.alert = alertMock
        chessman = game.boardData[0][0] as Chessman
        expect(alertMock).toBeCalledTimes(0)
        expect(endGameMock).toBeCalledTimes(0)
        game.handleDragEnd(chessman, eventMock({ x: 0, y: 1 }))
        game.handleDragEnd(chessman, eventMock({ x: 3, y: 1 }))
        game.handleDragEnd(chessman, eventMock({ x: 3, y: 8 }))
        game.handleDragEnd(chessman, eventMock({ x: 4, y: 8 }))
        game.handleDragEnd(chessman, eventMock({ x: 4, y: 9 }))
        expect(chessman.getXYIndex()).toStrictEqual({ x: 4, y: 9 })
        expect(alertMock).toBeCalledTimes(1)
        expect(endGameMock).toBeCalledTimes(1)
    })
})