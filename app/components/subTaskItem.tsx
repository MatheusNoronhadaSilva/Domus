import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"


interface subTaskDataProps {
    id: number,
    description: string,
    checked: boolean
}
interface subTaskItemProps {
    data: subTaskDataProps,
    completeSubTask: (id: number) => void
}

export default function subTaskItem({ data, completeSubTask }: subTaskItemProps) {
    
    return (
        <View style={styles.subTask}>
            <TouchableOpacity style={[styles.button, {backgroundColor: data.checked ? "#595959" : "#fff"}]} onPress={ () => completeSubTask(data.id)}>
                {data.checked && (
                    <Ionicons size={18} color={"#fff"} name="checkmark" />
                )}
            </TouchableOpacity>
            <Text style={styles.description}>{data.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    description: {
        flex: 1,
        fontSize: 10
    },
    button: {
        borderWidth: 1,
        borderRadius: 4,
        width: 20,
        height: "100%"
    },
    subTask: {
        height: 20,
        gap: 25,
        flexDirection: "row"
    }
})