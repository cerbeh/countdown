import './Tile.css';
// import { GameNumber, OperatorObj } from '../../lib/game/types'
import { Button } from 'antd';

export type TileProps<T = any> = {
    tile: T,
    selected?: boolean,
    clickHandler: (tile: T) => void,
    undoHandler?: (tile: T) => void,
    hasUndo?: boolean
}

export const Tile = (props: TileProps) => <div onClick={() => props.clickHandler(props.tile)} className='Tile'>
    { props.hasUndo && <Button onClick={() => props.undoHandler?.(props.tile)}></Button>}
    {props.tile.val}
</div>
