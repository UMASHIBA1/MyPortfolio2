import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../../../css/Home/SkillsArea.scss";
import {
  CHANGE_FOCUSED_AREA,
  CHANGE_HOME_FIRST_ARRIVED
} from "../../../redux/constants/homeTypes";
import { DispatchType } from "../../../redux/store";
import orange_design from "../../../statics/orange_design.svg";
import { useTypedSelector } from "../../../typing/redux/hooks";
import HomeDisappearAnimation from "../../Atomics/Home/HomeDisappearAnimation";
import HomeH1 from "../../Atomics/Home/HomeH1";

const SkillsArea: React.FC = () => {
  const focusedArea = useTypedSelector(state => state.homeState.focusedArea);
  const dispatch: DispatchType = useDispatch();
  const history = useHistory();
  const [isDisappearContent, changeIsDisappearContent] = useState(false);
  const homeFirstArrived = useTypedSelector(
    state => state.homeState.homeFirstArrived
  );

  let shadowClassName = "";
  if (focusedArea === "works") {
    shadowClassName = "inset-shadow";
  } else if (focusedArea === "skills") {
    shadowClassName = "normal-shadow";
  }

  const floatThis = () => {
    dispatch({ type: CHANGE_FOCUSED_AREA, payload: "skills" });
  };

  const disappearContent = () => {
    changeIsDisappearContent(true);
  };

  const homeArrivedFlagToTrue = () => {
    dispatch({ type: CHANGE_HOME_FIRST_ARRIVED, payload: false });
  };

  const gotoSkillsPage = () => {
    history.push("/skills");
  };

  const onDisappearFC = () => {
    homeArrivedFlagToTrue();
    gotoSkillsPage();
  };

  return (
    <React.Fragment>
      <div
        onMouseOver={floatThis}
        onClick={disappearContent}
        id="skills-area"
        className="home-area home-area-cursor"
      >
        <div className={shadowClassName} />
        <HomeH1
          isAnimate={homeFirstArrived}
          className="skills-home-h1 home-area-cursor"
        >
          Skills
        </HomeH1>
        <img alt="Skillsエリア背景" src={orange_design} />
      </div>
      <HomeDisappearAnimation
        color="orange"
        isStartAnimation={isDisappearContent}
        animationEndFC={onDisappearFC}
      />
    </React.Fragment>
  );
};

export default SkillsArea;
