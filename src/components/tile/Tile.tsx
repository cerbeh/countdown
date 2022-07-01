import './Tile.css';
import { GameNumber, OperatorObj } from '../../lib/gameboard'

export type TileProps = {
    tile: (GameNumber | OperatorObj),
    selected?: boolean,
    temporary?: boolean,
    clickHandler: (tile: (GameNumber | OperatorObj)) => void
}

export const Tile = (props: TileProps) => <div onClick={() => props.clickHandler(props.tile)} className='Tile'>
    {props.tile.val}
</div>