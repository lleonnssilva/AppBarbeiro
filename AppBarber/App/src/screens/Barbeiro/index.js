import React from 'react';
import { Text } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import Api from '../../services/Api';
import Swiper from "react-native-swiper";
import Estrelas from '../../components/Estrelas';
import AgendamentoModal from '../../components/AgendamentoModal';
import FavoritIcon from '../../assets/favorite.svg';
import FavoritFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';


import { 
    Container,
    Scroller,
    PaginaConteudo,

    
   

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    UsuarioInfoArea,
    UsuarioAvatar,
    BotaoFavorito,
    UsuarioInfo,
    UsuarioInfoNome,

    BackButton,
    LoadingIcon,

    ServicoArea,
    ServicoItem,
    ServicoInfo,
    ServicoNome,
    ServicoPreco,
    BotaoAgendarServico,
    AgendarServicoTexto,
    ServicoTitulo,

    DepoimentoArea,
    DepoimentolItem,
    DepoimentolInfo,
    DepoimentolNome,
    DepoimentolConteudo

    

} from './styles';






export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [usuarioInfo , setUsuarioInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        nome: route.params.nome,
        estrelas: route.params.estrelas,
    });

    const [loading , setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    
    useEffect(()=>{

    const pegarInfoBarbeiro = async () =>{
        setLoading(true);
         const response = await Api.get(`barbeiro/${route.params.id}`);
         setUsuarioInfo(response.data);
         setFavorited(response.data.favorito);
         setLoading(false);
    }
    pegarInfoBarbeiro();
    },[]);


    
    const handelBackButtom =  () =>{
        navigation.goBack();
    }
    const handleFavClick = async () =>{

        let userid = await AsyncStorage.getItem('usuarioId');
        const response = await Api.post('barbeiro/favorito', {
            IdBarbeiro : usuarioInfo.idBarbeiro,
	        IdCliente : 1,
	        Efavorito : !favorited
            });
        console.log('data',response.data.favorito);

        setFavorited(response.data.favorito);

    }
    const handleServiceChoose = (key) =>{
        setSelectedService(key);
        setMostrarModal(true);
    }

    return (
        <Container>
           <Scroller>
                {usuarioInfo.fotos && usuarioInfo.fotos.length > 0?
                <Swiper 
                    style={{height:240}}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive/>}
                    paginationSyle={{top:15, right:15,bottom:null, left:null}}
                    autoplay={true}
                    >
                        {usuarioInfo.fotos.map((item,key)=>(
                            <SwipeItem key={key} >
                                <SwipeImage source={{uri:item.url}} resizeMode="cover"/>
                            </SwipeItem>
                            ))}
                </Swiper>   
                :
                <FakeSwiper></FakeSwiper> 
                }
                 <PaginaConteudo>

                   <UsuarioInfoArea>
                    <UsuarioAvatar source={{uri:usuarioInfo.avatar}}/>
                        <UsuarioInfo>
                            <UsuarioInfoNome>{usuarioInfo.nome}</UsuarioInfoNome>
                            <Estrelas estrelas={usuarioInfo.estrelas} mostrarNumero={true}/>
                        </UsuarioInfo>         
                    <BotaoFavorito onPress={handleFavClick}>
                           {favorited ?
                            <FavoritFullIcon width="24" height="24" fill="#FF0000"/>
                            : 
                            <FavoritIcon width="24" height="24" fill="#FF0000"/>
                           }
                   
                    </BotaoFavorito>
                  </UsuarioInfoArea>

                {loading && 

                <LoadingIcon size="large" color="#000000"/>
                
                }
                {usuarioInfo.servicos &&
                                <ServicoArea >
                                    <ServicoTitulo>Lista de serviços</ServicoTitulo>

                                    {usuarioInfo.servicos.map((item, key) =>(
                                        <ServicoItem key={key}>
                                            <ServicoInfo>

                                            
                                            <ServicoNome>{item.descricao}</ServicoNome>
                                            <ServicoPreco>R$ {item.preco.toFixed(2)}</ServicoPreco>
                                            </ServicoInfo>

                                            <BotaoAgendarServico onPress={()=> handleServiceChoose(key)}>
                                                <AgendarServicoTexto>Agendar</AgendarServicoTexto>
                                            </BotaoAgendarServico>
                                        </ServicoItem>
                                    
                                    ))}
                                </ServicoArea>
                }
                 {usuarioInfo.depoimentos && usuarioInfo.depoimentos.length>0 &&
               
               <DepoimentoArea>
                       <Swiper
                        style={{height: 110}}
                        showsPagination={false}
                        showsButtons={true}
                        prevButton={<NavPrevIcon width="35" height="35" fill="#000000"/>}
                        nextButton={<NavNextIcon width="35" height="35" fill="#000000"/>}
                      >
                         {usuarioInfo.depoimentos.map((item, key)=>(
                            
                            <DepoimentolItem key={key}>
                                  <Estrelas estrelas={item.nota} mostrarNumero={false}/>
                                 <DepoimentolInfo>
                               
                                    <DepoimentolNome>{item.nome}</DepoimentolNome> 
                                 </DepoimentolInfo>
                             
                                 <DepoimentolConteudo>
                                 {item.conteudo}
                                 </DepoimentolConteudo>
                            </DepoimentolItem>
                        ))} 
                      </Swiper> 
                  </DepoimentoArea>
                }  
                </PaginaConteudo>  

           </Scroller>
           <BackButton onPress={handelBackButtom}>
               <BackIcon width="44" height="44" fill="#FFFFFF"/>
           </BackButton>

           <AgendamentoModal 
                mostrar={mostrarModal}
                setMostrar={setMostrarModal}
                usuario={usuarioInfo}
                servico={selectedService}
           />
        </Container>
    );
}