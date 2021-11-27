import React,{useContext} from 'react'
import { View, Text } from 'react-native'
import FormButton from '../components/FormButton'
import {AuthContext} from '../navigation/AuthProvider'

const HomeScreen = ({navigation}) => {

    const {logout} = useContext(AuthContext)

    return (
        <View>
            <Text>Home Screen</Text>
            <FormButton  buttonTitle="Se déconnecter" onPress={() => logout() } />
        </View>
    )
}

export default HomeScreen
