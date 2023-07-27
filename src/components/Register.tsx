import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser, checkUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbacksService";

interface RegisterProps {
  setUserInfo: Function;
}
const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(4),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
      phone: yup.number().required().min(10),
      address: yup.string().required().min(7),
    }),

    onSubmit(values) {
      addUser({ ...values, isAdmin: false })
        .then((res) => {
          navigate("/home");

          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              email: res.data.email,
              isAdmin: res.data.isAdmin,
              userId: res.data.id,
            })
          );
          setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
          successMsg(`${values.email} wes registered and logged in`);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <div className="container col-md-3">
        <form onSubmit={formik.handleSubmit}>
          <h3 className="display-3">Register</h3>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingname"
              placeholder="Joan Doe"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="floatingname">Full Name</label>
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger">{formik.errors.name} </small>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email} </small>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password} </small>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="phone"
              className="form-control"
              id="floatingPhone"
              placeholder="phone number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="floatingphone">Number Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-danger">{formik.errors.phone} </small>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="address"
              className="form-control"
              id="floatingaddress"
              placeholder="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="floatingaddress">Address</label>
            {formik.touched.address && formik.errors.address && (
              <small className="text-danger">{formik.errors.address} </small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-secondary my-3 w-100"
            disabled={!formik.isValid || !formik.dirty}
          >
            Register
          </button>
        </form>
        <Link to="/">Already have an account? Login here!</Link>
      </div>
    </>
  );
};

export default Register;
