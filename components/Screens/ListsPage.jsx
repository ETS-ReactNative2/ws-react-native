import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../assets/Variables';
import { db } from '../../core/config';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import AddNew from './AddNew';

// For listing
const ListsPage = () => {
    const navigation = useNavigation();
    const [collectionList, setCollectionList] = useState([]);
    const [newRef, setNewRef] = useState('');

    // WORKSHOP : CODE BACKEND : DO NOT EDIT
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

    // WORKSHOP : LISTS PROCESSING : DO NOT EDIT
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

    // WORKSHOP TODO : CODE HERE
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Vos listes :</Text>
            {/*Listing of lists */}
            <FlatList
                data={collectionList}
                renderItem={RenderItem}
                keyExtractor={collectionList => collectionList.id}
            />
            {/* Use the component AddNew for add a new item into the shopping list*/}
            <AddNew addNew={createDoc} onChangeText={(text) => { setNewRef(text) }} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    heading: {
        alignSelf: 'flex-start',
        color: Colors.darkGrey,
        fontSize: 24,
        marginTop: 100,
        marginBottom: 70,
        marginLeft: 20,
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 350,
        height: 35,
        margin: 5,
        fontSize: 20,
        backgroundColor: Colors.darkGreen,
        borderRadius: 10,
    },
    list: {
        fontSize: 20,
        color: Colors.white,
        marginLeft: 10
    },
    deleteIcon: {
        tintColor: Colors.red,
        height: 32,
        width: 32,
        marginRight: 10
    },
});

export default ListsPage;