
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/login", values);

      if (response.status === 200) {
        const profile = {
          email: response.data.user.email,
          role: response.data.user.role,
          id: response.data.user._id,
        };
        dispatch(login({ accessToken: response.data.token, user: profile }));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses allowed")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login to Diet Generator App
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium">Email</label>
              <Field
                type="text"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Login
            </button>
          </Form>
        </Formik>
        <div className="mt-4 text-center">
          New user?{" "}
          <Link to="/register" className="text-green-700 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
