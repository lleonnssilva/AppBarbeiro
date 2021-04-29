import React from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation , useRoute} from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import Api from '../../services/Api';


import { 
    Container,
    UsuarioAvatar,
    UsuarioInfoNome,
    BotaoSair,
    BotaoSairText
    

} from './styles';






export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [usuarioInfo , setUsuarioInfo] = useState({});
    const [loading , setLoading] = useState(false);


    useEffect(()=>{

    const pegarInfoPerfil = async () =>{
        setLoading(true);

        let userid = await AsyncStorage.getItem('usuarioId');
        let response = await Api.get(`account/${userid}`);
        setUsuarioInfo(response.data);
        
       setLoading(false);
    }
    pegarInfoPerfil();
    },[]);
    

    const handleLogoutClick = async () => {
        
         await AsyncStorage.removeItem('token');
         await AsyncStorage.removeItem('avatar');
         await AsyncStorage.removeItem('usuarioId');

         navigation.reset({
             routes:[{name:'Login'}]
         });
 
    }

    return (
        <Container>
                <UsuarioAvatar source={{uri:usuarioInfo.avatar}}/>
                 <UsuarioInfoNome>{usuarioInfo.nome}</UsuarioInfoNome>
                 <UsuarioInfoNome>{usuarioInfo.email}</UsuarioInfoNome>
                 <UsuarioInfoNome>{usuarioInfo.perfil}</UsuarioInfoNome>
                 <BotaoSair onPress={handleLogoutClick}>
                    <BotaoSairText>Sair</BotaoSairText>
                 </BotaoSair>
        </Container>
    );
}