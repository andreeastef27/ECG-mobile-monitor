import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native";
import axios from "axios";

const AddNewPatient = ({ navigation }) => {
  
    const [name, setName] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
  
    async function handleRegister() {
      if (!name || !birth_date || !sex || !age) {
        alert("Please fill in all the fields");
        return;
      }
      try {
        const response = await axios.post("http://192.168.1.76:3000/ecg/newpatient", {
          name,
          birth_date,
          sex,
          age
        });
        alert(response.data.message);
        navigation.goBack(); // Go back to the login screen
      } catch (error) {
        console.error("Error creating patient:", error);
        alert("Error creating patient. Please try again.");
      }
    }

  return (
    <View style={styles.view}>
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        <Text style={styles.title}>Add a new patient</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.text}>Name:</Text>
        <TextInput
          style={styles.input_field}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.text}>Birth date:</Text>
        <TextInput
          style={styles.input_field}
          placeholder="Enter birth date"
          value={birth_date}
          onChangeText={setBirthDate}
        />
        <Text style={styles.text}>Age:</Text>
        <TextInput
          style={styles.input_field}
          placeholder="Enter age"
          value={age}
          onChangeText={setAge}
        />
        <Text style={styles.text}>Sex:</Text>
        <TextInput
          style={styles.input_field}
          placeholder="Enter sex"
          value={sex}
          onChangeText={setSex}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
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
      },
    
      field:{
        marginTop: 100,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 2,
        width: 300,
        height: 350,
        alignSelf: "center",
      },
    
      text:{
        fontFamily: "Georgia",
        fontSize: 20,
        alignSelf: "center",
        marginTop: 15,
      },
    
      input_field:{
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        width: 200,
        height: 30,
        alignSelf: "center",
        marginTop: 10,
        backgroundColor: "white",
      },
    
      button:{
        alignSelf: "flex-end",
        marginRight: -3,
        marginTop: 50,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 2,
        height: 50,
        width: 120,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        textAlignVertical: "center",
      },
    
      buttonText:{
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
      }
});

export default AddNewPatient;