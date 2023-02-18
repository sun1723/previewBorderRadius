import styles from './Box.module.scss';

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
    const {
        position,
        side,
        id,
        selected,
        startPos
    } = props;

    const isSelected = selected === side;
    return (
            <div
                style={{
                    left: isSelected && position.left ? `${position.left}px` : `${startPos.left}px`,
                    top:  isSelected && position.top ? `${position.top}px` : `${startPos.top}px`,
                    border: isSelected? '5px solid black':''
                }}
                id={id}
                className={styles.box}
            />
    );
}

Box.defaultProps = {
    side: 'left'
}
export default Box;
