import React,{useState, useEffect} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import IconeExpandir from '../assets/expand.svg';
import IconeAnterior from    '../assets/nav_prev.svg';
import IconeProximo from    '../assets/nav_next.svg';
import Api from '../services/Api';

const Modal = styled.Modal``;
const ModalArea = styled.View`
    flex: 1;
    background-color: #000000;
    justify-content: flex-end;
`;
const ModalConteudo = styled.View`
    background-color: #000000;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    min-height:300px;
    padding: 10px 20px 40px 20px;
`;
const BotaoFechar = styled.TouchableOpacity`
    width:40px;
    height:40px;
`;



const ModalItem = styled.View`
    background-color:#FFFFFF;
    border-radius:10px;
    margin-bottom:15px;
    padding:10px;
`;
const UsuarioInfo = styled.View`
   flex-direction:row;
   align-items:center;
`;

const UsuarioAvatar = styled.Image`
    width:56px;
    height:56px;
    border-radius:20px;
    margin-right:15px
`;
const UsuarioNome = styled.Text`
    color:#000000
    font-size: 18px;
    font-weight:bold;
`;


const ServicoInfo = styled.View`
flex-direction:row;
    justify-content:space-between;

`;
const ServicoNome = styled.Text`
    font-size: 16px;
    font-weight:bold;
`;
const ServicoPreco = styled.Text`
    font-size: 16px;
    font-weight:bold;
`;

const BotaoFinalizar = styled.TouchableOpacity`
    background-color :#268596;
    height:60px;
    justify-content:center;
    align-items:center;
    border-radius:10px;

`;
const BotaoFinalizarTexto = styled.Text`
    color:#FFFFFF;
    font-size: 17px;
    font-weight:bold;
`;

const DataInfo = styled.View`
    flex-direction:row;

`;

const DataAnterirorArea = styled.TouchableOpacity`
    flex:1;
    justify-content:flex-end;
    align-items:flex-end;
`;

const DataTituloArea = styled.View`
    width:140px;
    justify-content:center;
    align-items:center;

`;
const DataTitulo = styled.Text`
    font-size:17px;
    font-weight:bold;
    color:#000000;

`;



const DataProximoArea = styled.TouchableOpacity`
    flex:1;
    align-items:flex-start;

`;


const ListaData = styled.ScrollView`

`;

const DataItem = styled.TouchableOpacity`
   width: 45px;
   justify-content: center;
   border-radius: 10px;
   padding-top: 5px;
   padding-bottom: 5px;
   align-items:center;

`;

const DataItemSemana = styled.Text`
    font-size: 16px;
    font-weight: bold;

`;

const DataItemNumero = styled.Text`
    font-size: 16px;
    font-weight: bold;

`;


const ListaHoras = styled.ScrollView`

`;

const HoraItem = styled.TouchableOpacity`
   width: 75px;
   height:40px;
   justify-content: center;
   border-radius: 10px;
   align-items:center;

`;
const HoraItemTexto = styled.Text`
    font-size: 16px;


`;



const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];
const dias = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
]


