import Konva from "konva"
import { factionMap, chessmanDataMap, gridWidth } from "./const"
import { TKeyFactionMap, TChessmanData, TFaction, TXYIndex, TMoveRule } from "./types"
export class Chessman {
    private chessmanString: string
    private xyIndex: TXYIndex
    faction!: TFaction
    private categoryData!: TChessmanData
    canva!: Konva.Group
    moveRule: TMoveRule
    constructor(chessmanString: string, xyIndex: TXYIndex) {
        this.chessmanString = chessmanString
        this.xyIndex = xyIndex
        this.setChessmanCategoryData()
        this.moveRule = this.getMoveRule()
        this.setFaction()
        this.createCanva()
    }
    public isKing() {
        return this.chessmanString[1] === '5'
    }
    public setFaction() {
        const factionString = this.chessmanString[0] as TKeyFactionMap
        this.faction = factionMap[factionString]
    }
    public setXYIndex(xyIndex: TXYIndex) {
        this.xyIndex = xyIndex
    }
    public setCanvaPositionByXYIndex() {
        const xyIndex = this.getXYIndex()
        const newPosition = {
            x: xyIndex.x * gridWidth,
            y: xyIndex.y * gridWidth
        }
        this.canva.setPosition(newPosition)
    }
    public getXYIndex() {
        return this.xyIndex
    }
    private setChessmanCategoryData() {
        const categoryString = this.chessmanString[1] as string
        this.categoryData = chessmanDataMap[categoryString]
    }
    public getMoveRule() {
        const moveRule = this.categoryData.moveRule
        if (typeof moveRule === 'function') {
            return moveRule
        }
        return moveRule[this.getFaction()]
    }
    public getFaction() {
        return this.faction
    }
    public destorySelfCanva() {
        this.canva.destroy()
    }
    private createCanva() {
        const group = new Konva.Group({
            draggable: true,
            x: gridWidth * this.xyIndex.x,
            y: gridWidth * this.xyIndex.y
        })
        const circle = new Konva.Circle({
            radius: gridWidth / 3,
            fill: 'white',
            stroke: this.faction,
            strokeWidth: 3
        })
        const text = new Konva.Text({
            text: this.categoryData.text[this.faction],
            fontSize: gridWidth / 2,
            stroke: this.faction,
            strokeWidth: 2,
            x: -gridWidth / 4,
            y: -gridWidth / 4
        })
        group.add(circle)
        group.add(text)
        this.canva =  group
    }
}