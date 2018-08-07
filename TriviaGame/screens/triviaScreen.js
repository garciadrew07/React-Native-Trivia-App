import React from "react";
import Trivia from "../lib/Trivia";
import { Text, View, Animated, Easing, TouchableOpacity } from "react-native";
import entities from "entities";
import { mergeStyles} from "../styles/styles";
import {Wrap, Header, Footer, CustomButton, Summary} from "../components";

function htmlDecode(input) {
    return entities.decodeHTML(input);
}

export default class triviaScreen extends React.Component {
    static navigationOptions = {
        title: "Trivia"
    };

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            loadingQuestion: true
        };
    }

    getTriviaProp() {
        return this.props.navigation.state.params.trivia;
    }

    componentWillMount() {
        this.animatedOpacity1 = new Animated.Value(0);
        this.animatedOpacity2 = new Animated.Value(0);
    }

    animateIn = () => {
        Animated.sequence([
            Animated.timing(this.animatedOpacity1, {
                toValue: 1,
                duration: 200,
                delay: 500,
                easing: Easing.in
            }),

            Animated.timing(this.animatedOpacity2, {
                toValue: 1,
                duration: 500,
                easing: Easing.in
            })
        ]).start(() => {
            this.setState({loadingQuestion: false});
        });
    };

    animateOut = cb => {
        this.setState({loadingQuestion: true});

        Animated.parallel([
            Animated.timing(this.animatedOpacity1, {
                toValue: 0,
                duration: 200,
                easing: Easing.in
            }),
            Animated.timing(this.animatedOpacity2, {
                toValue: 0,
                duration: 200,
                easing: Easing.in
            })
        ]).start(cb);
    };

    componentDidMount() {
        const trivia = this.getTriviaProp();
        const content = trivia.getQuestion();
        this.setState({content: content}, this.animateIn);
    }

    setQuestion = () => {
        const trivia = this.getTriviaProp();
        this.setState({content: trivia.getQuestion()}, this.animateIn);
    };

    handleClick = val => {
        const trivia = this.getTriviaProp();
        trivia.setAnswer(val);
        this.animateOut(this.setQuestion);
    };

    renderQuestion() {
        const {content, loadingQuestion} = this.state;
        const trivia = this.getTriviaProp();
        const animatedStyle1 = {opacity: this.animatedOpacity1};
        const animatedStyle2 = {opacity: this.animatedOpacity2};

        let activeStyle = null;
        const trueClick = () => this.handleClick("true");
        const falseClick = () => this.handleClick("false");

        if (loadingQuestion) {
            activeStyle = styles.faded;
        }

        return (
            <Wrap>
                <Animated.View style={animatedStyle1}>
                    <Header>{trivia.getCategory()}</Header>
                </Animated.View>
                <Animated.View style={animatedStyle2}>
                    <View>
                        <Text style={styles.mainText}>{htmlDecode(content)}</Text>
                    </View>
                    <View>
                        <Text style={styles.progressText}>{trivia.getProgress()}</Text>
                    </View>
                </Animated.View>



                <Footer>

                    <TouchableOpacity onPress={trueClick}>
                    <View style={[styles.multiButton, activeStyle]}>
                        <CustomButton loading={loadingQuestion}>True</CustomButton>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={falseClick}>
                        <View style={[styles.multiButton2, activeStyle]}>
                            <CustomButton loading={loadingQuestion}>False</CustomButton>
                        </View>
                    </TouchableOpacity>
                </Footer>
            </Wrap>
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        const trivia = this.getTriviaProp();
        const complete = trivia.complete;

        return (
            <View style={[styles.container]}>
                {complete ? (
                    <Summary navigate={navigate} score={trivia.getScore()}/>
                ) : (
                    this.renderQuestion()
                )}
            </View>
        );
    }
}

const screenStyles = {
    progressText: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    faded: {
        opacity: 0.5
    }
};

const styles = mergeStyles(screenStyles);