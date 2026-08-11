import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext.tsx";
import api from "../../services/api.ts";
import type { LoginResponse } from "../../types/auth.types.ts";

interface ApiResponse {
  success: boolean;
  data: LoginResponse;
  message?: string;
}

const demoAccounts = [
  { role: "Admin", email: "admin@fundsroom.com", password: "Admin@123" },
  { role: "Sales", email: "sales@fundsroom.com", password: "Sales@123" },
  { role: "Warehouse", email: "warehouse@fundsroom.com", password: "Warehouse@123" },
  { role: "Accounts", email: "accounts@fundsroom.com", password: "Accounts@123" },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({ email: "", password: "" });

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const errors = {
      email: trimmedEmail ? (isValidEmail(trimmedEmail) ? "" : "Please enter a valid email address.") : "Email address is required.",
      password: trimmedPassword ? "" : "Password is required.",
    };

    if (errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<ApiResponse>("/auth/login", { email: trimmedEmail, password: trimmedPassword });
      const { user, token } = res.data.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Login error:", err);
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const handleUseDemo = (account: { email: string; password: string }) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
    setFieldErrors({ email: "", password: "" });
  };

  return (
    <div className="nexus-login">
      <section className="nexus-login-visual">
        <div className="nexus-login-glow" />
        <div className="nexus-login-copy">
          <div className="nexus-login-brand"><span>N</span> Nexus ERP</div>
          <div className="nexus-kicker">Operations Portal</div>
          <h1>Operations, streamlined.</h1>
          <p>Manage customers, products, inventory and sales from one precise, reliable workspace.</p>
          <div className="nexus-login-points">
            {['Customer CRM','Inventory control','Sales challans','Operational reporting'].map(item => <div key={item}><ShieldCheck size={16}/>{item}</div>)}
          </div>
        </div>
      </section>

      <main className="nexus-login-form-wrap">
        <div className="nexus-login-form">
          <div className="nexus-form-brand"><div>N</div><span>Nexus ERP</span></div>
          <div className="nexus-kicker light-blue">Secure sign in</div>
          <h2>Welcome back</h2>
          <p className="nexus-form-help">Use your ERP account to access the operations portal.</p>

          <form onSubmit={handleSubmit} noValidate className="nexus-auth-form">
            <label>Email address</label>
            <div className="nexus-input-icon">
              <Mail size={17}/>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com" disabled={loading} autoComplete="email"/>
            </div>
            {fieldErrors.email && <span className="nexus-field-error">{fieldErrors.email}</span>}

            <label>Password</label>
            <div className="nexus-input-icon">
              <ShieldCheck size={17}/>
              <input id="password" type={showPassword ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                disabled={loading} autoComplete="current-password"/>
              <button type="button" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password">
                {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
            {fieldErrors.password && <span className="nexus-field-error">{fieldErrors.password}</span>}

            {error && <div className="nexus-auth-error">{error}</div>}

            <div className="nexus-auth-options">
              <label><input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} disabled={loading}/> Remember me</label>
              <button type="button" onClick={e => e.preventDefault()}>Forgot password?</button>
            </div>

            <button type="submit" disabled={loading} className="nexus-signin-button">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="nexus-demo">
            <button className="nexus-demo-toggle" type="button" onClick={() => setDemoOpen(v => !v)}>
              <span>Demo accounts</span>{demoOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            {demoOpen && <div className="nexus-demo-list">
              {demoAccounts.map(account => (
                <div className="nexus-demo-row" key={account.role}>
                  <div><strong>{account.role}</strong><small>{account.email}</small></div>
                  <button type="button" onClick={() => handleUseDemo(account)}>Use</button>
                </div>
              ))}
            </div>}
          </div>
          <p className="nexus-login-footer">© 2026 Nexus ERP · Secure business operations platform</p>
        </div>
      </main>
    </div>
  );
}
