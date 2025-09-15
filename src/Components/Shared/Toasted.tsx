// src/components/Shared/ToastMessage.tsx
import React from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastMessageProps {
  title: string;
  description: string;
  type?: "success" | "error" | "info" | "warning";
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  title,
  description,
  type = "success",
}) => {
  const getColorClasses = () => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-100",
          border: "border-red-400",
          text: "text-red-700",
        };
      case "warning":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-400",
          text: "text-yellow-700",
        };
      case "info":
        return {
          bg: "bg-blue-100",
          border: "border-blue-400",
          text: "text-blue-700",
        };
      default:
        return {
          bg: "bg-green-100",
          border: "border-green-400",
          text: "text-green-700",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div
      className={`flex items-center gap-2 ${colors.bg} ${colors.border} border rounded-md px-3 py-2 w-full max-w-xs shadow-md animate-fade-in-up`}
    >
      <p className={`${colors.text} text-sm font-medium truncate`}>
        {title} - {description}
      </p>
    </div>
  );
};

// 🔥 Utility to trigger custom toast
const showToast = (
  type: "success" | "error" | "warning" | "info",
  title: string,
  description: string
) => {
  toast(<ToastMessage title={title} description={description} type={type} />, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};

export const ToastUtils = {
  departmentCreated: () =>
    showToast("success", "Success", "Department created successfully!"),
  departmentSave: () =>
    showToast("success", "Success", "Department data saved!"),
  departmentFillError: () =>
    showToast("warning", "Warning", "Please fill all fields!"),
  departmentFillCorrect: () =>
    showToast("warning", "Warning", "Please fill all fields correctly!"),
  labCreated: () =>
    showToast("success", "Success", "Lab created successfully!"),
  labLoadFail: () =>
    showToast("error", "Error", "Failed to load lab facilities"),
  labRequestsFail: () =>
    showToast("error", "Error", "Failed to load lab requests"),
  labAssignWarn: () =>
    showToast("warning", "Warning", "Please assign labs to all requests"),
  labAssignSuccess: (msg?: string) =>
    showToast("success", "Success", msg || "Lab assignments submitted!"),
  submissionFail: () => showToast("error", "Error", "Submission failed"),

  loginEmpty: () =>
    showToast("error", "Error", "Please enter both username and password."),
  loginSuccess: () => showToast("success", "Success", "Login successful!"),
  loginIncorrect: () =>
    showToast("error", "Error", "Incorrect username or password."),
  loginFailed: () =>
    showToast("error", "Error", "Login failed. Please try again."),
  loginServerError: () =>
    showToast("error", "Error", "Server error. Please try again later."),

  staffSaveSuccess: () =>
    showToast("success", "Success", "Staff data saved successfully!"),
  staffSaveFail: () =>
    showToast("error", "Error", "Failed to save staff data."),
  staffSaveError: () =>
    showToast("error", "Error", "Something went wrong while saving data."),
  staffUpdateSuccess: (msg?: string) =>
    showToast("success", "Success", msg || "Staff record updated successfully"),
  staffUpdateFail: () =>
    showToast("error", "Error", "Failed to update staff record"),

  subjectFillWarn: () =>
    showToast("warning", "Warning", "Please fill all subject fields!"),
  subjectAdded: () => showToast("success", "Success", "Subject added!"),
  subjectSaveEmpty: () =>
    showToast("warning", "Warning", "No subjects to save!"),
  subjectSaveFail: () =>
    showToast("error", "Error", "Error saving one or more subjects."),
  subjectStaffWarn: () =>
    showToast("warning", "Warning", "Please select a staff member"),
  subjectUpdateSuccess: (msg?: string) =>
    showToast("success", "Success", msg || "Subject updated successfully"),
  subjectUpdateFail: () =>
    showToast("error", "Error", "Failed to update subject"),

  labTimetableExport: () =>
    showToast("success", "Success", "Lab timetable exported as PDF"),
  staffTimetableExport: () =>
    showToast("success", "Success", "Timetable exported as PDF!"),
  labSelectWarn: () =>
    showToast("warning", "Warning", "Please select a Lab ID"),
  deptSelectWarn: () =>
    showToast("warning", "Warning", "Please select all fields including Department!"),
  genericError: () => showToast("error", "Error", "Failed to load data."),
};

// ✅ Toast Container Provider
export const ToastProvider = () => (
  <ToastContainer transition={Slide} newestOnTop />
);

/* ✅ Add this to your global.css or tailwind.css for extra smooth fade-in */
