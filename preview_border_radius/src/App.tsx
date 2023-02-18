import { SetStateAction, useState} from 'react'
import styles from './App.module.css'
import Box from "./Box";

function App() {
    const [selected, setSelected] = useState('');
    const [position, setPosition] = useState({});
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(event.currentTarget,selected)
        if (isDragging && selected) {
            // const {width, height} = event.currentTarget.getBoundingClientRect();
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
        if (event.target instanceof Element){
            setSelected(event.target.id);
            setIsDragging(true);
        }
    }

    const handleMouseUp = () => {
        setPosition({});
        setIsDragging(false)
    }

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
          <div className={styles.container} onMouseMove={handleMouseMove} onMouseDown={handleOnClick} onMouseUp={handleMouseUp}>
              <Box startPos={{left: 0,top: 10}} side="left" id='left' setSelected={setSelected} selected={selected} position={position}/>
              <Box startPos={{left: 400,top: 10}} side="right" id='right' setSelected={setSelected} selected={selected} position={position}/>
              <Box  startPos={{left: 10,top: 0}} side="top" id='top' setSelected={setSelected} selected={selected} position={position}/>
              <Box startPos={{left: 10,top: 400}} side="bottom" id='bottom' setSelected={setSelected} selected={selected} position={position}/>
          </div>
            <div>
                <input/>
                <button>Copy to ClipBoard</button>
            </div>
      </header>
    </div>
  )
}

export default App
