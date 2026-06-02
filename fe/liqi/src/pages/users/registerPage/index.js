import { memo, useState } from "react";
import "../loginPage/style.scss";
import { useNavigate, Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useRegisterUS } from "api/auth";
import Title from "pages/users/theme/title";
import { setUserSession } from "utils/authStorage";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const { mutate: register, isPending } = useRegisterUS({
        onSuccess: (data) => {
            setUserSession(data.token, data.user);
            navigate(ROUTERS.USER.PROFILE);
        },
        onError: (error) => {
            const errors = error?.response?.data?.errors;
            const firstError = errors ? Object.values(errors)[0]?.[0] : null;
            const msg = firstError || error?.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại.";
            setErrorMsg(msg);
        },
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        register(form);
    };

    return (
        <div className="auth-page container wide">
            <div className="auth-page__box">
                <Title name="Đăng Ký" />

                <form className="auth-page__form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {errorMsg && <p className="auth-page__error">{errorMsg}</p>}

                    <button className="btn-l auth-page__btn" type="submit" disabled={isPending}>
                        {isPending ? "Đang đăng ký..." : "Đăng Ký"}
                    </button>
                </form>

                <p className="auth-page__switch">
                    Đã có tài khoản?{" "}
                    <Link to={ROUTERS.USER.LOGIN}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default memo(RegisterPage);
