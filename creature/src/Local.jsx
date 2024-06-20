import useSketch from "./hooks/useSketch";

function Local(props={skin:`egg`}) {
  const p5ContainerRef = useSketch(props.skin);
  return <div className="Local" ref={p5ContainerRef} />;
}

export default Local;