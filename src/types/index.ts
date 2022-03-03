import { Chessman } from "../chessman"
import { factionMap, chessmanDataMap } from "../const"
export type TChessmanKey = keyof typeof chessmanDataMap
export type TKeyFactionMap = keyof typeof factionMap
export type TNoChessman = 'no chessman'
export type TBoardStringData = string[][]
export type TBoardElement = Chessman | TNoChessman
export type TBoardData = (Chessman | TNoChessman)[][]
export type TFaction = 'red' | 'black'
export interface IPosition {
    x: number, y: number
}
export type TXYIndex = IPosition
export type TMoveRule = (boardData: TBoardData, startIndex: TXYIndex, endIndex: TXYIndex, selfFaction: TFaction) => boolean
export interface TChessmanData {
    text: {
        [props in TFaction]: string
    },
    moveRule: TMoveRule
}
