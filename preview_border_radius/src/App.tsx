import { useState} from 'react'
import styles from './App.module.css'
import Box from "./Box";

function App() {
    const [selected, setSelected] = useState('');
    const [position, setPosition] = useState({left:0,top:0});
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [leftPos, setLeftPos] = useState({left: 0,top: 10});
    const [rightPos, setRightPos] = useState({left: 400,top: 10});
    const [topPos, setTopPos] = useState({left: 10,top: 0});
    const [bottomPos, setBottomPos] = useState({left: 10,top: 400});
    const [lastSelected,setLastSelected] = useState('');

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging && selected) {
            const {
                left: containerLeft,
                top: containerTop,
                width: containerWidth,
                height: containerHeight
            } = event.currentTarget?.getBoundingClientRect();

            if (!containerWidth || !containerHeight) {
                return;
            }
            const maxLeft = containerWidth + 10;
            const maxTop = containerHeight + 10;
            let left = event.clientX - containerLeft + 10;
            let top = event.clientY - containerTop + 20;
            left = Math.min(left,maxLeft);
            top = Math.min(top,maxTop);
            if(selected==='left'){
                setPosition({left:0, top})
            }else if(selected === 'right'){
                setPosition({left:maxLeft,top})
            }else if(selected === 'top'){
                setPosition({left,top:0})
            }else if(selected === 'bottom'){
                setPosition({left,top:maxTop})
            }
        }
    }

    const handleOnClick = (event:React.MouseEvent<HTMLDivElement> ) => {
        // CLEAN UP
        if(!selected){
            setPosition({left:0,top:0})
        }
        if (event.target instanceof Element){
            setSelected(event.target.id);
            setIsDragging(true);
        }
    }

    const handleMouseUp = () => {
        if(selected==='left'){
            setLeftPos(position)
        }else if(selected === 'right'){
            setRightPos(position)
        }else if(selected === 'top'){
            setTopPos(position)
        }else if(selected === 'bottom'){
            setBottomPos(position)
        }
        setIsDragging(false);
        setLastSelected(selected);
        setSelected('')
    }

  return (
    <div className={styles.App} onMouseUp={handleMouseUp}>
      <header className={styles.header} >
          <div className={styles.container} onMouseMove={handleMouseMove} onMouseDown={handleOnClick}  style={{borderRadius:`${Math.ceil(topPos.left/4)}% ${Math.floor(100-topPos.left/4)}% ${Math.floor(100 - bottomPos.left/4)}% ${Math.ceil((bottomPos.left)/4)}% / ${Math.ceil((leftPos.top)/4)}% ${Math.floor(rightPos.top/4)}%  ${Math.floor(100-rightPos.top/4)}% ${Math.ceil(100-leftPos.top/4)}%` }}>
              <Box startPos={leftPos} side="left" id='left' setSelected={setSelected} selected={selected} position={position}/>
              <Box startPos={rightPos} side="right" id='right' setSelected={setSelected} selected={selected} position={position}/>
              <Box  startPos={topPos} side="top" id='top' setSelected={setSelected} selected={selected} position={position}/>
              <Box startPos={bottomPos} side="bottom" id='bottom' setSelected={setSelected} selected={selected} position={position}/>
          </div>
            <div className={styles.inputWrapper}>
                <input className={styles.input} value={`border-radius:${Math.round(topPos.left/4)}% ${Math.round(100-topPos.left/4)}% ${Math.round(100 - bottomPos.left/4)}% ${Math.round((bottomPos.left)/4)}% / ${Math.round((leftPos.top)/4)}% ${Math.round(rightPos.top/4)}%  ${Math.round(100-rightPos.top/4)}% ${Math.round(100-leftPos.top/4)}%`}/>
                <button>Copy to ClipBoard</button>
            </div>
      </header>
    </div>
  )
}

export default App
