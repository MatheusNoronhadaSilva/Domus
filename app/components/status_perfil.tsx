import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatusPerfil() {
    const [expandedStatus, setexpandedStatus] = useState(false)

    return (
            <View style={styles.statusContainer}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Image style={styles.perfilPhoto} source={require("@/assets/images/avatar.png")} />
                    <View style={styles.levelContainer}>
                        <Text style={{ fontSize: 10 }}>Nível</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold", lineHeight: 16 }}>32</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 15 }}>
                    <View style={styles.statusInfo}>
                        <Image style={styles.statusIcon} source={require("@/assets/images/vida-icon.png")} />
                        <Text style={styles.infoText}>40/50</Text>
                    </View>
                    <View style={styles.statusInfo}>
                        <Image style={styles.statusIcon} source={require("@/assets/images/mana-icon.png")} />
                        <Text style={styles.infoText}>40/50</Text>
                    </View>
                    <View style={styles.statusInfo}>
                        <Image style={styles.statusIcon} source={require("@/assets/images/exp-icon.png")} />
                        <Text style={styles.infoText}>40/50</Text>
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <Ionicons size={25} name="notifications" />
                    <Ionicons size={25} name="menu" />
                </View>
            </View>
    );

}

const styles = StyleSheet.create({
    levelContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    infoText: {
        fontSize: 10
    },
    statusInfo: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    statusIcon: {
        height: 20,
        width: 20
    },
    perfilPhoto: {
        height: 50,
        width: 45,
        alignSelf: 'center'
    },
    statusContainer: {
        height: 80,
        backgroundColor: "#E8F7FF",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingInline: 10
    },
    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    }
});
