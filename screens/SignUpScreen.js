import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider'
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


  const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        confirm_secureTextEntry: true,
        confirm_password:'',
    });

  const {register} = useContext(AuthContext)

  const textInputChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; 
    if(val.length !== 0 ){
         setData({

          ...data,
          email: val,
          check_textInputChange:true
         });
    }else{
      setData({

        ...data,
        email: val,
        check_textInputChange:false
       });
    }
  }

  const handlePasswordChange = (val) => {
    if(val.trim().length >= 8){
        setData({

          ...data,
          password: val,
          isValidPassword: true
        });
    }else{

      setData({

        ...data,
        password: val,
        isValidPassword: false
      });   

    }
  }

  const handleConfrimPasswordChange = (val) => {

    setData({

      ...data,
      confirm_password: val
    });
}

  const updateSecureTextEntry = () => {

    setData({

      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const updateConfirmSecureTextEntry = () => {

    setData({

      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    })
  }

  const handleValidUser= (val)=>{
    console.log(val)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; 
    if(reg.test(val) === null ){
        setData({
          ...data,
          isValidUser: false
        });
    }else{

      setData({
        ...data,
        isValidUser: true
      });
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.text}>Créer un compte!</Text>
    <View style={styles.action}>
      <FormInput
        labelValue={email}
        onChangeText={(val)=>textInputChange(val)} 
        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text) }   
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {data.check_textInputChange ?

            <Animatable.View
              anaimation="bounceIn"
              style={styles.eyesPwd}
            > 
                <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                
                />
            </Animatable.View>

            : null}
     </View>
     {data.isValidUser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                 <Text style={styles.errorMsg}>Entrer un email valide</Text>
            </Animatable.View>
       }
      <View style={styles.action}>
      <FormInput
        labelValue={password}
        //onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Mot de passe"
        iconType="lock"
        secureTextEntry={data.secureTextEntry ? true : false} 
        onChangeText={(val)=>handlePasswordChange(val)}     
      />
       <TouchableOpacity
               onPress={updateSecureTextEntry}
               style={styles.eyesPwd}
             >
             {data.secureTextEntry ?
                 <Feather
                     name="eye-off"
                     color="grey"
                     size={20}
                 
                 /> 
                 :
                 <Feather
                 name="eye"
                 color="grey"
                 size={20}
             
                  /> 
             }
             </TouchableOpacity>  
      </View>
      {data.isValidPassword ? null :
          
          <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Le mot de passe doit contenir au moins 8 caractères</Text>
           </Animatable.View>
         }
      <View style={styles.action}>
       <FormInput
        labelValue={confirmPassword}
       // onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirmer le mot de passe"
        iconType="lock"
        secureTextEntry={data.confirm_secureTextEntry ? true : false} 
        onChangeText={(val)=>handleConfrimPasswordChange(val)}  
      />
        <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
              style={styles.eyesPwd}
            >
            {data.secureTextEntry ?
                <Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                
                /> 
                :
                <Feather
                name="eye"
                color="grey"
                size={20}
            
                 /> 
            }
            </TouchableOpacity>
     </View>
      <FormButton
        buttonTitle="S'inscrire"
        onPress={() =>  register(data.email,data.password)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          En vous inscrivant, vous acceptez nos{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#fdeb50'}]}>
            conditions d'utilisation
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> et </Text>
        <Text style={[styles.color_textPrivate, {color: '#fdeb50'}]}>
            Politique de confidentialité
        </Text>
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Vous avez déjà un compte ? Cliquer ici
        </Text>
      </TouchableOpacity>
      <View></View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 134, 71, 1)',
    height: "100%"
  },
  logo: {
    height: 150,
    width: 350,
    resizeMode: 'cover',
  },
  text: {
    
    fontSize: 28,
    marginBottom: 10,
    color: '#ffffff',
  },
  navButton: {
    marginTop: 15,
  },
  action: {
    flexDirection: 'row',
    paddingBottom:5
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    color: '#fff',  
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
  },
  errorMsg:{
    color: '#fdeb50',
    
  },
  eyesPwd:{
      position:'absolute',
      alignSelf:'center',
      marginLeft: 350
  }
});
