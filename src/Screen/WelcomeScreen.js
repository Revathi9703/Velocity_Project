
import React from "react";
import { Image, Text, View } from "react-native";

const WelcomeScreen = () => {
  
    return(
        <View style={{paddingVertical:"50%",backgroundColor:'white'}}>
          <Image source={require("../../assets/Images/2811140.jpg")}
          style={{width:"90%",height:250,alignSelf:'center'}}></Image>
        </View>
    )
}
export default WelcomeScreen;