import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

interface RegisterFormValues {
  name: string;
  dob: string;
  email: string;
  gender: string;
  role: string;
  password: string;
  experience?: number;
  description?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    name: "",
    dob: "",
    email: "",
    gender: "",
    role: "user",
    password: "",
    experience: 0,
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    dob: Yup.string().required("Date of Birth is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    gender: Yup.string().oneOf(["male", "female", "other"], "Select a valid gender").required("Gender is required"),
    role: Yup.string().oneOf(["user", "dietician", "admin"], "Select a valid role").required("Role is required"),
    password: Yup.string().required("Password is required"),
    experience: Yup.number().nullable(),
    description: Yup.string().nullable(),
  });

  const onSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/register", values);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Register to Diet Generator App
        </h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium">Name</label>
              <Field type="text" name="name" id="name" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="dob" className="block font-medium">Date of Birth</label>
              <Field type="date" name="dob" id="dob" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">Email</label>
              <Field type="email" name="email" id="email" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="gender" className="block font-medium">Gender</label>
              <Field as="select" name="gender" id="gender" className="w-full px-3 py-2 border rounded-md">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-medium">Role</label>
              <Field as="select" name="role" id="role" className="w-full px-3 py-2 border rounded-md">
                <option value="user">User</option>
                <option value="dietician">Dietician</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <Field type="password" name="password" id="password" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="experience" className="block font-medium">Experience (Years)</label>
              <Field type="number" name="experience" id="experience" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium">Description</label>
              <Field as="textarea" name="description" id="description" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
              Register
            </button>
          </Form>
        </Formik>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
