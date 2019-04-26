import React from 'react';
import Expo, { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, FileSystem, MediaLibrary, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    rollGranted: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ cameraGranted: true });
    } else {
      this.setState({ cameraGranted: false });
      console.log('Uh oh! The user has not granted us permission.');
    }
    this.getCameraRollPermissions();
  }

  async getCameraRollPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ rollGranted: true });
    } else {
      console.log('Uh oh! The user has not granted us permission.');
      this.setState({ rollGranted: false });
    }
  }

  takePictureAndCreateAlbum = async () => {
    console.log('tpaca');
    const { uri } = await this.camera.takePictureAsync();
    console.log('uri', uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log('asset', asset);
    MediaLibrary.createAlbumAsync('Expo', asset)
      .then(() => {
        Alert.alert('Album created!');
      })
      .catch(error => {
        Alert.alert('An Error Occurred!' + error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <TouchableOpacity
          onPress={() =>
            (this.state.rollGranted && this.state.cameraGranted
              ? this.takePictureAndCreateAlbum()
              : Alert.alert('Permissions not granted'))
          }
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Snap
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});



//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera
//             style={{ flex: 1 }}
//             type={this.state.type}
//             ref={ref => {
//               this.camera = ref;
//             }}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type:
//                       this.state.type === Camera.Constants.Type.back
//                         ? Camera.Constants.Type.front
//                         : Camera.Constants.Type.back,
//                   });
//                 }}
//               >
//                 <Text
//                   style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
//                 >
//                   {' '}
//                   Flip{' '}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() =>
//                   (this.state.rollGranted && this.state.cameraGranted
//                     ? this.takePictureAndCreateAlbum()
//                     : Alert.alert('Permissions not granted'))
//                 }
//                 style={styles.buttonContainer}
//               >
//                 <View style={styles.button}>
//                   <Text style={styles.buttonText}>Snap</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   button: {
//     width: 200,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 4,
//     paddingVertical: 4,
//     borderWidth: 1.5,
//     borderColor: '#fff',
//   },
//   buttonText: {
//     fontSize: 24,
//     color: '#fff',
//   },
// });

