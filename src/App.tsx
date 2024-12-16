import { useRef, useState } from "react";
import Speaking from "./components/Speaking.tsx";
import "./App.css";
import Slider from "./components/Slider.tsx";
import PlayIcon from "./components/PlayIcon.tsx";
import PauseIcon from "./components/PauseIcon.tsx";

function App() {
  const [dasharray, setDasharray] = useState([0, 3373]);
  const [dashoffset, setDashoffset] = useState([0, 0]);
  const [playing, setPlaying] = useState(false);
  const directionRef = useRef(true);
  const progressRef = useRef(0);
  const isStoppedRef = useRef(false);

  const stopAnimation = () => {
    isStoppedRef.current = true;
    setPlaying(false);
  };

  const startAnimation = () => {
    setPlaying(true);
    isStoppedRef.current = false;
    animatePath(progressRef.current, 10, directionRef.current);
  };

  const animatePath = (progress: number, speed: number, forward: boolean) => {
    if (isStoppedRef.current) {
      return;
    }
    if (directionRef.current) {
      progressRef.current += speed;
      console.log("forward");
      console.log(directionRef.current);

      if (progressRef.current >= 3373 + 496) {
        directionRef.current = false;
      }
      if (progressRef.current < 500) {
        setDasharray([progress, dasharray[1]]);
      } else {
        setDashoffset([dasharray[0], progress - 500]);
      }
    } else {
      console.log("backwards");
      console.log(directionRef.current);
      progressRef.current -= speed;
      if (progressRef.current <= 0) {
        progressRef.current = 0;
        directionRef.current = true;
        isStoppedRef.current = false;
        setPlaying(false);
        return;
      }
      if (progress < 500) {
        setDasharray([progress, dasharray[1]]);
      } else {
        setDashoffset([dasharray[0], progress - 496]);
      }
    }
    console.log("requeted");
    requestAnimationFrame(() => animatePath(progressRef.current, 15, forward));
  };

  return (
    <>
      <h1>Speaking SVG Animater</h1>
      <div>
        <Speaking
          strokeDasharray={dasharray.toString()}
          strokeDashoffset={dashoffset[0] - dashoffset[1]}
        />
      </div>
      {playing ? (
        <PauseIcon pause={stopAnimation} />
      ) : (
        <PlayIcon play={startAnimation} />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div className="card">
          <div>
            <h3>Adjusters</h3>
            <div>
              <Slider
                value={dasharray[0]}
                location={0}
                label={"dasharray"}
                dasharray={dasharray}
                setDasharray={setDasharray}
                min={0}
                max={3400}
              />
              <Slider
                value={dasharray[1]}
                location={1}
                dasharray={dasharray}
                setDasharray={setDasharray}
                label={"dasharray"}
                min={0}
                max={3373}
              />
              <Slider
                value={dashoffset[0]}
                location={0}
                dasharray={dashoffset}
                setDasharray={setDashoffset}
                label={"dashoffset"}
                min={0}
                max={1500}
              />
              <Slider
                value={dashoffset[1]}
                location={1}
                dasharray={dashoffset}
                setDasharray={setDashoffset}
                label={"dashoffset"}
                min={0}
                max={3373}
              />
            </div>
          </div>
        </div>
        <div
          className="card"
          style={{
            width: "200px",
          }}
        >
          <h3>Values</h3>
          <p style={{ fontWeight: "bold", margin: "0px" }}>
            {" "}
            Stroke Dash Array{" "}
          </p>
          <p>{`${dasharray[0]} , ${dasharray[1]}`}</p>
          <p style={{ fontWeight: "bold" }}>Stroke Dash Offset </p>
          <p>{`${dashoffset[0]} - ${dashoffset[1]} = ${
            dashoffset[0] - dashoffset[1]
          }`}</p>
        </div>
      </div>
    </>
  );
}

export default App;
