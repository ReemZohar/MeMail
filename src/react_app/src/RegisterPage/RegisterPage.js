import { useState } from 'react'
import ChooseNameCard from './RegisterCards/ChooseNameCard/ChooseNameCard'
import ChooseDateCard from './RegisterCards/ChooseDateCard/ChooseDateCard'
import ChooseMailCard from './RegisterCards/ChooseMailCard/ChooseMailCard'
import ChoosePasswordCard from './RegisterCards/ChoosePasswordCard/ChoosePasswordCard'
import ChooseAvatarCard from './RegisterCards/ChooseAvatarCard/ChooseAvatarCard'
import DarkModeButton from '../DarkModeButton/DarkModeButton';
import avatars from './avatars/avatars'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage({ theme }) {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    //object collects all fields expected by the server
    const [data, setData] = useState({
        firstName: '',
        surname: '',
        day: '',
        month: '1',
        year: '',
        gender: '1',
        mail: '',
        password: '',
        confirmPassword: '',
        avatar: null,
        avatarFile: null
    })

    //converts the gender number selected to a name string
    const defineGender = (gender) => {
        const femInd = 1, maleInd = 2;
        if (gender == femInd) {
            return "Female";
        }
        else if (gender == maleInd) {
            return "Male";
        } else {
            return "Rather not say";
        }
    }

    const next = () => setStep((s) => s + 1)

    //helper to update any single field in data
    const update = (field) => (value) => {
        setData((d) => ({ ...d, [field]: value }))
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', data.firstName);
        formData.append('surname', data.surname);
        formData.append('gender', defineGender(data.gender));
        formData.append('day', data.day);
        formData.append('month', data.month);
        formData.append('year', data.year);
        formData.append('username', data.mail);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);

        if (data.avatarFile) {
            //user uploaded an avatar scenario
            formData.append('avatar', data.avatarFile);
        } else {
            //exisiting avatar was chosen scenario
            formData.append('avatar', data.avatar);
        }

        const res = await fetch('http://localhost:9090/api/users', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const user = await res.json();
            console.log('registered', user);
            navigate('/login');
        } else {
            const err = await res.json(); 
            console.error('Registration error', err);
        }
    }

    //pick which card to show
  switch (step) {
    case 0:
      return (
        <>
          <div className="darkmode-top-right"><DarkModeButton /></div>
          <ChooseNameCard
            theme={theme}
            valueFirst={data.firstName}
            onChangeFirst={e => update('firstName')(e.target.value)}
            valueSurname={data.surname}
            onChangeSurname={e => update('surname')(e.target.value)}
            onNext={next}
          />
        </>
      );
    case 1:
      return (
        <>
          <div className="darkmode-top-right"><DarkModeButton /></div>
          <ChooseDateCard
            theme={theme}
            dayValue={data.day}
            onChangeDay={e => update('day')(e.target.value)}
            monthValue={data.month}
            onChangeMonth={e => update('month')(e.target.value)}
            yearValue={data.year}
            onChangeYear={e => update('year')(e.target.value)}
            genderValue={data.gender}
            onChangeGender={e => update('gender')(e.target.value)}
            onNext={next}
          />
        </>
      );
    case 2:
      return (
        <>
          <div className="darkmode-top-right"><DarkModeButton /></div>
          <ChooseMailCard
            theme={theme}
            value={data.mail}
            onChange={e => update('mail')(e.target.value)}
            onNext={next}
          />
        </>
      );
    case 3:
      return (
        <>
          <div className="darkmode-top-right"><DarkModeButton /></div>
          <ChoosePasswordCard
            theme={theme}
            password={data.password}
            onChangePassword={e => update('password')(e.target.value)}
            confirmPassword={data.confirmPassword}
            onChangeConfirm={e => update('confirmPassword')(e.target.value)}
            onNext={next}
          />
        </>
      );
    case 4:
      return (
        <>
          <div className="darkmode-top-right"><DarkModeButton /></div>
          <ChooseAvatarCard
            theme={theme}
            selectedAvatar={data.avatar}
            existingAvatars={avatars}
            onSelectAvatar={(value) => {
              if (value instanceof File) {
                setData(d => ({ ...d, avatarFile: value, avatar: '' }));
              } else {
                setData(d => ({ ...d, avatar: value, avatarFile: null }));
              }
            }}
            onNext={handleSubmit}
          />
        </>
      );
    default:
      return null;
  }
}