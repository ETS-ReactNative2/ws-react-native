import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native';
import { Colors } from '../../assets/Variables';
import { db } from '../../core/config';
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
import AddNew from './AddNew';
import image from '../../assets/BG.png';

const ListDetails = (ref) => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState('');
    const docRef = ref.route.params.ref;

    // BACKEND PROCESSING : DO NOT EDIT
    const addItem = async () => {
        const ref = doc(db, 'ShoppingList', docRef, 'Produits', item);
        const docData = {
            id: item,
            checked: false,
            quantity: 1,
        };
    
        const docref = await setDoc(ref, docData).then(() => {
            setItems(prevList => {
                return [docData, ...prevList]
            });
        });
    }

    const readDoc = async () => {
        const querySnapshot = await getDocs(collection(db, 'ShoppingList', docRef, 'Produits'));
        querySnapshot.forEach((doc) => {
            setItems((prevList) => {
                return [...prevList, doc.data()]
            });
        });
    }

    const updateCheck = async (value, item) => {
        const ref = doc(db, 'ShoppingList', docRef, 'Produits', item);
        await updateDoc(ref, value).then(() => {
            const array = items;
            array.map(elem => {
                (elem.id !== item) ? elem : (elem.checked === false) ? elem.checked = true : elem.checked = false;
            })
            setItems([]);
            setItems(array);
        });
    }

    const updateIncrement = async (value, item) => {
        const ref = doc(db, 'ShoppingList', docRef, 'Produits', item);
        await updateDoc(ref, value).then(() => {
            const array = items;
            array.map(elem => {
                (elem.id === item) ? elem.quantity += 1 : elem;
            })
            setItems([]);
            setItems(array);
        });
    }

    const updateDecrement = async (value, item) => {
        const ref = doc(db, 'ShoppingList', docRef, 'Produits', item);
        await updateDoc(ref, value).then(() => {
            const array = items;
            array.map(elem => {
                (elem.id === item) ? elem.quantity -= 1 : elem;
            })
            setItems([]);
            setItems(array);
        });
    }

    const deleteItem = (id) => {
        const ref = doc(db, "ShoppingList", docRef, 'Produits', id);
        deleteDoc(ref);
        setItems(prevItemsList => {
            return prevItemsList.filter(items => items.id != id)
        })
    }
    useEffect(() => {
        readDoc();
    }, [])

    // ITEM PROCESSING : DO NOT EDIT
    const renderItem = ({ item }) => (
        <View key={item.id} style={styles.listContainer}>
            <View style={styles.list}>
                <TouchableOpacity onPress={() => {
                    updateCheck({
                        checked: (item.checked === false) ? true : false,
                    }, item.id)
                }}>
                    <Text style={(item.checked === false) ? (styles.textUnchecked) : (styles.textChecked)}>{'x ' + item.quantity} {item.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1.0} style={styles.opacity} onPress={() => {
                    updateIncrement({
                        quantity: (item.quantity + 1)
                    }, item.id)
                }}>
                    <Image source={require('../../assets/plus.png')} style={styles.PlusMinusIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateDecrement({
                    quantity: ((item.quantity > 1) ? (item.quantity - 1) : (item.quantity))
                }, item.id)
                }>
                    <Image source={require('../../assets/minus.png')} style={styles.PlusMinusIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Image source={require('../../assets/delete.png')} style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    // WORKSHOP TODO : CODE HERE
    return (
        <View >

                <Text >Produits :</Text>
                {/* Listing of products */}
                
                {/* Use the component AddNew for add a new product*/}

        </View>
    )
}

// WORKSHOP TODO : COMPLETE THE STYLE
const styles = StyleSheet.create({
    
    listContainer: {
        flexDirection: 'row',
    },
    list: {
        flex: 1,
    },
    textChecked: {
        textDecorationLine: 'line-through',
    },
    textUnchecked: {
        color: Colors.white,
    },
    Icon: {
        tintColor: Colors.red,
        height: 32,
        width: 32,
    },
    PlusMinusIcon: {
        tintColor: Colors.white,
        height: 32,
        width: 32,
    }
});


// EXPORT
export default ListDetails;