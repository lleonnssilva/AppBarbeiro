import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';

import Estrelas from './Estrelas';

const Area = styled.TouchableOpacity`
background-color: #1C1C1C;
margin-bottom: 5px;
border-radius: 20px;
padding: 5px;
flex-direction: row;
border-color:#FFFFFF;
`;

const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 40px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
   
`;

const NomeUsuario = styled.Text`
    font-size: 13px;
    color:#FFFFFF;
`;



const BotaoPerfilText = styled.Text`
    font-size: 13px;
    color: #FFFFFF;
`;


export default ({data}) => {
    const navigation = useNavigation();

 

    return (
        <Area onPress={()=>{}}>
            <Avatar source={{uri: data.barbeiro.avatar}} />
            <InfoArea>
                <NomeUsuario>{data.barbeiro.nome}</NomeUsuario>
                <Estrelas estrelas={data.barbeiro.estrelas} mostrarNumero={true} />

                    <NomeUsuario>R$ {data.servico.preco}</NomeUsuario>
                    <NomeUsuario>{data.servico.descricao}</NomeUsuario>

                   <BotaoPerfilText>{data.dataAgenda}</BotaoPerfilText>
                   <BotaoPerfilText>{data.horario}</BotaoPerfilText>

             
            </InfoArea>
        </Area>
    );
}