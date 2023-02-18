import styles from './Box.module.scss';
import {useBox} from "./talons/useBox";

export interface Position {
    x: number;
    y: number;
}

export interface boxProps {
    side:string,
    id: string,
    setSelected: (id: string)=>void;
    selected: string,
    position:{
        left: number,
        top:number
    }
    startPos:{
        left: number,
        top:number
    }
}

const Box = (props: boxProps) => {
    const talonProps = useBox(props);
    const {
        // handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        position,
        zIndex,
        side,
        container,
        id,
        selected,
        startPos
    } = talonProps;

    const isSelected = selected === side;
    return (
            <div
                style={{
                    left: isSelected && position.left ? `${position.left}px` : `${startPos.left}px`,
                    top:  isSelected && position.top ? `${position.top}px` : `${startPos.top}px`,
                    zIndex: `${zIndex}`,
                    border: isSelected? '5px solid black':''
                }}
                id={id}
                className={styles.box}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                // onMouseMove={handleMouseMove}
            />
    );
}

Box.defaultProps = {
    side: 'left'
}
export default Box;
