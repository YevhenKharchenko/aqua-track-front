// import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { icons } from '../../assets/icons';

import { yupResolver } from '@hookform/resolvers/yup';
import { userSettingsFormSchema } from '../../schemas/UserSettingsFormSchema';

import avatar from '../../assets/images/avatar.png';
import css from './UserSettingsForm.module.css';


const UserSettingsForm = () => {
  // avatar change

  // const [userAvatar, setUserAvatar] = useState(null);
  // const avatarRef = useRef(null);

  // const onAvatarChange = event => {
  //   const avatarUpload = event.target.files[0];
  //   setUserAvatar(avatarUpload);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSettingsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: 'woman',
      weight: 0,
      sportTime: 0,
      dailyNorma: 0,
    },
  });

 const calcWaterByGender = () => {
   const weight = parseFloat(watch('weight')) || 0;
   const sportTime = parseFloat(watch('sportTime')) || 0;
   const gender = watch('gender');

   const coefficients = {
     woman: { weight: 0.03, sport: 0.4 },
     man: { weight: 0.04, sport: 0.6 },
   };

   if (gender && coefficients[gender]) {
     const { weight: weightCoeff, sport: sportCoeff } = coefficients[gender];
     return (weight * weightCoeff + sportTime * sportCoeff).toFixed(1);
   }

   return 0;
 };

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className={css.imageWrapper}>
        <div className={css.imageContainer}>
          <img className={css.image} src={avatar} alt="User avatar" width="75" height="75" />
        </div>
        <label className={css.upload}>
          <input className={css.imageInput} type="file" accept="image/*" />
          <svg className={css.uploadIcon} width="18" height="18">
            <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
          </svg>
          <p className={css.text}>Upload a photo</p>
        </label>
      </div>

      <div className={css.formWrapper}>
        <div>
          <h2 className={css.inputTitle}>Your gender identity</h2>

          <div className={css.genderInputWrapper}>
            <label className={`${css.genderButton} ${css.text}`}>
              <input
                className={css.genderInput}
                type="radio"
                name="gender"
                value="woman"
                {...register('gender')}
              />
              {errors.gender && <p className={css.error}>{errors.gender.message}</p>}
              <span className={css.iconWrapper}>
                <svg className={css.radioIcon} width="18" height="18">
                  <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
                </svg>
              </span>
              Woman
            </label>
            <label className={`${css.genderButton} ${css.text}`}>
              <input
                className={css.genderInput}
                type="radio"
                name="gender"
                value="woman"
                {...register('gender')}
              />
              {errors.gender && <p className={css.error}>{errors.gender.message}</p>}
              <span className={css.iconWrapper}>
                <svg className={css.radioIcon} width="18" height="18">
                  <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
                </svg>
              </span>
              Man
            </label>
          </div>
        </div>

        <div className={css.userInroWrapper}>
          <div className={css.userInputWrap}>
            <label className={css.userInputTitle} htmlFor="name">
              Your name
            </label>
            <input
              className={`${css.userInput} ${css.text}`}
              type="text"
              name="name"
              placeholder="Nadia"
              id="name"
              {...register('name')}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.userInputWrap}>
            <label className={css.userInputTitle} htmlFor="email">
              Email
            </label>
            <input
              className={`${css.userInput} ${css.text}`}
              type="email"
              name="email"
              placeholder="nadia10@gmail.com"
              id="email"
              {...register('email')}
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </div>
        </div>

        <div className={css.dailyNormaWrap}>
          <h2 className={css.inputTitle}>My daily norma</h2>
          <div className={css.dailyInfoWrapper}>
            <h3 className={css.text}>For woman:</h3>
            <p className={css.accentText}>V=(M*0,03) + (T*0,4)</p>
          </div>
          <div className={css.dailyInfoWrapper}>
            <h3 className={css.text}>For man:</h3>
            <p className={css.accentText}>V=(M*0,04) + (T*0,6)</p>
          </div>

          <div>
            <p className={`${css.waterInfo} ${css.text}`}>
              <span className={css.accentText}>*</span> V is the volume of the water norm in liters
              per day, M is your body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these, you must set 0)
            </p>
            <div className={css.activityWrapper}>
              <svg width="18" height="18">
                <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
              </svg>
              <p className={css.text}>Active time in hours</p>
            </div>
          </div>
        </div>

        <div className={css.waterNormaWrapper}>
          <div className={css.userInputWrap}>
            <label className={`${css.text} ${css.calcInput}`} htmlFor="weight">
              Your weight in kilograms:
            </label>
            <input
              className={`${css.userInput} ${css.text}`}
              name="weight"
              placeholder="0"
              {...register('weight')}
            />
            {errors.weight && <p className={css.error}>{errors.weight.message}</p>}
          </div>

          <div className={css.userInputWrap}>
            <label className={`${css.text} ${css.calcInput}`} htmlFor="sportTime">
              The time of active participation in sports:
            </label>
            <input
              className={`${css.userInput} ${css.text}`}
              name="sportTime"
              placeholder="0"
              {...register('sportTime')}
            />
            {errors.timeInSports && <p className={css.error}>{errors.timeInSports.message}</p>}
          </div>
        </div>

        <div>
          <div className={css.amountWrap}>
            <h3 className={css.text}>The required amount of water in liters per day:</h3>
            <p className={css.accentText}>{calcWaterByGender()} L</p>
          </div>
          <div className={css.userInputWrap}>
            <label className={css.userInputTitle} htmlFor="dailyNorma">
              Write down how much water you will drink:
            </label>
            <input
              className={`${css.userInput} ${css.text}`}
              name="dailyNorma"
              step={0.1}
              {...register('dailyNorma')}
            />
            {errors.dailyWaterNorma && (
              <p className={css.error}>{errors.dailyWaterNorma.message}</p>
            )}
          </div>
        </div>
      </div>

      <button className={`${css.submitButton} ${css.text}`} type="submit">
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
