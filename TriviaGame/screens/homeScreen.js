import React, {Component} from 'react';
import {numQuestions, welcomeTitle, } from "../config";
import Trivia from "../lib/Trivia";
import { Header} from "../components"
import { Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {Column, GrowBox, Box} from
        '../styles/styles';

export default class homeScreen extends Component {
    static navigationOptions = {
        title: "Home"
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            trivia: new Trivia({amount: numQuestions}),
            content: "",
            count: 0,
            error: false
        };
    }

    componentWillMount() {
        this.animatedOpacity = new Animated.Value(0);
    }

    componentDidMount() {
        const trivia = this.state.trivia;
        trivia.load(response => {
            if (response.status === "error") {
                this.setState({error: true});
                return;
            }

            this.setState(
                {
                    loading: false,
                    count: this.state.trivia.getTotalQuestions()
                },
                () => {
                    Animated.timing(this.animatedOpacity, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.in
                    }).start();
                }
            );
        });
    }



    render() {
        const { error, loading} = this.state;
        const {navigate} = this.props.navigation;
        const btnPress = () => navigate("Trivia", {trivia: this.state.trivia});

        if (error) {
            return this.renderError()
        }

        return !loading ? (

            <Column height="100%" bg="white">
                <Header>{welcomeTitle}</Header>
                <GrowBox style={{alignItems: "center"}}>
                    <Box height="30%" mt="60px" style={{alignItems: "center"}}>
                        <Text>You will be presented{"\n"} with 10 True or False{"\n"}questions.</Text>
                    </Box>
                    <Text style={{alignItems: "center"}} fontSize={36}>Can you score 100%?</Text>
                </GrowBox>

                <TouchableOpacity onPress={btnPress}>
                    <Box mt="10px" bg="dodgerblue" borderRadius={1}  py="10pX"
                         style={{alignItems: "center"}}>
                        <Text fontWeight={300} fontSize={30} style={{color: "white"}}>BEGIN NOW</Text>
                    </Box>
                </TouchableOpacity>
            </Column>

        ) : null;
    }
}