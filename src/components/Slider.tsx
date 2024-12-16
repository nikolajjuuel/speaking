import { useEffect, useState } from "react";

interface Props {
  value: number;
  label: string;
  min: number;
  max: number;
  location: number;
  dasharray: number[];
  setDasharray: (value: number[]) => void;
}

const Slider = (props: Props) => {
  const { dasharray, setDasharray, location, min, max } = props;
  const calibration = props.max * 1.18; //118; //props.max * 1.225;
  const [position, setPosition] = useState(props.value / calibration);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const update = [...dasharray];
    update[location];
    setPosition(dasharray[location] / calibration);
  }, [dasharray]);

  return (
    <div style={{ marginBottom: "15px" }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            width: "14px",
            height: "14px",
            top: "-8px",
            borderRadius: "50%",
            transform: "translateX(3px)",
            textAlign: "center",
            opacity: "0.8",
            left: `${position * 100}%`,
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {moving ? dasharray[location] : ""}
          </div>
        </div>
        <input
          style={{ height: "1px", accentColor: "white" }}
          type="range"
          id="s1"
          name="s1"
          value={dasharray[location]}
          min={min}
          max={max}
          onMouseDown={() => setMoving(true)}
          onMouseUp={() => setMoving(false)}
          onChange={(e) => {
            const update = [...dasharray];
            update[location] = parseInt(e.target.value);
            setDasharray(update);
          }}
        />
      </div>
    </div>
  );
};
export default Slider;
