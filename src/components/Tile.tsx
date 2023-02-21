import './Tile.css';
import { Button } from 'antd';
import { FunctionComponent } from 'react';

type TileProps = {
	value: number | string
	id: string
	disabled?: boolean
	onClick: (id: string) => void
	onUndo?: (id: string) => void
}

export const Tile: FunctionComponent<TileProps> = ({ id, value, disabled = false, onClick, onUndo }) => {
	// const hasUndo = onUndo !== undefined

	// const handleUndo = () => onUndo?.(id)
	const handleClick = () => onClick(id)
	return (
		<div className='py-4'>
			<Button disabled={disabled} block onClick={handleClick} className='py-12'>
				{value}
			</Button>
		</div>
	)
}