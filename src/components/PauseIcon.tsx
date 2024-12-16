interface Props {
  pause: () => void;
}
const PauseIcon = (props: Props) => {
  const { pause } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "7px",
        height: "45px",
      }}
      onClick={pause}
    >
      <div className="button circle" style={{ width: "40px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default PauseIcon;
