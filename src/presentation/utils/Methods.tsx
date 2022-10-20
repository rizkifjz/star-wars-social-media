import {PermissionsAndroid} from 'react-native';
import {
  CameraOptions,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';

export async function handleGetImage(): Promise<ImagePickerResponse | null> {
  try {
    const permissions = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      permissions['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      permissions['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      const options: CameraOptions = {
        mediaType: 'photo',
        saveToPhotos: true,
      };
      const result = await launchCamera(options);
      return result;
    } else {
      console.log('permissions denied');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function isValidString(s: string) {
  if (s && s !== '') {
    return true;
  }
  return false;
}
