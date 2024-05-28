import { useState } from "react";
const Incubator = ({
    setSkin,
  
}: {
    setSkin: (skin:string)=>Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

const incubate = async()=>{
    setLoading(true);
    const skinString = document.getElementById("skin_input")?.getAttribute("value");
    skinString? await setSkin(skinString):{}
    document.getElementById("skin_input")?.setAttribute("value","");
    setLoading(false);
}

  return (
    <div id="incubator">
        <input title="skin" id="skin_input" type="text" />
      <button
        type="button"
        className="button"
        onClick={incubate}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>Sending...
          </span>
        ) : (
          <span>
            <i className="far fa-paper-plane"></i>Send
          </span>
        )}
      </button>
    </div>
  );
};

export default Incubator;