import React from "react";
import WorkoutLogic from "../components/WorkoutLogic";
import RoutineBarGraphic from "../components/RoutineBarGraphic";


export default function CommunityScreen (){

    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];

    return (
      <>
      <RoutineBarGraphic />
     <WorkoutLogic />
     </>
    );

}

CommunityScreen.navigationOptions = {
  title: "Community",
};
