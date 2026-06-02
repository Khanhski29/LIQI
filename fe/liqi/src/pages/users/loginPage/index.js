import { memo, useState } from "react";
import "./style.scss";
import { useNavigate, Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useLoginUS } from "api/auth";
import Title from "pages/users/theme/title";
import { setUserSession } from "utils/authStorage";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { mutate: login, isPending } = useLoginUS({
        onSuccess: (data) => {
            if (data.user?.role === "admin") {
                setErrorMsg("Vui lòng đăng nhập admin tại trang quản trị.");
                return;
            }
            setUserSession(data.token, data.user);
            navigate(ROUTERS.USER.PROFILE);
        },
        onError: (error) => {
            const msg =
                error?.response?.data?.errors?.email?.[0] ||
                error?.response?.data?.message ||
                "Đăng nhập thất bại, vui lòng thử lại.";
            setErrorMsg(msg);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        login({ email, password });
    };

    return (
        <div className="auth-page container wide">
            <div className="auth-page__box">
                <Title name="Đăng Nhập" />

                <form className="auth-page__form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {errorMsg && <p className="auth-page__error">{errorMsg}</p>}

                    <button className="btn-l auth-page__btn" type="submit" disabled={isPending}>
                        {isPending ? "Đang đăng nhập..." : "Đăng Nhập"}
                    </button>
                </form>

                <p className="auth-page__switch">
                    Chưa có tài khoản?{" "}
                    <Link to={ROUTERS.USER.REGISTER}>Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
};

export default memo(LoginPage);
