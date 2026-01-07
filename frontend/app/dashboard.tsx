import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const GRID_SPACING = 15;
const CARD_WIDTH = (width - (GRID_SPACING * 3)) / 2;

// Language Mappings
const TRANSLATIONS = {
    en: {
        dashboard: "Dashboard",
        welcome: "Hi, Learner!",
        sectionTitle: "Continue Learning",
        sectionDesc: "Pick a topic below",
        swipeText: "Scroll for more magic",
        logout: "Logout",
        startBtn: "Start",
        subtitle: "Choose a module",
        modules: [
            "Alphabet", "Sounds", "Colors", "Shapes", "Numbers",
            "Words", "Family", "Reading", "Writing", "Practice"
        ]
    },
    ta: {
        dashboard: "தகவல் பலகை",
        welcome: "வணக்கம், மாணவரே!",
        sectionTitle: "கற்றலைத் தொடரவும்",
        sectionDesc: "கீழே உள்ள தலைப்பைத் தேர்ந்தெடுக்கவும்",
        swipeText: "மேலும் அறிய உருட்டவும்",
        logout: "வெளியேறு",
        startBtn: "தொடங்கு",
        subtitle: "தொடங்குவதற்கு தேர்ந்தெடுக்கவும்",
        modules: [
            "அகரவரிசை", "ஒலிகள்", "நிறங்கள்", "வடிவங்கள்", "எண்கள்",
            "சொற்கள்", "குடும்பம்", "வாசிப்பு", "எழுதுதல்", "பயிற்சி"
        ]
    }
};

const MODULE_EMOJIS = ['🔤', '🔊', '🎨', '📐', '🔢', '📚', '👨‍👩‍👧‍👦', '📖', '✍️', '🏆'];
const MODULE_COLORS = [
    ['#ff4d4d', '#ff0000'], ['#48dbfb', '#0abde3'], ['#ff9f43', '#f368e0'],
    ['#54a0ff', '#2e86de'], ['#1dd1a1', '#10ac84'], ['#ff9f43', '#ee5253'],
    ['#00d2d3', '#01a3a4'], ['#5f27cd', '#341f97'], ['#ff6b6b', '#ee5253'],
    ['#feca57', '#ff9f43']
];

const MODULE_ICONS = {
    0: require('../assets/images/alphabet-icon.png'),
    1: require('../assets/images/sounds-icon.png'),
    2: require('../assets/images/colors-icon.png'),
    3: require('../assets/images/shapes-icon.png'),
    4: require('../assets/images/numbers-tamil.png'),
    5: require('../assets/images/words-icon.png'),
    6: require('../assets/images/family-icon.png'),
    9: require('../assets/images/practice-icon.png'),
};

const BACKGROUND_LETTERS = ['A', 'B', 'C', 'அ', 'ஆ', 'இ', 'X', 'Y', 'Z', 'எ', 'உ', 'ஓ'];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

const ModuleCard = ({ item, index, lang, t }: { item: string; index: number; lang: 'en' | 'ta'; t: any }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => { scale.value = withSpring(1.05); };
    const onPressOut = () => { scale.value = withSpring(1); };

    const iconAsset = MODULE_ICONS[index as keyof typeof MODULE_ICONS];

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).duration(500).springify()}
            style={[styles.moduleCardContainer, animatedStyle]}
        >
            <AnimatedPressable
                style={styles.moduleCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => { }}
            >
                <LinearGradient colors={['#ffffff', '#fffafa']} style={styles.cardGradient}>
                    <View style={styles.imagePlaceholder}>
                        {iconAsset ? (
                            <Image
                                source={iconAsset}
                                style={styles.moduleIcon}
                                contentFit="contain"
                            />
                        ) : (
                            <LinearGradient
                                colors={MODULE_COLORS[index] as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.emojiBg}
                            >
                                <Text style={styles.moduleEmoji}>{MODULE_EMOJIS[index]}</Text>
                            </LinearGradient>
                        )}
                        <View style={styles.glitterBatch}>
                            <Text style={styles.glitterText}>{lang === 'en' ? 'NEW' : 'புதிய'}</Text>
                        </View>
                    </View>
                    <Text style={styles.moduleTitle} numberOfLines={1}>{item}</Text>
                    <LinearGradient colors={['#ed1c24', '#c0151b']} style={styles.startBtn}>
                        <Text style={styles.startBtnText}>{t.startBtn}</Text>
                    </LinearGradient>
                </LinearGradient>
            </AnimatedPressable>
        </Animated.View>
    );
};

export default function DashboardScreen() {
    const router = useRouter();
    const [lang, setLang] = useState<'en' | 'ta'>('en');
    const t = TRANSLATIONS[lang];

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Dynamic Background */}
            <LinearGradient
                colors={['#ed1c24', '#8b0000', '#4d0000']}
                style={StyleSheet.absoluteFill}
            >
                {BACKGROUND_LETTERS.map((char, i) => (
                    <FloatingLetter key={i} char={char} />
                ))}
            </LinearGradient>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.logoAndTitle}>
                        <View style={styles.logoCircleWrapper}>
                            <LinearGradient colors={['#fff', '#f9f9f9']} style={styles.logoCircle}>
                                <Image
                                    source={require('../assets/images/logo-icon.png')}
                                    style={styles.logo}
                                    contentFit="cover"
                                />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={styles.welcomeMainTitle}>{t.dashboard}</Text>
                            <Text style={styles.welcomeSubTitle}>{t.welcome}</Text>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.langToggle}
                            onPress={() => setLang(l => l === 'en' ? 'ta' : 'en')}
                        >
                            <LinearGradient colors={['#fff', '#f5f5f5']} style={styles.langGradient}>
                                <Text style={styles.langText}>{lang === 'en' ? 'EN ➔ TA' : 'TA ➔ EN'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/auth')}>
                            <View style={styles.logoutCircle}>
                                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✕</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={t.modules}
                    renderItem={({ item, index }) => <ModuleCard item={item} index={index} lang={lang} t={t} />}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    ListHeaderComponent={
                        <View style={styles.infoArea}>
                            <Text style={styles.sectionTitle}>{t.sectionTitle}</Text>
                            <Text style={styles.sectionDesc}>{t.sectionDesc}</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>{t.swipeText}</Text>
                        </View>
                    }
                />
            </SafeAreaView>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        zIndex: 10,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoAndTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoCircleWrapper: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    logoCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    langToggle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    langGradient: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    langText: {
        color: '#ed1c24',
        fontWeight: 'bold',
        fontSize: 12,
    },
    logoutBtn: {
        width: 32,
        height: 32,
    },
    logoutCircle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: GRID_SPACING,
        marginBottom: GRID_SPACING,
    },
    infoArea: {
        paddingHorizontal: 25,
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeMainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    welcomeSubTitle: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '700',
        opacity: 0.85,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
    },
    sectionDesc: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        opacity: 0.75,
    },
    moduleCardContainer: {
        width: CARD_WIDTH,
    },
    moduleCard: {
        borderRadius: 30,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    cardGradient: {
        borderRadius: 30,
        padding: 15,
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: '100%',
        height: 140,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden',
    },
    moduleIcon: {
        width: '100%',
        height: '100%',
    },
    emojiBg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moduleEmoji: {
        fontSize: 60,
    },
    glitterBatch: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#ed1c24',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    glitterText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
    },
    moduleTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#222',
        marginBottom: 10,
        textAlign: 'center',
    },
    startBtn: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    startBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    footer: {
        marginTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        opacity: 0.7,
    }
});
