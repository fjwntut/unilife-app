import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    headerButton:{
        backgroundColor: 'transparent',
        marginRight:16,
        fontSize: 20
    },
    container: {
        alignItems: 'center',
        width: '100%',
        padding: 16,
    },
    title: {
        
    },
    green:{
        backgroundColor: '#00aebb',
        width:'100%'
    },
    propic: {
        height: 100,
        width: 100,
        alignSelf: "center",
        resizeMode:'cover',
        borderRadius: 100/2,
        borderColor: 'white',
        borderWidth: 2,
        marginTop:16,
    },
    editButton:{
        
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        height: 40,
        borderRadius: 20,
        paddingHorizontal:32,
        borderColor: 'white',
        borderWidth: 2,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16
    },
    input: {
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f2f3f3',
        marginTop: 8,
        marginBottom: 8,
        width: '100%',
        paddingLeft: 16
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#0F355C",
        fontWeight: "bold",
        fontSize: 16,
        borderBottomColor: "#0F355C",
        borderBottomWidth: 2
    },
    bg: {
        justifyContent: "center",
        resizeMode:'cover',
        margin: 0
    }
})
