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
import { Formik } from 'formik';
import * as yup from 'yup'
import * as Animatable from 'react-native-animatable';
import app from '../firebase/base'





const RegisterScreen = ({navigation}) => {


  const db = app.firestore();

  const {user} = useContext(AuthContext)

  var role ="candidat"
  const d = new Date();
  const mois = d.getMonth();
  const annee = d.getUTCFullYear();
  const tabMois = [
        "janvier","fevrier", 
        "mars","avril","mai",
        "juin","juillet","aout",
        "septembre","octobre",
        "novembre","decembre"
      ]

      const handleRegister = async (obj) => {
       
       /*await db.collection('utilisateurs').add({
            id_utilisateur: user.uid,
            email_utilisateur: obj.email_candidat,
            role_utilisateur: role,
            date_ajout: new Date()

        })
        .then(() => {
           
            console.log("Les informations ont été ajouté avec succès")
            
        })
        .catch((error) => {
            console.log(error.message)
        })
         //id_utilisateur: user.uid,
        /************************************************ */
        
        await  db.collection('testregister').doc().set({
           
            nom_candidat: obj.nom_candidat, 
            prenom_candidat: obj.prenom_candidat,
            email_candidat: obj.email_candidat,
            province_candidat: obj.province_candidat,
            ville_candidat: obj.ville_candidat,
            situation_candidat: obj.situation_candidat,
            telephone_candidat: obj.telephone_candidat,
            mois:tabMois[mois],
            annees:annee,
            date_inscription: d

          }).then(() => { 
            
              alert("Réussi!")
              navigation.navigate('Home');
          })
          .catch((error) => {
              alert(error.message)
          });
    }

  const formValidationSchema = yup.object().shape({
        email_candidat: yup.string().email("Entrer une adresse email valide").required('Votre adresse email est requise'),
        nom_candidat: yup.string().max(35).required('Votre nom est requis'),
        prenom_candidat: yup.string().max(35).required('Votre prénom est requis'),
        ville_candidat:yup.string().max(20).required('Votre ville est requise'),
        province_candidat:yup.string().max(15).required('Votre province est requise'),
        situation_candidat:yup.string().max(50).required('Votre situation professionnelle est requise'),
        telephone_candidat:yup.string().max(10).required('Votre numéro de téléphone est requis'),
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.text}>Ajouter vos informations</Text>
       <Formik
          initialValues={{ 
            email_candidat: '',
            nom_candidat: '',
            prenom_candidat: '',
            ville_candidat:'',
            province_candidat:'',
            situation_candidat:'',
            telephone_candidat:'',
           }}
           validationSchema={formValidationSchema}
           onSubmit={values => handleRegister(values)}
        >
      {({ handleChange, handleBlur, handleSubmit, values, errors,touched,isValid }) => (
        <>
      <FormInput
        labelValue={values.nom_candidat}
        onChangeText={handleChange('nom_candidat')}
        onBlur={handleBlur('nom_candidat')}
        placeholderText="Nom"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
     {(errors.nom_candidat && touched.nom_candidat) &&
      <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.nom_candidat}</Text>
      </Animatable.View>
      }
      <FormInput
        labelValue={values.prenom_candidat}
        onChangeText={handleChange('prenom_candidat')}
        onBlur={handleBlur('prenom_candidat')}
        placeholderText="Prénom"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
       {(errors.prenom_candidat && touched.prenom_candidat) &&
       <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.prenom_candidat}</Text>
       </Animatable.View>
        }
       <FormInput
        labelValue={values.email_candidat}
        onChangeText={handleChange('email_candidat')}
        onBlur={handleBlur('email_candidat')}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(errors.email_candidat && touched.email_candidat) &&
       <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.email_candidat}</Text>
      </Animatable.View>
      }

       <FormInput
        labelValue={values.ville_candidat}
        onChangeText={handleChange('ville_candidat')}
        onBlur={handleBlur('ville_candidat')}
        placeholderText="Ville"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(errors.ville_candidat && touched.ville_candidat) &&
       <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.ville_candidat}</Text>
      </Animatable.View>
      }

       <FormInput
        labelValue={values.province_candidat}
        onChangeText={handleChange('province_candidat')}
        onBlur={handleBlur('province_candidat')}
        placeholderText="Province"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(errors.province_candidat && touched.province_candidat) &&
       <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.province_candidat}</Text>
      </Animatable.View>
      }
       <FormInput
        labelValue={values.situation_candidat}
        onChangeText={handleChange('situation_candidat')}
        onBlur={handleBlur('situation_candidat')}
        placeholderText="Situation professionnelle"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(errors.situation_candidat && touched.situation_candidat) &&
       <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.situation_candidat}</Text>
      </Animatable.View>
      }

       <FormInput
        labelValue={values.telephone_candidat}
        onChangeText={handleChange('telephone_candidat')}
        onBlur={handleBlur('telephone_candidat')}
        placeholderText="Téléphone"
        iconType="phone"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(errors.telephone_candidat && touched.telephone_candidat) &&
       <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errors.telephone_candidat}</Text>
       </Animatable.View>
      }
      
            <FormButton
              buttonTitle="Enrégistrer"
              onPress={handleSubmit}
              disabled={!isValid}
            />
            </>
        )}
     </Formik>     
     
    </ScrollView>
  );
};

export default RegisterScreen;

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
});
