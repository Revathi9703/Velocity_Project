import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import WelcomeScreen from '../Screen/WelcomeScreen';
import Category from '../Screen/Category';

const CustomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Home' && styles.activeTab]}
          onPress={() => setActiveTab('Home')}>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Updates' && styles.activeTab]}
          onPress={() => setActiveTab('Updates')}>
          <Text style={styles.tabText}>Categories</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.tabContent}>
        {activeTab === 'Home' && (
          <View >
            <WelcomeScreen/>
          </View>
        )}
        {activeTab === 'Updates' && (
          <View style={styles.content}>
            <Category/>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color:'black'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#e91e63',
  },
  tabContent: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default CustomTabNavigator;
