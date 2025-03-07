import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface ContainerProps{
    children: ReactNode
}
export default function Container({children}: ContainerProps){
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        zIndex: -10,
        flexDirection: "column" 
    }
})