import { chessBoardLayer } from "../chessBoard"
describe("test chessBoard snapshot", () => {
    test('with canva', () => {
        const dataUrl = chessBoardLayer.toDataURL()
        expect(dataUrl).toMatchSnapshot()
    })
})
