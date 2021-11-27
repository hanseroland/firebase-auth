import React from 'react'
import {View,Text,Button,StyleSheet,Image,TouchableOpacity} from "react-native"
import Onboarding from 'react-native-onboarding-swiper';
import MyApp from '../assets/images/undraw_my_app_re_gxtj (1).svg'
import Authsvg from '../assets/images/undraw_Access_account_re_8spm.svg'
import Jobsvg from '../assets/images/undraw_job_offers_kw5d (1).svg'
//rgba(251, 240, 0, 0.6)


const Dots = ({selected}) => {
        let backgroundColor;

        backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';

        return (
            <View 
                style={{
                    width:5,
                    height:5,
                    marginHorizontal:3,
                    backgroundColor
                }}
            />
        )
}

const Skip = ({...props}) => (
    <Button title="Ignorer" color="#000" 
        {...props}
    />
)

const Next = ({...props}) => (
    <Button title="Suivant" color="#000"
    {...props}
    
    />
)


const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal:8}}  {...props} >
        <Text  style={{fontSize:16,color:"#fff"}} >Terminer</Text>
    </TouchableOpacity>
    
)

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={()=> navigation.replace("Login")}
        onDone={()=> navigation.navigate("Login")}
            pages={[
                {
                backgroundColor: 'rgba(0, 134, 71, 0.9)',
                image: <MyApp width={300} height={300} />,
                title: 'Bienvenu sur MyAPP !',
                subtitle: "Votre application de recherche d'emploi",
                },
                { 
                    backgroundColor: '#fdeb50',
                    image: <Authsvg  width={300} height={200} />,
                    title: 'Créer un compte',
                    subtitle: "C'est facile et rapide",
                },
                {
                    backgroundColor: '#214bd1', 
                    image: <Jobsvg width={300} height={200}   />,
                    title: "Recherche d'emploi",
                    subtitle: "Postuler à des offres d'emploi",
                },
            ]}
        />
    );
} 

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoOnboard:{
        width: 350,
        height: 100
    }
  });