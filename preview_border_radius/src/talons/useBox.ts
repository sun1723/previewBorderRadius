import {useState} from "react";
import {boxProps, Position} from "../Box";

export const useBox =  (props: boxProps) => {
    const {side,setSelected,selected} = props;
    // console.log("selected: ",selected,'side:',side)
    const boxStyle = side === 'left'  ? {x: -10,y: 20} : side === 'right' ? {x: 390, y: 20 } : side === 'top' ? {x: 100, y: -10 }: {x: 100, y: 390 }

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [mouseOffset, setMouseOffset] = useState<Position>({ x: 0, y: 0 });
    // const [position, setPosition] = useState<Position>(boxStyle);
    const [zIndex,setZIndex] = useState<number>(0);
    const [container,setContainer] = useState({width: 0,height: 0,z:0})

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        // setIsDragging(true);
        // const { left, top } = event.currentTarget.getBoundingClientRect();
        // setMouseOffset({ x: event.clientX - left, y: event.clientY - top });
        // setSelected(event.currentTarget.id);
        // setSide(event.currentTarget.id)
    }

    const handleMouseUp = () => {
        setIsDragging(false);
        //reset z
        setZIndex(0);
    }

    // const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) =>{
    //     if (isDragging) {
    //         const { width, height } = event.currentTarget.getBoundingClientRect();
    //         const { left:containerLeft,top: containerTop,width: containerWidth, height: containerHeight } = event.currentTarget.parentNode?.getBoundingClientRect();
    //
    //         if (!containerWidth || !containerHeight) {
    //             return;
    //         }
    //         setContainer({ width: containerWidth, height: containerHeight })
    //         const maxLeft = containerWidth - width + 10;
    //         const maxTop = containerHeight - height + 10;
    //         let left = event.clientX - mouseOffset.x - containerLeft + 10;
    //         let top = event.clientY - mouseOffset.y - containerTop + 20;
    //         if (side === 'left') {
    //             left = 0;
    //             top = Math.min(maxTop, Math.max(0, top));
    //         } else if (side === 'right'){
    //             left = maxLeft;
    //             top = Math.min(maxTop, Math.max(0, top));
    //         } else if (side === 'top') {
    //             left = Math.min(maxLeft, Math.max(0, left));
    //             top = 0;
    //         }else {
    //             left = Math.min(maxLeft, Math.max(0, left));
    //             top = maxTop;
    //         }
    //         // left = Math.min(maxLeft, Math.max(0, left));
    //         // top = Math.min(maxTop, Math.max(0, top));
    //         setPosition({ x: left, y: top});
    //         setZIndex(999)
    //     }
    // }
    return {
        // handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        // position,
        zIndex,
        container,
        ...props
    }
}