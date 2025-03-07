import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Container from "../components/container";

export default function App() {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["25%", "50%"], []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Container>
                <Text style={styles.title}>Teste do BottomSheet</Text>
                <TouchableOpacity onPress={() => alert("Funcionando!")}>
                    <Text style={{ color: "#fff" }}>Clique aqui</Text>
                </TouchableOpacity>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{ backgroundColor: "lightblue" }}
                    enablePanDownToClose={true}
                >
                    <View style={styles.contentContainer}>
                        <Text>Conteúdo do BottomSheet</Text>
                    </View>
                </BottomSheet>
            </Container>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow",
    },
});
