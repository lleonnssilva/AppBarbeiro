import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;
export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const HeaderTitle = styled.Text`
    width: 250px;
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
`;
export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`;

export const LocationArea = styled.View`
height: 60px;
background-color: #000000;
border-top-width: 1px ;
border-bottom-width: 1px ;
border-top-color:#1C1C1C;
border-bottom-color:#1C1C1C;
`;
export const LocationInput = styled.TextInput`
    font-size: 13px;
     color:#FFFFFF;
`;

export const Pagina = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #F5FCFF;
  }`;

  export const ContainerMapa = styled.View`
    width:100%;
    height: 100%;
    backgroundColor: tomato;
  }`;

  export const Mapa = styled.View`
    flex: 1;
  `;
  
  export const Avatar = styled.Image`
width: 60px;
height: 60px;
border-radius: 30px;

`;