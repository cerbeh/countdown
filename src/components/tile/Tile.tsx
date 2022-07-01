import React from "react";

type TileProps = {
    value: number,
    selected: boolean
}

export const Tile = (props: TileProps) => <div>
    { props.value }
</div>