import { useForm } from 'react-hook-form';
import { icons } from '../../assets/icons';

import { yupResolver } from '@hookform/resolvers/yup';
import { userSettingsFormSchema } from '../../schemas/UserSettingsFormSchema';

import avatar from '../../assets/images/avatar.png';
import css from './UserSettingsForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserAvatar } from '../../redux/selectors';
import { updateUser } from '../../redux/auth/operations';
import { useRef, useState } from 'react';

const UserSettingsForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);

  // avatar change
  const currentAvatar = useSelector(selectUserAvatar);
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(currentAvatar);

  const onFileChange = event => {
    const selectedAvatar = event.target.files[0];
    if (selectedAvatar) {
      setPreview(URL.createObjectURL(selectedAvatar));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSettingsFormSchema),
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      gender: currentUser?.gender || 'woman',
      weight: currentUser?.weight || '',
      sportTime: currentUser?.sportTime || '',
      dailyNorma: currentUser?.dailyNorma || '',
    },
  });

  const gender = watch('gender');

  const calcWaterByGender = gender => {
    const weight = parseFloat(watch('weight')) || 0;
    const sportTime = parseFloat(watch('sportTime')) || 0;

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

  const onSubmit = async formData => {
    console.log(formData);
    dispatch(updateUser(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.imageWrapper}>
        <div className={css.imageContainer}>
          <img className={css.image} src={preview} alt="User avatar" width="75" height="75" />
        </div>
        <label className={css.upload}>
          <input
            className={css.imageInput}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInputRef}
            // {...register('avatar')}
          />
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
                  <use
                    xlinkHref={`${icons}#icon-checkbox-${
                      gender === 'woman' ? 'checked' : 'unchecked'
                    }`}
                  ></use>
                </svg>
              </span>
              Woman
            </label>
            <label className={`${css.genderButton} ${css.text}`}>
              <input
                className={css.genderInput}
                type="radio"
                name="gender"
                value="man"
                {...register('gender')}
              />
              {errors.gender && <p className={css.error}>{errors.gender.message}</p>}
              <span className={css.iconWrapper}>
                <svg className={css.radioIcon} width="18" height="18">
                  <use
                    xlinkHref={`${icons}#icon-checkbox-${
                      gender === 'man' ? 'checked' : 'unchecked'
                    }`}
                  ></use>
                </svg>
              </span>
              Man
            </label>
          </div>
        </div>

        <div className={css.formFlexWrapper}>
          <div className={css.formFlexItem}>
            <div className={css.userInroWrapper}>
              <div className={css.userInputWrap}>
                <label className={css.userInputTitle} htmlFor="name">
                  Your name
                </label>
                <input
                  className={`${css.userInput} ${css.text}`}
                  type="text"
                  name="name"
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
                  id="email"
                  {...register('email')}
                />
                {errors.email && <p className={css.error}>{errors.email.message}</p>}
              </div>
            </div>

            <div className={css.dailyNormaWrap}>
              <h2 className={css.inputTitle}>My daily norma</h2>
              <div className={css.flexWrap}>
                <div className={css.dailyInfoWrapper}>
                  <h3 className={css.text}>For woman:</h3>
                  <p className={css.accentText}>V=(M*0,03) + (T*0,4)</p>
                </div>
                <div className={css.dailyInfoWrapper}>
                  <h3 className={css.text}>For man:</h3>
                  <p className={css.accentText}>V=(M*0,04) + (T*0,6)</p>
                </div>
              </div>

              <div>
                <p className={`${css.text} ${css.waterInfo}`}>
                  <span className={css.accentText}>*</span> V is the volume of the water norm in
                  liters per day, M is your body weight, T is the time of active sports, or another
                  type of activity commensurate in terms of loads (in the absence of these, you must
                  set 0)
                </p>
                <div className={css.activityWrapper}>
                  <svg className={css.iconImportant} width="18" height="18">
                    <use xlinkHref={`${icons}#icon-important`}></use>
                  </svg>
                  <p className={css.text}>Active time in hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className={css.formFlexItem}>
            <div className={css.waterNormaWrapper}>
              <div className={css.userInputWrap}>
                <label className={`${css.text} ${css.calcInput}`} htmlFor="weight">
                  Your weight in kilograms:
                </label>
                <input
                  className={`${css.userInput} ${css.text}`}
                  name="weight"
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
                  {...register('sportTime')}
                />
                {errors.timeInSports && <p className={css.error}>{errors.timeInSports.message}</p>}
              </div>
            </div>

            <div className={css.amountWrap}>
              <h3 className={css.text}>
                The required amount of water in liters per day:{' '}
                <span className={css.accentTextL}>{calcWaterByGender(gender)} L</span>
              </h3>
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
      </div>

      <button className={`${css.submitButton} ${css.text}`} type="submit">
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
