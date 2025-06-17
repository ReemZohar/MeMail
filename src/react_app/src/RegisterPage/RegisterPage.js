import { useState } from 'react'
import ChooseNameCard from './RegisterCards/ChooseNameCard/ChooseNameCard'
import ChooseDateCard from './RegisterCards/ChooseDateCard/ChooseDateCard'
import ChooseMailCard from './RegisterCards/ChooseMailCard/ChooseMailCard'
import ChoosePasswordCard from './RegisterCards/ChoosePasswordCard/ChoosePasswordCard'
import ChooseAvatarCard from './RegisterCards/ChooseAvatarCard/ChooseAvatarCard'
import avatars from './avatars/avatars'

export default function RegisterPage({ theme }) {
    const [step, setStep] = useState(0);

    // this object will collect EVERYTHING that the server expects:
    //  { username, password, confirmPassword, name, avatar }
    const [data, setData] = useState({
        firstName: '', surname: '',
        day: '', month: '1', year: '',
        gender: '1', mail: '',
        password: '', confirmPassword: '',
        avatar: null
    })

    const next = () => setStep((s) => s + 1)

    //helper to update any single field in data
    const update = (field) => (value) => {
        setData((d) => ({ ...d, [field]: value }))
    }

    //final submission: assemble server payload
    const handleSubmit = async () => {
        const payload = {
            name: data.firstName,
            surname: data.surname,
            gender: defineGender(data.gender),
            day: data.day,
            month: data.month,
            year: data.year,
            username: data.mail,
            password: data.password,
            confirmPassword: data.confirmPassword,
            avatar: data.avatar
        }

        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        //user registered successfully scenario
        if (res.ok) {
            const user = await res.json()
            console.log('registered', user)
        } else {
            const err = await res.json()
            console.error('error', err)
        }
    }

    //converts the gender number selected to a name string
    const defineGender = (gender) => {
        const femInd = 1, maleInd = 2;
        if(gender == femInd) {
            return "Female";
        }
        else if(gender == maleInd) {
            return "Male";
        } else {
            return "Rather not say";
        }
    }

    //pick which card to show
    switch (step) {
        case 0:
            return <ChooseNameCard
                theme={theme}
                valueFirst={data.firstName}
                onChangeFirst={e => update('firstName')(e.target.value)}
                valueSurname={data.surname}
                onChangeSurname={e => update('surname')(e.target.value)}
                onNext={next}
            />

        case 1:
            return <ChooseDateCard
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

        case 2:
            return <ChooseMailCard
                theme={theme}
                value={data.mail}
                onChange={e => update('mail')(e.target.value)}
                onNext={next}
            />

        case 3:
            return <ChoosePasswordCard
                theme={theme}
                password={data.password}
                onChangePassword={e => update('password')(e.target.value)}
                confirmPassword={data.confirmPassword}
                onChangeConfirm={e => update('confirmPassword')(e.target.value)}
                onNext={next}
            />

        case 4:
            return <ChooseAvatarCard
                theme={theme}
                selectedAvatar={data.avatar}
                existingAvatars={avatars}
                onSelectAvatar={(url) => update('avatar')(url)}
                onNext={handleSubmit}
            />

        default:
            return null
    }
}
