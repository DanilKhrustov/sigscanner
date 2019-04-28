import React from 'react';
import { Alert, Button, Image, View } from 'react-native';
import { ImagePicker, MediaLibrary, takeSnapshotAsync } from 'expo';


export default class GalleryScreen extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button title="Save cropped photo" onPress={this._saveImage} />

      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  _saveImage = async () => {
    await MediaLibrary.createAssetAsync(this.state.image);
    Alert.alert('Cropped photo saved!');
  };
}
