import React from 'react';
import styled from 'styled-components/native';

import EstrelaCompleta from '../assets/star.svg';
import EstrelaMetade from '../assets/star_half.svg';
import EstrelaVazia from '../assets/star_empty.svg';

const EstrelaArea = styled.View`
    flex-direction: row;
`;
const EstrelaView = styled.View``;

const EstrelaTexto = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;

export default ({ estrelas, mostrarNumero }) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(estrelas);
    let left = estrelas - estrelas;

    for(var i=0;i<floor;i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }

    return (
        <EstrelaArea>
            {s.map((i, k)=>(
                <EstrelaView key={k}>
                    {i === 0 && <EstrelaVazia width="18" height="18" fill="#FF9200" />}
                    {i === 1 && <EstrelaMetade width="18" height="18" fill="#FF9200" />}
                    {i === 2 && <EstrelaCompleta width="18" height="18" fill="#FF9200" />}
                </EstrelaView>
            ))}
            {mostrarNumero && <EstrelaTexto>{estrelas}</EstrelaTexto>}
        </EstrelaArea>
    );
}