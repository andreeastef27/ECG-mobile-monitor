import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const WelcomeScreen = ({ navigation, setIsLoggedIn }) => {
  const handleGoToPatientChart = () => {
    navigation.push("Patient Chart", { name: selectedName });
  };

  function handleLogout() {
    navigation.navigate("Login");
    setIsLoggedIn(false);
  }

  function addNewPatient() {
    navigation.navigate("AddNewPatient");
  }

  const [isNameSelected, setIsNameSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [recordings, setRecordings] = useState([]);

  function handleNameSelect(itemValue) {
    setIsNameSelected(true);
    setSelectedName(itemValue);
  
    // Find the patient ID associated with the selected name
    const selectedPatient = patients.find((patient) => patient.value === itemValue);
    const selectedPatientId = selectedPatient ? selectedPatient.key : null;
  
    // Filter recordings based on selected patient ID
    const filteredRecordings = recordings.filter(
      (recording) => recording.id_pacient === selectedPatientId
    );
  
    // Extract the dates from filtered recordings
    const dates = filteredRecordings.map((recording) => ({
      key: recording.id_recording,
      value: recording.date,
    }));
  
    // Update the available dates in the date picker
    setDates(dates);
  }
  

  function handleDateSelect(itemValue) {
    setIsDateSelected(true);
    setSelectedDate(itemValue);
  }

  const date = [
    { key: "1", value: "12.03.2023" },
    { key: "2", value: "29.12.2022" },
    { key: "3", value: "05.04.2023" },
    { key: "4", value: "06.04.2023" },
    { key: "5", value: "07.02.2023" },
  ];

  const [dates, setDates] = useState([]);

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // make API call to fetch patients from the database
    axios
      .get("http://192.168.1.76:3000/ecg/patients")
      .then((res) => {
        const patientsData = res.data.map((patient) => ({
          key: patient.id_patient,
          value: patient.patient_name,
          patientData: patient, // Store the entire patient data
        }));
        setPatients(patientsData);
      })
      .catch((err) => {
        console.log(err);
      });
  
    // make API call to fetch recordings from the database
    axios
      .get("http://192.168.1.76:3000/ecg/recordings")
      .then((res) => {
        setRecordings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  const [selected, setSelected] = useState(1);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ECG monitor</Text>
      </View>
      
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          position: "relative",
          zIndex: 1,
        }}
      >
        <View style={styles.list}>
          <Picker
            selectedValue={selectedName}
            onValueChange={(itemValue) => handleNameSelect(itemValue)}
          >
            <Picker.Item label="Select a name" value={null} />
            {patients.map((item) => (
              <Picker.Item
                key={item.key}
                label={item.value}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.list2}>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(itemValue) => handleDateSelect(itemValue)}
          >
            <Picker.Item label="Select a date" value={null} />
            
                {dates.map((item) => (
                  <Picker.Item
                    key={item.key}
                    label={item.value}
                    value={item.value}
                  />
                ))}
              
          </Picker>
        </View>
      </View>

      {isNameSelected && isDateSelected && (
        <View style={styles.fixedContainer}>
          <View style={styles.plot}></View>

          <View style={styles.circle}>
            <Text style={styles.bpm}>BPM</Text>
          </View>
        </View>
      )}
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button1}
            onPress={handleGoToPatientChart}
          >
            <Text style={styles.buttonText}>View Patient Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
           onPress={addNewPatient}
          >
            <Text style={styles.buttonText}>Add a new patient</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
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

  title: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: -20,
    fontFamily: "Georgia",
  },

  paragraph: {
    fontSize: 20,
    marginTop: 30,
    marginLeft: 20,
    marginRight: "auto",
    fontFamily: "Georgia",
  },

  view: {
    backgroundColor: "azure",
    height: "100%",
  },

  header: {
    backgroundColor: "lightseagreen",
    height: 100,
  },

  list: {
    fontFamily: "Georgia",
    width: 200,
    marginTop: -30,
    marginLeft: 10,
    marginRight: "auto",
    zIndex: 2,
    backgroundColor: "transparent",
  },

  list2: {
    fontFamily: "Georgia",
    width: 200,
    marginTop: -30,
    marginLeft: "auto",
    marginRight: 10,
    zIndex: 2,
    backgroundColor: "transparent",
  },

  plot: {
    padding: 10,
    height: 350,
    width: 350,
    backgroundColor: "#afeeee",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 50,
    justifyContent: "center",
    positon: "absolute",
    zIndex: 1,
  },

  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 15,
    backgroundColor: "transparent",
    marginLeft: 30,
    marginTop: 10,
    borderColor: "green",
    positon: "fixed",
  },

  bpm: {
    alignSelf: "center",
    marginTop: 5,
  },

  bpmshow: {
    alignSelf: "center",
  },

  fixedContainer: {
    position: "absolute",
    top: 230,
    left: 0,
    right: 0,
    zIndex: 0,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "lightgray",
    paddingVertical: 10,
  },
  button1: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 200
  },

  button2: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 200,
    marginLeft: 10
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default WelcomeScreen;
