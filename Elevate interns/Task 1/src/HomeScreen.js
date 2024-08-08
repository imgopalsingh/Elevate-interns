
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, StatusBar, Alert, ScrollView,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { MYPROFILECAMERA_IMAGE, MYPROFILESETTINGICON_IMAGE } from '../utils/ImageConstants'; // Update the path as per your project structure
import { setProfileImage } from '../Redux/Action';  // Import the action


const CustomHeader = () => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('ProfileSettings'); // Replace 'NewScreen' with the name of your target screen
  };

  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor="#00c4cc" barStyle="light-content" />
      <View style={styles.headerContent}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              source={MYPROFILESETTINGICON_IMAGE}
              style={styles.threeDotImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.registrationText}>My Profile</Text>
        </View>
      </View>
    </View>
  );
};

const MyProfile = ({ route }) => {
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.profileImage);

  const handleImagePick = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ' + response.error);
      } else if (response.customButton) {
        Alert.alert('Custom button', 'User tapped custom button: ' + response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        dispatch(setProfileImage(source));
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader />
      <View style={styles.profileContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.label}>Education:</Text>
          <Text style={styles.label}>Skills:</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <View style={styles.imageWrapper}>
              {profileImage ? (
                <Image source={profileImage} style={styles.profileImage} />
              ) : (
                <Text style={styles.imagePlaceholder}>+</Text>
              )}
            </View>
            <Image
              source={MYPROFILECAMERA_IMAGE}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTextsContainer}>
        <Text style={styles.bottomText}>Projects</Text>
        <Text style={styles.bottomText}>Learning</Text>
        <Text style={styles.bottomText}>Points</Text>
      </View>
      <View style={styles.myProfilePostBoxStyle}>
        <View style={styles.textContainer}>
          <TextInput>
            <Text style={styles.containerTopText}>
                 What do you want to tell to everyone?
            </Text>
          </TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {},
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonContainer: {
    backgroundColor: '#00c4cc',
    width: Dimensions.get('window').width * 0.385,
    borderBottomRightRadius: 200,
    paddingBottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threeDotImage: {
    width: 32,
    height: 32,
    marginTop: 60,
    marginBottom: 15,
  },
  titleContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
  },
  registrationText: {
    color: '#1F1F1F',
    marginTop: 20,
    fontSize: 32,
    marginRight: 15,
    fontWeight: '700',
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 35,
  },
  detailsContainer: {
    flex: 3,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 18,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 15,
    marginRight: 30,
  },
  imageWrapper: {
    width: 125,
    height: 125,
    borderRadius: 80,
    backgroundColor: '#97E7FD',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 4.8,
    borderColor: '#0094FF'
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    fontSize: 50,
    color: '#fff',
  },
  cameraIcon: {
    width: 38.2,
    height: 38.2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bottomTextsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 28,
    paddingTop: 65,
  },
  bottomText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '300',
  },
  myProfilePostBoxStyle: {
    paddingTop: 20,
    marginTop: 20,
    margin: 16,
    paddingBottom: 15,
    marginLeft: 19,
    marginRight: 21,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: 'black'
  },
  textContainer: {
    flex: 1,
  },
  containerTopText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 8,
    marginLeft: 30,
    color: '#49688D',
  },
});

export default MyProfile;
