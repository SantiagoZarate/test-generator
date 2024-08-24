import "../../styles/multiple-choice-test.css";
import { TickMicroIcon } from "../icons/TickMicroIcon";

export function MultipleChoiceTestDraw() {
  return (
    <div className="multiple-choice-test">
      <div className="question">
        <span className="box" />
        <span className="answer" />
      </div>
      <div className="relative question">
        <TickMicroIcon className="-translate-x-[2px]" />
        {/* <span className="box" /> */}
        <span className="answer" />
      </div>
      <div className="question">
        <span className="box" />
        <span className="answer" />
      </div>
    </div>
  );
}
