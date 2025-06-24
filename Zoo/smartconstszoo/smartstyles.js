import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');


export const background = StyleSheet.create({

    zoo: {
        width: width,
        height: height
    },

    navigation: {
        position: 'absolute',
        alignItems: 'center',
        width: width,
        bottom: 0,
        zIndex: 10
    }

});


export const navigation = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: '#524639',
        paddingHorizontal: 24,
        paddingTop: 15,
        paddingBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: 10
    },

    text: {
        fontSize: 11,
        fontWeight: '300',
        color: '#8A7156'
    }

});


export const zoo = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        paddingTop: height * 0.08,
        paddingHorizontal: 20
    },

    row: {
        width: '100%',
        flexDirection: 'row'
    },

    backImage: {
        width: 43,
        height: 43,
        resizeMode: 'contain',
        marginBottom: 11
    },

    mainTitle: {
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 36,
        color: '#fff',
        marginBottom: 15,
        zIndex: 10
    },

    button: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FEFE65'
    },

    buttonText: {
        fontSize: 15,
        fontWeight: '800',
        lineHeight: 22,
        color: '#000'
    },

    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        color: '#fff',
        marginBottom: 10
    },

    nothingImg: {
        width: 127,
        height: 127,
        resizeMode: 'contain',
        marginBottom: 10
    },

    nothingText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 20,
        color: '#fff'
    },

    lion: {
        width: 330,
        height: 328,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center'
    },

    textContainer: {
        width: '90%',
        alignSelf: 'flex-end',
        borderRadius: 15,
        backgroundColor: '#fff',
        padding: 17,
        position: 'absolute',
        bottom: 150,
        right: 10,
        zIndex: 10
    },

    text: {
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        color: '#000'
    },

    upperContainer: {
        width: width,
        paddingTop: height * 0.08,
        paddingHorizontal: 20,
        paddingBottom: 9,
        backgroundColor: '#524639',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0
    },

    backText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff'
    },

    arrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 10
    },

    actionButton: {
        width: 42,
        height: 42,
        resizeMode: 'contain'
    }

});


export const form = StyleSheet.create({

    label: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '#837464',
        marginBottom: 2
    },

    input: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingRight: 40,
        borderRadius: 15,
        backgroundColor: '#524639',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        color: '#fff',
        marginBottom: 12
    },

    categoryButton: {
        padding: 10,
        borderRadius: 9,
        backgroundColor: '#524639',
        margin: 2
    },

    categoryButtonText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff'
    },

    typeButton: {
        width: '100%',
        padding: 14,
        borderRadius: 15,
        backgroundColor: '#524639',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },

    typeButtonText: {
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff'
    },

    imgButton: {
        width: 87,
        height: 87,
        borderRadius: 15,
        backgroundColor: '#524639',
        overflow: 'hidden',
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    animalImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    imgIcon: {
        width: 56,
        height: 50,
        resizeMode: 'contain'
    },

    clearButton: {
        position: 'absolute',
        top: 13,
        right: 10
    },

    clearIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },

    checkedButton: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FEFE65',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },

    checkedIcon: {
        width: 10,
        height: 9,
        resizeMode: 'contain'
    },

    selectedButton: {
        width: 23,
        height: 23,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#FEFE65',
        padding: 4,
        marginRight: 10
    },

    selected: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FEFE65',
        borderRadius: 100
    }

});


export const card = StyleSheet.create({

    container: {
        width: '100%',
        borderRadius: 15,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#524639'
    },

    name: {
        fontSize: 18,
        fontWeight: '900',
        lineHeight: 20,
        color: '#fff'
    },

    categoryContainer: {
        padding: 10,
        backgroundColor: '#837464',
        borderRadius: 9,
        width: 'content'
    },

    categoryText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff'
    },

    date: {
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 20,
        color: '#fff'
    }

});


export const info = StyleSheet.create({

    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        borderRadius: 15,
        marginBottom: 12
    },

    value: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff'
    }

});



export const test = StyleSheet.create({

    image: {
        width: '100%',
        height: 215,
        borderRadius: 15,
        resizeMode: 'cover',
        marginBottom: 24
    },

    button: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 11,
        backgroundColor: '#524639',
        padding: 5
    },

    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff'
    },

    letterBox: {
        width: 43,
        height: 43,
        backgroundColor: '#837464',
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    letter: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff'
    }

});


export const settings = StyleSheet.create({

    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderBottomColor: '#524639',
        borderBottomWidth: 1,
        backgroundColor: '#4C3B29'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#fff'
    },

    notifButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        backgroundColor: '#524639',
        borderRadius: 15,
        marginBottom: 5
    }

});