export default ({ mostrar, setMostrar, usuario, servico ,usuarioAutenticado}) =>{
const navigation = useNavigation();

const [anoSelecionado, setAnoSelecionado] = useState(0);
const [mesSelecionado, setMesSelecionado] = useState(0);
const [diaSelecionado, setDiaSelecionado] = useState(0);
const [horaSelecionado, setHoraSelecionada] = useState(null);
const [listDays, setListDays] = useState([]);
const [listHours, setListHours] = useState([]);


useEffect(()=> {
 
 if(usuario.horarios){ 
  
  let diasDoMes = new Date( anoSelecionado, mesSelecionado+1,0).getDate();
  let novaListaDias = [];

  for(let i = 1; i <= diasDoMes;i++){
    let d = new Date(anoSelecionado,mesSelecionado,i);
    let ano = d.getFullYear();
    let mes = d.getMonth() +1;
    let dia = d.getDate();

    mes = mes < 10 ? '0'+mes : mes;
    dia = dia < 10 ? '0'+dia : dia;
    let dataSelecionada = `${ano}-${mes}-${dia}T00:00:00`;

    let disponivel = usuario.horarios.filter(e=> e.dataAgenda === dataSelecionada);

    novaListaDias.push({
          status: disponivel.length > 0 ? true : false,
          weekday: dias[d.getDay()],
          number: i
      });
  }
  
  setListDays(novaListaDias);
  setDiaSelecionado(0);
  setListHours([]);
  setHoraSelecionada(0)
    }
  },[usuario, mesSelecionado,anoSelecionado]);
  
  useEffect(()=>{
    if(usuario.horarios  && diaSelecionado> 0){
        let d = new Date(anoSelecionado,mesSelecionado,diaSelecionado)
        let ano = d.getFullYear();
        let mes = d.getMonth() +1;
        let dia = d.getDate();
    
        mes = mes < 10 ? '0'+mes : mes;
        dia = dia < 10 ? '0'+dia : dia;
        let dataSelecionada = `${ano}-${mes}-${dia}T00:00:00`;

        let disponivel = usuario.horarios.filter(e=> e.dataAgenda === dataSelecionada);
        
        if(disponivel.length >0){
           setListHours(disponivel[0].horarios)
       }
    }
    setHoraSelecionada(null);
},[usuario, diaSelecionado]);

useEffect(()=>{
  let hoje = new Date();
  
    setAnoSelecionado(hoje.getFullYear());
    setMesSelecionado(hoje.getMonth());
    setDiaSelecionado(hoje.getDate());
},[]);


const handleCloseButton =() =>{
    setHoraSelecionada(null);
    setDiaSelecionado(0);
    setMostrar(false);
}

const handleFinishClick =  async() =>{

        let d = new Date(anoSelecionado,mesSelecionado,diaSelecionado)
        let ano = d.getFullYear();
        let mes = d.getMonth() +1;
        let dia = d.getDate();
    
        mes = mes < 10 ? '0'+mes : mes;
        dia = dia < 10 ? '0'+dia : dia;
        let dataSelecionada = `${ano}-${mes}-${dia}`;
        let horario = `${horaSelecionado}`;

        const userid = await AsyncStorage.getItem('usuarioId');

        const response = await Api.post('agendamento/agendar', {
            IdBarbeiro: usuario.idBarbeiro,
            IdServico: usuario.servicos[servico].idServico,
            IdCliente: userid ,
            DataAgenda: dataSelecionada,
            Horario: horario
        });

            setMostrar(false);
            navigation.navigate('Agendamentos')
    
        }

const handleLeftDateClick = () =>{
    let mountdate = new Date(anoSelecionado,mesSelecionado,1);
    mountdate.setMonth(mountdate.getMonth()-1);
    setAnoSelecionado(mountdate.getFullYear());
    setMesSelecionado(mountdate.getMonth());
    setDiaSelecionado(0);

}
const handleRightDateClick = () =>{
    let mountdate = new Date(anoSelecionado,mesSelecionado,1);
    mountdate.setMonth(mountdate.getMonth()+1);
    setAnoSelecionado(mountdate.getFullYear());
    setMesSelecionado(mountdate.getMonth());
    setDiaSelecionado(0);
}
    return (
        <Modal
            transparente={true}
            visible={mostrar}
            animationType="slide"
        >
            <ModalArea>
                <ModalConteudo>
                    <BotaoFechar onPress={handleCloseButton}>
                        <IconeExpandir width="40" height="40" fill="#000000" />  
                    </BotaoFechar>

                    <ModalItem>
                        <UsuarioInfo>
                            <UsuarioAvatar  source={{uri:usuario.avatar}}/> 
                             <UsuarioNome>{usuario.nome}</UsuarioNome>
                        </UsuarioInfo>
                    </ModalItem>

                    {servico != null &&
                    <ModalItem>
                        <ServicoInfo>
                            <ServicoNome>{usuario.servicos[servico].descricao}</ServicoNome>
                            <ServicoPreco>R$ {usuario.servicos[servico].preco.toFixed(2)}</ServicoPreco> 


                            
                        </ServicoInfo>
                    </ModalItem>
                    }                       
                
                <ModalItem>
                    <DataInfo>
                        <DataAnterirorArea onPress={handleLeftDateClick}>
                            <IconeAnterior width="35" height="35" fill="#000000"/>
                        </DataAnterirorArea>
                        <DataTitulo>
                            <DataTitulo>{meses[mesSelecionado]} {anoSelecionado}</DataTitulo>
                        </DataTitulo>
                        <DataProximoArea onPress={handleRightDateClick}>
                            <IconeProximo  width="35" height="35" fill="#000000"/>
                        </DataProximoArea>
                    </DataInfo>

                    <ListaData horizontal={true} mostrarsHorizontalScrollIndicator ={false}>
                        {listDays.map((item,key) =>(
                            <DataItem 
                            key={key}
                            onPress={()=> item.status ? setDiaSelecionado(item.number): null} 
                            style={{
                                opacity: item.status ? 1 : 0.5,
                                backgroundColor : item.number === diaSelecionado ? '#4EADBE' :'#FFFFFF',
                            }}
                            >
                                <DataItemSemana
                                style={{
                                    opacity: item.status ? 1 : 0.5,
                                    color : item.number === diaSelecionado ?  '#FFFFFF' :'#000000',
                                }}
                                >{item.weekday}</DataItemSemana>
                                <DataItemNumero
                                 style={{
                                    opacity: item.status ? 1 : 0.5,
                                    color : item.number === diaSelecionado ?  '#FFFFFF' :'#000000',
                                }}
                                >{item.number}</DataItemNumero>
                            </DataItem>

                        ))}
                    </ListaData>
                </ModalItem>
                {diaSelecionado > 0 && listHours.length>0 &&
                
                <ModalItem >
                    <ListaHoras horizontal={true} mostrarsHorizontalScrollIndicator ={false}>
                      
                       {listHours.map((item, key) =>(
                            <HoraItem
                            key={key}
                            onPress={()=> setHoraSelecionada(item.hora)} 
                            style={{
                                backgroundColor : item.hora === horaSelecionado ?  '#4EADBE' :'#FFFFFF',
                            }}
                           >
                            <HoraItemTexto
                             style={{
                                fontWeight: item.hora === horaSelecionado ? 'bold' : 'normal',
                                color : item.hora === horaSelecionado ?  '#FFFFFF' :'#000000',
                            }}
                            >{item.hora}</HoraItemTexto>
                            </HoraItem>
                        ))}
                       
                       
                    </ListaHoras>
                </ModalItem>
                }     

                <BotaoFinalizar onPress={handleFinishClick}>
                    <BotaoFinalizarTexto>
                        Finalizar Agendamento
                    </BotaoFinalizarTexto>

                </BotaoFinalizar>
                </ModalConteudo>
            </ModalArea>
        </Modal>
        
    );
};
