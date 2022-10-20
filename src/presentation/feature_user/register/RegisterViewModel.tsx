import {useState} from 'react';
import {Job} from '../../../domain/model/Job';
import {UserRegister} from '../../../domain/use_case/UserRegister';
import {handleGetImage} from '../../utils/Methods';

export default function RegisterViewModel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageUrl: '',
    job: 'Pilot' as Job,
  });
  const [errors, setErrors] = useState({
    message: null,
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    imageUrl: null,
    job: null,
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(onSuccess: Function) {
    setLoading(true);
    let {data, error} = await UserRegister(formData);
    if (data === null) {
      setErrors({
        name: error?.name,
        email: error?.email,
        password: error?.password,
        confirmPassword: error?.confirmPassword,
        imageUrl: error?.imageUrl,
        job: error?.job,
        message: error?.message,
      });
    } else {
      onSuccess();
    }
    setLoading(false);
  }

  async function onGetImage() {
    const result = await handleGetImage();
    if (result?.assets) {
      const imageUrl = result.assets[0].uri;
      if (imageUrl) {
        setFormData({...formData, imageUrl: imageUrl});
      }
    }
  }

  function setForm(type: string, value: string | Job) {
    setFormData({...formData, [type]: value});
  }

  return {
    formData,
    errors,
    loading,
    setForm,
    onSubmit,
    onGetImage,
  };
}
