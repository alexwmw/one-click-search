import "./TooltipProvider.less";
import { Transition } from "react-transition-group";
import "./Tooltip.less";


const Tooltip = ({ description, isVisible }) => (
  <Transition in={isVisible} timeout={400}>
    {(state) => {
      const style = {
        transition: "opacity 200ms ease",
        opacity: state == "entered" ? 1 : 0,
      };
      return (
        state !== "exited" && (
          <div style={style} className={"infoBubble"}>
            <p>{description}</p>
          </div>
        )
      );
    }}
  </Transition>
);

export default Tooltip;
