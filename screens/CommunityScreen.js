import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { VictoryLine, VictoryBar } from "victory-native";

export default function CommunityScreen (){

    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];

    return (
      <ScrollView>
        <VictoryLine
        data={data}
        y={data => data.earnings}
        x={data => data.quarter}
        />
      </ScrollView>
    );

}

CommunityScreen.navigationOptions = {
  title: "Community",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
