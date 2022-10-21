import {useEffect, useState} from 'react';
import {Group} from '../../../domain/model/Group';
import {User} from '../../../domain/model/User';
import {GetStarshipDetails} from '../../../domain/use_case/GetStarshipDetails';
import {GetUserDetails} from '../../../domain/use_case/GetUserDetails';

export default function GroupDetailsViewModel(group: Group) {
  const [chartData, setChartData] = useState<any>([]);
  const [starships, setStarships] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createChartData(group);
    getStarships(group.joinedUser);
  }, [group]);

  function createChartData(g: Group) {
    const jediAmount = g.joinedUser.filter(user => user.job === 'Jedi').length;
    const sithAmount = g.joinedUser.filter(user => user.job === 'Sith').length;
    const generalAmount = g.joinedUser.filter(
      user => user.job === 'General',
    ).length;
    const commanderAmount = g.joinedUser.filter(
      user => user.job === 'Commander',
    ).length;
    const pilotAmount = g.joinedUser.filter(
      user => user.job === 'Pilot',
    ).length;

    const data = [];
    if (jediAmount > 0) {
      data.push({name: 'Jedi', population: jediAmount});
    }
    if (generalAmount > 0) {
      data.push({name: 'General', population: generalAmount});
    }
    if (commanderAmount > 0) {
      data.push({name: 'Commander', population: commanderAmount});
    }
    if (pilotAmount > 0) {
      data.push({name: 'Pilot', population: pilotAmount});
    }
    if (sithAmount > 0) {
      data.push({name: 'Sith', population: sithAmount});
    }
    setChartData(data);
  }

  async function getStarships(users: User[]) {
    let result = '';
    users.forEach(async user => {
      setLoading(true);
      const {data: userData} = await GetUserDetails(user.name);
      if (userData && userData.starships.length > 0) {
        userData.starships.forEach(async url => {
          setLoading(true);
          const {data: starshipData} = await GetStarshipDetails(url);
          if (starshipData) {
            if (result !== '') {
              result = result.concat(',\n');
            }
            result = result.concat(
              `${starshipData.name} (${starshipData.model})`,
            );
          }
          setLoading(false);
          setStarships(result);
        });
      }
      setLoading(false);
    });
  }

  return {
    chartData,
    starships,
    loading,
  };
}
