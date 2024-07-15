
import { NavLink } from 'react-router-dom'
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={css.backdrop}>
        <nav className={css.navlist}>
        <NavLink className={css.navBtnUp} to="/signup">Try tracker</NavLink>
        <NavLink className={css.navBtnIn} to="/signin">Sign In</NavLink>
      </nav>
    </div>
  )
}

export default Navigation