import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import AgendamentoItem from '../../components/AgendamentoItem';
import AsyncStorage from '@react-native-community/async-storage';
import IconeBusca from '../../assets/search.svg';
import IconeLocalizacao from '../../assets/my_location.svg';
import Api from '../../services/Api';


import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    IconeCarregamento,
    ListArea
} from './styles';


export default () => {
    const navigation = useNavigation();

    
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    

    const listarAgendamentos = async () => {
        setLoading(true);
        setList([]);

        let userid = await AsyncStorage.getItem('usuarioId');
        let response = await Api.get(`agendamento/cliente/listar/${userid}`);
        setList(response.data);
        setLoading(false);
    }

    useEffect(()=>{
        listarAgendamentos();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        listarAgendamentos();
    }



    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
              

                {loading &&
                    <IconeCarregamento size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <AgendamentoItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}