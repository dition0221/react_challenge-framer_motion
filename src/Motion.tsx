import { styled } from "styled-components";
import { Variants, motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #00eeca, #d0e);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  width: 50%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  position: relative;
`;

const Box = styled(motion.div)`
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 30%;
  aspect-ratio: 1/1;
  max-height: 80%;
  border-radius: 50%;
  background-color: royalblue;
  position: absolute;
  z-index: 1;
`;

const SwitchBtn = styled.button`
  width: fit-content;
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: 0;
  border-radius: 5px;
  padding: 2px 7px;
  font-size: 16px;
  cursor: pointer;
  &:active {
    background-color: black;
    color: yellowgreen;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const BoxOverlay = styled(Box)`
  width: 25%;
  height: 25%;
  background-color: rgba(0, 0, 0);
  position: absolute;
  cursor: unset;
  z-index: 2;
`;

const boxVariants: Variants = {
  hover: { scale: 1.1 },
};

const overlayVariants: Variants = {
  init: { backgroundColor: "rgba(0,0,0,0)" },
  active: { backgroundColor: "rgba(0,0,0,0.5)" },
  exit: { backgroundColor: "rgba(0,0,0,0)" },
};

const boxOverlayVariants: Variants = {
  init: { backgroundColor: "rgba(255, 255, 255, 0.6)" },
  active: { backgroundColor: "rgba(255, 255, 255, 1)" },
};

export default function Motion() {
  // Circle animation
  const [isCircle, setIsCircle] = useState(false);
  const toggleCircle = () => setIsCircle((prev) => !prev);

  // Overlay animation
  const [boxId, setBoxId] = useState<string | null>(null);
  const toggleOverlay = (id: string | null) => setBoxId(id);
  const [firstBoxId, lastBoxId] = ["first-box", "last-box"];

  return (
    <Wrapper>
      <Grid>
        <Box
          layoutId={firstBoxId}
          onClick={() => toggleOverlay(firstBoxId)}
          style={{ originX: 1, originY: 1 }}
          variants={boxVariants}
          whileHover="hover"
        />
        <Box
          style={{ originX: 0, originY: 1 }}
          variants={boxVariants}
          whileHover="hover"
        >
          {!isCircle && <Circle layoutId="circle" />}
        </Box>
        <Box
          style={{ originX: 1, originY: 0 }}
          variants={boxVariants}
          whileHover="hover"
        >
          {isCircle && <Circle layoutId="circle" />}
        </Box>
        <Box
          layoutId={lastBoxId}
          onClick={() => toggleOverlay(lastBoxId)}
          style={{ originX: 0, originY: 0 }}
          variants={boxVariants}
          whileHover="hover"
        />
        <SwitchBtn onClick={toggleCircle}>Switch</SwitchBtn>
      </Grid>
      <AnimatePresence>
        {boxId && (
          <>
            <Overlay
              onClick={() => toggleOverlay(null)}
              variants={overlayVariants}
              initial="init"
              animate="active"
              exit="exit"
            />
            <BoxOverlay
              layoutId={boxId}
              variants={boxOverlayVariants}
              initial="init"
              animate="active"
            />
          </>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
