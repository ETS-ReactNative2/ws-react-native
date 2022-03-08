import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../assets/Variables';
import { db } from '../../core/config';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import AddNew from './AddNew';

const ListsPage = () => {
    const navigation = useNavigation();
    const [collectionList, setCollectionList] = useState([]);
    const [newRef, setNewRef] = useState('');

    const createDoc = async () => {
        const ref = doc(db, 'ShoppingList', newRef)
        await setDoc(ref, {});
        setCollectionList(prevList => {
            return [{ id: newRef }, ...prevList]
        });
    }

    const readDoc = async () => {
        const querySnapshot = await getDocs(collection(db, 'ShoppingList'));
        querySnapshot.forEach((doc) => {
            setCollectionList((prevList) => {
                return [...prevList, { id: doc.id }]
            });
        });
    }

    const deleteList = (id) => {
        const ref = doc(db, "ShoppingList", id);
        deleteDoc(ref);
        setCollectionList(prevCollectionList => {
            return prevCollectionList.filter(items => items.id != id)
        })
    }

    useEffect(() => {
        readDoc();
    }, [])

    const RenderItem = ({ item }) => (

        <View key={item.id} style={styles.listContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Détails de votre liste", { ref: item.id })}>
                <Text style={styles.list}>{item.id}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteList(item.id)}>
                <Image source={require('../../assets/delete.png')} style={styles.deleteIcon} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            {/*WORKSHOP TODO : CODE HERE*/}               
        </View >
    );
}

// WORKSHOP TODO : COMPLETE THE STYLE
const styles = StyleSheet.create({
    
    listContainer: {
        alignItems: 'center',
    },
    list: {
        fontSize: 20,
    },
    deleteIcon: {
        tintColor: Colors.red,
        height: 32,
        width: 32,
        marginRight: 10
    },
});


// EXPORT
export default ListsPage;