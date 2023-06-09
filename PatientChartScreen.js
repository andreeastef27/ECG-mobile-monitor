import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const PatientChartScreen = ({ route, navigation }) => {
  const { name } = route.params;
  return (
    <View style={styles.view}>
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        <Text style={styles.title}>Patient Chart</Text>
      </View>
      <Text style={styles.name}>{`Patient name: ${name}`}</Text>
      <Text style={styles.name}>{`Birth date: `}</Text>
      <Text style={styles.name}>{`Age: `}</Text>
      <Text style={styles.name}>{`Sex: `}</Text>
      <Text style={styles.name}>{`Last recording: `}</Text>
      <Text style={styles.name}>{`Previous reports: `}</Text>
      <Text style={styles.name}>{`Prescribed medication: `}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  button_text:{
    fontFamily: "Georgia",
    fontSize: 20,
    textAlign: "center",
  },

  goBackButton:{
    marginTop: 50,
    backgroundColor: "azure",
    borderWidth: 1,
    width: 60,
    marginLeft: 20,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  view: {
    backgroundColor: "azure",
    height: "100%",
  },

  header: {
    backgroundColor: "lightseagreen",
    height: 100,
  },

  title: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: -20,
    fontFamily: "Georgia",
    color: "black"
  },

  name: {
    fontWeight: "bold",
    marginTop: 20,
    marginLeft:20,
    fontSize: 18,
    fontFamily: "Georgia"
  },
});

export default PatientChartScreen;