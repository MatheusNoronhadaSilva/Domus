import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { StyleSheet } from "react-native"
import SubTaskItem from "./subTaskItem"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"

interface subTasksData {
    id: number,
    description: string,
    checked: boolean
}

interface taskData {
    id: number,
    title: string,
    description: string,
    dateTask: string,
    difficult: string,
    checked: boolean,
    subTasks: subTasksData[]

}
interface taskItemProps {
    data: taskData;
    completeTask: (id:number) => void;
    completeSubTask: (taskId:number, subTaskId:number) => void
}

export default function taskItem({ data, completeTask, completeSubTask }: taskItemProps){
        
    const { formattedDate, isLate } = handleDateFormat();
    function handleCompleteSubTask(subTaskId:number){

        console.log(data.id, subTaskId);
        
        completeSubTask(data.id, subTaskId)
    }

    function handleDateFormat() {
        const today = new Date(); // Pega a data de hoje
        const dateFormat = new Date(data.dateTask); // Converte a string dataTask em Date
    
        const dia = dateFormat.getDate().toString().padStart(2, "0");
        const mes = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
        const ano = dateFormat.getFullYear();
    
        const dataFormatada = `${dia}/${mes}/${ano}`;
    
        const isLate = today > dateFormat; // Verifica se a data já passou
    
        return { 
            formattedDate: isLate ? `${dataFormatada} - ATRASADO` : dataFormatada, 
            isLate 
        };
    }
    

    return(
        <View style={[styles.taskContainer ,{height: 90 + (data.description.length / 50) * 10 + (data.subTasks.length * 35), }]}>
            <View style={styles.difficultContainer}>
                <View style={[styles.difficult , {backgroundColor: data.difficult}]}/>
            </View>
            <View style={styles.infoTask}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
                { data.subTasks.length > 0 && (
                    <FlatList
                    style={{ gap: 10}}
                    data={data.subTasks}
                    keyExtractor={ (item ) => String(item.id)}
                    renderItem={ ({ item }) => <SubTaskItem data={item} completeSubTask={ () => handleCompleteSubTask(item.id)}/>}/>
                )}
                <Text style={{width: "100%", textAlign: "right", fontSize: 10, color: isLate ? "red" : "black"}}>{formattedDate}</Text>
            </View>
            <View style={[ styles.buttonContainer, {backgroundColor: data.checked ? "#B1B1B1" : "#65C9FF"}]}>
                <TouchableOpacity 
                style={[ styles.button, { backgroundColor: data.checked ? "#dddddd" : "#E8F7FF"}]}
                onPress={ () => completeTask(data.id)}>
                    { data.checked && (
                        <Ionicons size={30} color={"#595959"} name="checkmark"/>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        width: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: "100%",
        marginLeft: "auto",
        borderRadius: 8
    },
    taskContainer: {
        marginBottom: 20,
        marginInline: 20,
        borderRadius: 8,
        alignSelf: "stretch",
        paddingLeft: 20,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
    },
    difficultContainer: {
        flex: 0.1,
        paddingBlock: 8
    },
    difficult: {
        flex: 1,
        borderRadius: 8
    },
    infoTask: {
        flex: 5,
        flexDirection: "column",
        gap: 10,
        paddingInline: 10,
        paddingVertical: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 15
    },
    description: {
        fontSize: 10,
        width: "100%"
    }
})