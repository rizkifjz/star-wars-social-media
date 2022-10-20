import {useState, useEffect} from 'react';
import {User} from '../../../domain/model/User';
import {UserDetails} from '../../../domain/model/UserDetails';
import {GetUserDetails} from '../../../domain/use_case/GetUserDetails';

export default function MyDetailsViewModel(user: User) {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onGetDetails(user);
  }, [user]);

  async function onGetDetails(u: User) {
    setLoading(true);
    let {data, error} = await GetUserDetails(u.name);
    if (data === null) {
      let message = `A new ${u.job} has joined the star wars cast`;
      if (error) {
        message = error;
      }
      setErrors(message);
    } else {
      setDetails(data);
    }
    setLoading(false);
  }

  return {
    details,
    errors,
    loading,
  };
}
