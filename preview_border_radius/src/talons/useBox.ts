import {useState} from "react";
import {boxProps, Position} from "../Box";

export const useBox =  (props: boxProps) => {
    const {side} = props;
    const boxStyle = side === 'left'  ? {x: 0,y: 50} : side === 'right' ? {x: 350, y: 50 } : side === 'top' ? {x: 100, y: 0 }: {x: 100, y: 350 }

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [mouseOffset, setMouseOffset] = useState<Position>({ x: 0, y: 0 });
    const [position, setPosition] = useState<Position>(boxStyle);
    const [container,setContainer] = useState({width: 0,height: 0})

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        setIsDragging(true);
        const { left, top } = event.currentTarget.getBoundingClientRect();
        setMouseOffset({ x: event.clientX - left, y: event.clientY - top });
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) =>{
        if (isDragging) {
            const { width, height } = event.currentTarget.getBoundingClientRect();
            const { width: containerWidth, height: containerHeight } = event.currentTarget.parentNode?.getBoundingClientRect();
            if (!containerWidth || !containerHeight) {
                return;
            }
            setContainer({ width: containerWidth, height: containerHeight })
            const maxLeft = containerWidth - width;
            const maxTop = containerHeight - height;
            let left = event.clientX - mouseOffset.x;
            let top = event.clientY - mouseOffset.y;
            if (side === 'left') {
                left = 0;
                top = Math.min(maxTop, Math.max(0, top));
            } else if (side === 'right'){
                left = maxLeft;
                top = Math.min(maxTop, Math.max(0, top));
            } else if (side === 'top') {
                left = Math.min(maxLeft, Math.max(0, left));
                top = 0;
            }else {
                left = Math.min(maxLeft, Math.max(0, left));
                top = maxTop;
            }
            // left = Math.min(maxLeft, Math.max(0, left));
            // top = Math.min(maxTop, Math.max(0, top));
            console.log(left,top)
            setPosition({ x: left, y: top });
        }
    }
    return {
        handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        position,
        container,
        ...props
    }
}