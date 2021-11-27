import React,{useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import {View} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RegisterScreen from '../screens/RegisterScreen';




const Stack = createStackNavigator();



const AuthStack = () => {

    const [isFirstLauch, setIsFirstLauch] = React.useState(null)
    let routeName;
  
    const storeData = async () => {
      try {
        await AsyncStorage.getItem('AlreadyLaunched').then(value =>{
          if(value == null){
              AsyncStorage.setItem('AlreadyLaunched', 'true');
            setIsFirstLauch(true)
          }else{
            setIsFirstLauch(false)
          }
        })
      } catch (e) {
        // saving error
      }
    }
  
  
    useEffect(() => {
      storeData()
    }, []);

    if(isFirstLauch === null){
        return null;
          }else if(isFirstLauch === true) {
            routeName = "Onboarding" 
          } 
    else {
            routeName =  "Login";
        }
   
    return (
        
            <Stack.Navigator  initialRouteName={routeName} >
                <Stack.Screen 
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{header: () => null}}
                />
                <Stack.Screen 
                    name="Login"
                    component={LoginScreen}
                    options={{header: () => null}}
                />
                <Stack.Screen 
                    name="Signup"
                    component={SignUpScreen}
                    options={({navigation}) => ({
                      title: '',
                      headerStyle: {
                        backgroundColor: 'rgba(0, 134, 71, 1)',
                        shadowColor: 'rgba(0, 134, 71, 1)',
                        
                        elevation: 0,
                      },
                      headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                          <FontAwesome.Button 
                            name="long-arrow-left"
                            size={25}
                            backgroundColor='rgba(0, 134, 71, 1)'
                            color="#ffffff"
                            onPress={() => navigation.navigate('Login')}
                          />
                        </View>
                      ),
                    })}
                
                />
                 <Stack.Screen 
                    name="Register"
                    component={RegisterScreen}
                    options={{header: () => null}}
                 />
                 
            </Stack.Navigator>
           
          
      )


}

     

export default AuthStack
