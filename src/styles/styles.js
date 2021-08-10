import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    checkboxTrue:{
        height: 24,
        width:24,
        color:'#00aebb'
    },
    checkboxFalse:{
        height: 24,
        width:24,
        color:'#e2e3e4'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f2f3f3',
        marginTop: 8,
        marginBottom: 8,
        paddingLeft: 16
    },
    disabledButton: {
        backgroundColor: "#e2e3e4",
        height: 40,
        borderRadius: 20,
        shadowRadius: 44,
        shadowOffset:{width:0, height:8},
        shadowColor: '#0f355c',
        shadowOpacity: 0.15,
        alignItems:'center',
        justifyContent:'center',
    },
    button: {
        backgroundColor: "#00aebb",
        height: 40,
        borderRadius: 20,
        shadowRadius: 44,
        shadowOffset:{width:0, height:8},
        shadowColor: '#0f355c',
        shadowOpacity: 0.15,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginBottom: 20,
        marginTop: "auto"
    },
    footerText: {
        fontSize: 12,
        color: '#2e2e2d'
    },
    footerLink: {
        fontSize: 12,
        color: "#0F355C",
        fontWeight: 'bold',
        borderBottomColor: "#0F355C",
        borderBottomWidth: 1,
    }
})
