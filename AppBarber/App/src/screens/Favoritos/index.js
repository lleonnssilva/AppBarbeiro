import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import BarbeiroItem from '../../components/BarbeiroItem';
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

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    
    const listarFavoritos = async () => {
        setLoading(true);
        setList([]);

        let userid = await AsyncStorage.getItem('usuarioId');
        let response = await Api.get(`barbeiro/cliente/favoritos/${userid}`);

        setList(response.data);
        setLoading(false);
    }

    useEffect(()=>{
        listarFavoritos();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        listarFavoritos();
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
                        <BarbeiroItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}