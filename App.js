import React, { useState } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WelcomeScreen from "./WelcomeScreen";
import PatientChartScreen from "./PatientChartScreen";
import SignUp from "./SignUp";
import AddNewPatient from "./AddNewPatient";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import image from "./image.png";
import axios from "axios";

const LoginScreen = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.76:3000/ecg/login",
        { email, password }
      );

      if (response.data.success) {
        navigation.navigate("WelcomeScreen");
        setIsLoggedIn(true);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error checking login credentials:", error);
      alert("An error occurred. Please try again.");
    }
  };



  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View>
      <ImageBackground
        source={require("./image.png")}
        style={styles.image}
        resizeMode="contain"
      >
        
        <View style={styles.field}>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={styles.input_field}
            placeholder="Type email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.input_field}
            placeholder="Type password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    <TouchableOpacity
        style={styles.signup}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
    backgroundColor: "transparent",
    marginTop: 50,
  },

  title: {
    alignSelf: "center",
    marginTop: 50,
    fontSize: 30,
    fontFamily: "Georgia",
  },

  header: {
    backgroundColor: "lightseagreen",
    height: 100,
    width: "100%",
  },

  view: {
    backgroundColor: "azure",
    height: "100%",
    alignItems: "center",
  },

  field: {
    marginTop: 100,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 300,
    height: 250,
    alignSelf: "center",
  },

  text: {
    fontFamily: "Georgia",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
  },

  input_field: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    width: 200,
    height: 30,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "white",
  },

  button: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 30,
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

  submit: {
    fontFamily: "Georgia",
    fontSize: 20,
    textAlign: "center",
  },

  signup:{
    marginRight: 10,
    marginTop: 500,
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

  signupText:{
    fontFamily: "Georgia",
    fontSize: 20,
    textAlign: "center",
  }
});

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }}>
            {(props) => (
              <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen name="Patient Chart" component={PatientChartScreen} options={{ headerShown: false }}/>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false, title: "Sign Up" }}
        />
        <Stack.Screen
          name="AddNewPatient"
          component={AddNewPatient}
          options={{ headerShown: false, title: "Add a new patient" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
