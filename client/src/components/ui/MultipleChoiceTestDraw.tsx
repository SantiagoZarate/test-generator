import "../../styles/multiple-choice-test.css";
import { CrossMicroIcon } from "../icons/CrossMicroIcon";
import { TickMicroIcon } from "../icons/TickMicroIcon";

export function MultipleChoiceTestDraw() {
  return (
    <div className="multiple-choice-test">
      <div className="relative question">
        <CrossMicroIcon className="absolute -translate-x-[2px]" />
        <span className="box" />
        <span className="answer" />
      </div>
      <div className="relative question">
        <TickMicroIcon className="absolute -translate-x-[2px]" />
        <span className="box" />
        <span className="answer" />
      </div>
      <div className="relative question">
        <CrossMicroIcon className="absolute -translate-x-[2px]" />
        <span className="box" />
        <span className="answer" />
      </div>
    </div>
  );
}
