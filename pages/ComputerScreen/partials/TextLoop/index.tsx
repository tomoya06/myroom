import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
import delay from "delay";

interface Props {
  texts: (string | JSX.Element)[];
  int?: number;
}

const TextLoop: React.FC<Props> = (props) => {
  const { texts, int = 3000 } = props;
  const [curText, setCurText] = useState<string | JSX.Element>("");
  const [isIn, setIn] = useState(false);

  const curIdx = useRef<number>(0);
  const interval = useRef<number>(0);

  const updateText = async (nxtIdx: number) => {
    const len = texts.length;
    // console.log(nxtIdx);
    setCurText(texts[nxtIdx]);
    setIn(true);

    await delay(int);
    setIn(false);

    curIdx.current = (nxtIdx + 1) % len;
  };

  useEffect(() => {
    // console.log("useEffect");
    curIdx.current = 0;
    updateText(curIdx.current);

    interval.current = setInterval(() => {
      updateText(curIdx.current);
    }, int + 400);

    return () => {
      clearInterval(interval.current);
    };
  }, [texts]);

  return (
    <div className={classNames("TextLoop", isIn ? "in" : "out")}>{curText}</div>
  );
};

export default TextLoop;
