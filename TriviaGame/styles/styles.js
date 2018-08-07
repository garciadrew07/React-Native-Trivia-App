import  React from "react";
import styled from "styled-components";
import {space, width, fontSize, color, height, borderRadius} from 'styled-system';
import { StyleSheet } from "react-native";


const Base = styled.View`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${height}
  ${borderRadius}
`


const Row = Base.extend`
    display: flex; 
    flex-direction: row;
`

const Column = Base.extend`
    display: flex;
    flex-direction: column;
`


const Box = Base.extend`
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;

`

const GrowBox = Base.extend`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
`

const LargeInput = styled.TextInput`
    box-shadow: 0 0 3px rgba(0,56,76,.1);
    border: 1px solid #009BD8;
    border-radius: 6px;
    width: 200px;
    font-size: 20px;
    padding:12px;
    

`
const mainBkdGradient = ["white", "white"];
const mainBtnGradient = [ ];

const globalStyles = {
    container: {
        flex: 1
    },
    bkdGradient: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 0,
        margin: 0
    },
    wrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "transparent"
    },
    mainText: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        fontWeight: "bold"
    },
    headerContainer: {
        marginTop: 100,
        width: "100%",
        backgroundColor: "transparent"
    },
    headerText: {
        color: "black",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Kailasa-Bold"
    },
    footerContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 50,
        width: "100%",
        backgroundColor: "transparent"
    },
    multiButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor:"#009BD8",
        borderRadius:10,
        padding: 10,
        paddingHorizontal:40

    },
    multiButton2: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor:"#db3445",
        borderRadius:10,
        padding: 10,
        paddingHorizontal:40
    }
};




const mergeStyles = function(screenStyles = {}) {
    return StyleSheet.create(
        Object.assign(globalStyles, screenStyles)
    );
};



export {
    Row,
    Column,
    Box,
    GrowBox,
    LargeInput,
    Base,
    mergeStyles,
    mainBkdGradient,
    mainBtnGradient
}
