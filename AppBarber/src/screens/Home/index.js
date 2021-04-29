import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
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
    ListArea,
} from './styles';


export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if(result == 'granted') {
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();
            });

        }
    }

    const listarBarbeiros = async () => {

        var response = await Api.get('barbeiro/listar');
        setList(response.data);
        setLoading(false);
      
    }

    useEffect(()=>{
        listarBarbeiros();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        listarBarbeiros();
    }

    const handleLocationSearch = () => {
        setCoords({});
        listarBarbeiros();
    }

    return (
        <Container>
 
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                {/* <HeaderArea>
                    {/* <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle> 
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <IconeBusca width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea> */}

                <LocationArea>
                    
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <IconeLocalizacao width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

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