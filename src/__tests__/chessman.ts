import { Chessman } from "../chessman"
import { chessmanDataMap } from "../const"
describe("test chessman method", () => {
    const xyIndex = { x: 0, y: 0 }
    const chessmanString = '12' //red horse
    let chessman: Chessman
    beforeAll(() => {
        chessman = new Chessman(chessmanString, xyIndex)
    });
    test('without canva', () => {
        expect(chessman.isKing()).toBe(false)
        expect(chessman.getXYIndex()).toBe(xyIndex)
        expect(chessman.getFaction()).toBe('red')
        expect(chessman.getMoveRule()).toBe(chessmanDataMap['2'].moveRule)
        const newXY = { x: 3, y: 3 }
        chessman.setXYIndex(newXY)
        expect(chessman.getXYIndex()).toBe(newXY)
    })
    test('with canva', () => {
        const dataUrl = chessman.canva.toDataURL()
        expect(dataUrl).toMatchSnapshot()

        chessman.destorySelfCanva()
        const deleteDataUrl = chessman.canva.toDataURL()
        expect(deleteDataUrl).toMatchSnapshot()
    })
})
