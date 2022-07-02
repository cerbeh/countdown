import './Tile.css';
import { GameNumber, OperatorObj } from '../../lib/gameboard'
import { Button } from 'antd';

export type TileProps<T> = {
    tile: T,
    selected?: boolean,
    clickHandler: (tile: T) => void,
    undoHandler?: (tile: T) => void,
    hasUndo?: boolean
}

export const Tile = (props: TileProps) => <div onClick={() => props.clickHandler(props.tile)} className='Tile'>
    { props.hasUndo && <Button onClick={() => prps.undoHandler(props.tile)}></Button>}
    {props.tile.val}
</div>
