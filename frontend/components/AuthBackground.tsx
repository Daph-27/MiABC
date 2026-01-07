import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const BACKGROUND_LETTERS = ['A', 'B', 'C', 'அ', 'ஆ', 'இ', 'X', 'Y', 'Z', 'எ', 'உ', 'ஓ'];

const FloatingLetter = ({ char }: { char: string }) => {
    const translateY = useSharedValue(Math.random() * height);
    const translateX = useSharedValue(Math.random() * width);
    const opacity = useSharedValue(0.1 + Math.random() * 0.3);
    const rotation = useSharedValue(Math.random() * 360);

    useEffect(() => {
        translateY.value = withRepeat(
            withTiming(translateY.value - 200 - Math.random() * 300, {
                duration: 8000 + Math.random() * 8000,
                easing: Easing.linear,
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        top: translateY.value,
        left: translateX.value,
        opacity: opacity.value,
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <Animated.Text style={[styles.floatingChar, animatedStyle]}>
            {char}
        </Animated.Text>
    );
};

interface AuthBackgroundProps {
    children?: React.ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ed1c24', '#8b0000', '#4d0000']}
                style={StyleSheet.absoluteFill}
            >
                {BACKGROUND_LETTERS.map((char, i) => (
                    <FloatingLetter key={i} char={char} />
                ))}
            </LinearGradient>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingChar: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
});
