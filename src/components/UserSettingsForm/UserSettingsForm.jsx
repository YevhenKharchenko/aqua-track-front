import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { icons } from '../../assets/icons';

const UserSettingsForm = () => {
  const [avatar, setAvatar] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <img src="" alt="User avatar" />
        </div>
        <label>
          <input type="file" accept="image/*" />
          <svg width="18" height="18">
            <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
          </svg>
          <p>Upload a photo</p>
        </label>
      </div>

      <div>
        <h2>Your gender identity</h2>
        <div>
          <label>
            <input type="radio" name="gender" value="woman" {...register('gender')} />
            <span>
              <svg width="18" height="18">
                <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
              </svg>
            </span>
            Woman
          </label>
          <label>
            <input type="radio" name="gender" value="man" {...register('gender')} />
            <span>
              <svg width="18" height="18">
                <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
              </svg>
            </span>
            Man
          </label>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" {...register('name')} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" {...register('email')} />
        </div>

        <div>
          <h2>My daily norma</h2>
          <div>
            <h3>For woman:</h3>
            <p>V=(M*0,03) + (T*0,4)</p>
          </div>
          <div>
            <h3>For man:</h3>
            <p>V=(M*0,04) + (T*0,6)</p>
          </div>
        </div>
        <div>
          <p>
            <span>*</span>V is the volume of the water norm in liters per day, M is your body
            weight, T is the time of active sports, or another type of activity commensurate in
            terms of loads (in the absence of these, you must set 0)
          </p>
          <svg width="18" height="18">
            <use xlinkHref={`${icons}#icon-upload-18x18`}></use>
          </svg>
          <p>Active time in hours</p>
        </div>
      </div>

      <div>
        <label>Your weight in kilograms:</label>
        <input type="number" name="weight" {...register('weight')} />
        <label>The time of active participation in sports:</label>
        <input type="number" name="timeInSports" {...register('timeInSports')} />
        <h3>The required amount of water in liters per day:</h3>
        <p> L</p>
        <label>Write down how much water you will drink:</label>
        <input name="dailyWaterNorma" step={0.1} {...register('dailyWaterNorma')} />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default UserSettingsForm;
