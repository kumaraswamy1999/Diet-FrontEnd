import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface BMIFormValues {
  type: "self" | "other";
  height: number;
  weight: number;
  personalInfo: {
    name?: string;
    age?: number;
    gender?: string;
  };
}

const BMICalculatorForm: React.FC = () => {
    const [bmi,setBmi] = useState(0);
  const user = localStorage.getItem("profile");
  const userId = JSON.parse(user!)?.id;

  const initialValues: BMIFormValues = {
    type: "self",
    height: 0,
    weight: 0,
    personalInfo: {
      name: "",
      age: undefined,
      gender: "",
    },
  };

  

  const validationSchema = Yup.object({
    type: Yup.string().oneOf(["self", "other"]).required("Type is required"),
    height: Yup.number().min(50).max(250).required("Height is required"),
    weight: Yup.number().min(20).max(300).required("Weight is required"),
    personalInfo: Yup.object().shape({
      name: Yup.string().when("type", {
        is: "other",
        then: (schema) => schema.required("Name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      age: Yup.number().when("type", {
        is: "other",
        then: (schema) => schema.required("Age is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      gender: Yup.string().when("type", {
        is: "other",
        then: (schema) => schema.required("Gender is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  });

  const handleSubmit = async (
    values: BMIFormValues,
    { setSubmitting }: FormikHelpers<BMIFormValues>
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/bmi/createBMI", {
        ...values,
        userId,
      });
      
      alert(`your BMI is ${response.data.BMI}. You are ${response.data.category}`)
    } catch (error) {
      console.error("Error creating BMI report:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create BMI Report
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="type" className="block font-medium">
                  Type
                </label>
                <Field
                  as="select"
                  name="type"
                  id="type"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="self">Self</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="height" className="block font-medium">
                  Height (cm)
                </label>
                <Field
                  type="number"
                  name="height"
                  id="height"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="height"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block font-medium">
                  Weight (kg)
                </label>
                <Field
                  type="number"
                  name="weight"
                  id="weight"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {values.type === "other" && (
                <>
                  <div>
                    <label htmlFor="personalInfo.name" className="block font-medium">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="personalInfo.name"
                      id="personalInfo.name"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="personalInfo.name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="personalInfo.age" className="block font-medium">
                      Age
                    </label>
                    <Field
                      type="number"
                      name="personalInfo.age"
                      id="personalInfo.age"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="personalInfo.age"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="personalInfo.gender" className="block font-medium">
                      Gender
                    </label>
                    <Field
                      as="select"
                      name="personalInfo.gender"
                      id="personalInfo.gender"
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="personalInfo.gender"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    </div>
                    </>
                    )}
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Submit BMI Report
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BMICalculatorForm;
