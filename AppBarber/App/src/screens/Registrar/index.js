
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import InputLogin from '../../components/SignInput';
import Api from '../../services/Api';
import { UserContext } from '../../contexts/UserContext';
import LogoBarbeiro from '../../assets/barber.svg';
import IconePessoa from '../../assets/person.svg';
import IconeEmail from '../../assets/email.svg';
import IconeSenha from '../../assets/lock.svg';

export default () => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);

    const [campoNome, setCampoNome] = useState('');
    const [campoEmail, setCampoEmail] = useState('');
    const [campoSenha, setCampoSenha] = useState('');

    const handleSignClick = async () => {
        if(campoNome != '' && campoEmail != '' && campoSenha != '') {
          
            const response = await Api.post('account/registrar', {
                Nome: campoNome, 
                Email: campoEmail, 
                Senha: campoSenha,
                Perfil:"cliente"
            });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('avatar', response.data.usuario.avatar);
            await AsyncStorage.setItem('usuarioId', `${response.data.usuario.id}`);

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: response.data.usuario.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
          
        } else {
            alert("Preencha os campos");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'Login'}]
        });
    }

    return (
        <Container>
            <LogoBarbeiro width="100%" height="160" />

            <InputArea>
                <InputLogin
                    IconSvg={IconePessoa}
                    placeholder="Digite seu nome"
                    value={campoNome}
                    onChangeText={t=>setCampoNome(t)}
                />

                <InputLogin
                    IconSvg={IconeEmail}
                    placeholder="Digite seu e-mail"
                    value={campoEmail}
                    onChangeText={t=>setCampoEmail(t)}
                />

                <InputLogin
                    IconSvg={IconeSenha}
                    placeholder="Digite sua senha"
                    value={campoSenha}
                    onChangeText={t=>setCampoSenha(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}