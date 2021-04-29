import React from "react";
import { View , Button,Text,Modal, Image} from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Logo from '../../images/marker.png';
import {Container,LocationArea,Pagina,ContainerMapa,Mapa,LocationInput,Avatar} from './styles';
import SignInput from '../../components/SignInput';
import IconeBusca from '../../assets/search.svg';
// const nav = navigator.geolocation.getCurrentPosition(
//   {coords:{latitude,longitude}}
// );
  
export default function Busca() {


const coordinates = [
  {
  id:1,
  nome:"leonardo1",coordernada:
  [-46.50123, -23.42920]
  },
  {
    id:2,
  nome:"leonardo2",coordernada:
  [-46.50273, -23.42940]
  },
  {
    id:3,
  nome:"leonardo3",coordernada:
  [-46.50203, -23.42780]
  },
  {
    id:4,
  nome:"leonardo4",coordernada:
  [-46.50243, -23.42950]
  },
  {
    id:5,
  nome:"leonardo5",coordernada:
  [-46.50263, -23.42970]
  },
  {
    id:6,
  nome:"leonardo6",coordernada:
  [-46.50223, -23.42900]
  },
  {
    id:7,
  nome:"leonardo7",coordernada:
  [-46.50229, -23.42930]
  },
  {
    id:8,
  nome:"leonardo8",coordernada:
  [-46.50224, -23.42910]
  },
  {
    id:9,
  nome:"leonardo9",coordernada:
  [-46.50270, -23.42921]
  },
  {
    id:10,
  nome:"leonardo10",coordernada:
  [-46.50240, -23.42950]},
  {
    id:11,
  nome:"leonardo11",coordernada:
  [-46.50220, -23.42940]
}
]

    MapboxGL.setAccessToken("pk.eyJ1IjoibGVvYW5yZG8iLCJhIjoiY2pwanB6YmpxMDljbzNxdGVvYWF5bGxzaiJ9.XGaPu4o4UgFxwYgR3EUcNA");
    
    
    return (
    
      <Container>
        {/* <LocationArea> */}
         {/* <IconeBusca style={{opacity:  0.5}} width="24" height="24" fill="#FFFFFF" />  */}
         {/* <Avatar source={{uri:'https://api.b7web.com.br/devbarber/media/avatars/1.png'}}/> */}
          {/* </LocationArea>  */}
        <MapboxGL.MapView style={{ flex:1}}styleURL={MapboxGL.StyleURL.Dark}>
            <MapboxGL.Camera
              zoomLevel={17}
              centerCoordinate={[-46.50223, -23.42980]}
            />
            {coordinates.map((item, key)=>(
                         <MapboxGL.PointAnnotation
                            key={key}
                            id={item.nome}
                            coordinate={item.coordernada}>
                            <View
                             style={{
                                      height: 30, 
                                      width: 30, 
                                      backgroundColor: '#FFFFFF', 
                                      borderRadius: 50, 
                                      borderColor: '#1C1C1C', 
                                     borderWidth: 10
                                    }}
                                    >
                                        
                                        {/* <Avatar source={{uri:'https://api.b7web.com.br/devbarber/media/avatars/1.png'}}/> */}
                                    </View>
                           </MapboxGL.PointAnnotation>
                          )
                          )
          } 
        </MapboxGL.MapView>
      </Container>
    );
  }
