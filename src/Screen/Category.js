import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from 'react-native-vector-icons/Feather';
import MicroPhones from 'react-native-vector-icons/FontAwesome5';
import FilterMenu from 'react-native-vector-icons/Entypo';

const Category = () => {
  const width = Dimensions.get('window').width;
  const [data, setData] = useState('');
  const data2 = require('../../assets/data.json');
  const [imgActive, setImageActive] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    const allUsers = data2.categories.flatMap((category) => category.people);
    setData(allUsers);
    setFilteredData(allUsers);
  }, []);


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filtered = data2.categories
      .find(cat => cat.category === category)?.people || [];
    setFilteredData(filtered);
    console.log("setFilteredData",filtered);
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }


  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imgActive) {
        setImageActive(slide)
      }
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

    return(
        <View style={{flex:1,paddingHorizontal:10,paddingVertical:15}}>
          <View style={{flexDirection:'row',columnGap:10,marginHorizontal:5}}>
          <View style={{height:50,
              width:'85%',
              backgroundColor:'#ced4da',
              flexDirection:'row',
              alignItems:'center',
              paddingLeft:15,
              borderRadius:10}}>
          <SearchIcon name={"search"} size={20} color={"grey"}></SearchIcon>
            <TextInput
            placeholder="Search"
            placeholderTextColor={'grey'}
            style={{
              color:'black',
              fontSize:16,
              fontWeight:'500',
              width:'80%',
              backgroundColor:'#ced4da'
            }}
            value={searchQuery}
            onChangeText={handleSearch}>
            </TextInput>
            <MicroPhones  name="microphone-alt" size={20} color={'grey'}/>
          </View>
          <View style={{height:50,backgroundColor:'#ced4da',justifyContent:'center',          
            borderRadius:10,alignItems:'center',width:'15%'}}>
           <FilterMenu name="menu" size={20} color={'grey'}/>
          </View>
          </View>

     <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
      >
     {data2.categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategorySelect(category.category)}>
            <View style={[styles.imageContainer, { width: 120,height:100 }]}>
              <Image source={{ uri: category.categoryImage }} style={styles.image} />
              <Text style={styles.boldText}>
                {category.category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

    <FlatList
        data={filteredData}
        numColumns={3}
        style={{ flex: 1,marginVertical:15,flexDirection:'row',width:width,paddingHorizontal:20}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <ImageBackground 
              source={{ uri: item.profileImage }} 
              style={styles.profileImage}
              imageStyle={styles.profileImageBackground}
            >
              <View style={styles.flagContainer}>
                <Image source={{ uri: item.countryFlag }} style={styles.flagImage} />
              </View>
            </ImageBackground>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
            <Text style={[styles.boldText,{alignSelf:'center'}]}>No Matches Found</Text>
        }
      />

        </View>
    )
}

export default Category;

const styles = StyleSheet.create({
  itemContainer: {
   marginHorizontal:15,
  width:80,
  paddingVertical:15
  },
  container:{
  paddingVertical:15,
  marginVertical:15,
  backgroundColor:'#e9ecef'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"black"
  },
  countryFlag: {
    width: 30,
    height: 20,

  },
  profileImageBackground: {
    borderRadius: 30,
  },
  image: {
    width: '70%',
    height: 80,
    borderRadius: 50,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  flagContainer: {
    position: 'absolute',
    left: '80%',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagImage: {
    width: 20,
    height: 20,
    borderRadius:10
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color:"black"
  },
  Container: {
    flex: 1,

  }, wrapDot: {

    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    // position: 'absolute',
    zIndex: 1,
    bottom: 20
  },
  dotActive: {
    margin: 3,
    color: '#973D00',
    marginTop: 20,
    fontSize: 20

  },
  dot: {
    margin: 3,
    color: 'gray',
    marginTop: 20,
    fontSize: 20
  },
  boldText:{
     color: 'black', 
     alignSelf: 'center', 
     fontSize: 16,
      fontWeight: '600'
  }

});
