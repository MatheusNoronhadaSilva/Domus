import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface habitsData{
    id: number,
    title: string,
    description: string,
    like: number,
    dislike: number
}

interface habitsItemProps{
    data: habitsData
    likeHabit: (id:number) => void
    dislikeHabit: (id:number) => void
}

export default function HabitsItem({ data, likeHabit, dislikeHabit }:habitsItemProps) {
    
    return(
        <View style={[styles.habitContainer, {height: 80}]}>
            <View style={[styles.buttonContainer, {backgroundColor: data.like == data.dislike ? "#FFBF26" : data.like > data.dislike ? "#11FF00" : "#FF0000"}]}>
                <TouchableOpacity style={styles.button} onPress={ () => likeHabit(data.id)}>
                    <View style={styles.buttonBackground} />
                    <Ionicons color={"#fff"} size={30} name="add" />
                </TouchableOpacity>
            </View>
            <View style={styles.habitInfo}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <View style={styles.habitStatus}>
                    <View style={styles.status}>
                        <Ionicons size={10} name="thumbs-up" />
                        <Text style={{ fontSize: 12}}>{data.like}</Text>
                    </View>
                    <View style={styles.status}>
                        <Ionicons size={10} name="thumbs-down" />
                        <Text style={{fontSize: 12}}>{data.dislike}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.buttonContainer, {backgroundColor: data.like == data.dislike ? "#FFBF26" : data.like > data.dislike ? "#11FF00" : "#FF0000"}]}>
                <TouchableOpacity style={styles.button} onPress={ () => dislikeHabit(data.id)}>
                    <View style={styles.buttonBackground} />
                    <Ionicons color={"#fff"} size={30} name="remove" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonBackground: {
        position: "absolute",
        opacity: 0.2,
        backgroundColor: "black",
        height: 35,
        width: 35,
        borderRadius: 360
    },
    description: {
        fontSize: 10,

    },
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
    status: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    habitStatus: {
        gap: 10,
        flexDirection: "row",
        marginTop: "auto",
        justifyContent: "flex-end",
    },
    habitInfo: {
        flex: 5,
        flexDirection: "column",
        marginInline: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 360,
        height: 35,
        width: 35,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    habitContainer:{
        overflow: "hidden",
        borderRadius: 8,
        flexDirection: "row",
        marginBottom: 20,
        alignSelf: "center",
        marginInline: 20,
        backgroundColor: "#fff",
        elevation: 3
    }
})