import { useState } from "react";
import api from "../api";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log("Current Step:", step);

  const handleForgot = async () => {
  try {
    setLoading(true);

    const res = await api.post("/auth/forgot", { email });

    if (res.data.message === "OTP sent successfully") {
      setStep(2);
    } else {
      alert(res.data.message);
    }

  } catch (err) {
    alert(err.response?.data?.message || "Error sending OTP");
  } finally {
    setLoading(false);   // 🔥 VERY IMPORTANT
  }
};

  const handleReset = async () => {
    try {
      setLoading(true);
      await api.post("/auth/reset", {
        email,
        otp,
        password,
      });
      alert("Password reset successful");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        {step === 1 && (
          <>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleForgot} disabled={loading}>
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Enter OTP & Reset Password</h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleReset} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {step === 3 && (
          <h3>Password updated successfully! Now login.</h3>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;