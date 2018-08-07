import React, {Component} from "react";
import { TouchableHighlight, Animated, Text } from "react-native";
import { Box } from "../styles/styles";

class CustomButton extends Component {
    constructor() {
        super();
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn(cb) {
        if (this.props.loading) return;

        Animated.spring(this.animatedValue, {
            toValue: 0.5
        }).start();
    }
            handlePressOut(cb = () => {}) {
        if(this.props.loading) return;
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 9,
            tension: 60
        }).start(cb);
    }

    render() {
        const {onPress} = this.props;
        const animatedStyle = {transform: [{scale: this.animatedValue}]};

        return (
            <Box>
                <TouchableHighlight
                    onPressIn={this.handlePressIn}
                    onPressOut={() => {
                        this.handlePressOut(onPress);
                    }}
                >
                    <Animated.View style={animatedStyle}>
                        <Text>{this.props.children}</Text>
                    </Animated.View>
                </TouchableHighlight>
            </Box>
        );
    }
}

export default CustomButton;

