import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import {db, storage} from './../../firebase/firebaseConfig';
import {listAll, ref} from 'firebase/storage';

const contexto = React.createContext();

const Proveedor = ({children}) => {
    const [productos, cambiarProductos] = useState([]);
    const [categorias, cambiarCategorias] = useState([]);
    const [apertura, cambiarApertura] = useState([]);
    const [horario, cambiarHorario] = useState([]);
    const [usuarios, cambiarUsuarios] = useState([]);
    const [productoimageList, setProductoimageList] = useState([]);
    const [categoriaimageList, setCategoriaimageList] = useState([]);

    useEffect(() => {
        onSnapshot(
            collection(db, 'Productos'),
            (snapshot) => {
                const imageListRef = ref(storage, "productos/")
                listAll(imageListRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        const url = "https://firebasestorage.googleapis.com/v0/b/marcelita-app-c0c01.appspot.com/o/productos%2F"+itemRef.name+"?alt=media&token=51dc4dbf-05e9-4041-9b72-5f430c10db53"
                        const name = itemRef.name
                        
                        setProductoimageList(prev => ({
                            ...prev,
                            [name]:url
                        }))
                    });
                })
                .then(() => {
                    const arrayProductos = snapshot.docs.map((producto) => {
                        return {
                            ...producto.data(),
                            id:producto.id
                        }
                    })
                    cambiarProductos(arrayProductos)
                })
            }
        )
        onSnapshot(
            collection(db, 'Categorias'),
            (snapshot) => {
                const imageListRef = ref(storage, "imagenes/")
                listAll(imageListRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        const url = "https://firebasestorage.googleapis.com/v0/b/marcelita-app-c0c01.appspot.com/o/imagenes%2F"+itemRef.name+"?alt=media&token=51dc4dbf-05e9-4041-9b72-5f430c10db53"
                        const name = itemRef.name
                        
                        setCategoriaimageList(prev => ({
                            ...prev,
                            [name]:url
                        }))
                    });
                })
                .then(() => {
                    const arrayCategorias = snapshot.docs.map((categoria) => {
                        return {...categoria.data(), id:categoria.id}
                    })
                    cambiarCategorias(arrayCategorias)
                })
            }
        )
        onSnapshot(
            collection(db, 'Apertura'),
            (snapshot) => {
                const arrayApertura = snapshot.docs.map((apertura) => {
                    return {...apertura.data(), id:apertura.id}
                })
                cambiarApertura(arrayApertura)
            }
        )
        onSnapshot(
            collection(db, 'Horario'),
            (snapshot) => {
                const arrayHorario = snapshot.docs.map((horario) => {
                    return {
                        ...horario.data(), id:horario.id
                    }
                })
                cambiarHorario(arrayHorario)
            }
        )
        onSnapshot(
            collection(db, 'Usuarios'),
            (snapshot) => {
                const arrayUsuarios = snapshot.docs.map((usuario) => {
                    return {
                        ...usuario.data(), id:usuario.id
                    }
                })
                cambiarUsuarios(arrayUsuarios)
            }
        )
    }, [])

    return (
        <contexto.Provider 
            value={{
                productos: productos,
                categorias: categorias,
                apertura: apertura,
                horario: horario,
                usuarios: usuarios,
                productoimageList: productoimageList,
                categoriaimageList: categoriaimageList
            }}>
            {children}
        </contexto.Provider>
    );
}

export {contexto, Proveedor}