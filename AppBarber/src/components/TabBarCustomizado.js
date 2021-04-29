import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';
import IconeHome from '../assets/home.svg';
import IconeBusca from '../assets/search.svg';
import IconeAgendamentos from '../assets/today.svg';
import IconeFavoritos from '../assets/favorite.svg';
import IconePerfil from '../assets/account.svg';


const TabArea = styled.View`
    height: 60px;
    flex-direction: row;
    background-color: #000000;
    border-top-width: 1px ;
    border-bottom-width: 1px ;
    border-top-color:#1C1C1C;
    border-bottom-color:#1C1C1C;
    
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCentro = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    border-radius: 35px;
    border: 2px solid #1C1C1C;
    margin-top: 3px;
    opacity:0.9;
`;
const IconeAvatar = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {
    const { state:user } = useContext(UserContext);


    const goTo = (screenName) => {

        navigation.navigate(screenName);
    }

    return (
        <TabArea>
           
            <TabItem onPress={()=>goTo('Home')}>
                <IconeHome style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />

           </TabItem>
            <TabItem onPress={()=>goTo('Busca')}>
                <IconeBusca style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItemCentro onPress={()=>goTo('Agendamentos')}>
                <IconeAgendamentos width="32" height="32" fill="#FFFFFF" />
            </TabItemCentro>
            <TabItem onPress={()=>goTo('Favoritos')}>
                <IconeFavoritos style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Perfil')}>
                {user.avatar != '' ?
                    <IconeAvatar source={{uri: user.avatar}} />
                    :
                    <IconePerfil style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                }
            </TabItem>
        </TabArea>
    );
}