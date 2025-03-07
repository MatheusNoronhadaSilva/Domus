import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function AddItemButton(){

    return(
        <TouchableOpacity style={styles.addItemButton}>
            <Ionicons size={30} color={"#fff"} name='add'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addItemButton: {
        position: "absolute",
        backgroundColor: "#65C9FF",
        height: 45,
        width: 45,
        right: 20,
        bottom: 20,
        borderRadius: 360,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 0.5
    }
})