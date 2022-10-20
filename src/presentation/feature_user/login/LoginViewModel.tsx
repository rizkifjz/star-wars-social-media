import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {UserLogin} from '../../../domain/use_case/UserLogin';
import {StackParamList} from '../../utils/ScreenNavigation';

export default function LoginViewModel() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [formData, setFormData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({
    message: null,
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    let {data, error} = await UserLogin(formData);
    if (data === null) {
      setErrors({
        email: error?.email,
        password: error?.password,
        message: error?.message,
      });
    } else {
      navigation.navigate('home', {user: data});
    }
    setLoading(false);
  }

  function setForm(email: string | null, password: string | null) {
    if (email) {
      setFormData({...formData, email});
    } else if (password) {
      setFormData({...formData, password});
    }
  }

  return {
    formData,
    errors,
    loading,
    setForm,
    onSubmit,
  };
}
