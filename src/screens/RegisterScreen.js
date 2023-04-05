import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import AppTextInput from '../../components/AppTextInput';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const {width, height} = Dimensions.get('window');

const auth = getAuth();
const Register = ({navigation}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  
  let validateAndSet = (value,setValue) => {
    setValue(value)
 }

 function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Password do not match') 
  }
  else setValidationMessage('')
}
  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('LoginScreen');
    } catch (error) {
      setValidationMessage(error.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
    <StatusBar backgroundColor={Colors.white} />
    <View style={{ padding: Spacing * 2 }}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontWeight: "bold",
            marginVertical: Spacing * 3,
          }}
        >
        Create an account
        </Text>
        <Text
          style={{ fontSize: FontSize.small, maxWidth: "80%", textAlign: "center" }}
        >
          Let’s start our journey together!
        </Text>
      </View>
      <View style={{ marginVertical: Spacing * 3 }}>
        <AppTextInput placeholder='Email' value={email} onChangeText= {text => setEmail(text)}/>

        <AppTextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry
        ></AppTextInput>
         <AppTextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry
          onBlur={()=>checkPassword(password,confirmPassword)}
        ></AppTextInput> 
        {<Text style={styles.error}>{validationMessage}</Text>}
      </View>

      <TouchableOpacity
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.primary,
          marginVertical: Spacing * 3,
          borderRadius: Spacing,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 0,
            height: Spacing,
          },
          shadowOpacity: 0.1,
          shadowRadius: Spacing,
        }}
        onPress={createAccount}
      >
        <Text style={{ color: Colors.onPrimary, textAlign: "center", fontSize: FontSize.large }}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: Spacing * 3,
        }}
        onPress={createAccount}
      >
        <Text style={{ color: Colors.black, textAlign: "center", fontSize: FontSize.small }}>
          Already have an account? 
        </Text>
      </TouchableOpacity>

      <View style={{
        marginVertical: Spacing*2,

      }}>
        <Text style={{ color: Colors.primary, textAlign: "center", fontSize: FontSize.small }}>
         Or continue with
        </Text>

        <View style={{marginTop: Spacing, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={{
            padding: Spacing, 
            backgroundColor: Colors.gray,
            borderRadius: Spacing/2,
            marginHorizontal: Spacing,

          }}>
            <Ionicons name="logo-google" color={Colors.dark} size={Spacing * 2} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: Spacing, 
            backgroundColor: Colors.gray,
            borderRadius: Spacing/2,
            marginHorizontal: Spacing,
            
          }}>
            <Ionicons name="logo-apple" color={Colors.dark} size={Spacing * 2} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: Spacing, 
            backgroundColor: Colors.gray,
            borderRadius: Spacing/2,
            marginHorizontal: Spacing,
            
          }}>
            <Ionicons name="logo-facebook" color={Colors.dark} size={Spacing * 2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </SafeAreaView>
  );
};


export default Register;