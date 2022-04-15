import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TextArea = styled.textarea((props) => ({ ...props }));

function App2() {
  const [text, setText] = useState("lorem ipsom");
  // prettier-ignore
  const [parentRef,draggerRef, refLeft, refTop, refBottom, refRight] = Array(6).fill(useRef(null));

  useEffect(() => {
    const parent = parentRef.current;
    const dragger = draggerRef.current;
    const styles = window.getComputedStyle(parent);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0,
      y = 0;

    parent.style.top = "50px";
    parent.style.left = "50px";

    /* draggability - start */
    const onDrag = (e) => {
      e.stopPropagation();
      let { movementX, movementY } = e;
      let styles = window.getComputedStyle(parent);
      let left = parseInt(styles.left);
      let top = parseInt(styles.top);
      parent.style.left = `${left + movementX}px`;
      parent.style.top = `${top + movementY}px`;
    };

    dragger.addEventListener("mousedown", () => dragger.addEventListener("mousemove", onDrag));
    document.addEventListener("mouseup", () => dragger.removeEventListener("mousemove", onDrag));

    /* draggability - end */

    /* resize to top - start */

    const onMouseMoveTopResize = (e) => {
      const dy = e.clientY - y;
      height = height - dy;
      y = e.clientY;
      parent.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (e) => document.removeEventListener("mousemove", onMouseMoveTopResize);

    const onMouseDownTopResize = (e) => {
      y = e.clientY;
      const styles = window.getComputedStyle(parent);
      parent.style.bottom = styles.bottom;
      parent.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    /* resize to top - end */

    /* resize to right - start */

    const onMouseMoveRightResize = (e) => {
      e.stopPropagation();
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      parent.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (e) => document.removeEventListener("mousemove", onMouseMoveRightResize);

    const onMouseDownRightResize = (e) => {
      x = e.clientX;
      parent.style.left = styles.left;
      parent.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    /* resize to right - end */

    /* resize to bottom - start */

    const onMouseMoveBottomResize = (e) => {
      e.stopPropagation();

      const dy = e.clientY - y;
      y = e.clientY;
      height = height + dy;
      parent.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (e) => document.removeEventListener("mousemove", onMouseMoveBottomResize);

    const onMouseDownBottomResize = (e) => {
      y = e.clientY;
      const styles = window.getComputedStyle(parent);
      parent.style.top = styles.top;
      parent.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    /* resize to bottom - end */

    /* resize to left - start */

    const onMouseMoveLeftResize = (e) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width - dx;
      parent.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (e) => document.removeEventListener("mousemove", onMouseMoveLeftResize);

    const onMouseDownLeftResize = (e) => {
      x = e.clientX;
      parent.style.right = styles.right;
      parent.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    /* resize to left - end */

    // refTop.current.addEventListener("mousedown", onMouseDownTopResize);
    // refLeft.current.addEventListener("mousedown", onMouseDownLeftResize);
    refRight.current.addEventListener("mousedown", onMouseDownRightResize);
    refBottom.current.addEventListener("mousedown", onMouseDownBottomResize);

    return () => {
      dragger.removeEventListener("mousedown", onDrag);

      //   refTop.current.removeEventListener("mousedown", onMouseDownTopResize);
      //   refLeft.current.removeEventListener("mousedown", onMouseDownLeftResize);
      refRight.current.removeEventListener("mousedown", onMouseDownRightResize);
      refBottom.current.removeEventListener("mousedown", onMouseDownBottomResize);
    };
  }, []);

  // const setCoordinates = (text) => (e) => {
  //   const { clientX: x, clientY: y, target } = e;
  //   setTimeout(() => (target.style.display = text), 0);
  //   parentRef.current.style.left = `${x}px`;
  //   parentRef.current.style.top = `${y}px`;
  // };

  return (
    <div className="flex items-center bg-gray-200 justify-center w-full h-screen">
      <div className="h-[480px] w-[720px] bg-white relative">
        <div ref={parentRef} className="border border-blue-400 absolute" style={{ width: "80px", height: "80px" }}>
          <div
            // draggable={true}
            // onDrag={setCoordinates("none")}
            // onDragEnd={setCoordinates("block")}
            ref={draggerRef}
          >
            <FontAwesomeIcon className="w-5 absolute -top-5 -right-5 text-gray-700" icon={faArrowsUpDownLeftRight} />
          </div>
          <span className="absolute h-2 w-2 rounded bg-white -top-1 -left-1 border shadow cursor-nw-resize" />
          <span className="absolute h-2 w-2 rounded bg-white -bottom-1 -left-1 border shadow cursor-sw-resize" />
          <span className="absolute h-2 w-2 rounded bg-white -bottom-1 -right-1 border shadow cursor-se-resize" />
          <span className="absolute h-2 w-2 rounded bg-white -right-1 -top-1 border shadow cursor-ne-resize" />
          <span
            ref={refTop}
            className="absolute h-2 w-5 rounded bg-white left-1/2 -top-1 border shadow -translate-x-1/2 cursor-n-resize"
          />
          <span
            ref={refBottom}
            className="absolute h-2 w-5 rounded bg-white left-1/2 -bottom-1 border shadow -translate-x-1/2 cursor-s-resize"
          />
          <span
            ref={refLeft}
            className="absolute h-5 w-2 rounded bg-white top-1/2 -left-1 border shadow -translate-y-1/2 cursor-w-resize"
          />
          <span
            ref={refRight}
            className="absolute h-5 w-2 rounded bg-white top-1/2 -right-1 border shadow -translate-y-1/2 cursor-e-resize"
          />
          ​
          <div className="w-[90%] h-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TextArea
              value={text}
              resize="none"
              outline="none"
              width="100%"
              background-color="transparent"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App2;
