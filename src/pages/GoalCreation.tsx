import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface GoalFormValues {
  height: number;
  currentWeight: number;
  targetedWeight: number;
  healthDescription: string;
}

const CreateGoalForm: React.FC = () => {
    const navigate = useNavigate();
  const initialValues: GoalFormValues = {
    height: 0,
    currentWeight: 0,
    targetedWeight: 0,
    healthDescription: "",
  };

  const validationSchema = Yup.object({
    height: Yup.number().min(50).max(250).required("Height is required"),
    currentWeight: Yup.number().min(20).max(300).required("Current weight is required"),
    targetedWeight: Yup.number().min(20).max(300).required("Targeted weight is required"),
    healthDescription: Yup.string().required("Health description is required"),
  });

  const handleSubmit = async (
    values: GoalFormValues,
    { setSubmitting }: FormikHelpers<GoalFormValues>
  ) => {
    try {
      const user = localStorage.getItem("profile");
      const userId = JSON.parse(user!)?.id;

      const payload = {
        ...values,
        userId,
        dieticianId:'687b52fd6a48924dc3eef18c',
        bmiReport:'687b7ba308eed3378e0596ef'
      };

      const response = await axios.post("http://localhost:5000/api/v1/goal/", payload);
     alert('goal created')
     console.log(response)
     navigate('/dashboard/goalData')
    } catch (error) {
      console.error("Error creating goal:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Your Health Goal
        </h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-4">
            <div>
              <label htmlFor="height" className="block font-medium">Height (cm)</label>
              <Field type="number" name="height" id="height" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="height" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="currentWeight" className="block font-medium">Current Weight (kg)</label>
              <Field type="number" name="currentWeight" id="currentWeight" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="currentWeight" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="targetedWeight" className="block font-medium">Targeted Weight (kg)</label>
              <Field type="number" name="targetedWeight" id="targetedWeight" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="targetedWeight" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="healthDescription" className="block font-medium">Health Description</label>
              <Field as="textarea" name="healthDescription" id="healthDescription" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="healthDescription" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
              Submit Goal
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateGoalForm;
