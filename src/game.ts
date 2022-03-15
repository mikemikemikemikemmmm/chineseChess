import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Chessman } from "./chessman";
import { chessBoardHeightGridNum, chessBoardWidthGridNum, gridWidth, startBoard, startX, startY, tolerance, height, width } from "./const";
import { chessBoardLayer, factionText } from "./chessBoard";
import { IPosition, TFaction, TBoardData, TXYIndex, TNoChessman } from "./types";

export default class Game {
  nowTurnFaction: TFaction
  boardData: TBoardData
  stage: Konva.Stage
  chessmanLayer: Konva.Layer
  chessBoardLayer: Konva.Layer
  factionText: Konva.Text
  constructor() {
    this.nowTurnFaction = 'black'
    this.chessmanLayer = new Konva.Layer(
      {
        listening: true,
        x: startX,
        y: startY
      }
    )
    this.chessBoardLayer = chessBoardLayer
    this.boardData = this.createChessBoard()
    this.stage = this.setStage()
    this.factionText = factionText
    this.stage.add(chessBoardLayer)
    this.stage.add(this.chessmanLayer)
    this.setFactionDisplayText(this.nowTurnFaction)
  }
  setFactionDisplayText(text: string) {
    this.factionText.setText(`現在輪到${text.toUpperCase()}`)
    this.factionText.setAttr('fill', text)
  }
  setStage() {
    const stage = new Konva.Stage({
      container: '#container',
      width: width,
      height: height,
    });
    return stage
  }
  getChessmanByIndex(xyIndex: TXYIndex) {
    const targetChessman = this.boardData[xyIndex.y][xyIndex.x]
    if (targetChessman === 'no chessman') {
      return 'no chessman'
    }
    return this.boardData[xyIndex.y][xyIndex.x]
  }
  changeTurn() {
    if (this.nowTurnFaction === 'red') {
      this.nowTurnFaction = 'black'
    } else {
      this.nowTurnFaction = 'red'
    }
    this.setFactionDisplayText(this.nowTurnFaction)
  }
  createChessBoard() {
    const startBoardCopy = startBoard.map((row, rowIndex) => row.map((chessmanString, colIndex) => {
      if (chessmanString === 'no chessman') {
        return 'no chessman'
      }
      const xyIndex = {
        y: rowIndex, x: colIndex
      }
      return this.createChessman(chessmanString, xyIndex)
    }))
    return startBoardCopy
  }
  createChessman(chessmanString: string, position: IPosition) {
    const chessman = new Chessman(chessmanString, position)
    this.addChessmanListener(chessman)
    this.chessmanLayer.add(chessman.canva)
    return chessman
  }
  getDragendxyIndex(endPosition: IPosition): TXYIndex | 'error' {
    const endXIndex = this.transformPositionToIndex(endPosition.x, 'x')
    const endYIndex = this.transformPositionToIndex(endPosition.y, 'y')
    if (endXIndex === 'error' ||
      endYIndex === 'error' ||
      endXIndex < 0 ||
      endYIndex < 0 ||
      endXIndex > chessBoardWidthGridNum + 1 ||
      endYIndex > chessBoardHeightGridNum + 1) {
      return 'error'
    }
    return {
      x: endXIndex, y: endYIndex
    }
  }
  getFactionByXYIndex(xyIndex: TXYIndex): TFaction | TNoChessman {
    const targetChessman = this.getChessmanByIndex(xyIndex)
    if (typeof targetChessman === 'string') {
      return 'no chessman'
    }
    return targetChessman.getFaction()
  }
  getEnemyFaction(selfFaction: TFaction) {
    if (selfFaction === 'black') {
      return 'red'
    }
    else {
      return 'black'
    }
  }
  getFactionByChessman(chessman: Chessman) {

    return chessman.getFaction()
  }
  setBoardDataByIndex(xyIndex: TXYIndex, chessman: Chessman | TNoChessman) {
    this.boardData[xyIndex.y][xyIndex.x] = chessman
    if (typeof chessman === 'string') {
      return
    }
    chessman.setXYIndex(xyIndex)
  }
  setChessmanCanvaByIndex(chessman: Chessman, xyIndex: TXYIndex) {
    chessman.canva.setPosition({
      x: xyIndex.x * gridWidth, y: xyIndex.y * gridWidth
    })
  }
  handleDragEnd(chessman: Chessman, event: KonvaEventObject<DragEvent>) {
    //test dragEnd is legal
    const startIndex = chessman.getXYIndex()
    const endPosition = event.target.getPosition()
    const endxyIndex = this.getDragendxyIndex(endPosition)
    if (endxyIndex === 'error') {
      this.setChessmanCanvaByIndex(chessman, startIndex)
      // console.log('不合法')
      return
    }
    if (startIndex.x === endxyIndex.x && startIndex.y === endxyIndex.y) {
      this.setChessmanCanvaByIndex(chessman, startIndex)
      // console.log('回原位')
      return
    }
    const selfFaction = this.getFactionByChessman(chessman)
    const testMoveRule = chessman.moveRule(this.boardData, startIndex, endxyIndex, selfFaction)
    if (!testMoveRule) {
      this.setChessmanCanvaByIndex(chessman, startIndex)
      // console.log('不合規則')
      return
    }
    const endChessman = this.getChessmanByIndex(endxyIndex)
    if (endChessman instanceof Chessman) {
      const endxyFaction = this.getFactionByChessman(endChessman)
      if (endxyFaction === selfFaction) { //same faction
        this.setChessmanCanvaByIndex(chessman, startIndex)
        // console.log('終點是友軍', selfFaction)
        return
      } else if (endxyFaction === this.getEnemyFaction(selfFaction)) { //attack enemy
        endChessman.destorySelfCanva()
        if (endChessman.isKing()) {
          this.setChessmanCanvaByIndex(chessman, endxyIndex)
          this.setBoardDataByIndex(endxyIndex, chessman)
          this.setBoardDataByIndex(startIndex, 'no chessman')
          this.endGame()
          return
        }
      }
    }
    this.setChessmanCanvaByIndex(chessman, endxyIndex)
    this.setBoardDataByIndex(endxyIndex, chessman)
    this.setBoardDataByIndex(startIndex, 'no chessman')
    this.changeTurn()
  }
  addChessmanListener(chessman: Chessman) {
    const originZIndex = chessman.canva.getZIndex()
    chessman.canva.on('dragstart', (event) => {
      if (this.nowTurnFaction !== chessman.faction) {
        event.target.draggable(false)
        return
      }
      const zIndex = (event.target.parent?.children?.length as number) - 1
      event.target.setZIndex(zIndex)
    })
    chessman.canva.on('dragend', (event) => {
      if (this.nowTurnFaction !== chessman.faction) {
        event.target.draggable(true)
        return
      } else {
        this.handleDragEnd(chessman, event)
      }
      event.target.setZIndex(originZIndex)

    })
  }
  transformPositionToIndex(num: number, type: 'x' | 'y'): number | 'error' {
    /**
     * to fix float problem for test
     * ex: 54.1234/54.1234 may not equal 1
     */
    const _num = num + 0.00001
    let colIndex = Math.floor(_num / gridWidth)
    if (colIndex < -1) {
      return 'error'
    }
    const deviation = Math.abs(_num % gridWidth)
    if (colIndex === -1) {
      if (deviation <= tolerance) { //like 0.4 =>0
        return 0
      } else { //like 0.6 => error
        return 'error'
      }
    }
    if (deviation >= tolerance) {//like 1.6
      colIndex += 1 //1.6=>2
    }
    if (type === 'x' && colIndex > chessBoardWidthGridNum) { //exceed
      return 'error'
    } else if (type === 'y' && colIndex > chessBoardHeightGridNum) {//exceed
      return 'error'
    }
    return colIndex
  }
  endGame() {
    alert(`${this.nowTurnFaction}勝利`)
  }
}