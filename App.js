import { View } from "react-native"
import CustomTabNavigator from "./src/Navigate";
import Menu from 'react-native-vector-icons/Entypo';
import Notify from 'react-native-vector-icons/Ionicons';

const App = () =>{
  return(
    <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
        <Menu name="menu" size={20} color={"grey"}/>
        <Notify name="notifications-outline" size={20} color={"grey"}/>
      </View>
      <CustomTabNavigator/>
    </View>
  )
}
export default App;