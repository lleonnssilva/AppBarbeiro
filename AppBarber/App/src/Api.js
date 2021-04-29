import AsyncStorage from '@react-native-community/async-storage';
import { add } from 'react-native-reanimated';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
    
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    login: async (email, password) => {
        const req = await fetch('http://192.168.0.64/Api/v1/account/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email:email, Senha:password,Perfil:"cliente"})
        });
        const json = await req.json();        
        return json;
    },
    registrar: async (nome, email, senha) => {
        const req = await fetch('http://192.168.0.64/Api/v1/account/registrar', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Nome:nome, Email:email, SEnha:senha,Perfil:"cliente"})
        });
        const json = await req.json();        
        return json;
    },
    listarBarbeiros: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch('http://192.168.0.64/Api/v1/barbeiro/listar', 
        { 
            method: 'GET', 
            headers: new Headers({
              'Authorization': 'Bearer '+ token, 
              'Content-Type': 'application/json'
            })
          }).then(response => {

            if(!response.ok){
                return   "Erro";//response.status""
            }  
               // throw Error(response.status);
            // }else{
            //     return req;
            // }
            //console.log("response",response.status);
           
          })//.catch(e => e);

       // const json = await req.json();
       //console.log("Requisicao",req);


        return req;
       console.log('req',req);
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    pegarInfoBarbeiro: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`http://192.168.0.64/Api/v1/barbeiro/${id}`, { 
            method: 'get', 
            headers: new Headers({
              'Authorization': 'Bearer '+ token, 
              'Content-Type': 'application/json'
            })
          });

        const json = await req.json();
        return json;
    },
    setFavotite: async (barberId) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorited`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({barberId,token})
        });
        const json = await req.json();        
        return json;
    },
    agendarServico: async (   
        idBarbeiro,
        idServico,
        dataAgenda,
        horario,
        idUsuario
        )=> {
        const token = await AsyncStorage.getItem('token');

       console.log("log agendar", 
       idBarbeiro,
        idServico,
        dataAgenda,
        horario,
        idUsuario);
        const req = await fetch(`http://192.168.0.64/Api/v1/agendamento/agendar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IdBarbeiro:idBarbeiro,
                IdServico:idServico,
                IdCliente:idUsuario ,
                DataAgenda:dataAgenda,
                Horario:horario
            })
        });
        const json = await req.json();        
        return json;
    },
    pegarAgendamentos: async () => {
        const token = await AsyncStorage.getItem('token');
        const userid = await AsyncStorage.getItem('usuarioId');
        const req = await fetch(`http://192.168.0.64/Api/v1/agendamento/cliente/listar/${userid}`, { 
            method: 'GET', 
            headers: new Headers({
              'Authorization': 'Bearer '+ token, 
              'Content-Type': 'application/json'
            })
          });

        const json = await req.json();
       
        return json;
    },
    pegarFavoritos: async () => {
        const token = await AsyncStorage.getItem('token');
        const userid = await AsyncStorage.getItem('usuarioId');

        const req = await fetch(`http://192.168.0.64/Api/v1/barbeiro/cliente/favoritos/${userid}`, { 
            method: 'GET', 
            headers: new Headers({
              'Authorization': 'Bearer '+ token, 
              'Content-Type': 'application/json'
            })
          });

        const json = await req.json();
       
        return json;
    },
    pegarInfoPerfil: async () => {
        const token = await AsyncStorage.getItem('token');
        const userid = await AsyncStorage.getItem('usuarioId');
        const req = await fetch(`http://192.168.0.64/Api/v1/account/${userid}`, { 
            method: 'get', 
            headers: new Headers({
              'Authorization': 'Bearer '+ token, 
              'Content-Type': 'application/json'
            })
          });

        const json = await req.json();
        return json;
    },
};