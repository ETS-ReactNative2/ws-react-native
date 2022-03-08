import { View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { Colors } from '../../assets/Variables';

// For adding a new shoppingList or a new product
// WORKSHOP : DO NOT EDIT
const AddNew = ({ addNew, onChangeText }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TextInput style={styles.inputField} placeholder='Ajoutez quelque chose' onChangeText={onChangeText} />
            <TouchableOpacity style={styles.button} onPress={(newList) => addNew(newList)}>
                <View style={styles.button}>
                    <Image source={require('../../assets/plus-circle-outline.png')} style={styles.buttonImage} />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.white,
        height: 30,
        width: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonImage: {
        width: 24,
        height: 24,
        tintColor: Colors.blue
    },
    container: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
        width: 250,
    },
    inputField: {
        color: Colors.blue,
        height: 50,
        flex: 1,
    },
});

export default AddNew;