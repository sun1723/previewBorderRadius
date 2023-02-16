import styles from './Box.module.css';
import {useBox} from "./talons/useBox";

export interface Position {
    x: number;
    y: number;
}

export interface boxProps {
    side:string
}

const Box = (props: boxProps) => {
    const talonProps = useBox(props);
    const {
        handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        position,
        side,
        container
    } = talonProps;

    return (
            <div
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                className={styles.box}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
    );
}

Box.defaultProps = {
    side: 'left'
}
export default Box;
